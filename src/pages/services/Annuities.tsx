import { ArrowLeft, CheckCircle, Shield, DollarSign, TrendingUp, Clock, Heart, Users, Calendar, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import retirementPlanningCouple from '@/assets/retirement-planning-couple.webp';

const Annuities = () => {
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
        title="Annuities - Guaranteed Retirement Income | Agora Assurance Solutions"
        description="Secure your retirement with annuities that provide guaranteed income for life. Fixed, indexed, immediate, and deferred annuity options available."
        imageUrl={retirementPlanningCouple}
        keywords={['annuities', 'retirement income', 'guaranteed income', 'fixed annuity', 'indexed annuity', 'retirement planning']}
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
                    <DollarSign className="inline-block w-4 h-4 mr-2" />
                    Annuities
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Guaranteed Retirement Income You Can't Outlive
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    An annuity turns your savings into guaranteed income for retirement. Make a lump sum or series of payments, and receive monthly income for life or a set period.
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
                      Get Your Quote
                    </button>
                    <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src={retirementPlanningCouple} 
                    alt="Secure retirement with guaranteed annuity income"
                    className="relative rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Types of Annuities */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Annuities</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Choose the annuity type that best fits your retirement income needs and risk tolerance
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-12 h-12 text-[#15AFF7] mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fixed Annuity</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Guaranteed interest rate and predictable payouts provide stable, conservative growth for your retirement.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Guaranteed interest rate</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Predictable payouts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Principal protection</span>
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Indexed Annuity</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Growth tied to a market index with downside protection, offering growth potential without market risk.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Market index growth potential</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Downside protection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Floor protection (usually 0%)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Clock className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Immediate Annuity</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Income begins right away after a single premium payment, perfect for those already in retirement.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Immediate income start</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Single premium payment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Lifetime income options</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Calendar className="w-12 h-12 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Deferred Annuity</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Income starts at a future date, allowing your money to grow tax-deferred until retirement.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Future income start</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Tax-deferred growth</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Accumulation phase</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Annuities?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Annuities provide unique benefits that other retirement vehicles cannot match
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0 text-center">
                    <Heart className="w-12 h-12 text-[#15AFF7] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Income for Life Options</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Choose lifetime income options that guarantee you'll never outlive your money, no matter how long you live.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0 text-center">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Tax-Deferred Growth</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your money grows tax-deferred, meaning you don't pay taxes on gains until you start taking withdrawals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0 text-center">
                    <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Optional Enhanced Riders</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Add riders for long-term care benefits, death benefits, or enhanced income guarantees.
                    </p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Are Annuities Right for You?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Annuities are ideal for retirees and pre-retirees who want guaranteed income security
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Pre-Retirees", description: "Individuals 5-10 years from retirement who want to ensure guaranteed income" },
                { icon: Briefcase, title: "Current Retirees", description: "Those already retired who need immediate or near-term income replacement" },
                { icon: DollarSign, title: "Conservative Investors", description: "People who prefer guaranteed returns over market volatility" },
                { icon: Shield, title: "Longevity Concerned", description: "Anyone worried about outliving their retirement savings" },
                { icon: Clock, title: "Pension Replacers", description: "Workers without traditional pensions seeking guaranteed income" },
                { icon: Heart, title: "Peace of Mind Seekers", description: "Those who value financial security and predictable income above all" }
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
                Start Building Your Retirement Income Today
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Get personalized annuity quotes and discover how guaranteed income can secure your retirement years with confidence.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Get Free Quote
                </button>
                <button 
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium"
                >
                  Speak with Advisor
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Annuities;