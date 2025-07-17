
import { motion } from "framer-motion";
import HeroBanner from "./hero/HeroBanner";
import HeroCards from "./hero/HeroCards";
import { containerVariants } from "./hero/HeroAnimations";

const Hero = () => {
  return (
    <motion.div 
      className="relative w-full -mt-16" 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      <HeroBanner />
      <HeroCards />
    </motion.div>
  );
};

export default Hero;
