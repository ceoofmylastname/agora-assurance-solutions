import { ArrowLeft, CheckCircle, Heart, Shield, DollarSign, Clock, Users, FileText, Calculator, Phone, AlertCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import FinalExpenseEducationModal from '@/components/FinalExpenseEducationModal';
import { ContactModal } from '@/components/ContactModal';
import finalExpenseHero from '@/assets/final-expense-hero-couple.jpg';

const FinalExpense = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
        title="Final Expense Insurance - Protect Your Family from Funeral Costs | Agora Assurance Solutions"
        description="Affordable final expense insurance to cover funeral costs, burial expenses, and outstanding debts. No medical exam required. Guaranteed acceptance ages 50-85."
        imageUrl={finalExpenseHero}
        keywords={['final expense insurance', 'funeral insurance', 'burial insurance', 'no medical exam', 'guaranteed acceptance', 'whole life insurance']}
      />
      
      <section className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-red-500 mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-600/10 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 transform -rotate-1">
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={itemVariants}>
                <div>
                  <motion.div className="inline-block mb-4 px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-sm font-medium" variants={itemVariants}>
                    <Heart className="inline-block w-4 h-4 mr-2" />
                    Final Expense Insurance
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Protect Your Family from Final Expenses
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Affordable whole life insurance designed to cover funeral costs, burial expenses, and outstanding debts. 
                    No medical exam required with guaranteed acceptance for ages 50-85.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src={finalExpenseHero} 
                    alt="Senior couple planning for final expenses with peace of mind"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits of Final Expense Insurance</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Protect your loved ones from the financial burden of final expenses
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Peace of Mind</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Ensure your family is protected from unexpected costs and stress during a difficult time.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Guaranteed Acceptance</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Most policies offer guaranteed acceptance for applicants between ages 50 and 85.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <DollarSign className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Affordable Premiums</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Get the coverage you need at a price that fits your budget with level premiums that never increase.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Quick Approval</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Skip the medical exam and get approved quickly, often within minutes, with a simple application process.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Coverage Options */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Final Expense Coverage Options</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Choose the right coverage amount to meet your specific needs and protect your family
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">$5,000 - $10,000</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Ideal for covering basic funeral expenses and memorial services.</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Simple funeral service
                      </li>
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Cremation costs
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">$15,000 - $25,000</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Provides additional coverage for burial costs, outstanding debts, and medical bills.</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Burial plot and casket
                      </li>
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Medical bills
                      </li>
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Credit card debt
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                  <CardContent className="p-6">
                    <Calculator className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">$30,000 - $50,000</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Comprehensive coverage for all final expenses, estate planning, and wealth transfer.</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Estate planning
                      </li>
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Wealth transfer
                      </li>
                      <li className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-red-500" />
                        Charitable donations
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Why Choose Final Expense */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Final Expense Insurance?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Secure your legacy and protect your family with affordable final expense coverage
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Heart, title: "Peace of Mind", description: "Ensure your loved ones are not burdened with unexpected final expenses." },
                { icon: Shield, title: "Guaranteed Acceptance", description: "Most policies offer guaranteed acceptance for applicants between ages 50 and 85." },
                { icon: DollarSign, title: "Affordable Premiums", description: "Get the coverage you need at a price that fits your budget with level premiums that never increase." },
                { icon: Clock, title: "Quick Approval", description: "Skip the medical exam and get approved quickly, often within minutes, with a simple application process." },
                { icon: Phone, title: "Simple Application", description: "Apply over the phone or online in just a few minutes with no complicated paperwork." },
                { icon: AlertCircle, title: "No Medical Exam", description: "Most final expense policies do not require a medical exam, making it easier to get coverage." }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                    <CardContent className="p-6">
                      <item.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Stories */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Stories, Real Peace of Mind</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                See how final expense insurance has helped families protect their loved ones
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  name: "Mary S.", 
                  location: "Chicago, IL", 
                  story: "After my husband passed, I was so grateful we had a final expense policy. It covered all the funeral costs and gave me one less thing to worry about.",
                  rating: 5
                },
                { 
                  name: "Robert B.", 
                  location: "Miami, FL", 
                  story: "I didn't want to leave my kids with any debt. The final expense policy gave me peace of mind knowing they wouldn't have to pay for my funeral.",
                  rating: 4
                }
              ].map((customer, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-red-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{customer.story}</p>
                      <div className="text-gray-900 font-bold">{customer.name}</div>
                      <div className="text-gray-500 text-sm">{customer.location}</div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-600/5 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl border border-gray-200 p-12 shadow-2xl text-center transform -rotate-1">
              <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent" variants={itemVariants}>
                Give Your Family Peace of Mind
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Don't leave your loved ones with the financial burden of final expenses. Get affordable coverage 
                with no medical exam required and guaranteed acceptance.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Get Coverage Information
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium"
                >
                  Speak with Agent
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <FinalExpenseEducationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </PageLayout>
  );
};

export default FinalExpense;
