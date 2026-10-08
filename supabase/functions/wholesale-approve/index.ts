// Approves a wholesale application: creates (or finds) the auth user, records the
// member row, flips the application to "approved", and returns a sign-in link the
// desk can hand to the applicant if the automatic invite email does not arrive.
//
// Caller must be an admin (user_profiles.role = 'admin'); the user's JWT is checked
// before the service-role client does any writes.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const siteUrl = (Deno.env.get("SITE_URL") || "https://agoraassurancesolutions.com").replace(/\/$/, "");

  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Not signed in" }, 401);

  // 1. Who is calling, and are they an admin?
  const asCaller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userErr } = await asCaller.auth.getUser();
  if (userErr || !userData.user) return json({ error: "Not signed in" }, 401);
  const caller = userData.user;

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data: isAdmin } = await admin.rpc("is_admin", { user_id: caller.id });
  if (!isAdmin) return json({ error: "Admins only" }, 403);

  // 2. Load the application.
  let body: { application_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  const applicationId = body.application_id;
  if (!applicationId) return json({ error: "application_id required" }, 400);

  const { data: app, error: appErr } = await admin
    .from("wholesale_applications")
    .select("id, first_name, last_name, email, agency_name, status, user_id")
    .eq("id", applicationId)
    .single();
  if (appErr || !app) return json({ error: "Application not found" }, 404);

  const email = String(app.email).trim().toLowerCase();
  const contactName = `${app.first_name} ${app.last_name}`.trim();
  const redirectTo = `${siteUrl}/wholesale/portal/welcome`;

  // 3. Find or invite the auth user.
  let userId: string | null = app.user_id ?? null;
  let invited = false;
  if (!userId) {
    const { data: invite, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: { full_name: contactName, agency_name: app.agency_name, wholesale: true },
    });
    if (invite?.user) {
      userId = invite.user.id;
      invited = true;
    } else {
      // Already registered: look the user up by email.
      const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users.find((u) => (u.email || "").toLowerCase() === email);
      if (!existing) return json({ error: inviteErr?.message || "Could not create user" }, 500);
      userId = existing.id;
    }
  }

  // 4. A fallback sign-in link the desk can copy (does not send any email).
  let actionLink: string | null = null;
  const { data: linkData } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });
  actionLink = linkData?.properties?.action_link ?? null;

  // 5. Member row + application status.
  const { error: memberErr } = await admin.from("wholesale_members").upsert(
    {
      user_id: userId,
      application_id: app.id,
      agency_name: app.agency_name,
      contact_name: contactName,
      email,
      status: "active",
    },
    { onConflict: "user_id" },
  );
  if (memberErr) return json({ error: memberErr.message }, 500);

  const { error: updErr } = await admin
    .from("wholesale_applications")
    .update({ status: "approved", user_id: userId, reviewed_by: caller.id, reviewed_at: new Date().toISOString() })
    .eq("id", app.id);
  if (updErr) return json({ error: updErr.message }, 500);

  return json({ ok: true, user_id: userId, invited, action_link: actionLink });
});
