export const createMainFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much life insurance do I actually need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The general rule is 10-12 times your annual income, but this varies based on your debts, dependents, and financial goals. Consider your mortgage, children\'s education costs, and your spouse\'s financial needs.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between term and whole life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life provides temporary coverage for a specific period at lower premiums. Whole life offers permanent coverage with a cash value component that grows over time.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are annuities a good investment for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Annuities can be excellent for retirement income planning, offering guaranteed payments and tax-deferred growth. They\'re particularly valuable for conservative investors seeking predictable income.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does final expense insurance cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Final expense insurance typically costs $30-$200 monthly, depending on age, health, and coverage amount. Most policies range from $5,000-$50,000 in coverage.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is mortgage protection insurance worth it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mortgage protection can be valuable, but term life insurance often provides better value and flexibility. Term life pays your beneficiaries directly while mortgage protection only pays the lender.'
      }
    }
  ]
});

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
    }
  ]
});

export const getServiceSpecificFAQSchema = (pathname: string) => {
  if (pathname.includes('term-life')) {
    return createTermLifeFAQSchema();
  }
  if (pathname.includes('final-expense')) {
    return createFinalExpenseFAQSchema();
  }
  return null;
};