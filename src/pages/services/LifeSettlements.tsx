import { ArrowLeft, CheckCircle, DollarSign, Shield, TrendingUp, Users, Clock, Heart, Calculator, Target, Building2, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import businessMeetingAdvisors from '@/assets/business-meeting-advisors.webp';

const LifeSettlements = () => {
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
        title="Life Settlements - Turn Your Life Insurance Into Cash | Agora Assurance Solutions"
        description="Discover life settlements - sell your life insurance policy for more than cash value. Get immediate funds while you're alive instead of letting your policy lapse."
        imageUrl={businessMeetingAdvisors}
        keywords={['life settlements', 'sell life insurance', 'policy sale', 'senior life insurance', 'viatical settlements', 'life insurance cash']}
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
                    Life Settlements
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Turn Your Life Insurance Into Cash Today
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    A life settlement allows you to sell your life insurance policy for more than the cash surrender value, providing immediate funds when you need them most.
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
                      Get Policy Evaluation
                    </button>
                    <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src={businessMeetingAdvisors} 
                    alt="Professional consultation for life settlements"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Consider a Life Settlement?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Get more value from your life insurance policy than surrendering it or letting it lapse
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <DollarSign className="w-10 h-10 text-[#15AFF7] mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Immediate Cash</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Receive cash now instead of waiting for the death benefit or losing the policy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Higher Value</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Typically 2-5x more than cash surrender value, maximizing your policy's worth.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-10 h-10 text-purple-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No More Premiums</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Stop paying expensive premiums on coverage you no longer need.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Heart className="w-10 h-10 text-orange-500 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Peace of Mind</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Use the funds for medical care, living expenses, or other priorities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Settlement Process */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Life Settlements Work</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A simple 4-step process to convert your life insurance policy into cash
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  step: "1", 
                  title: "Policy Evaluation", 
                  description: "We assess your policy's value and determine if it qualifies for a life settlement",
                  icon: Calculator
                },
                { 
                  step: "2", 
                  title: "Market Auction", 
                  description: "Your policy is presented to qualified buyers who compete for the best offer",
                  icon: TrendingUp
                },
                { 
                  step: "3", 
                  title: "Review Offers", 
                  description: "You review and choose the best offer, with no obligation to accept",
                  icon: Shield
                },
                { 
                  step: "4", 
                  title: "Get Paid", 
                  description: "Once you accept, funds are transferred and premium payments stop",
                  icon: DollarSign
                }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                  <Card className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-[#15AFF7] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {item.step}
                        </div>
                        <item.icon className="w-6 h-6 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Qualifying Policies */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Qualifying Policies</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Most life insurance policies can qualify for a life settlement with the right circumstances
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-12 h-12 text-[#15AFF7] mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Term Life Policies</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Convertible term policies that can be converted to permanent insurance often qualify.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Convertible term life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Group term conversions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Level term policies</span>
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Permanent Policies</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Whole life, universal life, and variable life policies are excellent candidates.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Whole life insurance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Universal life policies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Variable life insurance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Building2 className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Group & Corporate</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Group life insurance and corporate-owned policies may also qualify for settlements.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Group life conversions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Corporate owned policies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Key person insurance</span>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Should Consider Life Settlements?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Life settlements can benefit various individuals in different life circumstances
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Seniors (65+)", description: "Policy holders who no longer need the coverage or can't afford premiums" },
                { icon: Heart, title: "Health Changes", description: "Those with declining health who want to access policy value while alive" },
                { icon: DollarSign, title: "Financial Hardship", description: "Individuals facing unexpected expenses or reduced income" },
                { icon: Clock, title: "Changed Circumstances", description: "People whose beneficiaries no longer need the death benefit" },
                { icon: Target, title: "Business Owners", description: "Entrepreneurs who no longer need key person or business protection" },
                { icon: Coins, title: "Estate Planners", description: "Those wanting to maximize their estate's liquid assets" }
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
                Unlock Your Policy's Hidden Value
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Don't let your life insurance policy lapse or settle for minimal cash value. Discover how much your policy could be worth in a life settlement.
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
                  Get Free Evaluation
                </button>
                <button className="px-8 py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium">
                  Speak with Expert
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LifeSettlements;