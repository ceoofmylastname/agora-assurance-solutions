/* The scene hero, one screen. The agency stands on a slab of bedrock (the
   direct contracts). The four things Agora adds travel on an orbit around it:
   the card at the front widens into the step panel, its object lifts out and
   lands in the agency, the bedrock flashes, the agency grows a size, and the
   orbit turns to bring the next card forward. Chapters are cumulative: add
   contracts → solo, add technology → team, add the lead store → agency, add
   the tool marketplace → million-dollar agency. Click any card or chapter to
   jump. Nine cutouts, no video. Entrances are CSS keyframes on keyed
   elements; framer only moves the orbit (no delays, no AnimatePresence). */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, LogIn } from 'lucide-react';
import { Letters, PrimaryButton } from '@/components/wholesale/ui';
import { cn } from '@/lib/utils';

const V = '?v=4';
const CHAPTER_MS = 6000;

type Chapter = {
  id: string; stage: string; model: string; modelW: number; /* fraction of the rock width */
  object: string; objectLabel: string; add: string; result: string; producers: number; weekly: number;
};

export const CHAPTERS: Chapter[] = [
  { id: 'solo', stage: 'Solo producer', model: '/wholesale/scene-solo.webp' + V, modelW: 0.30, object: '/wholesale/scene-contracts.webp' + V, objectLabel: 'Contracts', add: 'Add direct contracts',
    result: 'One producer, every dollar at direct level. Nobody above you taking a cut.', producers: 1, weekly: 6500 },
  { id: 'team', stage: 'Team', model: '/wholesale/scene-team.webp' + V, modelW: 0.42, object: '/wholesale/scene-tech.webp' + V, objectLabel: 'Technology', add: 'Add the technology',
    result: 'Six producers on one board, promotions that check themselves, your brand on every screen.', producers: 6, weekly: 32000 },
  { id: 'agency', stage: 'Agency', model: '/wholesale/scene-agency.webp' + V, modelW: 0.46, object: '/wholesale/scene-leads.webp' + V, objectLabel: 'Lead store', add: 'Add the lead store',
    result: 'Twenty-eight producers fed by leads priced in the open, routed straight to your desks.', producers: 28, weekly: 140000 },
  { id: 'million', stage: 'Million-dollar agency', model: '/wholesale/scene-million.webp' + V, modelW: 0.30, object: '/wholesale/scene-tools.webp' + V, objectLabel: 'Tool marketplace', add: 'Add the tool marketplace',
    result: 'One hundred and twenty producers, every tool at partner pricing, every carrier on one screen.', producers: 120, weekly: 520000 },
];

const PARTICLES = Array.from({ length: 14 }, (_, k) => ({ x: (k * 67) % 100, d: 9 + (k * 37) % 9, s: 2 + (k % 3), delay: (k * 1.3) % 9 }));

/* orbit geometry: slot 0 is the front (over the bedrock's face), 1 right, 2 back (behind the agency), 3 left */
const orbit = (slot: number, W: number, H: number) => {
  const mobile = W < 640;
  const rx = Math.min(W * (mobile ? 0.38 : 0.36), 430);
  const ry = H * 0.21;
  const cy = H * 0.44;
  const t = (slot / 4) * Math.PI * 2;
  const x = Math.sin(t) * rx;
  const y = cy + Math.cos(t) * ry;
  const depth = (Math.cos(t) + 1) / 2; /* 1 front, 0 back */
  const scale = slot === 0 ? 1 : mobile ? 0.5 + depth * 0.25 : 0.62 + depth * 0.25;
  return { x, y, scale, rotate: slot === 1 ? 8 : slot === 3 ? -8 : 0, opacity: slot === 2 ? 0.55 : 0.92 + depth * 0.08, z: slot === 0 ? 7 : slot === 2 ? 1 : 3 };
};

