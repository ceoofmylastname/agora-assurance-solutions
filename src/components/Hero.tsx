import { ArrowRight, Shield, Home, Calculator, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
        duration: isMobile ? 0.6 : 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: isMobile ? 15 : 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[65vh] sm:h-[70vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
          <img src="/lovable-uploads/3e95af8d-5845-4810-af42-d9884a4e67bb.png" alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-center'}`} loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="font-extrabold text-white leading-tight tracking-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl px-2" variants={itemVariants} style={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}>Cut the Chaos. 
Get Covered.</motion.h1>
              <motion.p className="text-blue-100 mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4" variants={itemVariants}>
                We are dedicated to supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI—so you can make informed protection decisions in one convenient place.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 md:mt-10 justify-center items-center px-4" variants={itemVariants}>
                {/* Discover More button */}
                <button className="w-full sm:w-auto min-h-[48px] px-6 md:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-base font-medium active:scale-95 touch-manipulation" onClick={scrollToProjects}>
                  Discover More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                {/* Contact Us button */}
                <button className="w-full sm:w-auto min-h-[48px] px-6 md:px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-base font-medium border-2 border-white active:scale-95 touch-manipulation" onClick={scrollToContact}>
                  Contact Us
                  <MessageSquare className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 touch-manipulation" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Shield className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Compare Insurance Plans</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Explore a variety of tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 touch-manipulation" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Calculator className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Get Personalized Quote</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Instantly receive customized quotes from top carriers—no phone calls required.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 touch-manipulation" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Licensed Advisor</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Hands-on guidance from state-regulated professionals, ensuring solutions aligned with your family's goals.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 touch-manipulation" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Home className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Learn Our Services</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Deep dive into our full suite—tax, asset protection, annuities, life settlements, and more.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};
export default Hero;