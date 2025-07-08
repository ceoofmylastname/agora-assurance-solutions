
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Star, ChevronDown, Linkedin, Mail, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const MissionLeadership = () => {
  const isMobile = useIsMobile();
  const [missionExpanded, setMissionExpanded] = useState(false);
  const [visionExpanded, setVisionExpanded] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
        duration: isMobile ? 0.6 : 0.8
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: isMobile ? 15 : 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const leaders = [
    {
      name: "Kevin Jenson",
      title: "Chief Executive Officer",
      experience: "20+ years in life & annuity leadership",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      gradient: "from-slate-600 to-slate-700",
      bgAccent: "bg-slate-50"
    },
    {
      name: "Benjamin Schroeder", 
      title: "Director of Communications",
      experience: "15+ years in coaching and corporate strategy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      gradient: "from-blue-600 to-blue-700",
      bgAccent: "bg-blue-50"
    },
    {
      name: "Olga Lomova",
      title: "Chief Strategy Officer", 
      experience: "10+ years scaling marketing & financial services",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      gradient: "from-violet-600 to-violet-700",
      bgAccent: "bg-violet-50"
    },
    {
      name: "Sarah Chen",
      title: "Head of Technology",
      experience: "12+ years in fintech and AI solutions", 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      gradient: "from-emerald-600 to-emerald-700",
      bgAccent: "bg-emerald-50"
    },
    {
      name: "Michael Rodriguez",
      title: "VP of Client Relations",
      experience: "8+ years in customer success and operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face", 
      gradient: "from-amber-600 to-amber-700",
      bgAccent: "bg-amber-50"
    }
  ];

  return (
    <section id="mission" className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 md:mb-6"
          >
            Our Mission & Leadership
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Built by industry pioneers and powered by AI-driven systems
          </motion.p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={containerVariants}
        >
          {/* Mission Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Collapsible open={missionExpanded} onOpenChange={setMissionExpanded}>
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 md:p-8 rounded-2xl border border-blue-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-500 h-full backdrop-blur-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Target className="w-6 h-6 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${missionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Agora Advisor Solution is dedicated to supporting your family's assurance and well-being.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6">
                  <div className="space-y-4 pt-4 border-t border-blue-200/50">
                    {[
                      { key: "Dedicated", desc: "Faithfully providing you appropriate solutions" },
                      { key: "Supporting", desc: "Realize your needs and wants" },
                      { key: "Family", desc: "Fortifying your family's financial legacy" },
                      { key: "Assurance", desc: "Protecting your family's peace of mind" },
                      { key: "Well-being", desc: "Safeguarding your loved one's future" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="font-bold text-[#15AFF7] mr-3 mt-1 flex-shrink-0">•</span>
                        <div className="text-base">
                          <span className="font-semibold text-gray-800">{item.key}</span> - {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Collapsible open={visionExpanded} onOpenChange={setVisionExpanded}>
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 md:p-8 rounded-2xl border border-blue-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-500 h-full backdrop-blur-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Eye className="w-6 h-6 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${visionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Equipping independent agents across America with cutting-edge technology and resources.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6">
                  <div className="pt-4 border-t border-blue-200/50">
                    <p className="text-gray-700 text-base leading-relaxed">
                      Agora Advisor Solutions is determined to equip independent agents and agencies across America with carriers, leads, and technology packages to ensure they are leading their competitors.
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>
        </motion.div>

        {/* Leadership Team Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={containerVariants}
          className="mt-16"
        >
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Our Leadership Team
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Meet the visionaries driving innovation in insurance technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group h-full"
              >
                <div className={`relative bg-white ${leader.bgAccent} border-0 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col backdrop-blur-sm`}>
                  
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-transparent to-gray-300 rounded-2xl p-px">
                    <div className={`w-full h-full bg-white ${leader.bgAccent} rounded-2xl`}></div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Profile Image with Enhanced Styling */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${leader.gradient} p-1`}>
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full shadow-lg"></div>
                      </div>
                    </div>

                    {/* Name with Enhanced Typography */}
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                        {leader.name}
                      </h4>
                    </div>

                    {/* Title with Gradient Badge */}
                    <div className="text-center mb-4">
                      <div className={`inline-block px-4 py-2 bg-gradient-to-r ${leader.gradient} text-white text-sm font-semibold rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300`}>
                        {leader.title}
                      </div>
                    </div>

                    {/* Experience - Enhanced Typography */}
                    <div className="text-center mb-6 flex-grow flex items-center justify-center">
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {leader.experience}
                      </p>
                    </div>

                    {/* Social Links with Enhanced Hover Effects */}
                    <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <motion.button 
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 text-white"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 text-white"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionLeadership;
