
import { createMainFAQSchema } from './schemas/mainFAQSchema';
import { createProductComparisonFAQSchema } from './schemas/productComparisonFAQSchema';
import { createGeoSpecificFAQSchema } from './schemas/geoSpecificFAQSchema';
import { createInsuranceSpecificFAQSchema } from './schemas/insuranceSpecificFAQSchema';
import { createVoiceSearchFAQSchema } from './schemas/voiceSearchFAQSchema';
import { 
  createTermLifeFAQSchema, 
  createFinalExpenseFAQSchema, 
  createAnnuitiesFAQSchema 
} from './schemas/serviceFAQSchemas';

// Create comprehensive FAQ schema that combines all categories
export const createDedicatedFAQPageSchema = () => {
  const mainFAQ = createMainFAQSchema();
  const comparisonFAQ = createProductComparisonFAQSchema();
  const geoFAQ = createGeoSpecificFAQSchema();
  const insuranceSpecificFAQ = createInsuranceSpecificFAQSchema();
  const voiceSearchFAQ = createVoiceSearchFAQSchema();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...mainFAQ.mainEntity,
      ...comparisonFAQ.mainEntity,
      ...geoFAQ.mainEntity,
      ...insuranceSpecificFAQ.mainEntity,
      ...voiceSearchFAQ.mainEntity
    ]
  };
};

// Enhanced service-specific FAQ schemas
export { createTermLifeFAQSchema, createFinalExpenseFAQSchema, createAnnuitiesFAQSchema };

// Individual schema exports for flexibility
export { 
  createMainFAQSchema,
  createProductComparisonFAQSchema,
  createGeoSpecificFAQSchema,
  createInsuranceSpecificFAQSchema,
  createVoiceSearchFAQSchema
};

export const getServiceSpecificFAQSchema = (pathname: string) => {
  if (pathname.includes('term-life')) {
    return createTermLifeFAQSchema();
  }
  if (pathname.includes('final-expense')) {
    return createFinalExpenseFAQSchema();
  }
  if (pathname.includes('annuities')) {
    return createAnnuitiesFAQSchema();
  }
  if (pathname === '/faq') {
    return createDedicatedFAQPageSchema();
  }
  return null;
};
