import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, Cpu, Download, Eye, FileSignature, Handshake, LayoutGrid, LogIn, PlayCircle,
  Radar, Shield, Store, Sparkles, Video, Zap,
} from 'lucide-react';
import SEO from '@/components/SEO';
import WholesaleShell from '@/components/wholesale/WholesaleShell';
import {
  Beam, Counter, Eyebrow, GhostButton, GlowButton, Item, Marquee, Reveal, SpotlightCard, Stagger, Tilt, Words,
} from '@/components/wholesale/ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ data */
const VERTICALS = [
  {
    id: 'contracts', n: '01', name: 'Contracts', icon: FileSignature, img: '/wholesale/contracts.webp',
    tagline: 'Direct-contract levels without the IMO tax.',
    body: 'Agora sits on direct carrier contracts. Qualified agencies plug in at levels most wholesale channels cannot offer, because there is no middle layer taking a cut before you.',
    bullets: ['Direct-level contracts across core life, annuity and final expense carriers', 'Renewals paid on the schedule Agora is paid', 'Contracting support for new carrier appointments'],
    status: 'Available now',
  },
  {
    id: 'technology', n: '02', name: 'Technology', icon: Cpu, img: '/wholesale/technology.webp',
    tagline: 'Your agency, running on our systems.',
    body: 'Reporting, promotion tracking, gamification and agent onboarding, white-labeled to your brand. You keep your name on the door; we keep the engine running.',
    bullets: ['Agency dashboard: production, promotions, leaderboards', 'Onboarding flow from licensing to first policy', 'Your logo, your colors, your domain'],
    status: 'Build slots open',
  },
  {
    id: 'leads', n: '03', name: 'Lead Store', icon: Store, img: '/wholesale/leads.webp',
    tagline: 'Priced by Agora. Sold at cost-plus.',
    body: 'A central lead store with transparent pricing set by Agora, so your producers are never guessing what a lead is worth or where it came from.',
    bullets: ['Per-lead pricing visible before you buy', 'Source and vertical tagged on every lead', 'Outcome reporting tied back to production'],
    status: 'Coming online',
  },
  {
    id: 'marketplace', n: '04', name: 'Tool Marketplace', icon: LayoutGrid, img: '/wholesale/marketplace.webp',
    tagline: 'Every tool an agency needs, in one place.',
    body: 'Rate engines, quoting, estate and tax planning partners, and more, embedded in the portal at partner pricing. Buy through Agora and the discount is yours.',
    bullets: ['Annuity and life quoting at partner pricing', 'Estate and tax partners with shared revenue', 'One invoice, one login'],
    status: 'Partners onboarding',
  },
];

const LESSONS = [
  {
    id: 'imo', title: 'IMO vs. wholesale', icon: Shield,
    lead: 'An IMO sits between you and the carrier and keeps the spread. Wholesale means you keep the spread.',
    body: 'Most agencies live under a national IMO. The IMO holds the contract, sets your level, and keeps the difference between what the carrier pays and what you see. Agora Wholesale starts from direct contracts, so the layer that normally eats that spread is not there.',
    points: ['Your level is set by production, not by politics', 'No "pass-through" permission needed from a parent shop', 'You can still keep existing carrier relationships'],
  },
  {
    id: 'levels', title: 'What a contract level means', icon: Zap,
    lead: 'A level is the percentage of first-year premium the carrier pays out at your position.',
    body: 'A "120" means 120 percent of target premium in year one. The higher you sit, the more of every policy you keep. Levels are shown privately after approval, but the rule is public: Agora never issues wholesale contracts more than twenty points below its own direct level.',
    points: ['Levels differ by carrier and product line', 'Renewals matter as much as first-year commission', 'Overrides on your downline are yours'],
  },
  {
    id: 'whitelabel', title: 'What white-label really means', icon: Cpu,
    lead: 'Your brand on the screen, our engine underneath.',
    body: 'A white-labeled build is the Agora platform (dashboard, promotions, onboarding, reporting) with your logo, colors and domain. Your agents never see Agora. You pay for the build; the data stays in your tenant; updates ship to everyone at once.',
    points: ['Scoped and priced per agency', 'Your producers log in at your domain', 'Shared portal available without a build'],
  },
  {
    id: 'leads', title: 'How lead pricing works', icon: Store,
    lead: 'Agora sets the price. You see it before you buy. Outcomes feed back into reporting.',
    body: 'Leads are tagged by source, vertical and age, and priced at cost-plus by Agora. Because the lead store and production reporting live in the same system, you see which sources write business, not just which ones were cheap.',
    points: ['No hidden markups between vendor and producer', 'Source quality visible in your own numbers', 'Volume commitments optional, never required'],
  },
  {
    id: 'marketplace', title: 'Why a marketplace beats a bundle', icon: LayoutGrid,
    lead: 'We do not build every tool. We negotiate the price of the best ones.',
    body: 'Agora signs cost-share agreements with tool partners (quoting engines, rate watchers, estate and tax planning). Partners get volume; you get the partner price. Where a partner shares revenue on completed work, that share flows to the agency that wrote the client.',
    points: ['Use the tools you already like', 'Add partners as they come online', 'Revenue share is tracked in reporting'],
  },
  {
    id: 'reporting', title: 'The reporting layer', icon: Eye,
    lead: 'Think Pentagon, not Army. Agora sees everything in one place without running your agency.',
    body: 'Agora holds direct contracts, so Agora can see the math: production, renewals, and who owes what. Partner agencies plug into that same reporting. Carrier feeds are being connected one carrier at a time and appear in the portal as each comes online.',
    points: ['Production by carrier, agency, producer, week', 'Lead spend beside lead outcomes', 'Promotion guidelines and gamification for managers'],
  },
];

