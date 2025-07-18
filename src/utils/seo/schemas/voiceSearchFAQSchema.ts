
export const createVoiceSearchFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does life insurance cost per month?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Life insurance costs vary by age, health, and coverage amount. A healthy 30-year-old might pay $25-40 monthly for $500,000 term coverage, while a 50-year-old could pay $150-250 monthly. Final expense insurance for seniors typically costs $50-150 monthly. Get instant quotes to see your specific rates.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get life insurance without a medical exam today?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, many insurers offer no-exam life insurance up to $500,000 coverage using simplified underwriting with health questionnaires. Approval can happen within 24-48 hours. While rates may be slightly higher than traditional underwriting, no-exam policies provide quick, convenient coverage for busy individuals.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the cheapest life insurance I can buy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life insurance is typically the most affordable option, with healthy young adults potentially paying $15-25 monthly for $250,000 coverage. Group life insurance through employers is often the cheapest but provides limited coverage. Compare multiple carriers to find the lowest rates for your specific situation.'
      }
    },
    {
      '@type': 'Question',
      name: 'How quickly can I get approved for life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simplified issue policies can be approved in 24-48 hours, while traditional underwriting typically takes 4-6 weeks. Instant decision policies provide immediate approval for qualifying applicants. The timeline depends on coverage amount, health complexity, and underwriting requirements of your chosen policy type.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is whole life insurance a good investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whole life insurance serves as a conservative investment with guaranteed cash value growth, tax advantages, and death benefit protection. Returns are typically 4-6% annually. It\'s best viewed as a financial tool combining insurance and conservative investment rather than a standalone investment strategy. Consider your overall financial goals when evaluating whole life.'
      }
    },
    {
      '@type': 'Question',
      name: 'What life insurance do I need at age 65?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At 65, life insurance needs often shift to final expenses, estate planning, or legacy goals. If mortgage and income replacement needs are met, consider $50,000-100,000 final expense coverage or permanent life insurance for estate transfer. Evaluate your financial obligations and beneficiary needs to determine appropriate coverage.'
      }
    }
  ]
});
