import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const Booking = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Book Your Free Consultation - Agora Assurance Solutions"
        description="Schedule your free insurance consultation with our licensed experts. Get personalized advice and find the perfect coverage for your needs."
        keywords={['insurance consultation', 'free appointment', 'insurance advisor', 'book consultation', 'insurance quotes']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          className="container mx-auto px-4 py-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              Back to Home
            </button>
            
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                variants={itemVariants}
              >
                Book Your Free
                <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Consultation
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Schedule a personalized consultation with our licensed insurance experts. 
                Get tailored advice and find the perfect coverage for your unique needs.
              </motion.p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={itemVariants}
          >
            {[
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Choose a time that works best for your schedule"
              },
              {
                icon: Users,
                title: "Expert Advisors",
                description: "Work with licensed insurance professionals"
              },
              {
                icon: Clock,
                title: "30-Minute Sessions",
                description: "Comprehensive consultation in just 30 minutes"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Calendar Section */}
          <motion.div 
            className="max-w-4xl mx-auto relative"
            variants={itemVariants}
          >
            {/* Glow effect behind calendar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl"
              variants={glowVariants}
              animate="animate"
            />
            
            <motion.div
              className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-2 shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-2">
                <h2 className="text-xl font-semibold text-primary-foreground text-center">
                  Select Your Preferred Time
                </h2>
                <p className="text-primary-foreground/80 text-center mt-2">
                  All consultations are completely free with no obligations
                </p>
              </div>

              {/* Embedded Calendar */}
              <div className="relative rounded-2xl overflow-hidden min-h-[600px] bg-background">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full h-full"
                >
                  <iframe
                    src="https://crm.agoraassurancesolutions.com/widget/booking/foZnFDUFuB2fu0X5eDZn"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    className="rounded-2xl"
                    title="Book Your Free Consultation"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { label: "Licensed Experts", value: "100%" },
                { label: "Client Satisfaction", value: "99%" },
                { label: "Years Experience", value: "15+" },
                { label: "Free Consultation", value: "Always" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="mt-16 text-center max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <div className="bg-muted/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                What to Expect During Your Consultation
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-medium text-foreground mb-2">We'll Review:</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Your current insurance needs</li>
                    <li>• Budget and coverage preferences</li>
                    <li>• Available options and plans</li>
                    <li>• Potential savings opportunities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">You'll Receive:</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Personalized recommendations</li>
                    <li>• Transparent pricing information</li>
                    <li>• No-pressure expert guidance</li>
                    <li>• Free follow-up support</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Booking;