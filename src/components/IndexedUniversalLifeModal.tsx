
import React, { useState } from 'react';
import { X, Calculator, TrendingUp, Shield, DollarSign, BarChart3, Target, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface IndexedUniversalLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IndexedUniversalLifeModal: React.FC<IndexedUniversalLifeModalProps> = ({ isOpen, onClose }) => {
  const [calculatorValues, setCalculatorValues] = useState({
    age: 35,
    premium: 5000,
    indexReturn: 7,
    years: 20
  });

  const calculateProjection = () => {
    const { age, premium, indexReturn, years } = calculatorValues;
    const annualReturn = indexReturn / 100;
    let cashValue = 0;
    
    for (let i = 0; i < years; i++) {
      cashValue = (cashValue + premium) * (1 + annualReturn * 0.8); // 80% participation rate
    }
    
    return {
      totalPremiums: premium * years,
      projectedCashValue: Math.round(cashValue),
      potentialGrowth: Math.round(cashValue - (premium * years))
    };
  };

  const projection = calculateProjection();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="h-6 w-6 text-[#15AFF7]" />
            Index Universal Life Insurance Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#15AFF7]" />
                  What is Index Universal Life?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Index Universal Life (IUL) combines permanent life insurance protection with cash value growth 
                  tied to market index performance. It offers upside potential with built-in downside protection.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Key Advantages</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Market-linked growth potential</li>
                      <li>• Downside protection (0% floor)</li>
                      <li>• Tax-deferred cash value growth</li>
                      <li>• Flexible premium payments</li>
                      <li>• Tax-free loans against cash value</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Who Should Consider IUL</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Those seeking growth potential</li>
                      <li>• Long-term wealth builders</li>
                      <li>• Tax-conscious investors</li>
                      <li>• Business owners with variable income</li>
                      <li>• Estate planning needs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="how-it-works" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How Index Universal Life Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-[#15AFF7] text-white rounded-full flex items-center justify-center mx-auto mb-3">1</div>
                    <h4 className="font-semibold mb-2">Premium Payment</h4>
                    <p className="text-sm text-gray-600">You pay flexible premiums that cover insurance costs and fund cash value growth</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-[#15AFF7] text-white rounded-full flex items-center justify-center mx-auto mb-3">2</div>
                    <h4 className="font-semibold mb-2">Index Allocation</h4>
                    <p className="text-sm text-gray-600">Cash value is allocated to market indexes like S&P 500 with caps and floors</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-[#15AFF7] text-white rounded-full flex items-center justify-center mx-auto mb-3">3</div>
                    <h4 className="font-semibold mb-2">Protected Growth</h4>
                    <p className="text-sm text-gray-600">Earn market gains up to a cap, but never lose money when markets decline</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Index Crediting Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-[#15AFF7] mb-2">Annual Point-to-Point</h5>
                      <p className="text-sm text-gray-600">Credits interest based on index performance from beginning to end of policy year</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#15AFF7] mb-2">Monthly Cap</h5>
                      <p className="text-sm text-gray-600">Credits monthly gains up to a cap, summed over the year</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#15AFF7]" />
                  IUL Growth Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="age">Current Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={calculatorValues.age}
                        onChange={(e) => setCalculatorValues({...calculatorValues, age: Number(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="premium">Annual Premium ($)</Label>
                      <Input
                        id="premium"
                        type="number"
                        value={calculatorValues.premium}
                        onChange={(e) => setCalculatorValues({...calculatorValues, premium: Number(e.target.value)})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Expected Index Return (%): {calculatorValues.indexReturn}%</Label>
                      <Slider
                        value={[calculatorValues.indexReturn]}
                        onValueChange={(value) => setCalculatorValues({...calculatorValues, indexReturn: value[0]})}
                        max={12}
                        min={3}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Time Horizon (Years): {calculatorValues.years}</Label>
                      <Slider
                        value={[calculatorValues.years]}
                        onValueChange={(value) => setCalculatorValues({...calculatorValues, years: value[0]})}
                        max={40}
                        min={5}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/10 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4">Projected Results</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Premiums Paid:</span>
                          <span className="font-semibold">${projection.totalPremiums.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Projected Cash Value:</span>
                          <span className="font-semibold text-[#15AFF7]">${projection.projectedCashValue.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Potential Growth:</span>
                          <span className="font-semibold text-green-600">${projection.potentialGrowth.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <p className="text-xs text-yellow-800">
                          *Projections are hypothetical and not guaranteed. Actual results may vary based on market performance, policy charges, and other factors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Growth Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Market Upside Potential</h5>
                      <p className="text-sm text-gray-600">Participate in market gains when indexes perform well</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Downside Protection</h5>
                      <p className="text-sm text-gray-600">0% floor ensures you never lose money in down markets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Tax-Deferred Growth</h5>
                      <p className="text-sm text-gray-600">Cash value grows without current income tax</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Protection Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Permanent Life Insurance</h5>
                      <p className="text-sm text-gray-600">Coverage that lasts your entire lifetime</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Tax-Free Death Benefit</h5>
                      <p className="text-sm text-gray-600">Beneficiaries receive proceeds income tax-free</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Living Benefits</h5>
                      <p className="text-sm text-gray-600">Access cash value through loans and withdrawals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-500" />
                    Financial Flexibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Flexible Premiums</h5>
                      <p className="text-sm text-gray-600">Adjust payments based on your financial situation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Tax-Free Loans</h5>
                      <p className="text-sm text-gray-600">Borrow against cash value without tax consequences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Multiple Index Options</h5>
                      <p className="text-sm text-gray-600">Diversify across different market indexes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    Estate Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Wealth Transfer</h5>
                      <p className="text-sm text-gray-600">Efficiently pass wealth to beneficiaries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Estate Tax Benefits</h5>
                      <p className="text-sm text-gray-600">May help reduce estate tax liability</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Generation Skipping</h5>
                      <p className="text-sm text-gray-600">Structure policies for multiple generations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4 border-t">
          <Button 
            onClick={() => {
              onClose();
              // Navigate to home page contact section
              if (window.location.pathname !== '/') {
                window.location.href = '/#contact-info';
                return;
              }
              
              const contactSection = document.getElementById('contact-info');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="bg-[#15AFF7] hover:bg-[#0D94D1] text-white"
          >
            Contact a Specialist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IndexedUniversalLifeModal;
