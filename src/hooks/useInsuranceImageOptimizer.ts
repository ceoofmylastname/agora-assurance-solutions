
import { useState, useEffect } from 'react';
import { generateInsuranceSpecificAltText, optimizeImageForInsurance, InsuranceImageContext } from '@/utils/insuranceImageOptimizer';
import { useToast } from '@/hooks/use-toast';
import { compressImageToWebP } from '@/utils/webpConverter';

export const useInsuranceImageOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedCount, setOptimizedCount] = useState(0);
  const { toast } = useToast();

  const optimizeAllImages = async () => {
    setIsOptimizing(true);
    setOptimizedCount(0);
    
    try {
      const images = document.querySelectorAll('img');
      let count = 0;
      let totalSavings = 0;
      
      const processedImages = Array.from(images).map(async (img) => {
        const context: InsuranceImageContext = {
          filename: img.src.split('/').pop() || '',
          usedIn: [window.location.pathname],
          element: img,
          isHeroImage: img.src.includes('hero') || img.classList.contains('hero'),
          isTeamMember: img.src.includes('team') || img.classList.contains('team'),
          isProductImage: img.src.includes('product') || img.classList.contains('product'),
          isCarrierLogo: img.src.includes('logo') || img.classList.contains('logo')
        };
        
        // Generate and apply insurance-specific alt text if missing or generic
        const currentAlt = img.alt || '';
        if (!currentAlt || currentAlt.length < 10 || currentAlt.includes('image') || currentAlt.includes('photo')) {
          const newAlt = generateInsuranceSpecificAltText(context);
          img.setAttribute('alt', newAlt);
          count++;
        }
        
        // Apply performance optimizations
        optimizeImageForInsurance(img);
        
        // Check if we can optimize the image format/size
        if (img.src && !img.src.startsWith('data:') && !img.src.includes('.webp') && 
            (img.src.includes('.jpg') || img.src.includes('.jpeg') || img.src.includes('.png'))) {
          try {
            // Add responsive attributes
            if (!img.hasAttribute('srcset') && img.width > 0) {
              // Apply responsive srcset based on natural width
              const naturalWidth = img.naturalWidth || img.width;
              
              // Don't apply srcset to very small images
              if (naturalWidth > 200) {
                const imgSrc = img.src.split('?')[0]; // Remove query params
                
                // Create srcset with responsive sizes
                const smallWidth = Math.round(naturalWidth * 0.5);
                const mediumWidth = naturalWidth;
                const largeWidth = Math.round(naturalWidth * 1.5);
                
                const srcset = `${imgSrc}?w=${smallWidth} ${smallWidth}w, ${imgSrc}?w=${mediumWidth} ${mediumWidth}w, ${imgSrc}?w=${largeWidth} ${largeWidth}w`;
                img.setAttribute('srcset', srcset);
                
                // Add appropriate sizes attribute
                if (!img.hasAttribute('sizes')) {
                  img.setAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw');
                }
              }
            }
            
            // Only try to compress if it's a large image (>20KB)
            if (img.complete && img.naturalWidth > 0) {
              // Try to compress the image if it's a local image
              const isLocalOrUpload = img.src.includes(window.location.origin) || 
                                     !img.src.startsWith('http') ||
                                     img.src.includes('lovable-uploads');
              
              if (isLocalOrUpload) {
                const result = await compressImageToWebP(img);
                if (result && result.savings > 0) {
                  totalSavings += result.savings;
                  
                  // If significant savings (>20KB), replace the image
                  if (result.savings > 20 * 1024) {
                    img.src = result.webpDataUrl;
                  }
                }
              }
            }
          } catch (err) {
            console.warn('Could not optimize image:', img.src, err);
          }
        }
      });
      
      await Promise.all(processedImages);
      
      setOptimizedCount(count);
      
      const savingsInKB = Math.round(totalSavings / 1024);
      
      toast({
        title: "Image Optimization Complete",
        description: `Optimized ${count} images with alt text and saved ~${savingsInKB}KB with image compression.`,
      });
      
    } catch (error) {
      console.error('Image optimization failed:', error);
      toast({
        title: "Optimization Failed",
        description: "Some images could not be optimized. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const scanImageIssues = () => {
    const images = document.querySelectorAll('img');
    const issues = {
      missingAlt: 0,
      genericAlt: 0,
      largeFiles: 0,
      notWebP: 0,
      noLazyLoading: 0,
      oversized: 0
    };
    
    images.forEach((img) => {
      const alt = img.alt || '';
      const src = img.src || '';
      
      if (!alt) {
        issues.missingAlt++;
      } else if (alt.length < 10 || alt.includes('image') || alt.includes('photo')) {
        issues.genericAlt++;
      }
      
      if (!src.includes('.webp')) {
        issues.notWebP++;
      }
      
      if (!img.hasAttribute('loading')) {
        issues.noLazyLoading++;
      }
      
      // Check for oversized images
      if (img.naturalWidth > 0 && img.width > 0) {
        // If natural width is more than 2x the display width, flag as oversized
        if (img.naturalWidth > img.width * 2) {
          issues.oversized++;
        }
      }
    });
    
    return issues;
  };

  return {
    optimizeAllImages,
    scanImageIssues,
    isOptimizing,
    optimizedCount
  };
};
