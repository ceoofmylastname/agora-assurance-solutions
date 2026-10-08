import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Footer from '@/components/Footer';
import { WholesaleLogo } from '@/components/wholesale/ui';
import { cn } from '@/lib/utils';

const LINKS = [
  { to: '/wholesale#verticals', label: 'Verticals' },
  { to: '/wholesale#reporting', label: 'Reporting' },
  { to: '/wholesale#learn', label: 'Learn' },
  { to: '/wholesale#guide', label: 'Guide' },
  { to: '/wholesale/portal', label: 'Partner sign in' },
];

/** Dark layout with the glass Wholesale nav (agora wordmark + WHOLESALE). */
const WholesaleShell = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className={cn('min-h-screen w-full max-w-[100vw] overflow-x-hidden', dark ? 'bg-[#081626] text-white' : 'bg-gray-50 text-gray-900')}>
      <header className={cn('fixed top-0 inset-x-0 z-40 transition-all duration-300', scrolled || !dark ? 'bg-[#081626]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link to="/wholesale" aria-label="Agora Wholesale" className="flex items-center">
            <WholesaleLogo variant="white" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link to="/wholesale/apply" className="ml-2 inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-white text-[#0d2238] text-sm font-semibold hover:bg-[#15AFF7] hover:text-white transition-colors">
              Apply <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/" className="ml-3 px-3 py-2 text-xs text-white/40 hover:text-white/80 transition-colors">Main site</Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-t border-white/10 bg-[#081626]/95 backdrop-blur-xl px-4 py-3 flex flex-col"
            >
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="min-h-[48px] flex items-center px-2 text-base text-white/80 hover:text-white border-b border-white/5">
                  {l.label}
                </Link>
              ))}
              <Link to="/wholesale/apply" className="mt-3 min-h-[48px] flex items-center justify-center rounded-full bg-[#15AFF7] text-white font-semibold">
                Apply for access
              </Link>
              <Link to="/" className="min-h-[44px] flex items-center justify-center text-sm text-white/50">Back to main site</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main className={dark ? '' : 'pt-[72px]'}>{children}</main>
      <Footer />
    </div>
  );
};

export default WholesaleShell;
