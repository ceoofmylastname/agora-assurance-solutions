
import { motion } from "framer-motion";
import { Calculator, Shield, Users, Clock, Award, Heart } from "lucide-react";

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const features = [
    {
      icon: Calculator,
      title: "Instant Quote Technology",
      description: "Get personalized insurance quotes in seconds with our advanced comparison engine",
      image: "/assets/life-insurance-analysis.webp",
      imageAlt: "Advanced insurance quote technology interface showing real-time calculations and comparisons",
      imageTitle: "Instant Quote Technology - Fast Insurance Comparisons"
    },
    {
      icon: Shield,
      title: "Licensed Expert Advisors",
      description: "Connect with state-licensed professionals who provide unbiased, personalized guidance",
      image: "/assets/business-meeting-advisors.webp",
      imageAlt: "Professional licensed insurance advisors in consultation meeting providing expert guidance",
      imageTitle: "Licensed Expert Advisors - Professional Insurance Guidance"
    },
    {
      icon: Users,
      title: "Family-First Approach",
      description: "Comprehensive protection plans designed around your family's unique needs and budget",
      image: "/assets/retirement-planning-couple.webp",
      imageAlt: "Happy family reviewing comprehensive insurance protection plans together",
      imageTitle: "Family-First Insurance Approach - Comprehensive Protection Planning"
    },
    {
      icon: Clock,
      title: "24/7 Support Available",
      description: "Round-the-clock assistance when you need it most, with real human support",
      image: "/assets/final-expense-couple.webp",
      imageAlt: "24/7 customer support representative assisting clients with insurance questions",
      imageTitle: "24/7 Insurance Support - Always Available When You Need Help"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Award-winning service with 50+ years combined experience protecting families",
      image: "/assets/retirement-strategy-comparison.webp",
      imageAlt: "Industry awards and recognition certificates for excellence in insurance services",
      imageTitle: "Industry Recognition - Award-Winning Insurance Services"
    },
    {
      icon: Heart,
      title: "Peace of Mind Promise",
      description: "Sleep better knowing your family's financial future is secure with our protection",
      image: "/assets/final-expense-hero-couple.jpg",
      imageAlt: "Peaceful family enjoying security and confidence with comprehensive insurance protection",
      imageTitle: "Peace of Mind Promise - Complete Family Financial Security"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
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
            Why Choose Agora Assurance?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            We've revolutionized the insurance experience with technology, expertise, and a genuine commitment to your family's protection
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  title={feature.imageTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15AFF7] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
