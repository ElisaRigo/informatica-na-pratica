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
  url.searchParams.set('wstoken', MOODLE_TOKEN);
  url.searchParams.set('wsfunction', functionName);
  url.searchParams.set('moodlewsrestformat', 'json');

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, String(params[key]));
  });

  console.log(`Calling Moodle API: ${functionName}`, params);

  const response = await fetch(url.toString(), {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Moodle API HTTP error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Moodle API response for ${functionName}:`, data);

  // Se data é null, considerar como sucesso (enrol_manual_enrol_users retorna null em sucesso)
  if (data === null) {
    console.log(`✅ API ${functionName} completed successfully (null response)`);
    return data;
  }

  // Verificar erros apenas se data não for null
  if (data && (data.exception || data.errorcode)) {
    throw new Error(`Moodle API error: ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

async function createMoodleUser(name: string, email: string) {
  // Gerar username a partir do email
  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Gerar senha segura com requisitos: mínimo 8 caracteres, 1 maiúscula, 1 caractere especial
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%&*';
  
  let password = '';
  password += upperChars[Math.floor(Math.random() * upperChars.length)]; // 1 maiúscula
  password += special[Math.floor(Math.random() * special.length)]; // 1 especial
  password += numbers[Math.floor(Math.random() * numbers.length)]; // 1 número
  
  // Completar com mais 5 caracteres aleatórios para ter 8 no total
  const allChars = chars + upperChars + numbers;
  for (let i = 0; i < 5; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Embaralhar a senha
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  const userData = {
    'users[0][username]': username,
    'users[0][password]': password,
    'users[0][firstname]': name.split(' ')[0],
    'users[0][lastname]': name.split(' ').slice(1).join(' ') || name.split(' ')[0],
    'users[0][email]': email,
    'users[0][auth]': 'manual',
  };

  try {
    const result = await callMoodleAPI('core_user_create_users', userData);
    console.log('✅ New user created:', result);
    return { userId: result[0].id, username, password };
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Se o usuário já existe, buscar pelo email e RESETAR A SENHA
    const existingUser = await callMoodleAPI('core_user_get_users_by_field', {
      field: 'email',
      'values[0]': email
    });

    if (existingUser && existingUser[0]) {
      console.log('⚠️ User already exists, resetting password...');
      const userId = existingUser[0].id;
      
      // Atualizar a senha do usuário existente
      const updateData = {
        'users[0][id]': userId,
        'users[0][password]': password,
      };
      
      try {
        await callMoodleAPI('core_user_update_users', updateData);
        console.log('✅ Password reset successfully for existing user');
        return { userId, username: existingUser[0].username, password };
      } catch (updateError) {
        console.error('Error updating password:', updateError);
        // Retornar com senha null se não conseguir atualizar
        return { userId, username: existingUser[0].username, password: null };
      }
    }

    throw error;
  }
}

async function enrollUserInCourse(userId: number) {
  const enrollmentData = {
    'enrolments[0][roleid]': 5, // Role ID 5 = student
    'enrolments[0][userid]': userId,
    'enrolments[0][courseid]': MOODLE_COURSE_ID,
  };

  const result = await callMoodleAPI('enrol_manual_enrol_users', enrollmentData);
  console.log('User enrolled:', result);
  return result;
}

async function sendWelcomeEmail(name: string, email: string, username: string, password: string | null) {
  const firstName = name.split(' ')[0];
  
  const passwordInfo = password 
    ? `<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #0080BB;">
         <p style="margin: 0 0 15px 0; font-size: 16px; color: #0c4a6e; font-weight: 600;">🔑 Suas credenciais de acesso:</p>
         <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
           <p style="margin: 8px 0; font-size: 15px; color: #334155;"><strong style="color: #0080BB;">Usuário:</strong> <span style="font-family: 'Courier New', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 16px;">${username}</span></p>
           <p style="margin: 8px 0; font-size: 15px; color: #334155;"><strong style="color: #0080BB;">Senha:</strong> <span style="font-family: 'Courier New', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 16px;">${password}</span></p>
         </div>
         <p style="margin: 15px 0 0 0; font-size: 13px; color: #64748b;">💡 Dica: Salve estas informações em um lugar seguro!</p>
       </div>`
    : `<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #0080BB;">
         <p style="margin: 0; font-size: 15px; color: #0c4a6e;">🔐 Use suas credenciais de acesso existentes para entrar na plataforma.</p>
       </div>`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6; 
          color: #1e293b;
          background: #f1f5f9;
          padding: 20px;
        }
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 128, 187, 0.15);
        }
        .header {
          background: linear-gradient(135deg, #0080BB 0%, #005A87 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          max-width: 180px;
          height: auto;
          margin-bottom: 20px;
        }
        .header h1 {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          background: white;
        }
        .greeting {
          font-size: 18px;
          color: #0f172a;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .message {
          font-size: 15px;
          color: #475569;
          margin-bottom: 15px;
          line-height: 1.7;
        }
        .cta-container {
          text-align: center;
          margin: 35px 0;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #0080BB 0%, #005A87 100%);
          color: #ffffff !important;
          padding: 16px 40px;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(0, 128, 187, 0.4);
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #cbd5e1, transparent);
          margin: 30px 0;
        }
        .footer {
          background: #f8fafc;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .signature {
          font-size: 15px;
          color: #64748b;
        }
        .signature strong {
          display: block;
          font-size: 17px;
          color: #0080BB;
          margin: 8px 0 5px 0;
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="header">
          <img src="https://informatica-descomplicada.lovable.app/logo-email.png" alt="Elisa Ensina" class="logo">
          <h1><span>🎉</span> Bem-vindo ao Curso!</h1>
        </div>
        
        <div class="content">
          <p class="greeting">Olá, ${firstName}! 👋</p>
          
          <p class="message">
            Parabéns! Sua matrícula foi confirmada com sucesso. <strong>Estou muito feliz</strong> em ter você comigo nessa jornada de aprendizado! 🚀
          </p>
          
          ${passwordInfo}
          
          <p class="message">
            Sua plataforma de estudos já está pronta! Acesse agora e comece a aprender no seu ritmo:
          </p>
          
          <div class="cta-container">
            <a href="${MOODLE_BASE_URL}" class="button">🎯 Acessar Plataforma</a>
          </div>
          
          <div class="divider"></div>
          
          <p class="message">
            Se tiver qualquer dúvida, estou à disposição para ajudar! 💬
          </p>
        </div>
        
        <div class="footer">
          <p class="signature">
            Bons estudos! 📚
            <strong>Prof. Elisa</strong>
            <span>Elisa Ensina</span>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: "Elisa Ensina <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Bem-vindo ao Curso!",
      html: emailHtml,
    });

    console.log('Welcome email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
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

    // Moodle integration
    console.log("🔄 Starting Moodle integration...");
    const moodleUser = await createMoodleUser(customerName, customerEmail);
    console.log("✅ Moodle user created:", moodleUser);

    await enrollUserInCourse(moodleUser.userId);
    console.log("✅ User enrolled in course");

    // Save student to database
    console.log("💾 Saving student to database...");
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: customerEmail,
        name: customerName,
        pagseguro_transaction_id: String(paymentId),
        course_access: true,
        moodle_username: moodleUser.username,
        moodle_password: moodleUser.password,
      }, {
        onConflict: "email",
      });

    if (studentError) {
      console.error("❌ Error saving student:", studentError);
      throw studentError;
    }
    console.log("✅ Student saved to database");

    // Send welcome email
    console.log("📧 Sending welcome email...");
    await sendWelcomeEmail(customerName, customerEmail, moodleUser.username, moodleUser.password);
    console.log("✅ Email sent successfully");

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
