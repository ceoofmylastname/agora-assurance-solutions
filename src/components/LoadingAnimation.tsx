
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative flex space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
