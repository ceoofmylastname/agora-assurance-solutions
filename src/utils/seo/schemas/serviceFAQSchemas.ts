
export const createTermLifeFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does term life insurance cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A healthy 30-year-old might pay $20-40/month for $500,000 in term coverage, while a 50-year-old could pay $100-200/month for the same amount. Costs vary by age, health, and coverage type.'
      }
    },
    {
      '@type': 'Question',
      name: 'What happens when my term life insurance expires?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When term life insurance expires, coverage ends. You can often convert to permanent life insurance, renew at higher rates, or purchase new coverage (subject to health underwriting).'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I convert my term life insurance to whole life?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most term policies include conversion options allowing you to convert to permanent coverage without medical underwriting, typically within the first 10-20 years. This feature provides flexibility as your needs change over time.'
      }
    }
  ]
});

export const createFinalExpenseFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I get final expense insurance without a medical exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most final expense policies don\'t require medical exams. They use simplified underwriting with basic health questions, making them accessible to seniors with health issues.'
      }
    },
    {
      '@type': 'Question',
      name: 'What does final expense insurance actually cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Final expense insurance covers funeral costs ($7,000-12,000 average), burial or cremation expenses, outstanding medical bills, legal fees, and other end-of-life costs, protecting your family from financial burden during difficult times.'
      }
    }
  ]
});

export const createAnnuitiesFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are annuities FDIC insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, annuities are not FDIC insured. Instead, they\'re protected by state guarantee associations up to certain limits (typically $250,000-500,000) and backed by the insurance company\'s financial strength. Choose carriers with strong AM Best ratings for security.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I start taking annuity payments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people begin annuity payments in retirement (after age 59½ to avoid IRS penalties). Timing depends on your income needs, other retirement assets, and tax situation. Delaying payments allows more accumulation but reduces total lifetime income potential.'
      }
    }
  ]
});
