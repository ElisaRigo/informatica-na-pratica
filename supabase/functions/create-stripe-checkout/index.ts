import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating Stripe checkout session");
    
    const { customerName, customerEmail } = await req.json();
    
    if (!customerName || !customerEmail) {
      throw new Error("Nome e email são obrigatórios");
    }

    console.log("Customer data:", { customerName, customerEmail });

    // Verifica se a chave do Stripe existe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey || stripeKey === "") {
      console.error("STRIPE_SECRET_KEY not found or empty");
      throw new Error("Configuração do Stripe inválida. Entre em contato com o suporte.");
    }

    console.log("Initializing Stripe with key:", stripeKey.substring(0, 7) + "...");

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Busca ou cria cliente
    const customers = await stripe.customers.list({ 
      email: customerEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      console.log("Creating new customer");
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    // Criar Checkout Session apenas com Cartão (funciona em test mode sem configuração extra)
    console.log("Creating checkout session with card payment...");
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Curso de Informática na Prática",
              description: "Acesso completo ao curso",
            },
            unit_amount: 29700, // R$ 297,00 em centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/obrigada?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        customer_name: customerName,
        customer_email: customerEmail,
      },
    });
    
    console.log("✅ Checkout session created successfully!");
    console.log("Session ID:", session.id);
    console.log("Session URL:", session.url);

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url,
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("❌ Error in create-stripe-checkout:");
    console.error("Error type:", error.type);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", JSON.stringify(error, null, 2));
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: error.type,
        code: error.code
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
