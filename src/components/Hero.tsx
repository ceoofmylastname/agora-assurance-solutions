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

  // Enhanced card variants with 3D effects
  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      rotateX: 15,
      scale: 0.9
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    })
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      rotateY: 5,
      rotateX: 5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[65vh] sm:h-[70vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
          <img 
            src="https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg" 
            alt="Happy multi-generational family sitting together showing life insurance protection and family financial security planning" 
            className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-center'}`}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 
                className="font-extrabold text-white leading-tight tracking-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl px-2" 
                variants={itemVariants}
                style={{
                  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              >
                You Deserve Clarity—Instant Insurance, Zero Confusion
              </motion.h1>
              <motion.p className="text-blue-100 mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4" variants={itemVariants}>
                We are dedicated to supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI—so you can make informed protection decisions in one convenient place.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 md:mt-10 justify-center items-center px-4" variants={itemVariants}>
                <button 
                  className="w-full sm:w-auto min-h-[48px] px-6 md:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-base font-medium active:scale-95 touch-manipulation" 
                  onClick={scrollToProjects}
                >
                  Discover More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button 
                  className="w-full sm:w-auto min-h-[48px] px-6 md:px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-base font-medium border-2 border-white active:scale-95 touch-manipulation" 
                  onClick={scrollToContact}
                >
                  Contact Us
                  <MessageSquare className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Enhanced 3D Feature Cards Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 -top-20 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>
        
        {/* Section Header */}
        <motion.div 
          className="relative text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
              ✨ AI-Powered Protection
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            The Power of Protection
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Four ways we help you take control of your future—in seconds
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <motion.div 
          className="relative mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 perspective-1000"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Card 1 - Compare Plans */}
          <motion.div 
            custom={0}
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 transform-gpu"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div variants={cardHoverVariants}>
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Icon Container */}
              <motion.div 
                className="relative w-16 h-16 md:w-18 md:h-18 mb-6 mx-auto"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-sm" />
                </div>
                {/* Floating particles effect */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 text-center group-hover:text-blue-900 transition-colors duration-300">
                Compare Plans Side-by-Side
              </h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Instantly preview life, mortgage, annuity & final expense options in one powerful view.
              </p>
              
              {/* Hover arrow */}
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Card 2 - Get Quote */}
          <motion.div 
            custom={1}
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 transform-gpu"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div variants={cardHoverVariants}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div 
                className="relative w-16 h-16 md:w-18 md:h-18 mb-6 mx-auto"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center rounded-xl shadow-lg">
                  <Calculator className="w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-sm" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 text-center group-hover:text-green-900 transition-colors duration-300">
                Get Your Personalized Quote
              </h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                See what you qualify for in seconds. No calls. No confusion. Just clarity.
              </p>
              
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5 text-green-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Card 3 - Licensed Advisors */}
          <motion.div 
            custom={2}
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 transform-gpu"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div variants={cardHoverVariants}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div 
                className="relative w-16 h-16 md:w-18 md:h-18 mb-6 mx-auto"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-xl shadow-lg">
                  <MessageSquare className="w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-sm" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 text-center group-hover:text-purple-900 transition-colors duration-300">
                Licensed Advisors On-Demand
              </h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Speak to real professionals who prioritize protection over commissions.
              </p>
              
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Card 4 - Advanced Services */}
          <motion.div 
            custom={3}
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 transform-gpu"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
              backdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div variants={cardHoverVariants}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div 
                className="relative w-16 h-16 md:w-18 md:h-18 mb-6 mx-auto"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center rounded-xl shadow-lg">
                  <Home className="w-8 h-8 md:w-9 md:h-9 text-white drop-shadow-sm" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 text-center group-hover:text-orange-900 transition-colors duration-300">
                Explore Advanced Services
              </h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                From tax-free income strategies to asset protection, our platform simplifies it all.
              </p>
              
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5 text-orange-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
