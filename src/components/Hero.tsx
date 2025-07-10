

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

  const cardContainerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      y: -4
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
  return <motion.div className="relative w-full -mt-16" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[calc(55vh+4rem)] sm:h-[calc(70vh+4rem)] md:h-[calc(500px+4rem)] lg:h-[calc(550px+4rem)] xl:h-[calc(600px+4rem)] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
                  <img 
                    src={heroFamilyProtection} 
                    alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" 
                    className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-[center_top]'}`}
                    loading="eager"
                    fetchPriority="high"
                    width={1920}
                    height={1080}
                  />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-12 sm:pt-20 md:pt-24 lg:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-end pb-8 sm:justify-center sm:pb-0 h-full">
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
        <motion.div 
          className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" 
          variants={cardContainerVariants} 
          initial="hidden" 
          animate="visible"
        >
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
                <Shield className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 relative z-10">What's the best way to compare term life insurance for young families in Florida?</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10">Compare tailored life, mortgage-protection, final expense, and annuity plans side-by-side with instant quotes from top-rated carriers across all 50 states.</p>
            </motion.div>
          
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
                <Calculator className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 relative z-10">How to get instant life insurance quotes for 30-year-olds without medical exam?</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10">Get personalized quotes from top carriers in under 60 seconds—no medical exams, lengthy forms, or phone calls required.</p>
            </motion.div>
          
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
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 relative z-10">Can I speak with licensed insurance agents who understand my state's requirements?</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10">Connect with state-licensed professionals who understand local regulations and ensure coverage meets your family's specific needs and budget.</p>
            </motion.div>
          
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
                <Home className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 relative z-10">Best mortgage protection insurance for new homeowners in Texas - what are my options?</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10">Complete financial protection including mortgage protection, tax strategies, asset protection, annuities, and retirement planning tailored to your state.</p>
            </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;

