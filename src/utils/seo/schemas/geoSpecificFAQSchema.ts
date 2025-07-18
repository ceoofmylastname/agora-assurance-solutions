
export const createGeoSpecificFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the best life insurance companies in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top-rated life insurance companies in California include Mutual of Omaha, Foresters Financial, American National, and Transamerica, all offering competitive rates and strong financial ratings. Agora partners with these and other A-rated carriers to provide Californians with comprehensive coverage options and personalized service from licensed local agents.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do life insurance rates vary by state?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Life insurance rates can vary by state due to local regulations, population demographics, and market competition. States with higher life expectancy and lower risk factors typically see better rates. Agora\'s platform compares rates from multiple carriers licensed in your specific state to ensure you get the best available pricing in your location.'
      }
    },
    {
      '@type': 'Question',
      name: 'What life insurance coverage do I need in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas residents typically need 10-12 times their annual income in life insurance coverage, considering the state\'s average home values, education costs, and family expenses. With Texas\' growing economy and higher property values in major cities, adequate coverage protects families from financial hardship. Our Texas-licensed agents help determine optimal coverage amounts.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are there state-specific insurance regulations I should know about?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, each state has unique insurance regulations affecting coverage options, consumer protections, and claims processes. Some states offer additional consumer protections or have specific requirements for policy illustrations. Agora\'s state-licensed agents understand your local regulations and ensure compliance with all state-specific insurance requirements.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the most affordable life insurance options in Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Florida residents can find affordable life insurance through term policies starting around $20-30 monthly for healthy individuals. Given Florida\'s large senior population, final expense and simplified issue policies are also popular and affordable options. Our Florida-licensed agents compare rates from multiple carriers to find the most cost-effective coverage for your specific situation.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does living in New York affect my insurance options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New York has strict insurance regulations that often provide additional consumer protections but may limit some product types. The state\'s high cost of living typically requires higher coverage amounts. New York residents benefit from strong regulatory oversight and comprehensive consumer protections, and our New York-licensed agents navigate these regulations to optimize your coverage.'
      }
    }
  ]
});
