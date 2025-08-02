import React from 'react';
import { Shield, Home, Heart, TrendingUp, DollarSign, FileText } from 'lucide-react';
import annuitiesCard from '@/assets/annuities-card.webp';
import termLifeFamily from '@/assets/term-life-family.webp';
const heroFamilyProtection = '/lovable-uploads/99f03d19-d521-4882-9c68-a2bbe122b1f9.png';
import finalExpenseCouple from '@/assets/final-expense-couple.webp';
import retirementPlanningCouple from '@/assets/retirement-planning-couple.webp';

export interface Product {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  image: string;
  gradient: string;
  accent: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Term Life Insurance",
    description: "Flexible, affordable coverage for a set term—compare multiple policies side-by-side to protect your loved ones.",
    icon: <Shield className="w-6 h-6" />,
    features: ["Affordable premiums", "Flexible terms", "Multiple carrier options", "Instant quotes"],
    image: termLifeFamily,
    gradient: "from-slate-900 to-slate-700",
    accent: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Mortgage Protection Insurance",
    description: "Pays off your mortgage if something happens—guaranteed peace of mind that your family keeps the home.",
    icon: <Home className="w-6 h-6" />,
    features: ["Mortgage payoff guarantee", "Family home protection", "Decreasing term options", "Quick approval"],
    image: heroFamilyProtection,
    gradient: "from-emerald-900 to-emerald-700",
    accent: "from-emerald-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Final Expense Insurance",
    description: "Lifetime coverage to cover funeral costs and end-of-life expenses with simple, guaranteed benefits.",
    icon: <Heart className="w-6 h-6" />,
    features: ["Guaranteed acceptance", "No medical exams", "Fixed premiums", "Immediate coverage"],
    image: finalExpenseCouple,
    gradient: "from-purple-900 to-purple-700",
    accent: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Annuity Solutions",
    description: "Fixed & indexed annuities that turn savings into reliable retirement income, with customizable living benefits.",
    icon: <TrendingUp className="w-6 h-6" />,
    features: ["Guaranteed income", "Market protection", "Tax advantages", "Flexible withdrawals"],
    image: retirementPlanningCouple,
    gradient: "from-orange-900 to-orange-700",
    accent: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Life Settlements",
    description: "Unlock cash value by selling an unneeded life policy—turn a dormant asset into spendable funds.",
    icon: <DollarSign className="w-6 h-6" />,
    features: ["Cash for unused policies", "Free evaluations", "No ongoing premiums", "Immediate liquidity"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    gradient: "from-teal-900 to-teal-700",
    accent: "from-teal-500 to-teal-600"
  },
  {
    id: 6,
    title: "Tax & Asset Protection",
    description: "Strategic planning to minimize taxes, shield assets, and safeguard your wealth against life's uncertainties.",
    icon: <FileText className="w-6 h-6" />,
    features: ["Tax minimization", "Asset shielding", "Estate planning", "Wealth preservation"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    gradient: "from-indigo-900 to-indigo-700",
    accent: "from-indigo-500 to-indigo-600"
  }
];