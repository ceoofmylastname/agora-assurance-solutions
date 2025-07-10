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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExiting(false);
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        } else {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }
      },
      {
        threshold: 0.4,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={sectionRef}
      className={`min-h-fit sm:min-h-[80vh] lg:min-h-screen flex items-start sm:items-center justify-center ${section.backgroundColor} relative overflow-hidden transition-all duration-700 py-8 sm:py-12 lg:py-0`}
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent`}></div>
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Mobile-First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-12 items-center min-h-fit lg:min-h-auto py-2 sm:py-4 lg:py-0">
          
          {/* Mobile: Number + Icon in same row */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 lg:hidden w-full">
            {/* Number */}
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
              <div className={`w-12 sm:w-16 h-0.5 ${section.textColor.replace('text-', 'bg-')} mb-3 sm:mb-4 rounded-full`}></div>
              <span className={`text-4xl sm:text-6xl md:text-7xl font-black ${section.textColor} leading-none tracking-tight`}>
                {section.number}
              </span>
            </div>
            
            {/* Icon */}
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
              <Sparkles className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${section.textColor} drop-shadow-lg`} />
            </div>
          </div>

          {/* Desktop: Left Side - Number */}
          <div className="hidden lg:flex lg:col-span-3 justify-center lg:justify-start">
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

          {/* Desktop: Center - Icon */}
          <div className="hidden lg:flex lg:col-span-2 justify-center">
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

          {/* Content - Both Mobile and Desktop */}
          <div className="w-full lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            
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
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-black ${section.textColor} leading-tight tracking-tight`}>
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
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${section.textColor} font-medium leading-relaxed max-w-4xl mx-auto lg:mx-0`}>
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
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 max-w-4xl mx-auto lg:mx-0">
                {section.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`
                      flex items-start text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${section.textColor} font-medium 
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
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full ${section.textColor.replace('text-', 'bg-')} mr-3 sm:mr-4 lg:mr-6 flex-shrink-0 shadow-lg mt-1.5 sm:mt-2`}></div>
                    <span className="text-left">{feature}</span>
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
                  if (section.id === 1) {
                    // For "GET A QUOTE" section, navigate to the quote page
                    window.location.href = '/get-quote';
                  } else if (section.id === 2) {
                    // For "PROTECTION PLANS" section, navigate to the protection plans page
                    window.location.href = '/protection-plans';
                  } else if (section.id === 3) {
                    // For "LIFE COVERAGE" section, navigate to the life coverage page
                    window.location.href = '/life-coverage';
                  } else {
                    // For other sections, scroll to contact
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`
                  group inline-flex items-center text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl ${section.textColor} font-bold 
                  transition-all duration-500 hover:translate-x-3 cursor-pointer
                  border-b-2 border-transparent hover:border-current pb-1
                  min-h-[44px] min-w-[44px] justify-center lg:justify-start
                `}
              >
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="ml-2">
                  {section.id === 1 ? 'GET QUOTE' : section.id === 2 ? 'VIEW PLANS' : section.id === 3 ? 'VIEW COVERAGE' : 'LEARN MORE'}
                </span>
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
        <AnimatedSection key={section.id} section={section} index={index} />
      ))}
    </div>
  );
};

export default ProductsSection;