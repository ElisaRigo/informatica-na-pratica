import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MOODLE_URL = 'https://aluno.informaticanapratica.com.br';
const MOODLE_TOKEN = Deno.env.get('MOODLE_API_TOKEN');
const COURSE_ID = 2;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

async function callMoodleAPI(functionName: string, params: Record<string, any>) {
  const url = new URL(`${MOODLE_URL}/webservice/rest/server.php`);
  url.searchParams.set('wstoken', MOODLE_TOKEN!);
  url.searchParams.set('wsfunction', functionName);
  url.searchParams.set('moodlewsrestformat', 'json');

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, String(params[key]));
  });

  const response = await fetch(url.toString(), { method: 'POST' });
  if (!response.ok) {
    throw new Error(`Moodle API HTTP error: ${response.status}`);
  }

  const data = await response.json();
  if (data === null) return data;
  if (data && (data.exception || data.errorcode)) {
    throw new Error(`Moodle API error: ${data.message || JSON.stringify(data)}`);
  }

  return data;
}

async function encryptPassword(password: string): Promise<string> {
  const { data, error } = await supabase.rpc('encrypt_moodle_password', { password });
  if (error) throw error;
  return data;
}

async function enrollUserInCourse(userId: number) {
  const enrollmentData = {
    'enrolments[0][roleid]': 5,
    'enrolments[0][userid]': userId,
    'enrolments[0][courseid]': COURSE_ID,
  };
  return await callMoodleAPI('enrol_manual_enrol_users', enrollmentData);
}

async function sendWelcomeEmail(name: string, email: string, username: string, password: string | null) {
  const firstName = name.split(' ')[0];
  
  const passwordInfo = password 
    ? `<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #0080BB;">
         <p style="margin: 0 0 15px 0; font-size: 16px; color: #0c4a6e; font-weight: 600;">🔑 Suas credenciais de acesso:</p>
         <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
           <p style="margin: 8px 0; font-size: 15px; color: #334155;"><strong style="color: #0080BB;">Usuário:</strong> <span style="font-family: 'Courier New', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 16px;">${username}</span></p>
           <p style="margin: 8px 0; font-size: 15px; color: #334155;"><strong style="color: #0080BB;">Senha:</strong> <span style="font-family: 'Courier New', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 16px;">${password}</span></p>
         </div>
       </div>`
    : `<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #0080BB;">
         <p style="margin: 0; font-size: 15px; color: #0c4a6e;">🔐 Use suas credenciais de acesso existentes.</p>
       </div>`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; padding: 20px; background: #f1f5f9;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,128,187,0.15);">
        <div style="background: linear-gradient(135deg, #0080BB 0%, #005A87 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0;">🎉 Bem-vindo ao Curso!</h1>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 18px; font-weight: 600;">Olá, ${firstName}! 👋</p>
          <p style="color: #475569;">Parabéns! Sua matrícula foi confirmada com sucesso.</p>
          ${passwordInfo}
          <p style="color: #475569;">Sua plataforma já está pronta! Acesse agora:</p>
          <div style="text-align: center; margin: 35px 0;">
            <a href="${MOODLE_URL}" style="display: inline-block; background: linear-gradient(135deg, #0080BB 0%, #005A87 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 10px; font-weight: 600;">🎯 Acessar Plataforma</a>
          </div>
          <p style="color: #64748b; font-size: 15px;">Bons estudos! 📚<br><strong style="color: #0080BB;">Prof. Elisa</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await resend.emails.send({
    from: "Informática na Prática <contato@informaticanapratica.com.br>",
    to: [email],
    subject: "🎉 Bem-vindo ao Curso de Informática!",
    html: emailHtml,
  });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId } = await req.json();

    console.log(`Reprocessing payment: ${transactionId}`);

    // 1. Buscar o pagamento
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('pagseguro_transaction_id', transactionId)
      .single();

    if (paymentError || !payment) {
      throw new Error('Payment not found');
    }

    const customerEmail = payment.webhook_data?.customer?.email;
    const customerName = payment.webhook_data?.customer?.name;

    if (!customerEmail || !customerName) {
      throw new Error('Customer info not found in payment data');
    }

    console.log(`Found payment for: ${customerName} (${customerEmail})`);

    // 2. Buscar usuário no Moodle
    const existingUser = await callMoodleAPI('core_user_get_users_by_field', {
      field: 'email',
      'values[0]': customerEmail
    });

    if (!existingUser || !existingUser[0]) {
      throw new Error('User not found in Moodle');
    }

    const moodleUser = existingUser[0];
    console.log(`Found Moodle user: ${moodleUser.username} (ID: ${moodleUser.id})`);

    // 3. Matricular no curso
    try {
      await enrollUserInCourse(moodleUser.id);
      console.log('✅ User enrolled in course');
    } catch (enrollError) {
      console.error('Enrollment error (might already be enrolled):', enrollError);
    }

    // 4. Salvar/atualizar no banco
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .upsert({
        email: customerEmail,
        name: customerName,
        moodle_username: moodleUser.username,
        moodle_password: null, // Senha já existe no Moodle
        course_access: true,
        pagseguro_transaction_id: transactionId
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (studentError) {
      throw new Error(`Error saving student: ${studentError.message}`);
    }

    console.log('✅ Student saved:', studentData);

    // Atualizar payment com student_id
    await supabase
      .from('payments')
      .update({ student_id: studentData.id })
      .eq('id', payment.id);

    // 5. Enviar email
    await sendWelcomeEmail(customerName, customerEmail, moodleUser.username, null);
    console.log('✅ Welcome email sent');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment reprocessed successfully',
        student: studentData
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error reprocessing payment:', error);
    
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