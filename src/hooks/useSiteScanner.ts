import { useState, useEffect } from 'react';
import { generateInsuranceSpecificAltText } from '@/utils/insuranceImageOptimizer';

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
  fileSize?: number;
  canConvertToWebP: boolean;
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
  const [isConverting, setIsConverting] = useState<string | null>(null);

  // Normalize URL for consistent comparison
  const normalizeUrl = (url: string): string => {
    try {
      // Handle relative URLs
      if (url.startsWith('/')) {
        url = window.location.origin + url;
      }
      
      // Create URL object to normalize
      const urlObj = new URL(url);
      
      // Remove query parameters and fragments that don't affect the actual image
      urlObj.search = '';
      urlObj.hash = '';
      
      return urlObj.href;
    } catch (error) {
      // If URL parsing fails, return original
      return url;
    }
  };

  // Get all internal links from the current site
  const getAllSitePages = async (): Promise<string[]> => {
    const baseUrl = window.location.origin;
    const visitedUrls = new Set<string>();
    const urlsToVisit = ['/'];
    
    // Add common pages that might not be linked
    const commonPages = [
      '/', '/blog', '/services', '/contact', '/faq', 
      '/life-coverage', '/wealth-solutions', '/protection-plans',
      '/services/term-life', '/services/whole-life', '/services/universal-life',
      '/services/indexed-universal-life', '/services/final-expense',
      '/services/mortgage-protection', '/services/annuities'
    ];
    
    commonPages.forEach(page => {
      if (!urlsToVisit.includes(page)) {
        urlsToVisit.push(page);
      }
    });

    // Scan current page for internal links
    try {
      const links = document.querySelectorAll('a[href]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          const cleanUrl = href.split('#')[0].split('?')[0];
          if (!urlsToVisit.includes(cleanUrl) && cleanUrl !== '/') {
            urlsToVisit.push(cleanUrl);
          }
        }
      });
    } catch (error) {
      console.log('Could not scan current page for links:', error);
    }

    return urlsToVisit.slice(0, 20); // Limit to prevent excessive requests
  };

  const scanPageForImages = async (url: string): Promise<SiteImage[]> => {
    return new Promise((resolve) => {
      console.log(`Scanning page: ${url}`);
      
      // Create an iframe to load the page
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      
      const cleanup = () => {
        document.body.removeChild(iframe);
      };

      iframe.onload = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) {
            cleanup();
            resolve([]);
            return;
          }

          const scannedImages: SiteImage[] = [];
          
          // Scan IMG elements
          const imageElements = doc.querySelectorAll('img');
          console.log(`Found ${imageElements.length} img elements on ${url}`);
          
          imageElements.forEach((img, index) => {
            const src = img.src || img.getAttribute('src') || img.getAttribute('data-src') || '';
            const alt = img.alt || '';
            const title = img.title || '';
            
            if (src && !src.startsWith('data:') && !src.includes('placeholder.svg')) {
              const normalizedSrc = normalizeUrl(src);
              const filename = normalizedSrc.split('/').pop()?.split('?')[0] || `image-${index}`;
              const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
              const width = img.naturalWidth || img.width || 0;
              const height = img.naturalHeight || img.height || 0;
              
              scannedImages.push({
                id: `${url}-img-${index}-${Date.now()}`,
                src: normalizedSrc,
                alt,
                title,
                filename,
                format,
                width,
                height,
                usedIn: [url],
                hasAlt: alt.length > 0,
                hasTitleAttr: title.length > 0,
                isOptimized: alt.length > 0 && alt.length <= 125 && !['BMP', 'TIFF'].includes(format),
                canConvertToWebP: ['JPG', 'JPEG', 'PNG', 'GIF'].includes(format)
              });
            }
          });

          // Scan CSS background images more selectively
          const elementsWithBgImages = doc.querySelectorAll('[style*="background-image"], .hero, .banner, .bg-');
          let bgImageCount = 0;
          
          elementsWithBgImages.forEach((element) => {
            try {
              const computedStyle = iframe.contentWindow?.getComputedStyle(element);
              const backgroundImage = computedStyle?.backgroundImage;
              
              if (backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('url(')) {
                const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (urlMatch && urlMatch[1] && !urlMatch[1].startsWith('data:') && !urlMatch[1].includes('placeholder')) {
                  const normalizedSrc = normalizeUrl(urlMatch[1]);
                  const filename = normalizedSrc.split('/').pop()?.split('?')[0] || `bg-image-${bgImageCount}`;
                  const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
                  
                  scannedImages.push({
                    id: `${url}-bg-${bgImageCount}-${Date.now()}`,
                    src: normalizedSrc,
                    alt: '',
                    title: '',
                    filename,
                    format,
                    usedIn: [url],
                    hasAlt: false,
                    hasTitleAttr: false,
                    isOptimized: false,
                    canConvertToWebP: ['JPG', 'JPEG', 'PNG', 'GIF'].includes(format)
                  });
                  bgImageCount++;
                }
              }
            } catch (e) {
              // Ignore cross-origin or other access errors
            }
          });

          console.log(`Scanned ${scannedImages.length} total images from ${url}`);
          cleanup();
          resolve(scannedImages);
        } catch (error) {
          console.error(`Error scanning ${url}:`, error);
          cleanup();
          resolve([]);
        }
      };

      iframe.onerror = () => {
        cleanup();
        resolve([]);
      };

      // Set a timeout to prevent hanging
      setTimeout(() => {
        cleanup();
        resolve([]);
      }, 5000);

      document.body.appendChild(iframe);
      iframe.src = url;
    });
  };

  const scanSiteImages = async () => {
    console.log('Starting comprehensive site-wide image scan...');
    setIsScanning(true);
    
    // Reset images state to prevent accumulation
    setImages([]);
    
    try {
      const allPages = await getAllSitePages();
      console.log(`Scanning ${allPages.length} pages for images...`);
      
      // Collect all images from all pages
      const allScannedImages: SiteImage[] = [];
      
      // Scan current page first (immediate feedback)
      const currentPageImages = await scanCurrentPageImages();
      allScannedImages.push(...currentPageImages);
      console.log(`Current page has ${currentPageImages.length} images`);

      // Then scan other pages
      for (const pageUrl of allPages) {
        if (pageUrl === window.location.pathname) continue; // Skip current page
        
        try {
          const pageImages = await scanPageForImages(pageUrl);
          allScannedImages.push(...pageImages);
          console.log(`Page ${pageUrl} contributed ${pageImages.length} images`);
          
          // Small delay to prevent overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to scan ${pageUrl}:`, error);
        }
      }

      console.log(`Total images collected before deduplication: ${allScannedImages.length}`);

      // Improved deduplication: merge images by normalized URL
      const imageMap = new Map<string, SiteImage>();
      
      allScannedImages.forEach(img => {
        const normalizedSrc = normalizeUrl(img.src);
        const existing = imageMap.get(normalizedSrc);
        
        if (existing) {
          // Merge the usage pages
          existing.usedIn = [...new Set([...existing.usedIn, ...img.usedIn])];
          
          // Keep the image with alt text if available
          if (!existing.hasAlt && img.hasAlt) {
            existing.alt = img.alt;
            existing.hasAlt = true;
            existing.isOptimized = img.isOptimized;
          }
        } else {
          imageMap.set(normalizedSrc, { 
            ...img, 
            src: normalizedSrc,
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          });
        }
      });

      const uniqueImages = Array.from(imageMap.values());
      console.log(`Unique images after deduplication: ${uniqueImages.length}`);
      
      setImages(uniqueImages);

      // Calculate metrics
      const totalImages = uniqueImages.length;
      const imagesWithoutAlt = uniqueImages.filter(img => !img.hasAlt).length;
      const overallScore = totalImages > 0 
        ? Math.round(((totalImages - imagesWithoutAlt) / totalImages) * 100)
        : 100;
      
      setMetrics({
        overallScore,
        totalImages,
        imagesWithoutAlt,
        totalPages: allPages.length,
        pagesWithIssues: imagesWithoutAlt > 0 ? 1 : 0,
        lastUpdated: new Date()
      });

      console.log(`Site-wide scan complete. Found ${totalImages} unique images across ${allPages.length} pages.`);

    } catch (error) {
      console.error('Error during site-wide image scan:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const scanCurrentPageImages = async (): Promise<SiteImage[]> => {
    const scannedImages: SiteImage[] = [];
    
    // Scan all IMG elements in the current DOM
    const imageElements = document.querySelectorAll('img');
    imageElements.forEach((img, index) => {
      const src = img.src || img.getAttribute('src') || img.getAttribute('data-src') || '';
      const alt = img.alt || '';
      const title = img.title || '';
      
      if (src && !src.startsWith('data:') && !src.includes('placeholder.svg')) {
        const normalizedSrc = normalizeUrl(src);
        const filename = normalizedSrc.split('/').pop()?.split('?')[0] || `image-${index}`;
        const format = filename.split('.').pop()?.toUpperCase() || 'UNKNOWN';
        const width = img.naturalWidth || img.width || 0;
        const height = img.naturalHeight || img.height || 0;
        
        scannedImages.push({
          id: `current-img-${index}-${Date.now()}`,
          src: normalizedSrc,
          alt,
          title,
          filename,
          format,
          width,
          height,
          usedIn: [window.location.pathname],
          hasAlt: alt.length > 0,
          hasTitleAttr: title.length > 0,
          isOptimized: alt.length > 0 && alt.length <= 125 && !['BMP', 'TIFF'].includes(format),
          element: img,
          canConvertToWebP: ['JPG', 'JPEG', 'PNG', 'GIF'].includes(format)
        });
      }
    });

    return scannedImages;
  };

  const convertToWebP = async (imageId: string): Promise<void> => {
    const image = images.find(img => img.id === imageId);
    if (!image || !image.canConvertToWebP) {
      throw new Error('Image cannot be converted to WebP');
    }

    setIsConverting(imageId);
    
    try {
      // Create a canvas to convert the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            // Convert to WebP with quality 0.8
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  // Create download link
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = image.filename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  
                  setIsConverting(null);
                  resolve();
                } else {
                  reject(new Error('Failed to convert image'));
                }
              },
              'image/webp',
              0.8
            );
          } else {
            reject(new Error('Could not get canvas context'));
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.crossOrigin = 'anonymous';
        img.src = image.src;
      });
    } catch (error) {
      console.error('WebP conversion failed:', error);
      throw error;
    } finally {
      setIsConverting(null);
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
          isOptimized: newAlt.length > 0 && newAlt.length <= 125 && !['BMP', 'TIFF'].includes(img.format)
        };
        
        // Update the actual DOM element if it exists
        if (img.element) {
          img.element.setAttribute('alt', newAlt);
        } else {
          const imgElement = document.querySelector(`img[src="${img.src}"]`) as HTMLImageElement;
          if (imgElement) {
            imgElement.setAttribute('alt', newAlt);
          }
        }
        
        return updatedImg;
      }
      return img;
    }));
  };

  const generateAISuggestion = (image: SiteImage): string => {
    const context = {
      filename: image.filename,
      usedIn: image.usedIn,
      element: image.element,
      isHeroImage: image.src.includes('hero') || image.src.includes('banner'),
      isTeamMember: image.src.includes('team') || image.src.includes('advisor') || image.src.includes('agent'),
      isProductImage: image.src.includes('product') || image.src.includes('coverage'),
      isCarrierLogo: image.src.includes('logo') || image.src.includes('carrier')
    };
    
    return generateInsuranceSpecificAltText(context);
  };

  useEffect(() => {
    // Initial scan
    scanSiteImages();
    scanPageMeta();

    // Remove periodic scanning to prevent interference and accumulation
    // Only scan on manual trigger or initial load
  }, []);

  return {
    images,
    pages,
    metrics,
    isScanning,
    isConverting,
    scanSiteImages,
    scanPageMeta,
    updateImageAlt,
    generateAISuggestion,
    convertToWebP
  };
};
