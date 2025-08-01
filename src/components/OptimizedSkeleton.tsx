import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'image' | 'button' | 'avatar';
  lines?: number;
  width?: string;
  height?: string;
}

export const OptimizedSkeleton = ({ 
  className, 
  variant = 'text',
  lines = 1,
  width,
  height
}: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";
  
  const variantClasses = {
    text: "h-4 w-full",
    card: "h-48 w-full",
    image: "aspect-video w-full",
    button: "h-10 w-24",
    avatar: "w-12 h-12 rounded-full"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses[variant],
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{ width: width, height: height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width: width, height: height }}
    />
  );
};