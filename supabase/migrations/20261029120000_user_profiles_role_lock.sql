-- NOT APPLIED: John reviews and applies.
--
-- Stop signed-in users from making themselves admin.
--
-- is_admin() trusts public.user_profiles.role. Before this migration:
--   * "Users can update their own profile" had USING (auth.uid() = user_id) and
--     no WITH CHECK, and nothing guarded the role column, so a user could run
--     update user_profiles set role = 'admin' where user_id = auth.uid().
--     (With no WITH CHECK, Postgres reuses USING for the new row, so the row
--     could not be moved to another user; the hole is the unguarded role column.)
--   * "Users can insert their own profile" only checked auth.uid() = user_id, so
--     a user could insert a profile row carrying role = 'admin'.
--   * anon and authenticated hold table-level INSERT and UPDATE on user_profiles
--     (Supabase default grants), so a column-level REVOKE of role alone is a no-op.
--
-- Fix:
--   1. A BEFORE INSERT OR UPDATE trigger that refuses any role value set by an API
--      client (anon / authenticated). Server paths are untouched: the signup
--      trigger handle_new_user() is SECURITY DEFINER and runs as its owner, and
--      edge functions run as service_role, so both can still set role.
--   2. The update policy states WITH CHECK (auth.uid() = user_id) explicitly, so
--      the rule is visible and survives any later edit of the USING clause.
--   3. The insert policy also requires role = 'user' (defence in depth).
--
-- The trigger is used instead of column grants because it does not depend on the
-- table's grants staying as they are today: a later GRANT ALL (dashboard, Lovable,
-- a new migration) would silently undo a column-grant fix, but not this trigger.
--
-- Apply with the SQL editor (or apply_migration), not `supabase db push`: the
-- wholesale foundation migration is recorded on live under a different version
-- than its repo file, so db push would try to run it again.

-- ---------- 1. role guard ----------
CREATE OR REPLACE FUNCTION public.user_profiles_lock_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
BEGIN
  -- current_user is the role running the statement. Browser and API requests run
  -- as anon or authenticated. handle_new_user() (SECURITY DEFINER) runs as its
  -- owner and service_role is used by edge functions, so those pass through.
  IF current_user NOT IN ('anon', 'authenticated') THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW.role IS DISTINCT FROM 'user' THEN
      RAISE EXCEPTION 'role cannot be set from the client'
        USING ERRCODE = '42501';
    END IF;
  ELSIF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'role cannot be changed from the client'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$function$;

-- A trigger function is never called directly; keep it off the API.
REVOKE ALL ON FUNCTION public.user_profiles_lock_role() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS user_profiles_lock_role ON public.user_profiles;
CREATE TRIGGER user_profiles_lock_role
BEFORE INSERT OR UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION public.user_profiles_lock_role();

-- ---------- 2. update policy: add WITH CHECK ----------
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ---------- 3. insert policy: own row, plain user only ----------
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND role = 'user');
