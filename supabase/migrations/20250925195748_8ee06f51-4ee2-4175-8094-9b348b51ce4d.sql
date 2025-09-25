-- Create directors table
CREATE TABLE public.directors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.directors ENABLE ROW LEVEL SECURITY;

-- Allow public read access for the application form
CREATE POLICY "Anyone can view active directors" 
ON public.directors 
FOR SELECT 
USING (active = true);

-- Allow admins to manage directors
CREATE POLICY "Admins can insert directors" 
ON public.directors 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update directors" 
ON public.directors 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete directors" 
ON public.directors 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_directors_updated_at
BEFORE UPDATE ON public.directors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing directors plus Rob B.
INSERT INTO public.directors (name, value, display_order) VALUES
('Adam T.', 'adam-t', 1),
('Antwan G.', 'antwan-g', 2),
('Benjamin S.', 'benjamin-s', 3),
('Jalil D.', 'jalil-d', 4),
('Jeff U.', 'jeff-u', 5),
('Rob B.', 'rob-b', 6);