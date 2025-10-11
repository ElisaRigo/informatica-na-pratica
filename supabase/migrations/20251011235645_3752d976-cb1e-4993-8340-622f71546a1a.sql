-- Corrige política de auditoria para permitir que admins registrem acessos
CREATE POLICY "Admins can create audit logs"
ON public.payment_access_logs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));