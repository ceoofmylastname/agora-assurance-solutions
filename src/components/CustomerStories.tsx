
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

  const stories = [
    {
      title: "They Made It Simple",
      quote: "Agora's side-by-side comparison saved me hours of research—and I still got the best rate.",
      author: "Mark R.",
      location: "CA"
    },
    {
      title: "A True Advocate", 
      quote: "Their advisor fought for my needs, not commissions. I finally feel protected.",
      author: "Sarah T.",
      location: "TX"
    },
    {
      title: "Instant Peace of Mind",
      quote: "I clicked a few buttons and had a comprehensive plan in minutes—no stress.",
      author: "Emily K.", 
      location: "FL"
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
            Customer Success Stories
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Real families sharing their experience with Agora Assurance Solutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative active:scale-95 touch-manipulation"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 w-8 h-8 bg-[#15AFF7] rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Star Rating */}
              <div className="flex justify-center mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">{story.title}</h3>

              {/* Quote */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-6 italic">
                "{story.quote}"
              </p>

              {/* Author */}
              <div className="text-center">
                <p className="text-[#15AFF7] font-semibold text-base sm:text-lg">
                  {story.author}, {story.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl border border-blue-200 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Agora?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Total Transparency</div>
                <p className="text-gray-600 text-sm sm:text-base">No hidden fees, no confusing fine print. Ever.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Speed & Convenience</div>
                <p className="text-gray-600 text-sm sm:text-base">Compare and quote in under a minute—get covered today.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Human-First Support</div>
                <p className="text-gray-600 text-sm sm:text-base">Real people, real expertise, ready when you need them.</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-1">Proven Track Record</div>
                <p className="text-gray-600 text-sm sm:text-base">50+ years experience, 100+ carrier partners, $500M in benefits.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
