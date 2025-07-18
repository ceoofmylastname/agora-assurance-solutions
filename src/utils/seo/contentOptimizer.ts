
import { enhanceKeywordsForPath } from './keywordEnhancer';

interface ContentOptimizerOptions {
  pathname: string;
  baseTitle?: string;
  baseDescription?: string;
  keywords?: string[];
}

// Action-oriented meta descriptions for different page types
const actionOrientedDescriptions = {
  '/': 'Get instant insurance quotes from top-rated carriers today. Compare life, health, auto, home insurance, annuities, and mortgage protection. Licensed advisors available nationwide for personalized guidance.',
  '/life-coverage': 'Secure your family\'s future with affordable life insurance. Get personalized quotes in minutes and protect what matters most. Compare term, whole, and universal life options today.',
  '/term-life': 'Get the most affordable term life insurance quotes instantly. Protect your family for pennies a day with coverage up to $5M. Apply online in minutes with no medical exam options.',
  '/whole-life': 'Build wealth while protecting your family with whole life insurance. Guaranteed cash value growth plus lifelong coverage. Get your personalized quote and start building legacy today.',
  '/universal-life': 'Maximize flexibility and growth potential with universal life insurance. Adjust premiums and death benefits as your needs change. Explore indexed and variable options now.',
  '/indexed-universal-life': 'Capture market upside without downside risk. Indexed Universal Life offers growth potential with principal protection. Calculate your potential returns and get quotes today.',
  '/final-expense': 'Cover funeral costs and final expenses with guaranteed acceptance life insurance. No medical exams required. Protect your loved ones from financial burden - apply today.',
  '/mortgage-protection': 'Safeguard your family\'s home with mortgage protection insurance. Ensure your mortgage gets paid if something happens to you. Get instant quotes and peace of mind today.',
  '/annuities': 'Secure guaranteed retirement income with top-rated annuities. Compare fixed, variable, and indexed options. Start building your retirement fortress with expert guidance today.',
  '/tax-asset-protection': 'Maximize wealth preservation with advanced tax strategies. Protect your assets from taxes and creditors while building generational wealth. Schedule your consultation today.',
  '/life-settlements': 'Unlock hidden value in your life insurance policy. Get cash today for policies you no longer need. Free confidential evaluation - discover your policy\'s true worth.',
  '/wealth-solutions': 'Build and protect generational wealth with comprehensive financial strategies. Expert guidance on investments, insurance, and tax optimization. Start your wealth journey today.',
  '/protection-plans': 'Comprehensive protection for every stage of life. Compare insurance options, get instant quotes, and connect with licensed experts. Protect your future starting today.',
  '/get-quote': 'Get your personalized insurance quote in under 60 seconds. Compare rates from top carriers and find the perfect coverage for your needs. Start saving today.',
  '/about': 'Discover why thousands trust Agora Assurance for their insurance needs. 50+ years combined experience, $500M+ in benefits delivered. Meet our expert team today.',
  '/faq': 'Get instant answers to your insurance questions. Comprehensive FAQ covering life insurance, annuities, quotes, and more. Find solutions to protect your family today.',
  '/blog': 'Stay informed with expert insurance insights and financial strategies. Latest trends, tips, and guides to help you make smart protection decisions for your family.'
};

// Action-oriented titles for different page types
const actionOrientedTitles = {
  '/': 'Get Instant Insurance Quotes | Compare Top Carriers | Agora Assurance',
  '/life-coverage': 'Affordable Life Insurance Quotes | Protect Your Family Today',
  '/term-life': 'Cheap Term Life Insurance | Get $5M Coverage for Pennies Daily',
  '/whole-life': 'Whole Life Insurance | Build Wealth While You Protect',
  '/universal-life': 'Flexible Universal Life Insurance | Adjust As Life Changes',
  '/indexed-universal-life': 'Indexed Universal Life | Market Gains, Zero Losses',
  '/final-expense': 'Final Expense Insurance | No Medical Exam Required',
  '/mortgage-protection': 'Mortgage Protection Insurance | Secure Your Home Today',
  '/annuities': 'Best Annuity Rates | Guaranteed Retirement Income Plans',
  '/tax-asset-protection': 'Advanced Tax Strategies | Protect & Grow Your Wealth',
  '/life-settlements': 'Life Settlements | Turn Your Policy Into Cash Today',
  '/wealth-solutions': 'Wealth Building Strategies | Expert Financial Guidance',
  '/protection-plans': 'Complete Insurance Protection | Compare Plans & Save',
  '/get-quote': 'Free Insurance Quotes | Compare Rates in 60 Seconds',
  '/about': 'About Agora Assurance | Your Trusted Insurance Partner',
  '/faq': 'Insurance FAQ | Get Instant Answers to Your Questions',
  '/blog': 'Insurance Insights | Expert Tips & Financial Strategies'
};

export const optimizeContentForSEO = ({ pathname, baseTitle, baseDescription, keywords = [] }: ContentOptimizerOptions) => {
  // Get action-oriented title and description
  const optimizedTitle = actionOrientedTitles[pathname as keyof typeof actionOrientedTitles] || baseTitle || 'Agora Assurance Solutions';
  const optimizedDescription = actionOrientedDescriptions[pathname as keyof typeof actionOrientedDescriptions] || baseDescription || 'Your trusted insurance partner providing comprehensive protection solutions.';
  
  // Enhance keywords for the specific path
  const enhancedKeywords = enhanceKeywordsForPath(pathname, keywords);
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: enhancedKeywords
  };
};

