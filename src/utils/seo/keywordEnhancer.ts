export const enhanceKeywordsForPath = (pathname: string, baseKeywords: string[]): string[] => {
  if (pathname.includes('life-insurance')) {
    return [
      ...baseKeywords,
      'term life insurance',
      'whole life insurance',
      'universal life insurance',
      'life insurance quotes',
      'family protection',
      'income replacement',
      'death benefit',
      'life insurance cost',
      'life insurance companies'
    ];
  }
  
  if (pathname.includes('mortgage-protection')) {
    return [
      ...baseKeywords,
      'mortgage protection insurance',
      'home loan protection',
      'mortgage life insurance',
      'mortgage payoff insurance',
      'homeowners protection',
      'family home security'
    ];
  }
  
  if (pathname.includes('annuities')) {
    return [
      ...baseKeywords,
      'retirement annuities',
      'fixed annuities',
      'variable annuities',
      'retirement income',
      'pension alternatives',
      'guaranteed income',
      'retirement planning'
    ];
  }
  
  return baseKeywords;
};