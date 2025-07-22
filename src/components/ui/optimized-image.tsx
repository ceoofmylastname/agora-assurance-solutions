
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  fallbackSrc?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  onLoad,
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNFY0ME00MCAzMkgyNCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, isInView } = useIntersectionObserver({
    triggerOnce: true,
    rootMargin: '200px', // Start loading before it's in view
  });

  // Generate WebP source if not already a WebP image
  const isWebP = src.toLowerCase().endsWith('.webp');
  const webpSrc = isWebP ? src : src.replace(/\.(jpe?g|png|gif)$/i, '.webp');
  
  // Generate srcset for responsive images - create 3 sizes
  const generateSrcSet = (imgSrc: string) => {
    if (!width) return imgSrc;
    
    const baseSrc = imgSrc.split('?')[0]; // Remove any query params
    
    // If it's an external URL that doesn't support width parameters, return as is
    if (baseSrc.startsWith('http') && !baseSrc.includes('lovable-uploads')) {
      return imgSrc;
    }
    
    // Generate three sizes: small (0.5x), medium (1x), large (1.5x)
    const smallWidth = Math.round(width * 0.5);
    const mediumWidth = width;
    const largeWidth = Math.round(width * 1.5);
    
    // Create srcset with width descriptors
    return `${baseSrc}?w=${smallWidth} ${smallWidth}w, ${baseSrc}?w=${mediumWidth} ${mediumWidth}w, ${baseSrc}?w=${largeWidth} ${largeWidth}w`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  useEffect(() => {
    // If image is marked as priority, preload it
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {(priority || isInView) && (
        <picture>
          {!isWebP && (
            <source
              srcSet={generateSrcSet(webpSrc)}
              type="image/webp"
              sizes={sizes}
            />
          )}
          <img
            src={hasError ? fallbackSrc : src}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
      
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
          }}
        />
      )}
    </div>
  );
};
