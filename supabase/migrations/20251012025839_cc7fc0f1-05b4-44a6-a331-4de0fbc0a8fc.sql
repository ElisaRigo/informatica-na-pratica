-- Remover as funções de criptografia problemáticas
DROP FUNCTION IF EXISTS public.encrypt_moodle_password(text);
DROP FUNCTION IF EXISTS public.decrypt_moodle_password(text);

-- Atualizar a tabela students para armazenar senha em texto plano (temporário)
ALTER TABLE public.students 
  ALTER COLUMN moodle_password TYPE text;