-- Recriar a função de criptografia com o tipo correto
DROP FUNCTION IF EXISTS public.encrypt_moodle_password(text);

CREATE OR REPLACE FUNCTION public.encrypt_moodle_password(password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF password IS NULL OR password = '' THEN
    RETURN NULL;
  END IF;
  
  -- Usar encrypt com tipos corretos (bytea, bytea, text)
  RETURN encode(
    encrypt(
      password::bytea, 
      'moodle-encryption-key-2025'::bytea, 
      'aes'::text
    ), 
    'base64'
  );
END;
$$;