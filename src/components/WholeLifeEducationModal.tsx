
import { useState } from 'react';
import { X, Shield, TrendingUp, DollarSign, Clock, Users, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WholeLifeEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WholeLifeEducationModal = ({ isOpen, onClose }: WholeLifeEducationModalProps) => {
  const [currentTab, setCurrentTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'how-it-works', label: 'How It Works', icon: TrendingUp },
    { id: 'benefits', label: 'Benefits', icon: Heart },
    { id: 'who-needs', label: 'Who Needs It', icon: Users }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#15AFF7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#15AFF7]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">What is Whole Life Insurance?</h3>
              <p className="text-gray-600 leading-relaxed">
                Whole life insurance is a type of permanent life insurance that provides coverage for your entire lifetime, 
                as long as premiums are paid. Unlike term life insurance, it combines a death benefit with a cash value 
                component that grows over time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-[#15AFF7]">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Permanent Protection</h4>
                  <p className="text-sm text-gray-600">Coverage that lasts your entire lifetime, never expires</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cash Value Growth</h4>
                  <p className="text-sm text-gray-600">Builds cash value you can borrow against or withdraw</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 'how-it-works':
        return (
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">How Whole Life Insurance Works</h3>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Premium Payments",
                  description: "You pay fixed premiums that never increase throughout your lifetime"
                },
                {
                  step: "2", 
                  title: "Death Benefit Protection",
                  description: "A guaranteed death benefit is paid to your beneficiaries tax-free"
                },
                {
                  step: "3",
                  title: "Cash Value Accumulation", 
                  description: "Part of your premium builds cash value that grows at a guaranteed rate"
                },
                {
                  step: "4",
                  title: "Access Your Cash Value",
                  description: "Borrow against or withdraw from your cash value during your lifetime"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#15AFF7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'benefits':
        return (
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Key Benefits</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  icon: Shield, 
                  title: "Guaranteed Death Benefit", 
                  description: "Tax-free payment to beneficiaries no matter when you pass away",
                  color: "text-[#15AFF7]"
                },
                { 
                  icon: DollarSign, 
                  title: "Fixed Premiums", 
                  description: "Premiums never increase, providing predictable costs",
                  color: "text-green-500"
                },
                { 
                  icon: TrendingUp, 
                  title: "Cash Value Growth", 
                  description: "Guaranteed growth rate with tax-deferred accumulation",
                  color: "text-purple-500"
                },
                { 
                  icon: Clock, 
                  title: "Lifetime Coverage", 
                  description: "Coverage that never expires as long as premiums are paid",
                  color: "text-orange-500"
                }
              ].map((benefit, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <benefit.icon className={`w-8 h-8 ${benefit.color} mb-3`} />
                    <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tax Advantages</h4>
              <ul className="space-y-2">
                {[
                  "Cash value grows tax-deferred",
                  "Death benefit is tax-free to beneficiaries", 
                  "Policy loans are generally tax-free",
                  "No required minimum distributions"
                ].map((advantage, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7] flex-shrink-0" />
                    <span className="text-sm text-gray-600">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );

      case 'who-needs':
        return (
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Who Should Consider Whole Life?</h3>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "High-Income Earners",
                  description: "Those who have maxed out other retirement savings options and want additional tax-advantaged growth",
                  icon: TrendingUp
                },
                {
                  title: "Business Owners", 
                  description: "Professionals needing permanent coverage for business succession planning or key person insurance",
                  icon: Shield
                },
                {
                  title: "Estate Planners",
                  description: "Individuals who want to leave a guaranteed inheritance or pay estate taxes",
                  icon: Users
                },
                {
                  title: "Conservative Investors",
                  description: "Those who prefer guaranteed growth over market-based investments",
                  icon: DollarSign
                }
              ].map((persona, index) => (
                <Card key={index} className="border-l-4 border-l-[#15AFF7] hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <persona.icon className="w-6 h-6 text-[#15AFF7] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{persona.title}</h4>
                        <p className="text-sm text-gray-600">{persona.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Consideration</h4>
              <p className="text-sm text-yellow-700">
                Whole life insurance is generally more expensive than term life insurance. Consider your budget, 
                financial goals, and timeline when deciding between permanent and term coverage.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col h-full"
        >
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Understanding Whole Life Insurance
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="px-6 pt-4">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      currentTab === tab.id
                        ? 'bg-white text-[#15AFF7] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="order-2 sm:order-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      onClose();
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="order-1 sm:order-2 bg-[#15AFF7] hover:bg-[#0D94D1]"
                >
                  Get My Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WholeLifeEducationModal;
