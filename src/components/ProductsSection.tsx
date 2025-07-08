
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Home, Heart, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Term Life Insurance",
    description: "Flexible, affordable coverage for a set term—compare multiple policies side-by-side to protect your loved ones.",
    icon: <Shield className="w-8 h-8" />,
    features: ["Affordable premiums", "Flexible terms", "Multiple carrier options", "Instant quotes"],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600 bg-blue-100"
  },
  {
    id: 2,
    title: "Mortgage Protection Insurance",
    description: "Pays off your mortgage if something happens—guaranteed peace of mind that your family keeps the home.",
    icon: <Home className="w-8 h-8" />,
    features: ["Mortgage payoff guarantee", "Family home protection", "Decreasing term options", "Quick approval"],
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600 bg-green-100"
  },
  {
    id: 3,
    title: "Final Expense Insurance",
    description: "Lifetime coverage to cover funeral costs and end-of-life expenses with simple, guaranteed benefits.",
    icon: <Heart className="w-8 h-8" />,
    features: ["Guaranteed acceptance", "No medical exams", "Fixed premiums", "Immediate coverage"],
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600 bg-purple-100"
  },
  {
    id: 4,
    title: "Annuity Solutions",
    description: "Fixed & indexed annuities that turn savings into reliable retirement income, with customizable living benefits.",
    icon: <TrendingUp className="w-8 h-8" />,
    features: ["Guaranteed income", "Market protection", "Tax advantages", "Flexible withdrawals"],
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600 bg-orange-100"
  },
  {
    id: 5,
    title: "Life Settlements",
    description: "Unlock cash value by selling an unneeded life policy—turn a dormant asset into spendable funds.",
    icon: <DollarSign className="w-8 h-8" />,
    features: ["Cash for unused policies", "Free evaluations", "No ongoing premiums", "Immediate liquidity"],
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600 bg-emerald-100"
  },
  {
    id: 6,
    title: "Tax & Asset Protection",
    description: "Strategic planning to minimize taxes, shield assets, and safeguard your wealth against life's uncertainties.",
    icon: <FileText className="w-8 h-8" />,
    features: ["Tax minimization", "Asset shielding", "Estate planning", "Wealth preservation"],
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600 bg-indigo-100"
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className={`${product.color} h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full ${product.iconColor} flex items-center justify-center mb-4`}>
                    {product.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#15AFF7] rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-[#15AFF7] text-white px-4 py-2 rounded-lg hover:bg-[#0D94D1] transition-colors flex items-center justify-center group font-medium">
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
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
