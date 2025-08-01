import { motion } from "framer-motion";
import { Shield, Calculator, MessageSquare, Home } from "lucide-react";
import HeroCard from "./HeroCard";
import { cardContainerVariants } from "./HeroAnimations";

const cardData = [
  {
    icon: Shield,
    title: "What's the best way to compare term life insurance for young families in Florida?",
    description: "Compare tailored life, mortgage-protection, final expense, and annuity plans side-by-side with instant quotes from top-rated carriers across all 50 states."
  },
  {
    icon: Calculator,
    title: "How to get instant life insurance quotes for 30-year-olds without medical exam?",
    description: "Get personalized quotes from top carriers in under 60 seconds—no medical exams, lengthy forms, or phone calls required."
  },
  {
    icon: MessageSquare,
    title: "Can I speak with licensed insurance agents who understand my state's requirements?",
    description: "Connect with state-licensed professionals who understand local regulations and ensure coverage meets your family's specific needs and budget."
  },
  {
    icon: Home,
    title: "Best mortgage protection insurance for new homeowners in Texas - what are my options?",
    description: "Complete financial protection including mortgage protection, tax strategies, asset protection, annuities, and retirement planning tailored to your state."
  }
];

const HeroCards = () => {
  return (
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
      <motion.div 
        className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6" 
        variants={cardContainerVariants} 
        initial="hidden" 
        animate="visible"
      >
        {cardData.map((card, index) => (
          <HeroCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroCards;