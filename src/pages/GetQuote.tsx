import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Award, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const GetQuote = () => {
  // Insurance company logos with transparent backgrounds
  const companyLogos = [
    {
      name: "Allianz",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Allianz.svg",
      category: "Annuities",
      initials: "AL"
    },
    {
      name: "American Equity",
      logo: "https://logo.clearbit.com/american-equity.com",
      category: "Life Insurance",
      initials: "AE"
    },
    {
      name: "Nationwide",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/Nationwide_Mutual_Insurance_Company_logo.svg",
      category: "Comprehensive",
      initials: "NW"
    },
    {
      name: "American National",
      logo: "https://logo.clearbit.com/americannational.com",
      category: "Life Insurance",
      initials: "AN"
    },
    {
      name: "Americo",
      logo: "https://logo.clearbit.com/americo.com",
      category: "Life Insurance",
      initials: "AM"
    },
    {
      name: "Assurity",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Assurity_Logo_3x3.jpg",
      category: "Life Insurance",
      initials: "AS"
    },
    {
      name: "Athene",
      logo: "https://logo.clearbit.com/athene.com",
      category: "Annuities",
      initials: "AT"
    },
    {
      name: "Atlantic Coast Life",
      logo: "https://logo.clearbit.com/aclife.com",
      category: "Life Insurance",
      initials: "AC"
    },
    {
      name: "Guggenheim",
      logo: "https://logo.clearbit.com/guggenheimpartners.com",
      category: "Annuities",
      initials: "GU"
    },
    {
      name: "Western & Southern",
      logo: "https://logo.clearbit.com/westernsouthern.com",
      category: "Comprehensive",
      initials: "WS"
    },
    {
      name: "EquiTrust",
      logo: "https://logo.clearbit.com/equitrust.com",
      category: "Annuities",
      initials: "ET"
    },
    {
      name: "F&G Annuities & Life",
      logo: "https://logo.clearbit.com/fglife.com",
      category: "Annuities",
      initials: "FG"
    },
    {
      name: "Foresters",
      logo: "https://logo.clearbit.com/foresters.com",
      category: "Annuities",
      initials: "FO"
    },
    {
      name: "Global Atlantic",
      logo: "https://logo.clearbit.com/globalatlantic.com",
      category: "Annuities",
      initials: "GA"
    },
    {
      name: "Lincoln Financial",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Lincoln_National_Corporation_logo.svg",
      category: "Annuities",
      initials: "LI"
    },
    {
      name: "MassMutual",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/MassMutual_logo.svg",
      category: "Life Insurance",
      initials: "MM"
    },
    {
      name: "OneAmerica",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/OneAmerica_logo.svg",
      category: "Comprehensive",
      initials: "OA"
    },
    {
      name: "Protective Life",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Protective_Life_logo.svg",
      category: "Final Expense",
      initials: "PL"
    },
    {
      name: "Prudential Financial",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Prudential_Financial_logo.svg",
      category: "Life Insurance",
      initials: "PR"
    },
    {
      name: "The Standard",
      logo: "https://logo.clearbit.com/standard.com",
      category: "Final Expense",
      initials: "TS"
    },
    {
      name: "Liberty Bankers",
      logo: "https://logo.clearbit.com/libertybankers.com",
      category: "Final Expense",
      initials: "LB"
    },
    {
      name: "Securian Financial",
      logo: "https://logo.clearbit.com/securian.com",
      category: "Comprehensive",
      initials: "SF"
    },
    {
      name: "National Life Group",
      logo: "https://logo.clearbit.com/nationallife.com",
      category: "Life Insurance",
      initials: "NL"
    },
    {
      name: "North American",
      logo: "https://logo.clearbit.com/northamericancompany.com",
      category: "Life Insurance",
      initials: "NA"
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
                We represent America's most trusted insurance companies. 
                Compare rates and coverage options to find your perfect match.
              </p>
            </div>

            {/* Modern Rotating Logo Showcase */}
            <div className="relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 animate-pulse"></div>
              <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
              <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
              
              {/* Upper Row - Moving Right */}
              <div className="relative mb-8">
                <div className="flex animate-[scroll-right_30s_linear_infinite] gap-8">
                  <div className="flex gap-8 min-w-max">
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/bdc396e8-20d3-420a-a18c-86b95d2c8f3f.png" alt="Allianz" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/d80f077b-ae61-4d6f-ac4a-100f2e403fd2.png" alt="American Equity" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/10aed62a-cf02-460a-933d-8633b52632a2.png" alt="American National" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/40b3b311-a454-4074-9067-b69adf314e12.png" alt="Americo" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/e632ce5d-0cb9-4ee1-8763-f41d31443959.png" alt="Assurity" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                  </div>
                  {/* Duplicate for seamless loop */}
                  <div className="flex gap-8 min-w-max">
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/bdc396e8-20d3-420a-a18c-86b95d2c8f3f.png" alt="Allianz" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/d80f077b-ae61-4d6f-ac4a-100f2e403fd2.png" alt="American Equity" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/10aed62a-cf02-460a-933d-8633b52632a2.png" alt="American National" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/40b3b311-a454-4074-9067-b69adf314e12.png" alt="Americo" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <img src="/lovable-uploads/e632ce5d-0cb9-4ee1-8763-f41d31443959.png" alt="Assurity" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Row - Moving Left */}
              <div className="relative">
                <div className="flex animate-[scroll-left_25s_linear_infinite] gap-8">
                  <div className="flex gap-8 min-w-max">
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/25640b9f-b025-40a3-b338-b691298eab58.png" alt="Athene" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/c975ca95-369f-49e7-a165-3fa2a1167547.png" alt="Corebridge Financial" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/0e7ad9af-f538-47ac-8284-021a5d1febcb.png" alt="EquiTrust" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/4eb78a4a-f82b-4e19-8968-dd673108430a.png" alt="F&G Annuities & Life" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/69f0b619-2561-41dd-b820-187475b5f2f2.png" alt="Foresters" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                  </div>
                  {/* Duplicate for seamless loop */}
                  <div className="flex gap-8 min-w-max">
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/25640b9f-b025-40a3-b338-b691298eab58.png" alt="Athene" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/c975ca95-369f-49e7-a165-3fa2a1167547.png" alt="Corebridge Financial" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/0e7ad9af-f538-47ac-8284-021a5d1febcb.png" alt="EquiTrust" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/4eb78a4a-f82b-4e19-8968-dd673108430a.png" alt="F&G Annuities & Life" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                    <div className="group relative w-32 h-20 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500">
                      <img src="/lovable-uploads/69f0b619-2561-41dd-b820-187475b5f2f2.png" alt="Foresters" className="max-w-24 max-h-12 object-contain" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-pulse">
                  <Shield className="w-6 h-6" />
                  <span className="text-lg">40+ Premium Insurance Carriers</span>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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