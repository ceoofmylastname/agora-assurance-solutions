
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Star, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MissionLeadership = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
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
    hidden: { y: isMobile ? 15 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const leaders = [
    {
      name: "Kevin Jenson",
      title: "CEO",
      experience: "20 years in life & annuity leadership",
      background: "Ex-pro baseball athlete, founder of Agora in 2024",
      icon: Award
    },
    {
      name: "Benjamin Schroeder", 
      title: "Director of Communications",
      experience: "15 years in coaching and corporate strategy",
      background: "Storyteller and partnership builder",
      icon: Users
    },
    {
      name: "Olga Lomova",
      title: "Chief Strategy Officer", 
      experience: "10 years scaling marketing & financial services",
      background: "Architect of global growth and inclusion",
      icon: Star
    }
  ];

  return (
    <section id="mission" className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-2"
          >
            Our Mission & Leadership
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Built by industry pioneers and powered by AI-driven systems
          </motion.p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 md:p-10 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              To bring <strong>clarity</strong>, <strong>speed</strong>, and <strong>consumer-first advocacy</strong> to the insurance market, so every family can make informed protection decisions—without hidden fees, jargon, or high-pressure sales.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 md:p-10 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-[#15AFF7]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              A world where choosing the right coverage is as simple as a few clicks, backed by real people who care.
            </p>
          </motion.div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12 px-2"
          >
            Leadership Team
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center active:scale-95 touch-manipulation"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <leader.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                <p className="text-[#15AFF7] font-semibold text-base sm:text-lg mb-3">{leader.title}</p>
                <p className="text-gray-700 text-sm sm:text-base mb-2">{leader.experience}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{leader.background}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionLeadership;
