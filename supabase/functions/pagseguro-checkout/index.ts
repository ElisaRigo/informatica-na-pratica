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
  customerName?: string;
  customerEmail?: string;
  customerTaxId?: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== 🚀 INICIANDO CHECKOUT PAGSEGURO (SEM CADASTRO PRÉVIO) ===');
    
    const requestBody = await req.json().catch(() => ({}));
    console.log('📦 Request body recebido:', JSON.stringify(requestBody));
    
    const { customerName, customerEmail, customerTaxId }: CheckoutRequest = requestBody;

    // ✅ Usar dados genéricos - Cliente preenche no PagSeguro
    const name = customerName || 'Comprador';
    const email = customerEmail || 'comprador@checkout.com';
    const cpf = (customerTaxId || '00000000191').replace(/\D/g, '');

    console.log('✅ Dados processados (genéricos para checkout direto):', {
      name,
      email,
      cpf,
      isGeneric: !customerName
    });

    // Validar token
    if (!PAGSEGURO_TOKEN) {
      throw new Error('PAGSEGURO_API_TOKEN não configurado');
    }

    console.log('Token PagSeguro:', PAGSEGURO_TOKEN ? 'Configurado ✅' : 'NÃO CONFIGURADO ❌');

    // Montar XML para API v2 do PagSeguro
    // Deixando TODAS as opções de pagamento disponíveis (sem restrições)
    const xmlBody = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<checkout>
  <currency>BRL</currency>
  <reference>CURSO_${Date.now()}</reference>
  <items>
    <item>
      <id>0001</id>
      <description>Curso de Informatica na Pratica</description>
      <amount>297.00</amount>
      <quantity>1</quantity>
    </item>
  </items>
  <sender>
    <name>${name}</name>
    <email>${email}</email>
    <documents>
      <document>
        <type>CPF</type>
        <value>${cpf}</value>
      </document>
    </documents>
  </sender>
  <redirectURL>${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://informatica-descomplicada.lovable.app'}/aguardando-confirmacao?method=pagseguro</redirectURL>
  <maxUses>1</maxUses>
  <maxAge>3600</maxAge>
</checkout>`;

    console.log('XML preparado (sem senha e dados sensíveis)');
    console.log('URL da API:', `https://ws.pagseguro.uol.com.br/v2/checkout?email=${PAGSEGURO_EMAIL}&token=***`);

    const pagseguroResponse = await fetch(
      `https://ws.pagseguro.uol.com.br/v2/checkout?email=${PAGSEGURO_EMAIL}&token=${PAGSEGURO_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8'
        },
        body: xmlBody
      }
    );

    const xmlResponse = await pagseguroResponse.text();
    console.log('Status da resposta:', pagseguroResponse.status);
    console.log('Resposta XML:', xmlResponse);

    if (!pagseguroResponse.ok) {
      console.error('❌ Erro na API do PagSeguro');
      
      // Extrair mensagem de erro do XML
      const getXmlValue = (xml: string, tag: string): string => {
        const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
        const match = xml.match(regex);
        return match ? match[1] : '';
      };
      
      const errorCode = getXmlValue(xmlResponse, 'code');
      const errorMessage = getXmlValue(xmlResponse, 'message');
      
      console.error('Código do erro:', errorCode);
      console.error('Mensagem:', errorMessage);
      
      throw new Error(`PagSeguro: ${errorMessage || 'Erro ao processar'} (código: ${errorCode || pagseguroResponse.status})`);
    }

    // Extrair código do checkout
    const getXmlValue = (xml: string, tag: string): string => {
      const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
      const match = xml.match(regex);
      return match ? match[1] : '';
    };

    const checkoutCode = getXmlValue(xmlResponse, 'code');
    const checkoutDate = getXmlValue(xmlResponse, 'date');

    if (!checkoutCode) {
      console.error('❌ Código do checkout não encontrado na resposta');
      throw new Error('Falha ao obter código do checkout');
    }

    console.log('✅ Checkout criado com sucesso! Cliente pode pagar com PIX, Boleto ou Cartão');
    console.log('📝 Código do checkout:', checkoutCode);

    // Salvar no banco (com try-catch para não bloquear o fluxo)
    try {
      const { error: saveError } = await supabase
        .from('payments')
        .insert({
          pagseguro_transaction_id: checkoutCode,
          status: 'initiated',
          amount: 297.00,
          payment_provider: 'pagseguro',
          payment_method: 'pix',
          webhook_data: {
            customerName: name,
            customerEmail: email,
            customerCPF: cpf,
            checkoutDate,
            reference: `CURSO_${Date.now()}`
          }
        });

      if (saveError) {
        console.error('⚠️ Erro ao salvar no banco (não crítico):', saveError.message);
      } else {
        console.log('✅ Pagamento salvo no banco');
      }
    } catch (dbError: any) {
      console.error('⚠️ Erro no banco de dados:', dbError.message);
    }

    // URL de pagamento do PagSeguro
    const paymentUrl = `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=${checkoutCode}`;
    console.log('🔗 URL de pagamento:', paymentUrl);
    console.log('=== ✅ CHECKOUT CONCLUÍDO COM SUCESSO ===');

    return new Response(
      JSON.stringify({
        success: true,
        checkoutCode,
        paymentUrl,
        redirectUrl: `/aguardando-confirmacao?transaction_id=${checkoutCode}&method=pagseguro`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ ERRO GERAL:', error.message);
    console.error('Stack:', error.stack);

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
