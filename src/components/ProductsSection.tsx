
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Home, Heart, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { motion } from "framer-motion";
import annuitiesCard from '@/assets/annuities-card.webp';
import termLifeFamily from '@/assets/term-life-family.webp';
import heroFamilyProtection from '@/assets/hero-family-protection.webp';
import finalExpenseCouple from '@/assets/final-expense-couple.webp';

const products = [
  {
    id: 1,
    title: "Term Life Insurance",
    description: "Flexible, affordable coverage for a set term—compare multiple policies side-by-side to protect your loved ones.",
    icon: <Shield className="w-6 h-6" />,
    features: ["Affordable premiums", "Flexible terms", "Multiple carrier options", "Instant quotes"],
    image: termLifeFamily,
    gradient: "from-slate-900 to-slate-700",
    accent: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Mortgage Protection Insurance",
    description: "Pays off your mortgage if something happens—guaranteed peace of mind that your family keeps the home.",
    icon: <Home className="w-6 h-6" />,
    features: ["Mortgage payoff guarantee", "Family home protection", "Decreasing term options", "Quick approval"],
    image: heroFamilyProtection,
    gradient: "from-emerald-900 to-emerald-700",
    accent: "from-emerald-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Final Expense Insurance",
    description: "Lifetime coverage to cover funeral costs and end-of-life expenses with simple, guaranteed benefits.",
    icon: <Heart className="w-6 h-6" />,
    features: ["Guaranteed acceptance", "No medical exams", "Fixed premiums", "Immediate coverage"],
    image: finalExpenseCouple,
    gradient: "from-purple-900 to-purple-700",
    accent: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Annuity Solutions",
    description: "Fixed & indexed annuities that turn savings into reliable retirement income, with customizable living benefits.",
    icon: <TrendingUp className="w-6 h-6" />,
    features: ["Guaranteed income", "Market protection", "Tax advantages", "Flexible withdrawals"],
    image: annuitiesCard,
    gradient: "from-orange-900 to-orange-700",
    accent: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Life Settlements",
    description: "Unlock cash value by selling an unneeded life policy—turn a dormant asset into spendable funds.",
    icon: <DollarSign className="w-6 h-6" />,
    features: ["Cash for unused policies", "Free evaluations", "No ongoing premiums", "Immediate liquidity"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    gradient: "from-teal-900 to-teal-700",
    accent: "from-teal-500 to-teal-600"
  },
  {
    id: 6,
    title: "Tax & Asset Protection",
    description: "Strategic planning to minimize taxes, shield assets, and safeguard your wealth against life's uncertainties.",
    icon: <FileText className="w-6 h-6" />,
    features: ["Tax minimization", "Asset shielding", "Estate planning", "Wealth preservation"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    gradient: "from-indigo-900 to-indigo-700",
    accent: "from-indigo-500 to-indigo-600"
  }
];

const ProductsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6
      }
    }
  };

  return (
    <section id="products" ref={sectionRef} className="bg-gray-50 py-16 md:py-24 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="inline-block mb-2 px-3 py-1 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-sm font-medium" variants={itemVariants}>
            Our Products & Solutions
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Complete Protection for Every Need
          </motion.h2>
          <motion.p className="text-gray-600 text-lg max-w-3xl mx-auto" variants={itemVariants}>
            From life insurance to retirement planning, we offer comprehensive solutions tailored to protect what matters most to you and your family.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full transform-gpu will-change-transform">
                <CardContent className="p-0">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={`${product.title} visual representation`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transform-gpu"
                      loading="lazy"
                      width={400}
                      height={192}
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-80`}
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.4, 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15 
                      }}
                      whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${product.accent} flex items-center justify-center text-white shadow-lg transform-gpu`}>
                        {product.icon}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-[#15AFF7] rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <motion.button 
                      className="w-full bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] text-white px-4 py-3 rounded-lg hover:from-[#0D94D1] hover:to-[#0A7FB0] transition-all duration-300 flex items-center justify-center group/btn font-medium shadow-lg hover:shadow-xl transform-gpu"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6, type: "spring", stiffness: 150 }}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all group font-medium shadow-lg"
          >
            Speak with a Licensed Advisor
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
