import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
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
    // Verificar autenticação
    const authHeader = req.headers.get("Authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader || "" } }
    });
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Creating payment intent");
    
    const { customerName, customerEmail, customerTaxId } = await req.json();
    
    if (!customerName || !customerEmail || !customerTaxId) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    console.log("Customer data:", { customerName, customerEmail, taxId: customerTaxId });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const customers = await stripe.customers.list({ 
      email: customerEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
      
      await stripe.customers.update(customerId, {
        name: customerName,
      });
    } else {
      console.log("Creating new customer");
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    try {
      const existingTaxIds = await stripe.customers.listTaxIds(customerId, { limit: 10 });
      const hasCPF = existingTaxIds.data.some((tax: any) => tax.value === customerTaxId);
      
      if (!hasCPF) {
        await stripe.customers.createTaxId(customerId, {
          type: 'br_cpf',
          value: customerTaxId,
        });
        console.log("Added tax_id to customer");
      }
    } catch (taxError: any) {
      console.error("Error adding tax_id:", taxError.message);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 29700,
      currency: "brl",
      customer: customerId,
      payment_method_types: ['card', 'boleto'],
      payment_method_options: {
        card: {
          installments: {
            enabled: true,
          },
        },
        boleto: {
          expires_after_days: 3,
        },
      },
      metadata: {
        customer_name: customerName,
        customer_email: customerEmail,
      },
    });

    console.log("Payment intent created:", paymentIntent.id);

    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in create-payment-intent:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
