
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
  width?: number;
  height?: number;
  element?: HTMLImageElement;
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
    console.log('Starting comprehensive image scan...');
    setIsScanning(true);
    
    try {
      const scannedImages: SiteImage[] = [];
      
      // Scan all IMG elements in the DOM
      const imageElements = document.querySelectorAll('img');
      console.log(`Found ${imageElements.length} img elements`);
      
      imageElements.forEach((img, index) => {
        const src = img.src || img.getAttribute('src') || img.getAttribute('data-src') || '';
        const alt = img.alt || '';
        const title = img.title || '';
        
        if (src && !src.startsWith('data:')) { // Skip data URLs
          const filename = src.split('/').pop()?.split('?')[0] || `image-${index}`;
          const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
          
          // Get image dimensions
          const width = img.naturalWidth || img.width || 0;
          const height = img.naturalHeight || img.height || 0;
          
          scannedImages.push({
            id: `img-${index}-${Date.now()}`,
            src,
            alt,
            title,
            filename,
            format,
            width,
            height,
            usedIn: [window.location.pathname],
            hasAlt: alt.length > 0,
            hasTitleAttr: title.length > 0,
            isOptimized: alt.length > 0 && alt.length <= 125 && format !== 'BMP' && format !== 'TIFF',
            element: img
          });
        }
      });

      // Scan for CSS background images
      const elementsWithBgImages = document.querySelectorAll('*');
      let bgImageCount = 0;
      
      elementsWithBgImages.forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        const backgroundImage = computedStyle.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('url(')) {
          const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
          if (urlMatch && urlMatch[1] && !urlMatch[1].startsWith('data:')) {
            const src = urlMatch[1];
            const filename = src.split('/').pop()?.split('?')[0] || `bg-image-${bgImageCount}`;
            const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
            
            scannedImages.push({
              id: `bg-${bgImageCount}-${Date.now()}`,
              src,
              alt: '', // Background images don't have alt text by nature
              title: '',
              filename,
              format,
              usedIn: [window.location.pathname],
              hasAlt: false,
              hasTitleAttr: false,
              isOptimized: false // Background images are never optimized for accessibility
            });
            bgImageCount++;
          }
        }
      });

      // Scan for SVG elements
      const svgElements = document.querySelectorAll('svg');
      svgElements.forEach((svg, index) => {
        const title = svg.querySelector('title')?.textContent || '';
        const ariaLabel = svg.getAttribute('aria-label') || '';
        const role = svg.getAttribute('role') || '';
        
        scannedImages.push({
          id: `svg-${index}-${Date.now()}`,
          src: 'inline-svg',
          alt: ariaLabel || title,
          title: title,
          filename: `svg-${index}.svg`,
          format: 'SVG',
          usedIn: [window.location.pathname],
          hasAlt: (ariaLabel || title).length > 0,
          hasTitleAttr: title.length > 0,
          isOptimized: (ariaLabel || title).length > 0 && role === 'img'
        });
      });

      // Remove duplicates based on src
      const uniqueImages = scannedImages.filter((img, index, self) => 
        index === self.findIndex(i => i.src === img.src)
      );

      console.log(`Total unique images found: ${uniqueImages.length}`);
      setImages(uniqueImages);
      
      // Calculate comprehensive metrics
      const totalImages = uniqueImages.length;
      const imagesWithoutAlt = uniqueImages.filter(img => !img.hasAlt).length;
      const imagesNeedingImprovement = uniqueImages.filter(img => 
        img.hasAlt && !img.isOptimized
      ).length;
      
      const overallScore = totalImages > 0 
        ? Math.round(((totalImages - imagesWithoutAlt - (imagesNeedingImprovement * 0.5)) / totalImages) * 100)
        : 100;
      
      setMetrics({
        overallScore,
        totalImages,
        imagesWithoutAlt,
        totalPages: 1, // Current page only
        pagesWithIssues: (imagesWithoutAlt > 0 || imagesNeedingImprovement > 0) ? 1 : 0,
        lastUpdated: new Date()
      });

      console.log(`Image scan complete. Score: ${overallScore}%, Missing alt: ${imagesWithoutAlt}`);

    } catch (error) {
      console.error('Error during comprehensive image scan:', error);
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
    if (currentPage.titleLength < 30) currentPage.issues.push('Title too short');
    if (currentPage.descLength > 160) currentPage.issues.push('Description too long');
    if (currentPage.descLength < 120) currentPage.issues.push('Description too short');
    if (!currentPage.hasCanonical) currentPage.issues.push('Missing canonical tag');

    setPages([currentPage]);
  };

  const updateImageAlt = async (imageId: string, newAlt: string) => {
    console.log(`Updating alt text for image ${imageId}: "${newAlt}"`);
    
    setImages(prev => prev.map(img => {
      if (img.id === imageId) {
        const updatedImg = { 
          ...img, 
          alt: newAlt, 
          hasAlt: newAlt.length > 0,
          isOptimized: newAlt.length > 0 && newAlt.length <= 125 && img.format !== 'BMP' && img.format !== 'TIFF'
        };
        
        // Update the actual DOM element if it exists
        if (img.element) {
          img.element.setAttribute('alt', newAlt);
          console.log('Updated DOM element alt attribute');
        } else {
          // Find the element by src if we don't have a direct reference
          const imgElement = document.querySelector(`img[src="${img.src}"]`) as HTMLImageElement;
          if (imgElement) {
            imgElement.setAttribute('alt', newAlt);
            console.log('Found and updated DOM element alt attribute');
          }
        }
        
        return updatedImg;
      }
      return img;
    }));

    // Recalculate metrics after update
    setTimeout(() => {
      const updatedImages = images.map(img => 
        img.id === imageId 
          ? { ...img, alt: newAlt, hasAlt: newAlt.length > 0 }
          : img
      );
      const totalImages = updatedImages.length;
      const imagesWithoutAlt = updatedImages.filter(img => !img.hasAlt).length;
      const overallScore = totalImages > 0 
        ? Math.round(((totalImages - imagesWithoutAlt) / totalImages) * 100)
        : 100;
      
      setMetrics(prev => prev ? { ...prev, overallScore, imagesWithoutAlt } : null);
    }, 100);
  };

  const generateAISuggestion = (image: SiteImage): string => {
    console.log(`Generating AI suggestion for: ${image.filename}`);
    
    const filename = image.filename.toLowerCase();
    const currentPath = window.location.pathname.toLowerCase();
    
    // Context-aware suggestions based on current page and filename
    if (currentPath.includes('life') || currentPath.includes('insurance')) {
      if (filename.includes('logo')) {
        return 'Agora Assurance Solutions - Life Insurance and Financial Protection';
      } else if (filename.includes('hero') || filename.includes('banner')) {
        return 'Professional life insurance consultation protecting families financial future';
      } else if (filename.includes('family') || filename.includes('couple')) {
        return 'Happy family protected by comprehensive life insurance coverage';
      } else if (filename.includes('advisor') || filename.includes('meeting')) {
        return 'Life insurance advisor consulting with clients about financial protection';
      }
    }
    
    if (currentPath.includes('retirement') || currentPath.includes('annuit')) {
      if (filename.includes('retirement') || filename.includes('planning')) {
        return 'Retirement financial planning consultation with professional advisor';
      } else if (filename.includes('couple') || filename.includes('senior')) {
        return 'Retired couple enjoying financial security through proper retirement planning';
      }
    }
    
    // Generic insurance-focused suggestions
    if (filename.includes('logo')) {
      return 'Agora Assurance Solutions company logo';
    } else if (filename.includes('hero') || filename.includes('banner')) {
      return 'Professional insurance services protecting your financial future';
    } else if (filename.includes('family') || filename.includes('couple')) {
      return 'Family protected by comprehensive insurance coverage';
    } else if (filename.includes('business') || filename.includes('meeting')) {
      return 'Insurance consultation meeting with professional advisor';
    } else if (filename.includes('document') || filename.includes('policy')) {
      return 'Insurance policy documents and financial planning materials';
    } else {
      return 'Insurance and financial protection services illustration';
    }
  };

  useEffect(() => {
    // Initial comprehensive scan
    console.log('Initializing site scanner...');
    scanSiteImages();
    scanPageMeta();

    // Set up periodic rescanning to catch dynamic content
    const interval = setInterval(() => {
      console.log('Performing periodic site scan...');
      scanSiteImages();
      scanPageMeta();
    }, 15000); // Rescan every 15 seconds for more responsive updates

    return () => {
      console.log('Cleaning up site scanner...');
      clearInterval(interval);
    };
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