const SceneHero = () => {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [box, setBox] = useState(() => {
    const w = typeof window === 'undefined' ? 1200 : Math.min(window.innerWidth - 32, 1216);
    return { w, h: w < 640 ? 360 : w < 768 ? 400 : w < 1024 ? 430 : 450 };
  });
  const [fly, setFly] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; src: string; key: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const hold = useRef<number | null>(null);
  const C = CHAPTERS[i];
  const mobile = box.w < 640;
  const panelW = mobile ? Math.min(box.w - 32, 340) : 470;
  const cardW = mobile ? 120 : 150;
  const cardH = mobile ? 150 : 188;
  const panelH = mobile ? 128 : 150;

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* pointer parallax on the bedrock */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rockX = useTransform(sx, (v) => v * -12);
  const rockY = useTransform(sy, (v) => v * -8);
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  /* once the card has reached the front, its object lifts out and lands in the agency */
  const launch = useCallback((n: number) => {
    const stage = stageRef.current?.getBoundingClientRect();
    const model = modelRef.current?.getBoundingClientRect();
    if (!stage || !model) return;
    const front = orbit(0, stage.width, stage.height);
    const pw = stage.width < 640 ? Math.min(stage.width - 32, 340) : 470;
    setFly({
      from: { x: stage.width / 2 + front.x - pw / 2 + (stage.width < 640 ? 44 : 64), y: front.y },
      to: { x: model.left + model.width / 2 - stage.left, y: model.top - stage.top - 40 },
      src: CHAPTERS[n].object, key: Date.now(),
    });
  }, []);

  const go = useCallback((n: number) => {
    setI((cur) => { setPrev(cur); return n; });
    window.setTimeout(() => launch(n), 650);
  }, [launch]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go((i + 1) % CHAPTERS.length), CHAPTER_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, go]);

  const pick = (n: number) => {
    if (n === i) return;
    go(n);
    setPaused(true);
    if (hold.current) window.clearTimeout(hold.current);
    hold.current = window.setTimeout(() => setPaused(false), 12000);
  };

  return (
    <section className="ws relative overflow-hidden text-white" style={{ background: '#061a2e' }}>
      {/* atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 50% 42%, rgba(21,175,247,.38), rgba(21,175,247,0) 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a2440 0%, rgba(6,26,46,0) 30%, rgba(6,26,46,0) 70%, #0b2b4a 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(120,200,255,.22), transparent 70%)' }} />
        {PARTICLES.map((p, k) => (
          <span key={k} className="ws-mote absolute rounded-full bg-sky-200/70" style={{ left: `${p.x}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `-${p.delay}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 md:pt-6 pb-12 md:pb-16">
        {/* chapter strip */}
        <div className="flex items-center justify-between gap-3">
          <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-white/90 whitespace-nowrap">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
            Agora Wholesale <span className="hidden xl:inline text-white/40">·</span><span className="hidden xl:inline"> for agencies that already produce</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 backdrop-blur p-1 max-w-full overflow-x-auto">
            {CHAPTERS.map((c, n) => (
              <button key={c.id} onClick={() => pick(n)} aria-current={n === i} className={cn('relative shrink-0 min-h-[36px] px-3 md:px-3.5 rounded-full text-xs font-semibold transition-colors overflow-hidden whitespace-nowrap flex items-center gap-1.5', n === i ? 'text-white' : n < i ? 'text-[#7fd4ff]' : 'text-white/55 hover:text-white')}>
                {n === i && (
                  <>
                    <motion.span layoutId="chapter-pill" className="absolute inset-0 rounded-full bg-white/15" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    <motion.span key={'bar' + i + String(paused)} className="absolute left-0 bottom-0 h-[2px] bg-[#15AFF7]" initial={{ width: paused ? '100%' : '0%' }} animate={{ width: '100%' }} transition={{ duration: paused ? 0 : CHAPTER_MS / 1000, ease: 'linear' }} />
                  </>
                )}
                <span className={cn('relative w-4 h-4 rounded-full border flex items-center justify-center text-[9px]', n < i ? 'border-[#15AFF7] bg-[#15AFF7] text-white' : n === i ? 'border-white/60' : 'border-white/25')}>{n < i ? <Check className="w-2.5 h-2.5" /> : n + 1}</span>
                <span className="relative hidden md:inline">{c.objectLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* the stage: bedrock, agency, orbit */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0); }}
          className="relative mt-1 h-[360px] sm:h-[400px] md:h-[430px] lg:h-[450px]"
        >
          {/* bedrock + agency */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[22%] md:top-[20%] w-[88%] sm:w-[60%] md:w-[50%] lg:w-[44%] max-w-[640px]" style={{ zIndex: 4 }}>
            <motion.div style={{ x: rockX, y: rockY }}>
              <div className="relative ws-float" style={{ aspectRatio: '1600 / 587' }}>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18%] w-[120%] h-[60%] rounded-[50%] bg-sky-300/20 blur-3xl" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] w-[90%] h-[40%] rounded-[50%] bg-[#15AFF7]/25 blur-2xl ws-drift" />
                <img src={'/wholesale/scene-rock.webp' + V} alt="" className="absolute inset-0 w-full h-full object-contain" draggable={false} />
                <div key={'flash' + i} className="ws-vein absolute left-1/2 -translate-x-1/2 top-[4%] w-[80%] h-[36%] rounded-[50%] bg-[#15AFF7] blur-2xl mix-blend-screen" style={{ '--d': '1.45s' } as React.CSSProperties} />
                <div className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[46%] h-[26%] rounded-[50%] bg-white/30 blur-xl" />

                <div ref={modelRef} className="absolute left-1/2 bottom-[76%] -translate-x-1/2 w-full flex justify-center items-end" style={{ height: 1 }}>
                  {prev !== null && prev !== i && (
                    <img key={'prev' + CHAPTERS[prev].id + i} src={CHAPTERS[prev].model} alt="" draggable={false} className="ws-sink absolute bottom-0" style={{ width: `${CHAPTERS[prev].modelW * 100}%`, animationDelay: '1.3s', filter: 'drop-shadow(0 18px 30px rgba(3,14,28,.85))' }} />
                  )}
                  <img
                    key={C.id}
                    src={C.model}
                    alt={C.stage}
                    draggable={false}
                    className="ws-pop absolute bottom-0"
                    style={{ '--d': prev === null ? '.2s' : '1.5s', width: `${C.modelW * 100}%`, filter: 'drop-shadow(0 18px 30px rgba(3,14,28,.85)) drop-shadow(0 0 60px rgba(21,175,247,.35))' } as React.CSSProperties}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* the orbit */}
          {CHAPTERS.map((c, n) => {
            const slot = ((n - i) % 4 + 4) % 4;
            const o = orbit(slot, box.w, box.h);
            const front = slot === 0;
            return (
              <motion.button
                key={c.id}
                onClick={() => pick(n)}
                aria-label={c.objectLabel}
                aria-pressed={front}
                className={cn('absolute left-1/2 top-0 rounded-[1.4rem] ws-glass-dark text-left overflow-hidden', front ? 'ring-1 ring-[#15AFF7]/50' : 'hover:ring-1 hover:ring-white/30')}
                style={{ zIndex: o.z, marginLeft: front ? -panelW / 2 : -cardW / 2, transformOrigin: '50% 50%' }}
                initial={false}
                animate={{ x: o.x, y: o.y - (front ? panelH / 2 : cardH / 2), scale: o.scale, rotate: o.rotate, opacity: o.opacity, width: front ? panelW : cardW, height: front ? panelH : cardH, boxShadow: front ? '0 40px 90px -30px rgba(21,175,247,.7)' : '0 30px 80px -40px rgba(0,0,0,.6)' }}
                transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.9 }}
              >
                {/* object: top-centre on a card, left on the panel */}
                <motion.img
                  src={c.object}
                  alt=""
                  draggable={false}
                  initial={false}
                  animate={front ? { left: mobile ? 10 : 16, top: mobile ? 14 : 12, width: mobile ? 72 : 100 } : { left: cardW * 0.14, top: cardH * 0.08, width: cardW * 0.72 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                  className="absolute"
                />
                {/* card label */}
                <motion.span initial={false} animate={{ opacity: front ? 0 : 1 }} transition={{ duration: 0.25 }} className="absolute inset-x-0 bottom-0 p-3.5 pointer-events-none">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7fd4ff]">Step 0{n + 1} · {n < i ? 'added' : 'add next'}</span>
                  <span className="block ws-display text-sm md:text-base font-semibold text-white mt-0.5">{c.objectLabel}</span>
                </motion.span>
                {/* panel content */}
                {front && (
                  <div key={'panel' + c.id} className="ws-rise absolute inset-y-0 right-0 flex flex-col justify-center pr-4 md:pr-5" style={{ left: mobile ? 92 : 132, '--d': '.9s' } as React.CSSProperties}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7fd4ff]">Step 0{n + 1} · {c.add}</p>
                    <p className="mt-1 text-[12px] md:text-[13px] leading-snug text-white/85">{c.result}</p>
                    <p className="mt-1.5 ws-display text-base md:text-lg font-bold leading-tight tabular-nums text-white">
                      {c.producers} <span className="text-[11px] font-semibold text-white/55">producer{c.producers > 1 ? 's' : ''}</span>
                      <span className="text-white/30 mx-1.5">·</span>
                      {c.weekly.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} <span className="text-[11px] font-semibold text-white/55">/ wk</span>
                      <span className="hidden sm:inline-flex ml-2 align-middle rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/60">{c.stage}</span>
                    </p>
                  </div>
                )}
              </motion.button>
            );
          })}

          {/* the object in flight */}
          {fly && (
            <img
              key={fly.key}
              src={fly.src}
              alt=""
              className="ws-fly absolute w-[84px] md:w-[110px] pointer-events-none"
              style={{ left: 0, top: 0, zIndex: 9, '--x0': `${fly.from.x - 50}px`, '--y0': `${fly.from.y - 50}px`, '--xm': `${(fly.from.x + fly.to.x) / 2 - 50}px`, '--ym': `${fly.to.y - 150}px`, '--x1': `${fly.to.x - 50}px`, '--y1': `${fly.to.y - 50}px` } as React.CSSProperties}
              onAnimationEnd={() => setFly(null)}
            />
          )}
        </div>

        {/* headline + CTAs */}
        <div className="relative mt-4 md:mt-2 text-center max-w-4xl mx-auto" style={{ zIndex: 8 }}>
          <h1 className="ws-display text-[2.3rem] sm:text-[3.4rem] lg:text-[4.1rem] leading-[0.98] font-bold">
            <Letters text="You built the agency." />
            <br />
            <Letters text="Your IMO owns the contract." delay={0.45} letterClassName="ws-gradient-sky" />
          </h1>
          <p className="ws-rise mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto" style={{ '--d': '1s' } as React.CSSProperties}>
            <span className="ws-serif text-[1.2em] text-white">Not anymore.</span> Agora Wholesale puts producing agencies on direct-level contracts, then stacks the technology, the lead store and the tools on top. Watch it grow above.
          </p>
          <div className="ws-rise mt-6 flex flex-col sm:flex-row sm:items-center justify-center gap-3" style={{ '--d': '1.2s' } as React.CSSProperties}>
            <PrimaryButton href="#calculators">See what the spread costs you</PrimaryButton>
            <a href="/wholesale/apply" className="inline-flex items-center justify-center min-h-[54px] px-7 rounded-full font-semibold text-white border border-white/20 bg-white/10 hover:bg-white hover:text-[#0d2238] transition-all active:scale-[.98]">Apply for access</a>
            <Link to="/wholesale/portal" className="inline-flex items-center justify-center gap-2 min-h-[52px] px-3 text-white/60 hover:text-white text-sm font-medium"><LogIn className="w-4 h-4" /> Partner sign in</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SceneHero;
