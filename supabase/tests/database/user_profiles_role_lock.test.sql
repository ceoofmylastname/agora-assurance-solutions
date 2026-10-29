-- pgTAP: users cannot make themselves admin (migration 20261029120000).
--
-- Needs a database that has the Website schema (user_profiles, is_admin,
-- admin_allowlist, handle_new_user on auth.users). The repo migrations do not
-- create user_profiles, so `supabase db reset` alone cannot build that database;
-- run it against a branch or local copy that does, e.g.
--   supabase test db --db-url <url of a NON-production copy>
-- Everything runs in one transaction and is rolled back. Test emails only.
BEGIN;
SELECT plan(17);

-- ---------- fixtures (as postgres) ----------
INSERT INTO public.admin_allowlist (email, note)
VALUES ('allowlisted@example.test', 'pgTAP fixture')
ON CONFLICT (email) DO NOTHING;

INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES
  ('a0000000-0000-4000-8000-00000000000a', 'user-a@example.test', '{"full_name":"User A"}'),
  ('b0000000-0000-4000-8000-00000000000b', 'allowlisted@example.test', '{"full_name":"Staff B"}');

-- ---------- signup trigger still assigns roles ----------
SELECT is(
  (SELECT role FROM public.user_profiles WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'),
  'user',
  'signup: a normal email gets role user'
);
SELECT is(
  (SELECT role FROM public.user_profiles WHERE user_id = 'b0000000-0000-4000-8000-00000000000b'),
  'admin',
  'signup: an allowlisted email gets role admin'
);

-- ---------- as signed-in user A ----------
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims = '{"sub":"a0000000-0000-4000-8000-00000000000a","role":"authenticated"}';

SELECT throws_ok(
  $$UPDATE public.user_profiles SET role = 'admin' WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  '42501', 'role cannot be changed from the client',
  'UPDATE: user cannot set their own role to admin'
);
SELECT throws_ok(
  $$UPDATE public.user_profiles SET full_name = 'x', role = 'admin' WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  '42501', 'role cannot be changed from the client',
  'UPDATE: role cannot ride along with a normal field change'
);
SELECT throws_ok(
  $$INSERT INTO public.user_profiles (user_id, email, full_name, role)
    VALUES ('a0000000-0000-4000-8000-00000000000a', 'user-a@example.test', 'Second row', 'admin')$$,
  '42501', 'role cannot be set from the client',
  'INSERT: user cannot insert a profile carrying role admin'
);
SELECT throws_ok(
  $$UPDATE public.user_profiles SET user_id = 'c0000000-0000-4000-8000-00000000000c'
    WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  '42501', 'new row violates row-level security policy for table "user_profiles"',
  'UPDATE: WITH CHECK stops moving the row to another user id'
);
SELECT lives_ok(
  $$UPDATE public.user_profiles SET full_name = 'User A Renamed' WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  'UPDATE: user can still change their own full_name'
);
SELECT lives_ok(
  $$UPDATE public.user_profiles SET role = 'user' WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  'UPDATE: sending back the unchanged role is allowed'
);

-- ---------- as anon ----------
RESET ROLE;
SET LOCAL ROLE anon;
SET LOCAL request.jwt.claims = '{"role":"anon"}';
SELECT throws_ok(
  $$INSERT INTO public.user_profiles (user_id, email, full_name, role)
    VALUES ('a0000000-0000-4000-8000-00000000000a', 'user-a@example.test', 'anon', 'admin')$$,
  '42501', 'role cannot be set from the client',
  'INSERT: anon cannot insert an admin profile'
);

-- ---------- results (as postgres) ----------
RESET ROLE;
SELECT ok(
  NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE user_id = 'a0000000-0000-4000-8000-00000000000a' AND role <> 'user'),
  'after every attempt user A has no row with a role other than user'
);
SELECT ok(
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_id = 'a0000000-0000-4000-8000-00000000000a' AND full_name = 'User A Renamed'),
  'user A''s own full_name change was saved'
);
SELECT is(
  (SELECT count(*) FROM public.user_profiles WHERE user_id = 'a0000000-0000-4000-8000-00000000000a')::int,
  1,
  'no extra profile row was created for user A'
);
SELECT ok(
  NOT public.is_admin('a0000000-0000-4000-8000-00000000000a'),
  'is_admin(user A) is false'
);

-- ---------- server paths still work ----------
SET LOCAL ROLE service_role;
SELECT lives_ok(
  $$UPDATE public.user_profiles SET role = 'admin' WHERE user_id = 'a0000000-0000-4000-8000-00000000000a'$$,
  'service_role can still change a role'
);
RESET ROLE;
SELECT ok(
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_id = 'a0000000-0000-4000-8000-00000000000a' AND role = 'admin'),
  'the service_role change was saved'
);

-- ---------- the guard function is not on the API ----------
SELECT ok(
  COALESCE(NOT has_function_privilege('authenticated', to_regprocedure('public.user_profiles_lock_role()'), 'EXECUTE'), false),
  'authenticated cannot execute user_profiles_lock_role()'
);
SELECT ok(
  COALESCE(NOT has_function_privilege('anon', to_regprocedure('public.user_profiles_lock_role()'), 'EXECUTE'), false),
  'anon cannot execute user_profiles_lock_role()'
);

SELECT * FROM finish();
ROLLBACK;