const FAQ = [
  ['Who is Agora Wholesale for?', 'Agencies that already produce: teams with producers writing business every week who want direct-level contracts, their own technology and a lead supply they control. If you are building your first team, the Advisor program is the better fit.'],
  ['Is this a contracting hierarchy?', 'No. Your carrier contracts stay yours. Agora is the visibility and resource layer: reporting, technology, leads and tools in one place.'],
  ['Do you train our agents?', 'Wholesale is for shops that already know how to run an agency. Training content is in the portal as a resource, not a requirement.'],
  ['What does it cost?', 'Contract access has no platform fee. White-labeled technology is a paid build. Leads and marketplace tools are priced per item and shown before you buy.'],
  ['What happens after I apply?', 'We review every application by hand. If your agency fits, we reach out to schedule a call, and once approved you receive your portal login by email.'],
];

const MARQUEE = ['Direct contracts', 'White-label dashboards', 'Lead store', 'Tool marketplace', 'Carrier reporting', 'Promotion tracking', 'Gamification', 'Onboarding', 'Estate planning partners', 'Training library', 'One login'];

/* Phones get the poster frame instead of an autoplaying video: lighter on data,
   battery and the main thread. Larger screens get the loop. */
const Loop = ({ name, className, poster }: { name: string; className?: string; poster: string }) => {
  const isMobile = useIsMobile();
  if (isMobile) return <img src={poster} alt="" className={className} aria-hidden="true" />;
  return (
    <video className={className} autoPlay muted loop playsInline poster={poster} aria-hidden="true">
      <source src={`/wholesale/${name}.webm`} type="video/webm" />
      <source src={`/wholesale/${name}.mp4`} type="video/mp4" />
    </video>
  );
};

