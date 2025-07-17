
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
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

  const projects = [
    {
      id: 1,
      title: "FireCat's 6th SENSE",
      subtitle: "Advanced safety system for high-risk environments",
      description: "Comprehensive AI-driven sensor solution providing real-time data for risk management in law enforcement, military, and firefighting operations.",
      image: "/lovable-uploads/93ab0638-8190-4ccf-897f-21fda7f4f5ad.png",
      imageAlt: "FireCat 6th SENSE safety system - Advanced wearable sensors for first responders and high-risk personnel",
      imageTitle: "FireCat 6th SENSE - Revolutionary Safety Technology",
      link: "/projects/firecat",
      tags: ["IoT", "Safety", "AI", "Wearables"],
      featured: true
    },
    {
      id: 2,
      title: "Ice Hockey Elite Skill Tracker",
      subtitle: "Performance analysis for hockey excellence",
      description: "Single-point IMU system embedded in hockey footwear for detailed movement analysis and performance optimization.",
      image: "/lovable-uploads/c30e0487-2fa0-41d1-9a0b-699cb2855388.png",
      imageAlt: "Hockey performance tracking system - Elite skill analysis technology for ice hockey players",
      imageTitle: "Hockey Elite Skill Tracker - Performance Analysis System",
      link: "/projects/hockey",
      tags: ["Sports", "Analytics", "Performance", "Hardware"]
    },
    {
      id: 3,
      title: "Smart Pet Health Monitor",
      subtitle: "24/7 health tracking for beloved pets",
      description: "Comprehensive health monitoring system with real-time vitals tracking and early warning systems for pet wellness.",
      image: "/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png",
      imageAlt: "Smart pet health monitoring device - Advanced wearable technology for pet wellness tracking",
      imageTitle: "Smart Pet Health Monitor - Advanced Pet Care Technology",
      link: "/projects/pet",
      tags: ["Pet Tech", "Health", "Monitoring", "IoT"]
    },
    {
      id: 4,
      title: "Sport Retail Innovation",
      subtitle: "Next-gen retail experience platform",
      description: "Revolutionary retail technology platform transforming how customers interact with sporting goods and equipment.",
      image: "/lovable-uploads/40b3b311-a454-4074-9067-b69adf314e12.png",
      imageAlt: "Sport retail innovation platform - Modern digital retail experience for sporting goods",
      imageTitle: "Sport Retail Innovation - Advanced Retail Technology",
      link: "/projects/sport-retail",
      tags: ["Retail", "Innovation", "Digital", "Experience"]
    },
    {
      id: 5,
      title: "Industrial Workwear Solutions",
      subtitle: "Smart safety gear for industrial workers",
      description: "Intelligent workwear integration with safety monitoring, environmental sensors, and worker protection systems.",
      image: "/lovable-uploads/69f0b619-2561-41dd-b820-187475b5f2f2.png",
      imageAlt: "Industrial workwear safety solutions - Smart protective gear with integrated monitoring systems",
      imageTitle: "Industrial Workwear Solutions - Smart Safety Technology",
      link: "/projects/workwear",
      tags: ["Industrial", "Safety", "Workwear", "Protection"]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
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
            Featured Projects
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Explore our innovative solutions across various industries, showcasing cutting-edge technology and real-world applications
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Featured Project */}
          {projects.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    title={project.imageTitle}
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 text-lg mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  <Link
                    to={project.link}
                    className="inline-flex items-center text-white hover:text-gray-300 font-semibold transition-colors group"
                    title={`View ${project.title} case study and project details`}
                  >
                    Explore Project
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Regular Projects */}
          {projects.filter(p => !p.featured).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  title={project.imageTitle}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#15AFF7] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 font-medium">{project.subtitle}</p>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <Link
                  to={project.link}
                  className="inline-flex items-center text-[#15AFF7] hover:text-[#0D94D1] font-semibold transition-colors group text-sm"
                  title={`Learn more about ${project.title} project`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
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
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can bring your innovative ideas to life with cutting-edge technology solutions
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
              title="Contact us to discuss your project requirements"
            >
              Start Your Project
              <ExternalLink className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
