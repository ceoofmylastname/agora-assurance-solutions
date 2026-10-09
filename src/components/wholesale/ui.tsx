/* Animation + layout primitives for the Wholesale pages.
   Everything here is dependency-free beyond framer-motion + tailwind. */
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BRAND = { navy: '#0d2238', ink: '#081626', sky: '#15AFF7', skyDeep: '#0D94D1' };

/* ---------- Reveal: slide/fade in when scrolled into view ---------- */
type Dir = 'up' | 'down' | 'left' | 'right' | 'none';
const offset = (d: Dir) =>
  d === 'up' ? { y: 28 } : d === 'down' ? { y: -28 } : d === 'left' ? { x: 40 } : d === 'right' ? { x: -40 } : {};

export const Reveal = ({
  children, delay = 0, dir = 'up', className, once = true, duration = 0.7, as = 'div',
}: { children: ReactNode; delay?: number; dir?: Dir; className?: string; once?: boolean; duration?: number; as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'h1' | 'h2' | 'h3' }) => {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      initial={{ opacity: 0, ...offset(dir) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: [0.21, 0.6, 0.2, 1] }}
      className={className}
    >
      {children}
    </M>
  );
};

/* ---------- Stagger: children slide in one after another ---------- */
const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.2, 1] } },
};
export const Stagger = ({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'ul' | 'ol' }) => {
  const M = motion[as] as typeof motion.div;
  return (
    <M variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} className={className}>
      {children}
    </M>
  );
};
export const Item = ({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) => {
  const M = motion[as] as typeof motion.div;
  return <M variants={staggerChild} className={className}>{children}</M>;
};

/* ---------- Words: headline that slides in word by word (CSS-driven, so it never stalls) ---------- */
export const Words = ({ text, className, wordClassName, delay = 0 }: { text: string; className?: string; wordClassName?: string; delay?: number }) => {
  const words = text.split(' ');
  return (
    <span className={cn('inline', className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className={cn('ws-word', wordClassName)} style={{ ['--d' as string]: `${delay + i * 0.06}s` }}>{w}</span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

/* ---------- Counter: number that counts up in view ---------- */
export const Counter = ({ to, prefix = '', suffix = '', className, duration = 1.6 }: { to: number; prefix?: string; suffix?: string; className?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className={className}>{prefix}{n.toLocaleString()}{suffix}</span>;
};

/* ---------- Marquee: infinite horizontal scroll ---------- */
export const Marquee = ({ items, className, speed = 40, reverse = false }: { items: ReactNode[]; className?: string; speed?: number; reverse?: boolean }) => (
  <div className={cn('relative overflow-hidden', className)} style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
    <div className={cn('flex w-max gap-8 whitespace-nowrap', reverse ? 'ws-marquee-rev' : 'ws-marquee')} style={{ animationDuration: `${speed}s` }}>
      {[...items, ...items].map((it, i) => <div key={i} className="shrink-0">{it}</div>)}
    </div>
  </div>
);

/* ---------- SpotlightCard: cursor-following glow + gradient border ---------- */
export const SpotlightCard = ({ children, className, glow = BRAND.sky }: { children: ReactNode; className?: string; glow?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [hover, setHover] = useState(false);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn('relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(13,34,56,.04)] transition-all duration-300', hover && 'border-[#15AFF7]/50 shadow-[0_24px_60px_-30px_rgba(21,175,247,.45)]', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: hover ? 1 : 0, background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, ${glow}14, transparent 45%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          padding: 1,
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, ${glow}99, transparent 55%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* ---------- Tilt: subtle 3D tilt on hover ---------- */
export const Tilt = ({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Section label (eyebrow) ---------- */
export const Eyebrow = ({ children, className, light = false }: { children: ReactNode; className?: string; light?: boolean }) => (
  <p className={cn('inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase', light ? 'text-[#15AFF7]' : 'text-[#0D94D1]', className)}>
    <span className="inline-block w-5 h-px bg-current" />
    {children}
  </p>
);

/* ---------- Buttons ---------- */
export const GlowButton = ({ children, className, ...rest }: React.ComponentProps<'a'>) => (
  <a
    {...rest}
    className={cn(
      'group relative inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-full font-semibold text-white',
      'bg-[#15AFF7] hover:bg-[#0D94D1] transition-all active:scale-95',
      'shadow-[0_0_0_1px_rgba(21,175,247,.4),0_10px_40px_-10px_rgba(21,175,247,.7)] hover:shadow-[0_0_0_1px_rgba(21,175,247,.6),0_14px_50px_-10px_rgba(21,175,247,.9)]',
      className,
    )}
  >
    {children}
  </a>
);
export const GhostButton = ({ children, className, ...rest }: React.ComponentProps<'a'>) => (
  <a
    {...rest}
    className={cn('inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-full font-semibold text-[#0d2238] border border-gray-300 bg-white hover:border-[#0d2238] hover:bg-gray-50 transition-all', className)}
  >
    {children}
  </a>
);

/* ---------- Wholesale logo: the agora wordmark with WHOLESALE beneath ---------- */
export const WholesaleLogo = ({ variant = 'dark', className, size = 'md' }: { variant?: 'white' | 'dark'; className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'lg' ? 'h-12' : size === 'sm' ? 'h-6' : 'h-8';
  const t = size === 'lg' ? 'text-[13px] tracking-[0.5em]' : size === 'sm' ? 'text-[8px] tracking-[0.42em]' : 'text-[9.5px] tracking-[0.46em]';
  return (
    <span className={cn('inline-flex flex-col items-start leading-none', className)}>
      <img src={variant === 'white' ? '/wholesale/agora-mark-white.png' : '/wholesale/agora-mark-dark.png'} alt="Agora" className={cn(h, 'w-auto')} />
      <span className={cn('mt-1.5 font-semibold uppercase', t, variant === 'white' ? 'text-[#15AFF7]' : 'text-[#0d2238]')}>Wholesale</span>
    </span>
  );
};

/* ---------- Beam divider ---------- */
export const Beam = ({ className }: { className?: string }) => (
  <div className={cn('h-px w-full bg-gradient-to-r from-transparent via-[#15AFF7]/60 to-transparent', className)} />
);


/* ---------- Letters: headline that enters letter by letter (CSS-driven) ---------- */
export const Letters = ({ text, className, letterClassName, delay = 0, step = 0.028 }: { text: string; className?: string; letterClassName?: string; delay?: number; step?: number }) => {
  let i = 0;
  return (
    <span className={cn('inline', className)} aria-label={text} style={{ perspective: 600 }}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, ci) => {
            const d = delay + i++ * step;
            return <span key={ci} className={cn('ws-letter', letterClassName)} style={{ ['--d' as string]: `${d}s` }} aria-hidden="true">{ch}</span>;
          })}
          {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

/* ---------- Custom brand buttons ---------- */
export const PrimaryButton = ({ children, className, ...rest }: React.ComponentProps<'a'>) => (
  <a
    {...rest}
    className={cn(
      'ws-btn group inline-flex items-center justify-center gap-2 min-h-[54px] pl-7 pr-2 rounded-full font-semibold text-white',
      'shadow-[0_12px_40px_-12px_rgba(21,175,247,.8)] hover:shadow-[0_18px_50px_-12px_rgba(21,175,247,.95)] active:scale-[.98]',
      className,
    )}
  >
    <span className="relative z-10">{children}</span>
    <span className="relative z-10 ml-2 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  </a>
);

export const SecondaryButton = ({ children, className, ...rest }: React.ComponentProps<'a'>) => (
  <a
    {...rest}
    className={cn(
      'group inline-flex items-center justify-center gap-2 min-h-[54px] px-7 rounded-full font-semibold text-[#0d2238]',
      'border border-[#0d2238]/15 bg-white hover:border-[#0d2238] hover:bg-[#0d2238] hover:text-white transition-all active:scale-[.98]',
      className,
    )}
  >
    {children}
  </a>
);

/* ---------- Range slider with live value ---------- */
export const Range = ({ label, value, min, max, step = 1, onChange, format }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format: (v: number) => string }) => {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="ws-display text-lg font-semibold text-[#0d2238] tabular-nums">{format(value)}</span>
      </span>
      <input type="range" className="ws-range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ ['--p' as string]: `${p}%` }} />
    </label>
  );
};
