import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, Cpu, Download, Eye, LayoutGrid, PlayCircle,
  Shield, Store, Zap, Calculator, X,
} from 'lucide-react';
import SEO from '@/components/SEO';
import WholesaleShell from '@/components/wholesale/WholesaleShell';
import Calculators from '@/components/wholesale/Calculators';
import Doors from '@/components/wholesale/Doors';
import TermsHero from '@/components/wholesale/TermsHero';
import {
  Eyebrow, Item, PrimaryButton, Reveal, SecondaryButton, Stagger, Tilt,
} from '@/components/wholesale/ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

/* Media version: bump when any file in public/wholesale is replaced (the site caches /* for a year). */
const V = '?v=3';

/* ------------------------------------------------------------------ data */
const LESSONS = [
  { id: 'imo', title: 'IMO vs. wholesale', icon: Shield, lead: 'An IMO sits between you and the carrier and keeps the spread. Wholesale means you keep the spread.', body: 'Most agencies live under a national IMO. The IMO holds the contract, sets your level, and keeps the difference between what the carrier pays and what you see. Agora Wholesale starts from direct contracts, so the layer that normally eats that spread is not there.', points: ['Your level is set by production, not by politics', 'No "pass-through" permission needed from a parent shop', 'You can still keep existing carrier relationships'] },
  { id: 'levels', title: 'What a contract level means', icon: Zap, lead: 'A level is the percentage of first-year premium the carrier pays out at your position.', body: 'A "120" means 120 percent of target premium in year one. The higher you sit, the more of every policy you keep. Levels are shown privately after approval, but the rule is public: Agora never issues wholesale contracts more than twenty points below its own direct level.', points: ['Levels differ by carrier and product line', 'Renewals matter as much as first-year commission', 'Overrides on your downline are yours'] },
  { id: 'whitelabel', title: 'What white-label really means', icon: Cpu, lead: 'Your brand on the screen, our engine underneath.', body: 'A white-labeled build is the Agora platform (dashboard, promotions, onboarding, reporting) with your logo, colors and domain. Your agents never see Agora. You pay for the build; the data stays in your tenant; updates ship to everyone at once.', points: ['Scoped and priced per agency', 'Your producers log in at your domain', 'Shared portal available without a build'] },
  { id: 'leads', title: 'How lead pricing works', icon: Store, lead: 'Agora sets the price. You see it before you buy. Outcomes feed back into reporting.', body: 'Leads are tagged by source, vertical and age, and priced at cost-plus by Agora. Because the lead store and production reporting live in the same system, you see which sources write business, not just which ones were cheap.', points: ['No hidden markups between vendor and producer', 'Source quality visible in your own numbers', 'Volume commitments optional, never required'] },
  { id: 'marketplace', title: 'Why a marketplace beats a bundle', icon: LayoutGrid, lead: 'We do not build every tool. We negotiate the price of the best ones.', body: 'Agora signs cost-share agreements with tool partners (quoting engines, rate watchers, estate and tax planning). Partners get volume; you get the partner price. Where a partner shares revenue on completed work, that share flows to the agency that wrote the client.', points: ['Use the tools you already like', 'Add partners as they come online', 'Revenue share is tracked in reporting'] },
  { id: 'reporting', title: 'The reporting layer', icon: Eye, lead: 'Think Pentagon, not Army. Agora sees everything in one place without running your agency.', body: 'Agora sees the math across carriers: production, renewals, and who owes what. Partner agencies plug into that same reporting. Carrier feeds are connected one carrier at a time and appear in the portal as each comes online.', points: ['Production by carrier, agency, producer, week', 'Lead spend beside lead outcomes', 'Promotion guidelines and gamification for managers'] },
];

