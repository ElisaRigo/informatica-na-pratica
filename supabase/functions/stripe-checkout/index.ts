import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting Stripe checkout process");
    
    const { customerName, customerEmail } = await req.json();
    
    if (!customerName || !customerEmail) {
      throw new Error("Nome e email são obrigatórios");
    }

    console.log("Customer data:", { customerName, customerEmail });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if a Stripe customer exists for this email
    console.log("Checking for existing Stripe customer");
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

    // Create a one-time payment session
    console.log("Creating checkout session");
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: "price_1SJIE9RzpXJIMcLIarMvnTb3",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/obrigada`,
      cancel_url: `${req.headers.get("origin")}/`,
      locale: "pt-BR",
    });

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        url: session.url,
        sessionId: session.id
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in stripe-checkout:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
