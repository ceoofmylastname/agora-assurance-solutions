import { ArrowLeft, CheckCircle, PiggyBank, Shield, TrendingUp, DollarSign, Clock, Users, Target, Calculator, Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import FixedAnnuitiesModal from '@/components/FixedAnnuitiesModal';
import retirementPlanningHero from '@/assets/retirement-planning-hero.webp';

const Annuities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Annuities - Guaranteed Retirement Income for Life | Agora Assurance Solutions"
        description="Secure your retirement with guaranteed income annuities. Fixed, indexed, and variable options available. Professional guidance to maximize your retirement security."
        imageUrl={retirementPlanningHero}
        keywords={['annuities', 'retirement income', 'guaranteed income', 'fixed annuities', 'indexed annuities', 'retirement planning']}
      />
      
      <section className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#15AFF7] mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <motion.div 
            className="relative mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 transform -rotate-1">
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={itemVariants}>
                <div>
                  <motion.div className="inline-block mb-4 px-4 py-2 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-sm font-medium" variants={itemVariants}>
                    <PiggyBank className="inline-block w-4 h-4 mr-2" />
                    Retirement Annuities
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Guaranteed Retirement Income for Life
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Secure your financial future with annuities designed to provide guaranteed income throughout retirement. 
                    Choose from fixed, indexed, and variable options tailored to your risk tolerance and income goals.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src={retirementPlanningHero} 
                    alt="Couple planning retirement with guaranteed annuity income"
                    className="relative rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits of Annuities</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover the advantages of securing your retirement with annuities
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Guaranteed Income</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Receive a steady stream of income for life, regardless of market conditions</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <TrendingUp className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Tax-Deferred Growth</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Your investment grows tax-deferred, allowing for potentially higher returns</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <Clock className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Long-Term Security</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Protect your retirement savings from market volatility and outlive your assets</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <DollarSign className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Customizable Options</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Choose from various annuity types and features to match your unique needs</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Annuity Types */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Different Types of Annuities</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Understand the options available to create a secure retirement income stream
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <PiggyBank className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Fixed Annuities</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Offer a guaranteed interest rate and predictable income payments</p>
                    <ul className="mt-4 space-y-2 text-left">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Safe and reliable</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Consistent returns</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Ideal for conservative investors</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <TrendingUp className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Indexed Annuities</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Link returns to a market index, offering growth potential with downside protection</p>
                    <ul className="mt-4 space-y-2 text-left">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Market-linked growth</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Limited risk</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Potential for higher returns</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                  <CardContent className="p-6">
                    <Calculator className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Variable Annuities</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Offer the potential for higher returns through investment in subaccounts</p>
                    <ul className="mt-4 space-y-2 text-left">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Investment flexibility</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Unlimited growth potential</span>
                      </li>
                       <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mr-2" />
                        <span className="text-sm">Higher risk tolerance required</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Who Should Consider */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Should Consider Annuities?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Annuities can be a valuable tool for various retirement planning needs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Retirees", description: "Seeking a steady income stream to cover living expenses" },
                { icon: Target, title: "Pre-Retirees", description: "Planning for a secure financial future with guaranteed income" },
                { icon: Briefcase, title: "Business Owners", description: "Looking for tax-advantaged retirement savings options" },
                { icon: Heart, title: "Risk-Averse Investors", description: "Prioritizing safety and predictable returns over high-risk investments" },
                { icon: Shield, title: "Estate Planners", description: "Seeking to efficiently transfer wealth to future generations" },
                { icon: Clock, title: "Long-Term Savers", description: "Building a retirement nest egg with tax-deferred growth" }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                    <CardContent className="p-6">
                      <item.icon className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/5 to-blue-600/5 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl border border-gray-200 p-12 shadow-2xl text-center transform -rotate-1">
              <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#15AFF7] to-blue-600 bg-clip-text text-transparent" variants={itemVariants}>
                Start Planning Your Guaranteed Income
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Take control of your retirement security with guaranteed income annuities. Our experts will help you 
                find the perfect solution for your retirement goals and risk tolerance.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Explore Annuity Options
                </button>
                <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                  Schedule Consultation
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <FixedAnnuitiesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default Annuities;
