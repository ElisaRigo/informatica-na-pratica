import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
    
    if (!PAGSEGURO_TOKEN) {
      throw new Error('PAGSEGURO_API_TOKEN não configurado');
    }

    console.log('🔐 Connect Token Challenge recebido');
    console.log('📋 Headers:', JSON.stringify(Object.fromEntries(req.headers.entries())));

    // O PagSeguro espera receber de volta o token de autenticação
    // como resposta ao desafio
    return new Response(
      JSON.stringify({
        publicKey: PAGSEGURO_TOKEN
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('❌ Erro no Connect Token Challenge:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
})
