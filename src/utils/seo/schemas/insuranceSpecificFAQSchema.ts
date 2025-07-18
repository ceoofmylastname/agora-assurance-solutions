
export const createInsuranceSpecificFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much life insurance do I need if I have a $300,000 mortgage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a $300,000 mortgage, consider at least $300,000 in coverage to pay off the loan, plus additional coverage for family expenses, children\'s education, and income replacement. Total recommended coverage is typically 10-12 times annual income, so mortgage payoff is just one component of your overall life insurance needs assessment.'
      }
    },
    {
      '@type': 'Question',
      name: 'What life insurance options exist for diabetics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Diabetics can obtain life insurance through several options: simplified issue policies with basic health questions, guaranteed acceptance plans with no health questions, or traditional underwriting for well-controlled diabetes. Many carriers now offer competitive rates for diabetics with good control. Agora specializes in finding coverage for pre-existing conditions.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do annuity surrender charges work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Annuity surrender charges are penalties for early withdrawals, typically starting at 7-10% in year one and declining annually until eliminated after 5-10 years. Most annuities allow 10% penalty-free withdrawals annually after the first year. Understanding surrender schedules is crucial when selecting annuities for liquidity needs.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between Medicare Supplement and long-term care insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medicare Supplement (Medigap) covers gaps in Medicare coverage like deductibles and copays for medical care. Long-term care insurance covers custodial care services not covered by Medicare, such as assistance with daily living activities. Both serve different purposes in comprehensive healthcare planning for seniors.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use life insurance for retirement income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, permanent life insurance with cash value can supplement retirement income through tax-free policy loans or withdrawals. This strategy works best with maximum-funded policies like Indexed Universal Life. However, it should complement, not replace, traditional retirement accounts like 401(k)s and IRAs for diversified retirement planning.'
      }
    },
    {
      '@type': 'Question',
      name: 'What happens to my life insurance if I change jobs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Individual life insurance policies remain unaffected by job changes. Employer-provided group life insurance typically ends when you leave, though some offer portability options. It\'s wise to secure individual coverage independent of employment to ensure continuous protection regardless of career changes.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I know if my insurance company is financially stable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check insurance company ratings from agencies like AM Best, Standard & Poor\'s, Moody\'s, and Fitch. Look for ratings of A- or higher. Review the company\'s complaint ratios through your state insurance department. Agora exclusively partners with A-rated or higher carriers with strong financial stability and claims-paying ability.'
      }
    }
  ]
});
