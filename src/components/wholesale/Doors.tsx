/* The four doors, as glass folders you can open. Brand-coloured generated art
   on the back panels, the real contents of each door as files. */
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder-cards';
import { useIsMobile } from '@/hooks/use-mobile';

const SKY: ArtRecipe = { style: 'streak', colors: ['#f6fbff', '#bfe6ff', '#15AFF7', '#0D94D1', '#0d2238', '#6fd0ff', '#eaf6ff'], scale: 0.7, warp: 1.4, angle: -0.6, gloss: 0.22, veins: 0 };
const NAVY: ArtRecipe = { style: 'marble', colors: ['#081626', '#0d2238', '#143a5e', '#0D94D1', '#15AFF7', '#bfe6ff', '#f6fbff'], scale: 0.66, warp: 3.2, angle: 0.8, gloss: 0.5, veins: 0.4 };
const ICE: ArtRecipe = { style: 'streak', colors: ['#ffffff', '#e6f3fc', '#bfe6ff', '#8fd3ff', '#dbeefc', '#ffffff'], scale: 0.7, warp: 1.6, angle: 0.35, gloss: 0.25, veins: 0 };
const DEEP: ArtRecipe = { style: 'marble', colors: ['#06101c', '#0d2238', '#0D94D1', '#0d2238', '#15AFF7', '#6fd0ff', '#eaf6ff'], scale: 0.72, warp: 3.6, angle: 2.1, gloss: 0.5, veins: 0.5 };

const DOORS: { label: string; meta: string; art: ArtRecipe; tone: 'light' | 'dark'; files: FolderFile[]; place: 'bottom-left' | 'top-left' | 'top-right' }[] = [
  {
    label: 'Contracts', meta: 'No platform fee', art: SKY, tone: 'light', place: 'bottom-left',
    files: [
      { name: 'Carrier grid', meta: 'Private · after approval', art: NAVY },
      { name: 'Appointment kit', meta: 'PDF · per carrier' },
      { name: 'Transfer letter', meta: 'DOCX · template' },
    ],
  },
  {
    label: 'Technology', meta: 'Scoped per agency', art: NAVY, tone: 'dark', place: 'top-left',
    files: [
      { name: 'Agency dashboard', meta: 'Live preview', art: SKY },
      { name: 'Onboarding flow', meta: 'Licensing → first policy' },
      { name: 'White-label spec', meta: 'PDF · 6 pages' },
    ],
  },
  {
    label: 'Lead store', meta: 'Priced before you buy', art: ICE, tone: 'light', place: 'top-right',
    files: [
      { name: 'Price sheet', meta: 'Updated weekly' },
      { name: 'Source tags', meta: 'By vertical', art: DEEP },
      { name: 'Outcome report', meta: 'Tied to production' },
    ],
  },
  {
    label: 'Marketplace', meta: 'Partner pricing', art: DEEP, tone: 'dark', place: 'bottom-left',
    files: [
      { name: 'Quoting tools', meta: 'Life · annuity' },
      { name: 'Estate partner', meta: 'Shared revenue', art: ICE },
      { name: 'Partner pricing', meta: 'One invoice' },
    ],
  },
];

const Doors = () => {
  const isMobile = useIsMobile();
  const width = isMobile ? 300 : 290;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 justify-items-center">
      {DOORS.map((d, i) => (
        <GlassFolder
          key={d.label}
          label={d.label}
          meta={d.meta}
          art={d.art}
          tone={d.tone}
          seed={3 + i * 4}
          files={d.files}
          action="none"
          labelPlacement={d.place}
          appearDelay={i * 140}
          width={width}
        />
      ))}
    </div>
  );
};

export default Doors;
