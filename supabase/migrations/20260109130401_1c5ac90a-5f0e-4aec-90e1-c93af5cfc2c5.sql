-- Remove moodle_password column from students table
ALTER TABLE public.students DROP COLUMN IF EXISTS moodle_password;