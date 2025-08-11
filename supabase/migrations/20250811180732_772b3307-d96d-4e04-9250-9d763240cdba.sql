-- Drop existing permissive policies that may allow unintended access
DROP POLICY IF EXISTS admin_select_form_submissions ON public.form_submissions;

-- Create a restrictive SELECT policy that denies all access by default
-- and only allows authenticated admin users to select data
CREATE POLICY "Restrict form_submissions select to admins only" 
ON public.form_submissions 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

-- Ensure no public access by creating an explicit deny policy for anon users
CREATE POLICY "Deny form_submissions select for anon users" 
ON public.form_submissions 
FOR SELECT 
TO anon
USING (false);