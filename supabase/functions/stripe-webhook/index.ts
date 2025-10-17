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

  console.log("Calling Moodle API:", functionName);
  
  const response = await fetch(url.toString());
  const responseText = await response.text();
  
  // Check if response is HTML (error page)
  if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html")) {
    console.error("Moodle API returned HTML instead of JSON. Token may be invalid or API not enabled.");
    console.error("Response preview:", responseText.substring(0, 500));
    throw new Error("Moodle API configuration error: Invalid token or API not enabled");
  }
  
  try {
    const jsonResponse = JSON.parse(responseText);
    
    // Check for Moodle error response
    if (jsonResponse.exception || jsonResponse.errorcode) {
      console.error("Moodle API error:", jsonResponse);
      throw new Error(`Moodle API error: ${jsonResponse.message || jsonResponse.errorcode}`);
    }
    
    return jsonResponse;
  } catch (parseError) {
    console.error("Failed to parse Moodle response:", responseText.substring(0, 500));
    throw new Error("Invalid Moodle API response format");
  }
}

// Create Moodle user (now returns null on failure instead of throwing)
async function createMoodleUser(name: string, email: string): Promise<{userId: number, username: string, password: string} | null> {
  console.log("🔄 Attempting Moodle integration for:", { name, email });
  
  const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const password = `${Math.random().toString(36).slice(-8)}Aa1!`;

  try {
    console.log("Creating new Moodle user with username:", username);
    
    const result = await callMoodleAPI("core_user_create_users", {
      "users[0][username]": username,
      "users[0][password]": password,
      "users[0][firstname]": name.split(" ")[0],
      "users[0][lastname]": name.split(" ").slice(1).join(" ") || name.split(" ")[0],
      "users[0][email]": email,
      "users[0][auth]": "manual",
    });

    if (result[0]?.id) {
      console.log("✅ Moodle user created successfully:", result[0].id);
      return { userId: result[0].id, username, password };
    }

    // If user exists, try to get user ID
    console.log("User may exist, searching by email...");
    const existingUser = await callMoodleAPI("core_user_get_users_by_field", {
      field: "email",
      "values[0]": email,
    });

    if (existingUser[0]?.id) {
      console.log("✅ Found existing Moodle user:", existingUser[0].id);
      // Reset password
      await callMoodleAPI("core_user_update_users", {
        "users[0][id]": existingUser[0].id,
        "users[0][password]": password,
      });
      return { userId: existingUser[0].id, username: existingUser[0].username, password };
    }

    console.warn("⚠️ Could not create or find Moodle user");
    return null;
  } catch (error) {
    console.error("❌ Moodle integration failed:", error);
    console.log("⚠️ Continuing without Moodle access...");
    return null;
  }
}

// Enroll user in course (returns success boolean)
async function enrollUserInCourse(userId: number): Promise<boolean> {
  try {
    const result = await callMoodleAPI("enrol_manual_enrol_users", {
      "enrolments[0][roleid]": 5,
      "enrolments[0][userid]": userId,
      "enrolments[0][courseid]": COURSE_ID,
    });
    console.log("✅ User enrolled in course successfully");
    return true;
  } catch (error) {
    console.error("❌ Error enrolling user:", error);
    return false;
  }
}

// Send welcome email (adapted for optional Moodle)
async function sendWelcomeEmail(
  name: string, 
  email: string, 
  moodleSuccess: boolean, 
  username?: string, 
  password?: string
): Promise<boolean> {
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
          .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Pagamento Confirmado!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Seu pagamento foi processado com sucesso!</p>
            
            ${moodleSuccess && username && password ? `
            <div class="credentials">
              <h3>📚 Seus dados de acesso à plataforma:</h3>
              <p><strong>URL:</strong> ${MOODLE_URL}</p>
              <p><strong>Usuário:</strong> ${username}</p>
              <p><strong>Senha:</strong> ${password}</p>
            </div>
            <a href="${MOODLE_URL}/login/index.php" class="button">Acessar o Curso Agora</a>
            ` : `
            <div class="warning">
              <h3>⚠️ Acesso em Processamento</h3>
              <p>Seu pagamento foi confirmado, mas estamos processando seu acesso à plataforma.</p>
              <p>Você receberá suas credenciais em breve por email ou WhatsApp.</p>
              <p><strong>Contato:</strong> Entre em contato conosco se tiver dúvidas.</p>
            </div>
            `}
            
            <p>Obrigado pela confiança!</p>
            <p>Equipe Elisa Rigo 💙</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "Elisa Rigo <onboarding@resend.dev>",
      to: email,
      subject: moodleSuccess 
        ? "🎉 Bem-vindo! Acesso ao Curso Liberado" 
        : "✅ Pagamento Confirmado - Acesso em Processamento",
      html: emailHtml,
    });

    console.log("✅ Email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
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

      console.log("✅ Payment saved:", paymentData.id);

      // Try Moodle integration (optional, won't break flow if fails)
      console.log("🔄 Starting Moodle integration...");
      const moodleUser = await createMoodleUser(customerName, customerEmail);
      
      let moodleSuccess = false;
      let enrollmentSuccess = false;
      
      if (moodleUser) {
        console.log("✅ Moodle user ready:", moodleUser.userId);
        
        // Try to enroll
        enrollmentSuccess = await enrollUserInCourse(moodleUser.userId);
        moodleSuccess = enrollmentSuccess;
        
        if (enrollmentSuccess) {
          console.log("✅ Moodle enrollment completed");
        } else {
          console.warn("⚠️ Moodle enrollment failed, but continuing...");
        }
      } else {
        console.warn("⚠️ Moodle integration unavailable, continuing without it...");
      }

      // Save student to database (ALWAYS, regardless of Moodle status)
      console.log("💾 Saving student to database...");
      const { error: studentError } = await supabase
        .from("students")
        .upsert({
          email: customerEmail,
          name: customerName,
          pagseguro_transaction_id: paymentIntent.id,
          course_access: moodleSuccess,
          moodle_username: moodleUser?.username || null,
          moodle_password: moodleUser?.password || null,
        }, {
          onConflict: "email",
        });

      if (studentError) {
        console.error("❌ Error saving student:", studentError);
        // Don't throw - continue with email
      } else {
        console.log("✅ Student saved to database");
      }

      // Send email (ALWAYS, adapted to Moodle status)
      console.log("📧 Sending confirmation email...");
      const emailSent = await sendWelcomeEmail(
        customerName, 
        customerEmail, 
        moodleSuccess,
        moodleUser?.username,
        moodleUser?.password
      );
      
      if (emailSent) {
        console.log("✅ Email sent successfully");
      } else {
        console.warn("⚠️ Email failed, but student is registered");
      }

      // Track conversion
      await trackGoogleAdsConversion(paymentIntent.id, paymentIntent.amount / 100);
      
      console.log("🎉 Automation completed for payment:", paymentIntent.id);
      console.log("📊 Status:", {
        payment: "✅ saved",
        student: studentError ? "⚠️ error" : "✅ saved",
        moodle: moodleSuccess ? "✅ enrolled" : "❌ failed",
        email: emailSent ? "✅ sent" : "⚠️ failed"
      });

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
