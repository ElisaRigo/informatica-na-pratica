import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const PAGSEGURO_EMAIL = 'elisa_cnt@hotmail.com';
    
    if (!PAGSEGURO_TOKEN) {
      throw new Error('PagSeguro API token not configured');
    }

    console.log('Creating PagSeguro session...');

    // Criar sessão no PagSeguro
    const response = await fetch(
      `https://ws.pagseguro.uol.com.br/v2/sessions?email=${PAGSEGURO_EMAIL}&token=${PAGSEGURO_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PagSeguro Session Error:', errorText);
      throw new Error(`Failed to create session: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('PagSeguro Session Response:', responseText);

    // Extrair session ID do XML
    const sessionMatch = responseText.match(/<id>(.*?)<\/id>/);
    
    if (!sessionMatch) {
      throw new Error('Failed to parse session ID from PagSeguro response');
    }

    const sessionId = sessionMatch[1];
    console.log('Session created:', sessionId);

    return new Response(
      JSON.stringify({
        success: true,
        sessionId: sessionId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error creating session:', error);
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