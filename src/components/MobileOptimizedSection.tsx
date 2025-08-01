import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  desktopClassName?: string;
  enableSwipeGestures?: boolean;
}

export const MobileOptimizedSection = ({
  children,
  className = '',
  mobileClassName = '',
  desktopClassName = '',
  enableSwipeGestures = false
}: MobileOptimizedSectionProps) => {
  const isMobile = useIsMobile();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipeGestures) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipeGestures) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!enableSwipeGestures || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      // Emit custom event for swipe detection
      window.dispatchEvent(new CustomEvent('mobile-swipe', {
        detail: { direction: isLeftSwipe ? 'left' : 'right' }
      }));
    }
  };

  const combinedClassName = [
    className,
    isMobile ? mobileClassName : desktopClassName,
    'transition-all duration-300'
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={combinedClassName}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};

export default MobileOptimizedSection;