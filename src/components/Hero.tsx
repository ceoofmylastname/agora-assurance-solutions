
import { ArrowRight, Shield, Home, Calculator, MessageSquare, Star, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
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
    hidden: { y: isMobile ? 15 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
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

  const features = [
    {
      icon: Shield,
      title: "Compare Plans Side-by-Side",
      description: "Instantly preview life, mortgage, annuity & final expense options in one powerful view.",
      badge: "AI-Powered",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Calculator,
      title: "Get Your Personalized Quote",
      description: "See what you qualify for in seconds. No calls. No confusion. Just clarity.",
      badge: "Instant",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: MessageSquare,
      title: "Licensed Advisors On-Demand",
      description: "Speak to real professionals who prioritize protection over commissions.",
      badge: "Human Expert",
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      icon: Home,
      title: "Explore Advanced Services",
      description: "From tax-free income strategies to asset protection, our platform simplifies it all.",
      badge: "Premium",
      gradient: "from-orange-500 to-yellow-400"
    }
  ];

  return (
    <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Hero Banner */}
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
      
      {/* Premium Feature Cards Section */}
      <div className="relative -mt-20 z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-3xl animate-pulse-slow"></div>
        
        <motion.div 
          className="relative py-12 sm:py-16 md:py-20"
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full border border-yellow-400/30 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium uppercase tracking-wider">Explore the Power of Protection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              4 Ways We Help You Take Control
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Experience next-generation insurance technology designed for your peace of mind
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                {/* Card Background with Glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500 blur-xl`}></div>
                
                {/* Card Content */}
                <div className="relative p-6 sm:p-8 h-full flex flex-col">
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r ${feature.gradient} rounded-full text-xs font-medium text-white`}>
                      <Zap className="w-3 h-3" />
                      {feature.badge}
                    </span>
                  </div>

                  {/* Icon with Gradient Background */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-12 md:mt-16"
            variants={itemVariants}
          >
            <button 
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 group font-medium text-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95 touch-manipulation"
            >
              Start Your Protection Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
