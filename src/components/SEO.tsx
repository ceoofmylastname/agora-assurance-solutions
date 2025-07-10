import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { createOrganizationSchema } from '@/utils/seo/organizationSchema';
import { createBlogPostSchema } from '@/utils/seo/blogPostSchema';
import { createMainFAQSchema, getServiceSpecificFAQSchema } from '@/utils/seo/faqSchemas';
import { enhanceKeywordsForPath } from '@/utils/seo/keywordEnhancer';

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
  const enhancedKeywords = enhanceKeywordsForPath(location.pathname, keywords);

  // Generate structured data schemas
  const organizationStructuredData = createOrganizationSchema();
  
  const blogPostStructuredData = isBlogPost ? createBlogPostSchema({
    title,
    description,
    currentUrl,
    absoluteImageUrl,
    publishDate,
    modifiedDate,
    author,
    enhancedKeywords,
    category
  }) : null;

  // FAQ schemas
  const mainFAQData = (location.pathname === '/' || location.pathname.includes('faq')) 
    ? createMainFAQSchema() 
    : null;
    
  const serviceSpecificFAQData = getServiceSpecificFAQSchema(location.pathname);

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
