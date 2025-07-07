
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { searchPixabayImages, PixabayImage } from '@/utils/pixabayApi';
import { useIsMobile } from '@/hooks/use-mobile';

interface InsuranceImageSectionProps {
  searchQuery: string;
  title: string;
  description: string;
  altTextBase: string;
}

const InsuranceImageSection: React.FC<InsuranceImageSectionProps> = ({
  searchQuery,
  title,
  description,
  altTextBase
}) => {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const fetchedImages = await searchPixabayImages(searchQuery, 'all', 'photo', 6);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-[#15AFF7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.section 
      className="py-8 md:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{description}</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {images.slice(0, 3).map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 touch-manipulation"
          >
            <div className="aspect-[4/3] relative">
              <img
                src={image.webformatURL}
                alt={`${altTextBase} - ${image.tags.split(',').slice(0, 3).join(', ')}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium leading-relaxed">
                  {image.tags.split(',').slice(0, 4).join(' • ')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default InsuranceImageSection;
