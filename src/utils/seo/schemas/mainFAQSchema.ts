
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
