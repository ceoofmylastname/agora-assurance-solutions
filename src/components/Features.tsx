
import { motion } from "framer-motion";
import { Shield, Calculator, Users, Award, Target, TrendingUp, Heart, DollarSign, Home, Umbrella, PiggyBank, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Features = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
        duration: isMobile ? 0.6 : 0.8
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

  const coreProducts = [
    {
      icon: Shield,
      title: "Term Life Insurance",
      description: "Flexible, affordable coverage for a set term—compare multiple policies side-by-side to protect your loved ones."
    },
    {
      icon: Home,
      title: "Mortgage Protection Insurance", 
      description: "Pays off your mortgage if something happens—guaranteed peace of mind that your family keeps the home."
    },
    {
      icon: Heart,
      title: "Final Expense Insurance",
      description: "Lifetime coverage to cover funeral costs and end-of-life expenses with simple, guaranteed benefits."
    },
    {
      icon: PiggyBank,
      title: "Annuity Solutions",
      description: "Fixed & indexed annuities that turn savings into reliable retirement income, with customizable living benefits."
    },
    {
      icon: DollarSign,
      title: "Life Settlements",
      description: "Unlock cash value by selling an unneeded life policy—turn a dormant asset into spendable funds."
    },
    {
      icon: Umbrella,
      title: "Tax & Asset Protection",
      description: "Strategic planning to minimize taxes, shield assets, and safeguard your wealth against life's uncertainties."
    }
  ];

  const supportingServices = [
    {
      icon: Calculator,
      title: "Instant, Personalized Quotes",
      description: "Get real-time quotes from top carriers—no phone calls, no delays."
    },
    {
      icon: Target,
      title: "AI-Driven Plan Comparison",
      description: "Our platform analyzes dozens of products at once, displaying only the best fits for your profile."
    },
    {
      icon: Users,
      title: "Licensed Advisor Connection",
      description: "When you're ready for deeper guidance, connect with state-regulated professionals—no middlemen, no bots."
    },
    {
      icon: FileText,
      title: "Consumer Advocacy & Education",
      description: "Access articles, videos, and interactive tools that demystify insurance, taxes, and retirement planning."
    }
  ];

  return (
    <section id="features" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-2"
          >
            Complete Insurance Solutions
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Your independent, tech-powered partner in protecting what matters most—your family's financial well-being
          </motion.p>
        </motion.div>

        {/* Core Products */}
        <motion.div 
          className="mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12 px-2"
          >
            Core Products & Solutions
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {coreProducts.map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 touch-manipulation"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 flex items-center justify-center rounded-lg text-[#15AFF7] mb-4 sm:mb-6">
                  <product.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">{product.title}</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{product.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Supporting Services */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12 px-2"
          >
            Supporting Services & Features
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {supportingServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 touch-manipulation"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 text-center">{service.title}</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
