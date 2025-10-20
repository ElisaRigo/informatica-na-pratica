import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
const PAGSEGURO_EMAIL = 'elisa_cnt@hotmail.com';

// ⚠️ IMPORTANTE: API v2 cria CHECKOUT GENÉRICO (cliente escolhe método)
// Para PIX direto, seria necessário API v4 (mais complexa)
// Mantemos v2 por compatibilidade - cliente escolhe PIX na página do PagSeguro

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerTaxId: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, customerPhone, customerTaxId }: CheckoutRequest = await req.json();

    console.log('Creating PagSeguro payment link for:', customerEmail);
    console.log('Request data:', { customerName, customerEmail, customerPhone, customerTaxId });

    // Limpar dados
    const cleanCPF = customerTaxId.replace(/\D/g, '');
    const cleanPhone = customerPhone.replace(/\D/g, '');
    const areaCode = cleanPhone.substring(0, 2);
    const phoneNumber = cleanPhone.substring(2);

    console.log('Cleaned data:', { cleanCPF, cleanPhone, areaCode, phoneNumber });

    // Criar link de pagamento via API do PagSeguro v2 (XML)
    const checkoutData = {
      reference_id: `CURSO_${Date.now()}`,
      customer: {
        name: customerName,
        email: customerEmail,
        tax_id: cleanCPF,
        phones: [
          {
            country: '55',
            area: areaCode,
            number: phoneNumber,
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

    console.log('🔧 Sending request to PagSeguro API...');
    console.log('📧 Email vendedor:', PAGSEGURO_EMAIL);
    console.log('🔑 Token:', PAGSEGURO_TOKEN ? `Configurado (${PAGSEGURO_TOKEN.substring(0, 20)}...)` : 'NO TOKEN FOUND');

    if (!PAGSEGURO_TOKEN) {
      throw new Error('PAGSEGURO_API_TOKEN not configured');
    }

    // Gerar referência única
    const reference = `CURSO_${Date.now()}`;
    
    const xmlBody = `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<checkout>
  <currency>BRL</currency>
  <reference>${reference}</reference>
  <redirectURL>https://informatica-descomplicada.lovable.app/aguardando-confirmacao?method=pagseguro</redirectURL>
  <maxUses>200</maxUses>
  <maxAge>3600</maxAge>
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
      <areaCode>${areaCode}</areaCode>
      <number>${phoneNumber}</number>
    </phone>
    <documents>
      <document>
        <type>CPF</type>
        <value>${cleanCPF}</value>
      </document>
    </documents>
  </sender>
  <acceptedPaymentMethods>
    <include>
      <paymentMethod>
        <group>ONLINE_DEBIT</group>
      </paymentMethod>
    </include>
  </acceptedPaymentMethods>
</checkout>`;

    console.log('📤 XML enviado:', xmlBody.substring(0, 200) + '...');

    const pagseguroResponse = await fetch(`https://ws.pagseguro.uol.com.br/v2/checkout?email=${PAGSEGURO_EMAIL}&token=${PAGSEGURO_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml; charset=ISO-8859-1'
      },
      body: xmlBody
    });

    const xmlResponse = await pagseguroResponse.text();
    console.log('PagSeguro Response Status:', pagseguroResponse.status);
    console.log('PagSeguro Response:', xmlResponse);

    if (!pagseguroResponse.ok) {
      console.error('PagSeguro API error:', pagseguroResponse.status);
      console.error('PagSeguro Response Body:', xmlResponse);
      
      // Extrair mensagem de erro do XML
      const getXmlValue = (xml: string, tag: string): string => {
        const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
        const match = xml.match(regex);
        return match ? match[1] : '';
      };
      
      const errorCode = getXmlValue(xmlResponse, 'code');
      const errorMessage = getXmlValue(xmlResponse, 'message');
      
      console.error('Error Code:', errorCode);
      console.error('Error Message:', errorMessage);
      
      throw new Error(`PagSeguro: ${errorMessage || 'Erro ao processar pagamento'} (${errorCode || pagseguroResponse.status})`);
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
        payment_method: 'pix',
        webhook_data: {
          customerName,
          customerEmail,
          customerPhone,
          customerTaxId,
          checkoutDate,
          reference
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
