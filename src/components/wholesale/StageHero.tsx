/* Interactive hero, "Choose your stage": a glass agency tile sits centre
   stage; four growth-stage cards fan in an arc behind it. Pick a card (or let
   it rotate) and the tile re-skins to match: accent, headline, and the
   numbers roll to that stage. No video; everything is code + four stills. */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, LogIn, Radio, TrendingUp, Users } from 'lucide-react';
import { Counter, Letters, PrimaryButton, SecondaryButton } from '@/components/wholesale/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const V = '?v=3';

type Stage = {
  id: string; pill: string; title: string; serif: string; img: string; accent: string; tint: string;
  producers: number; weekly: number; policies: number; renewals: number; note: string;
};

export const STAGES: Stage[] = [
  { id: 'solo', pill: 'Solo producer', title: 'The producer', serif: 'who writes every week.', img: '/wholesale/stage-solo.webp' + V, accent: '#15AFF7', tint: 'from-[#eaf6ff]',
    producers: 1, weekly: 6500, policies: 4, renewals: 1200, note: 'One desk. Direct-level contracts from day one.' },
  { id: 'team', pill: 'Team', title: 'The team', serif: 'that outgrew its IMO.', img: '/wholesale/stage-team.webp' + V, accent: '#0D94D1', tint: 'from-[#e3f1fc]',
    producers: 6, weekly: 32000, policies: 19, renewals: 7800, note: 'Six producers, one board, promotions that check themselves.' },
  { id: 'agency', pill: 'Agency', title: 'The agency', serif: 'with its name on the door.', img: '/wholesale/stage-agency.webp' + V, accent: '#0b6fb0', tint: 'from-[#dcebf7]',
    producers: 28, weekly: 140000, policies: 84, renewals: 41000, note: 'White-labeled dashboard, lead store, team tree.' },
  { id: 'million', pill: 'Million-dollar agency', title: 'The million-dollar', serif: 'agency, built on Agora.', img: '/wholesale/stage-million.webp' + V, accent: '#0d2238', tint: 'from-[#e5e9f0]',
    producers: 120, weekly: 520000, policies: 310, renewals: 212000, note: 'Every carrier, every leg, every dollar, one screen.' },
];

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/* arc layout: offset from the selected index → transform */
const slot = (offset: number, mobile: boolean) => {
  const spread = mobile ? 92 : 190;
  const x = offset * spread;
  const y = Math.abs(offset) * (mobile ? 18 : 34);
  const rot = offset * (mobile ? 9 : 11);
  const scale = offset === 0 ? 1 : 0.86 - Math.abs(offset) * 0.06;
  return { x, y, rotate: rot, scale, zIndex: 10 - Math.abs(offset), opacity: Math.abs(offset) > 2 ? 0 : 1 };
};

