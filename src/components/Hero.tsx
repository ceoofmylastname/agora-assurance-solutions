

import { ArrowRight, Shield, Home, Calculator, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroFamilyProtection from "@/assets/hero-family-protection.webp";

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
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[60vh] sm:h-[70vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
          <img src={heroFamilyProtection} alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-top' : 'object-top'}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-16 sm:pt-20 md:pt-24 lg:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words" variants={itemVariants}>
                Cut the Chaos. Get Covered.
              </motion.h1>
              <motion.p className="text-blue-100 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-light px-2 sm:px-4 mt-4 sm:mt-6" variants={itemVariants}>
                We're rewriting the insurance experience—no confusing terms, no endless forms, just fast, reliable coverage that puts you in control from the very first click.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center px-4 sm:px-0" variants={itemVariants}>
                <button className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium touch-manipulation" onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}>
                  Get Instant Quote
                  <Calculator className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
                
                <button className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium border-2 border-white touch-manipulation" onClick={() => window.open('https://crm.agoraassurancesolutions.com/widget/booking/foZnFDUFuB2fu0X5eDZn', '_blank')}>
                  Book Free Appointment
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Shield className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Compare Insurance Plans</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">Explore a variety of tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans.</p>
          </motion.div>
          
          <motion.div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Calculator className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Get Personalized Quote</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">Instantly receive customized quotes from top carriers—no phone calls required.</p>
          </motion.div>
          
          <motion.div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Licensed Advisor</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">Hands-on guidance from state-regulated professionals, ensuring solutions aligned with your family's goals.</p>
          </motion.div>
          
          <motion.div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-3 md:mb-4">
              <Home className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">Learn Our Services</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">Deep dive into our full suite—tax, asset protection, annuities, life settlements, and more.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;

