import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  mobileAspectRatio?: string;
  desktopAspectRatio?: string;
  mobilePosition?: string;
  desktopPosition?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  onLoad,
  mobileAspectRatio,
  desktopAspectRatio,
  mobilePosition = 'center',
  desktopPosition = 'center'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    // Fallback: show image after 2 seconds if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
          clearTimeout(fallbackTimer);
        }
      },
      { rootMargin: '50px' }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Still set loaded to hide loading states
  };

  const generateSrcSet = (baseSrc: string) => {
    // For uploaded assets, use the original source
    if (baseSrc.includes('/lovable-uploads/') || baseSrc.includes('/public/')) {
      return baseSrc;
    }
    
    const ext = baseSrc.split('.').pop();
    const base = baseSrc.replace(`.${ext}`, '');
    
    return `
      ${base}-400w.webp 400w,
      ${base}-800w.webp 800w,
      ${base}-1200w.webp 1200w,
      ${base}-1600w.webp 1600w,
      ${baseSrc} 1920w
    `.trim();
  };

  const getResponsiveStyles = () => {
    const mobileStyles = mobileAspectRatio ? { aspectRatio: mobileAspectRatio } : {};
    const desktopStyles = desktopAspectRatio ? { aspectRatio: desktopAspectRatio } : {};
    
    return {
      mobile: {
        ...mobileStyles,
        objectPosition: mobilePosition
      },
      desktop: {
        ...desktopStyles,
        objectPosition: desktopPosition
      }
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div 
      ref={placeholderRef}
      className={cn("relative overflow-hidden", className)}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        minHeight: height ? `${height}px` : undefined
      }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)',
            backgroundSize: blurDataURL ? 'cover' : '20px 20px',
            backgroundPosition: blurDataURL ? 'center' : '0 0, 10px 10px',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            objectPosition: window.innerWidth < 768 ? mobilePosition : desktopPosition
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      )}

      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};