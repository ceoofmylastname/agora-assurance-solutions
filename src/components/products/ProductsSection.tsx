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
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section slides up first
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
          
          // Headline slides up after section with additional delay
          setTimeout(() => {
            setHeadlineVisible(true);
          }, (index * 200) + 400);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
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
      className={`min-h-screen flex items-center justify-center ${section.backgroundColor} relative overflow-hidden`}
    >
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Number */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div
              className={`
                transform transition-all duration-[800ms] ease-out
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
                }
              `}
            >
              <div className={`w-16 h-1 ${section.textColor.replace('text-', 'bg-')} mb-4`}></div>
              <span className={`text-8xl lg:text-9xl font-black ${section.textColor} leading-none`}>
                {section.number}
              </span>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-10 space-y-8">
            
            {/* Headline with Icon */}
            <div className="flex items-center gap-6 flex-wrap">
              <div
                className={`
                  transform transition-all duration-[800ms] ease-out
                  ${headlineVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                  }
                `}
              >
                <h2 className={`text-4xl lg:text-6xl xl:text-7xl font-black ${section.textColor} leading-tight tracking-tight`}>
                  {section.headline}
                </h2>
              </div>
              
              {/* Star Icon */}
              <div
                className={`
                  transform transition-all duration-[800ms] ease-out delay-200
                  ${headlineVisible 
                    ? 'translate-y-0 opacity-100 rotate-0' 
                    : 'translate-y-8 opacity-0 rotate-45'
                  }
                `}
              >
                <Sparkles className={`w-12 h-12 lg:w-16 lg:h-16 ${section.textColor} flex-shrink-0`} />
              </div>
            </div>

            {/* Description */}
            <div
              className={`
                transform transition-all duration-[800ms] ease-out delay-300
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
                }
              `}
            >
              <p className={`text-lg lg:text-xl ${section.textColor} font-medium leading-relaxed max-w-4xl`}>
                {section.description}
              </p>
            </div>

            {/* Features List */}
            <div
              className={`
                transform transition-all duration-[800ms] ease-out delay-500
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
                }
              `}
            >
              <ul className="space-y-3 max-w-3xl">
                {section.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`flex items-center text-base lg:text-lg ${section.textColor} font-medium transform transition-all duration-[800ms] ease-out`}
                    style={{
                      transitionDelay: `${600 + (featureIndex * 100)}ms`
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full ${section.textColor.replace('text-', 'bg-')} mr-4 flex-shrink-0`}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div
              className={`
                transform transition-all duration-[800ms] ease-out delay-700
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
                }
              `}
            >
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`inline-flex items-center text-lg lg:text-xl ${section.textColor} font-bold hover:underline transition-all duration-300 hover:translate-x-2 cursor-pointer`}
              >
                → LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
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