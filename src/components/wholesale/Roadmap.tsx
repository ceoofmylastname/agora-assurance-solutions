/* "The road ahead": a pinned horizontal timeline of what comes online, in
   phases rather than dates, so the page hypes the build without promising a
   calendar. */
import Timeline, { type TimelineItem } from '@/components/ui/timeline';
import { Eyebrow, Reveal } from '@/components/wholesale/ui';

const V = '?v=3';

const ITEMS: TimelineItem[] = [
  { id: 'p1', label: 'Phase one · Now', content: 'Direct-level contracts, the partner portal, the guide, and the first carrier feeds.', row: 'top' },
  { id: 'p2', label: 'Phase two', content: 'ExamFX sync: logins, practice scores and expirations on the recruiting board.', row: 'bottom' },
  { id: 'p3', label: 'Phase three', content: 'Promotion engine checks your comp plan nightly and announces every promotion.', row: 'top' },
  { id: 'p4', label: 'Phase four', content: 'Underwriting assistant and field pre-qual, built on every carrier guide.', row: 'bottom' },
  { id: 'p5', label: 'Phase five', content: 'The lead store opens with Agora pricing and outcome reporting.', row: 'top' },
  { id: 'p6', label: 'Phase six', content: 'Marketplace partners, Market Pulse, and white-label builds for partner agencies.', row: 'bottom' },
];

const Roadmap = () => (
  <>
    <section className="bg-white pt-20 md:pt-28 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>The road ahead</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="ws-display mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.04] text-[#0d2238]">Six phases. <span className="ws-serif text-[1.12em] text-[#0D94D1]">One horizontal scroll.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-4 text-lg text-gray-600">Keep scrolling. The track slides sideways and each phase draws itself in as it reaches centre. Partners see each piece land in the portal the week it goes live.</p></Reveal>
        </div>
      </div>
    </section>
    <Timeline
      id="roadmap"
      title="The build, in order"
      periodLabel="Phase one → six"
      items={ITEMS}
      imageUrl={'/wholesale/platform-streams.webp' + V}
      imageAlt="Data streams converging"
      duration={1.4}
    />
  </>
);

export default Roadmap;
