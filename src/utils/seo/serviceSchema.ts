
export interface ServiceOffering {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
  priceRange?: string;
}

export const createServiceSchema = (service: ServiceOffering) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: service.provider,
    url: 'https://agoraassurancesolutions.com'
  },
  areaServed: service.areaServed.map(area => ({
    '@type': 'Place',
    name: area
  })),
  serviceType: service.serviceType,
  priceRange: service.priceRange || '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '500'
  }
});

export const createFinancialProductSchema = (
  productName: string,
  category: string,
  description: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: productName,
  category,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Agora Assurance Solutions',
    url: 'https://agoraassurancesolutions.com'
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD'
    }
  }
});

// Pre-configured insurance service schemas
export const getLifeInsuranceServiceSchema = () => createServiceSchema({
  name: 'Life Insurance Services',
  description: 'Comprehensive life insurance solutions including term life, whole life, and universal life policies.',
  provider: 'Agora Assurance Solutions',
  areaServed: ['United States'],
  serviceType: 'Life Insurance'
});

export const getAnnuitiesServiceSchema = () => createServiceSchema({
  name: 'Annuity Services',
  description: 'Fixed, variable, and indexed annuities for retirement planning and income protection.',
  provider: 'Agora Assurance Solutions',
  areaServed: ['United States'],
  serviceType: 'Annuities'
});

export const getMortgageProtectionServiceSchema = () => createServiceSchema({
  name: 'Mortgage Protection Insurance',
  description: 'Specialized life insurance to protect your family\'s home and mortgage payments.',
  provider: 'Agora Assurance Solutions',
  areaServed: ['United States'],
  serviceType: 'Mortgage Protection'
});
