import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransparentCheckoutRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCPF: string;
  cardToken: string;
  senderHash: string;
  installments?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
    if (!PAGSEGURO_TOKEN) {
      throw new Error('PagSeguro API token not configured');
    }

    const body: TransparentCheckoutRequest = await req.json();
    console.log('Processing transparent checkout for:', body.customerEmail);

    const installments = body.installments || 1;
    const amount = 297.00;

    // Construir XML para pagamento direto com cartão de crédito tokenizado
    const paymentXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<payment>
  <mode>default</mode>
  <method>creditCard</method>
  <sender>
    <name>${body.customerName}</name>
    <email>${body.customerEmail}</email>
    <phone>
      <areaCode>${body.customerPhone.substring(0, 2)}</areaCode>
      <number>${body.customerPhone.substring(2)}</number>
    </phone>
    <documents>
      <document>
        <type>CPF</type>
        <value>${body.customerCPF}</value>
      </document>
    </documents>
    <hash>${body.senderHash}</hash>
  </sender>
  <currency>BRL</currency>
  <items>
    <item>
      <id>0001</id>
      <description>Informática na Prática - Curso Completo</description>
      <quantity>1</quantity>
      <amount>${amount.toFixed(2)}</amount>
    </item>
  </items>
  <creditCard>
    <token>${body.cardToken}</token>
    <installment>
      <quantity>${installments}</quantity>
      <value>${(amount / installments).toFixed(2)}</value>
    </installment>
    <holder>
      <name>${body.customerName}</name>
      <documents>
        <document>
          <type>CPF</type>
          <value>${body.customerCPF}</value>
        </document>
      </documents>
      <birthDate>01/01/1990</birthDate>
      <phone>
        <areaCode>${body.customerPhone.substring(0, 2)}</areaCode>
        <number>${body.customerPhone.substring(2)}</number>
      </phone>
    </holder>
  </creditCard>
  <billingAddress>
    <street>Av. Brig. Faria Lima</street>
    <number>1384</number>
    <complement>5º andar</complement>
    <district>Jardim Paulistano</district>
    <city>São Paulo</city>
    <state>SP</state>
    <country>BRA</country>
    <postalCode>01452002</postalCode>
  </billingAddress>
</payment>`;

    console.log('Sending payment request to PagSeguro...');

    // Enviar requisição para o PagSeguro
    const response = await fetch(
      `https://ws.pagseguro.uol.com.br/v2/transactions?email=contato@informaticapratica.com.br&token=${PAGSEGURO_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8',
        },
        body: paymentXML,
      }
    );

    const responseText = await response.text();
    console.log('PagSeguro Response:', responseText);

    if (!response.ok) {
      console.error('PagSeguro Error Response:', responseText);
      throw new Error(`PagSeguro API error: ${response.status}`);
    }

    // Parse XML response
    const codeMatch = responseText.match(/<code>(.*?)<\/code>/);
    const statusMatch = responseText.match(/<status>(.*?)<\/status>/);
    
    if (!codeMatch) {
      throw new Error('Failed to parse transaction code from PagSeguro response');
    }

    const transactionCode = codeMatch[1];
    const transactionStatus = statusMatch ? statusMatch[1] : '1';

    console.log('Transaction created:', transactionCode, 'Status:', transactionStatus);

    // Salvar no banco de dados
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && supabaseKey) {
      const dbResponse = await fetch(`${supabaseUrl}/rest/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          transaction_id: transactionCode,
          customer_name: body.customerName,
          customer_email: body.customerEmail,
          customer_phone: body.customerPhone,
          customer_cpf: body.customerCPF,
          amount: 297.00,
          status: 'pending',
          payment_method: 'credit_card',
          is_test: false
        })
      });

      if (!dbResponse.ok) {
        console.error('Failed to save payment to database:', await dbResponse.text());
      } else {
        console.log('Payment saved to database successfully');
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: transactionCode,
        status: transactionStatus,
        message: 'Pagamento processado com sucesso'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in transparent checkout:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
