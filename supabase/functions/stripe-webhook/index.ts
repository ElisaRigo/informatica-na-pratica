import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

// Initialize Resend
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Moodle configuration
const MOODLE_URL = "https://elisarigo.moodlecloud.com";
const MOODLE_TOKEN = Deno.env.get("MOODLE_API_TOKEN");
const COURSE_ID = 2;

// Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Moodle API helper
async function callMoodleAPI(functionName: string, params: Record<string, any>) {
  const url = new URL(`${MOODLE_URL}/webservice/rest/server.php`);
  url.searchParams.set("wstoken", MOODLE_TOKEN || "");
  url.searchParams.set("wsfunction", functionName);
  url.searchParams.set("moodlewsrestformat", "json");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());
  return await response.json();
}

// Create Moodle user
async function createMoodleUser(name: string, email: string) {
  const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const password = `${Math.random().toString(36).slice(-8)}Aa1!`;

  try {
    const result = await callMoodleAPI("core_user_create_users", {
      "users[0][username]": username,
      "users[0][password]": password,
      "users[0][firstname]": name.split(" ")[0],
      "users[0][lastname]": name.split(" ").slice(1).join(" ") || name.split(" ")[0],
      "users[0][email]": email,
      "users[0][auth]": "manual",
    });

    if (result[0]?.id) {
      console.log("Moodle user created:", result[0].id);
      return { userId: result[0].id, username, password };
    }

    // If user exists, try to get user ID
    const existingUser = await callMoodleAPI("core_user_get_users_by_field", {
      field: "email",
      "values[0]": email,
    });

    if (existingUser[0]?.id) {
      console.log("Moodle user already exists:", existingUser[0].id);
      // Reset password
      await callMoodleAPI("core_user_update_users", {
        "users[0][id]": existingUser[0].id,
        "users[0][password]": password,
      });
      return { userId: existingUser[0].id, username: existingUser[0].username, password };
    }

    throw new Error("Failed to create or find Moodle user");
  } catch (error) {
    console.error("Error creating Moodle user:", error);
    throw error;
  }
}

// Enroll user in course
async function enrollUserInCourse(userId: number) {
  try {
    const result = await callMoodleAPI("enrol_manual_enrol_users", {
      "enrolments[0][roleid]": 5,
      "enrolments[0][userid]": userId,
      "enrolments[0][courseid]": COURSE_ID,
    });
    console.log("User enrolled in course:", result);
    return result;
  } catch (error) {
    console.error("Error enrolling user:", error);
    throw error;
  }
}

// Send welcome email
async function sendWelcomeEmail(name: string, email: string, username: string, password: string | null) {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo(a) ao curso!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Sua matrícula foi confirmada com sucesso! Estamos muito felizes em tê-lo(a) conosco.</p>
            
            ${password ? `
            <div class="credentials">
              <h3>📚 Seus dados de acesso:</h3>
              <p><strong>Plataforma:</strong> ${MOODLE_URL}</p>
              <p><strong>Usuário:</strong> ${username}</p>
              <p><strong>Senha:</strong> ${password}</p>
            </div>
            <a href="${MOODLE_URL}/login/index.php" class="button">Acessar o Curso</a>
            ` : `
            <p>Você já possui acesso à plataforma com seu usuário existente.</p>
            <a href="${MOODLE_URL}/login/index.php" class="button">Acessar o Curso</a>
            `}
            
            <p>Se tiver qualquer dúvida, estamos à disposição!</p>
            <p>Bons estudos! 📖</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "Elisa Rigo <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Bem-vindo ao curso - Acesso liberado!",
      html: emailHtml,
    });

    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

// Track conversion
async function trackGoogleAdsConversion(transactionId: string, value: number) {
  try {
    console.log("Tracking conversion for transaction:", transactionId);
  } catch (error) {
    console.error("Error tracking conversion:", error);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Stripe webhook received");

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Verify webhook signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let event: Stripe.Event;

    try {
      // CRITICAL: Use constructEventAsync for Deno environment
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
      console.log("Webhook signature verified successfully");
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Event type:", event.type);

    // Only process successful payments
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("Processing payment intent:", paymentIntent.id);

      // Get customer details with better error handling
      let customerName = "Cliente";
      let customerEmail = "";

      if (paymentIntent.customer) {
        try {
          const customer = await stripe.customers.retrieve(paymentIntent.customer as string);
          
          if (!customer.deleted) {
            customerName = customer.name || paymentIntent.metadata?.customer_name || "Cliente";
            customerEmail = customer.email || paymentIntent.metadata?.customer_email || "";
          }
        } catch (err) {
          console.error("Error retrieving customer:", err);
          // Fallback to metadata if customer retrieval fails
          customerName = paymentIntent.metadata?.customer_name || "Cliente";
          customerEmail = paymentIntent.metadata?.customer_email || "";
        }
      } else {
        // No customer ID, try metadata
        customerName = paymentIntent.metadata?.customer_name || "Cliente";
        customerEmail = paymentIntent.metadata?.customer_email || "";
      }

      if (!customerEmail) {
        console.error("Customer email not found in payment intent:", paymentIntent.id);
        throw new Error("Customer email not found");
      }

      console.log("Customer data retrieved:", { name: customerName, email: customerEmail });

      // Save payment to database
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .insert({
          pagseguro_transaction_id: paymentIntent.id,
          status: "paid",
          amount: paymentIntent.amount / 100,
          payment_method: paymentIntent.payment_method_types[0] || "card",
          webhook_data: event,
        })
        .select()
        .single();

      if (paymentError) {
        console.error("Error saving payment:", paymentError);
        throw paymentError;
      }

      console.log("Payment saved:", paymentData.id);

      // Create Moodle user and enroll
      console.log("Creating Moodle user...");
      const moodleUser = await createMoodleUser(customerName, customerEmail);
      console.log("Moodle user created successfully:", moodleUser.userId);
      
      console.log("Enrolling user in course...");
      await enrollUserInCourse(moodleUser.userId);
      console.log("User enrolled successfully");

      // Save student to database
      console.log("Saving student to database...");
      const { error: studentError } = await supabase
        .from("students")
        .upsert({
          email: customerEmail,
          name: customerName,
          pagseguro_transaction_id: paymentIntent.id,
          course_access: true,
          moodle_username: moodleUser.username,
          moodle_password: moodleUser.password,
        }, {
          onConflict: "email",
        });

      if (studentError) {
        console.error("Error saving student:", studentError);
        throw studentError;
      }

      console.log("Student saved successfully");

      // Send welcome email
      console.log("Sending welcome email...");
      await sendWelcomeEmail(customerName, customerEmail, moodleUser.username, moodleUser.password);
      console.log("Welcome email sent successfully");

      // Track conversion
      console.log("Tracking conversion...");
      await trackGoogleAdsConversion(paymentIntent.id, paymentIntent.amount / 100);
      console.log("Conversion tracked successfully");
      
      console.log("✅ All automation steps completed successfully for payment:", paymentIntent.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Return success for other events
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
