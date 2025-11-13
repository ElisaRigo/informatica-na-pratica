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

    // Criar pagamento com cartão
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": `${paymentData.payer.email}-${Date.now()}`,
      },
      body: JSON.stringify({
        ...paymentData,
        description: "Curso Completo de Informática na Prática",
        statement_descriptor: "INFORMATICA PRATICA",
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago-webhook`,
        external_reference: `${paymentData.payer.email}-${Date.now()}`,
        additional_info: {
          items: [
            {
              id: "curso-informatica",
              title: "Curso Completo de Informática na Prática",
              description: "Curso completo de informática com Word, Excel, PowerPoint, Windows e Internet",
              category_id: "education",
              quantity: 1,
              unit_price: paymentData.transaction_amount
            }
          ],
          payer: {
            first_name: paymentData.payer.first_name,
            last_name: paymentData.payer.last_name
          }
        }
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
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: paymentData.payer.email,
        name: `${paymentData.payer.first_name} ${paymentData.payer.last_name}`,
        phone: paymentData.payer.phone ? `${paymentData.payer.phone.area_code}${paymentData.payer.phone.number}` : null,
        pagseguro_transaction_id: String(payment.id),
        course_access: false, // Será ativado pelo webhook quando aprovado
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
        amount: paymentData.transaction_amount,
        status: payment.status,
        payment_method: "credit_card",
        webhook_data: payment,
      });

    if (paymentError && paymentError.code !== "23505") {
      console.error("Error saving payment:", paymentError);
    } else {
      console.log("✅ Payment saved");
    }

    // O webhook do Mercado Pago será chamado automaticamente e vai:
    // 1. Criar usuário no Moodle
    // 2. Matricular no curso
    // 3. Enviar email de boas-vindas
    // 4. Atualizar course_access para true
    console.log("✅ Payment created - webhook will handle Moodle enrollment and welcome email");

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
