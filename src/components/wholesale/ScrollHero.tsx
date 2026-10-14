/* Scroll-scrubbed hero: a brushed-titanium partner card turns 360° as the
   visitor scrolls, drawn from a frame sequence on a canvas, while the
   headline lands in three beats (hook → cost → offer). Pinned with GSAP.
   Phones get the orbit as a looping video with the same three beats stacked. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, LogIn } from 'lucide-react';
import { Counter, Letters, PrimaryButton, SecondaryButton } from '@/components/wholesale/ui';
import { useIsMobile } from '@/hooks/use-mobile';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const V = '?v=3';
const FRAMES = 96;
const frameSrc = (i: number) => `/wholesale/orbit/f${String(i).padStart(3, '0')}.webp${V}`;

const STATS: [number, string][] = [
  [4, 'verticals, one portal'],
  [0, 'middle layers between you and the carrier'],
  [1, 'login for contracts, tech, leads and tools'],
  [50, 'states served, nationwide carriers'],
];

/* ---------- frame sequence on a canvas ---------- */
const useFrames = (enabled: boolean) => {
  const frames = useRef<(HTMLImageElement | null)[]>(Array(FRAMES).fill(null));
  const [ready, setReady] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    // first frame first, then the rest in order with a little concurrency
    const load = (i: number) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { if (alive) { frames.current[i] = img; setReady((n) => n + 1); } res(); };
        img.onerror = () => res();
        img.src = frameSrc(i);
      });
    (async () => {
      await load(0);
      const queue = Array.from({ length: FRAMES - 1 }, (_, k) => k + 1);
      const workers = Array.from({ length: 4 }, async () => { while (alive && queue.length) await load(queue.shift()!); });
      await Promise.all(workers);
    })();
    return () => { alive = false; };
  }, [enabled]);
  return { frames, ready };
};

