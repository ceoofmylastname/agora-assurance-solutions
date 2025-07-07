
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Star, ChevronDown, Linkedin, Mail } from "lucide-react";
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
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const leaders = [{
    name: "Kevin Jenson",
    title: "CEO",
    experience: "20 years in life & annuity leadership",
    background: "Ex-pro baseball athlete, founder of Agora in 2024",
    icon: Award,
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50"
  }, {
    name: "Benjamin Schroeder",
    title: "Director of Communications",
    experience: "15 years in coaching and corporate strategy",
    background: "Storyteller and partnership builder",
    icon: Users,
    gradient: "from-green-500 to-teal-600",
    bgGradient: "from-green-50 to-teal-50"
  }, {
    name: "Olga Lomova",
    title: "Chief Strategy Officer",
    experience: "10 years scaling marketing & financial services",
    background: "Architect of global growth and inclusion",
    icon: Star,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50"
  }];

  return (
    <section id="mission" className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-300"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-10 md:mb-14 lg:mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-50px"
          }} 
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3 md:mb-4"
          >
            Our Mission & Leadership
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
          >
            Built by industry pioneers and powered by AI-driven systems
          </motion.p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-16 md:mb-20 lg:mb-24" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-50px"
          }} 
          variants={containerVariants}
        >
          
          {/* Mission Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Collapsible open={missionExpanded} onOpenChange={setMissionExpanded}>
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-4 md:p-6 lg:p-7 rounded-xl md:rounded-2xl border border-blue-200 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center mr-3 md:mr-4 shadow-sm">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${missionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Agora Advisor Solution is dedicated to supporting your family's assurance and well-being.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-4 md:mt-5">
                  <div className="space-y-2 md:space-y-3 pt-2 border-t border-blue-200/50">
                    <div className="flex items-start">
                      <span className="font-bold text-[#15AFF7] mr-2 mt-1 flex-shrink-0">•</span>
                      <div className="text-sm md:text-base">
                        <span className="font-semibold text-gray-800">Dedicated</span> - Faithfully providing you appropriate solutions
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-[#15AFF7] mr-2 mt-1 flex-shrink-0">•</span>
                      <div className="text-sm md:text-base">
                        <span className="font-semibold text-gray-800">Supporting</span> - Realize your needs and wants
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-[#15AFF7] mr-2 mt-1 flex-shrink-0">•</span>
                      <div className="text-sm md:text-base">
                        <span className="font-semibold text-gray-800">Family</span> - Fortifying your family's financial legacy
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-[#15AFF7] mr-2 mt-1 flex-shrink-0">•</span>
                      <div className="text-sm md:text-base">
                        <span className="font-semibold text-gray-800">Assurance</span> - Protecting your family's peace of mind
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-[#15AFF7] mr-2 mt-1 flex-shrink-0">•</span>
                      <div className="text-sm md:text-base">
                        <span className="font-semibold text-gray-800">Well-being</span> - Safeguarding your love's one future
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Collapsible open={visionExpanded} onOpenChange={setVisionExpanded}>
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-4 md:p-6 lg:p-7 rounded-xl md:rounded-2xl border border-blue-200 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center mr-3 md:mr-4 shadow-sm">
                        <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#15AFF7]" />
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${visionExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Equipping independent agents across America with cutting-edge technology and resources.
                  </p>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-4 md:mt-5">
                  <div className="pt-2 border-t border-blue-200/50">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      Agora Advisor Solutions is determined to equip independent agents and agencies across America with carriers, leads, and technology packages to ensure they are leading their competitors.
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>
        </motion.div>

        {/* Modern Leadership Team Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-50px"
          }} 
          variants={containerVariants}
          className="mt-20 md:mt-24 lg:mt-28"
        >
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 md:mb-6">
              Our Team
            </h3>
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Meet the visionaries driving innovation in insurance technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                {/* Glassmorphism Card */}
                <div className={`relative bg-gradient-to-br ${leader.bgGradient} backdrop-blur-sm border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    
                    {/* Icon Container */}
                    <div className="relative mb-6 md:mb-8">
                      <div className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${leader.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                        <leader.icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                      </div>
                      {/* Floating Ring */}
                      <div className={`absolute inset-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${leader.gradient} rounded-full mx-auto opacity-20 scale-125 group-hover:scale-150 transition-transform duration-700`}></div>
                    </div>

                    {/* Name */}
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-900 group-hover:bg-clip-text transition-all duration-300">
                      {leader.name}
                    </h4>

                    {/* Title */}
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${leader.gradient} text-white text-sm md:text-base font-semibold rounded-full mb-4 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {leader.title}
                    </div>

                    {/* Experience */}
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium mb-3 md:mb-4 leading-relaxed">
                      {leader.experience}
                    </p>

                    {/* Background */}
                    <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed mb-6 md:mb-8">
                      {leader.background}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <Linkedin className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <Mail className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${leader.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
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