const FAQ = [
  ['Who is Agora Wholesale for?', 'Agencies that already produce: principals with producers writing business every week who want direct-level contracts, their own technology and a lead supply they control. If you are building your first team, the Advisor program is the better fit.'],
  ['Who owns the book of business?', 'Your agency does. The book you write through Agora is yours, and so are your producers and your name.'],
  ['Will you release us if we leave?', 'Yes. If you decide to move on, ask and we release you. No hostage contracts.'],
  ['Which carriers are available?', 'North American, F&G, National Life Group, American-Amicable, Athene, Foresters Financial, Royal Neighbors of America and Ameritas, all at direct level. The carrier grid and levels are shared privately after review.'],
  ['Is this a hierarchy we have to climb?', 'No. Agora is not a ladder. Beyond the contracts, Agora is the visibility and resource layer: reporting, technology, leads and tools in one place, used only if you want them.'],
  ['What does it cost?', 'Contract access has no platform fee. White-labeled technology is a paid build. Leads and marketplace tools are priced per item and shown before you buy. Training is available and never required.'],
  ['What happens after I request a review?', 'A principal reads every request. If your agency fits, we schedule a private call, walk through the carrier grid, and once approved your portal login arrives by email.'],
];

/* Phones get the poster frame instead of an autoplaying video. */
const Loop = ({ name, className, poster }: { name: string; className?: string; poster: string }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const kick = () => v.play().catch(() => {});
    kick();
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? kick() : v.pause())), { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, [isMobile]);
  if (isMobile) return <img src={poster} alt="" className={className} aria-hidden="true" />;
  return (
    <video ref={ref} className={className} autoPlay muted loop playsInline poster={poster} aria-hidden="true">
      <source src={`/wholesale/${name}.webm${V}`} type="video/webm" />
      <source src={`/wholesale/${name}.mp4${V}`} type="video/mp4" />
    </video>
  );
};

const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn('ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04] text-[#0d2238]', className)}>{children}</h2>
);
const Serif = ({ children }: { children: React.ReactNode }) => <span className="ws-serif text-[1.12em] text-[#0D94D1]">{children}</span>;

