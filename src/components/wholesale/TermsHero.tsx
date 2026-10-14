/* The hero, written for a principal who already writes six figures a week:
   say who we are, show the terms, name the carriers. White, editorial,
   restrained. Left: the headline and one plain sentence. Right: the partner
   term sheet, the deal on one card. Below: the eight carriers and four facts
   that are true today. Entrances are CSS keyframes (ws-rise / ws-letter). */
import { Link } from 'react-router-dom';
import { Download, LogIn } from 'lucide-react';
import { Letters, PrimaryButton } from '@/components/wholesale/ui';
import { AGORA_CARRIERS } from '@/lib/wholesale';

const V = '?v=5';

const TERMS: [string, string, string?][] = [
  ['Contracts', 'Direct level', 'Eight carriers'],
  ['Book of business', 'Owned by your agency'],
  ['Release', 'On request'],
  ['Platform fee', 'None'],
  ['Technology, leads, tools', 'Optional', 'Priced before you buy'],
  ['Training', 'Not required'],
];

const FACTS: { value: string; label: string }[] = [
  { value: String(AGORA_CARRIERS.length), label: 'carriers at direct level' },
  { value: '100%', label: 'of your book owned by your agency' },
  { value: 'On request', label: 'release, no hostage contracts' },
  { value: '$0', label: 'platform fee for contract access' },
];

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

const TermsHero = () => (
  <section className="relative overflow-hidden bg-white">
    {/* quiet atmosphere: a sky wash and a fine grid, nothing that moves for attention */}
    <div className="absolute inset-0 ws-grid-light pointer-events-none [mask-image:linear-gradient(180deg,#000,transparent_75%)]" />
    <div className="absolute -top-40 right-[-10%] w-[760px] h-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(21,175,247,.16),transparent)] pointer-events-none" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12 md:pb-16">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* the claim */}
        <div className="lg:col-span-7">
          <p className="ws-rise inline-flex items-center gap-2 rounded-full border border-[#0d2238]/10 bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-[#0d2238] shadow-sm" style={d(0)}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#15AFF7]" />
            <span className="hidden sm:inline">Agora Wholesale</span> <span className="hidden sm:inline text-gray-300">·</span> <span className="sm:text-gray-500 sm:font-medium whitespace-nowrap">Direct-level life and annuity contracts</span>
          </p>
          <h1 className="ws-display mt-6 text-[2.55rem] sm:text-6xl lg:text-[4.6rem] leading-[0.97] font-bold text-[#0d2238]">
            <Letters text="You built the agency." />
            <br />
            <Letters text="Your IMO owns the contract." delay={0.45} letterClassName="ws-gradient-sky" />
          </h1>
          <p className="ws-rise mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl" style={d(0.9)}>
            <span className="ws-serif text-[1.25em] text-[#0d2238]">Not anymore.</span> Agora Wholesale puts producing agencies on direct-level contracts with eight carriers. Your agency owns its book. If you ever decide to leave, we release you.
          </p>
          <div className="ws-rise mt-8 flex flex-col sm:flex-row sm:items-center gap-3" style={d(1.05)}>
            <PrimaryButton href="/wholesale/apply"><span className="sm:hidden">Request a partner review</span><span className="hidden sm:inline">Request a private partner review</span></PrimaryButton>
            <a href={'/wholesale/agora-wholesale-guide.pdf' + V} download="Agora-Wholesale-Partner-Guide.pdf" className="inline-flex items-center justify-center gap-2 min-h-[54px] px-6 rounded-full font-semibold text-[#0d2238] border border-[#0d2238]/15 bg-white hover:border-[#0d2238] transition-colors">
              <Download className="w-4 h-4 text-[#0D94D1]" /> Partner guide
            </a>
          </div>
          <p className="ws-rise mt-5 text-sm text-gray-500" style={d(1.15)}>
            Built for agencies writing six figures a week. Every request is read by a principal.{' '}
            <Link to="/wholesale/portal" className="inline-flex items-center gap-1 text-[#0d2238] font-medium hover:text-[#0D94D1]"><LogIn className="w-3.5 h-3.5" /> Partner sign in</Link>
          </p>
        </div>

        {/* the term sheet */}
        <div className="lg:col-span-5 relative">
          <img src={'/wholesale/scene-contracts.webp' + V} alt="" aria-hidden="true" draggable={false} className="ws-float hidden sm:block absolute -top-14 -right-8 w-[150px] rotate-[14deg] drop-shadow-[0_30px_40px_rgba(13,34,56,.28)] z-10 pointer-events-none" />
          <div className="ws-rise relative rounded-[1.75rem] border border-[#0d2238]/10 bg-white shadow-[0_50px_120px_-40px_rgba(13,34,56,.45)] overflow-hidden" style={d(0.6)}>
            <div className="h-1.5 bg-gradient-to-r from-[#0d2238] via-[#0D94D1] to-[#15AFF7]" />
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0D94D1]">Partner terms</p>
                  <p className="ws-serif text-[1.9rem] leading-tight text-[#0d2238] mt-1">The short version.</p>
                </div>
                <p className="sm:hidden text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 pt-1 text-right">Agora Wholesale<br />Term sheet</p>
              </div>
              <dl className="mt-6">
                {TERMS.map(([k, v, sub], n) => (
                  <div key={k} className="ws-rise flex items-baseline justify-between gap-4 py-3 border-t border-dashed border-[#0d2238]/12" style={d(0.85 + n * 0.08)}>
                    <dt className="text-sm text-gray-500">{k}</dt>
                    <dd className="text-right">
                      <span className="block text-[15px] font-semibold text-[#0d2238]">{v}</span>
                      {sub && <span className="block text-xs text-gray-400">{sub}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 pt-5 border-t border-[#0d2238]/12 flex items-end justify-between gap-4">
                <p className="text-xs text-gray-500 leading-relaxed max-w-[15rem]">Carrier grid and levels are shared privately after review.</p>
                <div className="text-right shrink-0">
                  <p className="ws-serif text-xl text-[#0d2238] leading-none">Agora</p>
                  <div className="mt-1.5 h-px w-28 bg-[#0d2238]/30 ml-auto" />
                  <p className="mt-1 text-[9px] tracking-[0.2em] uppercase text-gray-400">Wholesale desk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the carriers */}
      <div className="ws-rise mt-14 md:mt-20 border-t border-gray-200 pt-8" style={d(1.3)}>
        <p className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">Direct-level contracts with</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 sm:gap-x-10">
          {AGORA_CARRIERS.map((c) => (
            <li key={c} className="ws-display text-base sm:text-lg font-semibold text-[#0d2238]/55 hover:text-[#0d2238] transition-colors whitespace-nowrap">{c}</li>
          ))}
        </ul>
      </div>

      {/* what is true today */}
      <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-gray-200 bg-gray-200">
        {FACTS.map((f) => (
          <div key={f.label} className="bg-white p-5 sm:p-6">
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block ws-display text-2xl sm:text-3xl font-bold text-[#0d2238] tabular-nums">{f.value}</span>
              <span className="mt-1 block text-xs sm:text-sm text-gray-500 leading-snug">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default TermsHero;
