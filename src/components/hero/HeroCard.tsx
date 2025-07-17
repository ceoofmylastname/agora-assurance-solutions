
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";

interface HeroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  gradient: string;
  accent: string;
  index: number;
  itemVariants: any;
}

const HeroCard = ({ 
  icon: Icon, 
  title, 
  description, 
  image, 
  imageAlt,
  imageTitle,
  gradient, 
  accent, 
  index, 
  itemVariants 
}: HeroCardProps) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full transform-gpu will-change-transform">
        <CardContent className="p-0">
          {/* Hero Image */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <motion.img 
              src={image}
              alt={imageAlt}
              title={imageTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transform-gpu"
              loading="lazy"
              width={400}
              height={224}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            />
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-80`}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            ></motion.div>
            <motion.div 
              className="absolute top-4 left-4 md:top-6 md:left-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.4, 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
              whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${accent} flex items-center justify-center text-white shadow-lg transform-gpu`}>
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-7">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors leading-tight">
              {title}
            </h3>
            
            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              {description}
            </p>
            
            <motion.button 
              className="w-full bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] text-white px-6 py-3 rounded-lg hover:from-[#0D94D1] hover:to-[#0A7FB0] transition-all duration-300 flex items-center justify-center group/btn font-medium shadow-lg hover:shadow-xl transform-gpu touch-manipulation min-h-[48px] text-sm md:text-base"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6, type: "spring", stiffness: 150 }}
              onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
              title={`Get instant quote for ${title.toLowerCase()} - Quick and easy process`}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroCard;
