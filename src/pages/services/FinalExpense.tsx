import { ArrowLeft, CheckCircle, Shield, Users, Clock, Heart, DollarSign, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import finalExpenseCouple from '@/assets/final-expense-couple.webp';

const FinalExpense = () => {
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
        title="Final Expense Insurance - Easy End-of-Life Coverage | Agora Assurance Solutions"
        description="Simple final expense insurance with guaranteed acceptance. Cover funeral costs, medical bills, and debts with no medical exam required."
        imageUrl={finalExpenseCouple}
        keywords={['final expense insurance', 'burial insurance', 'funeral insurance', 'guaranteed acceptance', 'no medical exam life insurance']}
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
                    <Heart className="inline-block w-4 h-4 mr-2" />
                    Final Expense Insurance
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Cheapest Final Expense Insurance for Seniors Without Medical Exam
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Get guaranteed acceptance burial insurance for ages 50-85 with no medical exam. Cover funeral costs ($7,000-$15,000) and debts with fixed premiums that never increase.
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
                    src={finalExpenseCouple} 
                    alt="Senior couple planning for final expenses"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Final Expense Insurance?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Protect your family from unexpected end-of-life expenses with guaranteed, affordable coverage
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-12 h-12 text-[#15AFF7] mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Approval</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Most policies offer guaranteed acceptance with no medical exam or health questions required.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">No medical exam</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">No health questions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#15AFF7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Quick approval</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <DollarSign className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Coverage</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Smaller face amounts (typically $5,000 – $25,000) keep premiums low and affordable for seniors.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Low monthly premiums</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Fixed premiums for life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Permanent coverage</span>
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Payout</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Claims are processed quickly so your family can access funds when they need them most.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Rapid claim processing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Direct beneficiary payment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Tax-free benefits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Coverage Amounts */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Coverage Options</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Choose the coverage amount that fits your needs and budget
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['$5,000', '$10,000', '$15,000', '$20,000', '$25,000'].map((amount, index) => (
                <motion.div key={amount} variants={itemVariants}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#15AFF7]/30">
                    <CardContent className="p-6">
                      <DollarSign className="w-8 h-8 text-[#15AFF7] mx-auto mb-3" />
                      <h3 className="font-bold text-lg text-gray-900">{amount}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {index === 0 && 'Basic coverage'}
                        {index === 1 && 'Essential protection'}
                        {index === 2 && 'Popular choice'}
                        {index === 3 && 'Enhanced coverage'}
                        {index === 4 && 'Maximum protection'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What It Covers */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Final Expense Insurance Covers</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Your policy can help cover various end-of-life expenses your family may face
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Funeral Costs", description: "Funeral services, burial plots, caskets, and memorial expenses" },
                { icon: FileText, title: "Medical Bills", description: "Outstanding medical expenses and final healthcare costs" },
                { icon: DollarSign, title: "Outstanding Debts", description: "Credit cards, personal loans, and other remaining debts" },
                { icon: Users, title: "Family Support", description: "Additional financial support for your loved ones during difficult times" }
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

          {/* Who It's For */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Is Final Expense Insurance Right for You?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                This coverage is ideal for seniors who want simple, guaranteed protection
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Seniors (50+)", description: "Older adults looking for lifelong coverage with easy approval" },
                { icon: Shield, title: "Health Concerns", description: "Those with health issues who may not qualify for traditional life insurance" },
                { icon: Heart, title: "Family Protectors", description: "People who don't want to burden their family with final expenses" },
                { icon: DollarSign, title: "Fixed Income", description: "Retirees on limited budgets who need affordable protection" },
                { icon: Clock, title: "Quick Coverage", description: "Anyone needing immediate coverage without delays or medical exams" },
                { icon: FileText, title: "Simple Needs", description: "Those wanting straightforward coverage without complexity" }
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
                Get Coverage in Minutes, Not Months
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Apply for final expense insurance today with guaranteed acceptance and no medical exam. Protect your family from unexpected costs.
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

export default FinalExpense;