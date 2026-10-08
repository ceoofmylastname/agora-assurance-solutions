-- Wholesale program: public applications, approved members, portal resources,
-- and an admin allowlist so staff no longer live in a hardcoded email.

-- ---------- admin allowlist ----------
CREATE TABLE IF NOT EXISTS public.admin_allowlist (
  email       text PRIMARY KEY CHECK (email = lower(email)),
  note        text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins read allowlist"   ON public.admin_allowlist FOR SELECT TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "admins add allowlist"    ON public.admin_allowlist FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "admins remove allowlist" ON public.admin_allowlist FOR DELETE TO authenticated USING (is_admin(auth.uid()));

INSERT INTO public.admin_allowlist (email, note) VALUES
  ('jmelvin@agoraassurancesolutions.com', 'John Melvin'),
  ('jrmenterprisegroup@gmail.com', 'John Melvin')
ON CONFLICT (email) DO NOTHING;

-- New sign-ups become admins when their email is allowlisted.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $function$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE
      WHEN EXISTS (SELECT 1 FROM public.admin_allowlist a WHERE a.email = lower(NEW.email)) THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$function$;

-- Existing profiles whose email is allowlisted are promoted too.
UPDATE public.user_profiles p SET role = 'admin'
WHERE lower(p.email) IN (SELECT email FROM public.admin_allowlist) AND p.role <> 'admin';

-- ---------- wholesale applications (the qualification form) ----------
CREATE TABLE IF NOT EXISTS public.wholesale_applications (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  first_name         text NOT NULL CHECK (length(first_name) BETWEEN 1 AND 80),
  last_name          text NOT NULL CHECK (length(last_name) BETWEEN 1 AND 80),
  email              text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone              text NOT NULL CHECK (length(phone) BETWEEN 7 AND 30),
  agency_name        text NOT NULL CHECK (length(agency_name) BETWEEN 1 AND 160),
  website            text CHECK (website IS NULL OR length(website) <= 200),
  state              text CHECK (state IS NULL OR length(state) <= 40),
  agency_size        text NOT NULL CHECK (agency_size IN ('1-9','10-24','25-49','50-99','100-249','250+')),
  weekly_production  text NOT NULL CHECK (weekly_production IN ('under_10k','10k_25k','25k_50k','50k_100k','100k_250k','250k_plus')),
  current_imo        text NOT NULL CHECK (length(current_imo) BETWEEN 1 AND 160),
  carriers           text[] NOT NULL DEFAULT '{}',
  carriers_other     text CHECK (carriers_other IS NULL OR length(carriers_other) <= 300),
  interests          text[] NOT NULL DEFAULT '{}',
  goals              text CHECK (goals IS NULL OR length(goals) <= 2000),
  status             text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','approved','declined')),
  notes              text,
  reviewed_by        uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at        timestamptz,
  user_id            uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source             text NOT NULL DEFAULT 'website'
);
CREATE INDEX IF NOT EXISTS wholesale_applications_status_idx ON public.wholesale_applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS wholesale_applications_email_idx  ON public.wholesale_applications (lower(email));
ALTER TABLE public.wholesale_applications ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_wholesale_applications_updated_at
BEFORE UPDATE ON public.wholesale_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- The public form may only create a fresh, unreviewed row.
CREATE POLICY "public submit application" ON public.wholesale_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new' AND user_id IS NULL AND reviewed_by IS NULL AND notes IS NULL);
CREATE POLICY "admins read applications"   ON public.wholesale_applications FOR SELECT TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "admins update applications" ON public.wholesale_applications FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "admins delete applications" ON public.wholesale_applications FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- ---------- wholesale members (approved applicants with portal access) ----------
CREATE TABLE IF NOT EXISTS public.wholesale_members (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id  uuid REFERENCES public.wholesale_applications(id) ON DELETE SET NULL,
  agency_name     text NOT NULL,
  contact_name    text NOT NULL,
  email           text NOT NULL,
  status          text NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.wholesale_members ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_wholesale_members_updated_at
BEFORE UPDATE ON public.wholesale_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "members read own row"   ON public.wholesale_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "admins manage members"  ON public.wholesale_members FOR ALL TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ---------- portal resources (links, videos, documents per vertical) ----------
CREATE TABLE IF NOT EXISTS public.wholesale_resources (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical      text NOT NULL CHECK (vertical IN ('contracts','technology','leads','marketplace','training','general')),
  kind          text NOT NULL DEFAULT 'link' CHECK (kind IN ('link','video','document')),
  title         text NOT NULL CHECK (length(title) BETWEEN 1 AND 160),
  description   text CHECK (description IS NULL OR length(description) <= 600),
  url           text NOT NULL CHECK (url ~* '^https?://'),
  display_order integer NOT NULL DEFAULT 0,
  published     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.wholesale_resources ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_wholesale_resources_updated_at
BEFORE UPDATE ON public.wholesale_resources
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Active members see published resources; admins see and manage everything.
CREATE POLICY "members read published resources" ON public.wholesale_resources
  FOR SELECT TO authenticated
  USING (
    is_admin(auth.uid())
    OR (published AND EXISTS (SELECT 1 FROM public.wholesale_members m WHERE m.user_id = auth.uid() AND m.status = 'active'))
  );
CREATE POLICY "admins manage resources" ON public.wholesale_resources
  FOR ALL TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ---------- helper for the browser: am I an admin? ----------
CREATE OR REPLACE FUNCTION public.my_wholesale_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT CASE
    WHEN auth.uid() IS NULL THEN 'anon'
    WHEN is_admin(auth.uid()) THEN 'admin'
    WHEN EXISTS (SELECT 1 FROM public.wholesale_members m WHERE m.user_id = auth.uid() AND m.status = 'active') THEN 'member'
    WHEN EXISTS (SELECT 1 FROM public.wholesale_members m WHERE m.user_id = auth.uid()) THEN 'suspended'
    ELSE 'none'
  END;
$$;
REVOKE ALL ON FUNCTION public.my_wholesale_role() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.my_wholesale_role() TO authenticated;

-- ---------- hardening ----------
-- Trigger function must never be callable over the API; is_admin only needs
-- to run inside RLS policies for signed-in users.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;
