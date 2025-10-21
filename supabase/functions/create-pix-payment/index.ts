import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    // Criar pagamento PIX direto
    const paymentData = {
      transaction_amount: 497.00,
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
