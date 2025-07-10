import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'card' | 'headline' | 'content'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  
  const { 
    threshold = 0.3, 
    rootMargin = '0px 0px -100px 0px', 
    triggerOnce = true,
    delay = 0
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start card animation immediately
            setTimeout(() => {
              setIsVisible(true);
              setAnimationPhase('card');
              
              // Headline animation after 200ms
              setTimeout(() => {
                setAnimationPhase('headline');
                
                // Content animations after another 100ms
                setTimeout(() => {
                  setAnimationPhase('content');
                }, 100);
              }, 200);
            }, delay);
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
            setAnimationPhase('idle');
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible, animationPhase };
};