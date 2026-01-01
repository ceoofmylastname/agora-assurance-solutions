
export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Agora Assurance Solutions',
  url: 'https://agoraassurancesolutions.com',
  logo: 'https://agoraassurancesolutions.com/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png',
  description: 'Your Independent Insurance Partner providing comprehensive life, mortgage, and annuity solutions',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+1-916-848-7907',
    email: 'info@agoraassurance.com',
    availableLanguage: 'English'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'Multiple States'
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'United States'
    }
  ],
  serviceType: [
    'Life Insurance',
    'Mortgage Protection',
    'Final Expense Insurance',
    'Annuities',
    'Tax & Asset Protection'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2500',
    bestRating: '5',
    worstRating: '1'
  },
  priceRange: '$$'
});
