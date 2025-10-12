-- Habilitar extensão pgcrypto para criptografia
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Recriar a função de criptografia com os tipos corretos
CREATE OR REPLACE FUNCTION public.encrypt_moodle_password(password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF password IS NULL OR password = '' THEN
    RETURN NULL;
  END IF;
  -- Usar cipher 'aes' requer especificar tipo bytea explicitamente
  RETURN encode(
    encrypt(
      password::bytea, 
      'moodle-encryption-key-2025'::bytea, 
      'aes'
    ), 
    'base64'
  );
END;
$function$;

-- Recriar a função de descriptografia com os tipos corretos
CREATE OR REPLACE FUNCTION public.decrypt_moodle_password(encrypted_password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF encrypted_password IS NULL OR encrypted_password = '' THEN
    RETURN NULL;
  END IF;
  RETURN convert_from(
    decrypt(
      decode(encrypted_password, 'base64'), 
      'moodle-encryption-key-2025'::bytea, 
      'aes'
    ), 
    'utf8'
  );
END;
$function$;