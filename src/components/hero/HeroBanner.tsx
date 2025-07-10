import { motion } from "framer-motion";
import { Calculator, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import heroFamilyProtection from "@/assets/hero-family-protection.webp";
import { itemVariants } from "./HeroAnimations";

const HeroBanner = () => {
  const isMobile = useIsMobile();

  return (
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
              <button 
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium touch-manipulation" 
                onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
              >
                Get Instant Quote
                <Calculator className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-medium border-2 border-white touch-manipulation" 
                onClick={() => window.open('https://crm.agoraassurancesolutions.com/widget/booking/foZnFDUFuB2fu0X5eDZn', '_blank')}
              >
                Book Free Appointment
                <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;