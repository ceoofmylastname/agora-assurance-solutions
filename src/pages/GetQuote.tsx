import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Award, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const GetQuote = () => {
  // Insurance carriers organized by category
  const lifeInsuranceCarriers = [
    "Transamerica", "American National", "Americo", "Assurity", "National Life Group",
    "American Life", "Integrity Life", "North American", "The Ohio State Life",
    "Pacific Guardian Life", "Sentinel Security Life", "SILAC Insurance Company"
  ];

  const annuityCarriers = [
    "Allianz", "American Equity", "Athene", "Corebridge Financial", "EquiTrust",
    "FG Annuities & Life", "Foresters", "Global Atlantic Financial Group",
    "Lincoln Financial Group", "MassMutual Ascend", "Clear Spring Life and Annuity"
  ];

  const finalExpenseCarriers = [
    "Aetna", "Guaranty Income Life", "Liberty Bankers", "Protective",
    "Royal Neighbors of America", "The Standard", "Oceanview"
  ];

  const comprehensiveCarriers = [
    "Nationwide", "The Baltimore Life Companies", "American-Amicable Group",
    "NASSAU", "OneAmerica", "Prudential", "Reliance Standard", "Sagicor",
    "Securian Financial", "National Western Life", "Atlantic Coast Life"
  ];

  const carrierCategories = [
    {
      title: "Life Insurance Specialists",
      carriers: lifeInsuranceCarriers,
      description: "Term, Whole, and Universal Life Insurance",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Annuity & Retirement Experts",
      carriers: annuityCarriers,
      description: "Fixed, Variable, and Indexed Annuities",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Final Expense Leaders",
      carriers: finalExpenseCarriers,
      description: "Burial Insurance and Final Expense Coverage",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Full-Service Providers",
      carriers: comprehensiveCarriers,
      description: "Complete Financial Protection Solutions",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Unbiased Recommendations",
      description: "We represent multiple companies, so we recommend what's truly best for you, not what pays us the most."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Our licensed professionals have years of experience helping families find the right coverage."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Competitive Pricing",
      description: "Compare rates from multiple top-rated insurance companies to ensure you get the best value."
    }
  ];

  const whyChooseUs = [
    "Access to 50+ top-rated insurance companies",
    "No cost to work with our licensed agents",
    "Personalized recommendations based on your needs",
    "Ongoing support throughout your policy lifetime",
    "Quick and easy application process",
    "Claims support when you need it most"
  ];

  return (
    <PageLayout>
      <SEO 
        title="Get Your Insurance Quote - Compare Top Companies | Agora Assurance Solutions"
        description="Get instant quotes from 50+ top insurance companies. Our licensed agents help you find the best coverage at competitive rates. Free consultation available."
        keywords={['insurance quote', 'compare insurance', 'life insurance companies', 'best rates', 'licensed agents', 'free consultation']}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-24 pb-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                Why Choose an Independent Agency?
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                One Agent, <span className="text-primary">40+ Companies</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Unlike captive agents who only sell one company's products, Agora Assurance Solutions represents 
                dozens of top-rated insurance companies. This means we can find you the best coverage at the best price.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold"
                  onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                >
                  Get Your Free Quote
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    const bookingSection = document.getElementById('booking-section');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                The Independent Advantage
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                When you work with Agora, you're not limited to one company's products. 
                We shop the market for you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                40+ Top-Rated Insurance Carriers
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We represent America's most trusted insurance companies across every category. 
                Compare rates and coverage options to find your perfect match.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {carrierCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className={`border-2 hover:shadow-xl transition-all duration-300 ${category.color}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    
                    {/* Carrier Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {category.carriers.map((carrier, carrierIndex) => (
                        <div 
                          key={carrierIndex}
                          className="bg-background/60 backdrop-blur-sm rounded-lg p-3 text-center border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                            <Shield className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-foreground leading-tight">{carrier}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-card rounded-2xl p-8 border shadow-lg">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">40+</div>
                <div className="text-sm font-medium text-muted-foreground">Insurance Carriers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">15+</div>
                <div className="text-sm font-medium text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">5K+</div>
                <div className="text-sm font-medium text-muted-foreground">Families Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">24/7</div>
                <div className="text-sm font-medium text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Badge variant="outline" className="mb-4 px-3 py-1">
                  The Agora Advantage
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
                  Why 5,000+ Families Choose <span className="text-primary">Agora</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                  Don't settle for one-size-fits-all insurance solutions. Our independent approach 
                  means we work exclusively for you, not the insurance companies.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-border/50">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="px-6 py-3 font-semibold"
                    onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                  >
                    Compare Rates Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-6 py-3 font-semibold"
                    onClick={() => {
                      const bookingSection = document.getElementById('booking-section');
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Free Consultation
                  </Button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                {/* Visual Elements */}
                <div className="relative">
                  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl transform rotate-2">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Independent Agency</h3>
                          <p className="text-sm opacity-90">Your interests first</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                          <span className="text-sm font-medium">Average Savings</span>
                          <span className="text-lg font-bold">$847/year</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                          <span className="text-sm font-medium">Quote Time</span>
                          <span className="text-lg font-bold">Under 3 min</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                          <span className="text-sm font-medium">Options Compared</span>
                          <span className="text-lg font-bold">40+ Carriers</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="absolute -bottom-6 -left-6 bg-card border shadow-xl transform -rotate-2 z-10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">5-Star Rating</p>
                          <p className="text-xs text-muted-foreground">Trusted by families</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking-section" className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
              Speak with a Licensed Professional
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions? Want personalized recommendations? Schedule a free consultation 
              with one of our experienced insurance professionals.
            </p>
            <Button 
              size="lg" 
              onClick={() => {
                const bookingPage = '/booking';
                window.location.href = bookingPage;
              }}
              className="px-8 py-4 text-lg font-semibold"
            >
              <Calendar className="mr-2 w-6 h-6" />
              Book Your Free Consultation
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default GetQuote;