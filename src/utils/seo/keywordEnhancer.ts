
// Enhanced keyword categories for comprehensive SEO coverage
const geoSpecificKeywords = [
  'California life insurance', 'Texas annuity rates', 'Florida final expense insurance',
  'New York mortgage protection', 'Arizona retirement planning', 'Nevada tax solutions',
  'Georgia life insurance quotes', 'North Carolina insurance advisors',
  'Colorado mortgage insurance', 'Washington state annuities',
  'insurance near me', 'local insurance agent', 'financial advisor in my area'
];

const comparisonKeywords = [
  'compare life insurance quotes', 'term vs whole life insurance',
  'best insurance companies comparison', 'annuity vs 401k',
  'mortgage protection vs life insurance', 'fixed vs variable annuities',
  'insurance rate comparison', 'best insurance deals',
  'cheapest life insurance options', 'top rated insurance providers'
];

const voiceSearchKeywords = [
  'what is the best life insurance for seniors',
  'how much life insurance do I need calculator',
  'where can I get cheap life insurance',
  'what are the best annuity rates today',
  'how to choose the right insurance policy',
  'what is mortgage protection insurance',
  'how do I save for retirement effectively',
  'where to find reliable financial advisor near me',
  'what insurance do I need for my family',
  'how to get instant insurance quotes'
];

const longTailKeywords = [
  'affordable life insurance for young families',
  'no medical exam life insurance options',
  'senior citizen final expense insurance',
  'small business owner insurance needs',
  'retirement income planning strategies',
  'tax-free retirement savings options',
  'mortgage payoff insurance benefits',
  'guaranteed acceptance life insurance',
  'high net worth asset protection',
  'estate planning insurance solutions'
];

export const enhanceKeywordsForPath = (pathname: string, baseKeywords: string[]): string[] => {
  let enhancedKeywords = [...baseKeywords];

  // Add geo-specific keywords to all pages
  enhancedKeywords.push(...geoSpecificKeywords.slice(0, 5));
  
  // Add voice search keywords to all pages
  enhancedKeywords.push(...voiceSearchKeywords.slice(0, 3));

  if (pathname.includes('life-insurance') || pathname.includes('term-life')) {
    enhancedKeywords.push(
      ...baseKeywords,
      'term life insurance quotes',
      'whole life insurance',
      'universal life insurance',
      'life insurance quotes online',
      'family protection insurance',
      'income replacement insurance',
      'death benefit coverage',
      'life insurance cost calculator',
      'best life insurance companies',
      'no exam life insurance',
      'compare term life insurance',
      'what is the cheapest life insurance',
      'how much life insurance do I need',
      'life insurance for young adults',
      'California term life insurance',
      'Texas life insurance rates',
      'Florida life insurance companies'
    );
  }
  
  if (pathname.includes('mortgage-protection')) {
    enhancedKeywords.push(
      ...baseKeywords,
      'mortgage protection insurance',
      'home loan protection',
      'mortgage life insurance',
      'mortgage payoff insurance',
      'homeowners protection',
      'family home security',
      'mortgage insurance vs life insurance',
      'best mortgage protection plans',
      'mortgage protection cost',
      'how does mortgage protection work',
      'mortgage protection insurance rates',
      'compare mortgage protection quotes'
    );
  }
  
  if (pathname.includes('final-expense')) {
    enhancedKeywords.push(
      ...baseKeywords,
      'final expense insurance',
      'burial insurance',
      'funeral insurance',
      'senior life insurance',
      'guaranteed acceptance insurance',
      'no medical exam insurance',
      'funeral cost coverage',
      'burial expense insurance',
      'what is final expense insurance',
      'final expense insurance cost',
      'senior citizen insurance options',
      'burial insurance for seniors'
    );
  }
  
  if (pathname.includes('annuities')) {
    enhancedKeywords.push(
      ...baseKeywords,
      'retirement annuities',
      'fixed annuities',
      'variable annuities',
      'indexed annuities',
      'retirement income planning',
      'pension alternatives',
      'guaranteed retirement income',
      'retirement planning strategies',
      'annuity vs 401k comparison',
      'best annuity rates',
      'how do annuities work',
      'retirement income solutions',
      'tax-deferred retirement savings'
    );
  }

  if (pathname.includes('whole-life')) {
    enhancedKeywords.push(
      'whole life insurance benefits',
      'cash value life insurance',
      'permanent life insurance',
      'whole life vs term comparison',
      'whole life insurance rates',
      'best whole life policies'
    );
  }

  if (pathname.includes('universal-life')) {
    enhancedKeywords.push(
      'universal life insurance',
      'flexible premium life insurance',
      'UL insurance benefits',
      'universal life vs whole life'
    );
  }

  if (pathname.includes('indexed-universal-life')) {
    enhancedKeywords.push(
      'indexed universal life insurance',
      'IUL retirement planning',
      'tax-free retirement income',
      'market-linked life insurance'
    );
  }

  // Add comparison keywords for relevant pages
  if (pathname.includes('compare') || pathname.includes('quote') || pathname === '/') {
    enhancedKeywords.push(...comparisonKeywords.slice(0, 6));
  }

  // Add long-tail keywords for service pages
  if (pathname.includes('services/')) {
    enhancedKeywords.push(...longTailKeywords.slice(0, 4));
  }

  // Remove duplicates and return
  return [...new Set(enhancedKeywords)];
};

// Enhanced geo-specific keyword generator
export const getGeoSpecificKeywords = (state?: string, city?: string): string[] => {
  const keywords = [];
  
  if (state) {
    keywords.push(
      `life insurance ${state}`,
      `insurance agents ${state}`,
      `retirement planning ${state}`,
      `financial advisors ${state}`,
      `best insurance rates ${state}`
    );
  }
  
  if (city) {
    keywords.push(
      `insurance agent ${city}`,
      `life insurance quotes ${city}`,
      `financial advisor ${city}`,
      `retirement planning ${city}`
    );
  }
  
  return keywords;
};

// Voice search optimization helper
export const getVoiceSearchKeywords = (category: string): string[] => {
  const voicePatterns = {
    'life-insurance': [
      'what is the best life insurance for my age',
      'how much does life insurance cost per month',
      'where can I get life insurance without medical exam',
      'what life insurance do I need for my family'
    ],
    'annuities': [
      'what are the best annuity rates today',
      'how do annuities work for retirement',
      'should I buy an annuity for retirement',
      'what is the difference between annuities and 401k'
    ],
    'mortgage-protection': [
      'do I need mortgage protection insurance',
      'what is mortgage life insurance',
      'how much does mortgage protection cost'
    ],
    'final-expense': [
      'what is final expense insurance',
      'how much does burial insurance cost',
      'do I need funeral insurance'
    ]
  };
  
  return voicePatterns[category] || [];
};