/* ------------------------------------------------------------------ page */
const Wholesale = () => {
  const [lesson, setLesson] = useState(LESSONS[0].id);
  const L = LESSONS.find((l) => l.id === lesson)!;

  return (
    <WholesaleShell>
      <SEO
        title="Agora Wholesale: Contracts, Technology, Leads and Tools for Producing Agencies"
        description="Agora Wholesale gives established insurance agencies direct-level contracts, white-labeled technology, a transparent lead store and a tool marketplace, all in one portal. Learn how it works and apply for access."
        keywords={['insurance wholesale', 'IMO alternative', 'agency contracts', 'white label insurance platform', 'insurance lead store']}
      />

      {/* ============================== HERO ============================== */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden ws-noise">
        <Loop name="hero-loop" poster="/wholesale/hero-poster.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081626]/70 via-[#081626]/40 to-[#081626]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(21,175,247,.18),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-16 md:pb-24 w-full">
          <div className="ws-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-white/80 mb-7">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#15AFF7] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#15AFF7]" /></span>
            Now accepting partner applications
          </div>

          <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.4rem] font-bold tracking-[-0.02em] max-w-5xl">
            <Words text="Built for agencies" />
            <br />
            <Words text="that already produce." delay={0.25} wordClassName="text-[#15AFF7]" />
          </h1>

          <p className="ws-rise mt-7 max-w-2xl text-lg sm:text-xl text-blue-100/85 leading-relaxed" style={{ ['--d' as string]: '0.5s' }}>
            Direct-level contracts. Your own white-labeled technology. A lead store with prices you can see. Every tool your producers need, behind one login. No hierarchy. No middle layer.
          </p>

          <div className="ws-rise mt-9 flex flex-col sm:flex-row gap-3" style={{ ['--d' as string]: '0.65s' }}>
            <GlowButton href="/wholesale/apply">Apply for access <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" /></GlowButton>
            <GhostButton href="#learn"><PlayCircle className="w-5 h-5" /> See how it works</GhostButton>
            <Link to="/wholesale/portal" className="inline-flex items-center justify-center gap-2 min-h-[52px] px-4 text-white/60 hover:text-white text-sm font-medium"><LogIn className="w-4 h-4" /> Partner sign in</Link>
          </div>

          <div style={{ ['--d' as string]: '0.9s' }} className="ws-rise mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10 max-w-4xl">
            {[
              [4, '', 'verticals, one portal'],
              [0, '', 'middle layers between you and the carrier'],
              [1, '', 'login for contracts, tech, leads and tools'],
              [50, '', 'states served, nationwide carriers'],
            ].map(([n, sfx, label], i) => (
              <div key={i} className="bg-[#081626]/80 backdrop-blur px-5 py-5">
                <div className="text-3xl md:text-4xl font-bold text-white"><Counter to={n as number} suffix={sfx as string} /></div>
                <div className="mt-1 text-xs text-white/55 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== MARQUEE ============================== */}
      <section className="border-y border-white/10 bg-[#081626] py-5">
        <Marquee
          speed={46}
          items={MARQUEE.map((w) => (
            <span className="inline-flex items-center gap-3 text-sm font-medium text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15AFF7]" /> {w}
            </span>
          ))}
        />
      </section>

      {/* ============================== WHAT IT IS ============================== */}
      <section id="learn" className="relative bg-[#081626] py-20 md:py-28 ws-grid">
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_20%_20%,rgba(21,175,247,.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal dir="right">
                          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-30px_rgba(21,175,247,.45)]">
                <Loop name="floor-loop" poster="/wholesale/floor-poster.jpg" className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081626]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-3 py-1.5 text-xs text-white/80"><Video className="w-3.5 h-3.5 text-[#15AFF7]" /> A real agency floor. Your reporting, our engine.</span>
                </div>
              </div>
            </Reveal>
          <div>
            <Reveal><Eyebrow light>What Agora Wholesale is</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">The Pentagon, not the Army.</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg text-blue-100/80 leading-relaxed">
                The Pentagon does not command the Army, the Navy or the Air Force. It sees all of them in one place. That is the job Agora plays for partner agencies: every carrier, every lead dollar, every tool, visible in one reporting layer, while your contracts and your people stay yours.
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-3">
              {[
                [Eye, 'Visibility, not hierarchy', 'Your contracts stay where they are. Agora is the layer that shows the whole picture.'],
                [Shield, 'Direct contracts behind it', 'Our levels start where most wholesale channels stop, because there is no extra layer between Agora and the carrier.'],
                [Handshake, 'Partners get paid first', 'Tool partners, lead vendors and agencies are paid on the terms you see. No surprises on the back end.'],
              ].map(([Icon, t, d], i) => {
                const I = Icon as typeof Eye;
                return (
                  <Item key={i}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#15AFF7]/15 text-[#15AFF7] flex items-center justify-center"><I className="w-5 h-5" /></div>
                      <div><p className="font-semibold">{t as string}</p><p className="text-sm text-white/60 leading-relaxed">{d as string}</p></div>
                    </div>
                  </Item>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ============================== VERTICALS (bento) ============================== */}
      <section id="verticals" className="relative bg-[#0b1d31] py-20 md:py-28 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow light>What you get</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">Four verticals. One portal. <span className="text-[#15AFF7]">True access.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-lg text-blue-100/75">Pick what your agency needs. Everything lives behind one login and one set of reporting, and more comes online every month.</p></Reveal>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {VERTICALS.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.id} delay={0.06 * i} dir={i % 2 ? 'left' : 'right'}>
                  <SpotlightCard className="h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={v.img} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d31] via-transparent to-transparent" />
                      <span className={cn('absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur', v.status === 'Available now' ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-300/30' : 'bg-[#15AFF7]/20 text-[#bfe6ff] border border-[#15AFF7]/40')}>
                        <Sparkles className="w-3 h-3" /> {v.status}
                      </span>
                      <span className="absolute top-4 right-4 text-5xl font-bold text-white/10">{v.n}</span>
                    </div>
                    <div className="p-6 md:p-7 -mt-6 relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#15AFF7] text-white flex items-center justify-center shadow-[0_8px_30px_-8px_#15AFF7]"><Icon className="w-5 h-5" /></div>
                        <h3 className="text-2xl font-bold">{v.name}</h3>
                      </div>
                      <p className="text-[#bfe6ff] font-medium mb-2">{v.tagline}</p>
                      <p className="text-white/65 leading-relaxed">{v.body}</p>
                      <ul className="mt-5 space-y-2">
                        {v.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-white/80"><Check className="w-4 h-4 text-[#15AFF7] mt-0.5 shrink-0" /> {b}</li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== REPORTING ============================== */}
      <section id="reporting" className="relative bg-[#081626] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wholesale/reporting.webp" alt="" className="w-full h-full object-cover opacity-40" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081626] via-[#081626]/85 to-[#081626]/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <Reveal><Eyebrow light>The reporting layer</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">See the whole board. Every carrier, every dollar, one screen.</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-blue-100/80 leading-relaxed">Agora holds direct contracts, so Agora can see the math: production, renewals and who owes what. Partner agencies plug into that same reporting. No more reconciling five carrier statements by hand.</p></Reveal>
            <Stagger className="mt-8 grid sm:grid-cols-2 gap-3">
              {['Production by carrier, agency, producer, week', 'Lead spend beside lead outcomes', 'Marketplace and partner revenue', 'Promotion guidelines and gamification'].map((t) => (
                <Item key={t}><div className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3 text-sm text-white/85 flex items-center gap-2"><Radar className="w-4 h-4 text-[#15AFF7] shrink-0" />{t}</div></Item>
              ))}
            </Stagger>
            <Reveal delay={0.2}><p className="mt-6 text-xs text-white/45">Carrier feeds connect one carrier at a time and appear in the portal as each comes online.</p></Reveal>
          </div>
        </div>
      </section>

      {/* ============================== EDUCATION ============================== */}
      <section id="education" className="bg-[#0b1d31] py-20 md:py-28 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow light>Wholesale 101</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">Learn the game before you change it.</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-lg text-blue-100/75">Six short explainers on how wholesale actually works. No jargon, no sales deck.</p></Reveal>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-6">
            <Reveal dir="right" className="lg:col-span-4 min-w-0">
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 max-w-[100vw] lg:max-w-none">
                {LESSONS.map((l) => {
                  const I = l.icon;
                  const on = l.id === lesson;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLesson(l.id)}
                      className={cn('shrink-0 lg:shrink text-left flex items-center gap-3 rounded-2xl border px-4 py-3.5 min-h-[56px] transition-all', on ? 'border-[#15AFF7]/60 bg-[#15AFF7]/10 text-white' : 'border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/25')}
                    >
                      <I className={cn('w-5 h-5 shrink-0', on ? 'text-[#15AFF7]' : 'text-white/40')} />
                      <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">{l.title}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
            <div className="lg:col-span-8 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={L.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.6, 0.2, 1] }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-10 h-full"
                >
                  <p className="text-xl md:text-2xl font-semibold leading-snug text-white">{L.lead}</p>
                  <p className="mt-5 text-white/70 leading-relaxed">{L.body}</p>
                  <ul className="mt-7 grid sm:grid-cols-3 gap-3">
                    {L.points.map((p) => (
                      <li key={p} className="rounded-xl border border-white/10 bg-[#081626]/60 px-4 py-3 text-sm text-white/80 flex gap-2"><Check className="w-4 h-4 text-[#15AFF7] mt-0.5 shrink-0" />{p}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== GUIDE + RESOURCES ============================== */}
      <section id="guide" className="relative bg-[#081626] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_50%,rgba(21,175,247,.14),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal><Eyebrow light>The partner guide</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">Everything on this page, in a PDF you can hand to your partners.</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg text-blue-100/80 leading-relaxed">Eleven pages. What Agora Wholesale is, who it is for, the four verticals, the reporting layer, how to qualify, and what happens after you apply.</p></Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <GlowButton href="/wholesale/agora-wholesale-guide.pdf" download="Agora-Wholesale-Partner-Guide.pdf"><Download className="w-5 h-5" /> Download the guide</GlowButton>
                <GhostButton href="/wholesale/agora-wholesale-guide.pdf" target="_blank" rel="noopener noreferrer"><BookOpen className="w-5 h-5" /> Read it in the browser</GhostButton>
              </div>
            </Reveal>
            <Stagger className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                ['Training library', 'New sessions are being filmed now and land in the portal as they are cut.', '/wholesale/studio.webp'],
                ['Portal resources', 'Links, documents and videos organized by vertical, added by your Agora contact.', '/wholesale/technology.webp'],
              ].map(([t, d, img]) => (
                <Item key={t}>
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                    <div className="aspect-[16/8] overflow-hidden"><img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
                    <div className="p-4"><p className="font-semibold">{t}</p><p className="text-sm text-white/60">{d}</p></div>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
          <Reveal dir="left" className="flex justify-center lg:justify-end">
            <Tilt max={10}>
              <a href="/wholesale/agora-wholesale-guide.pdf" download="Agora-Wholesale-Partner-Guide.pdf" className="block ws-float">
                <img src="/wholesale/guide-cover.webp" alt="The Agora Wholesale partner guide" className="w-[300px] sm:w-[360px] rounded-2xl shadow-[0_50px_120px_-30px_rgba(21,175,247,.6)] border border-white/10" loading="lazy" />
              </a>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ============================== WHO + HOW ============================== */}
      <section className="bg-[#0b1d31] py-20 md:py-28 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal dir="right" className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <img src="/wholesale/owner.webp" alt="An agency owner in her office" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d31] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm text-white/70">Wholesale is for the people who already run the floor.</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><Eyebrow light>Who this is for</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.08]">Real agencies. Weekly production. Producers who need resources, not pep talks.</h2></Reveal>
            <Stagger className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                ['A team that writes every week', 'You have producers submitting business weekly and the reporting to prove it.'],
                ['An agency with its own name', 'You want your brand on the door and Agora running the engine behind it.'],
                ['Tired of the big-shop ceiling', 'You are capped at the level a national IMO gives an outsider.'],
                ['Ready to own your supply', 'You want leads, tools and contracts you choose, priced where you can see them.'],
              ].map(([t, d]) => (
                <Item key={t}><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 h-full"><Check className="w-5 h-5 text-[#15AFF7] mb-2" /><p className="font-semibold">{t}</p><p className="text-sm text-white/60 leading-relaxed">{d}</p></div></Item>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-12"><Eyebrow light>How it works</Eyebrow></Reveal>
            <ol className="mt-5 relative border-l border-white/10 pl-6 space-y-6">
              {[
                ['Apply', 'Five minutes: agency size, weekly production, current IMO, carriers, and which verticals you want.'],
                ['Review', 'A person reads every application. If the fit is right, we reach out to schedule a call.'],
                ['Approval', 'Approved agencies get a portal invitation by email and set a password.'],
                ['Plug in', 'Contracts, technology, leads and tools are yours to pick from inside the portal.'],
              ].map(([t, d], i) => (
                <Reveal key={t} as="li" delay={0.08 * i} dir="right" className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#15AFF7] text-[#081626] text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_4px_#0b1d31]">{i + 1}</span>
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="bg-[#081626] py-20 md:py-28 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <Eyebrow light>Questions</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight leading-[1.08]">Straight answers before you apply.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white font-semibold hover:no-underline py-5">{q}</AccordionTrigger>
                  <AccordionContent className="text-white/65 leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className="relative bg-[#081626] pb-24 pt-4 overflow-hidden">
        <Beam className="mb-20" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Ready to run your agency <span className="bg-gradient-to-r from-[#15AFF7] to-[#bfe6ff] bg-clip-text text-transparent">on Agora?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg text-blue-100/75">Five minutes to apply. Every application is read by a person.</p></Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <GlowButton href="/wholesale/apply">Apply for access <ArrowRight className="w-5 h-5" /></GlowButton>
              <GhostButton href="/wholesale/agora-wholesale-guide.pdf" download="Agora-Wholesale-Partner-Guide.pdf"><Download className="w-5 h-5" /> Get the guide</GhostButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-white/40 inline-flex items-center gap-1.5">Already approved? <Link to="/wholesale/portal" className="text-white/70 hover:text-white inline-flex items-center gap-1">Partner sign in <ArrowUpRight className="w-3.5 h-3.5" /></Link></p>
          </Reveal>
        </div>
      </section>
    </WholesaleShell>
  );
};

export default Wholesale;
