-- Remove as views antigas
DROP VIEW IF EXISTS public.students_safe_view;
DROP VIEW IF EXISTS public.payments_safe_view;

-- Não precisamos de views extras, vamos usar apenas RLS bem configurado
-- Mantém apenas a política admin para students
-- A senha criptografada não será exposta porque apenas admins podem ver

-- Remove a política de alunos verem dados próprios (não vamos implementar área do aluno ainda)
DROP POLICY IF EXISTS "Students can view their safe data" ON public.students;