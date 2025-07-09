
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-4xl font-bold mb-6"
            >
              About Agora Assurance Solutions
            </motion.h1>
            
            <div className="prose prose-lg max-w-none">
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="text-xl text-gray-600 mb-12"
              >
                A Smarter Way to Protect What Matters
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.3 }} 
                className="text-lg text-gray-600 mb-12"
              >
                At Agora, we believe the insurance industry needed a reset—so we built one.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.4 }} 
                className="text-lg text-gray-600 mb-12"
              >
                We're a tech-powered, people-first assurance company on a mission to remove the complexity, pressure, and confusion from buying insurance. Whether you're protecting your home, your income, your retirement, or your family's legacy—we give you the tools, transparency, and human guidance to make the right choice.
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-gray-600">
                    To empower families with <em>clarity, confidence, and control</em> when it comes to life's most important financial decisions. We combine cutting-edge technology with licensed, compassionate professionals to simplify insurance for the modern consumer.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Independent & Unbiased:</strong> We don't push one carrier or product. We're your advocate—not a salesperson.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Built with AI + Heart:</strong> Our proprietary tech delivers quotes and comparisons in seconds—but every decision is guided by real humans who care.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Full-Service Protection:</strong> From term life to annuities, mortgage protection to tax planning—we cover the full spectrum of financial protection.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Real People, Real Help:</strong> Our licensed advisors offer hands-on support with no pressure and no fluff—just honest help when you need it.</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">Leadership with Vision</h2>
                <div className="space-y-8">
                  <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Kevin Jenson – <span className="text-gray-600 font-normal italic">Founder & CEO</span></h3>
                    <p className="text-gray-600">
                      With nearly two decades in life insurance and annuities—including executive leadership at Quility—Kevin founded Agora in 2024 to reinvent the client experience with technology, speed, and service.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Benjamin Schroeder – <span className="text-gray-600 font-normal italic">Director of Communications</span></h3>
                    <p className="text-gray-600">
                      A skilled strategist with a background in coaching and corporate leadership, Ben ensures our mission stays aligned across every channel—from brand to partnership.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Olga Lomova – <span className="text-gray-600 font-normal italic">Chief Strategy Officer</span></h3>
                    <p className="text-gray-600">
                      An immigrant entrepreneur with deep expertise in financial marketing, Olga leads Agora's growth with a passion for inclusion, innovation, and intelligent expansion.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">By the Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">50+</div>
                    <div className="text-gray-600">years combined leadership experience</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">$500M+</div>
                    <div className="text-gray-600">in tax-free benefits created</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">2,500+</div>
                    <div className="text-gray-600">lives protected and counting</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">100+</div>
                    <div className="text-gray-600">business and carrier partnerships</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-16"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
                  <h2 className="text-3xl font-bold mb-4">The Future of Insurance Starts Here</h2>
                  <p className="text-gray-600 text-lg">
                    We're not here to sell you a policy. We're here to help you protect your future, your way. Welcome to Agora—where modern insurance meets timeless care.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/careers" className="inline-flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group">
                Join Our Team
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
