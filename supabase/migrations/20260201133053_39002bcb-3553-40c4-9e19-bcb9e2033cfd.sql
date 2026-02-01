-- Drop the overly permissive anonymous insert policy on leads
DROP POLICY IF EXISTS "Allow anonymous insert on leads" ON public.leads;

-- Create a more restrictive policy for anonymous insert on leads
-- Only allows insert when source is 'checkout' (the expected use case)
CREATE POLICY "Allow anonymous insert on leads" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (
  source = 'checkout'
);