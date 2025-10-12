-- Remove política duplicada/conflitante
DROP POLICY IF EXISTS "Deny anonymous insert to payment_access_logs" ON public.payment_access_logs;

-- A política "Deny anonymous access to payment_access_logs" já cobre tudo
-- E "Admins can create audit logs" permite inserts de admins
-- Política duplicada removida para simplificar