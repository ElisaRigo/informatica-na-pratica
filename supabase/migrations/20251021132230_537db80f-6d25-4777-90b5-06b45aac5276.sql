-- Add 'mercado_pago' to the allowed payment providers
ALTER TABLE payments 
DROP CONSTRAINT IF EXISTS payments_payment_provider_check;

ALTER TABLE payments 
ADD CONSTRAINT payments_payment_provider_check 
CHECK (payment_provider = ANY (ARRAY['stripe'::text, 'pagseguro'::text, 'eduzz'::text, 'mercado_pago'::text]));