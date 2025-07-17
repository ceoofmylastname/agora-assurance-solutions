import { ArrowLeft, CheckCircle, Home, Shield, DollarSign, Clock, TrendingDown, Users, AlertCircle, Calculator, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';
import MortgageProtectionModal from '@/components/MortgageProtectionModal';
import heroFamily from '@/assets/hero-family-protection.webp';

const MortgageProtection = () => {
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
        title="Mortgage Protection Insurance - Protect Your Family's Home | Agora Assurance Solutions"
        description="Ensure your family keeps their home with mortgage protection insurance. Affordable life insurance designed to pay off your mortgage and protect your family's future."
        imageUrl={heroFamily}
        keywords={['mortgage protection insurance', 'mortgage life insurance', 'home protection', 'family security', 'mortgage payoff insurance']}
      />
      
      <section className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 transform -rotate-1">
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={itemVariants}>
                <div>
                  <motion.div className="inline-block mb-4 px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium" variants={itemVariants}>
                    <Home className="inline-block w-4 h-4 mr-2" />
                    Mortgage Protection Insurance
                  </motion.div>
                  <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" variants={itemVariants}>
                    Protect Your Family's Home
                  </motion.h1>
                  <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={itemVariants}>
                    Ensure your family keeps their home with mortgage protection insurance. Affordable life insurance 
                    designed specifically to pay off your mortgage and protect your family's most important asset.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                    >
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src={heroFamily} 
                    alt="Family protected by mortgage insurance standing in front of their home"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits of Mortgage Protection</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Protect your family's future and ensure they can stay in their home
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Guaranteed Home Ownership</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Your family can keep their home without the burden of mortgage payments.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Affordable Protection</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Get peace of mind with affordable monthly premiums that fit your budget.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Simplified Application</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Easy application process with no medical exam required for most coverage amounts.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Family Security</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Provide emotional and financial security for your loved ones during a difficult time.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div 
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Mortgage Protection Works</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A simple and effective way to safeguard your family's home
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Get a Policy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Purchase a mortgage protection policy with coverage matching your mortgage balance.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Pay Premiums</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Make regular premium payments to keep your coverage active.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Family Protected</h3>
                <p className="text-gray-600 text-sm leading-relaxed">If you pass away, the policy pays off the mortgage, ensuring your family keeps their home.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mortgage Protection Coverage Options</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Choose the right coverage to fit your needs and budget
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <TrendingDown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Decreasing Term</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Coverage decreases over time, matching your mortgage balance.</p>
                    <ul className="mt-4 text-sm text-gray-600">
                      <li className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        Lower premiums
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        Simple coverage
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Home className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Level Term</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Coverage remains the same, providing extra protection for other expenses.</p>
                    <ul className="mt-4 text-sm text-gray-600">
                      <li className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        Fixed coverage amount
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        More flexibility
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Add-On Riders</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Customize your policy with riders like disability or critical illness coverage.</p>
                    <ul className="mt-4 text-sm text-gray-600">
                      <li className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        Enhanced protection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                        Tailored coverage
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Stories, Real Protection</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                See how mortgage protection insurance has helped families like yours
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Star className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      "After my husband passed away unexpectedly, I didn't know how I would keep our home. Thankfully, our mortgage protection policy paid off the remaining balance, and I was able to stay in the house we loved."
                    </p>
                    <div className="text-gray-800 font-bold">- Sarah J.</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-blue-600/30">
                  <CardContent className="p-6">
                    <Star className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      "Getting mortgage protection was one of the best decisions we made. It gave us peace of mind knowing that our children would always have a place to call home, no matter what."
                    </p>
                    <div className="text-gray-800 font-bold">- Michael & Emily K.</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl border border-gray-200 p-12 shadow-2xl text-center transform -rotate-1">
              <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" variants={itemVariants}>
                Secure Your Family's Home Today
              </motion.h2>
              <motion.p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Don't leave your family at risk of losing their home. Get affordable mortgage protection 
                insurance and ensure your loved ones can stay in the home they love.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  Get Protection Quote
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium">
                  Speak with Expert
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <MortgageProtectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default MortgageProtection;
