
import { motion } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomerStories = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.2 : 0.4,
        duration: isMobile ? 0.6 : 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 20 : 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.5 : 0.7,
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
      title: "They Made It Simple",
      quote: "Agora's side-by-side comparison saved me hours of research—and I still got the best rate.",
      author: "Mark R.",
      location: "CA",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      bgGradient: "from-blue-50/80 via-purple-50/60 to-pink-50/80"
    },
    {
      title: "A True Advocate", 
      quote: "Their advisor fought for my needs, not commissions. I finally feel protected.",
      author: "Sarah T.",
      location: "TX",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-50/80 via-teal-50/60 to-cyan-50/80"
    },
    {
      title: "Instant Peace of Mind",
      quote: "I clicked a few buttons and had a comprehensive plan in minutes—no stress.",
      author: "Emily K.", 
      location: "FL",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      bgGradient: "from-orange-50/80 via-red-50/60 to-pink-50/80"
    }
  ];

  return (
    <section id="testimonials" className="relative py-20 md:py-24 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 md:mb-20 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-[#15AFF7] mr-3 animate-pulse" />
            <span className="text-[#15AFF7] font-semibold text-lg tracking-wide uppercase">Success Stories</span>
            <Sparkles className="w-8 h-8 text-[#15AFF7] ml-3 animate-pulse" />
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6 px-2"
          >
            Real People, Real Results
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-xl sm:text-2xl max-w-4xl mx-auto px-4 leading-relaxed"
          >
            Discover how Agora Assurance has transformed the insurance experience for families across America
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
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
              className="relative perspective-1000 h-full group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative h-full min-h-[420px] p-8 sm:p-10 rounded-3xl transition-all duration-500 transform-gpu flex flex-col"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glassmorphism background with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${story.bgGradient} backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl`}></div>
                
                {/* Enhanced shadow layers */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_50px_80px_-15px_rgba(0,0,0,0.4)] transition-all duration-500"></div>
                <div className="absolute inset-0 bg-white/5 rounded-3xl shadow-[0_20px_40px_-10px_rgba(59,130,246,0.4)] group-hover:shadow-[0_30px_60px_-10px_rgba(59,130,246,0.6)] transition-all duration-500"></div>
                
                {/* Floating quote icon with gradient */}
                <div className={`absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r ${story.gradient} rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                  <Quote className="w-6 h-6 text-white drop-shadow-lg" />
                </div>

                {/* Animated star rating */}
                <div className="relative flex justify-center mb-6 mt-8 z-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5, ease: "backOut" }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current mx-1 drop-shadow-sm hover:scale-110 transition-transform duration-200" />
                    </motion.div>
                  ))}
                </div>

                {/* Content with enhanced typography */}
                <div className="relative z-10 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">{story.title}</h3>
                    
                    {/* Enhanced quote styling */}
                    <div className="relative mb-8">
                      <div className="absolute -top-2 -left-2 text-6xl text-gray-300/50 font-serif">"</div>
                      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed italic relative z-10 px-4">
                        {story.quote}
                      </p>
                      <div className="absolute -bottom-6 -right-2 text-6xl text-gray-300/50 font-serif rotate-180">"</div>
                    </div>
                  </div>

                  {/* Author with enhanced styling */}
                  <div className="relative">
                    <div className={`inline-block px-6 py-3 bg-gradient-to-r ${story.gradient} rounded-full shadow-lg`}>
                      <p className="text-white font-bold text-lg tracking-wide">
                        {story.author}, {story.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle border glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${story.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div 
          className="mt-16 sm:mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="relative bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/40 max-w-6xl mx-auto shadow-2xl">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-50"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">
                Why Choose Agora?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { title: "Total Transparency", desc: "No hidden fees, no confusing fine print. Ever.", icon: "🔍" },
                  { title: "Speed & Convenience", desc: "Compare and quote in under a minute—get covered today.", icon: "⚡" },
                  { title: "Human-First Support", desc: "Real people, real expertise, ready when you need them.", icon: "💝" },
                  { title: "Proven Track Record", desc: "50+ years experience, 100+ carrier partners, $500M in benefits.", icon: "🏆" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-4xl mb-4 group-hover:animate-bounce">{item.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-3">{item.title}</div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
