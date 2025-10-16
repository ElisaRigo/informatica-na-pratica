import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
const PAGSEGURO_EMAIL = 'elisa_cnt@hotmail.com';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCPF: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, customerPhone, customerCPF }: CheckoutRequest = await req.json();

    console.log('Creating PagSeguro payment link for:', customerEmail);

    // Criar link de pagamento via API do PagSeguro v4
    const checkoutData = {
      reference_id: `CURSO_${Date.now()}`,
      customer: {
        name: customerName,
        email: customerEmail,
        tax_id: customerCPF.replace(/\D/g, ''),
        phones: [
          {
            country: '55',
            area: customerPhone.substring(0, 2),
            number: customerPhone.substring(2).replace(/\D/g, ''),
            type: 'MOBILE'
          }
        ]
      },
      items: [
        {
          reference_id: 'CURSO_INFORMATICA',
          name: 'Curso de Informática na Prática',
          quantity: 1,
          unit_amount: 29700 // R$ 297,00 em centavos
        }
      ],
      notification_urls: [
        `${Deno.env.get('SUPABASE_URL')}/functions/v1/pagseguro-webhook`
      ]
    };

    console.log('Sending request to PagSeguro API...');

    const pagseguroResponse = await fetch(`https://ws.pagseguro.uol.com.br/v2/checkout?email=${PAGSEGURO_EMAIL}&token=${PAGSEGURO_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8'
      },
      body: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<checkout>
  <currency>BRL</currency>
  <redirectURL>https://afa78b97-840e-47e3-af65-707cd360c44b.lovableproject.com/aguardando-confirmacao</redirectURL>
  <notificationURL>${Deno.env.get('SUPABASE_URL')}/functions/v1/pagseguro-webhook</notificationURL>
  <items>
    <item>
      <id>0001</id>
      <description>Curso de Informatica na Pratica</description>
      <amount>297.00</amount>
      <quantity>1</quantity>
    </item>
  </items>
  <sender>
    <name>${customerName}</name>
    <email>${customerEmail}</email>
    <phone>
      <areaCode>${customerPhone.substring(0, 2)}</areaCode>
      <number>${customerPhone.substring(2).replace(/\D/g, '')}</number>
    </phone>
    <documents>
      <document>
        <type>CPF</type>
        <value>${customerCPF.replace(/\D/g, '')}</value>
      </document>
    </documents>
  </sender>
</checkout>`.replace(/\n/g, '')
    });

    const xmlResponse = await pagseguroResponse.text();
    console.log('PagSeguro Response:', xmlResponse);

    if (!pagseguroResponse.ok) {
      console.error('PagSeguro API error:', pagseguroResponse.status);
      throw new Error(`PagSeguro API returned ${pagseguroResponse.status}: ${xmlResponse}`);
    }

    // Extrair código do checkout do XML
    const getXmlValue = (xml: string, tag: string): string => {
      const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
      const match = xml.match(regex);
      return match ? match[1] : '';
    };

    const checkoutCode = getXmlValue(xmlResponse, 'code');
    const checkoutDate = getXmlValue(xmlResponse, 'date');

    if (!checkoutCode) {
      throw new Error('Failed to get checkout code from PagSeguro');
    }

    console.log('✅ Checkout created successfully:', checkoutCode);

    // Salvar informação do checkout iniciado
    const { error: saveError } = await supabase
      .from('payments')
      .insert({
        pagseguro_transaction_id: checkoutCode,
        status: 'initiated',
        amount: 297.00,
        webhook_data: {
          customerName,
          customerEmail,
          customerPhone,
          customerCPF,
          checkoutDate
        }
      });

    if (saveError) {
      console.error('Error saving checkout info:', saveError);
    }

    // Retornar URL de pagamento
    const paymentUrl = `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=${checkoutCode}`;

    return new Response(
      JSON.stringify({
        success: true,
        checkoutCode,
        paymentUrl,
        redirectUrl: `/aguardando-confirmacao?transaction_id=${checkoutCode}`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error creating checkout:', error);

    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
