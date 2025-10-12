-- Corrigir a função de criptografia com cast explícito de tipo
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
  
  -- Usar cast explícito ::text para o algoritmo
  RETURN encode(
    encrypt(
      convert_to(password, 'utf8'),
      convert_to('moodle-encryption-key-2025', 'utf8'),
      'aes'::text
    ),
    'base64'
  );
END;
$$;

-- Corrigir a função de descriptografia também
CREATE OR REPLACE FUNCTION public.decrypt_moodle_password(encrypted_password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF encrypted_password IS NULL OR encrypted_password = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN convert_from(
    decrypt(
      decode(encrypted_password, 'base64'),
      convert_to('moodle-encryption-key-2025', 'utf8'),
      'aes'::text
    ),
    'utf8'
  );
END;
$$;