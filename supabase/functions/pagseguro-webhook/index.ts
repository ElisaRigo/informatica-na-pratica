import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MOODLE_URL = 'https://aluno.informaticanapratica.com.br';
const MOODLE_TOKEN = Deno.env.get('MOODLE_API_TOKEN');
const PAGSEGURO_TOKEN = Deno.env.get('PAGSEGURO_API_TOKEN');
const COURSE_ID = 2;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface PagSeguroWebhook {
  id?: string;
  customer?: {
    name: string;
    email: string;
  };
  status?: string;
  amount?: number;
  payment_method?: {
    type?: string;
  };
}

async function callMoodleAPI(functionName: string, params: Record<string, any>) {
  const url = new URL(`${MOODLE_URL}/webservice/rest/server.php`);
  url.searchParams.set('wstoken', MOODLE_TOKEN!);
  url.searchParams.set('wsfunction', functionName);
  url.searchParams.set('moodlewsrestformat', 'json');

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, String(params[key]));
  });

  console.log(`Calling Moodle API: ${functionName}`, params);

  const response = await fetch(url.toString(), {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Moodle API HTTP error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Moodle API response for ${functionName}:`, data);

  // Se data é null, considerar como sucesso (enrol_manual_enrol_users retorna null em sucesso)
  if (data === null) {
    console.log(`✅ API ${functionName} completed successfully (null response)`);
    return data;
  }

  // Verificar erros apenas se data não for null
  if (data && (data.exception || data.errorcode)) {
    throw new Error(`Moodle API error: ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

async function createMoodleUser(name: string, email: string) {
  // Gerar username a partir do email
  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Gerar senha segura com requisitos: mínimo 8 caracteres, 1 maiúscula, 1 caractere especial
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%&*';
  
  let password = '';
  password += upperChars[Math.floor(Math.random() * upperChars.length)]; // 1 maiúscula
  password += special[Math.floor(Math.random() * special.length)]; // 1 especial
  password += numbers[Math.floor(Math.random() * numbers.length)]; // 1 número
  
  // Completar com mais 5 caracteres aleatórios para ter 8 no total
  const allChars = chars + upperChars + numbers;
  for (let i = 0; i < 5; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Embaralhar a senha
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  const userData = {
    'users[0][username]': username,
    'users[0][password]': password,
    'users[0][firstname]': name.split(' ')[0],
    'users[0][lastname]': name.split(' ').slice(1).join(' ') || name.split(' ')[0],
    'users[0][email]': email,
    'users[0][auth]': 'manual',
  };

  try {
    const result = await callMoodleAPI('core_user_create_users', userData);
    console.log('User created:', result);
    return { userId: result[0].id, username, password };
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Se o usuário já existe, tentar buscar pelo email
    const existingUser = await callMoodleAPI('core_user_get_users_by_field', {
      field: 'email',
      'values[0]': email
    });

    if (existingUser && existingUser[0]) {
      console.log('User already exists:', existingUser[0]);
      return { userId: existingUser[0].id, username: existingUser[0].username, password: null };
    }

    throw error;
  }
}

async function enrollUserInCourse(userId: number) {
  const enrollmentData = {
    'enrolments[0][roleid]': 5, // Role ID 5 = student
    'enrolments[0][userid]': userId,
    'enrolments[0][courseid]': COURSE_ID,
  };

  const result = await callMoodleAPI('enrol_manual_enrol_users', enrollmentData);
  console.log('User enrolled:', result);
  return result;
}

async function sendWelcomeEmail(name: string, email: string, username: string, password: string | null) {
  const firstName = name.split(' ')[0];
  
  const passwordInfo = password 
    ? `<p><strong>Suas credenciais de acesso:</strong></p>
       <p>Usuário: <strong>${username}</strong><br>
       Senha: <strong>${password}</strong></p>`
    : `<p>Use suas credenciais de acesso existentes para entrar na plataforma.</p>`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0080BB 0%, #005A87 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #0080BB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .credentials { background: white; padding: 15px; border-left: 4px solid #0080BB; margin: 20px 0; }
        .signature { margin-top: 20px; font-style: italic; color: #0080BB; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Bem-vindo ao Curso de Informática!</h1>
        </div>
        <div class="content">
          <p>Olá, <strong>${firstName}</strong>!</p>
          
          <p>Parabéns! Sua matrícula foi confirmada com sucesso. Estamos muito felizes em ter você conosco! 🚀</p>
          
          <div class="credentials">
            ${passwordInfo}
          </div>
          
          <p>Acesse a plataforma agora mesmo e comece a aprender:</p>
          
          <center>
            <a href="${MOODLE_URL}" class="button">Acessar Plataforma</a>
          </center>
          
          <p>Se tiver qualquer dúvida, estou à disposição para ajudar!</p>
          
          <p class="signature">Bons estudos! 📚<br>
          <strong>Prof. Elisa</strong><br>
          Informática na Prática</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: "Informática na Prática <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Bem-vindo ao Curso de Informática!",
      html: emailHtml,
    });

    console.log('Welcome email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received webhook from PagSeguro');
    console.log('Content-Type:', req.headers.get('content-type'));
    console.log('Headers:', JSON.stringify(Object.fromEntries(req.headers.entries())));
    
    // Ler o body como texto primeiro
    const bodyText = await req.text();
    console.log('Raw body:', bodyText);
    
    let payload: PagSeguroWebhook;
    
    // Tentar parsear como JSON primeiro
    try {
      payload = JSON.parse(bodyText);
      console.log('✅ Parsed as JSON:', JSON.stringify(payload, null, 2));
    } catch (jsonError) {
      console.log('❌ Not JSON format');
      
      // Se for notificationCode (formato antigo do PagSeguro)
      if (bodyText.includes('notificationCode=') || bodyText.includes('notification_code=')) {
        console.log('⚠️ Received old PagSeguro format (notificationCode)');
        
        // Extrair o notificationCode
        const params = new URLSearchParams(bodyText);
        const notificationCode = params.get('notificationCode') || params.get('notification_code');
        
        if (!notificationCode) {
          throw new Error('notificationCode not found in request');
        }
        
        console.log('📥 Fetching transaction details from PagSeguro API...');
        console.log('NotificationCode:', notificationCode);
        
        // Consultar API do PagSeguro v3 (formato antigo)
        const pagseguroUrl = `https://ws.pagseguro.uol.com.br/v3/transactions/notifications/${notificationCode}?email=elisa_cnt@hotmail.com&token=${PAGSEGURO_TOKEN}`;
        
        try {
          const pagseguroResponse = await fetch(pagseguroUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/xml;charset=UTF-8'
            }
          });
          
          if (!pagseguroResponse.ok) {
            console.error('PagSeguro API error:', pagseguroResponse.status);
            throw new Error(`PagSeguro API returned ${pagseguroResponse.status}`);
          }
          
          const xmlData = await pagseguroResponse.text();
          console.log('PagSeguro XML Response:', xmlData);
          
          // Parse XML simples (extrair dados principais)
          const getXmlValue = (xml: string, tag: string): string => {
            const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
            const match = xml.match(regex);
            return match ? match[1] : '';
          };
          
          const transactionCode = getXmlValue(xmlData, 'code');
          const status = getXmlValue(xmlData, 'status');
          const grossAmount = getXmlValue(xmlData, 'grossAmount');
          const senderName = getXmlValue(xmlData, 'name');
          const senderEmail = getXmlValue(xmlData, 'email');
          const paymentMethod = getXmlValue(xmlData, 'type');
          
          console.log('Parsed transaction:', {
            code: transactionCode,
            status,
            grossAmount,
            senderName,
            senderEmail,
            paymentMethod
          });
          
          // Mapear status do PagSeguro (1=Aguardando, 2=Em análise, 3=Paga, 4=Disponível, etc)
          // Status 3 ou 4 = aprovado
          if (status !== '3' && status !== '4') {
            console.log(`Payment status ${status} - not approved yet`);
            return new Response(
              JSON.stringify({ message: 'Payment not approved yet', status }), 
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          
          // Converter para formato payload compatível
          payload = {
            id: transactionCode,
            customer: {
              name: senderName,
              email: senderEmail
            },
            status: 'paid',
            amount: parseFloat(grossAmount),
            payment_method: {
              type: paymentMethod
            }
          };
          
          console.log('✅ Converted to payload:', payload);
          
        } catch (apiError: any) {
          console.error('Error fetching from PagSeguro API:', apiError);
          throw new Error(`Failed to fetch transaction: ${apiError.message}`);
        }
      } else {
        throw new Error(`Invalid payload format: ${bodyText.substring(0, 100)}`);
      }
    }

    // Verificar se o pagamento foi aprovado
    if (payload.status !== 'paid' && payload.status !== 'approved') {
      console.log('Payment not approved yet:', payload.status);
      return new Response(
        JSON.stringify({ message: 'Payment not approved yet' }), 
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const customerName = payload.customer?.name;
    const customerEmail = payload.customer?.email;

    if (!customerName || !customerEmail) {
      throw new Error('Missing customer information');
    }

    console.log(`Processing enrollment for: ${customerName} (${customerEmail})`);

    // 1. Salvar pagamento no banco
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        pagseguro_transaction_id: payload.id || `webhook_${Date.now()}`,
        status: payload.status,
        amount: payload.amount,
        payment_method: payload.payment_method?.type,
        webhook_data: payload
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error saving payment:', paymentError);
    } else {
      console.log('Payment saved:', paymentData);
    }

    // 2. Criar usuário no Moodle
    const { userId, username, password } = await createMoodleUser(customerName, customerEmail);
    console.log(`User created/found with ID: ${userId}`);

    // 3. Salvar aluno no banco
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .upsert({
        email: customerEmail,
        name: customerName,
        moodle_username: username,
        moodle_password: password,
        course_access: true,
        pagseguro_transaction_id: payload.id
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (studentError) {
      console.error('Error saving student:', studentError);
    } else {
      console.log('Student saved:', studentData);
      
      // Atualizar payment com student_id
      if (paymentData) {
        await supabase
          .from('payments')
          .update({ student_id: studentData.id })
          .eq('id', paymentData.id);
      }
    }

    // 4. Matricular no curso (CRÍTICO - deve funcionar)
    try {
      await enrollUserInCourse(userId);
      console.log(`✅ User enrolled successfully in course ${COURSE_ID}`);
    } catch (enrollError) {
      const errorMessage = enrollError instanceof Error ? enrollError.message : String(enrollError);
      console.error('❌ CRITICAL: Error enrolling user:', enrollError);
      throw new Error(`Failed to enroll user: ${errorMessage}`);
    }

    // 5. Enviar email de boas-vindas
    try {
      await sendWelcomeEmail(customerName, customerEmail, username, password);
      console.log('✅ Welcome email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Warning: Failed to send welcome email:', emailError);
      // Email não é crítico - apenas loga o erro mas não falha o processo
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User enrolled and email sent successfully',
        userId,
        username
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error processing webhook:', error);
    
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
