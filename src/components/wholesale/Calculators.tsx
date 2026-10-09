/* Three interactive calculators for the Wholesale page.
   All math is illustrative and runs in the browser; nothing is sent anywhere.
   Agora's actual contract levels are never shown here: the visitor supplies
   their own level and a hypothetical uplift. */
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, Layers, TrendingUp, Info } from 'lucide-react';
import { Range, Counter } from '@/components/wholesale/ui';
import { cn } from '@/lib/utils';

const usd = (n: number, digits = 0) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits });
const pct = (n: number) => `${n}%`;
const num = (n: number) => n.toLocaleString('en-US');

/* ---------- 1. Contract level gap ---------- */
const LevelGap = () => {
  const [weekly, setWeekly] = useState(10000);
  const [producers, setProducers] = useState(10);
  const [level, setLevel] = useState(100);
  const [points, setPoints] = useState(20);

  const r = useMemo(() => {
    const annualPremium = weekly * 52 * producers;
    const now = annualPremium * (level / 100);
    const next = annualPremium * ((level + points) / 100);
    return { annualPremium, now, next, gap: next - now, monthly: (next - now) / 12 };
  }, [weekly, producers, level, points]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Range label="Annual premium submitted per producer, per week" value={weekly} min={1000} max={50000} step={500} onChange={setWeekly} format={(v) => usd(v)} />
        <Range label="Producers writing" value={producers} min={1} max={250} onChange={setProducers} format={num} />
        <Range label="Your current contract level" value={level} min={50} max={150} onChange={setLevel} format={pct} />
        <Range label="Points gained on a direct-level contract (illustrative)" value={points} min={5} max={40} onChange={setPoints} format={(v) => `+${v} pts`} />
      </div>
      <div className="lg:col-span-5">
        <div className="ws-ring rounded-3xl bg-[#0d2238] text-white p-7 h-full">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7]">Year-one commission left on the table</p>
          <p className="ws-display mt-3 text-5xl sm:text-6xl font-bold tabular-nums"><Counter key={r.gap} to={Math.round(r.gap)} prefix="$" duration={0.8} /></p>
          <p className="mt-1 text-blue-100/70 text-sm">per year, across your floor</p>
          <dl className="mt-7 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">At {level}% today</dt><dd className="ws-display text-xl font-semibold mt-1 tabular-nums">{usd(r.now)}</dd></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">At {level + points}% direct</dt><dd className="ws-display text-xl font-semibold mt-1 tabular-nums text-[#6fd0ff]">{usd(r.next)}</dd></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 col-span-2"><dt className="text-blue-100/60">That is <span className="text-white font-medium">{usd(r.monthly)}</span> a month on <span className="text-white font-medium">{usd(r.annualPremium)}</span> of annual premium.</dt></div>
          </dl>
        </div>
      </div>
    </div>
  );
};

