import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type WholesaleRole = 'anon' | 'admin' | 'member' | 'suspended' | 'none';

/**
 * Tracks the Supabase session and the caller's wholesale role
 * (admin / member / suspended / none) as decided by the database.
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<WholesaleRole>('anon');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const resolveRole = async (s: Session | null) => {
      if (!s) {
        if (!cancelled) {
          setRole('anon');
          setLoading(false);
        }
        return;
      }
      const { data, error } = await supabase.rpc('my_wholesale_role');
      if (!cancelled) {
        setRole(error ? 'none' : ((data as WholesaleRole) ?? 'none'));
        setLoading(false);
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      resolveRole(data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(true);
      resolveRole(s);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const refreshRole = async () => {
    const { data } = await supabase.rpc('my_wholesale_role');
    setRole((data as WholesaleRole) ?? 'none');
  };

  return { session, role, loading, refreshRole, signOut: () => supabase.auth.signOut() };
}
