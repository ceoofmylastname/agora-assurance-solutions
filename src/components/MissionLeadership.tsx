
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
      y: 40,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const leaders = [
    {
      name: "Kevin Jenson",
      title: "Chief Executive Officer",
      experience: "20+ years in life & annuity leadership",
      background: "Former professional baseball athlete who founded Agora in 2024 with a vision to revolutionize insurance technology.",
      location: "Denver, Colorado",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      gradient: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300"
    },
    {
      name: "Benjamin Schroeder",
      title: "Director of Communications",
      experience: "15+ years in coaching and corporate strategy",
      background: "Master storyteller and partnership builder, specializing in creating meaningful connections between brands and communities.",
      location: "Austin, Texas",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      gradient: "from-emerald-600 to-teal-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-300"
    },
    {
      name: "Olga Lomova",
      title: "Chief Strategy Officer",
      experience: "10+ years scaling marketing & financial services",
      background: "Global growth architect with expertise in scaling marketing operations and building inclusive financial solutions worldwide.",
      location: "San Francisco, California",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      gradient: "from-purple-600 to-pink-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300"
    }
  ];

  return (
    <section id="mission" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-rotate-slow"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 md:mb-6"
          >
            Our Mission & Leadership
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 text-lg sm:text-xl md:text-2xl max-w-3xl lg:max-w-4xl mx-auto leading-relaxed"
          >
            Built by industry pioneers and powered by AI-driven systems
          </motion.p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-20 md:mb-24 lg:mb-32" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={containerVariants}
        >
          {/* Mission Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Collapsible open={missionExpanded} onOpenChange={setMissionExpanded}>
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-blue-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-500 h-full backdrop-blur-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mr-4 md:mr-5 shadow-lg">
                        <Target className="w-6 h-6 md:w-7 md:h-7 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${missionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Agora Advisor Solution is dedicated to supporting your family's assurance and well-being.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6 md:mt-8">
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
                        <div className="text-base md:text-lg">
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
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-blue-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-500 h-full backdrop-blur-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mr-4 md:mr-5 shadow-lg">
                        <Eye className="w-6 h-6 md:w-7 md:h-7 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${visionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Equipping independent agents across America with cutting-edge technology and resources.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6 md:mt-8">
                  <div className="pt-4 border-t border-blue-200/50">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
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
          viewport={{ once: true, margin: "-100px" }} 
          variants={containerVariants}
          className="mt-32 md:mt-40 lg:mt-48"
        >
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 md:mb-8">
              Our Team
            </h3>
            <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed">
              Meet the visionaries driving innovation in insurance technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="group relative"
              >
                <div className={`relative ${leader.bgColor} backdrop-blur-lg border ${leader.borderColor} ${leader.hoverColor} rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  
                  {/* Decorative Background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${leader.gradient} rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`}></div>
                    <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${leader.gradient} rounded-full blur-xl transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    
                    {/* Profile Image */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      {/* Floating Ring */}
                      <div className={`absolute inset-0 w-32 h-32 md:w-36 md:h-36 mx-auto rounded-3xl bg-gradient-to-br ${leader.gradient} opacity-20 scale-110 group-hover:scale-125 transition-transform duration-700`}></div>
                    </div>

                    {/* Name */}
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-900 group-hover:bg-clip-text transition-all duration-300">
                      {leader.name}
                    </h4>

                    {/* Title */}
                    <div className={`inline-block px-6 py-3 bg-gradient-to-r ${leader.gradient} text-white text-sm md:text-base font-semibold rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {leader.title}
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                      <MapPin className="w-4 h-4 mr-2" />
                      {leader.location}
                    </div>

                    {/* Experience */}
                    <p className="text-gray-700 text-lg font-medium mb-4 leading-relaxed">
                      {leader.experience}
                    </p>

                    {/* Background */}
                    <p className="text-gray-600 text-base leading-relaxed mb-8">
                      {leader.background}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Linkedin className="w-5 h-5 text-gray-700" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Mail className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${leader.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
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
