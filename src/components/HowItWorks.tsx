
import { motion } from "framer-motion";
import { Search, Calculator, Users, Shield, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
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

  const cardHoverVariants = {
    rest: { 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      y: -12, 
      rotateX: 5,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const steps = [
    {
      step: "1",
      icon: Search,
      title: "Explore Products",
      description: "Browse term life, mortgage protection, final expense, annuities, life settlements, and tax solutions in one place."
    },
    {
      step: "2", 
      icon: Calculator,
      title: "Get Instant Quotes",
      description: "Enter a few details, then watch tailored rates from multiple carriers appear—no calls required."
    },
    {
      step: "3",
      icon: Users,
      title: "Connect with an Advisor", 
      description: "If you want personalized advice, schedule a free consult with one of our licensed experts."
    },
    {
      step: "4",
      icon: Shield,
      title: "Buy & Protect",
      description: "Complete your application online or by phone; our tech ensures fast underwriting and policy delivery."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-blue-100/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-2"
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Get protected in four simple steps—fast, transparent, and hassle-free
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative perspective-1000"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative bg-gradient-to-br from-white via-white to-blue-50/30 p-6 sm:p-8 rounded-3xl border border-blue-200/50 text-center transition-all duration-500 transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 15px 30px -15px rgba(59, 130, 246, 0.3), 0 8px 16px -8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Enhanced backdrop blur effect */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl"></div>
                
                {/* Step Number with enhanced 3D effect */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#15AFF7] to-[#0D94D1] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10"
                     style={{ boxShadow: '0 8px 25px -8px rgba(21, 175, 247, 0.6), 0 4px 12px -4px rgba(21, 175, 247, 0.4)' }}>
                  {step.step}
                </div>
                
                {/* Icon with enhanced styling */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 mt-6 shadow-inner">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-blue-200/50 to-blue-100/30 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7] drop-shadow-sm" />
                  </div>
                </div>
                
                {/* Content with relative positioning */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow (except for last item) with enhanced styling */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-100">
                      <ArrowRight className="w-5 h-5 text-[#15AFF7]" />
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section with enhanced styling */}
        <motion.div 
          className="text-center mt-12 sm:mt-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] text-white rounded-xl hover:from-[#0D94D1] hover:to-[#0A7BA8] transition-all duration-300 group font-medium text-base sm:text-lg transform-gpu"
              style={{ boxShadow: '0 20px 40px -12px rgba(21, 175, 247, 0.4), 0 8px 16px -8px rgba(21, 175, 247, 0.3)' }}
            >
              Get an Instant Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 inline" />
            </motion.button>
            
            <motion.button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-[#15AFF7] border-2 border-[#15AFF7] rounded-xl hover:bg-gradient-to-r hover:from-[#15AFF7] hover:to-[#0D94D1] hover:text-white hover:border-transparent transition-all duration-300 group font-medium text-base sm:text-lg transform-gpu shadow-lg hover:shadow-xl"
            >
              Book a Free Appointment
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
