import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, FileSignature, Cpu, Store, LayoutGrid, Radar, Shield, Eye, Handshake, LogIn, CheckCircle2,
} from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { VERTICALS } from '@/lib/wholesale';

const ICONS: Record<string, typeof Cpu> = {
  contracts: FileSignature,
  technology: Cpu,
  leads: Store,
  marketplace: LayoutGrid,
};

// Hero content animates on mount; everything below animates when scrolled into view.
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay },
});

const FAQ = [
  {
    q: 'Who is Agora Wholesale for?',
    a: 'Agencies that already produce: teams with producers writing business every week who want direct-level contracts, their own technology, and a lead supply they control. If you are building your first team, our Advisor program is the better fit.',
  },
  {
    q: 'Is this a contracting hierarchy?',
    a: 'No. Your carrier contracts stay yours. Agora is the visibility and resource layer: reporting, technology, leads and tools in one place. We are not trying to sit between you and your carriers.',
  },
  {
    q: 'Do you train our agents?',
    a: 'Wholesale is for shops that already know how to run an agency. You get the contracts, the systems and the supply. Training content is available in the portal as a resource, not as a requirement.',
  },
  {
    q: 'What does it cost?',
    a: 'Contract access has no platform fee. White-labeled technology is a paid build. Leads and marketplace tools are priced per item and shown in the portal before you buy anything.',
  },
  {
    q: 'What happens after I apply?',
    a: 'We review every application by hand. If your agency fits, you will hear from us to set up a call, and once approved you receive your portal login by email.',
  },
];

const Wholesale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout showContact={false}>
      <SEO
        title="Agora Wholesale: Contracts, Technology, Leads and Tools for Producing Agencies"
        description="Agora Wholesale gives established insurance agencies direct-level contracts, white-labeled technology, a transparent lead store and a tool marketplace, all in one portal. Apply for access."
        keywords={['insurance wholesale', 'IMO alternative', 'agency contracts', 'white label insurance platform', 'insurance lead store']}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d2238] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#15AFF7]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            <motion.p {...rise()} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-5">
              <Radar className="w-4 h-4" /> Agora Wholesale
            </motion.p>
            <motion.h1 {...rise(0.05)} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              Built for agencies that already produce.
            </motion.h1>
            <motion.p {...rise(0.1)} className="text-lg sm:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-2xl">
              Direct-level contracts, your own white-labeled technology, a lead store with prices you can see, and every tool your producers need in one portal. No hierarchy. No middle layer. One place to run the agency you already built.
            </motion.p>
            <motion.div {...rise(0.15)} className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/wholesale/apply"
                className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-lg bg-[#15AFF7] hover:bg-[#0D94D1] text-white font-semibold shadow-lg transition-all active:scale-95"
              >
                Apply for access <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/wholesale/portal"
                className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-lg border border-white/30 hover:bg-white/10 text-white font-semibold transition-all"
              >
                <LogIn className="mr-2 w-5 h-5" /> Partner sign in
              </Link>
            </motion.div>
            <motion.p {...rise(0.2)} className="mt-6 text-sm text-blue-200/70">
              Access is reviewed by hand. Approved agencies receive a portal login.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.div {...fade()} className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-3">Who this is for</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Real agencies. Weekly production. Producers who need resources, not pep talks.
              </h2>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                ['A team that writes every week', 'You have producers submitting business on a weekly basis and the reporting to prove it.'],
                ['An agency with its own name', 'You want your brand on the door and Agora running the engine behind it.'],
                ['Tired of the big-shop ceiling', 'You are capped at the level a national IMO is willing to give an outsider.'],
                ['Ready to own your supply', 'You want leads, tools and contracts you choose, priced where you can see them.'],
              ].map(([title, body], i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <CheckCircle2 className="w-5 h-5 text-[#15AFF7] mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The four verticals */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div {...fade()} className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-3">What you get</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">Four verticals. One portal.</h2>
            <p className="text-gray-600 text-lg">Pick what your agency needs. Everything lives behind one login and one set of reporting.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {VERTICALS.map((v, i) => {
              const Icon = ICONS[v.id];
              return (
                <motion.div
                  key={v.id}
                  {...fade(0.05 * i)}
                  className="group relative rounded-2xl bg-white border border-gray-200 p-6 md:p-8 hover:border-[#15AFF7]/60 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0d2238] text-[#15AFF7] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">0{i + 1}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{v.name}</h3>
                      <p className="text-[#0D94D1] font-medium mb-3">{v.tagline}</p>
                      <p className="text-gray-600 leading-relaxed">{v.blurb}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Agora is different */}
      <section className="bg-[#0d2238] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div {...fade()} className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-3">How Agora is different</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">We sell the tools. We are not mining for your gold.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              [Eye, 'Visibility, not hierarchy', 'Your contracts stay where they are. Agora is the reporting and resource layer that shows the whole picture in one place.'],
              [Shield, 'Direct contracts behind it', 'Our levels start where most wholesale channels stop, because there is no extra layer between Agora and the carrier.'],
              [Handshake, 'Partners get paid first', 'Tool partners, lead vendors and agencies are paid on the terms you see. No surprises on the back end.'],
            ].map(([Icon, title, body], i) => {
              const I = Icon as typeof Eye;
              return (
                <motion.div key={i} {...fade(0.05 * i)} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <I className="w-6 h-6 text-[#15AFF7] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{title as string}</h3>
                  <p className="text-blue-100/80 leading-relaxed text-sm">{body as string}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div {...fade()} className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Four steps from application to portal.</h2>
          </motion.div>
          <ol className="grid md:grid-cols-4 gap-6">
            {[
              ['Apply', 'Tell us about your agency: size, weekly production, current IMO, carriers and what you need.'],
              ['Review', 'We read every application. If the fit is right, we reach out to schedule a call.'],
              ['Approval', 'Approved agencies receive a portal invitation by email and set their password.'],
              ['Plug in', 'Contracts, technology, leads and tools are yours to pick from inside the portal.'],
            ].map(([title, body], i) => (
              <motion.li key={i} {...fade(0.05 * i)} className="relative rounded-2xl border border-gray-200 p-6">
                <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#15AFF7] text-white text-sm font-bold flex items-center justify-center shadow">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <motion.div {...fade()} className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-3">Questions</p>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">Straight answers before you apply.</h2>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f, i) => (
                  <AccordionItem key={i} value={`q${i}`} className="border-gray-200">
                    <AccordionTrigger className="text-left text-gray-900 font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div {...fade()} className="rounded-3xl bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to run your agency on Agora?</h2>
              <p className="text-blue-100">Five minutes to apply. Every application is read by a person.</p>
            </div>
            <Link
              to="/wholesale/apply"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-lg bg-white text-[#0d2238] font-semibold shadow-lg hover:bg-gray-100 transition-all active:scale-95 shrink-0"
            >
              Apply for access <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Wholesale;
