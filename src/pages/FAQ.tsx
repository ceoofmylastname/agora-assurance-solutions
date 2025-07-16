import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0, 1, 2])); // Open first 3 by default

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "Getting Started with Agora",
      questions: [
        {
          question: "How is Agora different from other insurance brokers?",
          answer: "Agora combines cutting-edge technology with independent consumer advocacy. Unlike traditional brokers tied to specific carriers, we compare dozens of top-rated companies instantly to find your best rates and coverage options with zero bias."
        },
        {
          question: "How can I compare insurance plans quickly?",
          answer: "Explore tailored life, mortgage-protection, final expense, annuity, and tax-solutions plans side-by-side with instant comparisons from top carriers through our advanced comparison platform."
        },
        {
          question: "How fast can I get a personalized quote?",
          answer: "Instantly receive customized quotes from top carriers in seconds—no phone calls, forms, or waiting required through our streamlined digital platform."
        },
        {
          question: "Does Agora charge fees for their services?",
          answer: "No, Agora's services are completely free to consumers. We're compensated directly by insurance carriers when you purchase coverage, so you never pay consultation or comparison fees."
        },
        {
          question: "Can I speak with a real person at Agora?",
          answer: "Absolutely. All clients receive hands-on guidance from state-licensed professionals who ensure solutions align with your family's specific goals and budget throughout the entire process."
        }
      ]
    },
    {
      category: "Insurance Products & Coverage",
      questions: [
        {
          question: "What services does Agora offer beyond life insurance?",
          answer: "Comprehensive financial protection including tax strategies, asset protection, annuities, life settlements, and retirement planning solutions tailored to your unique financial situation."
        },
        {
          question: "How much does $500k term life insurance cost for a 35-year-old?",
          answer: "Healthy 35-year-olds typically pay $25-50 monthly for $500k term life coverage, depending on term length and health factors."
        },
        {
          question: "What happens when my term life insurance expires?",
          answer: "When term life insurance expires, coverage ends. You can often convert to permanent life insurance, renew at higher rates, or purchase new coverage subject to health underwriting."
        },
        {
          question: "Can I get life insurance if I have diabetes and high blood pressure?",
          answer: "Yes, many carriers offer coverage for controlled diabetes and hypertension. We specialize in finding policies for pre-existing conditions."
        },
        {
          question: "What's the difference between term and whole life insurance?",
          answer: "Term life provides temporary coverage at lower costs, while whole life combines permanent protection with cash value growth. Term is ideal for temporary needs; whole life for lifelong protection."
        }
      ]
    },
    {
      category: "Application Process",
      questions: [
        {
          question: "How does Agora simplify the insurance process?",
          answer: "We streamline every step from quote to coverage in 24 hours with transparent, real-time updates and continuous communication throughout your journey with our licensed advisors."
        },
        {
          question: "What information do I need to get an accurate quote?",
          answer: "Basic personal information including age, health status, coverage amount needed, and beneficiary details. Our smart questionnaire guides you through each step efficiently."
        },
        {
          question: "How long does it take to get approved for term life insurance?",
          answer: "Simple term life policies can be approved in 24-48 hours, while larger amounts may take 2-4 weeks for medical underwriting."
        },
        {
          question: "How to buy life insurance online without talking to a salesman?",
          answer: "Our digital platform offers complete online application with optional expert support. No pushy sales tactics—just transparent information and choice."
        },
        {
          question: "Best life insurance companies for people with pre-existing conditions?",
          answer: "We work with carriers like Mutual of Omaha, Foresters, and American National who specialize in covering diabetes, heart conditions, and other health issues."
        }
      ]
    },
    {
      category: "Service Areas & Support",
      questions: [
        {
          question: "Which states does Agora serve?",
          answer: "Agora provides insurance services nationwide across all 50 states, with state-licensed advisors who understand local regulations and carrier availability in your area."
        },
        {
          question: "Do insurance rates vary by state with Agora?",
          answer: "Yes, insurance rates can vary by state due to local regulations, demographics, and carrier competition. Our platform shows you the best available rates in your specific location."
        },
        {
          question: "Can I trust Agora with my personal information?",
          answer: "Absolutely. We use bank-level encryption and strict privacy protocols. Your information is never sold to third parties and is only shared with carriers you choose to work with."
        },
        {
          question: "What if I need help after purchasing my policy?",
          answer: "Agora provides ongoing support for all policy holders including claims assistance, policy reviews, and life changes that may affect your coverage needs."
        }
      ]
    },
    {
      category: "Why Choose Agora",
      questions: [
        {
          question: "Why should I choose Agora Assurance Solutions?",
          answer: "With 50+ years combined experience, 25,000+ lives protected, and $500M+ in tax-free benefits created, we offer technology-driven comparison tools and licensed expert guidance."
        },
        {
          question: "What makes Agora different from other insurance companies?",
          answer: "Our unique technology-driven approach combines AI comparison tools with independent consumer advocacy and state-licensed expertise for transparent, personalized service without carrier bias."
        },
        {
          question: "How does Agora make money if their service is free?",
          answer: "Insurance carriers pay us commissions when you purchase coverage through our platform. This standard industry practice allows us to offer free comparison and advisory services to consumers."
        },
        {
          question: "Do you work with reputable insurance companies?",
          answer: "Yes, we exclusively partner with A-rated or higher insurance carriers with strong financial stability ratings from agencies like AM Best, Standard & Poor's, and Moody's."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const popularQuestions = [
    faqData[0].questions[1], // How can I compare insurance plans quickly?
    faqData[1].questions[1], // How much does term life insurance cost?
    faqData[2].questions[0], // How does Agora simplify the insurance process?
    faqData[4].questions[0]  // Why should I choose Agora Assurance Solutions?
  ];

  return (
    <PageLayout>
      <SEO 
        title="Frequently Asked Questions - Agora Assurance Solutions"
        description="Get answers to common questions about life insurance, coverage options, application process, and working with Agora Assurance Solutions. Expert guidance made simple."
        keywords={['insurance FAQ', 'life insurance questions', 'term life FAQ', 'final expense questions', 'insurance process', 'Agora questions', 'insurance help']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-2 md:px-4 py-8 md:py-16 pt-20 md:pt-24">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 px-4 mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Get instant answers to common questions about insurance coverage, our process, and working with Agora's licensed professionals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-6 md:mb-8 px-2">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base rounded-lg"
              />
            </div>
          </div>

          {/* Popular Questions */}
          {!searchTerm && (
            <div className="mb-8 md:mb-12 px-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 text-center">Popular Questions</h2>
              <div className="grid gap-3 md:grid-cols-2 md:gap-4 max-w-4xl mx-auto">
                {popularQuestions.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer touch-manipulation" onClick={() => {
                    const questionText = item.question;
                    setSearchTerm(questionText);
                  }}>
                    <CardContent className="p-4 md:p-5">
                      <h3 className="font-medium text-primary text-sm md:text-base leading-relaxed break-words">
                        {item.question}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Categories */}
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 md:mb-12">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {category.category}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid gap-4 md:gap-6">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.has(globalIndex);
                    
                    return (
                      <div 
                        key={questionIndex} 
                        className="group relative bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-4 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 relative z-20 bg-transparent"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed pr-2 group-hover:text-primary transition-colors duration-200 flex-1">
                              {item.question}
                            </h3>
                            <div className="flex-shrink-0 mt-1">
                              <div className={`p-1 rounded-full transition-all duration-200 ${isOpen ? 'bg-primary/10 rotate-180' : 'bg-muted/50 group-hover:bg-primary/10'}`}>
                                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"></div>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                        
                        {/* Subtle hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-8 md:py-12 px-4">
              <p className="text-muted-foreground text-base md:text-lg break-words">
                No questions found matching "{searchTerm}". Try different keywords or browse our categories above.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="text-center mt-12 md:mt-16 mx-4 p-6 md:p-8 bg-muted/30 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 leading-tight">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              Our licensed insurance professionals are here to provide personalized guidance for your specific situation.
            </p>
            <Link to="/booking">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base touch-manipulation min-h-[44px]">
                Speak with an Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
