
import { Heart, Shield, Home, Wallet, TrendingUp, Briefcase, LucideIcon } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  imageTitle: string;
  icon: React.ReactElement<LucideIcon>;
  gradient: string;
  accent: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Term Life Insurance",
    description: "Affordable, straightforward protection for your family's most important years",
    features: [
      "Coverage amounts from $50,000 to $2M+",
      "Level premiums for 10, 20, or 30 years", 
      "No medical exam options available",
      "Conversion options to permanent coverage"
    ],
    image: "/assets/term-life-family.webp",
    imageAlt: "Happy family with term life insurance protection - Parents and children enjoying security and peace of mind",
    imageTitle: "Term Life Insurance - Affordable Family Protection",
    icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-rose-500/90 to-pink-500/90",
    accent: "from-rose-600 to-pink-600"
  },
  {
    id: 2,
    title: "Final Expense Insurance",
    description: "Ensure your final wishes are honored without burdening your loved ones",
    features: [
      "Coverage from $5,000 to $50,000",
      "No medical exam required",
      "Guaranteed acceptance ages 45-85",
      "Premiums never increase"
    ],
    image: "/assets/final-expense-couple.webp",
    imageAlt: "Elderly couple planning final expense insurance - Dignified seniors securing their legacy and family's future",
    imageTitle: "Final Expense Insurance - Dignified Legacy Planning",
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-blue-500/90 to-indigo-500/90",
    accent: "from-blue-600 to-indigo-600"
  },
  {
    id: 3,
    title: "Mortgage Protection",
    description: "Keep your family in their home even if the unexpected happens",
    features: [
      "Coverage matches your mortgage balance",
      "Declining term or level benefit options",
      "Fast approval process",
      "Competitive rates for all health classes"
    ],
    image: "/assets/hero-family-protection.webp",
    imageAlt: "Family home mortgage protection - Secure house with happy family enjoying homeownership security",
    imageTitle: "Mortgage Protection Insurance - Home Security for Families",
    icon: <Home className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-green-500/90 to-emerald-500/90",
    accent: "from-green-600 to-emerald-600"
  },
  {
    id: 4,
    title: "Whole Life Insurance",
    description: "Permanent protection with cash value that grows over time",
    features: [
      "Lifelong coverage guaranteed",
      "Cash value accumulation",
      "Dividends from mutual companies",
      "Loan and withdrawal options"
    ],
    image: "/assets/retirement-planning-couple.webp",
    imageAlt: "Whole life insurance planning session - Couple working with advisor on permanent life insurance strategy",
    imageTitle: "Whole Life Insurance - Permanent Protection with Cash Value",
    icon: <Wallet className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-purple-500/90 to-violet-500/90",
    accent: "from-purple-600 to-violet-600"
  },
  {
    id: 5,
    title: "Annuities",
    description: "Guaranteed retirement income you can never outlive",
    features: [
      "Fixed or variable growth options",
      "Guaranteed lifetime income riders",
      "Tax-deferred accumulation",
      "Principal protection available"
    ],
    image: "/assets/annuities-retirement-hero.jpg",
    imageAlt: "Retirement annuities planning - Senior couple reviewing guaranteed income strategies for retirement security",
    imageTitle: "Annuities - Guaranteed Retirement Income Planning",
    icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-amber-500/90 to-orange-500/90",
    accent: "from-amber-600 to-orange-600"
  },
  {
    id: 6,
    title: "Tax & Asset Protection",
    description: "Advanced strategies to preserve and transfer your wealth efficiently",
    features: [
      "Estate planning optimization",
      "Tax-advantaged life insurance",
      "Asset protection strategies",
      "Business succession planning"
    ],
    image: "/assets/tax-strategies.webp",
    imageAlt: "Tax and asset protection strategies - Financial advisors reviewing wealth preservation and tax optimization plans",
    imageTitle: "Tax & Asset Protection - Advanced Wealth Preservation Strategies",
    icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
    gradient: "from-teal-500/90 to-cyan-500/90",
    accent: "from-teal-600 to-cyan-600"
  }
];