const StageHero = () => {
  const isMobile = useIsMobile();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const S = STAGES[i];

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => setI((n) => (n + 1) % STAGES.length), 4600);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [paused]);

  const pick = (n: number) => { setI(n); setPaused(true); window.setTimeout(() => setPaused(false), 12000); };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 ws-grid-light pointer-events-none" />
      <motion.div key={S.id} className={cn('absolute inset-0 bg-gradient-to-b to-white pointer-events-none', S.tint)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
      <div className="ws-blob w-[640px] h-[640px] -top-72 -right-48 bg-[#15AFF7]/25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-20">
        {/* headline */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-[#0d2238]/10 bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-[#0d2238] mb-6 shadow-sm">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
            Agora Wholesale <span className="hidden sm:inline text-gray-400">·</span><span className="hidden sm:inline"> for agencies that already produce</span>
          </div>
          <h1 className="ws-display text-[2.6rem] sm:text-6xl lg:text-[4.6rem] leading-[0.98] font-bold text-[#0d2238]">
            <Letters text="Whatever you build," />
            <br />
            <Letters text="build it on direct contracts." delay={0.5} letterClassName="ws-gradient-sky" />
          </h1>
        </div>

        {/* selector pill */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#0d2238]/10 bg-white/80 backdrop-blur p-1 shadow-sm overflow-x-auto max-w-full">
            {STAGES.map((s, n) => (
              <button key={s.id} onClick={() => pick(n)} className={cn('relative shrink-0 min-h-[40px] px-4 rounded-full text-sm font-semibold transition-colors', n === i ? 'text-white' : 'text-gray-600 hover:text-[#0d2238]')}>
                {n === i && <motion.span layoutId="stage-pill" className="absolute inset-0 rounded-full" style={{ background: s.accent }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{s.pill}</span>
              </button>
            ))}
          </div>
        </div>

        {/* stage: arc of cards behind, glass tile in front */}
        <div className="relative mt-6 md:mt-8 h-[520px] sm:h-[560px] md:h-[600px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* cards */}
          <div className="absolute inset-x-0 top-0 h-[300px] sm:h-[340px] md:h-[380px] flex items-start justify-center" style={{ perspective: 1400 }}>
            {STAGES.map((s, n) => {
              const offset = n - i;
              const t = slot(offset, isMobile);
              return (
                <motion.button
                  key={s.id}
                  onClick={() => pick(n)}
                  aria-label={s.pill}
                  aria-pressed={n === i}
                  animate={{ x: t.x, y: t.y, rotate: t.rotate, scale: t.scale, opacity: t.opacity }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                  style={{ zIndex: t.zIndex }}
                  className="absolute top-0 w-[150px] sm:w-[180px] md:w-[210px] aspect-[3/4] rounded-[1.4rem] overflow-hidden border border-white/70 bg-white shadow-[0_30px_80px_-30px_rgba(13,34,56,.45)] origin-bottom"
                >
                  <img src={s.img} alt="" className="w-full h-full object-cover" loading={n === 0 ? 'eager' : 'lazy'} />
                  <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white via-white/85 to-transparent text-left">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: s.accent }}>Stage 0{n + 1}</span>
                    <span className="block ws-display text-sm font-semibold text-[#0d2238]">{s.pill}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* glass agency tile */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={S.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.21, 0.6, 0.2, 1] }}
                className="ws-glass w-full max-w-[560px] rounded-[1.75rem] p-5 sm:p-6 md:p-7"
                style={{ boxShadow: `0 1px 0 rgba(255,255,255,.8) inset, 0 40px 100px -40px ${S.accent}99` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: S.accent }}>Stage 0{i + 1}</p>
                    <p className="ws-display text-2xl sm:text-[1.9rem] font-bold leading-tight text-[#0d2238]">{S.title} <span className="ws-serif text-[1.08em]" style={{ color: S.accent }}>{S.serif}</span></p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-[#0d2238]/5 px-2.5 py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider"><Radio className="w-3 h-3" style={{ color: S.accent }} /> Illustrative</span>
                </div>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    ['Producers', <Counter key={'p' + S.id} to={S.producers} duration={0.9} />, Users],
                    ['Weekly premium', <Counter key={'w' + S.id} to={S.weekly} prefix="$" duration={0.9} />, TrendingUp],
                    ['Policies / wk', <Counter key={'c' + S.id} to={S.policies} duration={0.9} />, null],
                    ['Renewals / mo', <Counter key={'r' + S.id} to={S.renewals} prefix="$" duration={0.9} />, null],
                  ].map(([label, val, Icon]) => {
                    const I = Icon as typeof Users | null;
                    return (
                      <div key={label as string} className="rounded-2xl bg-white/75 border border-[#0d2238]/5 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">{I ? <I className="w-3 h-3" style={{ color: S.accent }} /> : null}{label as string}</p>
                        <p className="ws-display text-lg sm:text-xl font-bold text-[#0d2238] tabular-nums mt-0.5 truncate">{val as React.ReactNode}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">{S.note}</p>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: S.accent }}>Direct-level <ArrowUpRight className="w-3 h-3" /></span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* constant line + CTAs */}
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">Four stages, one rule. At every size, your contracts are direct, your technology carries your name, and the middle layer is not in the room.</p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-center gap-3">
            <PrimaryButton href="#calculators">See what the spread costs you</PrimaryButton>
            <SecondaryButton href="/wholesale/apply">Apply for access</SecondaryButton>
            <Link to="/wholesale/portal" className="inline-flex items-center justify-center gap-2 min-h-[52px] px-3 text-gray-500 hover:text-[#0d2238] text-sm font-medium"><LogIn className="w-4 h-4" /> Partner sign in</Link>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-gray-200 pt-8 max-w-4xl mx-auto">
          {([[4, 'verticals, one portal'], [0, 'middle layers between you and the carrier'], [1, 'login for contracts, tech, leads and tools'], [50, 'states served, nationwide carriers']] as [number, string][]).map(([n, label]) => (
            <div key={label}><div className="ws-display text-3xl font-bold text-[#0d2238]"><Counter to={n} /></div><div className="mt-1 text-xs text-gray-500 leading-snug">{label}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StageHero;
