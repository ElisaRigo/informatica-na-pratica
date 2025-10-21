import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Moodle configuration
const MOODLE_BASE_URL = "https://elisaensina.com.br";
const MOODLE_TOKEN = Deno.env.get("MOODLE_API_TOKEN") || "";
const MOODLE_COURSE_ID = 2;

async function callMoodleAPI(functionName: string, params: Record<string, any>) {
  const url = new URL(`${MOODLE_BASE_URL}/webservice/rest/server.php`);
  url.searchParams.append("wstoken", MOODLE_TOKEN);
  url.searchParams.append("wsfunction", functionName);
  url.searchParams.append("moodlewsrestformat", "json");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  console.log(`Calling Moodle API: ${functionName}`);
  const response = await fetch(url.toString(), { method: "POST" });
  return await response.json();
}

async function createMoodleUser(name: string, email: string) {
  const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const password = `Temp${Math.random().toString(36).slice(-8)}!`;

  try {
    const result = await callMoodleAPI("core_user_create_users", {
      "users[0][username]": username,
      "users[0][password]": password,
      "users[0][firstname]": name.split(" ")[0] || name,
      "users[0][lastname]": name.split(" ").slice(1).join(" ") || ".",
      "users[0][email]": email,
      "users[0][auth]": "manual",
    });

    if (result[0]?.id) {
      console.log(`Moodle user created successfully: ${result[0].id}`);
      return { userId: result[0].id, username, password };
    }

    if (result.exception && result.message?.includes("already exists")) {
      console.log("User already exists in Moodle, resetting password...");
      await callMoodleAPI("core_user_update_users", {
        "users[0][username]": username,
        "users[0][password]": password,
      });
      
      const users = await callMoodleAPI("core_user_get_users_by_field", {
        field: "username",
        "values[0]": username,
      });

      if (users[0]?.id) {
        return { userId: users[0].id, username, password };
      }
    }

    throw new Error(result.message || "Failed to create Moodle user");
  } catch (error) {
    console.error("Error creating Moodle user:", error);
    throw error;
  }
}

async function enrollUserInCourse(userId: number) {
  const result = await callMoodleAPI("enrol_manual_enrol_users", {
    "enrolments[0][roleid]": 5,
    "enrolments[0][userid]": userId,
    "enrolments[0][courseid]": MOODLE_COURSE_ID,
  });

  if (result === null) {
    console.log(`User ${userId} enrolled in course ${MOODLE_COURSE_ID}`);
    return true;
  }

  throw new Error("Failed to enrol user in course");
}

async function sendWelcomeEmail(
  name: string,
  email: string,
  username: string,
  password: string | null
) {
  const loginUrl = `${MOODLE_BASE_URL}/login/index.php`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .credentials { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo(a) ao Curso!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Seu pagamento foi confirmado e você já está matriculado(a) no curso! 🚀</p>
            
            <div class="credentials">
              <h3>📋 Seus dados de acesso:</h3>
              <p><strong>Usuário:</strong> ${username}</p>
              ${password ? `<p><strong>Senha:</strong> ${password}</p>` : ""}
              <p><strong>Link de acesso:</strong><br/>
              <a href="${loginUrl}">${loginUrl}</a></p>
            </div>

            <p>Clique no botão abaixo para acessar a plataforma:</p>
            <center>
              <a href="${loginUrl}" class="button">Acessar Plataforma</a>
            </center>

            <p><strong>⚠️ Importante:</strong> Recomendamos que você altere sua senha no primeiro acesso.</p>
            
            <p>Se tiver qualquer dúvida, entre em contato conosco pelo WhatsApp.</p>
            
            <p>Bons estudos! 📚</p>
          </div>
          <div class="footer">
            <p>© 2025 Elisa Ensina - Todos os direitos reservados</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await resend.emails.send({
    from: "Elisa Ensina <onboarding@resend.dev>",
    to: [email],
    subject: "🎉 Matrícula Confirmada - Seus Dados de Acesso",
    html: emailHtml,
  });

  console.log(`Welcome email sent to ${email}`);
}

async function trackGoogleAdsConversion(transactionId: string, value: number) {
  try {
    console.log(`Tracking conversion for transaction ${transactionId}`);
  } catch (error) {
    console.error("Error tracking conversion:", error);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Mercado Pago webhook received");

    const body = await req.json();
    console.log("Webhook payload:", JSON.stringify(body, null, 2));

    // Mercado Pago sends notifications with type and data.id
    if (body.type !== "payment") {
      console.log(`Ignoring notification type: ${body.type}`);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      throw new Error("Payment ID not found in webhook");
    }

    // Get payment details from Mercado Pago
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      throw new Error(`Failed to fetch payment details: ${paymentResponse.status}`);
    }

    const payment = await paymentResponse.json();
    console.log("Payment details:", JSON.stringify(payment, null, 2));

    // Only process approved payments
    if (payment.status !== "approved") {
      console.log(`Payment not approved yet, status: ${payment.status}`);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerName = payment.payer?.first_name || payment.payer?.name || "Cliente";
    const customerEmail = payment.payer?.email;
    const amount = payment.transaction_amount;
    const paymentMethod = payment.payment_method_id;

    if (!customerEmail) {
      throw new Error("Customer email not found");
    }

    console.log(`Processing approved payment for ${customerEmail}`);

    // Save payment to database
    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .insert({
        pagseguro_transaction_id: String(paymentId),
        payment_provider: "mercado_pago",
        amount: amount,
        status: "approved",
        payment_method: paymentMethod,
        webhook_data: payment,
      })
      .select()
      .single();

    if (paymentError) {
      console.error("Error saving payment:", paymentError);
      throw paymentError;
    }

    console.log("Payment saved to database:", paymentData.id);

    // Create Moodle user and enroll
    const { userId, username, password } = await createMoodleUser(
      customerName,
      customerEmail
    );

    // Save student to database
    const { error: studentError } = await supabase.from("students").insert({
      name: customerName,
      email: customerEmail,
      moodle_username: username,
      moodle_password: password,
      course_access: true,
      pagseguro_transaction_id: String(paymentId),
    });

    if (studentError) {
      console.error("Error saving student:", studentError);
    }

    // Enroll in course
    await enrollUserInCourse(userId);

    // Send welcome email
    await sendWelcomeEmail(customerName, customerEmail, username, password);

    // Track conversion (asynchronous, don't block)
    trackGoogleAdsConversion(String(paymentId), amount).catch(err => 
      console.error("Conversion tracking error:", err)
    );

    console.log("Payment processed successfully");

    return new Response(
      JSON.stringify({ success: true, paymentId: paymentData.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
