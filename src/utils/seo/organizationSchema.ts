export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Agora Assurance Solutions',
  url: 'https://agora.yenomai.com',
  logo: 'https://agora.yenomai.com/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png',
  description: 'Your Independent Insurance Partner providing comprehensive life, mortgage, and annuity solutions',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@agoraassurance.com',
    availableLanguage: 'English'
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
  ]
});