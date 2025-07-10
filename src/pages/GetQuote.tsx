import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Award, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const GetQuote = () => {
  // Placeholder company data - can be updated with actual logos
  const companies = [
    { name: "Mutual of Omaha", category: "Life Insurance" },
    { name: "Prudential", category: "Investment Products" },
    { name: "MetLife", category: "Life & Annuities" },
    { name: "Lincoln Financial", category: "Retirement Solutions" },
    { name: "Transamerica", category: "Life Insurance" },
    { name: "Pacific Life", category: "Annuities" },
    { name: "American General", category: "Life Insurance" },
    { name: "John Hancock", category: "Investment Solutions" },
    { name: "New York Life", category: "Insurance & Investments" },
    { name: "Guardian Life", category: "Insurance Solutions" },
    { name: "MassMutual", category: "Financial Services" },
    { name: "Northwestern Mutual", category: "Financial Planning" }
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
                One Agent, <span className="text-primary">50+ Companies</span>
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Top-Rated Insurance Companies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with America's most trusted insurance companies to bring you the best options.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {companies.map((company, index) => (
                <Card key={index} className="border hover:border-primary/20 transition-colors duration-300 bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{company.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {company.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  Why Families Choose Agora
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Don't settle for one-size-fits-all insurance solutions. Our independent approach 
                  means we work for you, not the insurance companies.
                </p>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:pl-8">
                <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="mb-6 opacity-90">
                      Get your personalized quote in minutes, or speak with one of our licensed professionals.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="w-full font-semibold"
                        onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                      >
                        Get Instant Quote
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full font-semibold bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                        onClick={() => {
                          const bookingSection = document.getElementById('booking-section');
                          if (bookingSection) {
                            bookingSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <Calendar className="mr-2 w-5 h-5" />
                        Schedule a Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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