-- CORREÇÃO CRÍTICA: Adiciona políticas explícitas de negação para usuários não autenticados

-- 1. STUDENTS - Bloqueia totalmente usuários não autenticados
CREATE POLICY "Deny anonymous access to students"
ON public.students
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- 2. PAYMENTS - Bloqueia totalmente usuários não autenticados
CREATE POLICY "Deny anonymous access to payments"
ON public.payments
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- 3. USER_ROLES - Bloqueia totalmente usuários não autenticados
CREATE POLICY "Deny anonymous access to user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- 4. PAYMENT_ACCESS_LOGS - Bloqueia totalmente usuários não autenticados
CREATE POLICY "Deny anonymous access to payment_access_logs"
ON public.payment_access_logs
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- Adiciona política explícita para negar INSERT não autorizado
CREATE POLICY "Deny anonymous insert to payment_access_logs"
ON public.payment_access_logs
AS RESTRICTIVE
FOR INSERT
TO anon
WITH CHECK (false);