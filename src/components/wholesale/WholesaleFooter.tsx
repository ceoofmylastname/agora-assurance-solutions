import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Download, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { WholesaleLogo } from '@/components/wholesale/ui';

const V = '?v=3';

const COLUMNS: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
  {
    title: 'The story',
    links: [
      { label: 'Chapter one · The ceiling', to: '/wholesale#learn' },
      { label: 'Chapter two · Visibility', to: '/wholesale#reporting' },
      { label: 'Chapter three · The offer', to: '/wholesale#offer' },
      { label: 'Run the calculators', to: '/wholesale#calculators' },
    ],
  },
  {
    title: 'Four doors',
    links: [
      { label: 'Contracts', to: '/wholesale#verticals' },
      { label: 'Technology', to: '/wholesale#verticals' },
      { label: 'Lead store', to: '/wholesale#verticals' },
      { label: 'Tool marketplace', to: '/wholesale#verticals' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Apply for access', to: '/wholesale/apply' },
      { label: 'Partner sign in', to: '/wholesale/portal' },
      { label: 'Wholesale 101', to: '/wholesale#education' },
      { label: 'Agora main site', to: '/' },
    ],
  },
];

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' });
};

const WholesaleFooter = () => {
  const time = useClock();
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="ws relative bg-white pt-6 pb-6 px-3 sm:px-5">
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#081626] text-white">
        {/* atmosphere */}
        <div className="ws-blob w-[640px] h-[640px] -top-72 -left-40 bg-[#15AFF7]/25" />
        <div className="ws-blob w-[520px] h-[520px] -bottom-72 right-[10%] bg-[#0D94D1]/30" style={{ animationDelay: '-7s' }} />
        <div className="absolute inset-0 ws-grid opacity-60 pointer-events-none" />
        {/* oversized wordmark watermark */}
        <img
          src={'/wholesale/agora-mark-white.png' + V}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-[6%] left-1/2 -translate-x-1/2 w-[140%] sm:w-[110%] lg:w-[92%] max-w-none opacity-[0.06]"
          style={{ maskImage: 'linear-gradient(180deg, transparent 0%, #000 55%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 55%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-12 md:pt-16">
          {/* status strip */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-10 border-b border-white/10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              <span className="text-white/80">Reviewing applications this week</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="hidden sm:inline text-white/60 tabular-nums">Sacramento, CA {time}</span>
            </div>
            <button onClick={toTop} className="group inline-flex items-center gap-2 self-start sm:self-auto text-sm text-white/60 hover:text-white transition-colors">
              Back to top
              <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#15AFF7] group-hover:border-[#15AFF7] transition-all"><ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" /></span>
            </button>
          </div>

          {/* body */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 py-12 md:py-14">
            <div className="lg:col-span-5">
              <WholesaleLogo variant="white" size="lg" />
              <p className="ws-serif mt-6 text-2xl sm:text-[1.75rem] leading-snug text-white/90 max-w-md">
                Built for agencies that already produce. Sold without the middle layer.
              </p>
              <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-md">
                Agora Assurance Solutions is the visibility and resource layer beside your agency: direct-level contracts, white-labeled technology, a transparent lead store and a tool marketplace, behind one login.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <a href="mailto:info@agoraassurancesolutions.com?subject=Wholesale" className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#15AFF7]" /> info@agoraassurancesolutions.com
                </a>
                <p className="flex items-start gap-2 text-white/55"><MapPin className="w-4 h-4 text-[#15AFF7] mt-0.5" /> 1401 21st Street, Sacramento, CA 95811</p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                {[
                  [Linkedin, 'https://www.linkedin.com/company/agora-assurance-solutions/posts/?feedView=all', 'LinkedIn'],
                  [Facebook, 'https://www.facebook.com/profile.php?id=61557048294797', 'Facebook'],
                  [Instagram, 'https://www.instagram.com/agoraassurancesolutions/', 'Instagram'],
                ].map(([Icon, href, label]) => {
                  const I = Icon as typeof Mail;
                  return (
                    <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" aria-label={label as string} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#15AFF7] hover:bg-[#15AFF7]/15 transition-all">
                      <I className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
              {COLUMNS.map((c) => (
                <div key={c.title}>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#15AFF7] mb-4">{c.title}</p>
                  <ul className="space-y-2.5">
                    {c.links.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors">
                          <span className="relative">
                            {l.label}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#15AFF7] transition-all duration-300 group-hover:w-full" />
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* guide mini-card */}
              <a
                href={'/wholesale/agora-wholesale-guide.pdf' + V}
                download="Agora-Wholesale-Partner-Guide.pdf"
                className="sm:col-span-3 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 flex items-center gap-5 hover:border-[#15AFF7]/50 transition-colors"
              >
                <img src={'/wholesale/guide-cover.webp' + V} alt="" className="w-14 sm:w-16 rounded-md shadow-lg shrink-0 transition-transform group-hover:-translate-y-1 group-hover:rotate-[-3deg]" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="ws-display font-semibold text-lg leading-tight">The partner guide</p>
                  <p className="text-sm text-white/55 mt-1">Eleven pages. Everything on this page, in a PDF you can forward.</p>
                </div>
                <span className="shrink-0 w-11 h-11 rounded-full bg-[#15AFF7] text-white flex items-center justify-center shadow-[0_10px_30px_-10px_#15AFF7] transition-transform group-hover:scale-110"><Download className="w-5 h-5" /></span>
              </a>
            </div>
          </div>

          {/* legal bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 border-t border-white/10 text-xs text-white/45">
            <p>© {new Date().getFullYear()} Agora Assurance Solutions. All rights reserved. Licensed nationwide across all 50 states.</p>
            <div className="flex items-center gap-5">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>

        {/* giant bottom band */}
        <div className="relative border-t border-white/10 overflow-hidden">
          <p className="ws-display select-none text-center font-bold leading-none tracking-[-0.04em] text-[18vw] sm:text-[14vw] lg:text-[11vw] translate-y-[22%] bg-gradient-to-b from-white/10 to-white/0 bg-clip-text text-transparent">
            WHOLESALE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WholesaleFooter;
