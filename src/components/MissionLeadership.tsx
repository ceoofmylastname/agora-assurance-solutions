import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

  // Team member data with photos and bios
  const teamMembers = [
    {
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      name: "John Smith",
      title: "Chief Executive Officer",
      bio: "John has over 15 years of experience in the insurance industry, leading teams and driving innovation in customer service excellence. He founded Agora Advisor Solutions with a vision to revolutionize how families approach financial security."
    },
    {
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      name: "Sarah Johnson",
      title: "Chief Technology Officer",
      bio: "Sarah brings cutting-edge technology expertise to our platform, ensuring our AI-driven systems deliver the most accurate and personalized insurance solutions. She has led tech teams at Fortune 500 companies for over a decade."
    },
    {
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      name: "Michael Chen",
      title: "Head of Operations",
      bio: "Michael oversees our day-to-day operations and ensures every client receives exceptional service. His background in process optimization and customer relations helps streamline our service delivery across all departments."
    },
    {
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face",
      name: "Emily Rodriguez",
      title: "Director of Client Relations",
      bio: "Emily leads our client relations team, ensuring every family receives personalized attention and support throughout their insurance journey. Her expertise in family financial planning helps clients make informed decisions."
    }
  ];

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

        {/* Leadership Team - Hexagonal Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{
            once: true,
            margin: "-50px"
          }} 
          variants={containerVariants}
          className="mt-24 md:mt-32 lg:mt-40"
        >
          <motion.h3 
            variants={itemVariants} 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-20 md:mb-24 lg:mb-28"
          >
            Our Team
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            className="relative mx-auto mt-20"
            style={{ maxWidth: '75vw' }}
          >
            <ul className="list-none p-0 m-0 relative">
              {teamMembers.map((member, index) => (
                <li
                  key={index}
                  className="float-left relative"
                  style={{
                    width: 'min(20vw, 200px)',
                    height: 'min(18vw, 180px)',
                    clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
                    marginRight: 'min(10vw, 100px)',
                    ...(index % 2 === 1 && {
                      marginTop: 'min(-9vw, -90px)',
                      marginLeft: 'min(-15vw, -150px)',
                      marginRight: 'min(-5vw, -50px)'
                    })
                  }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity">
                        <img
                          src={member.photo}
                          alt={`${member.name} - ${member.title}`}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: '50% 50%' }}
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                          {member.name}
                        </DialogTitle>
                        <p className="text-sm font-medium text-[#15AFF7] mb-4">
                          {member.title}
                        </p>
                      </DialogHeader>
                      <div className="flex flex-col items-center space-y-4">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-gray-700 leading-relaxed text-center">
                          {member.bio}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
            
            <div className="clear-both pt-8">
              <p className="text-sm text-gray-600 text-right pr-4">
                Click on any team member to learn more about their background
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionLeadership;
