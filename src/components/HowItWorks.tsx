
import { useState, useRef, useEffect } from "react";
import { Search, Calculator, UserCheck, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Explore Products",
    description: "Browse term life, mortgage protection, final expense, annuities, life settlements, and tax solutions in one place.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Get Instant Quotes",
    description: "Enter a few details, then watch tailored rates from multiple carriers appear—no calls required.",
    icon: <Calculator className="w-8 h-8" />,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Connect with an Advisor",
    description: "If you want personalized advice, schedule a free consult with one of our licensed experts.",
    icon: <UserCheck className="w-8 h-8" />,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Buy & Protect",
    description: "Complete your application online or by phone; our tech ensures fast underwriting and policy delivery.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-[#15AFF7]"
  }
];

const HowItWorks = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const mobileStepVariants = {
    hidden: { y: 30, opacity: 0, rotateX: 20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-16 md:py-24 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium" variants={itemVariants}>
            Simple Process
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            How It Works
          </motion.h2>
          <motion.p className="text-gray-600 text-lg max-w-2xl mx-auto" variants={itemVariants}>
            Getting the right insurance protection has never been easier. Our streamlined process gets you covered in minutes, not weeks.
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className="text-center" 
                variants={window.innerWidth <= 768 ? mobileStepVariants : itemVariants}
                style={{ perspective: "1000px" }}
              >
                <div className="relative mb-6">
                  <motion.div 
                    className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white mx-auto shadow-lg transform-gpu`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.15 + 0.3, 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15 
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold transform-gpu"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.15 + 0.5, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                  >
                    {step.id}
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-gradient-to-r from-[#15AFF7]/10 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of families who trust Agora Assurance for their protection needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                className="px-6 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-colors font-medium"
              >
                Get an Instant Quote
              </button>
              <button 
                onClick={() => {
                  // If we're not on the home page, navigate there first
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#contact-info';
                    return;
                  }
                  
                  const contactSection = document.getElementById('contact-info');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Book Free Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
