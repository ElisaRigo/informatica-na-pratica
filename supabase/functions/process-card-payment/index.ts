import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paymentData = await req.json();

    console.log("Processing card payment...");

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("Mercado Pago access token not configured");
    }

    const serverSidePrice = parseFloat(Deno.env.get("COURSE_PRICE") || "297.00");

    // Extrair apenas campos confiáveis do cliente
    const trustedFields = {
      token: paymentData.token,
      installments: paymentData.installments,
      payment_method_id: paymentData.payment_method_id,
      issuer_id: paymentData.issuer_id,
    };

    if (!trustedFields.token) {
      throw new Error("Token do cartão é obrigatório");
    }

    // Criar pagamento com cartão — valor autoritário do servidor
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": `${paymentData.payer?.email || 'guest'}-${Date.now()}`,
      },
      body: JSON.stringify({
        ...trustedFields,
        transaction_amount: serverSidePrice,
        description: "Curso Completo de Informática na Prática",
        statement_descriptor: "INFORMATICA PRATICA",
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago-webhook`,
        external_reference: `${paymentData.payer?.email || 'guest'}-${Date.now()}`,
        payer: paymentData.payer || {},
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mercado Pago API error:", errorData);
      throw new Error(`Erro ao processar pagamento: ${response.status}`);
    }

    const payment = await response.json();
    console.log("Payment processed:", payment.id, "Status:", payment.status);

    // CRÍTICO: Salvar estudante PRIMEIRO para que o webhook encontre
    console.log("💾 Saving student data...");
    const payer = paymentData.payer || {};
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: payer.email || null,
        name: `${payer.first_name || ''} ${payer.last_name || ''}`.trim() || null,
        phone: payer.phone ? `${payer.phone.area_code}${payer.phone.number}` : null,
        pagseguro_transaction_id: String(payment.id),
        course_access: false,
      }, {
        onConflict: "email"
      });

    if (studentError) {
      console.error("Error saving student:", studentError);
    } else {
      console.log("✅ Student saved - webhook will complete enrollment");
    }

    // Salvar pagamento no banco
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        pagseguro_transaction_id: String(payment.id),
        payment_provider: "mercado_pago",
        amount: serverSidePrice,
        status: payment.status,
        payment_method: "credit_card",
        webhook_data: payment,
      });

    if (paymentError && paymentError.code !== "23505") {
      console.error("Error saving payment:", paymentError);
    } else {
      console.log("✅ Payment saved");
    }

    return new Response(
      JSON.stringify({
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing card payment:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
