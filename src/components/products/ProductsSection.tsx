import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SectionData {
  id: number;
  number: string;
  headline: string;
  description: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
}

const sectionData: SectionData[] = [
  {
    id: 1,
    number: "01",
    headline: "GET A QUOTE",
    description: "GET YOUR PERSONALIZED LIFE INSURANCE QUOTE INSTANTLY—NO PHONE CALLS, NO WAITING.",
    features: [
      "INSTANT INSURANCE QUOTES",
      "NO PHONE CALLS REQUIRED", 
      "EXCLUSIVE TO YOU—NEVER SHARED",
      "LICENSED PROFESSIONALS AVAILABLE IF YOU HAVE QUESTIONS",
      "TRUSTED BY THOUSANDS OF FAMILIES"
    ],
    backgroundColor: "bg-muted",
    textColor: "text-primary"
  },
  {
    id: 2,
    number: "02",
    headline: "PROTECTION PLANS",
    description: "COMPREHENSIVE COVERAGE OPTIONS FOR MORTGAGE PROTECTION AND FAMILY FINANCIAL SECURITY WITH FLEXIBLE TERMS.",
    features: [
      "MORTGAGE PROTECTION COVERAGE",
      "FAMILY INCOME REPLACEMENT",
      "FLEXIBLE PREMIUM OPTIONS",
      "IMMEDIATE COVERAGE AVAILABLE",
      "COMPETITIVE RATES GUARANTEED"
    ],
    backgroundColor: "bg-background",
    textColor: "text-primary"
  },
  {
    id: 3,
    number: "03",
    headline: "LIFE COVERAGE",
    description: "FINAL EXPENSE AND COMPREHENSIVE LIFE INSURANCE SOLUTIONS WITH GUARANTEED ACCEPTANCE AND LIFETIME BENEFITS.",
    features: [
      "FINAL EXPENSE COVERAGE",
      "GUARANTEED ACCEPTANCE", 
      "NO MEDICAL EXAMS REQUIRED",
      "LIFETIME BENEFIT PROTECTION",
      "AFFORDABLE MONTHLY PREMIUMS"
    ],
    backgroundColor: "bg-accent",
    textColor: "text-primary"
  },
  {
    id: 4,
    number: "04",
    headline: "WEALTH SOLUTIONS",
    description: "ANNUITIES AND ASSET PROTECTION STRATEGIES FOR SECURE RETIREMENT INCOME AND LONG-TERM FINANCIAL GROWTH.",
    features: [
      "GUARANTEED RETIREMENT INCOME",
      "TAX-ADVANTAGED GROWTH",
      "ASSET PROTECTION STRATEGIES", 
      "FLEXIBLE WITHDRAWAL OPTIONS",
      "ESTATE PLANNING BENEFITS"
    ],
    backgroundColor: "bg-foreground",
    textColor: "text-background"
  }
];

const AnimatedSection: React.FC<{ section: SectionData; index: number }> = ({ section, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollStart = windowHeight;
      const scrollEnd = -rect.height;
      const scrollRange = scrollStart - scrollEnd;
      
      let progress = (scrollStart - rect.top) / scrollRange;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      // Card becomes visible when it starts entering
      if (progress > 0.1 && !isVisible) {
        setIsVisible(true);
        setIsExiting(false);
      }
      
      // Card starts exiting when next card is about to appear
      if (progress > 0.9 && !isExiting) {
        setIsExiting(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
          handleScroll();
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible, isExiting]);

  const translateY = scrollProgress < 0.5 ? (1 - scrollProgress * 2) * 100 : 0;

  return (
    <div
      ref={sectionRef}
      className={`h-screen sticky top-0 flex items-center justify-center ${section.backgroundColor} relative overflow-hidden`}
      style={{ 
        zIndex: index + 1,
        transform: `translateY(${translateY}%)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent`}></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side - Number */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-20 opacity-0 scale-95'
                }
              `}
              style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
            >
              <div className={`w-24 h-1 ${section.textColor.replace('text-', 'bg-')} mb-6 rounded-full`}></div>
              <span className={`text-8xl lg:text-9xl xl:text-[12rem] font-black ${section.textColor} leading-none tracking-tight`}>
                {section.number}
              </span>
            </div>
          </div>

          {/* Center - Icon */}
          <div className="lg:col-span-2 flex justify-center">
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100 rotate-0 scale-100' 
                  : 'translate-y-16 opacity-0 rotate-45 scale-75'
                }
              `}
              style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
            >
              <Sparkles className={`w-16 h-16 lg:w-20 lg:h-20 ${section.textColor} drop-shadow-lg`} />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Headline */}
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform perspective-1000
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100 rotateY-0' 
                  : 'translate-y-12 opacity-0 rotateY-90'
                }
              `}
              style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
            >
              <h2 className={`text-5xl lg:text-7xl xl:text-8xl font-black ${section.textColor} leading-tight tracking-tight`}>
                {section.headline}
              </h2>
            </div>

            {/* Description */}
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
                }
              `}
              style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
            >
              <p className={`text-xl lg:text-2xl ${section.textColor} font-medium leading-relaxed max-w-4xl`}>
                {section.description}
              </p>
            </div>

            {/* Features List */}
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
                }
              `}
              style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
            >
              <ul className="space-y-4 max-w-4xl">
                {section.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`
                      flex items-center text-lg lg:text-xl ${section.textColor} font-medium 
                      transform transition-all duration-1000 ease-out will-change-transform
                      ${isVisible && !isExiting
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                      }
                    `}
                    style={{
                      transitionDelay: isVisible ? `${1000 + (featureIndex * 150)}ms` : '0ms'
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full ${section.textColor.replace('text-', 'bg-')} mr-6 flex-shrink-0 shadow-lg`}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div
              className={`
                transform transition-all duration-1000 ease-out will-change-transform
                ${isVisible && !isExiting
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
                }
              `}
              style={{ transitionDelay: isVisible ? `${1000 + (section.features.length * 150) + 200}ms` : '0ms' }}
            >
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`
                  group inline-flex items-center text-xl lg:text-2xl ${section.textColor} font-bold 
                  transition-all duration-500 hover:translate-x-3 cursor-pointer
                  border-b-2 border-transparent hover:border-current pb-1
                `}
              >
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="ml-2">LEARN MORE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div id="products" className="relative">
      {sectionData.map((section, index) => (
        <React.Fragment key={section.id}>
          <AnimatedSection section={section} index={index} />
          {/* Scroll spacer - creates scroll distance for animations */}
          {index < sectionData.length - 1 && (
            <div className="h-screen" />
          )}
        </React.Fragment>
      ))}
      {/* Final spacer to allow last card to complete its animation */}
      <div className="h-screen" />
    </div>
  );
};

export default ProductsSection;