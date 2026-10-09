import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Loader2, LogOut, Search, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/hooks/useSession';
import { WholesaleLogo } from '@/components/wholesale/ui';

/** /admin: one door to every staff room, with live counts. */
const AdminHome = () => {
  const { session, role, loading, signOut } = useSession();
  const [counts, setCounts] = useState<{ newApps: number; partners: number } | null>(null);

  useEffect(() => {
    if (role !== 'admin') return;
    Promise.all([
      supabase.from('wholesale_applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('wholesale_members').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    ]).then(([a, m]) => setCounts({ newApps: a.count ?? 0, partners: m.count ?? 0 }));
  }, [role]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  if (!session || role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 ws">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <WholesaleLogo variant="dark" className="mb-5" />
          <h1 className="ws-display text-xl font-bold text-[#0d2238] mb-2">Staff area</h1>
          <p className="text-sm text-gray-600 mb-6">{session ? `${session.user.email} is signed in but is not staff.` : 'Sign in on the Wholesale desk to continue.'}</p>
          {session ? (
            <button onClick={() => signOut()} className="w-full min-h-[44px] rounded-lg border border-gray-300 text-gray-700 font-medium">Sign out</button>
          ) : (
            <Link to="/admin/wholesale" className="block w-full min-h-[44px] leading-[44px] rounded-lg bg-[#0d2238] text-white font-semibold">Go to sign in</Link>
          )}
        </div>
      </div>
    );
  }

  const rooms = [
    { to: '/admin/wholesale', icon: Briefcase, title: 'Wholesale desk', body: 'Applications, approvals, portal resources, partners and staff.', badge: counts ? `${counts.newApps} new application${counts.newApps === 1 ? '' : 's'}` : '…' },
    { to: '/admin/directors', icon: Users, title: 'Directors', body: 'The director list the advisor application form offers.', badge: null },
    { to: '/admin/seo-dashboard', icon: Search, title: 'SEO dashboard', body: 'Keyword tracking, meta management and site scans.', badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ws">
      <header className="bg-[#0d2238] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7]">Agora</p>
            <h1 className="ws-display text-xl font-bold">Admin</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-white/60">{session.user.email}</span>
            <button onClick={() => signOut()} className="inline-flex items-center min-h-[40px] px-3 rounded-lg border border-white/20 hover:bg-white/10"><LogOut className="w-4 h-4 mr-2" />Sign out</button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {counts && (
          <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs text-gray-500 uppercase tracking-wider">New wholesale applications</p><p className="ws-display text-4xl font-bold text-[#0d2238] mt-1">{counts.newApps}</p></div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs text-gray-500 uppercase tracking-wider">Active partners</p><p className="ws-display text-4xl font-bold text-[#0d2238] mt-1">{counts.partners}</p></div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-4">
          {rooms.map((r) => {
            const I = r.icon;
            return (
              <Link key={r.to} to={r.to} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#15AFF7] hover:shadow-xl transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center mb-4"><I className="w-5 h-5" /></div>
                <h2 className="ws-display text-lg font-bold text-[#0d2238]">{r.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{r.body}</p>
                {r.badge && <span className="inline-block mt-4 rounded-full bg-[#15AFF7]/10 text-[#0D94D1] text-xs font-semibold px-3 py-1">{r.badge}</span>}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
