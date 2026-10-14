import { Link } from 'react-router-dom';
import { Download, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';
import { WholesaleLogo } from '@/components/wholesale/ui';

const V = '?v=3';

const COLUMNS = [
  { title: 'The story', links: [{ label: 'The ceiling', href: '#learn' }, { label: 'Visibility', href: '#reporting' }, { label: 'The platform', href: '#platform' }, { label: 'The offer', href: '#offer' }] },
  { title: 'Tools', links: [{ label: 'Calculators', href: '#calculators' }, { label: 'Wholesale 101', href: '#education' }, { label: 'Partner guide', href: '/wholesale/agora-wholesale-guide.pdf' + V }] },
  { title: 'Partners', links: [{ label: 'Apply for access', href: '/wholesale/apply' }, { label: 'Partner sign in', href: '/wholesale/portal' }, { label: 'Agora main site', href: '/' }] },
];

/** The halftone wordmark footer, with the Agora lock-up, contact and legal strip above the columns. */
const WholesaleFooter = () => (
  <HalftoneWordmarkFooter
    wordmark="wholesale"
    label="Agora Assurance Solutions"
    meta={`© ${new Date().getFullYear()} · Sacramento, CA · Licensed in all 50 states`}
    columns={COLUMNS}
    palette={{ background: '#081626', ink: '#e8f3fb', warm: '#15AFF7' }}
    fontFamily="'Bricolage Grotesque', 'Inter', system-ui, sans-serif"
    fontWeight={800}
    monoFamily="'Inter', ui-monospace, Menlo, monospace"
    dotGap={6}
    radius={90}
    crop={0.22}
    grain={0.45}
    height="640px"
    className="ws"
  >
    <div className="mx-auto px-5 sm:px-8 lg:px-11 pt-10 md:pt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      <div>
        <WholesaleLogo variant="white" size="lg" />
        <p className="ws-serif mt-5 text-2xl leading-snug text-white/90 max-w-md">Built for agencies that already produce. Sold without the middle layer.</p>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-white/65">
          <a href="mailto:info@agoraassurancesolutions.com?subject=Wholesale" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Mail className="w-4 h-4 text-[#15AFF7]" /> info@agoraassurancesolutions.com</a>
          <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-[#15AFF7]" /> 1401 21st Street, Sacramento, CA 95811</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <a href={'/wholesale/agora-wholesale-guide.pdf' + V} download="Agora-Wholesale-Partner-Guide.pdf" className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-4 py-3 hover:border-[#15AFF7]/60 transition-colors">
          <img src={'/wholesale/guide-cover.webp' + V} alt="" className="w-10 rounded shadow-lg transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-3deg]" loading="lazy" />
          <span className="text-left"><span className="block text-sm font-semibold text-white">The partner guide</span><span className="block text-xs text-white/55">Eleven pages, PDF</span></span>
          <span className="w-9 h-9 rounded-full bg-[#15AFF7] text-white flex items-center justify-center"><Download className="w-4 h-4" /></span>
        </a>
        <div className="flex items-center gap-2">
          {[
            [Linkedin, 'https://www.linkedin.com/company/agora-assurance-solutions/posts/?feedView=all', 'LinkedIn'],
            [Facebook, 'https://www.facebook.com/profile.php?id=61557048294797', 'Facebook'],
            [Instagram, 'https://www.instagram.com/agoraassurancesolutions/', 'Instagram'],
          ].map(([Icon, href, label]) => {
            const I = Icon as typeof Mail;
            return (
              <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" aria-label={label as string} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#15AFF7] hover:bg-[#15AFF7]/15 transition-all">
                <I className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
    <div className="mx-auto px-5 sm:px-8 lg:px-11 mt-6 flex items-center gap-5 text-xs text-white/45">
      <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
      <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
    </div>
  </HalftoneWordmarkFooter>
);

export default WholesaleFooter;
