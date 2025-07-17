
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSection = () => {
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

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Life Insurance: A Complete Guide for 2024",
      excerpt: "Navigate the complexities of life insurance with our comprehensive guide covering term, whole, and universal life policies.",
      image: "/assets/life-insurance-analysis.webp",
      imageAlt: "Professional financial advisor analyzing life insurance documents with calculator and charts on desk",
      imageTitle: "Life Insurance Analysis and Planning Session",
      date: "December 15, 2024",
      author: "Sarah Mitchell",
      readTime: "8 min read",
      slug: "understanding-life-insurance-complete-guide-2024"
    },
    {
      id: 2,
      title: "Final Expense Insurance: Protecting Your Family's Financial Future",
      excerpt: "Learn how final expense insurance can provide peace of mind and financial protection when your family needs it most.",
      image: "/assets/final-expense-guide.webp",
      imageAlt: "Elderly couple reviewing final expense insurance documents with compassionate advisor",
      imageTitle: "Final Expense Insurance Planning and Guidance",
      date: "December 12, 2024",
      author: "Michael Rodriguez",
      readTime: "6 min read",
      slug: "final-expense-insurance-protecting-family-financial-future"
    },
    {
      id: 3,
      title: "The Truth About Mortgage Protection Insurance",
      excerpt: "Discover the facts about mortgage protection insurance and whether it's the right choice for your family's security.",
      image: "/assets/mortgage-protection-truth.webp",
      imageAlt: "Happy family standing in front of their protected home with mortgage insurance documentation",
      imageTitle: "Mortgage Protection Insurance for Family Home Security",
      date: "December 10, 2024",
      author: "Jennifer Chen",
      readTime: "7 min read",
      slug: "truth-about-mortgage-protection-insurance"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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
            Insurance Insights & Expert Advice
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Stay informed with our latest articles on insurance trends, policy guidance, and financial planning strategies
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  title={post.imageTitle}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <User className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15AFF7] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#15AFF7] hover:text-[#0D94D1] font-semibold transition-colors group"
                  title={`Read full article: ${post.title}`}
                >
                  Read More
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
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
            title="View all insurance articles and expert insights"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
