
import { ArrowRight, Shield, Home, Calculator, MessageSquare, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const isMobile = useIsMobile();
  const { elementRef: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div 
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--brand-primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--brand-secondary)/0.1),transparent_50%)]" />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-xl animate-float" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-brand-secondary/5 rounded-full blur-xl animate-float animate-delay-200" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-brand-tertiary/5 rounded-full blur-xl animate-float animate-delay-400" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium brand-gradient text-white shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              The Operating System for Modern Insurance
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-display font-bold text-foreground mb-6 max-w-5xl mx-auto"
          >
            You Deserve{" "}
            <span className="brand-text bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))] bg-clip-text text-transparent">
              Clarity
            </span>
            —Instant Insurance, Zero Confusion
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-subheading text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            All-in-one platform to protect your family's future. Everything from instant quotes to expert guidance with built-in transparency, premium coverage, and consumer-first advocacy.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="btn-brand px-8 py-4 text-lg font-medium shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300"
            >
              See It In Action
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium border-2 hover:bg-accent/50 transition-all duration-300"
            >
              Book a Demo Call
              <MessageSquare className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Feature highlight cards */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: "Compare Plans",
              description: "Life, mortgage, final expense, and annuity solutions in one place"
            },
            {
              icon: Calculator,
              title: "Instant Quotes",
              description: "Personalized rates from top carriers—no phone calls required"
            },
            {
              icon: MessageSquare,
              title: "Licensed Experts",
              description: "Connect with state-regulated professionals when you need guidance"
            },
            {
              icon: Home,
              title: "Complete Protection",
              description: "Tax solutions, asset protection, and comprehensive coverage"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-2xl border border-border/50 card-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))] p-3 mb-4 group-hover:animate-glow">
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
