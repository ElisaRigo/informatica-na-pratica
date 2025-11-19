import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderRequest {
  customer: {
    name: string;
    email: string;
    tax_id: string;
    phone: string;
  };
  address: {
    street: string;
    number: string;
    complement?: string;
    locality: string;
    city: string;
    region_code: string;
    postal_code: string;
  };
  card: {
    number: string;
    exp_month: string;
    exp_year: string;
    security_code: string;
    holder: {
      name: string;
    };
  };
  amount: number;
  installments?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!PAGSEGURO_TOKEN) {
      throw new Error('PAGSEGURO_API_TOKEN não configurado');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const orderData: OrderRequest = await req.json();

    console.log('📦 Criando pedido PagSeguro com cartão');

    // Formatar telefone
    const phoneClean = orderData.customer.phone.replace(/\D/g, '');
    const phoneArea = phoneClean.substring(0, 2);
    const phoneNumber = phoneClean.substring(2);

    // Criar payload do pedido
    const payload = {
      reference_id: `order-${Date.now()}`,
      customer: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        tax_id: orderData.customer.tax_id.replace(/\D/g, ''),
        phones: [
          {
            country: "55",
            area: phoneArea,
            number: phoneNumber,
            type: "MOBILE"
          }
        ]
      },
      items: [
        {
          reference_id: "curso-informatica",
          name: "Curso de Informática para Iniciantes",
          quantity: 1,
          unit_amount: Math.round(orderData.amount * 100) // Converter para centavos
        }
      ],
      shipping: {
        address: {
          street: orderData.address.street,
          number: orderData.address.number,
          complement: orderData.address.complement || "",
          locality: orderData.address.locality,
          city: orderData.address.city,
          region_code: orderData.address.region_code,
          country: "BRA",
          postal_code: orderData.address.postal_code.replace(/\D/g, '')
        }
      },
      charges: [
        {
          reference_id: `charge-${Date.now()}`,
          description: "Pagamento do Curso de Informática",
          amount: {
            value: Math.round(orderData.amount * 100),
            currency: "BRL"
          },
          payment_method: {
            type: "CREDIT_CARD",
            installments: orderData.installments || 1,
            capture: true,
            card: {
              number: orderData.card.number.replace(/\s/g, ''),
              exp_month: orderData.card.exp_month,
              exp_year: orderData.card.exp_year,
              security_code: orderData.card.security_code,
              holder: {
                name: orderData.card.holder.name
              }
            }
          }
        }
      ],
      notification_urls: [
        `${SUPABASE_URL}/functions/v1/pagseguro-webhook`
      ]
    };

    console.log('📤 Enviando para PagSeguro:', JSON.stringify(payload, null, 2));

    // Fazer requisição para PagSeguro
    const response = await fetch('https://api.pagseguro.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAGSEGURO_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log('📥 Resposta PagSeguro:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(`PagSeguro error: ${JSON.stringify(responseData)}`);
    }

    // Salvar no banco
    const charge = responseData.charges?.[0];
    if (charge) {
      const { error: dbError } = await supabase
        .from('payments')
        .insert({
          pagseguro_transaction_id: charge.id,
          payment_provider: 'pagseguro',
          payment_method: 'credit_card',
          amount: orderData.amount,
          status: charge.status,
          webhook_data: responseData
        });

      if (dbError) {
        console.error('Erro ao salvar no banco:', dbError);
      }

      // Salvar estudante
      const { error: studentError } = await supabase
        .from('students')
        .upsert({
          email: orderData.customer.email,
          name: orderData.customer.name,
          phone: orderData.customer.phone,
          pagseguro_transaction_id: charge.id,
          course_access: charge.status === 'PAID'
        }, {
          onConflict: 'email'
        });

      if (studentError) {
        console.error('Erro ao salvar estudante:', studentError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        order: responseData,
        charge: charge,
        status: charge?.status
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Erro:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
