
export const createProductComparisonFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Term vs Whole Life Insurance: Which is right for me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life insurance provides temporary coverage at lower costs, ideal for specific time periods like mortgages or child-rearing years. Whole life offers permanent coverage with cash value growth, suitable for estate planning and lifelong protection. Choose term for temporary needs and affordability, whole life for permanent wealth transfer goals.'
      }
    },
    {
      '@type': 'Question',
      name: 'Fixed vs Variable Annuities: What\'s the difference?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fixed annuities provide guaranteed interest rates and predictable income, protecting your principal from market volatility. Variable annuities allow investment in market-based accounts with potential for higher returns but also risk of loss. Fixed annuities suit conservative investors seeking security; variable annuities appeal to those wanting growth potential.'
      }
    },
    {
      '@type': 'Question',
      name: 'Indexed Universal Life vs Traditional Universal Life: Which offers better returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Indexed Universal Life (IUL) links cash value growth to stock market indexes with downside protection, potentially offering higher returns than traditional UL\'s fixed interest rates. Traditional UL provides steady, predictable growth. IUL suits those wanting market upside without risk of loss; traditional UL works for conservative, predictable growth preferences.'
      }
    },
    {
      '@type': 'Question',
      name: 'Final Expense vs Term Life Insurance: What\'s more cost-effective?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life insurance typically offers more coverage per dollar but requires health underwriting. Final expense insurance costs more per dollar of coverage but features simplified underwriting, making it accessible for seniors with health issues. Term life is more cost-effective for healthy individuals; final expense works better for those with health conditions.'
      }
    },
    {
      '@type': 'Question',
      name: 'Mortgage Protection vs Term Life Insurance: Which provides better family protection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life insurance provides more flexibility and typically better value, paying beneficiaries directly who can use funds for any purpose. Mortgage protection only pays the lender and coverage decreases over time. Term life offers broader family protection and financial flexibility, while mortgage protection serves the specific purpose of mortgage payoff.'
      }
    },
    {
      '@type': 'Question',
      name: 'Immediate vs Deferred Annuities: When should I choose each?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immediate annuities start payments within a year, ideal for retirees needing income now. Deferred annuities accumulate value over time before payments begin, suitable for pre-retirees building retirement income. Choose immediate if you need income now; select deferred if you\'re planning for future retirement income needs.'
      }
    }
  ]
});
