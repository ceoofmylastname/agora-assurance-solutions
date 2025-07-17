import { ArrowLeft, CheckCircle, BarChart3, Shield, TrendingUp, DollarSign, Users, Briefcase, Target, PiggyBank, Building2, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import IndexedUniversalLifeModal from '@/components/IndexedUniversalLifeModal';
import retirementPlanningHero from '@/assets/retirement-planning-hero.webp';

const IndexedUniversalLife = () => {
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
        title="Index Universal Life Insurance - Market Growth with Protection | Agora Assurance Solutions"
        description="Combine life insurance protection with market-linked growth potential. Index Universal Life offers upside potential with downside protection and tax advantages."
        imageUrl={retirementPlanningHero}
        keywords={['index universal life', 'IUL insurance', 'market-linked life insurance', 'cash value growth', 'tax-advantaged savings', 'retirement planning']}
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
                    <BarChart3 className="inline-block w-4 h-4 mr-2" />
                    Index Universal Life
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Market Growth Potential with Downside Protection
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Index Universal Life (IUL) combines permanent life insurance protection with cash value growth tied to market index performance, offering upside potential with built-in downside protection.
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
                    alt="Retirement planning with Index Universal Life insurance"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Index Universal Life?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Combine the security of life insurance with the growth potential of market indexes
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <TrendingUp className="w-10 h-10 text-[#15AFF7] mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Market-Linked Growth</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Cash value growth tied to market index performance with potential for significant returns.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-10 h-10 text-green-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Downside Protection</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Floor protection (typically 0%) ensures you never lose money in down markets.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <DollarSign className="w-10 h-10 text-purple-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Premiums</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Adjust your premium payments based on your financial situation and goals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <PiggyBank className="w-10 h-10 text-orange-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tax Advantages</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Tax-deferred growth and tax-free access to cash value through loans.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Index Options */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Index Allocation Options</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Choose from various market indexes to diversify your growth potential
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <BarChart3 className="w-12 h-12 text-[#15AFF7] mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">S&P 500 Index</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Track the performance of the 500 largest publicly traded companies in the US.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Most popular choice</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Broad market exposure</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Historical performance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">NASDAQ-100</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Focus on technology and growth companies for higher potential returns.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Technology focused</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Growth potential</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Innovation leaders</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fixed Account</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Conservative guaranteed interest option for stable, predictable growth.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Guaranteed returns</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">No market risk</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Predictable growth</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Who It's For */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Is IUL Right for You?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Index Universal Life is ideal for those seeking growth potential with protection
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: "Growth-Oriented Investors", description: "Those who want market upside potential with downside protection" },
                { icon: PiggyBank, title: "Retirement Planners", description: "Building tax-advantaged wealth for future income needs" },
                { icon: DollarSign, title: "Tax-Conscious Savers", description: "Seeking tax-deferred growth and tax-free income options" },
                { icon: Briefcase, title: "Business Owners", description: "Flexible premium payments that adapt to business cash flow" },
                { icon: Building2, title: "Estate Planners", description: "Maximizing wealth transfer with tax-efficient strategies" },
                { icon: Target, title: "Long-Term Investors", description: "Patient investors with 15+ year time horizons" }
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
                Ready to Grow Your Wealth?
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Discover how Index Universal Life can help you build wealth while protecting your family. Our experts will help you design the perfect strategy for your goals.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Get Free Illustration
                </button>
                <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                  Speak with Specialist
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <IndexedUniversalLifeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default IndexedUniversalLife;
