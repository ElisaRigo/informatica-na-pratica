import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { orderId } = await req.json();
    
    if (!orderId) {
      throw new Error('orderId é obrigatório');
    }

    console.log('🔍 Consultando pedido:', orderId);

    // Consultar pedido no PagSeguro
    const response = await fetch(`https://api.pagseguro.com/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAGSEGURO_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao consultar pedido: ${response.status}`);
    }

    const orderData = await response.json();
    console.log('📥 Status do pedido:', orderData);

    // Atualizar no banco se necessário
    const charge = orderData.charges?.[0];
    if (charge && charge.status === 'PAID') {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      // Atualizar payment
      await supabase
        .from('payments')
        .update({ 
          status: 'PAID',
          webhook_data: orderData
        })
        .eq('pagseguro_transaction_id', orderId);

      // Dar acesso ao curso
      await supabase
        .from('students')
        .update({ course_access: true })
        .eq('pagseguro_transaction_id', orderId);
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: charge?.status || 'WAITING',
        order: orderData
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
