
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { createOrganizationSchema } from '@/utils/seo/organizationSchema';
import { createBlogPostSchema } from '@/utils/seo/blogPostSchema';
import { 
  createMainFAQSchema, 
  getServiceSpecificFAQSchema,
  createProductComparisonFAQSchema,
  createGeoSpecificFAQSchema,
  createVoiceSearchFAQSchema
} from '@/utils/seo/faqSchemas';
import { optimizeContentForSEO } from '@/utils/seo/contentOptimizer';

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
  title,
  description,
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
  const currentUrl = `https://agoraassurancesolutions.com${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://agoraassurancesolutions.com${imageUrl}`;

  // Use content optimizer for action-oriented titles and descriptions
  const optimizedContent = optimizeContentForSEO({
    pathname: location.pathname,
    baseTitle: title,
    baseDescription: description,
    keywords
  });

  // Use optimized content if no custom title/description provided
  const finalTitle = title || optimizedContent.title;
  const finalDescription = description || optimizedContent.description;
  const finalKeywords = optimizedContent.keywords;

  // Generate structured data schemas
  const organizationStructuredData = createOrganizationSchema();
  
  const blogPostStructuredData = isBlogPost ? createBlogPostSchema({
    title: finalTitle,
    description: finalDescription,
    currentUrl,
    absoluteImageUrl,
    publishDate,
    modifiedDate,
    author,
    enhancedKeywords: finalKeywords,
    category
  }) : null;

  // Enhanced FAQ schemas for better coverage
  const mainFAQData = (location.pathname === '/' || location.pathname.includes('faq')) 
    ? createMainFAQSchema() 
    : null;
    
  const serviceSpecificFAQData = getServiceSpecificFAQSchema(location.pathname);
  
  // Add comparison and voice search FAQ schemas for homepage and key pages
  const comparisonFAQData = (location.pathname === '/' || location.pathname.includes('compare')) 
    ? createProductComparisonFAQSchema() 
    : null;
    
  const geoFAQData = (location.pathname === '/' || location.pathname.includes('quote')) 
    ? createGeoSpecificFAQSchema() 
    : null;
    
  const voiceSearchFAQData = (location.pathname === '/' || location.pathname.includes('faq')) 
    ? createVoiceSearchFAQSchema() 
    : null;

  // Combine keywords with any additional category terms
  const keywordString = category 
    ? [...finalKeywords, category.toLowerCase()].join(', ') 
    : finalKeywords.join(', ');

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={currentUrl} />
      <meta name="keywords" content={keywordString} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isBlogPost ? 'article' : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
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
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:site" content="@agoraassurance" />
      <meta name="twitter:creator" content="@agoraassurance" />
      
      {/* LinkedIn specific */}
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta name="author" content={author || name} />
      
      {/* Pinterest specific */}
      <meta name="pinterest:description" content={finalDescription} />
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
      
      {comparisonFAQData && (
        <script type="application/ld+json">
          {JSON.stringify(comparisonFAQData)}
        </script>
      )}
      
      {geoFAQData && (
        <script type="application/ld+json">
          {JSON.stringify(geoFAQData)}
        </script>
      )}
      
      {voiceSearchFAQData && (
        <script type="application/ld+json">
          {JSON.stringify(voiceSearchFAQData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
