import { motion, MotionProps } from 'framer-motion';
import { ReactNode, memo, forwardRef } from 'react';

// Lightweight motion wrapper that reduces motion on slower devices
interface OptimizedMotionProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  reduced?: boolean;
  className?: string;
}

export const MotionOptimized = memo(forwardRef<HTMLDivElement, OptimizedMotionProps>(({ 
  children, 
  reduced = false, 
  initial, 
  animate, 
  transition,
  ...props 
}, ref) => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Simplified animations for performance
  const optimizedTransition = {
    duration: reduced || prefersReducedMotion ? 0.2 : 0.3,
    ease: "easeOut",
    ...transition
  };

  const optimizedInitial = prefersReducedMotion ? false : initial;
  const optimizedAnimate = prefersReducedMotion ? false : animate;

  return (
    <motion.div
      ref={ref}
      initial={optimizedInitial}
      animate={optimizedAnimate}
      transition={optimizedTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}));

MotionOptimized.displayName = 'MotionOptimized';