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
      <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[50vh] sm:h-[60vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-[#15AFF7] w-full">
          <img src="/lovable-uploads/3e95af8d-5845-4810-af42-d9884a4e67bb.png" alt="Happy multi-generational family sitting together on couch - representing family protection and insurance security" className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-center' : 'object-center'}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>Cut the Chaos. Get Covered.
            </motion.h1>
              <motion.p className="banner-subtitle text-blue-100 mt-4 sm:mt-6" variants={itemVariants}>
                Built by industry pioneers and powered by AI-driven systems, we combine cutting-edge comparison tools, transparent advocacy, and licensed expertise to deliver insurance solutions with zero confusion and total peace of mind.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center" variants={itemVariants}>
                <button className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-[#15AFF7] text-white rounded-md hover:bg-[#0D94D1] transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium" onClick={e => {
                e.preventDefault();
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }}>
                  Get Instant Quote
                  <Calculator className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
                
                <button className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium border-2 border-white" onClick={scrollToContact}>
                  Book Free Appointment
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Shield className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Compare Insurance Plans</h3>
            <p className="text-gray-600 text-xs md:text-sm">Explore a variety of tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Calculator className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Get Personalized Quote</h3>
            <p className="text-gray-600 text-xs md:text-sm">Instantly receive customized quotes from top carriers—no phone calls required.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Licensed Advisor</h3>
            <p className="text-gray-600 text-xs md:text-sm">Hands-on guidance from state-regulated professionals, ensuring solutions aligned with your family's goals.</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-blue-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-2 md:mb-3">
              <Home className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Learn Our Services</h3>
            <p className="text-gray-600 text-xs md:text-sm">Deep dive into our full suite—tax, asset protection, annuities, life settlements, and more.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};
export default Hero;