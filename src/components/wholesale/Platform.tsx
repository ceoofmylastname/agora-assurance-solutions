/* "The platform" chapter: animated, glassmorphic previews of what the Agora
   layer does. Every number on screen is demo data that animates in the
   browser; the chips say so. Real feeds connect per carrier and per tool. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  Activity, ArrowUpRight, Bot, Brain, CheckCircle2, Clock, Database, FileText, Headset, LineChart, Megaphone, Network,
  Radio, ShieldCheck, Smartphone, Sparkles, TrendingDown, TrendingUp, Trophy, Users,
} from 'lucide-react';
import { Counter, Eyebrow, Item, Reveal, Stagger } from '@/components/wholesale/ui';
import { cn } from '@/lib/utils';

const V = '?v=3';
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const DemoChip = ({ dark = false }: { dark?: boolean }) => (
  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider', dark ? 'bg-white/10 text-white/70' : 'bg-[#0d2238]/5 text-gray-500')}>
    <Radio className="w-3 h-3 text-[#15AFF7]" /> Demo data · live feeds connect per carrier
  </span>
);

const Live = () => (
  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500 ws-pulse-ring text-emerald-400" /> LIVE
  </span>
);

/* ---------------------------------------------------------------- 1. Live production board */
const CARRIERS = ['North American', 'National Life', 'F&G', 'Mutual of Omaha', 'Americo', 'Transamerica'];
const NAMES = ['M. Alvarez', 'T. Nguyen', 'D. Okafor', 'S. Patel', 'J. Brooks', 'R. Castillo', 'K. Washington', 'A. Romero'];
type Ev = { id: number; kind: 'issued' | 'paid' | 'lapsed' | 'submitted'; carrier: string; who: string; ap: number; t: string };
const KIND: Record<Ev['kind'], { label: string; cls: string }> = {
  issued: { label: 'Issued', cls: 'bg-sky-50 text-sky-700 border-sky-200' },
  paid: { label: 'Paid', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  lapsed: { label: 'Lapsed', cls: 'bg-red-50 text-red-600 border-red-200' },
  submitted: { label: 'Submitted', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const mkEvent = (id: number): Ev => {
  const r = Math.random();
  const kind: Ev['kind'] = r < 0.42 ? 'issued' : r < 0.78 ? 'paid' : r < 0.9 ? 'submitted' : 'lapsed';
  return { id, kind, carrier: CARRIERS[Math.floor(Math.random() * CARRIERS.length)], who: NAMES[Math.floor(Math.random() * NAMES.length)], ap: Math.round(rand(640, 4200) / 10) * 10, t: 'just now' };
};

const AreaChart = () => {
  const pts = useMemo(() => {
    const a: number[] = [], b: number[] = [];
    let x = 42, y = 30;
    for (let i = 0; i < 24; i++) { x = Math.min(96, Math.max(30, x + rand(-6, 9))); y = Math.min(x - 6, Math.max(16, y + rand(-5, 7))); a.push(x); b.push(y); }
    return { a, b };
  }, []);
  const W = 520, H = 160;
  const path = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (arr.length - 1)) * W},${H - (v / 100) * H}`).join(' ');
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full h-40" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ws-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#15AFF7" stopOpacity=".35" /><stop offset="1" stopColor="#15AFF7" stopOpacity="0" /></linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#0d2238" strokeOpacity=".06" />)}
      <motion.path d={`${path(pts.a)} L${W},${H} L0,${H} Z`} fill="url(#ws-area)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.2, delay: 0.6 }} />
      <motion.path d={path(pts.a)} fill="none" stroke="#15AFF7" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease: 'easeOut' }} />
      <motion.path d={path(pts.b)} fill="none" stroke="#0d2238" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }} />
      <motion.circle r="5" fill="#15AFF7" cx={W} cy={H - (pts.a[23] / 100) * H} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.6 }} />
    </svg>
  );
};

const LiveBoard = () => {
  const [events, setEvents] = useState<Ev[]>(() => Array.from({ length: 5 }, (_, i) => mkEvent(i)));
  const [tot, setTot] = useState({ issued: 1284300, paid: 1118900, lapsed: 61200 });
  const nextId = useRef(5);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      const e = mkEvent(nextId.current++);
      setEvents((prev) => [e, ...prev].slice(0, 6));
      setTot((t) => ({ issued: t.issued + (e.kind === 'issued' ? e.ap : 0), paid: t.paid + (e.kind === 'paid' ? e.ap : 0), lapsed: t.lapsed + (e.kind === 'lapsed' ? e.ap : 0) }));
    }, 2600);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="ws-glass rounded-[1.75rem] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Activity className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Production board</p><p className="text-xs text-gray-500">All carriers · this month · annual premium</p></div>
        </div>
        <div className="flex items-center gap-3"><Live /><DemoChip /></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ['Issued', tot.issued, TrendingUp, 'text-emerald-600', '+12.4%'],
          ['Paid', tot.paid, TrendingUp, 'text-emerald-600', '+9.1%'],
          ['Lapsed', tot.lapsed, TrendingDown, 'text-red-500', '-3.2%'],
        ].map(([label, val, Icon, cls, delta]) => {
          const I = Icon as typeof TrendingUp;
          return (
            <div key={label as string} className="rounded-2xl bg-white/70 border border-[#0d2238]/5 p-3 sm:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label as string}</p>
              <p className="ws-display text-lg sm:text-2xl font-bold text-[#0d2238] tabular-nums mt-1 truncate">{usd(val as number)}</p>
              <p className={cn('mt-1 inline-flex items-center gap-1 text-[11px] font-semibold', cls as string)}><I className="w-3 h-3" />{delta as string} vs last month</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-2xl bg-white/70 border border-[#0d2238]/5 p-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="inline-flex items-center gap-3"><span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#15AFF7] rounded" /> Issued &amp; paid</span><span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#0d2238] rounded border-dashed" /> Submitted</span></span>
            <span>Last 24 weeks</span>
          </div>
          <AreaChart />
        </div>
        <div className="lg:col-span-2 rounded-2xl bg-white/70 border border-[#0d2238]/5 p-4 overflow-hidden">
          <p className="text-xs text-gray-500 mb-2">Policy events, as carriers report them</p>
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.li key={e.id} layout initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex items-center gap-2 text-xs">
                  <span className={cn('shrink-0 rounded-full border px-2 py-0.5 font-semibold', KIND[e.kind].cls)}>{KIND[e.kind].label}</span>
                  <span className="truncate text-gray-700"><span className="font-medium text-[#0d2238]">{e.carrier}</span> · {e.who}</span>
                  <span className="ml-auto tabular-nums font-semibold text-[#0d2238]">{usd(e.ap)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 2. Promotion rings */
const Ring = ({ pct, label, sub, delay = 0 }: { pct: number; label: string; sub: string; delay?: number }) => {
  const r = 34, c = 2 * Math.PI * r;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <div ref={ref} className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="w-20 h-20 shrink-0" aria-hidden="true">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#0d2238" strokeOpacity=".08" strokeWidth="8" />
        <motion.circle cx="40" cy="40" r={r} fill="none" stroke="#15AFF7" strokeWidth="8" strokeLinecap="round" strokeDasharray={c} transform="rotate(-90 40 40)" initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c * (1 - pct / 100) } : {}} transition={{ duration: 1.4, delay, ease: 'easeOut' }} />
        <text x="40" y="45" textAnchor="middle" className="ws-display" fontSize="16" fontWeight="700" fill="#0d2238">{inView ? <Counter to={pct} suffix="%" duration={1.4} /> : '0%'}</text>
      </svg>
      <div className="min-w-0"><p className="font-semibold text-[#0d2238] truncate">{label}</p><p className="text-xs text-gray-500">{sub}</p></div>
    </div>
  );
};

const Promotions = () => (
  <div className="ws-glass rounded-[1.75rem] p-5 sm:p-7 h-full">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Trophy className="w-5 h-5" /></div>
        <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Promotion tracker</p><p className="text-xs text-gray-500">Thresholds from your comp plan, checked nightly</p></div>
      </div>
      <Live />
    </div>
    <div className="mt-6 space-y-5">
      <Ring pct={92} label="Castillo Agency → Managing Partner" sub="$18,400 of points to go · 11 days left in the window" />
      <Ring pct={67} label="T. Nguyen → Senior Broker" sub="3 of 5 recruits licensed · on pace" delay={0.15} />
      <Ring pct={38} label="Brooks Team → Director" sub="Needs 2 more producing legs" delay={0.3} />
    </div>
    <p className="mt-6 rounded-2xl bg-[#0d2238] text-white text-xs px-4 py-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#15AFF7]" /> When a threshold hits, the promotion is announced to the agent, the whole upline and the contracting desk automatically.</p>
  </div>
);

/* ---------------------------------------------------------------- 3. Recruiting pipeline (ExamFX) */
const STAGES = [
  ['Enrolled', 48], ['Studying', 31], ['Practice exams', 19], ['Passed', 12], ['Licensed', 9],
] as const;
const RECRUITS = [
  { name: 'Jalen Price', login: '2 h ago', score: 86, expires: 9, state: 'TX' },
  { name: 'Maria Soto', login: 'today', score: 74, expires: 23, state: 'CA' },
  { name: 'Devon Lee', login: '3 d ago', score: 61, expires: 4, state: 'FL' },
  { name: 'Priya Nair', login: '1 h ago', score: 91, expires: 41, state: 'GA' },
];

const Pipeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const max = STAGES[0][1];
  return (
    <div ref={ref} className="ws-glass rounded-[1.75rem] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Users className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Recruiting pipeline</p><p className="text-xs text-gray-500">ExamFX activity, scores and expirations, synced live</p></div>
        </div>
        <div className="flex items-center gap-3"><Live /><DemoChip /></div>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2">
        {STAGES.map(([label, n], i) => (
          <div key={label} className="text-center">
            <div className="h-24 flex items-end justify-center">
              <motion.div className="w-full max-w-[56px] rounded-t-xl bg-gradient-to-t from-[#0D94D1] to-[#6fd0ff]" initial={{ height: 0 }} animate={inView ? { height: `${(n / max) * 100}%` } : {}} transition={{ duration: 0.9, delay: 0.1 * i, ease: 'easeOut' }} />
            </div>
            <p className="ws-display text-xl font-bold text-[#0d2238] mt-2 tabular-nums">{inView ? <Counter to={n} duration={1.2} /> : 0}</p>
            <p className="text-[11px] text-gray-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white/70 border border-[#0d2238]/5 overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-b border-[#0d2238]/5">
          <span>Recruit</span><span>Last ExamFX login</span><span>Practice score</span><span>Access expires</span>
        </div>
        <Stagger as="ul">
          {RECRUITS.map((r) => (
            <Item as="li" key={r.name}>
              <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-2 items-center px-4 py-3 text-sm border-b border-[#0d2238]/5 last:border-0">
                <span className="font-medium text-[#0d2238] truncate">{r.name} <span className="text-gray-400 font-normal">· {r.state}</span></span>
                <span className="text-gray-600 text-xs">{r.login}</span>
                <span className="flex items-center gap-2"><span className="h-1.5 flex-1 rounded-full bg-[#0d2238]/10 overflow-hidden"><motion.span className={cn('block h-full rounded-full', r.score >= 80 ? 'bg-emerald-500' : r.score >= 70 ? 'bg-[#15AFF7]' : 'bg-amber-500')} initial={{ width: 0 }} animate={inView ? { width: `${r.score}%` } : {}} transition={{ duration: 1, delay: 0.4 }} /></span><span className="text-xs tabular-nums font-semibold text-[#0d2238] w-8">{r.score}</span></span>
                <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', r.expires <= 7 ? 'text-red-600' : r.expires <= 21 ? 'text-amber-600' : 'text-gray-600')}><Clock className="w-3.5 h-3.5" />{r.expires}d</span>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
      <p className="mt-4 text-xs text-gray-500">Stalled recruits get a nudge at day 30. Expiring access gets flagged to the manager a week out. Nobody falls through the cracks between the exam and the first policy.</p>
    </div>
  );
};

/* ---------------------------------------------------------------- 4. AI underwriting (RAG) */
const QUESTION = 'Client is 5\'2", 230 lbs, on metformin for type 2 diabetes, non-smoker, 54. Which carrier approves, and at what class?';
const ANSWERS = [
  { carrier: 'Carrier A', verdict: 'Standard likely', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200', why: 'Build chart allows 230 lbs at 5\'2" for Standard; controlled T2D with A1c under 7.5 keeps Standard.', cite: 'Underwriting guide · build table p.14, diabetes p.31' },
  { carrier: 'Carrier B', verdict: 'Table 2', tone: 'bg-amber-50 text-amber-700 border-amber-200', why: 'Build exceeds Standard max (218 lbs). Diabetes alone is Standard; combined, expect Table 2.', cite: 'Field guide · build p.9, impairments p.22' },
  { carrier: 'Carrier C', verdict: 'Simplified issue · approve', tone: 'bg-sky-50 text-sky-700 border-sky-200', why: 'Non-med up to 300 lbs; metformin-only diabetes is an accepted knockout answer.', cite: 'SI app · knockout questions 4 and 9' },
];

const useTypewriter = (text: string, go: boolean, speed = 22) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let i = 0;
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, speed);
    return () => clearInterval(id);
  }, [go, text, speed]);
  return text.slice(0, n);
};

const Underwriting = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const typed = useTypewriter(QUESTION, inView);
  const done = typed.length >= QUESTION.length;
  const [thinking, setThinking] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!done) return;
    setThinking(true);
    const t = setTimeout(() => { setThinking(false); setShow(true); }, 1100);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-6 items-stretch">
      {/* diagram */}
      <div className="lg:col-span-5 ws-glass-dark rounded-[1.75rem] p-6 text-white relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#15AFF7] text-white flex items-center justify-center"><Brain className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg leading-tight">Underwriting assistant</p><p className="text-xs text-white/60">Retrieval-augmented: it reads the guides, then answers</p></div>
        </div>
        <svg viewBox="0 0 320 300" className="w-full mt-6" aria-hidden="true">
          <defs><marker id="ws-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#15AFF7" /></marker></defs>
          {[['Carrier A guide', 40], ['Carrier B guide', 110], ['Carrier C guide', 180], ['Build & impairment tables', 250]].map(([t, y], i) => (
            <g key={t as string}>
              <rect x="8" y={(y as number) - 18} width="120" height="36" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.15)" />
              <text x="68" y={(y as number) + 4} textAnchor="middle" fontSize="10" fill="#dbeafe">{t as string}</text>
              <path d={`M128,${y} C160,${y} 160,150 192,150`} fill="none" stroke="#15AFF7" strokeWidth="1.5" className="ws-dash" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          ))}
          <g>
            <rect x="192" y="120" width="56" height="60" rx="14" fill="#15AFF7" fillOpacity=".18" stroke="#15AFF7" />
            <text x="220" y="146" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">VECTOR</text>
            <text x="220" y="160" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">DATABASE</text>
          </g>
          <path d="M248,150 L286,150" fill="none" stroke="#15AFF7" strokeWidth="1.5" className="ws-dash" markerEnd="url(#ws-arrow)" />
          <g>
            <circle cx="300" cy="150" r="16" fill="#fff" />
            <text x="300" y="155" textAnchor="middle" fontSize="12" fill="#0d2238" fontWeight="800">AI</text>
          </g>
        </svg>
        <ul className="mt-2 space-y-2 text-xs text-white/70">
          {['Every carrier guide, build chart and impairment table, indexed', 'Answers cite the page they came from', 'Updated the day a carrier changes a rule'].map((t) => <li key={t} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#15AFF7] shrink-0" />{t}</li>)}
        </ul>
      </div>

      {/* chat */}
      <div className="lg:col-span-7 ws-glass rounded-[1.75rem] p-5 sm:p-7 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500"><Bot className="w-4 h-4 text-[#15AFF7]" /> Ask the guides</div>
          <DemoChip />
        </div>
        <div className="mt-5 flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#0d2238] text-white px-4 py-3 text-sm leading-relaxed">
            {typed}{!done && <span className="ws-caret">▍</span>}
          </div>
        </div>
        <div className="mt-4 flex-1">
          <AnimatePresence>
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-white border border-gray-200 px-4 py-3 text-sm text-gray-500">
                <Database className="w-4 h-4 text-[#15AFF7]" /> Reading 3 carrier guides<span className="ws-caret">…</span>
              </motion.div>
            )}
          </AnimatePresence>
          {show && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl rounded-bl-md bg-white border border-gray-200 p-4">
              <p className="text-sm text-[#0d2238] font-medium">Three options. Here is how each carrier reads this client:</p>
              <Stagger className="mt-3 space-y-2">
                {ANSWERS.map((a) => (
                  <Item key={a.carrier}>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-center justify-between gap-3"><span className="font-semibold text-[#0d2238] text-sm">{a.carrier}</span><span className={cn('rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', a.tone)}>{a.verdict}</span></div>
                      <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">{a.why}</p>
                      <p className="mt-1.5 text-[11px] text-[#0D94D1] inline-flex items-center gap-1"><FileText className="w-3 h-3" />{a.cite}</p>
                    </div>
                  </Item>
                ))}
              </Stagger>
              <p className="mt-3 text-[11px] text-gray-400">Illustrative. Carrier names and rules are placeholders until each guide is loaded.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 5. Field pre-qual */
const PreQual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1700);
    return () => clearInterval(id);
  }, [inView]);
  const fields = [['Height / weight', "5'2\" · 230"], ['Medications', 'Metformin'], ['Tobacco', 'No'], ['Age', '54']];
  return (
    <div ref={ref} className="ws-glass rounded-[1.75rem] p-5 sm:p-7 grid sm:grid-cols-2 gap-6 items-center">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Smartphone className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Field pre-qual</p><p className="text-xs text-gray-500">Qualify at the kitchen table, before the app</p></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">Four questions on a phone. The same carrier guidelines the assistant reads, turned into a yes, a class, and the carrier to write it with. No surprise declines three weeks later.</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {['Runs against every carrier you are appointed with', 'Flags knock-out answers before you submit', 'Hands the result to the application in one tap'].map((t) => <li key={t} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#15AFF7] mt-0.5 shrink-0" />{t}</li>)}
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="relative w-[230px] rounded-[2rem] border-[6px] border-[#0d2238] bg-white shadow-2xl overflow-hidden">
          <div className="h-5 bg-[#0d2238]" />
          <div className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Pre-qualify</p>
            <ul className="mt-2 space-y-2">
              {fields.map(([k, v], i) => (
                <li key={k} className={cn('flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-all', i <= step ? 'border-[#15AFF7]/40 bg-sky-50' : 'border-gray-200 bg-white')}>
                  <span className="text-gray-500">{k}</span><span className="font-semibold text-[#0d2238]">{i <= step ? v : '…'}</span>
                </li>
              ))}
            </ul>
            <AnimatePresence mode="wait">
              {step === 3 ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 rounded-xl bg-emerald-500 text-white p-3">
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Best fit</p>
                  <p className="font-semibold text-sm">Carrier C · Simplified issue</p>
                  <p className="text-[11px] opacity-90">Likely approve · no exam</p>
                </motion.div>
              ) : (
                <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 h-[66px] rounded-xl bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-[#15AFF7]/30 to-transparent ws-scan" />
                  <p className="absolute inset-0 flex items-center justify-center text-[11px] text-gray-500">Checking carrier guidelines…</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 6. Market pulse + brand voice */
const TOPICS = [['"Is term or whole life better in my 40s?"', 92], ['"Final expense vs. pre-need"', 71], ['"IUL for retirement" (TikTok)', 64], ['"Annuity rates this month"', 58], ['"Mortgage protection worth it?"', 44]];
const MarketPulse = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [voice, setVoice] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setVoice((v) => !v), 3200);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref} className="ws-glass rounded-[1.75rem] p-5 sm:p-7 h-full">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Megaphone className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Market Pulse</p><p className="text-xs text-gray-500">What people are asking and sharing about insurance this week</p></div>
        </div>
        <Live />
      </div>
      <ul className="mt-5 space-y-2.5">
        {TOPICS.map(([t, n], i) => (
          <li key={t as string} className="text-xs">
            <div className="flex items-center justify-between gap-3 mb-1"><span className="text-gray-700 truncate">{t as string}</span><span className="tabular-nums font-semibold text-[#0d2238]">{n as number}</span></div>
            <div className="h-1.5 rounded-full bg-[#0d2238]/10 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-[#0D94D1] to-[#6fd0ff]" initial={{ width: 0 }} animate={inView ? { width: `${n}%` } : {}} transition={{ duration: 1, delay: 0.1 * i }} /></div>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-white/70 border border-[#0d2238]/5 p-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-500"><span>Rewrite in your brand voice</span><span className="inline-flex items-center gap-1 text-[#0D94D1]"><Sparkles className="w-3 h-3" /> {voice ? 'Castillo Agency voice' : 'Source'}</span></div>
        <AnimatePresence mode="wait">
          <motion.p key={voice ? 'b' : 'a'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="mt-2 text-sm text-[#0d2238] leading-relaxed min-h-[3.5rem]">
            {voice ? 'In your 40s, term buys the most protection per dollar. Whole life buys permanence. We will show you both, side by side, in ten minutes.' : 'Term life insurance generally offers lower premiums, while whole life provides lifelong coverage and cash value accumulation.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 7. Team tree */
const TeamTree = () => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const nodes = [
    { id: 'r', x: 200, y: 30, label: 'Castillo Agency', sub: 'Managing Partner', lvl: 0 },
    { id: 'a', x: 90, y: 110, label: 'T. Nguyen', sub: 'Senior Broker', lvl: 1 },
    { id: 'b', x: 200, y: 110, label: 'S. Patel', sub: 'Broker', lvl: 1 },
    { id: 'c', x: 310, y: 110, label: 'J. Brooks', sub: 'Director', lvl: 1 },
    { id: 'a1', x: 40, y: 190, label: 'M. Alvarez', sub: 'Agent', lvl: 2 },
    { id: 'a2', x: 140, y: 190, label: 'D. Okafor', sub: 'Agent', lvl: 2 },
    { id: 'c1', x: 260, y: 190, label: 'K. Washington', sub: 'Broker', lvl: 2 },
    { id: 'c2', x: 360, y: 190, label: 'R. Castillo', sub: 'Agent · licensing', lvl: 2 },
  ];
  const edges = [['r', 'a'], ['r', 'b'], ['r', 'c'], ['a', 'a1'], ['a', 'a2'], ['c', 'c1'], ['c', 'c2']];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="ws-glass rounded-[1.75rem] p-5 sm:p-7 h-full">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center"><Network className="w-5 h-5" /></div>
          <div><p className="ws-display font-semibold text-lg text-[#0d2238] leading-tight">Team tree</p><p className="text-xs text-gray-500">Every leg, every level, who reports to whom</p></div>
        </div>
      </div>
      <svg ref={ref} viewBox="0 0 400 240" className="w-full mt-4" aria-hidden="true">
        {edges.map(([f, t], i) => {
          const a = byId[f], b = byId[t];
          return <motion.path key={f + t} d={`M${a.x},${a.y + 16} C${a.x},${(a.y + b.y) / 2} ${b.x},${(a.y + b.y) / 2} ${b.x},${b.y - 16}`} fill="none" stroke="#15AFF7" strokeWidth="1.5" strokeOpacity=".7" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }} />;
        })}
        {nodes.map((n, i) => (
          <motion.g key={n.id} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <rect x={n.x - 46} y={n.y - 16} width="92" height="32" rx="10" fill={n.lvl === 0 ? '#0d2238' : '#fff'} stroke={n.lvl === 0 ? '#0d2238' : 'rgba(13,34,56,.15)'} />
            <text x={n.x} y={n.y - 2} textAnchor="middle" fontSize="9" fontWeight="700" fill={n.lvl === 0 ? '#fff' : '#0d2238'}>{n.label}</text>
            <text x={n.x} y={n.y + 9} textAnchor="middle" fontSize="7" fill={n.lvl === 0 ? '#9fd8ff' : '#6b7280'}>{n.sub}</text>
          </motion.g>
        ))}
      </svg>
      <p className="mt-2 text-xs text-gray-500">Overrides, promotions and production roll up the tree automatically. Click any leg to see its numbers.</p>
    </div>
  );
};

/* ---------------------------------------------------------------- 8. Automation grid */
const AUTOMATIONS = [
  [Headset, 'Support tickets, automated', 'Agents ask in plain language. The assistant answers from the manual, files a ticket only when a human is needed, and translates both ways.'],
  [ShieldCheck, 'Licensing, step by step', 'A state-by-state licensing dashboard: pre-licensing, exam, fingerprints, application, appointment. Each step checks itself off.'],
  [LineChart, 'Fast Start guides', 'The first fourteen chapters of an agent\'s career, in the portal, with the 3-2-1 list and the first-policy clock built in.'],
  [ArrowUpRight, 'Scoreboards and gamification', 'Weekly leaderboards, milestone cards and confetti the moment a recruit joins or a policy is placed.'],
] as const;

const Automations = () => (
  <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {AUTOMATIONS.map(([Icon, t, d]) => {
      const I = Icon as typeof Headset;
      return (
        <Item key={t}>
          <div className="ws-glass rounded-2xl p-5 h-full">
            <div className="w-10 h-10 rounded-xl bg-[#15AFF7] text-white flex items-center justify-center mb-3 shadow-[0_8px_24px_-8px_#15AFF7]"><I className="w-5 h-5" /></div>
            <p className="ws-display font-semibold text-[#0d2238]">{t}</p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{d}</p>
          </div>
        </Item>
      );
    })}
  </Stagger>
);

/* ---------------------------------------------------------------- chapter */
const Platform = () => (
  <>
    {/* intro + live board */}
    <section id="platform" className="relative bg-gray-50 py-20 md:py-28 border-t border-gray-200 overflow-hidden">
      <div className="ws-blob w-[720px] h-[720px] -top-72 -right-56 bg-[#15AFF7]/25" />
      <div className="ws-blob w-[520px] h-[520px] bottom-0 -left-64 bg-[#bfe6ff]/70" style={{ animationDelay: '-9s' }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>The platform · What the layer actually does</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04] text-[#0d2238]">Live numbers. <span className="ws-serif text-[1.12em] text-[#0D94D1]">Not last month's spreadsheet.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-gray-600 leading-relaxed">Issued, paid and lapsed business as the carriers report it. Promotions that check themselves. Recruits tracked from the ExamFX login to the first policy. One board, every carrier, refreshed while you watch.</p></Reveal>
          </div>
          <Reveal delay={0.15} dir="left" className="lg:col-span-5">
            <div className="rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-xl bg-white"><img src={'/wholesale/platform-dashboard.webp' + V} alt="" className="w-full aspect-[16/9] object-cover" loading="lazy" /></div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-12"><LiveBoard /></Reveal>
        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <Reveal dir="right" className="lg:col-span-5"><Promotions /></Reveal>
          <Reveal dir="left" delay={0.05} className="lg:col-span-7"><Pipeline /></Reveal>
        </div>
      </div>
    </section>

    {/* AI */}
    <section className="relative bg-[#0d2238] text-white py-20 md:py-28 overflow-hidden">
      <div className="ws-blob w-[640px] h-[640px] -top-72 -left-40 bg-[#15AFF7]/30" />
      <div className="absolute inset-0 ws-grid opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal><Eyebrow light>The platform · Intelligence</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04]">Ask the underwriting guides a question. <span className="ws-serif text-[1.12em] text-[#6fd0ff]">Get a carrier, a class and a page number.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg text-blue-100/80 leading-relaxed">Every carrier's underwriting guidelines live in one searchable database. The assistant retrieves the exact pages that apply to your client and answers from them, with citations, in seconds. In the field it becomes a four-question pre-qual.</p></Reveal>
        </div>
        <Reveal delay={0.15} className="mt-12"><Underwriting /></Reveal>
        <div className="mt-6 grid lg:grid-cols-12 gap-6 items-stretch">
          <Reveal dir="right" className="lg:col-span-7"><PreQual /></Reveal>
          <Reveal dir="left" delay={0.05} className="lg:col-span-5">
            <div className="rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 h-full"><img src={'/wholesale/platform-field.webp' + V} alt="A producer pre-qualifying a client at the kitchen table" className="w-full h-full object-cover" loading="lazy" /></div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* market + tree + automations */}
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="ws-blob w-[560px] h-[560px] top-20 -right-64 bg-[#15AFF7]/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal dir="right" className="lg:col-span-5">
            <div className="rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-xl bg-white"><img src={'/wholesale/platform-streams.webp' + V} alt="" className="w-full aspect-[16/9] object-cover" loading="lazy" /></div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>The platform · Everything else</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04] text-[#0d2238]">The market, your team, and the busywork. <span className="ws-serif text-[1.12em] text-[#0D94D1]">Handled.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-gray-600 leading-relaxed">Market Pulse watches what the country is asking about insurance and rewrites it in your brand's voice. The team tree shows every leg and level. Tickets, licensing and onboarding run themselves.</p></Reveal>
          </div>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <Reveal dir="right"><MarketPulse /></Reveal>
          <Reveal dir="left" delay={0.05}><TeamTree /></Reveal>
        </div>
        <div className="mt-6"><Automations /></div>
      </div>
    </section>
  </>
);

export default Platform;
