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
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Card slides up immediately
          setIsVisible(true);
          
          // Headline 3D flip after 200ms delay
          setTimeout(() => {
            setHeadlineVisible(true);
          }, 200);
          
          // Content stagger after headline
          setTimeout(() => {
            setContentVisible(true);
          }, 400);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
      className={`
        h-screen sticky top-0 flex items-center justify-center ${section.backgroundColor} 
        transform transition-transform duration-700 ease-out will-change-transform
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ zIndex: index + 1 }}
    >
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left - Giant Number */}
          <div className="flex justify-center lg:justify-start">
            <div
              className={`
                transform transition-all duration-500 ease-out delay-100
                ${contentVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-5 opacity-0'
                }
              `}
            >
              <span className={`text-9xl font-black ${section.textColor} leading-none`}>
                {section.number}
              </span>
            </div>
          </div>

          {/* Center - Star Icon */}
          <div className="flex justify-center">
            <div
              className={`
                transform transition-all duration-500 ease-out delay-200
                ${contentVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-5 opacity-0 scale-75'
                }
              `}
            >
              <Sparkles className={`w-24 h-24 ${section.textColor}`} />
            </div>
          </div>

          {/* Right - Headline */}
          <div className="flex justify-center lg:justify-end">
            <div
              className={`
                perspective-1000 transform-style-3d transition-all duration-500 ease-out delay-300
                ${headlineVisible 
                  ? 'rotateY-0 opacity-100' 
                  : 'rotateY-90 opacity-0'
                }
              `}
              style={{
                transform: headlineVisible 
                  ? 'rotateY(0deg)' 
                  : 'rotateY(90deg)'
              }}
            >
              <h2 className={`text-7xl font-black ${section.textColor} leading-tight text-center lg:text-right`}>
                {section.headline}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Below */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          {/* Description */}
          <div
            className={`
              transform transition-all duration-500 ease-out delay-400
              ${contentVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-5 opacity-0'
              }
            `}
          >
            <p className={`text-xl ${section.textColor} font-medium leading-relaxed mb-8`}>
              {section.description}
            </p>
          </div>

          {/* Features List */}
          <div
            className={`
              transform transition-all duration-500 ease-out delay-500
              ${contentVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-5 opacity-0'
              }
            `}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {section.features.map((feature, featureIndex) => (
                <li 
                  key={featureIndex} 
                  className={`
                    flex items-center justify-center md:justify-start text-lg ${section.textColor} font-medium
                    transform transition-all duration-500 ease-out
                  `}
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
              transform transition-all duration-500 ease-out delay-700
              ${contentVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-5 opacity-0'
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
              className={`
                inline-flex items-center text-xl ${section.textColor} font-bold 
                hover:underline transition-all duration-300 hover:translate-x-2 cursor-pointer
              `}
            >
              → LEARN MORE
            </button>
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
          {/* Spacer div to provide scroll distance */}
          {index < sectionData.length - 1 && (
            <div className="h-screen" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductsSection;