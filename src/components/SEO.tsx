import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  isBlogPost?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Agora Assurance Solutions',
  description = 'Your Independent Insurance Partner providing comprehensive life, mortgage, and annuity solutions. Get instant quotes, compare plans, and connect with licensed advisors.',
  type = 'website',
  name = 'Agora Assurance Solutions',
  imageUrl = '/lovable-uploads/99f03d19-d521-4882-9c68-a2bbe122b1f9.png',
  publishDate,
  modifiedDate,
  author,
  category,
  keywords = ['insurance', 'life insurance', 'mortgage protection', 'final expense', 'annuities', 'tax solutions', 'insurance quotes', 'licensed advisors'],
  isBlogPost = false
}) => {
  const location = useLocation();
  const currentUrl = `https://agora.yenomai.com${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://agora.yenomai.com${imageUrl}`;

  // Enhanced keywords for insurance-related pages
  const enhancedKeywords = location.pathname.includes('life-insurance') 
    ? [
        ...keywords,
        'term life insurance',
        'whole life insurance',
        'universal life insurance',
        'life insurance quotes',
        'family protection',
        'income replacement',
        'death benefit',
        'life insurance cost',
        'life insurance companies'
      ]
    : location.pathname.includes('mortgage-protection')
    ? [
        ...keywords,
        'mortgage protection insurance',
        'home loan protection',
        'mortgage life insurance',
        'mortgage payoff insurance',
        'homeowners protection',
        'family home security'
      ]
    : location.pathname.includes('annuities')
    ? [
        ...keywords,
        'retirement annuities',
        'fixed annuities',
        'variable annuities',
        'retirement income',
        'pension alternatives',
        'guaranteed income',
        'retirement planning'
      ]
    : keywords;

  // Create base Organization and LocalBusiness JSON-LD structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'Agora Assurance Solutions',
    url: 'https://agora.yenomai.com',
    logo: 'https://agora.yenomai.com/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png',
    description: 'Your Independent Insurance Partner providing comprehensive life, mortgage, and annuity solutions',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@agoraassurance.com',
      availableLanguage: 'English'
    },
    areaServed: [
      {
        '@type': 'Place',
        name: 'United States'
      }
    ],
    serviceType: [
      'Life Insurance',
      'Mortgage Protection',
      'Final Expense Insurance',
      'Annuities',
      'Tax & Asset Protection'
    ]
  };

  // Enhanced BlogPosting JSON-LD structured data
  const blogPostStructuredData = isBlogPost && publishDate ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: absoluteImageUrl,
      width: 1200,
      height: 630
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      '@type': 'Organization',
      name: author || 'Agora Assurance Solutions',
      url: 'https://agora.yenomai.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agora Assurance Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agora.yenomai.com/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png',
        width: 512,
        height: 512
      },
      url: 'https://agora.yenomai.com'
    },
    description: description,
    keywords: enhancedKeywords.join(', '),
    articleSection: category,
    inLanguage: 'en-US',
    isAccessibleForFree: true
  } : null;

  // Add FAQ structured data for main FAQ page
  const mainFAQData = location.pathname === '/' || location.pathname.includes('faq') ? {
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
  } : null;

  // Add service-specific FAQ data for service pages
  const serviceSpecificFAQData = location.pathname.includes('term-life') ? {
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
  } : location.pathname.includes('final-expense') ? {
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
  } : null;

  // Combine keywords with any additional category terms
  const keywordString = category 
    ? [...enhancedKeywords, category.toLowerCase()].join(', ') 
    : enhancedKeywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta name="keywords" content={keywordString} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isBlogPost ? 'article' : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Agora Assurance Solutions" />
      <meta property="og:locale" content="en_US" />
      {isBlogPost && category && <meta property="article:section" content={category} />}
      {isBlogPost && publishDate && <meta property="article:published_time" content={publishDate} />}
      {isBlogPost && modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {isBlogPost && <meta property="article:publisher" content="https://agora.yenomai.com" />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:site" content="@agoraassurance" />
      <meta name="twitter:creator" content="@agoraassurance" />
      
      {/* LinkedIn specific */}
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta name="author" content={author || name} />
      
      {/* Pinterest specific */}
      <meta name="pinterest:description" content={description} />
      <meta name="pinterest:image" content={absoluteImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      
      {blogPostStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
      
      {mainFAQData && (
        <script type="application/ld+json">
          {JSON.stringify(mainFAQData)}
        </script>
      )}
      
      {serviceSpecificFAQData && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSpecificFAQData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
