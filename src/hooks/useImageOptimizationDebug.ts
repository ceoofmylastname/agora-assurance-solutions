
import { useEffect, useCallback } from 'react';

export const useImageOptimizationDebug = () => {
  const checkForOversizedImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Skip SVGs and images with no src
      if (!img.src || img.src.includes('data:image/svg+xml') || !img.complete) {
        return;
      }

      // Check if image is oversized (displayed size vs actual size)
      const displayWidth = img.clientWidth;
      const displayHeight = img.clientHeight;
      const actualWidth = img.naturalWidth;
      const actualHeight = img.naturalHeight;

      // Only flag if the actual size is significantly larger than displayed size
      if (actualWidth > displayWidth * 1.5 || actualHeight > displayHeight * 1.5) {
        console.warn('Oversized image detected:', {
          element: img,
          src: img.src,
          displaySize: `${displayWidth}x${displayHeight}`,
          actualSize: `${actualWidth}x${actualHeight}`,
          sizeRatio: `${(actualWidth / displayWidth).toFixed(1)}x / ${(actualHeight / displayHeight).toFixed(1)}x larger than needed`,
          loadTime: img.getAttribute('data-load-time') || 'unknown'
        });
      }

      // Check for base64 encoded images (they're usually inefficient)
      if (img.src.startsWith('data:image') && img.src.length > 1000) {
        console.warn('Base64 encoded image detected:', {
          element: img,
          sizeInKB: Math.round(img.src.length / 1000),
          displaySize: `${displayWidth}x${displayHeight}`
        });
      }
    });
  }, []);

  // Track image load times
  const trackImageLoadTimes = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete && !img.hasAttribute('data-tracking')) {
        img.setAttribute('data-tracking', 'true');
        const startTime = performance.now();
        
        img.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          img.setAttribute('data-load-time', `${loadTime.toFixed(0)}ms`);
        });
      }
    });
  }, []);

  // Optimize function to be called on page load
  const runImageOptimizationDebug = useCallback(() => {
    // Add a slight delay to ensure all images have loaded
    setTimeout(() => {
      trackImageLoadTimes();
      checkForOversizedImages();
    }, 1000);
  }, [trackImageLoadTimes, checkForOversizedImages]);

  return { runImageOptimizationDebug };
};
