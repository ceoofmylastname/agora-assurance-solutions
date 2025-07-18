
export interface CalculatorStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export const createCalculatorSchema = (
  name: string,
  description: string,
  steps: CalculatorStep[],
  totalTime?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: `How to Use ${name}`,
  description,
  totalTime: totalTime || 'PT5M',
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Basic Information (Age, Income, Coverage Amount)'
    }
  ],
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Insurance Calculator'
    }
  ],
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    url: step.url,
    image: step.image
  }))
});

export const createSoftwareApplicationSchema = (
  name: string,
  description: string,
  category: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  applicationCategory: category,
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '150'
  }
});

// Pre-configured calculator schemas
export const getLifeInsuranceCalculatorSchema = () => createCalculatorSchema(
  'Life Insurance Calculator',
  'Calculate your life insurance coverage needs based on your income, debts, and family situation.',
  [
    {
      name: 'Enter Your Age',
      text: 'Input your current age to determine premium estimates and coverage options.'
    },
    {
      name: 'Annual Income',
      text: 'Enter your annual income to calculate income replacement needs.'
    },
    {
      name: 'Outstanding Debts',
      text: 'Include mortgage, loans, and other debts that need to be covered.'
    },
    {
      name: 'Family Expenses',
      text: 'Consider ongoing family expenses, education costs, and future financial goals.'
    },
    {
      name: 'Get Coverage Recommendation',
      text: 'Receive a personalized coverage amount and compare policy options.'
    }
  ],
  'PT3M'
);

export const getMortgageProtectionCalculatorSchema = () => createCalculatorSchema(
  'Mortgage Protection Calculator',
  'Determine the right mortgage protection insurance coverage for your home loan.',
  [
    {
      name: 'Mortgage Balance',
      text: 'Enter your current outstanding mortgage balance.'
    },
    {
      name: 'Monthly Payment',
      text: 'Input your monthly mortgage payment including principal and interest.'
    },
    {
      name: 'Loan Term Remaining',
      text: 'Specify how many years are left on your mortgage.'
    },
    {
      name: 'Calculate Coverage',
      text: 'Get customized mortgage protection insurance recommendations.'
    }
  ],
  'PT2M'
);
