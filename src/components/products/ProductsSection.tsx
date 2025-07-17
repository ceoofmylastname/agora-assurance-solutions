
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Your Protection, Simplified
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            From life insurance to retirement planning, we offer comprehensive solutions tailored to every stage of your life
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
      </div>
    </section>
  );
};

export default ProductsSection;
