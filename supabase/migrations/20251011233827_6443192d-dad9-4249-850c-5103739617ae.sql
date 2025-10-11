-- Remove a política que permite alunos verem seus próprios pagamentos (webhook_data é sensível)
DROP POLICY IF EXISTS "Students can view their own payments" ON public.payments;

-- Remove a política que permite alunos verem seus próprios dados completos
DROP POLICY IF EXISTS "Students can view their own data" ON public.students;

-- Cria uma view segura dos dados dos alunos (sem senha)
CREATE OR REPLACE VIEW public.students_safe_view AS
SELECT 
  id,
  email,
  name,
  moodle_username,
  course_access,
  created_at,
  updated_at
FROM public.students;

-- Cria uma view segura dos pagamentos (sem webhook_data)
CREATE OR REPLACE VIEW public.payments_safe_view AS
SELECT 
  id,
  student_id,
  amount,
  status,
  payment_method,
  created_at,
  updated_at
FROM public.payments;

-- Política para alunos verem apenas seus próprios dados (via view segura)
CREATE POLICY "Students can view their safe data"
ON public.students
FOR SELECT
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
  AND auth.uid() IS NOT NULL
);

-- Nota: Como estamos usando views, não precisamos de política na tabela payments
-- Os admins já têm acesso total via política existente