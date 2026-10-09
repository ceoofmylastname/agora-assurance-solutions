import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, Copy, Loader2, LogOut, Plus, RefreshCw, ShieldCheck, Trash2, X, ExternalLink,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/hooks/useSession';
import {
  AGENCY_SIZES, APPLICATION_STATUSES, RESOURCE_VERTICALS, VERTICALS, WEEKLY_PRODUCTION, labelFor, verticalName, type ApplicationStatus,
} from '@/lib/wholesale';
import type { Tables } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';

type App = Tables<'wholesale_applications'>;
type Resource = Tables<'wholesale_resources'>;
type Member = Tables<'wholesale_members'>;

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  declined: 'bg-gray-200 text-gray-700',
};

const fmt = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

/* ---------- staff sign in (magic link or password) ---------- */
const StaffSignIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (usePassword) {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setBusy(false);
      if (error) toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin/wholesale` },
    });
    setBusy(false);
    if (error) toast({ title: 'Could not send link', description: error.message, variant: 'destructive' });
    else setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8">
        <ShieldCheck className="w-8 h-8 text-[#15AFF7] mb-3" />
        <h1 className="text-xl font-bold text-gray-900 mb-1">Wholesale desk</h1>
        <p className="text-sm text-gray-500 mb-6">Staff only. {usePassword ? 'Sign in with your password.' : 'We will email you a one-time sign-in link.'}</p>
        {sent ? (
          <p className="text-sm text-gray-700 rounded-lg bg-blue-50 border border-blue-100 p-4">Check your inbox for the sign-in link. It lands you straight on the desk.</p>
        ) : (
          <form onSubmit={submit} className="space-y-4" data-keep-form>
            <Input type="email" inputMode="email" autoComplete="email" placeholder="you@agoraassurancesolutions.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 text-base" />
            {usePassword && (
              <Input type="password" autoComplete="current-password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 text-base" />
            )}
            <button type="submit" disabled={busy} className="w-full min-h-[48px] rounded-lg bg-[#0d2238] hover:bg-[#15AFF7] disabled:opacity-60 text-white font-semibold transition-colors flex items-center justify-center">
              {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : usePassword ? 'Sign in' : 'Email me a sign-in link'}
            </button>
            <button type="button" onClick={() => setUsePassword(!usePassword)} className="w-full text-sm text-[#0D94D1] hover:underline">
              {usePassword ? 'Use a one-time link instead' : 'Use a password instead'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ---------- application detail ---------- */
const Detail = ({ app, onClose, onChanged }: { app: App; onClose: () => void; onChanged: () => void }) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState(app.notes ?? '');
  const [busy, setBusy] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const setStatus = async (status: ApplicationStatus) => {
    setBusy(status);
    const { error } = await supabase
      .from('wholesale_applications')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', app.id);
    setBusy(null);
    if (error) return toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    onChanged();
  };

  const saveNotes = async () => {
    setBusy('notes');
    const { error } = await supabase.from('wholesale_applications').update({ notes }).eq('id', app.id);
    setBusy(null);
    if (error) return toast({ title: 'Could not save notes', description: error.message, variant: 'destructive' });
    toast({ title: 'Notes saved' });
    onChanged();
  };

  const approve = async () => {
    if (!confirm(`Approve ${app.agency_name} and send ${app.email} a portal invitation?`)) return;
    setBusy('approve');
    const { data, error } = await supabase.functions.invoke('wholesale-approve', { body: { application_id: app.id } });
    setBusy(null);
    if (error || !data?.ok) {
      const msg = (data as { error?: string } | null)?.error || error?.message || 'Unknown error';
      return toast({ title: 'Approval failed', description: msg, variant: 'destructive' });
    }
    setLink(data.action_link ?? null);
    toast({ title: 'Approved', description: data.invited ? 'Invitation email sent.' : 'Account already existed; access granted.' });
    onChanged();
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied' });
    } catch {
      toast({ title: 'Copy failed', description: 'Select the link and copy it manually.', variant: 'destructive' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="relative ml-auto h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{app.agency_name}</h2>
            <p className="text-sm text-gray-500">{app.first_name} {app.last_name} · {fmt(app.created_at)}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold capitalize', STATUS_STYLE[app.status as ApplicationStatus])}>{app.status}</span>
            {app.interests.map((i) => <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{verticalName(i)}</span>)}
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-900 break-all"><a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a></dd></div>
            <div><dt className="text-gray-500">Phone</dt><dd className="font-medium text-gray-900"><a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a></dd></div>
            <div><dt className="text-gray-500">Agency size</dt><dd className="font-medium text-gray-900">{labelFor(AGENCY_SIZES, app.agency_size)}</dd></div>
            <div><dt className="text-gray-500">Weekly production</dt><dd className="font-medium text-gray-900">{labelFor(WEEKLY_PRODUCTION, app.weekly_production)}</dd></div>
            <div><dt className="text-gray-500">Current IMO</dt><dd className="font-medium text-gray-900">{app.current_imo}</dd></div>
            <div><dt className="text-gray-500">State</dt><dd className="font-medium text-gray-900">{app.state || '—'}</dd></div>
            <div className="col-span-2"><dt className="text-gray-500">Website</dt><dd className="font-medium text-gray-900 break-all">{app.website ? <a href={app.website.startsWith('http') ? app.website : `https://${app.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">{app.website} <ExternalLink className="w-3 h-3" /></a> : '—'}</dd></div>
            <div className="col-span-2"><dt className="text-gray-500">Carriers</dt><dd className="font-medium text-gray-900">{[...app.carriers, app.carriers_other].filter(Boolean).join(', ') || '—'}</dd></div>
            <div className="col-span-2"><dt className="text-gray-500">What they want</dt><dd className="text-gray-900 whitespace-pre-wrap">{app.goals || '—'}</dd></div>
          </dl>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal notes</label>
            <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Call notes, decisions, follow-ups" />
            <button onClick={saveNotes} disabled={busy === 'notes'} className="mt-2 text-sm font-medium text-[#0D94D1] hover:underline disabled:opacity-50">Save notes</button>
          </div>

          {link && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
              <p className="font-semibold text-emerald-900 mb-1">Backup sign-in link</p>
              <p className="text-emerald-800 mb-2">If the invite email does not land, send this link yourself. It signs them in and asks for a password.</p>
              <div className="flex gap-2">
                <Input readOnly value={link} className="text-xs" onFocus={(e) => e.currentTarget.select()} />
                <button onClick={() => copy(link)} className="shrink-0 w-10 h-10 rounded-lg bg-white border border-emerald-300 flex items-center justify-center"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            {app.status !== 'approved' && (
              <button onClick={approve} disabled={!!busy} className="inline-flex items-center min-h-[44px] px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold">
                {busy === 'approve' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Approve + invite</>}
              </button>
            )}
            {app.status === 'new' && (
              <button onClick={() => setStatus('reviewing')} disabled={!!busy} className="inline-flex items-center min-h-[44px] px-4 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-semibold">Mark reviewing</button>
            )}
            {app.status !== 'declined' && (
              <button onClick={() => { if (confirm('Decline this application?')) setStatus('declined'); }} disabled={!!busy} className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-sm font-semibold">Decline</button>
            )}
            {app.status === 'approved' && (
              <button onClick={approve} disabled={!!busy} className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-emerald-300 text-emerald-800 hover:bg-emerald-50 disabled:opacity-50 text-sm font-semibold">
                {busy === 'approve' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Resend invite / get link'}
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

/* ---------- resources manager ---------- */
const Resources = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Resource[]>([]);
  const [draft, setDraft] = useState({ vertical: 'contracts', kind: 'link', title: '', description: '', url: '' });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('wholesale_resources').select('*').order('vertical').order('display_order').order('created_at');
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from('wholesale_resources').insert({
      vertical: draft.vertical, kind: draft.kind, title: draft.title.trim(), description: draft.description.trim() || null, url: draft.url.trim(),
      display_order: items.filter((i) => i.vertical === draft.vertical).length + 1,
    });
    setBusy(false);
    if (error) return toast({ title: 'Could not add', description: error.message, variant: 'destructive' });
    setDraft({ ...draft, title: '', description: '', url: '' });
    load();
  };

  const togglePublished = async (r: Resource) => {
    await supabase.from('wholesale_resources').update({ published: !r.published }).eq('id', r.id);
    load();
  };
  const remove = async (r: Resource) => {
    if (!confirm(`Remove "${r.title}"?`)) return;
    await supabase.from('wholesale_resources').delete().eq('id', r.id);
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={add} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 lg:col-span-1" data-keep-form>
        <h3 className="font-bold text-gray-900">Add a resource</h3>
        <p className="text-xs text-gray-500">Links, videos and documents partners see in the portal, grouped by vertical.</p>
        <Select value={draft.vertical} onValueChange={(v) => setDraft({ ...draft, vertical: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{RESOURCE_VERTICALS.map((v) => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={draft.kind} onValueChange={(v) => setDraft({ ...draft, kind: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="link">Link</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Document</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Title" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <Input placeholder="https://…" required inputMode="url" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
        <Textarea placeholder="One-line description (optional)" rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <button type="submit" disabled={busy} className="w-full min-h-[44px] rounded-lg bg-[#0d2238] hover:bg-[#15AFF7] disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Add</>}
        </button>
      </form>

      <div className="lg:col-span-2 space-y-4">
        {RESOURCE_VERTICALS.map((v) => {
          const list = items.filter((i) => i.vertical === v.id);
          if (!list.length) return null;
          return (
            <div key={v.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900 mb-3">{v.name}</h3>
              <ul className="divide-y divide-gray-100">
                {list.map((r) => (
                  <li key={r.id} className="py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{r.title} <span className="text-xs text-gray-400 font-normal">· {r.kind}</span></p>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0D94D1] truncate block hover:underline">{r.url}</a>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-500"><Switch checked={r.published} onCheckedChange={() => togglePublished(r)} />{r.published ? 'Live' : 'Hidden'}</label>
                    <button onClick={() => remove(r)} className="w-9 h-9 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {!items.length && <p className="text-sm text-gray-500 rounded-2xl border border-dashed border-gray-300 p-6 text-center">No resources yet. Partners see an empty-state note in each vertical until you add some.</p>}
      </div>
    </div>
  );
};

/* ---------- members + staff ---------- */
const People = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [staff, setStaff] = useState<Tables<'admin_allowlist'>[]>([]);
  const [newStaff, setNewStaff] = useState('');

  const load = async () => {
    const [m, s] = await Promise.all([
      supabase.from('wholesale_members').select('*').order('created_at', { ascending: false }),
      supabase.from('admin_allowlist').select('*').order('created_at'),
    ]);
    setMembers(m.data ?? []);
    setStaff(s.data ?? []);
  };
  useEffect(() => { load(); }, []);

  const toggleMember = async (m: Member) => {
    const status = m.status === 'active' ? 'suspended' : 'active';
    const { error } = await supabase.from('wholesale_members').update({ status }).eq('id', m.id);
    if (error) toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    load();
  };

  const addStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newStaff.trim().toLowerCase();
    if (!email) return;
    const { error } = await supabase.from('admin_allowlist').insert({ email });
    if (error) return toast({ title: 'Could not add', description: error.message, variant: 'destructive' });
    setNewStaff('');
    toast({ title: 'Added', description: 'They become staff the first time they sign in with this email.' });
    load();
  };
  const removeStaff = async (email: string) => {
    if (!confirm(`Remove ${email} from staff? Existing sessions keep their role until they sign up again.`)) return;
    await supabase.from('admin_allowlist').delete().eq('email', email);
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-bold text-gray-900 mb-3">Approved partners</h3>
        {members.length ? (
          <ul className="divide-y divide-gray-100">
            {members.map((m) => (
              <li key={m.id} className="py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{m.agency_name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.contact_name} · {m.email} · since {fmt(m.created_at)}</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-500"><Switch checked={m.status === 'active'} onCheckedChange={() => toggleMember(m)} />{m.status === 'active' ? 'Active' : 'Paused'}</label>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-500">No approved partners yet.</p>}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-bold text-gray-900 mb-1">Staff</h3>
        <p className="text-xs text-gray-500 mb-3">Emails here get desk access when they sign in.</p>
        <ul className="divide-y divide-gray-100 mb-3">
          {staff.map((s) => (
            <li key={s.email} className="py-2 flex items-center gap-2 text-sm">
              <span className="flex-1 truncate text-gray-800">{s.email}</span>
              <button onClick={() => removeStaff(s.email)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
        <form onSubmit={addStaff} className="flex gap-2" data-keep-form>
          <Input type="email" placeholder="name@company.com" value={newStaff} onChange={(e) => setNewStaff(e.target.value)} />
          <button type="submit" className="shrink-0 w-10 h-10 rounded-lg bg-[#0d2238] text-white flex items-center justify-center"><Plus className="w-4 h-4" /></button>
        </form>
      </div>
    </div>
  );
};

/* ---------- desk ---------- */
const WholesaleDesk = () => {
  const { session, role, loading, signOut } = useSession();
  const [tab, setTab] = useState<'applications' | 'resources' | 'people'>('applications');
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('new');
  const [apps, setApps] = useState<App[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [open, setOpen] = useState<App | null>(null);

  const load = async () => {
    setAppsLoading(true);
    const { data } = await supabase.from('wholesale_applications').select('*').order('created_at', { ascending: false });
    setApps(data ?? []);
    setAppsLoading(false);
  };
  useEffect(() => { if (role === 'admin') load(); }, [role]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: apps.length };
    for (const s of APPLICATION_STATUSES) c[s] = apps.filter((a) => a.status === s).length;
    return c;
  }, [apps]);
  const visible = filter === 'all' ? apps : apps.filter((a) => a.status === filter);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  if (!session) return <StaffSignIn />;
  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Staff only</h1>
          <p className="text-sm text-gray-600 mb-6">{session.user.email} is signed in but is not on the staff list.</p>
          <button onClick={() => signOut()} className="w-full min-h-[44px] rounded-lg border border-gray-300 text-gray-700 font-medium">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ws">
      <header className="bg-[#0d2238] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7]">Agora</p>
            <h1 className="text-xl font-bold">Wholesale desk</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="hidden sm:inline-flex items-center min-h-[40px] px-3 rounded-lg border border-white/20 text-sm hover:bg-white/10">All rooms</Link>
            <Link to="/wholesale" className="hidden sm:inline-flex items-center min-h-[40px] px-3 rounded-lg border border-white/20 text-sm hover:bg-white/10">Public page</Link>
            <button onClick={() => signOut()} className="inline-flex items-center min-h-[40px] px-3 rounded-lg border border-white/20 text-sm hover:bg-white/10"><LogOut className="w-4 h-4 mr-2" />Sign out</button>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
          {([['applications', 'Applications'], ['resources', 'Portal resources'], ['people', 'Partners & staff']] as const).map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className={cn('min-h-[44px] px-4 text-sm font-medium border-b-2 transition-colors', tab === k ? 'border-[#15AFF7] text-white' : 'border-transparent text-blue-200/70 hover:text-white')}>{label}</button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tab === 'applications' && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {(['new', 'reviewing', 'approved', 'declined', 'all'] as const).map((s) => (
                <button key={s} onClick={() => setFilter(s)} className={cn('min-h-[40px] px-3 rounded-full text-sm font-medium capitalize border', filter === s ? 'bg-[#0d2238] border-[#0d2238] text-white' : 'bg-white border-gray-300 text-gray-700')}>
                  {s} <span className="opacity-60">({counts[s] ?? 0})</span>
                </button>
              ))}
              <button onClick={load} className="ml-auto w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-600" title="Refresh"><RefreshCw className={cn('w-4 h-4', appsLoading && 'animate-spin')} /></button>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              {visible.length ? (
                <ul className="divide-y divide-gray-100">
                  {visible.map((a) => (
                    <li key={a.id}>
                      <button onClick={() => setOpen(a)} className="w-full text-left px-4 sm:px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{a.agency_name}</p>
                          <p className="text-sm text-gray-500 truncate">{a.first_name} {a.last_name} · {labelFor(AGENCY_SIZES, a.agency_size)} · {labelFor(WEEKLY_PRODUCTION, a.weekly_production)} · via {a.current_imo}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{a.interests.map((i) => VERTICALS.find((v) => v.id === i)?.name ?? i).join(' · ')}</p>
                        </div>
                        <span className={cn('shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize', STATUS_STYLE[a.status as ApplicationStatus])}>{a.status}</span>
                        <span className="hidden sm:block shrink-0 text-xs text-gray-400 w-28 text-right">{fmt(a.created_at)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-10 text-center text-sm text-gray-500">{appsLoading ? 'Loading…' : 'Nothing here.'}</p>
              )}
            </div>
          </>
        )}
        {tab === 'resources' && <Resources />}
        {tab === 'people' && <People />}
      </main>

      {open && <Detail app={open} onClose={() => setOpen(null)} onChanged={async () => { await load(); const fresh = (await supabase.from('wholesale_applications').select('*').eq('id', open.id).maybeSingle()).data; if (fresh) setOpen(fresh); }} />}
    </div>
  );
};

export default WholesaleDesk;
