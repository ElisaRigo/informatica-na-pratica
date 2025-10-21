import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PixPaymentRequest {
  name: string;
  email: string;
  cpf: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, cpf }: PixPaymentRequest = await req.json();

    console.log("Creating PIX payment for:", { email, name });

    if (!name || !email || !cpf) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("Mercado Pago access token not configured");
    }

    // Obter o preço do curso do ambiente
    const coursePrice = parseFloat(Deno.env.get("COURSE_PRICE") || "297.00");
    
    // Criar pagamento PIX direto
    const paymentData = {
      transaction_amount: coursePrice,
      description: "Curso Completo - Elisa Ensina",
      payment_method_id: "pix",
      payer: {
        email: email,
        first_name: name.split(" ")[0],
        last_name: name.split(" ").slice(1).join(" ") || ".",
        identification: {
          type: "CPF",
          number: cpf.replace(/\D/g, ""),
        },
      },
      notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago-webhook`,
      external_reference: `${email}-${Date.now()}`,
      statement_descriptor: "ELISA ENSINA",
    };

    console.log("Creating PIX payment...");

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": `${email}-${Date.now()}`, // Evitar pagamentos duplicados
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mercado Pago API error:", errorData);
      throw new Error(`Erro ao criar pagamento PIX: ${response.status}`);
    }

    const payment = await response.json();
    console.log("PIX payment created:", payment.id);

    // Extrair dados do PIX
    const pixData = payment.point_of_interaction?.transaction_data;
    
    if (!pixData) {
      throw new Error("Dados do PIX não encontrados na resposta");
    }

    // Salvar dados do pagamento com status "pending"
    console.log("💾 Saving payment data...");
    const { data: paymentRecord, error: paymentError } = await supabase
      .from("payments")
      .insert({
        pagseguro_transaction_id: String(payment.id),
        payment_provider: "mercado_pago",
        amount: coursePrice,
        status: "pending",
        payment_method: "pix",
        webhook_data: payment,
      })
      .select()
      .single();

    if (paymentError) {
      console.error("Error saving payment:", paymentError);
      // Não falhar se o pagamento já foi salvo
      if (paymentError.code !== "23505") {
        throw paymentError;
      }
    } else {
      console.log("✅ Payment saved:", paymentRecord.id);
    }

    // Salvar dados do estudante com status pending
    console.log("💾 Saving student data...");
    const { error: studentError } = await supabase
      .from("students")
      .upsert({
        email: email,
        name: name,
        pagseguro_transaction_id: String(payment.id),
        course_access: false, // Será ativado quando o pagamento for aprovado
      }, {
        onConflict: "email"
      });

    if (studentError) {
      console.error("Error saving student:", studentError);
      // Não falhar, continuar mesmo com erro
    } else {
      console.log("✅ Student data saved");
    }

    return new Response(
      JSON.stringify({
        paymentId: payment.id,
        status: payment.status,
        qrCode: pixData.qr_code, // Código PIX (texto)
        qrCodeBase64: pixData.qr_code_base64, // QR Code em base64 (imagem)
        ticketUrl: pixData.ticket_url, // URL alternativa
        expirationDate: payment.date_of_expiration,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating PIX payment:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
