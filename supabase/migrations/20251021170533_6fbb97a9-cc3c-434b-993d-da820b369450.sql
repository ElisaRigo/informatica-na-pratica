-- Adicionar coluna moodle_user_id na tabela students
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS moodle_user_id INTEGER;