import { ArrowLeft, CheckCircle, MousePointer, Trophy, Users, Target, Heart, TrendingUp, MapPin, Zap, Award, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/ui/animated-counter";

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
            
            {/* Hero Section with Clean Alignment */}
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-3xl scale-105"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl scale-105"></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
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
                
                {/* Unified 2x2 Leadership Grid - Optimized for All Devices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                  {/* Kevin Jenson - CEO */}
                  <Dialog>
                    <DialogTrigger asChild>
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.1 }}
                         viewport={{ once: true }}
                         className="relative group cursor-pointer h-full flex flex-col"
                       >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                         <div className="relative bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-lg group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-[#15AFF7]/20">
                            <img alt="Kevin Jenson - Founder & CEO" className="w-full h-full object-cover" src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Kevin Jenson</h3>
                          <p className="text-[#15AFF7] font-medium mb-3">Founder & CEO</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                             With nearly two decades in life insurance and annuities—including executive leadership at Quility—Kevin founded Agora in 2025 to reinvent the client experience with technology, speed, and service.
                           </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-[#15AFF7] group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7] to-blue-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" 
                                alt="Kevin Jenson - CEO" 
                                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kevin Jenson</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-[#15AFF7] hover:bg-[#15AFF7]/90">
                                  CEO & Founder
                                </Badge>
                                <Badge variant="outline">
                                  Agora Assurance Solutions
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "From the baseball diamond to the boardroom—transforming insurance with vision and heart."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-[#15AFF7]" />
                                The Journey
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Kevin Jenson's journey from the baseball diamond to the boardroom is a testament to his unyielding drive and visionary leadership. Launching his insurance career in 2005 after a stint in the minor leagues, Kevin has spent nearly 20 years revolutionizing the industry and propelling agencies to new heights.
                                </p>
                                <p>
                                  Kevin's early triumph in mortgage protection sales quickly catapulted him into a leadership role, where he spearheaded national recruitment and team-building initiatives. His innate ability to inspire and lead was evident from the start, setting the stage for a career defined by transformative growth and innovation.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                Industry Leadership
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  As President and CEO of Asurea Wholesale, Kevin led a remarkable surge in life and annuity sales, culminating in a strategic merger that birthed Quility Wholesale in 2020. As a founding shareholder and Senior Vice President, he was the driving force behind the seamless transition and continued success, solidifying his reputation as a dynamic leader and industry pioneer.
                                </p>
                                <p>
                                  In 2024, Kevin took on the mantle of CEO at Agora Assurance Solutions, where he is poised to usher in the next era of consumer education. His vision for leveraging innovative marketing programs and cutting-edge technology promises to elevate the industry standard and drive significant business growth.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/10 rounded-xl p-6 border border-[#15AFF7]/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-[#15AFF7]" />
                                Leadership Philosophy
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                Kevin's leadership philosophy is rooted in <strong>servant leadership</strong>, consistently empowering agents to achieve unprecedented success. His dedication to the craft and relentless pursuit of excellence have earned him the respect of top-tier executives across the insurance landscape.
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-green-600" />
                                Community Impact
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                Beyond the corporate sphere, Kevin is a stalwart community advocate. Actively involved in youth sports and serving on the board of the local little league, his commitment to nurturing the next generation mirrors his professional ethos of mentorship and development.
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-purple-600" />
                                Career Milestones
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#15AFF7] mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2024:</strong>
                                    <span className="text-gray-600"> CEO, Agora Assurance Solutions</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2020:</strong>
                                    <span className="text-gray-600"> Co-founded Quility Wholesale</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2015:</strong>
                                    <span className="text-gray-600"> President & CEO, Asurea Wholesale</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2005:</strong>
                                    <span className="text-gray-600"> Entered insurance industry</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-xl border border-[#15AFF7]/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Kevin Jenson's career is a powerful narrative of perseverance, innovation, and impact—a leader who not only transforms businesses but also enriches communities."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>Leading the future of insurance from the heart of innovation</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                       <motion.div initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      duration: 0.6,
                      delay: 0.6
                     }} className="relative group cursor-pointer h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-blue-500/20">
                            <img alt="Benjamin Schroeder - Director of Communications" className="w-full h-full object-cover object-top" src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Benjamin Schroeder</h3>
                          <p className="text-blue-500 font-medium mb-3">Director of Communications</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                             A skilled strategist with a background in coaching and corporate leadership, Ben ensures our mission stays aligned across every channel—from brand to partnership.
                           </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-blue-500/10 to-purple-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" 
                                alt="Benjamin Schroeder - Director of Communications" 
                                className="relative w-32 h-32 rounded-full object-cover object-top border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Benjamin Schroeder</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-blue-500 hover:bg-blue-500/90">
                                  Director of Communications
                                </Badge>
                                <Badge variant="outline">
                                  Strategic Leadership
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "Transforming corporate narratives through strategic insight and collaborative leadership."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" />
                                Strategic Communications Leader
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  With a robust background in coaching, business development, and corporate structure, Benjamin brings a unique blend of strategic insight and practical experience to their role as Director of Communications. Over the course of 15 years, Benjamin has honed their ability to craft compelling narratives that connect businesses with their audiences, while also driving internal transformation and growth.
                                </p>
                                <p>
                                  In addition to his extensive experience in communications, Benjamin has a strong track record in coaching and mentoring teams, helping individuals and leaders unlock their full potential. This expertise in personal and professional development is complemented by a deep understanding of organizational structure and how effective communication can streamline operations, foster collaboration, and align teams toward a common vision.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-purple-600" />
                                Business Development Excellence
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Throughout his career, Benjamin has played a pivotal role in business development, leveraging their communication skills to create strategic partnerships and expand brand presence across various sectors. From leading internal communications strategies that enhance employee engagement, to shaping external messaging that strengthens corporate reputation, Benjamin has been instrumental in navigating complex business landscapes.
                                </p>
                                <p>
                                  Known for his results-driven approach, Benjamin excels in aligning communication strategies with business objectives, ensuring that both short-term goals and long-term success are achieved. Ben's ability to lead cross-functional teams and manage multiple projects simultaneously is a testament to their strong organizational skills and leadership.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-500/5 to-purple-600/10 rounded-xl p-6 border border-blue-500/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-500" />
                                Core Expertise
                              </h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  <span className="text-sm text-gray-600">Strategic Communications</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span className="text-sm text-gray-600">Coaching & Mentoring</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                  <span className="text-sm text-gray-600">Business Development</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                  <span className="text-sm text-gray-600">Corporate Structure</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                                  <span className="text-sm text-gray-600">Cross-functional Leadership</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-green-600" />
                                Leadership Philosophy
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                With a passion for fostering positive corporate culture and a commitment to driving business success through innovative communication strategies, Benjamin is a trusted leader in the ever-evolving corporate world.
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-orange-600" />
                                Key Achievements
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">15+ years of strategic communications expertise</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Successful coaching and team development programs</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Enhanced employee engagement initiatives</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Strengthened corporate reputation & partnerships</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Benjamin's unique blend of strategic insight, coaching expertise, and communication mastery drives organizational success and fosters meaningful connections across all business channels."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>Connecting teams, aligning visions, achieving results</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                       <motion.div initial={{
                      opacity: 0,
                      x: 20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.6,
                      delay: 0.7
                     }} className="relative group cursor-pointer h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                         <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500/20">
                            <img alt="Olga Lomova - Chief Strategy Officer" className="w-full h-full object-cover object-top" src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Olga Lomova</h3>
                          <p className="text-purple-500 font-medium mb-3">Chief Strategy Officer</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                             An immigrant entrepreneur with deep expertise in financial marketing, Olga leads Agora's growth with a passion for inclusion, innovation, and intelligent expansion.
                           </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-purple-500/10 to-pink-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" 
                                alt="Olga Lomova - Chief Strategy Officer" 
                                className="relative w-32 h-32 rounded-full object-cover object-top border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Olga Lomova</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-purple-500 hover:bg-purple-500/90">
                                  Chief Strategy Officer
                                </Badge>
                                <Badge variant="outline">
                                  Innovation Leader
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "From immigrant entrepreneur to strategic visionary—transforming challenges into opportunities for nationwide impact."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-purple-500" />
                                Strategic Leadership Excellence
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Olga Lomova serves as the Chief Strategy Officer at Agora Assurance Solutions, where she spearheads strategic initiatives that drive growth and innovation. With over 10 years of experience in the Online Marketing and Financial Services Industry, Olga combines a deep understanding of technology-driven market dynamics with a passion for transforming visionary ideas into actionable plans for consumers across the country.
                                </p>
                                <p>
                                  Before helping found Agora Assurance Solutions in 2024, Olga held key leadership positions at Advantage One Brokers, where she built their communications, branding, and marketing divisions to help create over 10 million in gross revenue sales.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-pink-500" />
                                Journey of Resilience
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Olga migrated to the United States in 1998 with her family, fleeing Christian persecution from the Soviet Union. Her worldwide connections and strategic acumen have been instrumental in creating strategic partnerships which have created an ecosystem for consumers nationwide to educate and make better informed decisions when shopping for assurance in an uncertain environment.
                                </p>
                                <p>
                                  As Chief Strategy Officer, Olga is committed to fostering a culture of collaboration and innovation at Agora Assurance Solutions. She focuses on aligning the company's long-term vision with actionable strategies, ensuring that every team member is empowered to contribute to the overall mission of providing assurance to consumers nationwide.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                Personal Values & Community
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Outside of work, Olga enjoys being a wife and mother of three, spending time outdoors and is passionate about helping those who struggle to help themselves. This commitment to wanting to protect others reflects her belief in giving back to the community and educating consumers with online transparency.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-500/5 to-pink-600/10 rounded-xl p-6 border border-purple-500/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                Core Expertise
                              </h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span className="text-sm text-gray-600">Strategic Planning & Innovation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                  <span className="text-sm text-gray-600">Online Marketing & Financial Services</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                  <span className="text-sm text-gray-600">Brand Development & Communications</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                                  <span className="text-sm text-gray-600">Partnership Development</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-fuchsia-500"></div>
                                  <span className="text-sm text-gray-600">Consumer Education & Transparency</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-amber-600" />
                                Education & Background
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">Bachelor of Science in Kinesiology</strong>
                                    <br />
                                    <span className="text-gray-600">Sacramento State University</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">10+ years in Online Marketing & Financial Services</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-green-600" />
                                Key Achievements
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Co-founded Agora Assurance Solutions (2024)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Generated $10M+ in gross revenue at Advantage One Brokers</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Built comprehensive marketing & branding divisions</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Established nationwide consumer education ecosystem</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-xl border border-purple-500/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Olga's journey from immigrant to industry innovator exemplifies the American dream—transforming personal challenges into nationwide solutions that protect and empower families across the country."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Heart className="h-4 w-4" />
                            <span>Building bridges between cultures, communities, and comprehensive coverage</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                   </Dialog>
                </div>

                {/* Second Row - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    <Dialog>
                    <DialogTrigger asChild>
                      <motion.div initial={{
                      opacity: 0,
                      x: 20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.6,
                      delay: 0.9
                    }} className="relative group cursor-pointer h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-orange-500/20">
                            <img alt="Jeff Utley - Director of Advanced Markets" className="w-full h-full object-cover object-center" src="/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Jeff Utley</h3>
                          <p className="text-orange-500 font-medium mb-3">Director of Advanced Markets</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                             A distinguished 25+ year veteran from New York Life and MassMutual, Jeff brings unparalleled expertise in advanced financial planning and client relationship management.
                           </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-orange-500/10 to-amber-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png" 
                                alt="Jeff Utley - Director of Advanced Markets" 
                                className="relative w-32 h-32 rounded-full object-cover object-center border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Jeff Utley</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-orange-500 hover:bg-orange-500/90">
                                  Director of Advanced Markets
                                </Badge>
                                <Badge variant="outline">
                                  Industry Veteran
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "25+ years of excellence—building lasting relationships and crafting tailored financial solutions for lasting security."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-orange-500" />
                                A Remarkable Career Journey
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Jeff embarked on a remarkable journey in the insurance industry in 1999, when he joined New York Life as a Financial Representative and soon was promoted to Partner with the firm. Jeff has held many positions with several firms including MassMutual where he was the Managing Partner. Jeff has established a distinguished career, becoming a highly respected figure in the insurance industry.
                                </p>
                                <p>
                                  From the outset, Jeff demonstrated an exceptional aptitude for understanding client needs and crafting tailored financial solutions. His early success at MassMutual was driven by a commitment to integrity, client-focused service, and a deep understanding of complex financial products. This dedication quickly set him apart as a rising star in the industry.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amber-600" />
                                Excellence & Innovation
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  As Jeff progressed through his career he took on increasingly responsible roles, earning accolades for his innovative approach to financial planning and his ability to build lasting relationships with clients. By combining expert knowledge with a genuine passion for helping individuals and families achieve their financial goals, Jeff has become known for his exceptional service and personalized attention.
                                </p>
                                <p>
                                  Throughout his career, Jeff has been a sought-after advisor, known for his strategic thinking and dedication to client success. He has consistently achieved top performance rankings within the company and has been honored with numerous awards recognizing his excellence in insurance sales and client service.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-yellow-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-yellow-600" />
                                Legacy of Impact
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Jeff's career is a testament to his hard work, perseverance, and dedication to his clients and the insurance industry. His story is one of outstanding achievement and an enduring legacy of positive impact on both clients and the broader community.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-orange-500/5 to-amber-600/10 rounded-xl p-6 border border-orange-500/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-orange-500" />
                                Core Expertise
                              </h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                  <span className="text-sm text-gray-600">Advanced Financial Planning</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                  <span className="text-sm text-gray-600">Client Relationship Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <span className="text-sm text-gray-600">Complex Financial Products</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  <span className="text-sm text-gray-600">Strategic Financial Solutions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                                  <span className="text-sm text-gray-600">Life Insurance & Annuities</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-emerald-600" />
                                Career Timeline
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2024:</strong>
                                    <span className="text-gray-600"> Director of Advanced Markets, Agora</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">2010-2023:</strong>
                                    <span className="text-gray-600"> Managing Partner, MassMutual</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                                  <div>
                                    <strong className="text-gray-900">1999-2010:</strong>
                                    <span className="text-gray-600"> Financial Representative → Partner, New York Life</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Key Achievements
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">25+ years of industry leadership</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Consistently top performance rankings</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Multiple industry awards & recognition</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Expert in tailored financial solutions</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-amber-600/10 rounded-xl border border-orange-500/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Jeff's quarter-century of dedication to excellence and client-focused service represents the gold standard in financial planning and relationship building."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Trophy className="h-4 w-4" />
                            <span>Building trust, delivering excellence, creating lasting financial security</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.div initial={{
                      opacity: 0,
                      x: 20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.6,
                      delay: 1.2
                    }} className="relative group cursor-pointer h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-emerald-500/20">
                            <img alt="Sean Fogelson - Director of Training & Development" className="w-full h-full object-cover object-center" src="/lovable-uploads/6cf856c2-ebee-49a3-85c9-23f3905aa18b.png" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Sean Fogelson</h3>
                          <p className="text-emerald-500 font-medium mb-3">National Sales Director</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                             A visionary leader who pioneered digital communities in the insurance industry and transforms challenges into opportunities through innovative training programs.
                           </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-emerald-500/10 to-teal-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="/lovable-uploads/6cf856c2-ebee-49a3-85c9-23f3905aa18b.png" 
                                alt="Sean Fogelson - Director of Training & Development" 
                                className="relative w-32 h-32 rounded-full object-cover object-center border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sean Fogelson</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-500/90">
                                  Director of Training & Development
                                </Badge>
                                <Badge variant="outline">
                                  Innovation Pioneer
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "Transforming adversity into opportunity through innovative leadership and pioneering digital communities."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-emerald-500" />
                                Innovative Leadership & Entrepreneurial Spirit
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Always ahead of the curve, Sean pioneered one of the first Facebook groups for the insurance industry, "Final Expense Coach." This initiative fostered a collaborative community for insurance professionals, showcasing his forward-thinking approach to networking and professional development and shaping the digital landscape nationwide.
                                </p>
                                <p>
                                  Sean's entrepreneurial journey, though challenging, has been defined by his ability to transform adversity into opportunity. He views every setback as a lesson, fueling his determination to learn, adapt, and innovate.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-teal-600" />
                                Training & Development Excellence
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Recognized as a leader in training and development, Sean has built high-performance teams and mentored countless professionals, empowering them to unlock their potential. His approach combines cutting-edge learning strategies with hands-on leadership, cultivating cultures of continuous improvement and collaboration.
                                </p>
                                <p>
                                  Sean believes that true leadership is measured by its impact on teams, clients, and the community. He is passionate about inspiring others to embrace challenges, pursue excellence, and never settle for less than their best.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border border-cyan-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-cyan-600" />
                                Key Achievements
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <ul className="space-y-2">
                                  <li>• Built a multimillion-dollar telecommunications business from the ground up</li>
                                  <li>• Developed industry-leading training and development programs</li>
                                  <li>• Mentored aspiring entrepreneurs and business leaders</li>
                                  <li>• Overcame early business failures to achieve sustained success</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-600/10 rounded-xl p-6 border border-emerald-500/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-emerald-500" />
                                Core Expertise
                              </h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  <span className="text-sm text-gray-600">Business Innovation & Growth Strategy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                  <span className="text-sm text-gray-600">Team Building & Leadership Development</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                  <span className="text-sm text-gray-600">Training Program Design & Facilitation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span className="text-sm text-gray-600">Resilience & Change Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                                  <span className="text-sm text-gray-600">Strategic Partnerships & Business Development</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-blue-600" />
                                Leadership Philosophy
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                Sean believes that true leadership is measured by its impact on teams, clients, and the community. He is passionate about inspiring others to embrace challenges, pursue excellence, and never settle for less than their best.
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-violet-50 to-white rounded-xl p-6 border border-violet-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-violet-600" />
                                Industry Innovation
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Pioneer of "Final Expense Coach" Facebook community</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Transformed digital landscape for insurance professionals</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Created collaborative learning ecosystems</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Sean's journey from telecommunications entrepreneur to insurance industry innovator demonstrates the power of resilience, vision, and commitment to empowering others."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>Building communities, developing leaders, transforming industries</span>
                          </div>
                        </div>
                      </div>
                     </DialogContent>
                   </Dialog>

                   {/* John Melvin - Director of Marketing */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div initial={{
                        opacity: 0,
                        x: 20
                      }} animate={{
                        opacity: 1,
                        x: 0
                      }} transition={{
                        duration: 0.6,
                        delay: 0.8
                      }} className="relative group cursor-pointer h-full flex flex-col">
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                          <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                            <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-teal-500/20">
                              <img 
                                alt="John Melvin, Director of Marketing at Agora Assurance Solutions"
                                className="w-full h-full object-cover object-top" 
                                src="/lovable-uploads/6c1f83e5-8bfb-4ebd-8f37-2fe6aec80978.png" 
                              />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">John Melvin</h3>
                            <p className="text-teal-600 font-medium mb-3">Director of Marketing</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                              A seasoned insurance strategist turned AI & automation expert, John leads national growth strategy with data-driven campaigns and AI-powered systems at Agora.
                            </p>
                            <Button variant="outline" size="sm" className="w-full group-hover:bg-teal-600 group-hover:text-white transition-colors">
                              Learn More
                            </Button>
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <div className="relative">
                          {/* Hero Header */}
                          <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-teal-500/10 to-cyan-600/20 rounded-t-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-600/10 backdrop-blur-sm"></div>
                            <div className="relative flex flex-col md:flex-row items-center gap-6">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full blur-lg opacity-30 scale-110"></div>
                                <img 
                                  src="/lovable-uploads/6c1f83e5-8bfb-4ebd-8f37-2fe6aec80978.png" 
                                  alt="John Melvin, Director of Marketing at Agora Assurance Solutions" 
                                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                                />
                              </div>
                              <div className="text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">John Melvin</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                  <Badge variant="default" className="bg-teal-600 hover:bg-teal-600/90">
                                    Director of Marketing
                                  </Badge>
                                  <Badge variant="outline">
                                    AI & Automation Expert
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-lg italic">
                                  "Where AI innovation meets insurance excellence—results matter and innovation leads the way."
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Content Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Biography */}
                            <div className="lg:col-span-2 space-y-6">
                              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <TrendingUp className="h-5 w-5 text-teal-600" />
                                  Professional Journey
                                </h3>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                  <p>
                                    John Melvin is a seasoned insurance strategist turned AI & automation expert, with over 15 years of experience helping individuals and businesses protect their futures, scale their operations, and thrive in the digital economy.
                                  </p>
                                  <p>
                                    John began his career in the insurance and financial services space, where he spent more than a decade guiding clients through life insurance, annuities, and retirement planning. His work helped hundreds of families gain peace of mind, while his reputation grew as a reliable advisor and growth-minded leader.
                                  </p>
                                  <p>
                                    Between 2019 and 2023, John went all-in on currency trading, honing skills in data analysis, timing, and financial systems thinking—a transition that deepened his technical and strategic mindset.
                                  </p>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Zap className="h-5 w-5 text-teal-600" />
                                  Current Role & Innovation
                                </h3>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                  <p>
                                    In 2023, with AI shifting the global business landscape, John pivoted again—this time back to his roots in insurance and finance, now infused with digital marketing, automation, and AI innovation. It was the perfect fusion of his experience and forward-thinking mindset.
                                  </p>
                                  <p>
                                    Today, John serves as the Director of Marketing for Agora Assurance Solutions, where he leads the company's national growth strategy by implementing data-driven campaigns, AI-powered recruiting systems, and scalable lead generation frameworks.
                                  </p>
                                  <p>
                                    He's also an AI and automation coach for Billy Gene Is Marketing, where he helps students inside the BGIM program master the new digital frontier and build income-generating systems using AI.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Sidebar Content */}
                            <div className="space-y-6">
                              <div className="bg-gradient-to-br from-teal-500/5 to-cyan-600/10 rounded-xl p-6 border border-teal-500/20">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Target className="h-5 w-5 text-teal-600" />
                                  Core Skills
                                </h3>
                                <ul className="space-y-2 text-gray-600 text-sm leading-relaxed">
                                  <li>• AI & Automation Consulting</li>
                                  <li>• Funnel Strategy & Lead Generation</li>
                                  <li>• Website Development with Backend Dashboards</li>
                                  <li>• SEO & Answer Engine Optimization (AEO)</li>
                                  <li>• Performance Marketing & Offer Building</li>
                                  <li>• Client Acquisition Systems</li>
                                </ul>
                              </div>

                              <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border border-cyan-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Award className="h-5 w-5 text-cyan-600" />
                                  Certifications & Affiliations
                                </h3>
                                <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                                  <p>• Certified in AI automation through Kane and Alessia Minkus' accelerator</p>
                                  <p>• Active member of Perry Belcher's elite mastermind</p>
                                  <p>• AI and automation coach for Billy Gene Is Marketing</p>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Lightbulb className="h-5 w-5 text-orange-600" />
                                  Innovation Philosophy
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed italic">
                                  "Whether he's building out advanced systems, mentoring entrepreneurs, or scaling agency operations, John Melvin is the go-to expert when results matter and innovation leads the way."
                                </p>
                               </div>
                             </div>
                           </div>
                           
                           {/* Bottom Quote Section */}
                           <div className="mt-8 p-6 bg-gradient-to-r from-teal-500/10 to-cyan-600/10 rounded-lg border border-teal-500/20">
                             <div className="flex items-start gap-4">
                               <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                                 <Zap className="w-6 h-6 text-white" />
                               </div>
                               <div>
                                 <p className="text-gray-700 italic mb-3 text-lg leading-relaxed">
                                   "Innovation isn't just about technology—it's about transforming how we connect with people and deliver value. In insurance, every breakthrough brings us closer to truly protecting what matters most."
                                 </p>
                                 <p className="text-teal-600 font-semibold">
                                   Digital Innovation Pioneer
                                 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                      </DialogContent>
                     </Dialog>

                  {/* Tonya Melson - Leadership Card */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.div initial={{
                      opacity: 0,
                      x: 20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.6,
                      delay: 0.9
                    }} className="relative group cursor-pointer h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col min-h-[400px]">
                          <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500/20">
                            <img 
                              alt="Tonya Melson - Insurance Professional"
                              className="w-full h-full object-cover object-center" 
                              src="/lovable-uploads/3c7a3fb0-824b-4cd7-9e6f-6c247e91bae1.png" 
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Tonya Melson</h3>
                          <p className="text-purple-600 font-medium mb-3">Senior Insurance Professional</p>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                            A seasoned insurance agent with over 20 years of managerial and clinical experience, uniquely blending expertise in business operations and patient care.
                          </p>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="relative">
                        {/* Hero Header */}
                        <div className="relative mb-8 -mx-6 -mt-6 p-8 bg-gradient-to-br from-purple-500/10 to-pink-600/20 rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/10 backdrop-blur-sm"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg opacity-30 scale-110"></div>
                              <img 
                                src="/lovable-uploads/de5dd655-f6a5-4ef3-b450-df2723b3efce.png" 
                                alt="Tonya Melson - Insurance Professional" 
                                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Tonya Melson</h1>
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Badge variant="default" className="bg-purple-600 hover:bg-purple-600/90">
                                  Senior Insurance Professional
                                </Badge>
                                <Badge variant="outline">
                                  Clinical & Business Expert
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-lg italic">
                                "Bridging healthcare expertise with insurance protection to serve families with compassion and clarity."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Main Biography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-purple-600" />
                                Healthcare & Business Leadership
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Tonya Melson is a seasoned insurance agent with over 20 years of managerial and clinical experience, uniquely blending expertise in business operations and patient care. From 2007 through 2023, Tonya successfully managed the operations of a medical office, where she oversaw day-to-day logistics and contributed directly to patient care.
                                </p>
                                <p>
                                  With certifications in dynaROM testing, diet, health, and fitness, she has treated patients for a wide range of injuries using PNF therapy and state-of-the-art medical equipment. This clinical background provides her with a unique perspective on the importance of comprehensive protection planning.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-pink-600" />
                                Insurance & Mentorship Excellence
                              </h3>
                              <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                  Tonya's passion for helping people extends far beyond the clinic. As an insurance professional, she is deeply committed to protecting families and guiding them through critical decisions with clarity and compassion. Her healthcare background gives her unique insight into the real-world importance of proper coverage.
                                </p>
                                <p>
                                  She also takes pride in mentoring fellow insurance agents, offering insight and support to help them build strong, sustainable businesses. Driven, knowledgeable, and service-focused, Tonya brings a rare combination of clinical care and business acumen to every client and colleague she serves.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Content */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-500/5 to-pink-600/10 rounded-xl p-6 border border-purple-500/20">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-purple-600" />
                                Clinical Certifications
                              </h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span className="text-sm text-gray-600">DynaROM Testing Certification</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                  <span className="text-sm text-gray-600">Diet & Nutrition Specialist</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                                  <span className="text-sm text-gray-600">Health & Fitness Expert</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                                  <span className="text-sm text-gray-600">PNF Therapy Practitioner</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5 text-blue-600" />
                                Professional Experience
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">20+ years managerial & clinical experience</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Medical office operations management (2007-2023)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">Direct patient care & treatment specialist</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-green-600" />
                                Service Philosophy
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed italic">
                                "My healthcare background has shown me firsthand how critical proper protection is for families. I'm committed to helping people understand their options and make informed decisions with confidence."
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-xl border border-purple-500/20 text-center">
                          <p className="text-lg italic text-gray-700 mb-2">
                            "Tonya's unique combination of clinical expertise and business acumen brings unparalleled depth to client relationships and agent mentorship."
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Heart className="h-4 w-4" />
                            <span>Caring for families, protecting futures, mentoring success</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/10 rounded-xl scale-105 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-[#15AFF7] mb-2">
                        <AnimatedCounter end={50} suffix="+" />
                      </div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl scale-105 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        <AnimatedCounter end={500} prefix="$" suffix="M+" />
                      </div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl scale-105 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-purple-500 mb-2">
                        <AnimatedCounter end={25000} suffix="+" />
                      </div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-xl scale-105 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-orange-500 mb-2">
                        <AnimatedCounter end={100} suffix="+" />
                      </div>
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/5 to-blue-600/5 rounded-3xl scale-105"></div>
                <div className="relative bg-white rounded-2xl border border-gray-200 p-12 shadow-2xl text-center">
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
            }} className="relative">
                <Link to="/careers" className="group inline-flex items-center px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-200 shadow-lg font-medium cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95">
                  Join Our Team
                  <MousePointer className="ml-2 w-4 h-4 group-hover:animate-pulse transition-all" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default About;