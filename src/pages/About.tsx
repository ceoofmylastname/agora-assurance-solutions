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
  return <PageLayout>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#15AFF7] mb-8 transition-all duration-300 hover:translate-x-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            {/* Hero Section with 3D Effect */}
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-3xl transform rotate-1 scale-105"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 transform -rotate-1">
                <motion.h1 initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6
              }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  About Agora Assurance Solutions
                </motion.h1>
                
                <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }} className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-600 font-light">
                    A Smarter Way to Protect What Matters
                  </p>
                  
                  <p className="text-lg text-gray-600">
                    At Agora, we believe the insurance industry needed a reset—so we built one.
                  </p>
                  
                  <p className="text-lg text-gray-600">
                    We're a tech-powered, people-first assurance company on a mission to remove the complexity, pressure, and confusion from buying insurance. Whether you're protecting your home, your income, your retirement, or your family's legacy—we give you the tools, transparency, and human guidance to make the right choice.
                  </p>
                </motion.div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.6
              }} className="space-y-6">
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-gray-600">
                    To empower families with <em>clarity, confidence, and control</em> when it comes to life's most important financial decisions. We combine cutting-edge technology with licensed, compassionate professionals to simplify insurance for the modern consumer.
                  </p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.6,
                delay: 0.2
              }} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-2 scale-105"></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">What Makes Us Different</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start group">
                        <div className="h-6 w-6 rounded-full bg-[#15AFF7]/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:bg-[#15AFF7]/30 transition-colors">
                          <CheckCircle className="h-4 w-4 text-[#15AFF7]" />
                        </div>
                        <span><strong className="text-gray-900">Independent & Unbiased:</strong> <span className="text-gray-600">We don't push one carrier or product. We're your advocate—not a salesperson.</span></span>
                      </li>
                      <li className="flex items-start group">
                        <div className="h-6 w-6 rounded-full bg-[#15AFF7]/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:bg-[#15AFF7]/30 transition-colors">
                          <CheckCircle className="h-4 w-4 text-[#15AFF7]" />
                        </div>
                        <span><strong className="text-gray-900">Built with AI + Heart:</strong> <span className="text-gray-600">Our proprietary tech delivers quotes and comparisons in seconds—but every decision is guided by real humans who care.</span></span>
                      </li>
                      <li className="flex items-start group">
                        <div className="h-6 w-6 rounded-full bg-[#15AFF7]/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:bg-[#15AFF7]/30 transition-colors">
                          <CheckCircle className="h-4 w-4 text-[#15AFF7]" />
                        </div>
                        <span><strong className="text-gray-900">Full-Service Protection:</strong> <span className="text-gray-600">From term life to annuities, mortgage protection to tax planning—we cover the full spectrum of financial protection.</span></span>
                      </li>
                      <li className="flex items-start group">
                        <div className="h-6 w-6 rounded-full bg-[#15AFF7]/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:bg-[#15AFF7]/30 transition-colors">
                          <CheckCircle className="h-4 w-4 text-[#15AFF7]" />
                        </div>
                        <span><strong className="text-gray-900">Real People, Real Help:</strong> <span className="text-gray-600">Our licensed advisors offer hands-on support with no pressure and no fluff—just honest help when you need it.</span></span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.4
            }} className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Leadership with Vision</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  duration: 0.6,
                  delay: 0.5
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-[#15AFF7]/20">
                        <img alt="Kevin Jenson - Founder & CEO" className="w-full h-full object-cover" src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Kevin Jenson</h3>
                      <p className="text-[#15AFF7] font-medium mb-3">Founder & CEO</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        With nearly two decades in life insurance and annuities—including executive leadership at Quility—Kevin founded Agora in 2024 to reinvent the client experience with technology, speed, and service.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6,
                  delay: 0.6
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-blue-500/20">
                        <img alt="Benjamin Schroeder - Director of Communications" className="w-full h-full object-cover object-top" src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Benjamin Schroeder</h3>
                      <p className="text-blue-500 font-medium mb-3">Director of Communications</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        A skilled strategist with a background in coaching and corporate leadership, Ben ensures our mission stays aligned across every channel—from brand to partnership.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{
                  opacity: 0,
                  x: 20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  duration: 0.6,
                  delay: 0.7
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500/20">
                        <img alt="Olga Lomova - Chief Strategy Officer" className="w-full h-full object-cover" src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Olga Lomova</h3>
                      <p className="text-purple-500 font-medium mb-3">Chief Strategy Officer</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        An immigrant entrepreneur with deep expertise in financial marketing, Olga leads Agora's growth with a passion for inclusion, innovation, and intelligent expansion.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }} className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">By the Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.4,
                  delay: 0.7
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/10 rounded-xl transform rotate-2 scale-105 group-hover:rotate-3 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="text-3xl font-bold text-[#15AFF7] mb-2">50+</div>
                      <div className="text-gray-600 text-sm">years combined leadership experience</div>
                    </div>
                  </motion.div>
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.4,
                  delay: 0.8
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl transform -rotate-2 scale-105 group-hover:-rotate-3 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="text-3xl font-bold text-green-500 mb-2">$500M+</div>
                      <div className="text-gray-600 text-sm">in tax-free benefits created</div>
                    </div>
                  </motion.div>
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.4,
                  delay: 0.9
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl transform rotate-2 scale-105 group-hover:rotate-3 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="text-3xl font-bold text-purple-500 mb-2">2,500+</div>
                      <div className="text-gray-600 text-sm">lives protected and counting</div>
                    </div>
                  </motion.div>
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.4,
                  delay: 1.0
                }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-xl transform -rotate-2 scale-105 group-hover:-rotate-3 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="text-3xl font-bold text-orange-500 mb-2">100+</div>
                      <div className="text-gray-600 text-sm">business and carrier partnerships</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.8
            }} className="mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/5 to-blue-600/5 rounded-3xl transform rotate-1 scale-105"></div>
                <div className="relative bg-white rounded-2xl border border-gray-200 p-12 shadow-2xl text-center transform -rotate-1">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#15AFF7] to-blue-600 bg-clip-text text-transparent">
                    The Future of Insurance Starts Here
                  </h2>
                  <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
                    We're not here to sell you a policy. We're here to help you protect your future, your way. Welcome to Agora—where modern insurance meets timeless care.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 1.2
            }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/20 to-blue-600/20 rounded-lg transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Link to="/careers" className="relative inline-flex items-center px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform -rotate-1 group-hover:rotate-0 shadow-lg font-medium">
                  Join Our Team
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default About;