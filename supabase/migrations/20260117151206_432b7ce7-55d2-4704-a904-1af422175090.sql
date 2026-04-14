-- Drop the incorrectly created policy
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Create the policy explicitly as PERMISSIVE
CREATE POLICY "Users can view own roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);