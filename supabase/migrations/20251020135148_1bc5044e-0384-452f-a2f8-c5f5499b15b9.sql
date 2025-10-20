-- Add payment_provider column to payments table to distinguish between Stripe, PagSeguro, and Eduzz
ALTER TABLE public.payments 
ADD COLUMN payment_provider text NOT NULL DEFAULT 'stripe' CHECK (payment_provider IN ('stripe', 'pagseguro', 'eduzz'));

-- Update existing records to have the correct provider based on payment_method
UPDATE public.payments
SET payment_provider = CASE 
  WHEN payment_method = 'pix' THEN 'pagseguro'
  ELSE 'stripe'
END;