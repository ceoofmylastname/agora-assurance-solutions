
import { motion } from "framer-motion";
import HeroCard from "./HeroCard";
import { Shield, Calculator, Users } from "lucide-react";
import { containerVariants, itemVariants } from "./HeroAnimations";

const HeroCards = () => {
  const cards = [
    {
      icon: Calculator,
      title: "Instant Quotes",
      description: "Get personalized insurance quotes in seconds, not days",
      image: "/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png",
      imageAlt: "Instant insurance quote calculation - Modern digital interface showing quick price comparison",
      imageTitle: "Get Instant Insurance Quotes - Fast and Accurate",
      gradient: "from-blue-500/90 to-cyan-500/90",
      accent: "from-blue-600 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "Licensed advisors provide personalized recommendations tailored to your needs",
      image: "/lovable-uploads/25640b9f-b025-40a3-b338-b691298eab58.png",
      imageAlt: "Professional insurance advisor consultation - Licensed expert providing personalized guidance",
      imageTitle: "Expert Insurance Guidance - Licensed Professional Advisory",
      gradient: "from-emerald-500/90 to-teal-500/90",
      accent: "from-emerald-600 to-teal-600"
    },
    {
      icon: Users,
      title: "Family Protection",
      description: "Comprehensive coverage solutions to protect what matters most to you",
      image: "/lovable-uploads/4f729cbe-cd65-4873-bfa1-27e7df8b3d85.png",
      imageAlt: "Happy family protection - Multi-generational family enjoying security and peace of mind",
      imageTitle: "Complete Family Protection - Comprehensive Insurance Coverage",
      gradient: "from-purple-500/90 to-pink-500/90",
      accent: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 z-10">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <HeroCard 
                {...card} 
                index={index}
                itemVariants={itemVariants}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroCards;