/* ------------------------------------------------------------------ page */
const Wholesale = () => {
  const [lesson, setLesson] = useState(LESSONS[0].id);
  const L = LESSONS.find((l) => l.id === lesson)!;

  return (
    <WholesaleShell>
      <SEO
        title="Agora Wholesale: Direct Contracts, Technology, Leads and Tools for Producing Agencies"
        description="Direct-level life and annuity contracts for producing agencies: North American, F&G, National Life Group, American-Amicable, Athene, Foresters, Royal Neighbors and Ameritas. Your agency owns its book, and we release on request."
        keywords={['insurance wholesale', 'IMO alternative', 'agency contracts', 'white label insurance platform', 'insurance lead store', 'contract level calculator']}
      />

      {/* ============================== HERO: who we are, the terms, the carriers ============================== */}
      <TermsHero />

      {/* ============================== STORY: CHAPTER 1 ============================== */}
      <section id="story" className="relative bg-white py-20 md:py-28 overflow-hidden border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal><Eyebrow>Chapter one · The ceiling</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2>You hired the producers. You bought the leads. You run the floor. <Serif>So who set your level?</Serif></H2></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                A shop that has never seen your numbers did. It holds the contract, decides what you earn on every policy, and keeps the difference. Five carrier statements arrive separately. Nobody shows you the math. The harder your floor works, the more the middle layer makes.
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-3">
              {[
                ['Your level', 'Set by someone else. Capped at what a national IMO gives an outsider.'],
                ['Your renewals', 'Paid ten points under the people above you, forever.'],
                ['Your data', 'Scattered across carriers. Reconciled by hand, if at all.'],
              ].map(([t, d]) => (
                <Item key={t}>
                  <div className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><X className="w-5 h-5" /></div>
                    <div><p className="font-semibold text-[#0d2238]">{t}</p><p className="text-sm text-gray-600 leading-relaxed">{d}</p></div>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
          <Reveal dir="left" className="lg:col-span-6">
            <div className="relative rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-[0_30px_80px_-30px_rgba(13,34,56,.3)] bg-gray-100">
              <Loop name="floor-loop" poster={'/wholesale/floor-poster.jpg' + V} className="w-full aspect-video object-cover" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#0d2238] shadow"><PlayCircle className="w-3.5 h-3.5 text-[#15AFF7]" /> Your floor, every week.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== STORY: CHAPTER 3 · THE OFFER ============================== */}
      <section id="offer" className="relative bg-[#0d2238] text-white py-20 md:py-28 overflow-hidden">
        <div className="ws-blob w-[700px] h-[700px] -top-80 -left-40 bg-[#15AFF7]/30" />
        <div className="ws-blob w-[500px] h-[500px] -bottom-60 -right-32 bg-[#0D94D1]/40" style={{ animationDelay: '-6s' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal><Eyebrow light>Chapter two · The terms</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04]">Here is the deal, <span className="ws-serif text-[1.12em] text-[#6fd0ff]">in plain English.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-blue-100/80 leading-relaxed">Direct-level contracts are the deal. Technology, leads and tools sit behind four doors in the partner portal. Walk through the ones you need and ignore the rest.</p></Reveal>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7"><Doors /></div>
            <Reveal dir="left" className="lg:col-span-5">
              <div className="ws-ring rounded-[1.75rem] bg-white text-[#0d2238] p-7 md:p-8 h-full flex flex-col">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D94D1]">What you keep, what it costs</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {[['Book of business', 'Yours'], ['Release', 'On request'], ['Contract access', 'No platform fee'], ['Portal login', 'Included'], ['White-label build', 'Scoped per agency'], ['Leads and tools', 'Per item, priced up front'], ['Training', 'Optional']].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"><span className="text-gray-600">{k}</span><span className="font-semibold text-right">{v}</span></li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-gray-500">You keep your book, your people and your name on the door.</p>
                <div className="mt-auto pt-6">
                  <PrimaryButton href="/wholesale/apply" className="w-full">Request a partner review</PrimaryButton>
                  <p className="mt-3 text-center text-xs text-gray-500">Five minutes. Read by a principal.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== CALCULATORS ============================== */}
      <section id="calculators" className="relative bg-white py-20 md:py-28 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>Do the math</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2>Three sliders. <Serif>Your numbers.</Serif> No sales deck.</H2></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-lg text-gray-600">Set the sliders to your own floor and see what a direct-level position, a transparent lead store and a renewal book you own are worth. Nothing you enter leaves your browser.</p></Reveal>
          </div>
          <Reveal delay={0.15} className="mt-10"><Calculators /></Reveal>
        </div>
      </section>

      {/* ============================== PLATFORM (teaser; the deep dive is /wholesale/platform) ============================== */}
      <section id="platform" className="relative bg-gray-50 py-20 md:py-28 border-t border-gray-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>The platform</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2>Every carrier, every producer, every week. <Serif>One screen.</Serif></H2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-gray-600 leading-relaxed">The portal comes with the contract. Carrier reporting, promotion tracking, a recruiting pipeline and an underwriting assistant that answers from the carriers' own guides.</p></Reveal>
            <Stagger className="mt-7 space-y-2.5">
              {[
                [Eye, 'Issued, paid and lapsed business as carriers report it'],
                [Zap, 'Promotions checked against your comp plan, nightly'],
                [Shield, 'Underwriting answers that cite the guide page'],
                [Cpu, 'White-labeled to your brand when you want it'],
              ].map(([Icon, t]) => {
                const I = Icon as typeof Eye;
                return <Item key={t as string}><p className="flex items-start gap-3 text-gray-700"><I className="w-5 h-5 text-[#15AFF7] mt-0.5 shrink-0" />{t as string}</p></Item>;
              })}
            </Stagger>
            <Reveal delay={0.15}>
              <a href="/wholesale/platform" className="mt-8 inline-flex items-center gap-2 min-h-[52px] px-6 rounded-full font-semibold text-white bg-[#0d2238] hover:bg-[#0D94D1] transition-colors">Tour the platform <ArrowRight className="w-4 h-4" /></a>
            </Reveal>
          </div>
          <Reveal dir="left" className="lg:col-span-7">
            <div className="rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-[0_40px_100px_-40px_rgba(13,34,56,.45)] bg-white">
              <img src={'/wholesale/platform-dashboard.webp' + V} alt="The Agora partner dashboard" className="w-full aspect-[16/10] object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== EDUCATION ============================== */}
      <section id="education" className="bg-white py-20 md:py-28 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow>Wholesale 101</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2>Learn the game <Serif>before you change it.</Serif></H2></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-lg text-gray-600">Six short explainers on how wholesale actually works. No jargon.</p></Reveal>
          </div>
          <div className="mt-12 grid lg:grid-cols-12 gap-6">
            <Reveal dir="right" className="lg:col-span-4 min-w-0">
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 max-w-[100vw] lg:max-w-none">
                {LESSONS.map((l) => {
                  const I = l.icon;
                  const on = l.id === lesson;
                  return (
                    <button key={l.id} onClick={() => setLesson(l.id)} className={cn('shrink-0 lg:shrink text-left flex items-center gap-3 rounded-2xl border px-4 py-3.5 min-h-[56px] transition-all', on ? 'border-[#0d2238] bg-[#0d2238] text-white shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-[#0d2238]')}>
                      <I className={cn('w-5 h-5 shrink-0', on ? 'text-[#15AFF7]' : 'text-gray-400')} />
                      <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">{l.title}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
            <div className="lg:col-span-8 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={L.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.21, 0.6, 0.2, 1] }} className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-7 md:p-10 h-full">
                  <p className="ws-display text-2xl md:text-[1.75rem] font-semibold leading-snug text-[#0d2238]">{L.lead}</p>
                  <p className="mt-5 text-gray-600 leading-relaxed">{L.body}</p>
                  <ul className="mt-7 grid sm:grid-cols-3 gap-3">
                    {L.points.map((p) => <li key={p} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 flex gap-2"><Check className="w-4 h-4 text-[#15AFF7] mt-0.5 shrink-0" />{p}</li>)}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== GUIDE ============================== */}
      <section id="guide" className="relative bg-gray-50 py-20 md:py-28 border-t border-gray-200 overflow-hidden">
        <div className="ws-blob w-[520px] h-[520px] top-10 -right-52 bg-[#15AFF7]/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal><Eyebrow>The partner guide</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2>Everything on this page, <Serif>in a PDF you can hand to your partners.</Serif></H2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-gray-600 leading-relaxed">What Agora Wholesale is, who it is for, the four verticals, the reporting layer, how to qualify, and what happens after you request a review.</p></Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PrimaryButton href={'/wholesale/agora-wholesale-guide.pdf' + V} download="Agora-Wholesale-Partner-Guide.pdf"><Download className="w-4 h-4 inline mr-2 -mt-0.5" />Download the guide</PrimaryButton>
                <SecondaryButton href={'/wholesale/agora-wholesale-guide.pdf' + V} target="_blank" rel="noopener noreferrer"><BookOpen className="w-5 h-5 text-[#15AFF7] group-hover:text-white" /> Read it in the browser</SecondaryButton>
              </div>
            </Reveal>
          </div>
          <Reveal dir="left" className="flex justify-center lg:justify-end">
            <Tilt max={10}>
              <a href={'/wholesale/agora-wholesale-guide.pdf' + V} download="Agora-Wholesale-Partner-Guide.pdf" className="block ws-float">
                <img src={'/wholesale/guide-cover.webp' + V} alt="The Agora Wholesale partner guide" className="w-[300px] sm:w-[360px] rounded-2xl shadow-[0_50px_100px_-30px_rgba(13,34,56,.5)] border border-gray-200" loading="lazy" />
              </a>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ============================== WHO + HOW ============================== */}
      <section className="bg-white py-20 md:py-28 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal dir="right" className="lg:col-span-5">
            <div className="relative rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-xl bg-gray-100">
              <img src={'/wholesale/owner.webp' + V} alt="Agency leaders in a bright office" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-white via-white/85 to-transparent">
                <p className="ws-serif text-xl text-[#0d2238]">Wholesale is for the people who already run the floor.</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Who this is for</Eyebrow></Reveal>
            <Reveal delay={0.05}><H2 className="lg:text-4xl">Real agencies. Weekly production. <Serif>Resources, not pep talks.</Serif></H2></Reveal>
            <Stagger className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                ['An agency that writes every week', 'Producers submitting business weekly, and the reporting to prove it.'],
                ['An agency with its own name', 'You want your brand on the door and Agora running the engine behind it.'],
                ['Tired of the big-shop ceiling', 'You are capped at the level a national IMO gives an outsider.'],
                ['Ready to own your supply', 'You want leads, tools and contracts you choose, priced where you can see them.'],
              ].map(([t, d]) => (
                <Item key={t}><div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 h-full"><Check className="w-5 h-5 text-[#15AFF7] mb-2" /><p className="font-semibold text-[#0d2238]">{t}</p><p className="text-sm text-gray-600 leading-relaxed">{d}</p></div></Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-12"><Eyebrow>How it works</Eyebrow></Reveal>
            <ol className="mt-5 relative border-l border-gray-200 pl-6 space-y-6">
              {[
                ['Request a review', 'Five minutes: agency size, weekly production, current IMO, carriers, and what you want from Agora.'],
                ['Private call', 'A principal reads every request. If the fit is right, we schedule a call and walk through the carrier grid.'],
                ['Approval', 'Approved agencies get a portal invitation by email and set a password.'],
                ['Plug in', 'Contracts first. Technology, leads and tools are there in the portal when you want them.'],
              ].map(([t, d], i) => (
                <Reveal key={t} as="li" delay={0.08 * i} dir="right" className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#15AFF7] text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_4px_#fff]">{i + 1}</span>
                  <p className="font-semibold text-[#0d2238]">{t}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="bg-gray-50 py-20 md:py-28 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4"><Eyebrow>Questions</Eyebrow><H2 className="text-3xl lg:text-3xl">Straight answers <Serif>before we talk.</Serif></H2></Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-gray-200">
                  <AccordionTrigger className="text-left text-[#0d2238] font-semibold hover:no-underline py-5">{q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className="bg-white pt-20 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0d2238] text-white px-6 py-14 md:px-16 md:py-20 text-center">
              {/* the card, in macro, under a navy wash */}
              <Loop name="floor-loop" poster={'/wholesale/floor-poster.jpg' + V} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d2238]/80 via-[#0d2238]/70 to-[#0d2238]/90" />
              <div className="ws-blob w-[520px] h-[520px] -top-60 -right-40 bg-[#15AFF7]/40" />
              <div className="relative">
                <h2 className="ws-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]">Stop renting your contracts. <br className="hidden sm:block" /><span className="ws-gradient-sky">Run your agency on Agora.</span></h2>
                <p className="mt-5 text-lg text-blue-100/75">Eight carriers at direct level. Your book stays yours. Release on request.</p>
                <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                  <PrimaryButton href="/wholesale/apply">Request a private partner review</PrimaryButton>
                  <a href="#calculators" className="inline-flex items-center justify-center gap-2 min-h-[54px] px-7 rounded-full font-semibold text-white border border-white/25 bg-white/5 hover:bg-white/10 transition-all"><Calculator className="w-5 h-5" /> Run the numbers again</a>
                </div>
                <p className="mt-8 text-sm text-white/50 inline-flex items-center gap-1.5">Already approved? <Link to="/wholesale/portal" className="text-white/80 hover:text-white inline-flex items-center gap-1">Partner sign in <ArrowUpRight className="w-3.5 h-3.5" /></Link></p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </WholesaleShell>
  );
};

export default Wholesale;
