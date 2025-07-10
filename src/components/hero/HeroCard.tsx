import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cardVariants, iconVariants, hoverVariants } from "./HeroAnimations";

interface HeroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HeroCard = ({ icon: Icon, title, description }: HeroCardProps) => {
  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-lg border border-blue-100/50 cursor-pointer overflow-hidden relative group"
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      animate={hoverVariants}
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div 
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-xl text-[#15AFF7] mb-3 md:mb-4 relative z-10"
        variants={iconVariants}
        whileHover={{ 
          scale: 1.1, 
          rotate: 5,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </motion.div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 relative z-10">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10">{description}</p>
    </motion.div>
  );
};

export default HeroCard;