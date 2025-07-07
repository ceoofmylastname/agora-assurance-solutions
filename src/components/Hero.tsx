
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
          <img 
            src="/lovable-uploads/3e95af8d-5845-4810-af42-d9884a4e67bb.png" 
            alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" 
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
                {/* Discover More button */}
                <button 
                  className="w-full sm:w-auto min-h-[48px] px-6 md:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-base font-medium active:scale-95 touch-manipulation" 
                  onClick={scrollToProjects}
                >
                  Discover More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                {/* Contact Us button */}
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
      
      {/* Modern Professional Features Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-20 w-32 h-32 bg-purple-100/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-1/2 w-24 h-24 bg-cyan-100/25 rounded-full blur-2xl"></div>
        </div>

        <motion.div 
          className="relative mt-8 sm:mt-12 md:mt-16" 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.2
          }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full mb-4"
              variants={itemVariants}
            >
              <span className="text-[#15AFF7] font-medium text-sm">Why Choose Agora</span>
            </motion.div>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Insurance Made <span className="bg-gradient-to-r from-[#15AFF7] to-blue-600 bg-clip-text text-transparent">Simple</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Experience the future of insurance with our AI-powered platform and expert guidance
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: Shield,
                title: "Compare Insurance Plans",
                description: "Explore a variety of tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans.",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: Calculator,
                title: "Get Personalized Quote",
                description: "Instantly receive customized quotes from top carriers—no phone calls required.",
                gradient: "from-purple-500 to-pink-500", 
                delay: 0.1
              },
              {
                icon: MessageSquare,
                title: "Licensed Advisor",
                description: "Hands-on guidance from state-regulated professionals, ensuring solutions aligned with your family's goals.",
                gradient: "from-green-500 to-emerald-500",
                delay: 0.2
              },
              {
                icon: Home,
                title: "Learn Our Services",
                description: "Deep dive into our full suite—tax, asset protection, annuities, life settlements, and more.",
                gradient: "from-orange-500 to-red-500",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Glassmorphism Card */}
                <div className="relative bg-white/80 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Floating Icon Container */}
                  <motion.div 
                    className={`relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} flex items-center justify-center rounded-xl mb-4 sm:mb-6 shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    
                    {/* Animated Ring */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl border-2 border-white/30"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300"
                    layoutId={`title-${index}`}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    layoutId={`description-${index}`}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Hover Effect Line */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-70"
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: feature.delay 
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="text-center mt-12 sm:mt-16 md:mt-20"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
            >
              <span className="font-medium">Explore All Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
