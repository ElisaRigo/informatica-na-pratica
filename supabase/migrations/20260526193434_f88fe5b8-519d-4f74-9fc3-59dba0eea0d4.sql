
-- 1. Remove redundant SELECT policy on students
DROP POLICY IF EXISTS "Only admins can view students" ON public.students;

-- 2. Add explicit restrictive policy on user_roles to prevent privilege escalation
CREATE POLICY "Block non-admin role mutations"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Revoke EXECUTE from anon/authenticated/public on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.add_admin_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.add_admin_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;
