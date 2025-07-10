import { ArrowLeft, Shield, Home, Users, DollarSign, Clock, Star, CheckCircle, Target, Heart, TrendingUp, Building, Calculator, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from '@/components/SEO';
import heroFamilyProtection from '@/assets/hero-family-protection.webp';

const ProtectionPlans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    <PageLayout>
      <SEO 
        title="Protection Plans - Comprehensive Coverage Solutions | Agora Assurance Solutions"
        description="Explore our comprehensive protection plans including mortgage protection, family income replacement, and flexible premium options with immediate coverage."
        imageUrl={heroFamilyProtection}
        keywords={['protection plans', 'mortgage protection', 'family income replacement', 'life insurance coverage', 'immediate coverage', 'competitive rates']}
      />
      
      <section className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <motion.div 
            className="relative mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-3xl"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <Badge variant="secondary" className="mb-6 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Comprehensive Protection Plans
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-6">
                  Protect What <span className="text-primary">Matters Most</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Comprehensive protection plans designed to secure your family's financial future with flexible options, immediate coverage, and competitive rates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                    className="text-lg px-8 py-6"
                  >
                    Get Your Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-lg px-8 py-6"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Speak with Broker
                  </Button>
                </div>
              </motion.div>
              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                <img 
                  src={heroFamilyProtection} 
                  alt="Family protection and security"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Core Protection Features */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Our Protection Promise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Five key benefits that make our protection plans the right choice for your family's security
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                { 
                  icon: Home, 
                  title: "Mortgage Protection Coverage", 
                  description: "Ensure your family keeps their home with coverage that pays off your mortgage",
                  color: "text-blue-500"
                },
                { 
                  icon: Users, 
                  title: "Family Income Replacement", 
                  description: "Replace lost income to maintain your family's lifestyle and financial stability",
                  color: "text-green-500"
                },
                { 
                  icon: DollarSign, 
                  title: "Flexible Premium Options", 
                  description: "Choose payment schedules and amounts that fit your budget and needs",
                  color: "text-purple-500"
                },
                { 
                  icon: Clock, 
                  title: "Immediate Coverage Available", 
                  description: "Get protection starting as early as the next business day after approval",
                  color: "text-orange-500"
                },
                { 
                  icon: Star, 
                  title: "Competitive Rates Guaranteed", 
                  description: "Access the best rates from 40+ top-rated insurance companies",
                  color: "text-red-500"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <feature.icon className={`w-12 h-12 ${feature.color} mx-auto`} />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Protection Plan Types */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Choose Your Protection Level</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From basic mortgage protection to comprehensive family coverage, we have the right plan for you
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building,
                  title: "Mortgage Protection",
                  description: "Specifically designed to pay off your mortgage balance",
                  features: ["Decreasing term coverage", "Matches mortgage balance", "Lowest premiums", "Quick approval process"],
                  highlight: false
                },
                {
                  icon: Heart,
                  title: "Family Income Protection", 
                  description: "Comprehensive coverage for your family's ongoing needs",
                  features: ["Level term coverage", "Income replacement", "Living expenses covered", "Educational funding"],
                  highlight: true
                },
                {
                  icon: Target,
                  title: "Complete Protection",
                  description: "Maximum coverage combining mortgage and income protection",
                  features: ["Mortgage payoff", "Income replacement", "Debt elimination", "Future security"],
                  highlight: false
                }
              ].map((plan, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className={`h-full relative overflow-hidden ${plan.highlight ? 'border-primary shadow-xl scale-105' : 'hover:shadow-lg'} transition-all duration-300`}>
                    {plan.highlight && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardContent className={`p-8 ${plan.highlight ? 'pt-12' : ''}`}>
                      <plan.icon className={`w-12 h-12 ${plan.highlight ? 'text-primary' : 'text-muted-foreground'} mb-4`} />
                      <h3 className="text-2xl font-bold mb-3 text-foreground">{plan.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>
                      
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant={plan.highlight ? "default" : "outline"} 
                        className="w-full"
                        onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                      >
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose Agora Protection Plans?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the difference of working with an independent agency that puts your needs first
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Calculator, title: "40+ Companies", description: "Compare rates from multiple top-rated insurers" },
                { icon: TrendingUp, title: "Best Rates", description: "Independent shopping ensures competitive pricing" },
                { icon: Clock, title: "Fast Processing", description: "Quick approvals with immediate coverage options" },
                { icon: Phone, title: "Expert Support", description: "Licensed professionals guide you through every step" }
              ].map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                    <CardContent className="p-6">
                      <benefit.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2 text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-card border-2 border-primary/20 rounded-3xl p-12 text-center backdrop-blur-sm">
              <motion.h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground" variants={itemVariants}>
                Ready to Protect Your Family?
              </motion.h2>
              <motion.p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8" variants={itemVariants}>
                Don't wait to secure your family's financial future. Get a personalized quote or speak with one of our licensed professionals today.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
                <Button 
                  size="lg"
                  onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                  className="text-lg px-8 py-6"
                >
                  Get Instant Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-lg px-8 py-6"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProtectionPlans;