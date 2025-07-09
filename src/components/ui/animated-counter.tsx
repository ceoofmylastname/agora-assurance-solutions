import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = ""
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, {
    once: true,
    margin: "-100px"
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animate(timestamp);
    };

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(startAnimation);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);

  const formatNumber = (num: number) => {
    if (end >= 1000 && decimals === 0) {
      return Math.floor(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return (
    <span ref={countRef} className={`font-bold tabular-nums ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;