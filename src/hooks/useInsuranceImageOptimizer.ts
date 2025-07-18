
import { useState, useEffect } from 'react';
import { generateInsuranceSpecificAltText, optimizeImageForInsurance, InsuranceImageContext } from '@/utils/insuranceImageOptimizer';
import { useToast } from '@/hooks/use-toast';

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
      
      images.forEach((img) => {
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
      });
      
      setOptimizedCount(count);
      
      toast({
        title: "Image Optimization Complete",
        description: `Optimized ${count} images with insurance-specific alt text and performance improvements.`,
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
      noLazyLoading: 0
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
