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
const MOODLE_URL = 'https://aluno.informaticanapratica.com.br';
const MOODLE_TOKEN = Deno.env.get("MOODLE_API_TOKEN") || "";
const COURSE_ID = 2;

async function callMoodleAPI(functionName: string, params: Record<string, any>) {
  const url = new URL(`${MOODLE_URL}/webservice/rest/server.php`);
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

  if (data === null) {
    console.log(`✅ API ${functionName} completed successfully (null response)`);
    return data;
  }

  if (data && (data.exception || data.errorcode)) {
    throw new Error(`Moodle API error: ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

async function createMoodleUser(name: string, email: string) {
  console.log('🔍 Validating input data:', { name, email });
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`Invalid email format: ${email}`);
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length < 3) {
    throw new Error(`Name too short: "${trimmedName}"`);
  }
  
  let username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  if (username.length < 5) {
    username = username + Math.random().toString(36).substring(2, 7);
  }
  username = username.substring(0, 20);
  
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$*-_';
  
  let password = '';
  password += upperChars[Math.floor(Math.random() * upperChars.length)];
  password += special[Math.floor(Math.random() * special.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  
  const allChars = chars + upperChars + numbers;
  for (let i = 0; i < 5; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
  
  let firstname: string;
  let lastname: string;
  
  if (nameParts.length === 0) {
    firstname = 'Estudante';
    lastname = 'Curso';
  } else if (nameParts.length === 1) {
    firstname = nameParts[0];
    lastname = 'Silva';
  } else {
    firstname = nameParts[0];
    lastname = nameParts.slice(1).join(' ');
  }
  
  const validFirstname = firstname.length >= 2 ? firstname.substring(0, 100) : 'Estudante';
  const validLastname = lastname.length >= 2 ? lastname.substring(0, 100) : 'Silva';
  
  const finalFirstname = validFirstname;
  const finalLastname = validFirstname === validLastname ? validLastname + ' Jr' : validLastname;

  const userData = {
    'users[0][username]': username,
    'users[0][password]': password,
    'users[0][firstname]': finalFirstname,
    'users[0][lastname]': finalLastname,
    'users[0][email]': email,
    'users[0][auth]': 'manual',
  };
  
  console.log('📝 User data prepared:', {
    username,
    firstname: finalFirstname,
    lastname: finalLastname,
    email,
    passwordLength: password.length
  });

  try {
    const result = await callMoodleAPI('core_user_create_users', userData);
    console.log('✅ New user created:', result);
    return { userId: result[0].id, username, password };
  } catch (error) {
    console.error('Error creating user:', error);
    
    const existingUser = await callMoodleAPI('core_user_get_users_by_field', {
      field: 'email',
      'values[0]': email
    });

    if (existingUser && existingUser[0]) {
      console.log('⚠️ User already exists in Moodle');
      const userId = existingUser[0].id;
      console.log('ℹ️ Returning existing user without password reset (security restriction)');
      return { userId, username: existingUser[0].username, password: null };
    }

    throw error;
  }
}

async function enrollUserInCourse(userId: number) {
  const enrollmentData = {
    'enrolments[0][roleid]': 5,
    'enrolments[0][userid]': userId,
    'enrolments[0][courseid]': COURSE_ID,
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
            <a href="${MOODLE_URL}" class="button">🎯 Acessar Plataforma</a>
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
      from: "Informática na Prática <contato@informaticanapratica.com.br>",
      to: [email],
      subject: "🎉 Bem-vindo ao Curso de Informática!",
      html: emailHtml,
    });

    console.log('Welcome email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Eduzz webhook received");

    const body = await req.json();
    console.log("Webhook payload:", JSON.stringify(body, null, 2));

    // Eduzz sends different event types
    // Common events: invoice_created, invoice_paid, invoice_refunded, etc.
    const eventType = body.event_type || body.type || body.trans_status;
    const transactionStatus = body.trans_status || body.status;

    console.log(`Event type: ${eventType}, Status: ${transactionStatus}`);

    // Only process paid/approved transactions
    // Eduzz uses different status codes: 3 = paid, 1 = open, 6 = refunded, etc.
    const isPaid = transactionStatus === 3 || 
                   transactionStatus === '3' || 
                   transactionStatus === 'paid' || 
                   eventType === 'invoice_paid';

    if (!isPaid) {
      console.log(`Ignoring webhook - transaction not paid. Status: ${transactionStatus}`);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Extract customer data from Eduzz webhook
    // Eduzz can send data in different formats depending on version
    const transactionId = body.trans_cod || body.transaction_id || body.id;
    const customerEmail = body.cus_email || body.customer?.email || body.email;
    const customerName = body.cus_name || body.customer?.name || body.name;
    const amount = body.trans_value || body.amount || body.value;

    if (!customerEmail || !customerName) {
      console.error("❌ Missing customer data:", { customerEmail, customerName });
      throw new Error("Customer email and name are required");
    }

    console.log(`✅ Processing paid transaction: ${transactionId}`);
    console.log(`Customer: ${customerName} (${customerEmail})`);

    // Save/update payment in database
    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .upsert({
        pagseguro_transaction_id: String(transactionId),
        payment_provider: "eduzz",
        amount: amount,
        status: "approved",
        payment_method: "eduzz",
        webhook_data: body,
      }, {
        onConflict: "pagseguro_transaction_id",
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (paymentError) {
      console.error("Error saving payment:", paymentError);
      throw paymentError;
    }

    console.log("✅ Payment saved to database:", paymentData.id);

    // Moodle integration
    console.log("🔄 Starting Moodle integration...");
    const moodleUser = await createMoodleUser(customerName, customerEmail);
    console.log("✅ Moodle user created:", moodleUser);

    await enrollUserInCourse(moodleUser.userId);
    console.log("✅ User enrolled in course");

    // Save/update student with course access and Moodle data
    console.log("💾 Saving student with course access...");
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: customerEmail,
        name: customerName,
        pagseguro_transaction_id: String(transactionId),
        course_access: true,
        moodle_username: moodleUser.username,
        moodle_user_id: moodleUser.userId,
        moodle_password: moodleUser.password,
      }, {
        onConflict: "email",
      });

    if (studentError) {
      console.error("❌ Error saving student:", studentError);
      throw studentError;
    }
    console.log("✅ Student saved with course access");

    // Send welcome email
    console.log("📧 Sending welcome email...");
    await sendWelcomeEmail(customerName, customerEmail, moodleUser.username, moodleUser.password);
    console.log("✅ Welcome email sent");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook processed successfully",
        transactionId: transactionId
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error("❌ Error processing Eduzz webhook:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
