
import { useState } from 'react';
import { PageMeta } from './useSiteScanner';

export const usePageScanner = () => {
  const [isScanning, setIsScanning] = useState(false);

  // Get all internal pages from the current site
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

    return urlsToVisit.slice(0, 15); // Limit to prevent excessive requests
  };

  const scanPageForMeta = async (url: string): Promise<PageMeta | null> => {
    return new Promise((resolve) => {
      console.log(`Scanning page meta for: ${url}`);
      
      // Create an iframe to load the page
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      
      const cleanup = () => {
        try {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        } catch (error) {
          console.log('Cleanup error:', error);
        }
      };

      iframe.onload = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) {
            cleanup();
            resolve(null);
            return;
          }

          const title = doc.title || '';
          const metaDescElement = doc.querySelector('meta[name="description"]');
          const metaDescription = metaDescElement?.getAttribute('content') || '';
          const h1Element = doc.querySelector('h1');
          const h1 = h1Element?.textContent || '';
          const h2Count = doc.querySelectorAll('h2').length;
          const h3Count = doc.querySelectorAll('h3').length;
          const hasCanonical = !!doc.querySelector('link[rel="canonical"]');
          const hasOgTags = !!doc.querySelector('meta[property^="og:"]');
          const titleLength = title.length;
          const descLength = metaDescription.length;

          // Identify issues
          const issues: string[] = [];
          if (!title) issues.push('Missing title tag');
          if (!metaDescription) issues.push('Missing meta description');
          if (!h1) issues.push('Missing H1 tag');
          if (titleLength > 60) issues.push('Title too long');
          if (titleLength < 30 && titleLength > 0) issues.push('Title too short');
          if (descLength > 160) issues.push('Description too long');
          if (descLength < 120 && descLength > 0) issues.push('Description too short');
          if (!hasCanonical) issues.push('Missing canonical tag');

          const pageData: PageMeta = {
            url,
            title,
            metaDescription,
            h1,
            h2Count,
            h3Count,
            hasCanonical,
            hasOgTags,
            titleLength,
            descLength,
            issues
          };

          cleanup();
          resolve(pageData);
        } catch (error) {
          console.error(`Error scanning meta for ${url}:`, error);
          cleanup();
          resolve(null);
        }
      };

      iframe.onerror = () => {
        cleanup();
        resolve(null);
      };

      // Set a timeout to prevent hanging
      setTimeout(() => {
        cleanup();
        resolve(null);
      }, 5000);

      document.body.appendChild(iframe);
      iframe.src = url;
    });
  };

  const scanCurrentPageMeta = (): PageMeta => {
    const title = document.title || '';
    const metaDescElement = document.querySelector('meta[name="description"]');
    const metaDescription = metaDescElement?.getAttribute('content') || '';
    const h1Element = document.querySelector('h1');
    const h1 = h1Element?.textContent || '';
    const h2Count = document.querySelectorAll('h2').length;
    const h3Count = document.querySelectorAll('h3').length;
    const hasCanonical = !!document.querySelector('link[rel="canonical"]');
    const hasOgTags = !!document.querySelector('meta[property^="og:"]');
    const titleLength = title.length;
    const descLength = metaDescription.length;

    // Identify issues
    const issues: string[] = [];
    if (!title) issues.push('Missing title tag');
    if (!metaDescription) issues.push('Missing meta description');
    if (!h1) issues.push('Missing H1 tag');
    if (titleLength > 60) issues.push('Title too long');
    if (titleLength < 30 && titleLength > 0) issues.push('Title too short');
    if (descLength > 160) issues.push('Description too long');
    if (descLength < 120 && descLength > 0) issues.push('Description too short');
    if (!hasCanonical) issues.push('Missing canonical tag');

    return {
      url: window.location.pathname,
      title,
      metaDescription,
      h1,
      h2Count,
      h3Count,
      hasCanonical,
      hasOgTags,
      titleLength,
      descLength,
      issues
    };
  };

  const scanAllPagesMeta = async (): Promise<PageMeta[]> => {
    console.log('Starting comprehensive site-wide meta scan...');
    setIsScanning(true);
    
    try {
      const allPages = await getAllSitePages();
      console.log(`Scanning ${allPages.length} pages for meta data...`);
      
      const allPageData: PageMeta[] = [];
      
      // Scan current page first (immediate feedback)
      const currentPageData = scanCurrentPageMeta();
      allPageData.push(currentPageData);
      console.log(`Current page meta scanned`);

      // Then scan other pages
      for (const pageUrl of allPages) {
        if (pageUrl === window.location.pathname) continue; // Skip current page
        
        try {
          const pageData = await scanPageForMeta(pageUrl);
          if (pageData) {
            allPageData.push(pageData);
            console.log(`Page ${pageUrl} meta scanned`);
          }
          
          // Small delay to prevent overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to scan meta for ${pageUrl}:`, error);
        }
      }

      console.log(`Meta scan complete. Found data for ${allPageData.length} pages.`);
      return allPageData;

    } catch (error) {
      console.error('Error during site-wide meta scan:', error);
      return [scanCurrentPageMeta()]; // Return at least current page data
    } finally {
      setIsScanning(false);
    }
  };

  const updatePageMeta = async (url: string, updates: Partial<Pick<PageMeta, 'title' | 'metaDescription' | 'h1'>>) => {
    console.log(`Updating meta for ${url}:`, updates);
    
    // If it's the current page, update the DOM directly
    if (url === window.location.pathname) {
      if (updates.title !== undefined) {
        document.title = updates.title;
      }
      
      if (updates.metaDescription !== undefined) {
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = updates.metaDescription;
      }
      
      if (updates.h1 !== undefined) {
        const h1Element = document.querySelector('h1');
        if (h1Element) {
          h1Element.textContent = updates.h1;
        }
      }
    }
    
    // Note: For other pages, we would need a backend to persist changes
    // For now, changes only apply to the current page
  };

  return {
    isScanning,
    scanAllPagesMeta,
    scanCurrentPageMeta,
    updatePageMeta
  };
};