/* ---------- 2. Lead ROI ---------- */
const LeadRoi = () => {
  const [leads, setLeads] = useState(50);
  const [cpl, setCpl] = useState(35);
  const [close, setClose] = useState(12);
  const [avgPrem, setAvgPrem] = useState(1800);
  const [level, setLevel] = useState(110);

  const r = useMemo(() => {
    const spend = leads * cpl;
    const policies = leads * (close / 100);
    const commission = policies * avgPrem * (level / 100);
    return { spend, policies, commission, net: commission - spend, roi: spend ? commission / spend : 0 };
  }, [leads, cpl, close, avgPrem, level]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Range label="Leads per week" value={leads} min={10} max={1000} step={10} onChange={setLeads} format={num} />
        <Range label="Cost per lead" value={cpl} min={5} max={150} onChange={setCpl} format={(v) => usd(v)} />
        <Range label="Close rate" value={close} min={2} max={40} onChange={setClose} format={pct} />
        <Range label="Average annual premium per sale" value={avgPrem} min={400} max={8000} step={100} onChange={setAvgPrem} format={(v) => usd(v)} />
        <Range label="Contract level" value={level} min={50} max={150} onChange={setLevel} format={pct} />
      </div>
      <div className="lg:col-span-5">
        <div className="ws-ring rounded-3xl bg-[#0d2238] text-white p-7 h-full">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7]">Weekly return on lead spend</p>
          <p className="ws-display mt-3 text-5xl sm:text-6xl font-bold tabular-nums">{r.roi.toFixed(1)}<span className="text-[#6fd0ff]">x</span></p>
          <p className="mt-1 text-sm text-blue-100/70">back on every dollar of lead spend, before renewals</p>
          <dl className="mt-7 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">Spend / week</dt><dd className="ws-display text-xl font-semibold mt-1 tabular-nums">{usd(r.spend)}</dd></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">Policies / week</dt><dd className="ws-display text-xl font-semibold mt-1 tabular-nums">{r.policies.toFixed(1)}</dd></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">Commission / week</dt><dd className="ws-display text-xl font-semibold mt-1 tabular-nums text-[#6fd0ff]">{usd(r.commission)}</dd></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><dt className="text-blue-100/60">Net / month</dt><dd className={cn('ws-display text-xl font-semibold mt-1 tabular-nums', r.net < 0 ? 'text-red-300' : 'text-emerald-300')}>{usd(r.net * 4.33)}</dd></div>
          </dl>
          <p className="mt-5 text-xs text-blue-100/50">In the Agora lead store the price per lead is set and visible before you buy, and outcomes flow back into this same math automatically.</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- 3. Renewal stack ---------- */
const RenewalStack = () => {
  const [placed, setPlaced] = useState(500000);
  const [persist, setPersist] = useState(85);
  const [renewal, setRenewal] = useState(8);
  const years = 6;

  const r = useMemo(() => {
    // Each year's book renews at persistency; renewal commission paid on the surviving book from prior years.
    const rows: { year: number; book: number; income: number }[] = [];
    let cumulative = 0;
    for (let y = 1; y <= years; y++) {
      let surviving = 0;
      for (let k = 1; k < y; k++) surviving += placed * Math.pow(persist / 100, y - k);
      const income = surviving * (renewal / 100);
      cumulative += income;
      rows.push({ year: y, book: surviving, income });
    }
    const max = Math.max(...rows.map((x) => x.income), 1);
    return { rows, cumulative, max, yearN: rows[years - 1].income };
  }, [placed, persist, renewal]);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <Range label="Annual premium placed each year" value={placed} min={50000} max={5000000} step={50000} onChange={setPlaced} format={(v) => usd(v)} />
        <Range label="Persistency (policies still paying a year later)" value={persist} min={60} max={95} onChange={setPersist} format={pct} />
        <Range label="Renewal commission at your position" value={renewal} min={1} max={15} step={0.5} onChange={setRenewal} format={(v) => `${v}%`} />
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 flex gap-3">
          <Info className="w-5 h-5 text-[#15AFF7] shrink-0 mt-0.5" />
          <p>Renewals are the part of the spread most agencies never see. A direct-level position pays renewals on the same schedule Agora is paid, instead of ten points under it.</p>
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="ws-ring rounded-3xl bg-[#0d2238] text-white p-7 h-full">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7]">Renewal income in year {years}</p>
              <p className="ws-display mt-3 text-5xl font-bold tabular-nums"><Counter key={r.yearN} to={Math.round(r.yearN)} prefix="$" duration={0.8} /></p>
              <p className="mt-1 text-blue-100/70 text-sm">on a book you already wrote</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100/60">Cumulative</p>
              <p className="ws-display text-2xl font-semibold tabular-nums text-[#6fd0ff]">{usd(r.cumulative)}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-6 gap-2 items-end h-36">
            {r.rows.map((row) => (
              <div key={row.year} className="flex flex-col items-center gap-2 h-full justify-end">
                <motion.div
                  initial={false}
                  animate={{ height: `${Math.max(4, (row.income / r.max) * 100)}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#0D94D1] to-[#6fd0ff]"
                  title={usd(row.income)}
                />
                <span className="text-[11px] text-blue-100/60">Y{row.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Tabs wrapper ---------- */
const TABS = [
  { id: 'gap', label: 'Contract level gap', icon: Layers, blurb: 'What a higher position is worth on the production you already write.', el: <LevelGap /> },
  { id: 'leads', label: 'Lead store ROI', icon: Calculator, blurb: 'Turn lead spend, close rate and level into a weekly return.', el: <LeadRoi /> },
  { id: 'renewals', label: 'Renewal stack', icon: TrendingUp, blurb: 'How renewals compound on a book over six years.', el: <RenewalStack /> },
];

const Calculators = () => {
  const [tab, setTab] = useState(TABS[0].id);
  const T = TABS.find((t) => t.id === tab)!;
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
        {TABS.map((t) => {
          const I = t.icon;
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn('shrink-0 inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full border text-sm font-semibold transition-all', on ? 'bg-[#0d2238] border-[#0d2238] text-white shadow-lg' : 'bg-white border-gray-200 text-gray-700 hover:border-[#0d2238]')}
            >
              <I className={cn('w-4 h-4', on ? 'text-[#15AFF7]' : 'text-gray-400')} /> {t.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={T.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-[2rem] border border-gray-200 bg-white p-6 md:p-9 shadow-[0_30px_80px_-40px_rgba(13,34,56,.35)]"
        >
          <p className="text-gray-500 mb-6">{T.blurb}</p>
          {T.el}
          <p className="mt-6 text-xs text-gray-400">Illustrative only. Levels, renewals and lead pricing depend on carrier, product and production, and are shared privately after approval. Nothing here is an offer of compensation.</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Calculators;