const Orbit = ({ progress }: { progress: React.MutableRefObject<number> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { frames, ready } = useFrames(true);
  const last = useRef(-1);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const want = Math.min(FRAMES - 1, Math.max(0, Math.round(progress.current * (FRAMES - 1))));
      // nearest loaded frame at or below the wanted one
      let i = want;
      while (i > 0 && !frames.current[i]) i--;
      const img = frames.current[i];
      if (!img || i === last.current) return;
      last.current = i;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = c.clientWidth, h = c.clientHeight;
      if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // cover-fit
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };
    draw();
    const onResize = () => { last.current = -1; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [frames, progress, ready]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

/* ---------- desktop: pinned, scrubbed ---------- */
const PinnedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current, stage = stageRef.current;
    if (!section || !stage) return;
    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>('.sh-beat', stage);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6, pin: stage, pinSpacing: false, anticipatePin: 1,
          onUpdate: (self) => { progress.current = self.progress; } },
      });
      // beat 1 visible at rest; fades out, beat 2 in, out, beat 3 in and stays
      tl.to(beats[0], { opacity: 0, y: -40, duration: 0.18 }, 0.14)
        .fromTo(beats[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.16 }, 0.3)
        .to(beats[1], { opacity: 0, y: -40, duration: 0.16 }, 0.56)
        .fromTo(beats[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.18 }, 0.7)
        .to('.sh-hint', { opacity: 0, duration: 0.08 }, 0.06);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[340vh] bg-white">
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 ws-grid-light pointer-events-none" />
        <div className="ws-blob w-[720px] h-[720px] -top-64 -right-40 bg-[#15AFF7]/25" />
        <Orbit progress={progress} />
        {/* readability wash on the text side */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />

        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* beat 1: the hook */}
          <div className="sh-beat absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-[18vh] max-w-2xl">
            <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-[#0d2238]/10 bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-[#0d2238] mb-8 shadow-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
              Agora Wholesale <span className="text-gray-400">·</span> for agencies that already produce
            </div>
            <h1 className="ws-display text-[3.4rem] lg:text-[4.6rem] xl:text-[5.4rem] leading-[0.96] font-bold text-[#0d2238]">
              <Letters text="Your IMO is your" />
              <br />
              <Letters text="most expensive" delay={0.4} />
              <br />
              <Letters text="employee." delay={0.8} letterClassName="ws-gradient-sky" />
            </h1>
            <p className="sh-hint ws-rise mt-10 inline-flex items-center gap-3 text-sm text-gray-500" style={{ ['--d' as string]: '1.3s' }}>
              <span className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center animate-bounce"><ArrowDown className="w-4 h-4" /></span>
              Scroll to turn the card
            </p>
          </div>

          {/* beat 2: the cost */}
          <div className="sh-beat absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-[22vh] max-w-2xl opacity-0">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#0D94D1] mb-5">The cost</p>
            <p className="ws-serif text-[2.6rem] lg:text-[3.6rem] xl:text-[4.2rem] leading-[1.02] text-[#0d2238]">
              It never makes a call.<br />It never writes a policy.<br />
              <span className="text-[#15AFF7]">It takes its cut first.</span>
            </p>
            <p className="mt-6 max-w-lg text-lg text-gray-600">Every week your producers submit, a layer you did not hire is paid before you are. On your renewals too. Forever.</p>
          </div>

          {/* beat 3: the offer */}
          <div className="sh-beat absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-[16vh] max-w-2xl opacity-0">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#0D94D1] mb-5">The offer</p>
            <h2 className="ws-display text-[3rem] lg:text-[4rem] xl:text-[4.6rem] leading-[0.98] font-bold text-[#0d2238]">
              Direct contracts.<br /><span className="ws-serif text-[1.08em] text-[#0D94D1]">Your name on the door.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-gray-600">Agora Wholesale puts producing agencies on direct-level contracts, their own technology, and a lead supply they control. One login. No hierarchy.</p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryButton href="#calculators">See what the spread costs you</PrimaryButton>
              <SecondaryButton href="/wholesale/apply">Apply for access</SecondaryButton>
              <Link to="/wholesale/portal" className="inline-flex items-center gap-2 min-h-[52px] px-3 text-gray-500 hover:text-[#0d2238] text-sm font-medium"><LogIn className="w-4 h-4" /> Partner sign in</Link>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-6 border-t border-gray-200 pt-6 max-w-xl">
              {STATS.map(([n, label]) => (
                <div key={label}><div className="ws-display text-3xl font-bold text-[#0d2238]"><Counter to={n} /></div><div className="mt-1 text-[11px] text-gray-500 leading-snug">{label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- phones: the orbit loops as video, beats stack ---------- */
const StackedHero = () => (
  <section className="relative overflow-hidden bg-white">
    <div className="absolute inset-0 ws-grid-light pointer-events-none" />
    <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-14">
      <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-[#0d2238]/10 bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-[#0d2238] mb-7 shadow-sm">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
        Agora Wholesale
      </div>
      <h1 className="ws-display text-[2.7rem] leading-[0.98] font-bold text-[#0d2238]">
        <Letters text="Your IMO is your" /><br /><Letters text="most expensive" delay={0.4} /><br /><Letters text="employee." delay={0.8} letterClassName="ws-gradient-sky" />
      </h1>
      <div className="ws-rise mt-8 rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-[0_40px_100px_-30px_rgba(13,34,56,.4)] bg-gray-50" style={{ ['--d' as string]: '0.6s' }}>
        <video className="w-full aspect-[16/10] object-cover" autoPlay muted loop playsInline poster={'/wholesale/orbit-poster.jpg' + V} aria-hidden="true">
          <source src={'/wholesale/orbit-loop.webm' + V} type="video/webm" />
          <source src={'/wholesale/orbit-loop.mp4' + V} type="video/mp4" />
        </video>
      </div>
      <p className="ws-serif mt-8 text-[2rem] leading-[1.05] text-[#0d2238]" style={{ ['--d' as string]: '0.9s' }}>It never makes a call. It never writes a policy. <span className="text-[#15AFF7]">It takes its cut first.</span></p>
      <p className="mt-5 text-lg text-gray-600 leading-relaxed">Agora Wholesale puts producing agencies on direct-level contracts, their own technology, and a lead supply they control. One login. No hierarchy.</p>
      <div className="mt-8 flex flex-col gap-3">
        <PrimaryButton href="#calculators">See what the spread costs you</PrimaryButton>
        <SecondaryButton href="/wholesale/apply">Apply for access</SecondaryButton>
        <Link to="/wholesale/portal" className="inline-flex items-center justify-center gap-2 min-h-[48px] text-gray-500 text-sm font-medium"><LogIn className="w-4 h-4" /> Partner sign in</Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-200 pt-8">
        {STATS.map(([n, label]) => (
          <div key={label}><div className="ws-display text-3xl font-bold text-[#0d2238]"><Counter to={n} /></div><div className="mt-1 text-xs text-gray-500 leading-snug">{label}</div></div>
        ))}
      </div>
    </div>
  </section>
);

const ScrollHero = () => {
  const isMobile = useIsMobile();
  return isMobile ? <StackedHero /> : <PinnedHero />;
};

export default ScrollHero;
