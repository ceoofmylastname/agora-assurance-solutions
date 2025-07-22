
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cardVariants, iconVariants } from "./HeroAnimations";

interface HeroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HeroCard = ({ icon: Icon, title, description }: HeroCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={cardVariants}
    >
      <motion.div 
        className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4"
        variants={iconVariants}
      >
        <Icon className="w-6 h-6 text-[#15AFF7]" />
      </motion.div>
      
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{description}</p>
    </motion.div>
  );
};

export default HeroCard;
