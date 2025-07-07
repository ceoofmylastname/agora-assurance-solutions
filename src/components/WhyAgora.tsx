import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Calculator, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, {
    once: true,
    margin: "-100px"
  });
  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;
    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animate(timestamp);
    };
    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(startAnimation);
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);
  return <span ref={countRef} className="font-bold tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>;
};

const WhyAgora = () => {
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
  return <section id="why-agora" className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 md:mb-16 lg:mb-20" initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-50px"
      }} variants={containerVariants}>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-2">
            Why Agora Assurance?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
            Supporting your family's assurance and well-being with transparency, technology, and trusted expertise
          </motion.p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 lg:mb-20" initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-50px"
      }} variants={containerVariants}>
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-300 hover:shadow-lg active:scale-95 touch-manipulation">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <AnimatedCounter end={50} suffix="+" /> Years
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">Combined experience protecting families and building financial security</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-300 hover:shadow-lg active:scale-95 touch-manipulation">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <AnimatedCounter end={2500} suffix="+" /> 
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Lives protected through our comprehensive insurance and financial solutions
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-300 hover:shadow-lg sm:col-span-2 lg:col-span-1 active:scale-95 touch-manipulation">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <AnimatedCounter end={500} suffix="M" prefix="$" />
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              In tax-free benefits created for our clients and their families
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div className="mb-12 sm:mb-16" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-50px"
        }} variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              What Makes Agora Different
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
              Our unique approach combines cutting-edge technology with human expertise for transparent, personalized service
            </p>
          </motion.div>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 flex-shrink-0">
                  <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Technology-Driven</h4>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">We leverage AI and proprietary systems to compare a wide range of products at once, giving you clarity without overwhelm.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Consumer-First Advocacy</h4>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">As an independent consumer advocate, our mission is centered on transparency, not commission.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 flex-shrink-0">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Licensed Experts</h4>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">We connect you directly to vetted, state-regulated advisors—no bots, no middlemen.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Peace of Mind</h4>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">Over 50 years of combined experience, 100+ business partners, and proven results you can trust.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-12 sm:mt-16 px-4">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center px-6 sm:px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 group font-medium text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            >
              Get Your Personalized Quote Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};

export default WhyAgora;
