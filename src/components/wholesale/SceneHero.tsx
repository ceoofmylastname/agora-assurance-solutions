/* The scene hero. One idea, staged like a product shot: the agency is a
   miniature standing on a slab of bedrock (the direct contracts), and the four
   things Agora adds float around it as objects. The story plays itself in four
   chapters: an object lifts off its card, lands in the agency, the bedrock
   flashes, the agency grows a size, and a line pops up. Click any card or
   chapter to jump. Everything is code plus nine cutouts; no video. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Counter, Letters, PrimaryButton } from '@/components/wholesale/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const V = '?v=4';
const CHAPTER_MS = 5200;

type Chapter = {
  id: string; word: string; stage: string; title: string; serif: string;
  model: string; modelW: number; /* fraction of the rock width */
  object: string; objectLabel: string; add: string; result: string; payoff: string;
  producers: number; weekly: number;
};

export const CHAPTERS: Chapter[] = [
  { id: 'solo', word: 'Solo', stage: 'Solo producer', title: 'Add direct contracts', serif: 'and the producer keeps the spread.',
    model: '/wholesale/scene-solo.webp' + V, modelW: 0.30, object: '/wholesale/scene-contracts.webp' + V, objectLabel: 'Contracts', add: 'Add direct contracts',
    result: 'One producer, every dollar at direct level. Nobody above you taking a cut.', payoff: 'Step one: the contracts. Without them nothing else is worth building.',
    producers: 1, weekly: 6500 },
  { id: 'team', word: 'Team', stage: 'Team', title: 'Add the technology', serif: 'and a team can run on your name.',
    model: '/wholesale/scene-team.webp' + V, modelW: 0.42, object: '/wholesale/scene-tech.webp' + V, objectLabel: 'Technology', add: 'Add the technology',
    result: 'Six producers on one board, promotions that check themselves, your brand on every screen.', payoff: 'Step two: the dashboard. Now you can recruit without drowning in admin.',
    producers: 6, weekly: 32000 },
  { id: 'agency', word: 'Agency', stage: 'Agency', title: 'Add the lead store', serif: 'and the floor fills.',
    model: '/wholesale/scene-agency.webp' + V, modelW: 0.46, object: '/wholesale/scene-leads.webp' + V, objectLabel: 'Lead store', add: 'Add the lead store',
    result: 'Twenty-eight producers fed by leads priced in the open and routed straight to your desks.', payoff: 'Step three: the leads. A full floor needs a full pipeline.',
    producers: 28, weekly: 140000 },
  { id: 'million', word: 'Million', stage: 'Million-dollar agency', title: 'Add the tool marketplace', serif: 'and you have a million-dollar agency.',
    model: '/wholesale/scene-million.webp' + V, modelW: 0.30, object: '/wholesale/scene-tools.webp' + V, objectLabel: 'Tool marketplace', add: 'Add the tool marketplace',
    result: 'One hundred and twenty producers, every tool at partner pricing, every carrier on one screen.', payoff: 'Step four: the tools. Everything a big shop pays retail for, at partner pricing.',
    producers: 120, weekly: 520000 },
];

/* floating card slots on desktop: % of the stage box */
const SLOTS = [
  { left: '4%', top: '16%', rotate: -8, delay: 0 },
  { left: '13%', top: '56%', rotate: 6, delay: 1.1 },
  { right: '13%', top: '12%', rotate: 7, delay: 0.6 },
  { right: '4%', top: '54%', rotate: -6, delay: 1.7 },
] as const;

