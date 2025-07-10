import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const { ref: sectionRef, isInView } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

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
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              itemVariants={itemVariants}
            />
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