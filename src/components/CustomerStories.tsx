import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomerStories = () => {
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

  const cardHoverVariants = {
    rest: { 
      y: 0, 
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: { 
      y: -20, 
      rotateX: 10,
      rotateY: 5,
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const stories = [
    {
      title: "Finally Found Clarity",
      quote: "After years of confusing insurance jargon, Agora showed me exactly what I needed in plain English—and saved me $200 a month.",
      author: "Jennifer M.",
      location: "Phoenix, AZ"
    },
    {
      title: "Peace of Mind at Last", 
      quote: "My Agora advisor helped me secure proper coverage for my family's future. Now I sleep better knowing we're truly protected.",
      author: "David L.",
      location: "Dallas, TX"
    },
    {
      title: "Smart Protection Made Simple",
      quote: "Comparing policies used to overwhelm me. Agora's platform made it effortless—I found better coverage in under 15 minutes.",
      author: "Maria S.", 
      location: "Miami, FL"
    }
  ];

  return (
    <section id="testimonials" className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
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
            Real Protection, Real Results
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Discover how Agora has helped thousands of families secure their financial future with confidence
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 perspective-1000"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative perspective-1000 h-full"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative bg-white h-full min-h-[420px] p-8 rounded-3xl text-center transition-all duration-500 transform-gpu flex flex-col"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 35px 80px -15px rgba(59, 130, 246, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 15px 35px -10px rgba(21, 175, 247, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-blue-50/40 backdrop-blur-sm rounded-3xl border border-white/60"></div>
                
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-[#15AFF7] via-[#1FA2E4] to-[#0D94D1] rounded-full flex items-center justify-center shadow-2xl z-10 transform rotate-3"
                     style={{ 
                       boxShadow: '0 20px 40px -8px rgba(21, 175, 247, 0.6), 0 12px 25px -5px rgba(21, 175, 247, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)' 
                     }}>
                  <Quote className="w-6 h-6 text-white drop-shadow-lg" />
                </div>

                <div className="flex justify-center mb-6 mt-8 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "backOut" }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current mx-0.5 drop-shadow-md" 
                            style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 193, 7, 0.3))' }} />
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 min-h-[70px] flex items-center justify-center leading-tight"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {story.title}
                    </h3>

                    <div className="relative mb-8">
                      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center italic relative z-10"
                         style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        "{story.quote}"
                      </p>
                      
                      <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif leading-none pointer-events-none">
                        "
                      </div>
                      <div className="absolute -bottom-8 -right-2 text-6xl text-blue-100 font-serif leading-none pointer-events-none rotate-180">
                        "
                      </div>
                    </div>
                  </div>

                  <div className="text-center relative z-10">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] mx-auto mb-4 rounded-full"></div>
                    <p className="text-[#15AFF7] font-bold text-lg sm:text-xl"
                       style={{ textShadow: '0 2px 4px rgba(21, 175, 247, 0.2)' }}>
                      {story.author}, {story.location}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/20 via-transparent to-blue-300/20 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Families Choose Agora</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Crystal Clear</div>
                <p className="text-gray-600 text-sm sm:text-base">No confusing terms or hidden catches—just honest protection.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Instant Quotes</div>
                <p className="text-gray-600 text-sm sm:text-base">Compare real rates in minutes, not days of phone calls.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Expert Guidance</div>
                <p className="text-gray-600 text-sm sm:text-base">Licensed advisors who put your family's needs first.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Trusted Results</div>
                <p className="text-gray-600 text-sm sm:text-base">Thousands protected, millions in claims paid, zero regrets.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
