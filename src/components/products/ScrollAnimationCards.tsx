import React from 'react';
import AnimatedCard from './AnimatedCard';

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
    backgroundColor: "#f8f9fa",
    textColor: "#0ea5e9"
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
    backgroundColor: "#ffffff",
    textColor: "#0ea5e9"
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
    backgroundColor: "#fbbf24",
    textColor: "#0ea5e9"
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
    backgroundColor: "#000000",
    textColor: "#0ea5e9"
  }
];

const ScrollAnimationCards: React.FC = () => {
  return (
    <div id="products" className="relative">
      {/* Add spacer height to ensure proper scroll triggering */}
      <div className="h-screen"></div>
      {sectionData.map((section, index) => (
        <AnimatedCard key={section.id} card={section} index={index} />
      ))}
    </div>
  );
};

export default ScrollAnimationCards;