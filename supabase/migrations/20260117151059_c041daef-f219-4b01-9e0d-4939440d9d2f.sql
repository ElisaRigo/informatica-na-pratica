-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can view their own roles" ON public.user_roles;

-- Create a proper PERMISSIVE policy for users to view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);