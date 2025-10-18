-- Insert Tonya M. as a director
INSERT INTO public.directors (name, value, display_order, active)
VALUES ('Tonya M.', 'tonya_m', (SELECT COALESCE(MAX(display_order), 0) + 1 FROM public.directors), true);