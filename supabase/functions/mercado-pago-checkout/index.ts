import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  address?: {
    zip_code: string;
    street_name: string;
    street_number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, cpf, phone }: CheckoutRequest = await req.json();

    console.log("Creating Mercado Pago preference for:", { email, name });

    // Validate input
    if (!name || !email || !cpf) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("Mercado Pago access token not configured");
    }

    // Obter o preço do curso do ambiente
    const coursePrice = parseFloat(Deno.env.get("COURSE_PRICE") || "297.00");

    // Separar nome em primeiro e último nome
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || nameParts[0];

    // Create preference com todas as informações necessárias
    const preferenceData = {
      items: [
        {
          title: "Curso Completo de Informática na Prática",
          quantity: 1,
          unit_price: coursePrice,
          currency_id: "BRL",
        },
      ],
      payer: {
        name: firstName,
        surname: lastName,
        email: email,
        phone: {
          area_code: phone ? phone.substring(0, 2) : "11",
          number: phone ? phone.substring(2) : "999999999"
        },
        identification: {
          type: "CPF",
          number: cpf.replace(/\D/g, ""),
        },
        address: address ? {
          zip_code: address.zip_code,
          street_name: address.street_name,
          street_number: parseInt(address.street_number) || 1,
          city_name: address.city,
          state_name: address.state,
        } : {
          zip_code: "00000000",
          street_name: "Rua",
          street_number: 1
        }
      },
      payment_methods: {
        installments: 12,
        default_installments: 1,
      },
      back_urls: {
        success: `${req.headers.get("origin")}/obrigada`,
        failure: `${req.headers.get("origin")}/aguardando`,
        pending: `${req.headers.get("origin")}/aguardando`,
      },
      auto_return: "approved",
      notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago-webhook`,
      statement_descriptor: "INFORMATICA PRATICA",
      external_reference: `${email}-${Date.now()}`,
      binary_mode: false,
    };

    console.log("Sending preference to Mercado Pago...");

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mercado Pago API error:", errorData);
      throw new Error(`Mercado Pago API error: ${response.status}`);
    }

    const preference = await response.json();
    console.log("Preference created successfully:", preference.id);

    // Criar conexão com Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Salvar dados do estudante antes do redirecionamento
    console.log("💾 Saving student data...");
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: email,
        name: name,
        phone: phone || null,
        pagseguro_transaction_id: preference.id,
        course_access: false,
      }, {
        onConflict: "email"
      });

    if (studentError) {
      console.error("Error saving student:", studentError);
    } else {
      console.log("✅ Student data saved");
    }

    return new Response(
      JSON.stringify({
        preferenceId: preference.id,
        initPoint: preference.init_point,
        accessToken: accessToken, // Enviar para processar pagamentos no frontend
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in mercado-pago-checkout:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
