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
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
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
    // Use CSS custom properties for responsive behavior with enhanced mobile optimization
    return {
      '--aspect-ratio': desktopAspectRatio || 'auto',
      '--object-position': desktopPosition || 'center',
      '--mobile-aspect-ratio': mobileAspectRatio || desktopAspectRatio || 'auto',
      '--mobile-object-position': mobilePosition || desktopPosition || 'center',
      // Enhanced mobile optimization for hero images
      objectFit: 'cover',
      width: '100%',
      height: '100%'
    } as React.CSSProperties;
  };

  

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
      {isInView && (
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
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 mobile-responsive-image",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={getResponsiveStyles()}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};