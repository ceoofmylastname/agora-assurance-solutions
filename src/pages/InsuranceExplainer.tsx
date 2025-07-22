
import { useState } from 'react';
import { Phone, Mail, User, ChevronDown, ChevronUp, Shield, TrendingUp, Clock, Target, Building2, PiggyBank, Banknote, Calculator, Heart, Users, Home, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface InsuranceType {
  id: string;
  title: string;
  icon: any;
  description: string;
  details: string;
  types?: {
    name: string;
    description: string;
  }[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

const InsuranceExplainer = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you! We\'ll contact you soon with your personalized quote.');
  };

  const lifeInsuranceTypes: InsuranceType[] = [
    {
      id: 'term-life',
      title: 'Term Life Insurance',
      icon: Clock,
      description: 'Temporary coverage for a specific period at affordable rates.',
      details: 'Term life insurance provides coverage for a predetermined period, typically 10, 20, or 30 years. It\'s the most affordable type of life insurance, making it ideal for temporary needs like mortgage protection or income replacement during working years.',
      types: [
        { name: 'Level Term', description: 'Fixed premium and death benefit throughout the term' },
        { name: 'Increasing Term', description: 'Death benefit increases over time, often with inflation' },
        { name: 'Decreasing Term', description: 'Death benefit decreases over time, ideal for mortgage protection' },
        { name: 'Return of Premium', description: 'Refunds all premiums paid if no claim is made during the term' }
      ],
      pros: ['Most affordable option', 'Simple and straightforward', 'High coverage amounts available', 'No cash value complexity'],
      cons: ['Temporary coverage only', 'Premiums increase at renewal', 'No investment component', 'Coverage ends when term expires'],
      bestFor: 'Young families, mortgage protection, income replacement during working years'
    },
    {
      id: 'whole-life',
      title: 'Whole Life Insurance',
      icon: Shield,
      description: 'Permanent coverage with guaranteed cash value growth.',
      details: 'Whole life insurance provides lifetime coverage with a savings component that builds cash value. Premiums and death benefits are guaranteed, making it a stable, predictable investment.',
      pros: ['Lifetime coverage guaranteed', 'Fixed premiums never increase', 'Guaranteed cash value growth', 'Tax-deferred growth', 'Dividend potential'],
      cons: ['Higher premiums than term', 'Lower returns than other investments', 'Less flexibility than universal life', 'Surrender charges early on'],
      bestFor: 'Estate planning, long-term savings goals, those wanting guaranteed outcomes'
    },
    {
      id: 'universal-life',
      title: 'Universal Life Insurance',
      icon: Target,
      description: 'Flexible permanent insurance with adjustable premiums and benefits.',
      details: 'Universal life offers flexible premiums and death benefits with a cash value component that earns interest based on current market rates. You can adjust your premium payments and coverage amounts within certain limits.',
      pros: ['Flexible premium payments', 'Adjustable death benefit', 'Potential for higher returns', 'Tax-advantaged growth', 'Loan options against cash value'],
      cons: ['No guaranteed returns', 'Complex to understand', 'Risk of policy lapse', 'Management required', 'Fees can be high'],
      bestFor: 'Those wanting flexibility, sophisticated investors, business owners'
    },
    {
      id: 'indexed-ul',
      title: 'Indexed Universal Life',
      icon: TrendingUp,
      description: 'Growth potential tied to stock market indexes with downside protection.',
      details: 'Indexed Universal Life (IUL) links cash value growth to a stock market index like the S&P 500, offering upside potential with protection against market losses. It includes caps on gains and floors to prevent losses.',
      pros: ['Market upside potential', 'Downside protection', 'Tax-free retirement income potential', 'Flexible premiums', 'No direct market risk'],
      cons: ['Caps limit maximum gains', 'Complex product structure', 'Higher fees than traditional UL', 'Not guaranteed', 'Requires active management'],
      bestFor: 'Those seeking market growth potential with protection, retirement income planning'
    },
    {
      id: 'variable-life',
      title: 'Variable Life Insurance',
      icon: Calculator,
      description: 'Investment-linked insurance with sub-account options.',
      details: 'Variable life insurance allows you to direct cash value into various investment sub-accounts, similar to mutual funds. Returns depend on investment performance, offering the highest growth potential but also the highest risk.',
      pros: ['Highest growth potential', 'Investment control', 'Professional money management', 'Tax advantages', 'Variety of investment options'],
      cons: ['Market risk exposure', 'No guaranteed returns', 'Can lose value', 'Complex and expensive', 'Requires investment knowledge'],
      bestFor: 'Experienced investors, those comfortable with market risk, high-income earners'
    },
    {
      id: 'guaranteed-issue',
      title: 'Guaranteed Issue Life',
      icon: Heart,
      description: 'No medical exam required, typically for final expenses.',
      details: 'Guaranteed issue life insurance requires no medical exam or health questions. Coverage is typically limited and more expensive, but it\'s available to almost everyone regardless of health status.',
      pros: ['No medical exam required', 'Guaranteed acceptance', 'Quick approval', 'Simple application', 'Covers final expenses'],
      cons: ['Limited coverage amounts', 'Higher premiums', 'Waiting period for full benefits', 'Age restrictions', 'No cash value typically'],
      bestFor: 'Seniors with health issues, final expense planning, those declined elsewhere'
    }
  ];

  const annuityTypes: InsuranceType[] = [
    {
      id: 'immediate-annuities',
      title: 'Immediate Annuities',
      icon: Banknote,
      description: 'Start receiving income payments immediately after purchase.',
      details: 'Immediate annuities convert a lump sum into a stream of guaranteed income payments that begin within one year of purchase. They provide predictable income for life or a specified period.',
      pros: ['Immediate income stream', 'Guaranteed payments', 'Protection against longevity risk', 'Simple and straightforward', 'No market risk'],
      cons: ['No liquidity once started', 'Limited growth potential', 'Inflation risk', 'No inheritance if life-only option', 'Interest rate risk'],
      bestFor: 'Retirees needing immediate income, pension replacement, conservative investors'
    },
    {
      id: 'fixed-deferred-annuities',
      title: 'Fixed Deferred Annuities',
      icon: PiggyBank,
      description: 'Guaranteed growth with tax-deferred accumulation.',
      details: 'Fixed deferred annuities offer guaranteed interest rates during the accumulation phase, with the option to convert to income payments later. They provide predictable growth with principal protection.',
      pros: ['Guaranteed returns', 'Principal protection', 'Tax-deferred growth', 'No market risk', 'Predictable outcomes'],
      cons: ['Lower returns than market investments', 'Surrender charges', 'Limited liquidity', 'Inflation risk', 'Interest rate risk'],
      bestFor: 'Conservative savers, those seeking guaranteed returns, retirement planning'
    },
    {
      id: 'indexed-deferred-annuities',
      title: 'Indexed Deferred Annuities',
      icon: TrendingUp,
      description: 'Growth tied to market indexes with principal protection.',
      details: 'Indexed annuities link returns to market index performance while protecting principal. They offer upside potential with caps and floors, combining growth opportunity with downside protection.',
      pros: ['Market upside potential', 'Principal protection', 'Tax-deferred growth', 'No direct market risk', 'Various crediting methods'],
      cons: ['Caps limit gains', 'Complex features', 'Surrender charges', 'Not guaranteed', 'Fees can be high'],
      bestFor: 'Those wanting market participation with protection, moderate risk tolerance'
    },
    {
      id: 'variable-deferred-annuities',
      title: 'Variable Deferred Annuities',
      icon: Calculator,
      description: 'Investment growth potential with sub-account options.',
      details: 'Variable annuities allow investment in sub-accounts similar to mutual funds, offering the highest growth potential among annuities but with market risk. They often include optional guaranteed benefits.',
      pros: ['Highest growth potential', 'Investment control', 'Professional management', 'Tax advantages', 'Optional guarantees available'],
      cons: ['Market risk exposure', 'High fees', 'Complex features', 'Can lose value', 'Requires investment knowledge'],
      bestFor: 'Experienced investors, those comfortable with market risk, long-term growth focus'
    },
    {
      id: 'qualified-vs-nonqualified',
      title: 'Qualified vs Non-Qualified',
      icon: Building2,
      description: 'Understanding tax treatment differences.',
      details: 'The tax treatment of annuities depends on whether they\'re purchased with pre-tax (qualified) or after-tax (non-qualified) money, affecting how withdrawals and income payments are taxed.',
      pros: ['Tax planning flexibility', 'Retirement account compatibility', 'Deferred taxation benefits', 'Estate planning advantages', 'Multiple funding options'],
      cons: ['Complex tax rules', 'Required distributions for qualified', 'Early withdrawal penalties', 'Different treatment rules', 'Professional guidance needed'],
      bestFor: 'Retirement planning, tax optimization, estate planning strategies'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Life Insurance & Annuity Types Explained | Agora Assurance Solutions"
        description="Complete guide to life insurance and annuity types. Learn about term life, whole life, universal life, annuities and find the perfect coverage for your needs."
        keywords={['life insurance types', 'annuities explained', 'term life insurance', 'whole life insurance', 'universal life insurance', 'retirement planning']}
      />

      <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4 sm:mb-6 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Insurance & Annuity Guide
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4 sm:mb-6">
                Life Insurance & <span className="text-primary">Annuity Types</span> Explained
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover the perfect protection and retirement strategy for your unique situation. 
                Our comprehensive guide breaks down every type of life insurance and annuity to help you make informed decisions.
              </p>
            </motion.div>
          </motion.div>

          {/* Life Insurance Section */}
          <motion.div 
            className="mb-12 sm:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground flex items-center justify-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Life Insurance Types
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From affordable term coverage to permanent wealth-building policies
              </p>
            </motion.div>

            <div className="space-y-4">
              {lifeInsuranceTypes.map((insurance, index) => (
                <motion.div key={insurance.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors duration-300">
                    <Collapsible 
                      open={openSections.includes(insurance.id)}
                      onOpenChange={() => toggleSection(insurance.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors duration-200">
                          <CardTitle className="flex items-center justify-between text-left">
                            <div className="flex items-center gap-3">
                              <insurance.icon className="w-6 h-6 text-primary flex-shrink-0" />
                              <div>
                                <div className="text-lg sm:text-xl font-bold">{insurance.title}</div>
                                <div className="text-sm text-muted-foreground font-normal mt-1">
                                  {insurance.description}
                                </div>
                              </div>
                            </div>
                            {openSections.includes(insurance.id) ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-6">
                          <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {insurance.details}
                            </p>

                            {insurance.types && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-3">Types Available:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {insurance.types.map((type, typeIndex) => (
                                    <div key={typeIndex} className="bg-muted/30 rounded-lg p-3">
                                      <div className="font-medium text-sm text-foreground">{type.name}</div>
                                      <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Advantages
                                </h4>
                                <ul className="space-y-1">
                                  {insurance.pros.map((pro, proIndex) => (
                                    <li key={proIndex} className="text-sm text-muted-foreground">• {pro}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  Considerations
                                </h4>
                                <ul className="space-y-1">
                                  {insurance.cons.map((con, conIndex) => (
                                    <li key={conIndex} className="text-sm text-muted-foreground">• {con}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Best For
                                </h4>
                                <p className="text-sm text-muted-foreground">{insurance.bestFor}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Annuities Section */}
          <motion.div 
            className="mb-12 sm:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground flex items-center justify-center gap-3">
                <PiggyBank className="w-8 h-8 text-primary" />
                Annuity Types
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Guaranteed retirement income and tax-advantaged growth strategies
              </p>
            </motion.div>

            <div className="space-y-4">
              {annuityTypes.map((annuity, index) => (
                <motion.div key={annuity.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors duration-300">
                    <Collapsible 
                      open={openSections.includes(annuity.id)}
                      onOpenChange={() => toggleSection(annuity.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors duration-200">
                          <CardTitle className="flex items-center justify-between text-left">
                            <div className="flex items-center gap-3">
                              <annuity.icon className="w-6 h-6 text-primary flex-shrink-0" />
                              <div>
                                <div className="text-lg sm:text-xl font-bold">{annuity.title}</div>
                                <div className="text-sm text-muted-foreground font-normal mt-1">
                                  {annuity.description}
                                </div>
                              </div>
                            </div>
                            {openSections.includes(annuity.id) ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-6">
                          <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {annuity.details}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Advantages
                                </h4>
                                <ul className="space-y-1">
                                  {annuity.pros.map((pro, proIndex) => (
                                    <li key={proIndex} className="text-sm text-muted-foreground">• {pro}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  Considerations
                                </h4>
                                <ul className="space-y-1">
                                  {annuity.cons.map((con, conIndex) => (
                                    <li key={conIndex} className="text-sm text-muted-foreground">• {con}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Best For
                                </h4>
                                <p className="text-sm text-muted-foreground">{annuity.bestFor}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Form Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl"></div>
            <Card className="relative border-2 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <motion.div className="text-center mb-8" variants={itemVariants}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground">
                    Get Your Personalized Quote
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Ready to find the perfect insurance or annuity solution? Our licensed advisors will help you 
                    compare options and create a personalized plan that fits your needs and budget.
                  </p>
                </motion.div>

                <motion.div className="max-w-md mx-auto" variants={itemVariants}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-base py-6"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Request My Personalized Quote
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to be contacted by our licensed insurance advisors. 
                      No spam, no pressure - just personalized guidance to help you make the best decision.
                    </p>
                  </form>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InsuranceExplainer;
