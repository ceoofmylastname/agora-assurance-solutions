
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Mark R.",
    location: "CA",
    title: "They Made It Simple",
    quote: "Agora's side-by-side comparison saved me hours of research—and I still got the best rate.",
    rating: 5,
    product: "Term Life Insurance"
  },
  {
    id: 2,
    name: "Sarah T.",
    location: "TX", 
    title: "A True Advocate",
    quote: "Their advisor fought for my needs, not commissions. I finally feel protected.",
    rating: 5,
    product: "Mortgage Protection"
  },
  {
    id: 3,
    name: "Emily K.",
    location: "FL",
    title: "Instant Peace of Mind",
    quote: "I clicked a few buttons and had a comprehensive plan in minutes—no stress.",
    rating: 5,
    product: "Final Expense"
  }
];

const CustomerStories = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="bg-gray-50 py-16 md:py-24 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="inline-block mb-2 px-3 py-1 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-sm font-medium" variants={itemVariants}>
            Customer Success Stories
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            What Our Customers Say
          </motion.h2>
          <motion.p className="text-gray-600 text-lg max-w-2xl mx-auto" variants={itemVariants}>
            Real stories from real families who found the perfect protection with Agora Assurance Solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full bg-white border-2 border-gray-100 hover:border-[#15AFF7]/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-[#15AFF7] mr-3" />
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    "{testimonial.title}"
                  </h3>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#15AFF7] font-medium">
                        {testimonial.product}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              4.9/5 Customer Rating
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Based on 25,000+ verified customer reviews
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-colors font-medium"
            >
              Join Our Satisfied Customers
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
