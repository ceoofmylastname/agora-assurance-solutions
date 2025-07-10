export const createMainFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I compare insurance plans quickly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Explore tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans side-by-side with instant comparisons from top carriers.'
      }
    },
    {
      '@type': 'Question',
      name: 'How fast can I get a personalized quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instantly receive customized quotes from top carriers in seconds—no phone calls, forms, or waiting required.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I get expert guidance or just software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hands-on guidance from state-regulated professionals who ensure solutions align with your family\'s specific goals and budget.'
      }
    },
    {
      '@type': 'Question',
      name: 'What services does Agora offer beyond life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Comprehensive financial protection including tax strategies, asset protection, annuities, life settlements, and retirement planning solutions.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does Agora simplify the insurance process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We streamline every step from quote to coverage in 24 hours with transparent, real-time updates and continuous communication throughout your journey.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why should I choose Agora Assurance Solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With 50+ years combined experience, 25,000+ lives protected, and $500M+ in tax-free benefits created, we offer technology-driven comparison tools and licensed expert guidance.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Agora different from other insurance companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our unique technology-driven approach combines AI comparison tools with independent consumer advocacy and state-licensed expertise for transparent, personalized service.'
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

export const createDedicatedFAQPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // Getting Started with Agora
    {
      '@type': 'Question',
      name: 'How is Agora different from other insurance brokers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agora combines cutting-edge technology with independent consumer advocacy. Unlike traditional brokers tied to specific carriers, we compare dozens of top-rated companies instantly to find your best rates and coverage options with zero bias.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I compare insurance plans quickly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Explore tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans side-by-side with instant comparisons from top carriers through our advanced comparison platform.'
      }
    },
    {
      '@type': 'Question',
      name: 'How fast can I get a personalized quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instantly receive customized quotes from top carriers in seconds—no phone calls, forms, or waiting required through our streamlined digital platform.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Agora charge fees for their services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Agora\'s services are completely free to consumers. We\'re compensated directly by insurance carriers when you purchase coverage, so you never pay consultation or comparison fees.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I speak with a real person at Agora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. All clients receive hands-on guidance from state-licensed professionals who ensure solutions align with your family\'s specific goals and budget throughout the entire process.'
      }
    },
    // Insurance Products & Coverage
    {
      '@type': 'Question',
      name: 'What services does Agora offer beyond life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Comprehensive financial protection including tax strategies, asset protection, annuities, life settlements, and retirement planning solutions tailored to your unique financial situation.'
      }
    },
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
        text: 'When term life insurance expires, coverage ends. You can often convert to permanent life insurance, renew at higher rates, or purchase new coverage subject to health underwriting.'
      }
    },
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
      name: 'What\'s the difference between term and whole life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Term life provides temporary coverage at lower costs, while whole life combines permanent protection with cash value growth. Term is ideal for temporary needs; whole life for lifelong protection.'
      }
    },
    // Application Process
    {
      '@type': 'Question',
      name: 'How does Agora simplify the insurance process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We streamline every step from quote to coverage in 24 hours with transparent, real-time updates and continuous communication throughout your journey with our licensed advisors.'
      }
    },
    {
      '@type': 'Question',
      name: 'What information do I need to get an accurate quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Basic personal information including age, health status, coverage amount needed, and beneficiary details. Our smart questionnaire guides you through each step efficiently.'
      }
    },
    {
      '@type': 'Question',
      name: 'How quickly can I get covered with Agora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most clients go from quote to coverage in 24 hours with our streamlined digital process and instant underwriting approvals for qualifying applicants.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need a medical exam for life insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not always. Many policies now offer simplified underwriting or instant approval based on health questionnaires. Medical exams are typically required for larger coverage amounts or older applicants.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I apply for insurance online completely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our digital platform handles the entire application process online, from initial quotes through final approval, with optional phone support when needed.'
      }
    },
    // Service Areas & Support
    {
      '@type': 'Question',
      name: 'Which states does Agora serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agora provides insurance services nationwide across all 50 states, with state-licensed advisors who understand local regulations and carrier availability in your area.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do insurance rates vary by state with Agora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, insurance rates can vary by state due to local regulations, demographics, and carrier competition. Our platform shows you the best available rates in your specific location.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I trust Agora with my personal information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We use bank-level encryption and strict privacy protocols. Your information is never sold to third parties and is only shared with carriers you choose to work with.'
      }
    },
    {
      '@type': 'Question',
      name: 'What if I need help after purchasing my policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agora provides ongoing support for all policy holders including claims assistance, policy reviews, and life changes that may affect your coverage needs.'
      }
    },
    // Why Choose Agora
    {
      '@type': 'Question',
      name: 'Why should I choose Agora Assurance Solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With 50+ years combined experience, 25,000+ lives protected, and $500M+ in tax-free benefits created, we offer technology-driven comparison tools and licensed expert guidance.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Agora different from other insurance companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our unique technology-driven approach combines AI comparison tools with independent consumer advocacy and state-licensed expertise for transparent, personalized service without carrier bias.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does Agora make money if their service is free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance carriers pay us commissions when you purchase coverage through our platform. This standard industry practice allows us to offer free comparison and advisory services to consumers.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you work with reputable insurance companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we exclusively partner with A-rated or higher insurance carriers with strong financial stability ratings from agencies like AM Best, Standard & Poor\'s, and Moody\'s.'
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
  if (pathname === '/faq') {
    return createDedicatedFAQPageSchema();
  }
  return null;
};