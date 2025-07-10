import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Users, Shield, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const Booking = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      scale: [1, 1.02, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 4,
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
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden pt-16 sm:pt-20">{/* Add top padding for navbar */}
        {/* Optimized animated background for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute ${isMobile ? 'top-10 left-5 w-48 h-48' : 'top-20 left-20 w-72 h-72'} bg-primary/8 rounded-full blur-3xl`}
            animate={{
              x: [0, isMobile ? 15 : 30, 0],
              y: [0, isMobile ? -10 : -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute ${isMobile ? 'bottom-10 right-5 w-64 h-64' : 'bottom-20 right-20 w-96 h-96'} bg-accent/8 rounded-full blur-3xl`}
            animate={{
              x: [0, isMobile ? -20 : -40, 0],
              y: [0, isMobile ? 15 : 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile-optimized Header */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 group touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </button>
            
            <div className="text-center px-2">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight"
                variants={itemVariants}
              >
                Book Your Free
                <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Consultation
                </span>
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2"
                variants={itemVariants}
              >
                Schedule a personalized consultation with our licensed insurance experts. 
                Get tailored advice and find the perfect coverage for your unique needs.
              </motion.p>
            </div>
          </motion.div>

          {/* Mobile-optimized Features */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
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
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-card/80 transition-all duration-300 hover:shadow-lg"
                whileHover={!isMobile ? { y: -5 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile-optimized Calendar Section */}
          <motion.div 
            className="max-w-5xl mx-auto relative"
            variants={itemVariants}
          >
            {/* Glow effect behind calendar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl"
              variants={glowVariants}
              animate="animate"
            />
            
            <motion.div
              className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl p-1 sm:p-2 shadow-2xl"
              whileHover={!isMobile ? { scale: 1.005 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile-optimized Calendar Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-1 sm:mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-primary-foreground text-center">
                  Select Your Preferred Time
                </h2>
                <p className="text-primary-foreground/80 text-center mt-2 text-sm sm:text-base">
                  All consultations are completely free with no obligations
                </p>
              </div>

              {/* Embedded Calendar with mobile optimization */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-background">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full h-full"
                >
                  <iframe
                    src="https://crm.agoraassurancesolutions.com/widget/booking/foZnFDUFuB2fu0X5eDZn"
                    width="100%"
                    height={isMobile ? "500" : "600"}
                    frameBorder="0"
                    className="rounded-xl sm:rounded-2xl"
                    title="Book Your Free Consultation"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile-optimized Trust Indicators */}
          <motion.div 
            className="mt-8 sm:mt-12 text-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto">
              {[
                { label: "Licensed Experts", value: "100%", icon: Shield },
                { label: "Client Satisfaction", value: "99%", icon: Star },
                { label: "Years Experience", value: "15+", icon: CheckCircle },
                { label: "Free Consultation", value: "Always", icon: Calendar }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-card/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile-optimized Additional Info */}
          <motion.div 
            className="mt-12 sm:mt-16 text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <div className="bg-muted/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                What to Expect During Your Consultation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    We'll Review:
                  </h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Your current insurance needs
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Budget and coverage preferences
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Available options and plans
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Potential savings opportunities
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    You'll Receive:
                  </h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Personalized recommendations
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Transparent pricing information
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      No-pressure expert guidance
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Free follow-up support
                    </li>
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