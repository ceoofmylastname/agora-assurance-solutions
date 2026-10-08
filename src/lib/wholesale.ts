// Shared vocabulary for the Wholesale program: the four verticals, the
// qualification buckets, and the carrier list the application form offers.

export type Vertical = 'contracts' | 'technology' | 'leads' | 'marketplace';
export type ResourceVertical = Vertical | 'training' | 'general';

export const VERTICALS: { id: Vertical; name: string; tagline: string; blurb: string }[] = [
  {
    id: 'contracts',
    name: 'Contracts',
    tagline: 'Direct-contract levels without the IMO tax.',
    blurb:
      'Agora sits on direct carrier contracts. Qualified agencies plug in at levels most wholesale channels cannot offer, because there is no middle layer taking a cut before you.',
  },
  {
    id: 'technology',
    name: 'Technology',
    tagline: 'Your agency, running on our systems.',
    blurb:
      'Reporting, promotion tracking, gamification, and agent onboarding, white-labeled to your brand. You keep your name on the door; we keep the engine running.',
  },
  {
    id: 'leads',
    name: 'Lead Store',
    tagline: 'Priced by Agora. Sold at cost-plus.',
    blurb:
      'A central lead store with transparent pricing set by Agora, so your producers are never guessing what a lead is worth or where it came from.',
  },
  {
    id: 'marketplace',
    name: 'Tool Marketplace',
    tagline: 'Every tool an agency needs, in one place.',
    blurb:
      'Rate engines, quoting, estate and tax planning partners, and more, embedded in the portal at partner pricing. Buy through Agora and the discount is yours.',
  },
];

export const AGENCY_SIZES: { value: string; label: string }[] = [
  { value: '1-9', label: '1 to 9 producers' },
  { value: '10-24', label: '10 to 24 producers' },
  { value: '25-49', label: '25 to 49 producers' },
  { value: '50-99', label: '50 to 99 producers' },
  { value: '100-249', label: '100 to 249 producers' },
  { value: '250+', label: '250 or more producers' },
];

export const WEEKLY_PRODUCTION: { value: string; label: string }[] = [
  { value: 'under_10k', label: 'Under $10,000 / week' },
  { value: '10k_25k', label: '$10,000 to $25,000 / week' },
  { value: '25k_50k', label: '$25,000 to $50,000 / week' },
  { value: '50k_100k', label: '$50,000 to $100,000 / week' },
  { value: '100k_250k', label: '$100,000 to $250,000 / week' },
  { value: '250k_plus', label: '$250,000+ / week' },
];

export const CARRIERS: string[] = [
  'North American',
  'National Life Group',
  'F&G',
  'Mutual of Omaha',
  'Americo',
  'Transamerica',
  'Foresters',
  'Athene',
  'Allianz',
  'Nationwide',
  'Corebridge (AIG)',
  'John Hancock',
  'Lincoln Financial',
  'Prudential',
  'Protective',
  'American Equity',
  'Aetna / CVS',
  'Gerber Life',
];

export const US_STATES: string[] = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

export const APPLICATION_STATUSES = ['new', 'reviewing', 'approved', 'declined'] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const RESOURCE_VERTICALS: { id: ResourceVertical; name: string }[] = [
  ...VERTICALS.map((v) => ({ id: v.id as ResourceVertical, name: v.name })),
  { id: 'training', name: 'Training' },
  { id: 'general', name: 'General' },
];

export const labelFor = (list: { value: string; label: string }[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value;

export const verticalName = (id: string) =>
  RESOURCE_VERTICALS.find((v) => v.id === id)?.name ?? id;
