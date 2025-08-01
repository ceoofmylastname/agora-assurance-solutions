import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeight?: string;
}

export const LazySection = ({ 
  children, 
  fallback, 
  rootMargin = '100px',
  threshold = 0.1,
  minHeight = '200px'
}: LazySectionProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div 
      ref={ref} 
      style={{ minHeight: isInView ? 'auto' : minHeight }}
      className="w-full"
    >
      {isInView ? children : (fallback || <div className="w-full animate-pulse bg-gray-100" style={{ height: minHeight }} />)}
    </div>
  );
};