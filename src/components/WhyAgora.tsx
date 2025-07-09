
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Calculator, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/ui/animated-counter";

const WhyAgora = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  return <section id="why-agora" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 md:mb-16" initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} variants={containerVariants}>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Why Agora Assurance?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg max-w-3xl mx-auto">
            Supporting your family's assurance and well-being with transparency, technology, and trusted expertise
          </motion.p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} variants={containerVariants}>
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={50} suffix="+" /> Years
            </h3>
            <p className="text-gray-700">Combined experience protecting families and building financial security</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={25000} suffix="+" /> 
            </h3>
            <p className="text-gray-700">
              Lives protected through our comprehensive insurance and financial solutions
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={500} suffix="M" prefix="$" />
            </h3>
            <p className="text-gray-700">
              In tax-free benefits created for our clients and their families
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What Makes Agora Different
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our unique approach combines cutting-edge technology with human expertise for transparent, personalized service
            </p>
          </motion.div>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Calculator className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Technology-Driven</h4>
                  <p className="text-gray-700">We leverage AI and proprietary systems to compare a wide range of products at once, giving you clarity without overwhelm.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Shield className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Consumer-First Advocacy</h4>
                  <p className="text-gray-700">As an independent consumer advocate, our mission is centered on transparency, not commission.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Award className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Licensed Experts</h4>
                  <p className="text-gray-700">We connect you directly to vetted, state-regulated advisors—no bots, no middlemen.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <CheckCircle className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Peace of Mind</h4>
                  <p className="text-gray-700">Over <AnimatedCounter end={50} className="text-gray-700" /> years of combined experience, <AnimatedCounter end={100} suffix="+" className="text-gray-700" /> business partners, and proven results you can trust.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-10">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all group font-medium"
            >
              Get Your Personalized Quote Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};

export default WhyAgora;
