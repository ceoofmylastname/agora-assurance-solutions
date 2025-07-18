
export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  position?: number;
  url?: string;
  category: 'geo-specific' | 'comparison' | 'voice-search' | 'long-tail' | 'primary';
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
}

// Comprehensive keyword database for insurance industry
export const insuranceKeywords: KeywordData[] = [
  // Geo-specific keywords
  {
    keyword: 'life insurance California',
    searchVolume: 2400,
    difficulty: 65,
    category: 'geo-specific',
    intent: 'commercial'
  },
  {
    keyword: 'Texas annuity rates',
    searchVolume: 1200,
    difficulty: 55,
    category: 'geo-specific',
    intent: 'commercial'
  },
  {
    keyword: 'Florida final expense insurance',
    searchVolume: 890,
    difficulty: 45,
    category: 'geo-specific',
    intent: 'commercial'
  },
  {
    keyword: 'New York mortgage protection',
    searchVolume: 760,
    difficulty: 58,
    category: 'geo-specific',
    intent: 'commercial'
  },
  
  // Comparison keywords
  {
    keyword: 'term vs whole life insurance',
    searchVolume: 8900,
    difficulty: 72,
    category: 'comparison',
    intent: 'informational'
  },
  {
    keyword: 'compare life insurance quotes',
    searchVolume: 5600,
    difficulty: 68,
    category: 'comparison',
    intent: 'commercial'
  },
  {
    keyword: 'annuity vs 401k',
    searchVolume: 3400,
    difficulty: 62,
    category: 'comparison',
    intent: 'informational'
  },
  {
    keyword: 'fixed vs variable annuities',
    searchVolume: 2100,
    difficulty: 58,
    category: 'comparison',
    intent: 'informational'
  },
  
  // Voice search keywords
  {
    keyword: 'what is the best life insurance for seniors',
    searchVolume: 1800,
    difficulty: 52,
    category: 'voice-search',
    intent: 'informational'
  },
  {
    keyword: 'how much life insurance do I need',
    searchVolume: 4500,
    difficulty: 48,
    category: 'voice-search',
    intent: 'informational'
  },
  {
    keyword: 'where can I get cheap life insurance',
    searchVolume: 2300,
    difficulty: 64,
    category: 'voice-search',
    intent: 'commercial'
  },
  {
    keyword: 'how do annuities work for retirement',
    searchVolume: 1600,
    difficulty: 42,
    category: 'voice-search',
    intent: 'informational'
  },
  
  // Long-tail keywords
  {
    keyword: 'no medical exam life insurance for seniors',
    searchVolume: 1200,
    difficulty: 38,
    category: 'long-tail',
    intent: 'commercial'
  },
  {
    keyword: 'guaranteed acceptance final expense insurance',
    searchVolume: 890,
    difficulty: 35,
    category: 'long-tail',
    intent: 'commercial'
  },
  {
    keyword: 'tax-free retirement income strategies',
    searchVolume: 1500,
    difficulty: 55,
    category: 'long-tail',
    intent: 'informational'
  }
];

// Keyword opportunity analyzer
export const analyzeKeywordOpportunities = (currentKeywords: string[]): KeywordData[] => {
  return insuranceKeywords.filter(keyword => 
    !currentKeywords.includes(keyword.keyword) && 
    keyword.difficulty < 60 && 
    keyword.searchVolume > 500
  ).sort((a, b) => b.searchVolume - a.searchVolume);
};

// Keyword performance tracker
export const trackKeywordPerformance = (keywords: KeywordData[]) => {
  return {
    totalVolume: keywords.reduce((sum, k) => sum + k.searchVolume, 0),
    averageDifficulty: keywords.reduce((sum, k) => sum + k.difficulty, 0) / keywords.length,
    highVolumeKeywords: keywords.filter(k => k.searchVolume > 2000),
    lowCompetitionKeywords: keywords.filter(k => k.difficulty < 40),
    voiceSearchKeywords: keywords.filter(k => k.category === 'voice-search'),
    geoKeywords: keywords.filter(k => k.category === 'geo-specific')
  };
};
