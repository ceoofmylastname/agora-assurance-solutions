
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, TrendingUp, DollarSign, PiggyBank, Calculator, Users, Briefcase, Target, Shield, Gauge, CheckCircle } from 'lucide-react';

interface UniversalLifeEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UniversalLifeEducationModal: React.FC<UniversalLifeEducationModalProps> = ({ isOpen, onClose }) => {
  const [premiumAmount, setPremiumAmount] = useState(500);
  const [age, setAge] = useState(35);
  const [term, setTerm] = useState(20);

  const calculateCashValue = () => {
    const interestRate = 0.04; // 4% assumed rate
    const years = Math.min(term, 30);
    const annualPremium = premiumAmount * 12;
    const costOfInsurance = annualPremium * 0.3; // Estimated COI
    const netPremium = annualPremium - costOfInsurance;
    
    let cashValue = 0;
    for (let i = 1; i <= years; i++) {
      cashValue = (cashValue + netPremium) * (1 + interestRate);
    }
    return Math.round(cashValue);
  };

  const estimatedCashValue = calculateCashValue();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Universal Life Insurance Guide
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="p-6 pt-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#15AFF7]" />
                        What is Universal Life Insurance?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        Universal Life (UL) insurance is a type of permanent life insurance that offers flexibility in premium payments, death benefits, and cash value accumulation. Unlike whole life insurance, UL allows you to adjust your coverage and premiums as your financial situation changes.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-[#15AFF7] mb-2">Key Features</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Flexible premium payments
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Adjustable death benefit
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Cash value growth
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Tax advantages
                            </li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-600 mb-2">Best For</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Variable income earners</li>
                            <li>• Business owners</li>
                            <li>• Estate planning needs</li>
                            <li>• Long-term savers</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="how-it-works" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>How Universal Life Insurance Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#15AFF7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-8 h-8 text-[#15AFF7]" />
                          </div>
                          <h3 className="font-semibold mb-2">1. Premium Payment</h3>
                          <p className="text-sm text-gray-600">You pay flexible premiums that can be adjusted based on your financial situation.</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="font-semibold mb-2">2. Cost Allocation</h3>
                          <p className="text-sm text-gray-600">Premiums are split between insurance costs, fees, and cash value accumulation.</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-purple-600" />
                          </div>
                          <h3 className="font-semibold mb-2">3. Cash Value Growth</h3>
                          <p className="text-sm text-gray-600">Your cash value earns interest and grows tax-deferred over time.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Premium Flexibility Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-[#15AFF7] pl-4">
                          <h4 className="font-semibold">Minimum Premium</h4>
                          <p className="text-sm text-gray-600">Pay the minimum required to keep the policy in force.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold">Target Premium</h4>
                          <p className="text-sm text-gray-600">Recommended amount to build substantial cash value.</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold">Maximum Premium</h4>
                          <p className="text-sm text-gray-600">Highest amount allowed while maintaining tax benefits.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gauge className="w-5 h-5 text-[#15AFF7]" />
                          Flexibility Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Adjustable Premiums</h4>
                            <p className="text-sm text-gray-600">Increase or decrease payments based on your financial situation.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Death Benefit Options</h4>
                            <p className="text-sm text-gray-600">Choose level or increasing death benefit to match your needs.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PiggyBank className="w-5 h-5 text-green-600" />
                          Financial Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Tax-Deferred Growth</h4>
                            <p className="text-sm text-gray-600">Cash value grows without current taxation.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Access to Cash Value</h4>
                            <p className="text-sm text-gray-600">Borrow against or withdraw from your policy value.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Who Should Consider Universal Life?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { icon: Users, title: "Variable Income", desc: "Professionals with fluctuating earnings" },
                          { icon: Briefcase, title: "Business Owners", desc: "Need coverage that adapts to cash flow" },
                          { icon: Target, title: "Goal-Oriented", desc: "Want to maximize savings potential" }
                        ].map((item, index) => (
                          <div key={index} className="text-center p-4 border rounded-lg">
                            <item.icon className="w-8 h-8 text-[#15AFF7] mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calculator" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#15AFF7]" />
                      Universal Life Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly Premium</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={premiumAmount}
                            onChange={(e) => setPremiumAmount(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 border rounded-md"
                            min="100"
                            max="5000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Age</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className="w-full px-3 py-2 border rounded-md"
                          min="18"
                          max="75"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Years to Project</label>
                        <input
                          type="number"
                          value={term}
                          onChange={(e) => setTerm(Number(e.target.value))}
                          className="w-full px-3 py-2 border rounded-md"
                          min="5"
                          max="40"
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#15AFF7]/10 to-blue-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Projected Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#15AFF7]">
                            ${(premiumAmount * 12 * term).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Total Premiums Paid</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            ${estimatedCashValue.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Estimated Cash Value</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            ${(estimatedCashValue + 250000).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Total Death Benefit</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                      <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. Actual results may vary based on insurance company, health, and market conditions. Current assumed interest rate: 4%. Consult with a licensed agent for personalized quotes.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        
        <div className="p-6 pt-0 border-t">
          <div className="flex justify-center">
            <Button
              onClick={() => {
                onClose();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#15AFF7] hover:bg-[#0D94D1] text-white px-8 py-2"
            >
              Get Personalized Quote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversalLifeEducationModal;
