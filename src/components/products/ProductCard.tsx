import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
  itemVariants: any;
}

const ProductCard = ({ product, index, itemVariants }: ProductCardProps) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full transform-gpu will-change-transform">
        <CardContent className="p-0">
          {/* Hero Image */}
          <div className="relative h-40 md:h-48 overflow-hidden">
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
              className="absolute top-3 left-3 md:top-4 md:left-4"
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
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${product.accent} flex items-center justify-center text-white shadow-lg transform-gpu`}>
                {product.icon}
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-gray-800 transition-colors leading-tight">
              {product.title}
            </h3>
            
            <p className="text-gray-600 mb-3 md:mb-4 text-sm leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-2 mb-4 md:mb-6">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#15AFF7] rounded-full mr-3 flex-shrink-0 mt-1.5"></div>
                  <span className="break-words flex-1">{feature}</span>
                </div>
              ))}
            </div>
            
            <motion.button 
              className="w-full bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] text-white px-4 py-3 rounded-lg hover:from-[#0D94D1] hover:to-[#0A7FB0] transition-all duration-300 flex items-center justify-center group/btn font-medium shadow-lg hover:shadow-xl transform-gpu touch-manipulation min-h-[44px] text-sm md:text-base"
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
  );
};

export default ProductCard;