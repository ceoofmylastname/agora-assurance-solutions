
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerStories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png",
      imageAlt: "Sarah Johnson - Small Business Owner testimonial photo, professional woman smiling confidently",
      imageTitle: "Sarah Johnson - Satisfied Agora Assurance Client",
      rating: 5,
      text: "Agora made the entire process so simple. I was drowning in insurance jargon until their advisor walked me through everything. Now my family has the perfect coverage at a price that works for our budget.",
      location: "Sacramento, CA"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Father of Three",
      image: "/lovable-uploads/6b9297ad-2464-4f64-a402-d63ed1a9fd6d.png",
      imageAlt: "Michael Rodriguez - Father of Three testimonial photo, confident family man in business attire",
      imageTitle: "Michael Rodriguez - Protected His Family with Agora",
      rating: 5,
      text: "After my wife's cancer scare, we knew we needed better life insurance. Agora's technology helped us compare dozens of options instantly, and their advisor found us coverage we actually could afford. Peace of mind is priceless.",
      location: "Fresno, CA"
    },
    {
      id: 3,
      name: "Linda Chen",
      role: "Retired Teacher",
      image: "/lovable-uploads/5c7ac1b7-a207-4223-b39e-d5e0e16bef31.png",
      imageAlt: "Linda Chen - Retired Teacher testimonial photo, wise and friendly elderly woman smiling warmly",
      imageTitle: "Linda Chen - Secured Final Expense Coverage with Agora",
      rating: 5,
      text: "I thought final expense insurance would be complicated and expensive. The Agora team made it so easy to understand, and I got approved the same day! My children won't have to worry about funeral costs now.",
      location: "San Diego, CA"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Real Stories, Real Protection
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            See how we've helped thousands of families secure their financial future with personalized insurance solutions
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 group hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#15AFF7]/10 to-[#0D94D1]/10 rounded-full -mr-10 -mt-10"></div>
              
              <div className="relative">
                <Quote className="w-8 h-8 text-[#15AFF7] mb-4 opacity-60" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    title={testimonial.imageTitle}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Thousands of Protected Families?
            </h3>
            <p className="text-gray-600 mb-6">
              Get your personalized insurance quote in minutes and start protecting what matters most
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                className="inline-flex items-center px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
                title="Get instant insurance quote - Compare plans in minutes"
              >
                Get Your Quote Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/booking"
                className="inline-flex items-center px-8 py-3 bg-white text-[#15AFF7] border-2 border-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all duration-300 font-semibold group"
                title="Schedule free consultation with licensed insurance advisor"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
