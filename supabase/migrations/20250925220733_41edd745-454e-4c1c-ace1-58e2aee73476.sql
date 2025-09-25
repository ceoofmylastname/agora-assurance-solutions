-- Temporarily allow public insertion to directors table for testing
-- This should be restricted once authentication is properly implemented
DROP POLICY IF EXISTS "Admins can insert directors" ON public.directors;

CREATE POLICY "Allow public insert directors" 
ON public.directors 
FOR INSERT 
WITH CHECK (true);

-- Also allow public updates and deletes for now
DROP POLICY IF EXISTS "Admins can update directors" ON public.directors;
DROP POLICY IF EXISTS "Admins can delete directors" ON public.directors;

CREATE POLICY "Allow public update directors" 
ON public.directors 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete directors" 
ON public.directors 
FOR DELETE 
USING (true);