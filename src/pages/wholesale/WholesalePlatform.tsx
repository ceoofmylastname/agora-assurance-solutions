/* /wholesale/platform: the deep dive that used to sit inside the pitch.
   The main page sells the terms; this page shows the reporting layer, the
   tools behind it and the order they ship in. */
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Handshake, Radar, Shield } from 'lucide-react';
import SEO from '@/components/SEO';
import WholesaleShell from '@/components/wholesale/WholesaleShell';
import Platform from '@/components/wholesale/Platform';
import Roadmap from '@/components/wholesale/Roadmap';
import { Eyebrow, Item, Letters, PrimaryButton, Reveal, Stagger, Tilt } from '@/components/wholesale/ui';

const V = '?v=3';

const WholesalePlatform = () => (
  <WholesaleShell>
    <SEO
      title="The Agora Wholesale Platform: Carrier Reporting, Promotions, Underwriting AI"
      description="The reporting layer behind every Agora Wholesale partner agency: live carrier data, promotion tracking, recruiting pipeline, underwriting assistant, field pre-qual and automation."
    />

    {/* the visibility layer */}
    <section className="relative bg-white pt-10 md:pt-16 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 ws-grid-light pointer-events-none [mask-image:linear-gradient(180deg,#000,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/wholesale" className="inline-flex items-center text-sm text-gray-500 hover:text-[#0d2238] mb-8"><ArrowLeft className="mr-2 w-4 h-4" /> Agora Wholesale</Link>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>The platform</Eyebrow>
            <h1 className="ws-display mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.0] text-[#0d2238]">
              <Letters text="The Pentagon does not command the Army." />{' '}
              <span className="ws-serif text-[1.08em] text-[#0D94D1]">It sees everything.</span>
            </h1>
            <p className="ws-rise mt-6 text-lg text-gray-600 leading-relaxed" style={{ '--d': '.6s' } as React.CSSProperties}>
              That is Agora. Production, renewals and who owes what, across every carrier, on one screen. Partner agencies plug into the same reporting layer. Your people stay yours. Your book stays yours.
            </p>
            <Stagger className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                [Eye, 'Visibility, not hierarchy', 'The layer that shows the whole board.'],
                [Shield, 'Direct contracts behind it', 'Levels start where most channels stop.'],
                [Radar, 'One screen', 'Production by carrier, agency, producer, week.'],
                [Handshake, 'Partners paid first', 'Terms you can see. No back-end surprises.'],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Eye;
                return (
                  <Item key={t as string}>
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 h-full">
                      <I className="w-5 h-5 text-[#15AFF7] mb-2" />
                      <p className="font-semibold text-[#0d2238]">{t as string}</p>
                      <p className="text-sm text-gray-600">{d as string}</p>
                    </div>
                  </Item>
                );
              })}
            </Stagger>
          </div>
          <Reveal dir="left" className="lg:col-span-6">
            <Tilt max={6}>
              <div className="rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-[0_30px_80px_-30px_rgba(21,175,247,.4)] bg-white">
                <img src={'/wholesale/reporting.webp' + V} alt="" className="w-full aspect-[16/10] object-cover" />
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>

    <Platform />
    <Roadmap />

    <section className="bg-white pt-10 pb-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="ws-display text-3xl sm:text-4xl font-bold text-[#0d2238]">The platform comes with the contract.</h2>
        <p className="mt-4 text-lg text-gray-600">Partner agencies get the portal at no platform fee. White-labeled builds are scoped per agency.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryButton href="/wholesale/apply">Request a private partner review</PrimaryButton>
          <a href="/wholesale#offer" className="inline-flex items-center justify-center min-h-[54px] px-7 rounded-full font-semibold text-[#0d2238] border border-[#0d2238]/15 bg-white hover:border-[#0d2238] transition-colors">See the terms</a>
        </div>
      </div>
    </section>
  </WholesaleShell>
);

export default WholesalePlatform;