// Generate state-specific content variations
export const generateStateSpecificContent = (state: string, serviceType: string) => {
  const stateMap: { [key: string]: string } = {
    'california': 'CA',
    'texas': 'TX',
    'florida': 'FL',
    'new-york': 'NY',
    'illinois': 'IL',
    'pennsylvania': 'PA',
    'ohio': 'OH',
    'georgia': 'GA',
    'north-carolina': 'NC',
    'michigan': 'MI'
  };
  
  const stateCode = stateMap[state.toLowerCase()] || state.toUpperCase();
  const stateName = state.charAt(0).toUpperCase() + state.slice(1).replace('-', ' ');
  
  const serviceVariations = {
    'life-insurance': {
      title: `Best Life Insurance ${stateName} | Licensed Agents & Instant Quotes`,
      description: `Get the best life insurance rates in ${stateName}. Compare top ${stateCode} carriers, instant quotes, licensed local agents. Protect your family today.`,
      keywords: [`life insurance ${stateName.toLowerCase()}`, `${stateCode} life insurance rates`, `best life insurance ${stateName.toLowerCase()}`]
    },
    'annuities': {
      title: `${stateName} Annuities | Guaranteed Retirement Income | Local Experts`,
      description: `Secure retirement income with ${stateName} annuities. Compare fixed, variable & indexed options from top ${stateCode} carriers. Expert guidance available.`,
      keywords: [`annuities ${stateName.toLowerCase()}`, `${stateCode} retirement planning`, `${stateName.toLowerCase()} annuity rates`]
    },
    'mortgage-protection': {
      title: `Mortgage Protection Insurance ${stateName} | Protect Your Home`,
      description: `Safeguard your ${stateName} home with mortgage protection insurance. Ensure your family keeps the house. Get ${stateCode} quotes today.`,
      keywords: [`mortgage protection ${stateName.toLowerCase()}`, `${stateCode} mortgage insurance`, `home protection ${stateName.toLowerCase()}`]
    }
  };
  
  return serviceVariations[serviceType as keyof typeof serviceVariations] || {
    title: `Insurance Solutions ${stateName} | Agora Assurance`,
    description: `Comprehensive insurance solutions for ${stateName} residents. Licensed agents, competitive rates, personalized service.`,
    keywords: [`insurance ${stateName.toLowerCase()}`, `${stateCode} insurance agents`]
  };
};

// FAQ content for service pages
export const getServicePageFAQs = (serviceType: string) => {
  const serviceFAQs = {
    'life-insurance': [
      {
        question: 'How much life insurance do I need?',
        answer: 'Most experts recommend 10-12 times your annual income. Consider your mortgage, debts, children\'s education costs, and family expenses. Our advisors provide personalized calculations based on your specific situation.'
      },
      {
        question: 'Can I get life insurance with health issues?',
        answer: 'Yes! We offer simplified issue policies with basic health questions and guaranteed acceptance plans. Many health conditions don\'t prevent coverage - let our experts find the right solution for you.'
      },
      {
        question: 'How quickly can I get life insurance coverage?',
        answer: 'Coverage can start as quickly as 24-48 hours with simplified issue policies. Traditional underwriting typically takes 4-6 weeks but offers the best rates for healthy applicants.'
      }
    ],
    'annuities': [
      {
        question: 'What\'s the difference between fixed and variable annuities?',
        answer: 'Fixed annuities provide guaranteed returns and predictable income. Variable annuities offer growth potential through market investments but include risk. We help you choose based on your risk tolerance and goals.'
      },
      {
        question: 'When should I start taking annuity payments?',
        answer: 'Most people begin payments in retirement (after 59½ to avoid penalties). Timing depends on your income needs, other retirement assets, and tax situation. Our advisors create personalized payout strategies.'
      },
      {
        question: 'Are annuities protected if the insurance company fails?',
        answer: 'Yes, state guarantee associations protect annuities up to certain limits (typically $250K-$500K). We only work with highly-rated carriers for additional security.'
      }
    ],
    'mortgage-protection': [
      {
        question: 'Is mortgage protection insurance the same as PMI?',
        answer: 'No, they\'re different. PMI protects the lender if you default. Mortgage protection insurance pays off your mortgage if you die, protecting your family\'s home ownership.'
      },
      {
        question: 'Can I get mortgage protection if I already have life insurance?',
        answer: 'Yes, mortgage protection provides specific coverage for your home loan. It can supplement existing life insurance or serve as dedicated mortgage coverage that decreases with your loan balance.'
      },
      {
        question: 'How much does mortgage protection insurance cost?',
        answer: 'Costs vary by loan amount, your age, and health. Most homeowners pay $30-$100 monthly. It\'s often less expensive than increasing your term life insurance by the same amount.'
      }
    ]
  };
  
  return serviceFAQs[serviceType as keyof typeof serviceFAQs] || [];
};
