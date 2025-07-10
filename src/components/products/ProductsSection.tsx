import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

interface AnimatedCardProps {
  product: typeof products[0];
  index: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ product, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100); // Staggered animation delay
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`
        transform transition-all duration-[600ms] ease-out will-change-transform
        ${isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
        }
      `}
    >
      <div className={`
        relative overflow-hidden rounded-2xl bg-gradient-to-br ${product.gradient}
        p-6 md:p-8 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl
        border border-white/10 backdrop-blur-sm h-full transform-gpu
        before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/20 before:to-transparent before:pointer-events-none before:rounded-2xl
      `}>
        {/* Icon */}
        <div className={`
          mb-6 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl
          bg-gradient-to-br ${product.accent} shadow-lg transform-gpu transition-transform duration-300 hover:scale-110
        `}>
          <div className="h-7 w-7 md:h-8 md:w-8 text-white">
            {product.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-4 text-xl md:text-2xl font-bold leading-tight">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-gray-200 leading-relaxed text-sm md:text-base">
          {product.description}
        </p>

        {/* Features */}
        <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3">
          {product.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sm">
              <div className="mr-3 h-2 w-2 rounded-full bg-[#15AFF7] flex-shrink-0"></div>
              <span className="text-gray-200">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className={`
          w-full rounded-xl bg-gradient-to-r ${product.accent}
          px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-white/20
          transform-gpu touch-manipulation min-h-[44px] text-sm md:text-base
        `}>
          Get Quote
        </button>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <section id="products" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`
            text-center mb-12 md:mb-16 transform transition-all duration-[800ms] ease-out
            ${headerVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
            }
          `}
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-[#15AFF7]/10 border border-[#15AFF7]/20 px-6 py-2 text-sm font-medium text-[#15AFF7] mb-6 backdrop-blur-sm">
            Our Products & Solutions
          </div>

          {/* Main headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Complete Protection for{' '}
            <span className="bg-gradient-to-r from-[#15AFF7] to-purple-600 bg-clip-text text-transparent">
              Every Need
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-8 text-gray-600">
            From life insurance to retirement planning, we offer comprehensive solutions 
            tailored to protect what matters most to you and your family.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
          {products.map((product, index) => (
            <AnimatedCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#15AFF7] to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#15AFF7]/30 transform-gpu touch-manipulation"
          >
            Speak with a Licensed Advisor
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;