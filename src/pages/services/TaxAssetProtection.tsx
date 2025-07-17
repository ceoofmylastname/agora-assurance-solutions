import { ArrowLeft, CheckCircle, Shield, TrendingUp, Building, FileText, Briefcase, Scale, DollarSign, Users, Clock, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';

const TaxAssetProtection = () => {
  const navigate = useNavigate();

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
        title="Tax & Asset Protection - Preserve Your Wealth | Agora Assurance Solutions"
        description="Comprehensive tax planning and asset protection strategies to preserve your wealth and minimize tax liabilities. Professional guidance for individuals and businesses."
        keywords={['tax planning', 'asset protection', 'wealth preservation', 'tax strategies', 'estate planning', 'business tax']}
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
                    <Shield className="inline-block w-4 h-4 mr-2" />
                    Tax & Asset Protection
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Preserve Your Wealth & Minimize Tax Burdens
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Strategic tax planning and asset protection solutions designed to safeguard your wealth from excessive taxation, litigation, and economic uncertainties while maximizing your financial growth.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                    <button 
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      Free Consultation
                    </button>
                    <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-8 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <Shield className="w-8 h-8 text-[#15AFF7]" />
                      <span className="text-sm text-gray-300">Protected Assets</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Estate Value</span>
                        <span className="text-green-400 font-bold">$2.5M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Tax Savings</span>
                        <span className="text-green-400 font-bold">$450K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Protection Level</span>
                        <span className="text-[#15AFF7] font-bold">Maximum</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tax Planning Strategies */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tax Planning Strategies</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive tax strategies to minimize your liability and maximize your wealth
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <DollarSign className="w-12 h-12 text-[#15AFF7] mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Income Tax Optimization</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Strategic planning to minimize current and future income tax liabilities through legal deductions and credits.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Retirement account strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Tax-loss harvesting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Charitable giving strategies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Building className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Estate Tax Planning</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Advanced estate planning to minimize estate taxes and ensure smooth wealth transfer to beneficiaries.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Trust structures</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Gift tax strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Generation-skipping planning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Briefcase className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Business Tax Strategy</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Comprehensive business tax planning to maximize deductions and optimize business structure.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Entity selection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Succession planning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Employee benefit optimization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Asset Protection Strategies */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Asset Protection Solutions</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Shield your assets from creditors, lawsuits, and economic volatility
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Domestic Asset Protection",
                  description: "LLC structures, homestead exemptions, and domestic trust strategies to protect your assets within the US legal system.",
                  features: ["Limited Liability Companies", "Homestead Exemptions", "Domestic Trusts", "Insurance Strategies"]
                },
                {
                  icon: Scale,
                  title: "Offshore Protection",
                  description: "International structures for maximum asset protection from domestic legal judgments and economic instability.",
                  features: ["Offshore Trusts", "International LLCs", "Foreign Bank Accounts", "Jurisdictional Planning"]
                },
                {
                  icon: FileText,
                  title: "Estate Planning Protection",
                  description: "Comprehensive estate planning to protect assets for future generations while minimizing taxes.",
                  features: ["Irrevocable Trusts", "Family Limited Partnerships", "Charitable Strategies", "Dynasty Trusts"]
                },
                {
                  icon: TrendingUp,
                  title: "Business Asset Protection",
                  description: "Protect business assets and personal wealth from business liabilities and professional risks.",
                  features: ["Corporate Structures", "Professional Liability Protection", "Business Succession Planning", "Key Person Insurance"]
                }
              ].map((strategy, index) => (
                <motion.div key={index} variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                  <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                    <CardContent className="p-0">
                      <strategy.icon className="w-12 h-12 text-[#15AFF7] mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{strategy.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{strategy.description}</p>
                      <ul className="space-y-2">
                        {strategy.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Benefits from Tax & Asset Protection?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our services are designed for individuals and businesses seeking comprehensive wealth protection
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: "High Net Worth Individuals", description: "Individuals with substantial assets requiring sophisticated protection strategies" },
                { icon: Briefcase, title: "Business Owners", description: "Entrepreneurs and business owners protecting both personal and business assets" },
                { icon: Building, title: "Real Estate Investors", description: "Property owners seeking liability protection and tax optimization" },
                { icon: Users, title: "Professionals", description: "Doctors, lawyers, and other professionals with high liability exposure" },
                { icon: Shield, title: "Retirees", description: "Individuals planning to preserve wealth for retirement and legacy planning" },
                { icon: Heart, title: "Families", description: "Parents wanting to protect assets for their children's future" }
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
                Ready to Protect Your Wealth?
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Schedule a confidential consultation with our tax and asset protection specialists. We'll analyze your situation and create a customized strategy to preserve your wealth.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => navigate('/booking')}
                  className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                  Download Guide
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TaxAssetProtection;
