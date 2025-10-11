-- Remove política que permite acesso público aos pagamentos
DROP POLICY IF EXISTS "Anyone can view recent payments for status check" ON public.payments;

-- Cria política para que apenas admins possam visualizar pagamentos
CREATE POLICY "Only admins can view payments"
ON public.payments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Cria política para que apenas admins possam visualizar dados dos alunos
CREATE POLICY "Only admins can view students"
ON public.students
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));