import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
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
          question: "How much does term life insurance cost?",
          answer: "A healthy 30-year-old might pay $20-40/month for $500,000 in term coverage, while a 50-year-old could pay $100-200/month for the same amount. Costs vary by age, health, and coverage type."
        },
        {
          question: "What happens when my term life insurance expires?",
          answer: "When term life insurance expires, coverage ends. You can often convert to permanent life insurance, renew at higher rates, or purchase new coverage subject to health underwriting."
        },
        {
          question: "Can I get final expense insurance without a medical exam?",
          answer: "Yes, most final expense policies don't require medical exams. They use simplified underwriting with basic health questions, making them accessible to seniors with health issues."
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
          question: "How quickly can I get covered with Agora?",
          answer: "Most clients go from quote to coverage in 24 hours with our streamlined digital process and instant underwriting approvals for qualifying applicants."
        },
        {
          question: "Do I need a medical exam for life insurance?",
          answer: "Not always. Many policies now offer simplified underwriting or instant approval based on health questionnaires. Medical exams are typically required for larger coverage amounts or older applicants."
        },
        {
          question: "Can I apply for insurance online completely?",
          answer: "Yes, our digital platform handles the entire application process online, from initial quotes through final approval, with optional phone support when needed."
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
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get instant answers to common questions about insurance coverage, our process, and working with Agora's licensed professionals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base"
              />
            </div>
          </div>

          {/* Popular Questions */}
          {!searchTerm && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Popular Questions</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {popularQuestions.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                    const questionText = item.question;
                    setSearchTerm(questionText);
                  }}>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-primary text-sm leading-relaxed">
                        {item.question}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6 border-b border-border pb-2">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex; // Unique index
                    const isOpen = openItems.has(globalIndex);
                    
                    return (
                      <Card key={questionIndex} className="border border-border hover:shadow-md transition-all">
                        <CardContent className="p-0">
                          <Button
                            variant="ghost"
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full justify-between p-6 text-left h-auto hover:bg-muted/50"
                          >
                            <h3 className="text-lg font-medium text-foreground pr-4 leading-relaxed">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </Button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <p className="text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No questions found matching "{searchTerm}". Try different keywords or browse our categories above.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our licensed insurance professionals are here to provide personalized guidance for your specific situation.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Speak with an Expert
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;