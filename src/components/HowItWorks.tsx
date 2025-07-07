
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
    <section id="how-it-works" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
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
              className="relative bg-white p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center active:scale-95 touch-manipulation"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#15AFF7] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 mt-4">
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7]" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{step.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{step.description}</p>
              
              {/* Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-[#15AFF7]" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 sm:mt-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 group font-medium text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            >
              Get an Instant Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 inline" />
            </button>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-[#15AFF7] border-2 border-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all duration-300 group font-medium text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            >
              Book a Free Appointment
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
