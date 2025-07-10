interface BlogPostSchemaParams {
  title: string;
  description: string;
  currentUrl: string;
  absoluteImageUrl: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  enhancedKeywords: string[];
  category?: string;
}

export const createBlogPostSchema = ({
  title,
  description,
  currentUrl,
  absoluteImageUrl,
  publishDate,
  modifiedDate,
  author,
  enhancedKeywords,
  category
}: BlogPostSchemaParams) => {
  if (!publishDate) return null;

  return {
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
  };
};