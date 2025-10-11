-- Adiciona extensão para criptografia
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Cria função para criptografar senhas do Moodle
CREATE OR REPLACE FUNCTION encrypt_moodle_password(password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF password IS NULL OR password = '' THEN
    RETURN NULL;
  END IF;
  RETURN encode(encrypt(password::bytea, 'moodle-encryption-key-2025', 'aes'), 'base64');
END;
$$;

-- Cria função para descriptografar senhas do Moodle
CREATE OR REPLACE FUNCTION decrypt_moodle_password(encrypted_password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF encrypted_password IS NULL OR encrypted_password = '' THEN
    RETURN NULL;
  END IF;
  RETURN convert_from(decrypt(decode(encrypted_password, 'base64'), 'moodle-encryption-key-2025', 'aes'), 'utf8');
END;
$$;

-- Adiciona políticas para que usuários futuros possam ver seus próprios dados
-- (quando implementarmos autenticação de alunos)
CREATE POLICY "Students can view their own data"
ON public.students
FOR SELECT
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- Adiciona política para que alunos possam ver seus próprios pagamentos
CREATE POLICY "Students can view their own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (
  student_id IN (
    SELECT id FROM public.students 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- Cria tabela de auditoria para acessos a pagamentos
CREATE TABLE IF NOT EXISTS public.payment_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  payment_id uuid NOT NULL,
  accessed_at timestamp with time zone DEFAULT now(),
  action text NOT NULL
);

ALTER TABLE public.payment_access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view access logs"
ON public.payment_access_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));