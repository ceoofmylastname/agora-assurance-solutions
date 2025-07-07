
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Star, ChevronDown } from "lucide-react";
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

  const leaders = [{
    name: "Kevin Jenson",
    title: "CEO",
    experience: "20 years in life & annuity leadership",
    background: "Ex-pro baseball athlete, founder of Agora in 2024",
    icon: Award
  }, {
    name: "Benjamin Schroeder",
    title: "Director of Communications",
    experience: "15 years in coaching and corporate strategy",
    background: "Storyteller and partnership builder",
    icon: Users
  }, {
    name: "Olga Lomova",
    title: "Chief Strategy Officer",
    experience: "10 years scaling marketing & financial services",
    background: "Architect of global growth and inclusion",
    icon: Star
  }];

  return (
    <section id="mission" className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4"
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

        {/* Mission & Vision - Optimized Cards */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20" 
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

        {/* Leadership Team - Optimized */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-50px"
          }} 
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants} 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-10 lg:mb-12"
          >
            Leadership Team
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8" 
            variants={containerVariants}
          >
            {leaders.map((leader, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="bg-white p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <leader.icon className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#15AFF7]" />
                </div>
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                <p className="text-[#15AFF7] font-semibold text-sm md:text-base lg:text-lg mb-2 md:mb-3">{leader.title}</p>
                <p className="text-gray-700 text-sm md:text-base mb-2">{leader.experience}</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{leader.background}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionLeadership;
