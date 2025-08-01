import { useState, useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  mobileHeight?: string;
  desktopHeight?: string;
  priority?: boolean;
  objectPosition?: {
    mobile: string;
    desktop: string;
  };
}

export const MobileImageOptimizer = ({
  src,
  alt,
  className = '',
  mobileHeight = '40vh',
  desktopHeight = '60vh',
  priority = false,
  objectPosition = { mobile: 'center', desktop: 'center top' }
}: MobileImageOptimizerProps) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  const heightClass = isMobile ? `h-[${mobileHeight}]` : `h-[${desktopHeight}]`;

  return (
    <div className={`relative overflow-hidden ${heightClass} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full"
        priority={priority}
        placeholder="blur"
        sizes={isMobile ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'}
        mobilePosition={objectPosition.mobile}
        desktopPosition={objectPosition.desktop}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading indicator for mobile */}
      {!isLoaded && isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
    </div>
  );
};

export default MobileImageOptimizer;