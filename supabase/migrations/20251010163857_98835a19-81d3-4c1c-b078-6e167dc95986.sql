-- Remove a política anterior que não está funcionando
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;

-- Criar função segura para adicionar role de admin
CREATE OR REPLACE FUNCTION public.add_admin_role(user_id uuid, user_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, user_role);
END;
$$;

-- Permitir que usuários autenticados chamem essa função
GRANT EXECUTE ON FUNCTION public.add_admin_role TO authenticated;