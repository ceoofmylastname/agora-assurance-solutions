
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[60vh] sm:h-[65vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
          <img src="/lovable-uploads/3e95af8d-5845-4810-af42-d9884a4e67bb.png" alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-center'}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-16 sm:pt-20 md:pt-32 w-full">
          <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 
                className="font-extrabold text-white leading-tight tracking-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl px-2" 
                variants={itemVariants}
                style={{
                  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              >
                You Deserve Clarity—Instant Insurance, Zero Confusion
              </motion.h1>
              <motion.p className="text-blue-100 mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-3" variants={itemVariants}>
                We are dedicated to supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI—so you can make informed protection decisions in one convenient place.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center items-center px-3" variants={itemVariants}>
                {/* Discover More button */}
                <button className="w-full sm:w-auto min-h-[44px] px-4 sm:px-6 md:px-8 py-3 bg-[#15AFF7] text-white rounded-md hover:bg-[#0D94D1] transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium" onClick={e => {
                e.preventDefault();
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }}>
                  Discover More
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Contact Us button */}
                <button className="w-full sm:w-auto min-h-[44px] px-4 sm:px-6 md:px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium border-2 border-white" onClick={scrollToContact}>
                  Contact Us
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-3 sm:px-4 lg:px-8 mx-auto">
        <motion.div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Shield className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Compare Insurance Plans</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Explore a variety of tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans.</p>
          </motion.div>
          
          <motion.div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Calculator className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Get Personalized Quote</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Instantly receive customized quotes from top carriers—no phone calls required.</p>
          </motion.div>
          
          <motion.div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Licensed Advisor</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Hands-on guidance from state-regulated professionals, ensuring solutions aligned with your family's goals.</p>
          </motion.div>
          
          <motion.div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Home className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Learn Our Services</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Deep dive into our full suite—tax, asset protection, annuities, life settlements, and more.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
