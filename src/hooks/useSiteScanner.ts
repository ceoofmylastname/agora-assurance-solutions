
import { useState, useEffect } from 'react';

export interface SiteImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  filename: string;
  format: string;
  size?: string;
  usedIn: string[];
  hasAlt: boolean;
  hasTitleAttr: boolean;
  isOptimized: boolean;
}

export interface PageMeta {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2Count: number;
  h3Count: number;
  hasCanonical: boolean;
  hasOgTags: boolean;
  titleLength: number;
  descLength: number;
  issues: string[];
}

export interface SEOMetrics {
  overallScore: number;
  totalImages: number;
  imagesWithoutAlt: number;
  totalPages: number;
  pagesWithIssues: number;
  lastUpdated: Date;
}

export const useSiteScanner = () => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanSiteImages = async () => {
    setIsScanning(true);
    
    try {
      // Get all image elements from the current DOM
      const imageElements = document.querySelectorAll('img');
      const scannedImages: SiteImage[] = [];

      imageElements.forEach((img, index) => {
        const src = img.src || img.getAttribute('src') || '';
        const alt = img.alt || '';
        const title = img.title || '';
        
        if (src) {
          const filename = src.split('/').pop() || `image-${index}`;
          const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
          
          scannedImages.push({
            id: `img-${index}`,
            src,
            alt,
            title,
            filename,
            format,
            usedIn: [window.location.pathname],
            hasAlt: alt.length > 0,
            hasTitleAttr: title.length > 0,
            isOptimized: alt.length > 0 && format === 'WEBP'
          });
        }
      });

      // Also scan for CSS background images
      const elementsWithBgImages = document.querySelectorAll('[style*="background-image"]');
      elementsWithBgImages.forEach((element, index) => {
        const style = element.getAttribute('style') || '';
        const bgImageMatch = style.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/);
        
        if (bgImageMatch && bgImageMatch[1]) {
          const src = bgImageMatch[1];
          const filename = src.split('/').pop() || `bg-image-${index}`;
          const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
          
          scannedImages.push({
            id: `bg-${index}`,
            src,
            alt: '', // Background images don't have alt text
            title: '',
            filename,
            format,
            usedIn: [window.location.pathname],
            hasAlt: false,
            hasTitleAttr: false,
            isOptimized: false
          });
        }
      });

      setImages(scannedImages);
      
      // Calculate metrics
      const totalImages = scannedImages.length;
      const imagesWithoutAlt = scannedImages.filter(img => !img.hasAlt).length;
      
      setMetrics({
        overallScore: Math.round(((totalImages - imagesWithoutAlt) / Math.max(totalImages, 1)) * 100),
        totalImages,
        imagesWithoutAlt,
        totalPages: 1, // Current page only for now
        pagesWithIssues: imagesWithoutAlt > 0 ? 1 : 0,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.error('Error scanning site images:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const scanPageMeta = async () => {
    const currentPage: PageMeta = {
      url: window.location.pathname,
      title: document.title || '',
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      h1: document.querySelector('h1')?.textContent || '',
      h2Count: document.querySelectorAll('h2').length,
      h3Count: document.querySelectorAll('h3').length,
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasOgTags: !!document.querySelector('meta[property^="og:"]'),
      titleLength: document.title?.length || 0,
      descLength: document.querySelector('meta[name="description"]')?.getAttribute('content')?.length || 0,
      issues: []
    };

    // Identify issues
    if (!currentPage.title) currentPage.issues.push('Missing title tag');
    if (!currentPage.metaDescription) currentPage.issues.push('Missing meta description');
    if (!currentPage.h1) currentPage.issues.push('Missing H1 tag');
    if (currentPage.titleLength > 60) currentPage.issues.push('Title too long');
    if (currentPage.descLength > 160) currentPage.issues.push('Description too long');
    if (!currentPage.hasCanonical) currentPage.issues.push('Missing canonical tag');

    setPages([currentPage]);
  };

  const updateImageAlt = async (imageId: string, newAlt: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, alt: newAlt, hasAlt: newAlt.length > 0 }
        : img
    ));

    // Update the actual DOM element
    const imgElement = document.querySelector(`img[src="${images.find(img => img.id === imageId)?.src}"]`);
    if (imgElement) {
      imgElement.setAttribute('alt', newAlt);
    }
  };

  const generateAISuggestion = (image: SiteImage): string => {
    // Simple AI-like suggestion based on image context
    const filename = image.filename.toLowerCase();
    
    if (filename.includes('logo')) {
      return 'Agora Assurance Solutions company logo';
    } else if (filename.includes('hero') || filename.includes('banner')) {
      return 'Hero image showcasing insurance protection for families';
    } else if (filename.includes('family') || filename.includes('couple')) {
      return 'Happy family protected by comprehensive insurance coverage';
    } else if (filename.includes('life') || filename.includes('insurance')) {
      return 'Life insurance policy documents and consultation';
    } else if (filename.includes('retirement') || filename.includes('planning')) {
      return 'Retirement planning consultation with financial advisor';
    } else {
      return 'Insurance-related image supporting content context';
    }
  };

  useEffect(() => {
    // Initial scan
    scanSiteImages();
    scanPageMeta();

    // Set up periodic rescanning
    const interval = setInterval(() => {
      scanSiteImages();
      scanPageMeta();
    }, 30000); // Rescan every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    images,
    pages,
    metrics,
    isScanning,
    scanSiteImages,
    scanPageMeta,
    updateImageAlt,
    generateAISuggestion
  };
};
