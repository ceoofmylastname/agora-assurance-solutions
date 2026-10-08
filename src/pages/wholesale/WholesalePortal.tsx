import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Cpu, ExternalLink, FileSignature, LayoutGrid, Loader2, LogOut, Mail, PlayCircle, Store, FileText, Link2, ShieldAlert,
} from 'lucide-react';
import WholesaleShell from '@/components/wholesale/WholesaleShell';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/hooks/useSession';
import { VERTICALS, verticalName, type ResourceVertical } from '@/lib/wholesale';
import type { Tables } from '@/integrations/supabase/types';

type Resource = Tables<'wholesale_resources'>;
type Member = Tables<'wholesale_members'>;

const ICONS: Record<string, typeof Cpu> = {
  contracts: FileSignature, technology: Cpu, leads: Store, marketplace: LayoutGrid,
};
const KIND_ICON: Record<string, typeof Link2> = { link: Link2, video: PlayCircle, document: FileText };

const Shell = ({ children }: { children: React.ReactNode }) => (
  <WholesaleShell dark={false}>
    <SEO title="Agora Wholesale Partner Portal" description="Sign in to the Agora Wholesale partner portal." />
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">{children}</div>
    </div>
  </WholesaleShell>
);

/* ---------- Sign in ---------- */
const SignIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'password' | 'reset'>('password');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/wholesale/portal/welcome`,
      });
      setBusy(false);
      if (error) toast({ title: 'Could not send reset email', description: error.message, variant: 'destructive' });
      else toast({ title: 'Check your inbox', description: 'If that email is on file, a reset link is on its way.' });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) toast({ title: 'Sign in failed', description: 'Check your email and password, or use the reset link.', variant: 'destructive' });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-2">Agora Wholesale</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{mode === 'reset' ? 'Reset your password' : 'Partner sign in'}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {mode === 'reset' ? 'We will email you a link to choose a new password.' : 'For approved wholesale partners only.'}
        </p>
        <form onSubmit={submit} className="space-y-4" data-keep-form>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <Input id="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 text-base" />
          </div>
          {mode === 'password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 text-base" />
            </div>
          )}
          <button type="submit" disabled={busy} className="w-full min-h-[48px] rounded-lg bg-[#0d2238] hover:bg-[#15AFF7] disabled:opacity-60 text-white font-semibold transition-colors flex items-center justify-center">
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'reset' ? 'Send reset link' : 'Sign in'}
          </button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <button type="button" className="text-[#0D94D1] hover:underline" onClick={() => setMode(mode === 'reset' ? 'password' : 'reset')}>
            {mode === 'reset' ? 'Back to sign in' : 'Forgot password?'}
          </button>
          <Link to="/wholesale/apply" className="text-gray-500 hover:text-gray-800">Not a partner yet? Apply</Link>
        </div>
      </div>
    </div>
  );
};

/* ---------- Welcome: set a password after the invite or reset link ---------- */
const SetPassword = ({ onDone }: { onDone: () => void }) => {
  const { toast } = useToast();
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) return toast({ title: 'Use at least 8 characters', variant: 'destructive' });
    if (pw !== pw2) return toast({ title: 'Passwords do not match', variant: 'destructive' });
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw, data: { password_set: true } });
    setBusy(false);
    if (error) return toast({ title: 'Could not save password', description: error.message, variant: 'destructive' });
    toast({ title: 'Password saved', description: 'Welcome to the portal.' });
    onDone();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-2">Welcome</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Choose your password</h1>
        <p className="text-sm text-gray-500 mb-6">You will use this to sign in to the partner portal from now on.</p>
        <form onSubmit={submit} className="space-y-4" data-keep-form>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pw">New password</label>
            <Input id="pw" type="password" autoComplete="new-password" required value={pw} onChange={(e) => setPw(e.target.value)} className="h-12 text-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pw2">Confirm password</label>
            <Input id="pw2" type="password" autoComplete="new-password" required value={pw2} onChange={(e) => setPw2(e.target.value)} className="h-12 text-base" />
          </div>
          <button type="submit" disabled={busy} className="w-full min-h-[48px] rounded-lg bg-[#15AFF7] hover:bg-[#0D94D1] disabled:opacity-60 text-white font-semibold transition-colors flex items-center justify-center">
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save and enter portal'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ---------- Not approved ---------- */
const NotApproved = ({ email, status, onSignOut }: { email: string; status: string; onSignOut: () => void }) => (
  <div className="max-w-md mx-auto">
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
      <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-3" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{status === 'suspended' ? 'Access paused' : 'Not approved yet'}</h1>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {status === 'suspended'
          ? 'Your portal access has been paused. Reach out to your Agora contact to restore it.'
          : <>The account <span className="font-medium">{email}</span> is signed in but is not an approved wholesale partner. If you applied, we will email you once your application is reviewed.</>}
      </p>
      <div className="flex flex-col gap-2">
        <Link to="/wholesale/apply" className="min-h-[44px] rounded-lg bg-[#0d2238] text-white font-semibold flex items-center justify-center">Apply for access</Link>
        <button onClick={onSignOut} className="min-h-[44px] rounded-lg border border-gray-300 text-gray-700 font-medium">Sign out</button>
      </div>
    </div>
  </div>
);

/* ---------- The portal ---------- */
const Dashboard = ({ member, onSignOut }: { member: Member; onSignOut: () => void }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('wholesale_resources')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setResources(data ?? []);
        setLoading(false);
      });
  }, []);

  const byVertical = useMemo(() => {
    const m: Record<string, Resource[]> = {};
    for (const r of resources) (m[r.vertical] ||= []).push(r);
    return m;
  }, [resources]);

  const firstName = member.contact_name.split(' ')[0] || member.contact_name;

  const ResourceList = ({ items }: { items: Resource[] }) => (
    <ul className="divide-y divide-gray-100">
      {items.map((r) => {
        const I = KIND_ICON[r.kind] ?? Link2;
        return (
          <li key={r.id}>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 py-3 group">
              <I className="w-5 h-5 text-[#15AFF7] mt-0.5 shrink-0" />
              <span className="flex-1 min-w-0">
                <span className="block font-medium text-gray-900 group-hover:text-[#0D94D1]">{r.title}</span>
                {r.description && <span className="block text-sm text-gray-500">{r.description}</span>}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-500 mt-1" />
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-3xl bg-[#0d2238] text-white p-6 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#15AFF7]/20 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-2">Partner portal</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Welcome back, {firstName}.</h1>
            <p className="text-blue-100/80">{member.agency_name}</p>
          </div>
          <button onClick={onSignOut} className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-white/30 hover:bg-white/10 text-sm font-medium">
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {VERTICALS.map((v) => {
          const Icon = ICONS[v.id];
          const items = byVertical[v.id] ?? [];
          return (
            <section key={v.id} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                <div>
                  <h2 className="font-bold text-gray-900">{v.name}</h2>
                  <p className="text-xs text-gray-500">{v.tagline}</p>
                </div>
              </div>
              {loading ? (
                <p className="text-sm text-gray-400">Loading…</p>
              ) : items.length ? (
                <ResourceList items={items} />
              ) : (
                <p className="text-sm text-gray-500 rounded-lg bg-gray-50 border border-dashed border-gray-200 p-4">
                  Being set up. Your Agora contact will add {v.name.toLowerCase()} resources here as partners come online.
                </p>
              )}
            </section>
          );
        })}
      </div>

      {(['training', 'general'] as ResourceVertical[]).map((key) => {
        const items = byVertical[key] ?? [];
        return (
          <section key={key} className="rounded-2xl border border-gray-200 bg-white p-6 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#15AFF7] flex items-center justify-center">
                {key === 'training' ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <h2 className="font-bold text-gray-900">{verticalName(key)}</h2>
            </div>
            {items.length ? (
              <ResourceList items={items} />
            ) : (
              <p className="text-sm text-gray-500 rounded-lg bg-gray-50 border border-dashed border-gray-200 p-4">
                {key === 'training' ? 'New training videos are being filmed now and will appear here when they are ready.' : 'Nothing posted yet.'}
              </p>
            )}
          </section>
        );
      })}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#15AFF7]" />
          <div>
            <p className="font-medium text-gray-900">Need something that is not here?</p>
            <p className="text-sm text-gray-500">Email the wholesale desk and a person will answer.</p>
          </div>
        </div>
        <a href="mailto:info@agoraassurancesolutions.com?subject=Wholesale%20portal" className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-lg bg-[#0d2238] text-white text-sm font-semibold">
          Email the desk <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

/* ---------- Route component ---------- */
const WholesalePortal = () => {
  const { session, role, loading, refreshRole, signOut } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [memberLoading, setMemberLoading] = useState(false);

  const isWelcome = location.pathname.endsWith('/welcome');
  // Supabase puts the invite / recovery token in the URL hash; the client consumes it and signs the user in.
  const arrivedByLink = useMemo(() => /access_token|type=(invite|recovery|magiclink)/.test(window.location.hash), []);

  useEffect(() => {
    if (!session || (role !== 'member' && role !== 'admin')) {
      setMember(null);
      return;
    }
    setMemberLoading(true);
    supabase
      .from('wholesale_members')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setMember(data ?? null);
        setMemberLoading(false);
      });
  }, [session, role]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/wholesale/portal', { replace: true });
  };

  if (loading || memberLoading) {
    return (
      <Shell>
        <div className="flex items-center justify-center py-24 text-gray-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
      </Shell>
    );
  }

  if (!session) return <Shell><SignIn /></Shell>;

  const needsPassword = isWelcome && (arrivedByLink || !session.user.user_metadata?.password_set);
  if (needsPassword) {
    return (
      <Shell>
        <SetPassword onDone={async () => { await refreshRole(); navigate('/wholesale/portal', { replace: true }); }} />
      </Shell>
    );
  }

  if (role === 'admin' && !member) {
    return (
      <Shell>
        <div className="max-w-md mx-auto rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You are staff</h1>
          <p className="text-gray-600 text-sm mb-6">This is the partner view. Your desk is at <Link to="/admin/wholesale" className="text-[#0D94D1] underline">/admin/wholesale</Link>.</p>
          <button onClick={handleSignOut} className="min-h-[44px] w-full rounded-lg border border-gray-300 text-gray-700 font-medium">Sign out</button>
        </div>
      </Shell>
    );
  }

  if (!member || member.status !== 'active') {
    return <Shell><NotApproved email={session.user.email ?? ''} status={member?.status ?? role} onSignOut={handleSignOut} /></Shell>;
  }

  return <Shell><Dashboard member={member} onSignOut={handleSignOut} /></Shell>;
};

export default WholesalePortal;
