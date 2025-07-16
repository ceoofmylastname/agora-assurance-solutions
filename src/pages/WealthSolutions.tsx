import { ArrowLeft, TrendingUp, Shield, DollarSign, Calculator, Clock, Building2, Target, PiggyBank, Banknote, Phone, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import SEO from '@/components/SEO';
import FixedAnnuitiesModal from '@/components/FixedAnnuitiesModal';
import VariableAnnuitiesModal from '@/components/VariableAnnuitiesModal';

const WealthSolutions = () => {
  const navigate = useNavigate();
  const [calculatorExpanded, setCalculatorExpanded] = useState(false);
  const [fixedAnnuitiesModalOpen, setFixedAnnuitiesModalOpen] = useState(false);
  const [variableAnnuitiesModalOpen, setVariableAnnuitiesModalOpen] = useState(false);
  
  const [calculatorInputs, setCalculatorInputs] = useState({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 500,
    expectedReturn: 7,
    riskTolerance: 'moderate'
  });
  const [projections, setProjections] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    calculateProjections();
  }, [calculatorInputs]);

  const calculateProjections = () => {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn } = calculatorInputs;
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;

    // Future value calculation
    const futureValueCurrent = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
    const totalRetirementFund = futureValueCurrent + futureValueContributions;

    // Monthly retirement income (4% rule)
    const monthlyRetirementIncome = (totalRetirementFund * 0.04) / 12;

    setProjections({
      totalRetirementFund,
      monthlyRetirementIncome,
      totalContributions: monthlyContribution * totalMonths,
      yearsToRetirement
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
        title="Wealth Solutions - Annuities & Asset Protection | Agora Assurance Solutions"
        description="Secure retirement income and long-term financial growth with our wealth solutions. Guaranteed retirement income, tax-advantaged growth, and asset protection strategies."
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
        keywords={['wealth solutions', 'annuities', 'asset protection', 'retirement income', 'tax-advantaged growth', 'estate planning', 'financial planning']}
      />
      
      <FixedAnnuitiesModal 
        isOpen={fixedAnnuitiesModalOpen} 
        onClose={() => setFixedAnnuitiesModalOpen(false)} 
      />
      
      <VariableAnnuitiesModal 
        isOpen={variableAnnuitiesModalOpen} 
        onClose={() => setVariableAnnuitiesModalOpen(false)} 
      />
      
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 sm:mb-6 lg:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation text-sm sm:text-base">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <motion.div 
            className="relative mb-12 sm:mb-16 lg:mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-3xl"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <motion.div variants={itemVariants}>
                <Badge variant="secondary" className="mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Wealth Solutions
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-tight mb-4 sm:mb-6">
                  Build Your <span className="text-primary">Financial Legacy</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Annuities and asset protection strategies for secure retirement income and long-term financial growth. Plan your wealth with guaranteed retirement income and tax-advantaged strategies.
                </p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Button 
                    size="lg"
                    onClick={() => setCalculatorExpanded(true)}
                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  >
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Try Wealth Calculator
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('tel:+19162889400', '_self')}
                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Speak with Advisor
                  </Button>
                </div>
              </motion.div>
              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80" 
                  alt="Professional financial planning workspace with laptop and modern technology"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Wealth Calculator */}
          <motion.div 
            className="mb-12 sm:mb-16 lg:mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div 
                  className="p-6 sm:p-8 cursor-pointer hover:bg-muted/20 transition-colors duration-300"
                  onClick={() => setCalculatorExpanded(!calculatorExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Interactive Wealth Calculator
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Plan your financial future with personalized projections
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Calculator className="w-8 h-8 text-primary" />
                      {calculatorExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                  </div>
                </div>

                {calculatorExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 sm:p-8 bg-muted/10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Calculator Inputs */}
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-foreground mb-4">Your Information</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="currentAge">Current Age</Label>
                              <Input
                                id="currentAge"
                                type="number"
                                value={calculatorInputs.currentAge}
                                onChange={(e) => setCalculatorInputs({...calculatorInputs, currentAge: Number(e.target.value)})}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="retirementAge">Retirement Age</Label>
                              <Input
                                id="retirementAge"
                                type="number"
                                value={calculatorInputs.retirementAge}
                                onChange={(e) => setCalculatorInputs({...calculatorInputs, retirementAge: Number(e.target.value)})}
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="currentSavings">Current Savings</Label>
                            <Input
                              id="currentSavings"
                              type="number"
                              value={calculatorInputs.currentSavings}
                              onChange={(e) => setCalculatorInputs({...calculatorInputs, currentSavings: Number(e.target.value)})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                            <Input
                              id="monthlyContribution"
                              type="number"
                              value={calculatorInputs.monthlyContribution}
                              onChange={(e) => setCalculatorInputs({...calculatorInputs, monthlyContribution: Number(e.target.value)})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label>Expected Annual Return: {calculatorInputs.expectedReturn}%</Label>
                            <Slider
                              value={[calculatorInputs.expectedReturn]}
                              onValueChange={(value) => setCalculatorInputs({...calculatorInputs, expectedReturn: value[0]})}
                              max={15}
                              min={3}
                              step={0.5}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                            <Select value={calculatorInputs.riskTolerance} onValueChange={(value) => setCalculatorInputs({...calculatorInputs, riskTolerance: value})}>
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conservative">Conservative (3-5%)</SelectItem>
                                <SelectItem value="moderate">Moderate (6-8%)</SelectItem>
                                <SelectItem value="aggressive">Aggressive (9-12%)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-foreground mb-4">Your Projections</h4>
                          
                          {projections && (
                            <div className="space-y-4">
                              <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Retirement Fund</span>
                                    <span className="text-xl font-bold text-primary">{formatCurrency(projections.totalRetirementFund)}</span>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="bg-green-500/5 border-green-500/20">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Monthly Retirement Income</span>
                                    <span className="text-xl font-bold text-green-600">{formatCurrency(projections.monthlyRetirementIncome)}</span>
                                  </div>
                                </CardContent>
                              </Card>

                              <div className="grid grid-cols-2 gap-2">
                                <Card className="bg-blue-500/5 border-blue-500/20">
                                  <CardContent className="p-3">
                                    <div className="text-center">
                                      <span className="text-xs text-muted-foreground block">Years to Retirement</span>
                                      <span className="text-lg font-bold text-blue-600">{projections.yearsToRetirement}</span>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="bg-purple-500/5 border-purple-500/20">
                                  <CardContent className="p-3">
                                    <div className="text-center">
                                      <span className="text-xs text-muted-foreground block">Total Contributions</span>
                                      <span className="text-lg font-bold text-purple-600">{formatCurrency(projections.totalContributions)}</span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-900/20 dark:border-amber-800">
                                <div className="flex items-start">
                                  <Info className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                      These projections are estimates based on your inputs. Actual results may vary. 
                                      Speak with our financial advisors for personalized strategies.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <Button 
                                className="w-full"
                                onClick={() => navigate('/booking')}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Discuss These Results with an Advisor
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Wealth Solutions Benefits */}
          <motion.div 
            className="mb-12 sm:mb-16 lg:mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8 sm:mb-12 lg:mb-16" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">Wealth Solution Benefits</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Five essential benefits that make our wealth solutions the foundation of your financial security
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {[
                { 
                  icon: PiggyBank, 
                  title: "Guaranteed Retirement Income", 
                  description: "Secure predictable income streams that last throughout your retirement years",
                  color: "text-blue-500"
                },
                { 
                  icon: TrendingUp, 
                  title: "Tax-Advantaged Growth", 
                  description: "Maximize your wealth with tax-deferred or tax-free growth strategies",
                  color: "text-green-500"
                },
                { 
                  icon: Shield, 
                  title: "Asset Protection Strategies", 
                  description: "Protect your wealth from creditors, lawsuits, and market volatility",
                  color: "text-purple-500"
                },
                { 
                  icon: Banknote, 
                  title: "Flexible Withdrawal Options", 
                  description: "Access your funds when you need them with various withdrawal strategies",
                  color: "text-orange-500"
                },
                { 
                  icon: Building2, 
                  title: "Estate Planning Benefits", 
                  description: "Efficiently transfer wealth to your heirs while minimizing taxes",
                  color: "text-red-500"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="mb-3 sm:mb-4">
                        <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${feature.color} mx-auto`} />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Wealth Solution Types */}
          <motion.div 
            className="mb-12 sm:mb-16 lg:mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8 sm:mb-12 lg:mb-16" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">Choose Your Wealth Strategy</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                From conservative annuities to aggressive growth strategies, find the perfect wealth solution
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Shield,
                  title: "Fixed Annuities",
                  description: "Guaranteed returns with principal protection",
                  features: ["Guaranteed interest rates", "Principal protection", "Predictable income", "Tax-deferred growth"],
                  highlight: false,
                  returnRange: "3-5% Annual",
                  onLearnMore: () => setFixedAnnuitiesModalOpen(true)
                },
                {
                  icon: TrendingUp,
                  title: "Variable Annuities", 
                  description: "Growth potential with investment flexibility",
                  features: ["Market-linked returns", "Investment choices", "Death benefits", "Income riders available"],
                  highlight: true,
                  returnRange: "5-10% Potential",
                  onLearnMore: () => setVariableAnnuitiesModalOpen(true)
                },
                {
                  icon: Target,
                  title: "Indexed Annuities",
                  description: "Market upside with downside protection",
                  features: ["Market participation", "Principal protection", "Competitive returns", "Flexible terms"],
                  highlight: false,
                  returnRange: "4-8% Potential",
                  onLearnMore: () => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              ].map((strategy, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className={`h-full relative overflow-hidden ${strategy.highlight ? 'border-primary shadow-xl lg:scale-105' : 'hover:shadow-lg'} transition-all duration-300`}>
                    {strategy.highlight && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardContent className={`p-4 sm:p-6 lg:p-8 ${strategy.highlight ? 'pt-8 sm:pt-10 lg:pt-12' : ''}`}>
                      <strategy.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${strategy.highlight ? 'text-primary' : 'text-muted-foreground'} mb-3 sm:mb-4`} />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{strategy.title}</h3>
                      <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{strategy.description}</p>
                      <div className="mb-4 sm:mb-6">
                        <span className="text-xs sm:text-sm text-muted-foreground">Expected Returns:</span>
                        <span className="block text-sm sm:text-base font-semibold text-primary">{strategy.returnRange}</span>
                      </div>
                      
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        {strategy.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-2 sm:mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant={strategy.highlight ? "default" : "outline"} 
                        className="w-full text-sm sm:text-base"
                        onClick={strategy.onLearnMore}
                      >
                        Learn More
                      </Button>
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
            <div className="relative bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 lg:p-12 text-center backdrop-blur-sm">
              <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-foreground" variants={itemVariants}>
                Ready to Build Your Wealth?
              </motion.h2>
              <motion.p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8" variants={itemVariants}>
                Take control of your financial future with personalized wealth strategies. Our financial advisors will help you create a plan that secures your retirement and protects your legacy.
              </motion.p>
              <motion.div className="flex flex-col gap-3 sm:gap-4 justify-center" variants={itemVariants}>
                <Button 
                  size="lg"
                  onClick={() => navigate('/booking')}
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                >
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default WealthSolutions;