const PARTICLES = Array.from({ length: 14 }, (_, k) => ({ x: (k * 67) % 100, d: 9 + (k * 37) % 9, s: 2 + (k % 3), delay: (k * 1.3) % 9 }));

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const SceneHero = () => {
  const isMobile = useIsMobile();
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [fly, setFly] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; src: string; key: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modelRef = useRef<HTMLDivElement>(null);
  const hold = useRef<number | null>(null);
  const C = CHAPTERS[i];

  /* pointer parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rockX = useTransform(sx, (v) => v * -14);
  const rockY = useTransform(sy, (v) => v * -8);
  const cardX = useTransform(sx, (v) => v * 22);
  const cardY = useTransform(sy, (v) => v * 14);
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  /* the object leaves its card and lands in the agency */
  const launch = useCallback((n: number) => {
    const stage = stageRef.current?.getBoundingClientRect();
    const card = cardRefs.current[n]?.getBoundingClientRect();
    const model = modelRef.current?.getBoundingClientRect();
    if (!stage || !card || !model) return;
    setFly({
      from: { x: card.left + card.width / 2 - stage.left, y: card.top + card.height / 2 - stage.top },
      to: { x: model.left + model.width / 2 - stage.left, y: model.top + model.height * 0.55 - stage.top },
      src: CHAPTERS[n].object, key: Date.now(),
    });
  }, []);

  const go = useCallback((n: number) => { launch(n); setI((cur) => { setPrev(cur); return n; }); }, [launch]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go((i + 1) % CHAPTERS.length), CHAPTER_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, go]);

  const pick = (n: number) => {
    go(n);
    setPaused(true);
    if (hold.current) window.clearTimeout(hold.current);
    hold.current = window.setTimeout(() => setPaused(false), 12000);
  };

  return (
    <section className="ws relative overflow-hidden text-white" style={{ background: '#061a2e' }}>
      {/* atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 50% 58%, rgba(21,175,247,.38), rgba(21,175,247,0) 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a2440 0%, rgba(6,26,46,0) 30%, rgba(6,26,46,0) 70%, #0b2b4a 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(120,200,255,.22), transparent 70%)' }} />
        {PARTICLES.map((p, k) => (
          <span key={k} className="ws-mote absolute rounded-full bg-sky-200/70" style={{ left: `${p.x}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `-${p.delay}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-14 md:pb-20">
        {/* chapter strip */}
        <div className="flex items-center justify-between gap-4">
          <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-white/90">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
            Agora Wholesale <span className="hidden xl:inline text-white/40">·</span><span className="hidden xl:inline"> for agencies that already produce</span>
          </div>
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/15 bg-white/10 backdrop-blur p-1">
            {CHAPTERS.map((c, n) => (
              <button key={c.id} onClick={() => pick(n)} className={cn('relative min-h-[36px] px-3.5 rounded-full text-xs font-semibold transition-colors overflow-hidden whitespace-nowrap', n === i ? 'text-white' : 'text-white/60 hover:text-white')}>
                {n === i && (
                  <>
                    <motion.span layoutId="chapter-pill" className="absolute inset-0 rounded-full bg-white/15" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    <motion.span key={'bar' + i + String(paused)} className="absolute left-0 bottom-0 h-[2px] bg-[#15AFF7]" initial={{ width: paused ? '100%' : '0%' }} animate={{ width: '100%' }} transition={{ duration: paused ? 0 : CHAPTER_MS / 1000, ease: 'linear' }} />
                  </>
                )}
                <span className="relative">0{n + 1} <span className="hidden lg:inline">{c.objectLabel}</span><span className="hidden xl:inline text-white/50"> → {c.stage}</span></span>
              </button>
            ))}
          </div>
        </div>

        {/* the stage */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0); }}
          className="relative mt-2 h-[450px] sm:h-[600px] md:h-[720px] lg:h-[760px]"
        >

          {/* bedrock + agency */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[30%] md:top-[30%] w-[92%] sm:w-[70%] md:w-[58%] lg:w-[52%] max-w-[760px]" style={{ zIndex: 4 }}>
          <motion.div style={{ x: rockX, y: rockY }}>
            <div className="relative ws-float" style={{ aspectRatio: '1600 / 587' }}>
              {/* mist under the rock */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18%] w-[120%] h-[60%] rounded-[50%] bg-sky-300/20 blur-3xl" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] w-[90%] h-[40%] rounded-[50%] bg-[#15AFF7]/25 blur-2xl ws-drift" />
              <img src={'/wholesale/scene-rock.webp' + V} alt="" className="absolute inset-0 w-full h-full object-contain" draggable={false} />
              {/* vein flash on landing */}
              <div key={'flash' + i} className="ws-vein absolute left-1/2 -translate-x-1/2 top-[4%] w-[80%] h-[36%] rounded-[50%] bg-[#15AFF7] blur-2xl mix-blend-screen" style={{ '--d': '.75s' } as React.CSSProperties} />
              {/* glow pool the agency stands in */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[46%] h-[26%] rounded-[50%] bg-white/30 blur-xl" />

              {/* the agency */}
              <div ref={modelRef} className="absolute left-1/2 bottom-[76%] -translate-x-1/2 w-full flex justify-center items-end" style={{ height: 1 }}>
                {prev !== null && prev !== i && (
                  <img key={'prev' + CHAPTERS[prev].id + i} src={CHAPTERS[prev].model} alt="" draggable={false} className="ws-sink absolute bottom-0" style={{ width: `${CHAPTERS[prev].modelW * 100}%`, filter: 'drop-shadow(0 18px 30px rgba(3,14,28,.85))' }} />
                )}
                <img
                  key={C.id}
                  src={C.model}
                  alt={C.stage}
                  draggable={false}
                  className="ws-pop absolute bottom-0"
                  style={{ '--d': prev === null ? '.2s' : '.55s', width: `${C.modelW * 100}%`, filter: 'drop-shadow(0 18px 30px rgba(3,14,28,.85)) drop-shadow(0 0 60px rgba(21,175,247,.35))' } as React.CSSProperties}
                />
              </div>

              {/* the word, over the cliff face */}
              <div className="absolute inset-x-0 top-[42%] md:top-[40%] flex justify-center pointer-events-none select-none" style={{ zIndex: 5 }}>
                <span key={'w' + C.id} className="ws-wordin ws-serif leading-none text-[19vw] sm:text-[7rem] md:text-[8.5rem] lg:text-[9.5rem] text-white" style={{ textShadow: '0 8px 40px rgba(3,14,28,.8), 0 0 60px rgba(21,175,247,.35)' }}>{C.word}</span>
              </div>

              {/* the tag */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[102%] md:top-[104%]" style={{ zIndex: 6 }}>
                <div
                  key={'tag' + C.id}
                  className="ws-rise rounded-2xl bg-white text-[#0d2238] px-3.5 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,.7)] whitespace-nowrap max-w-[calc(100vw-2rem)]"
                  style={{ '--d': '1s' } as React.CSSProperties}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1" aria-label="What has been added so far">
                      {CHAPTERS.map((c, n) => (
                        <span key={c.id} className={cn('relative w-7 h-7 rounded-lg border flex items-center justify-center transition-all', n <= i ? 'border-[#15AFF7]/40 bg-[#eaf6ff]' : 'border-gray-200 bg-gray-50 opacity-50 grayscale')} title={c.objectLabel}>
                          <img src={c.object} alt="" className="w-5 h-5 object-contain" draggable={false} />
                          {n <= i && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#15AFF7] text-white text-[8px] leading-3 text-center font-bold">✓</span>}
                        </span>
                      ))}
                    </div>
                    <div className="sm:border-l border-gray-200 sm:pl-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">{i + 1} of 4 added<span className="hidden sm:inline"> · illustrative</span></p>
                      <p className="ws-display text-lg md:text-xl font-bold leading-tight tabular-nums"><Counter to={C.producers} duration={0.5} /> <span className="text-xs font-semibold text-gray-500">producer{C.producers > 1 ? 's' : ''}</span> · <Counter to={C.weekly} prefix="$" duration={0.7} /> <span className="text-xs font-semibold text-gray-500">/ wk</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* the payoff line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[172%] md:top-[138%] w-[min(96%,520px)]" style={{ zIndex: 6 }}>
                <div
                  key={'pay' + C.id}
                  className="ws-rise ws-glass-dark rounded-2xl px-4 py-3 text-center"
                  style={{ '--d': '1.25s' } as React.CSSProperties}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7fd4ff]">Step 0{i + 1} · {C.add}</p>
                  <p className="mt-0.5 text-sm leading-snug text-white/90">{C.result}</p>
                </div>
            </div>
          </motion.div>
          </div>

          {/* the object in flight */}
          {fly && (
            <img
              key={fly.key}
              src={fly.src}
              alt=""
              className="ws-fly absolute w-[90px] md:w-[120px] pointer-events-none"
              style={{ left: 0, top: 0, zIndex: 8, '--x0': `${fly.from.x - 60}px`, '--y0': `${fly.from.y - 60}px`, '--xm': `${(fly.from.x + fly.to.x) / 2 - 60}px`, '--ym': `${Math.min(fly.from.y, fly.to.y) - 160}px`, '--x1': `${fly.to.x - 60}px`, '--y1': `${fly.to.y - 60}px` } as React.CSSProperties}
              onAnimationEnd={() => setFly(null)}
            />
          )}

          {/* floating cards: desktop */}
          {!isMobile && CHAPTERS.map((c, n) => {
            const s = SLOTS[n];
            const active = n === i;
            return (
              <motion.button
                key={c.id}
                ref={(el) => { cardRefs.current[n] = el; }}
                onClick={() => pick(n)}
                aria-label={c.objectLabel}
                aria-pressed={active}
                className={cn('absolute w-[150px] lg:w-[172px] aspect-[4/5] rounded-[1.6rem] ws-glass-dark text-left group', active ? 'ring-1 ring-[#15AFF7]/60' : '')}
                style={{ ...('left' in s ? { left: s.left } : { right: s.right }), top: s.top, x: cardX, y: cardY, zIndex: 3 }}
                animate={{ rotate: active ? 0 : s.rotate, scale: active ? 1.06 : 1, boxShadow: active ? '0 40px 90px -30px rgba(21,175,247,.75)' : '0 30px 80px -40px rgba(0,0,0,.6)' }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              >
                <span className="absolute inset-0 rounded-[1.6rem] ws-float" style={{ animationDelay: `-${s.delay}s`, animationDuration: `${6 + n}s` }}>
                  <img src={c.object} alt="" className={cn('absolute left-1/2 -translate-x-1/2 top-[8%] w-[78%] transition-transform duration-500', active ? 'scale-110 -translate-y-1' : 'group-hover:scale-105')} draggable={false} />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7fd4ff]">Step 0{n + 1} · {n <= i ? 'added' : 'add next'}</span>
                    <span className="block ws-display text-base font-semibold text-white mt-0.5">{c.objectLabel}</span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* cards on phones: a row under the scene */}
        {isMobile && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {CHAPTERS.map((c, n) => (
              <button key={c.id} ref={(el) => { cardRefs.current[n] = el; }} onClick={() => pick(n)} aria-label={c.objectLabel} aria-pressed={n === i} className={cn('relative aspect-[4/5] rounded-2xl ws-glass-dark transition-all', n === i ? 'ring-1 ring-[#15AFF7]/70 scale-[1.04]' : n < i ? 'opacity-90' : 'opacity-60')}>
                <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase tracking-wider text-[#7fd4ff]">{n + 1}</span>
                <img src={c.object} alt="" className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[74%]" draggable={false} />
                <span className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-semibold uppercase tracking-wider text-[#7fd4ff]">{c.objectLabel}</span>
              </button>
            ))}
          </div>
        )}

        {/* headline + CTAs */}
        <div className="relative mt-8 md:mt-4 text-center max-w-4xl mx-auto" style={{ zIndex: 7 }}>
          <h1 className="ws-display text-[2.4rem] sm:text-6xl lg:text-[4.4rem] leading-[0.98] font-bold">
            <Letters text="Whatever you build," />
            <br />
            <Letters text="build it on direct contracts." delay={0.5} letterClassName="ws-gradient-sky" />
          </h1>
            <p key={'line' + C.id} className="ws-rise mt-5 text-base sm:text-lg text-white/70" style={{ '--d': '.3s' } as React.CSSProperties}>
              <span className="text-white">{C.title}</span> <span className="ws-serif text-[1.12em] text-[#7fd4ff]">{C.serif}</span> Stack all four and the agency grows a size each time. The middle layer never enters the room.
            </p>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-center gap-3">
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
