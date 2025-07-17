
import React, { useState } from 'react';
import { Calculator, Home, Shield, TrendingDown, DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface MortgageProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MortgageProtectionModal: React.FC<MortgageProtectionModalProps> = ({ isOpen, onClose }) => {
  const [calculatorValues, setCalculatorValues] = useState({
    mortgageBalance: 300000,
    age: 35,
    term: 30,
    gender: 'male',
    smoker: 'no'
  });

  const calculateMortgageProtection = () => {
    const { mortgageBalance, age, term, gender, smoker } = calculatorValues;
    
    // Calculate decreasing term (mortgage protection)
    let decreasingTermRate = 0.5; // Base rate per $1000
    if (age > 40) decreasingTermRate += 0.1;
    if (age > 50) decreasingTermRate += 0.2;
    if (gender === 'male') decreasingTermRate += 0.1;
    if (smoker === 'yes') decreasingTermRate *= 2;
    
    const decreasingTermPremium = Math.round((mortgageBalance / 1000) * decreasingTermRate);
    
    // Calculate level term equivalent
    let levelTermRate = 0.8;
    if (age > 40) levelTermRate += 0.2;
    if (age > 50) levelTermRate += 0.4;
    if (gender === 'male') levelTermRate += 0.2;
    if (smoker === 'yes') levelTermRate *= 2;
    
    const levelTermPremium = Math.round((mortgageBalance / 1000) * levelTermRate);
    
    return {
      decreasingTerm: {
        monthly: decreasingTermPremium,
        annual: decreasingTermPremium * 12,
        totalCost: decreasingTermPremium * 12 * term,
        coverage: mortgageBalance
      },
      levelTerm: {
        monthly: levelTermPremium,
        annual: levelTermPremium * 12,
        totalCost: levelTermPremium * 12 * term,
        coverage: mortgageBalance
      }
    };
  };

  const results = calculateMortgageProtection();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Home className="h-6 w-6 text-blue-600" />
            Mortgage Protection Insurance Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  What is Mortgage Protection Insurance?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Mortgage protection insurance is life insurance specifically designed to pay off your mortgage 
                  if you pass away, ensuring your family can keep their home without the burden of mortgage payments.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">How It Works</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Coverage amount matches mortgage balance</li>
                      <li>• Premiums stay level throughout term</li>
                      <li>• Death benefit pays off remaining mortgage</li>
                      <li>• Family keeps the home mortgage-free</li>
                      <li>• No medical exam for most coverage amounts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Guaranteed home ownership for family</li>
                      <li>• Lower cost than traditional life insurance</li>
                      <li>• Simplified underwriting process</li>
                      <li>• Peace of mind for homeowners</li>
                      <li>• Optional disability coverage available</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Considerations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                    <div>
                      <h5 className="font-medium mb-1">Decreasing vs Level Coverage:</h5>
                      <p>Traditional mortgage protection decreases with your loan balance, while level term maintains full coverage amount.</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">Beneficiary Control:</h5>
                      <p>Some policies pay the lender directly, while others give your beneficiaries full control of the death benefit.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Protection vs Traditional Term Life</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-3 font-semibold">Feature</th>
                        <th className="text-center p-3 font-semibold text-blue-600">Mortgage Protection</th>
                        <th className="text-center p-3 font-semibold text-green-600">Level Term Life</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-100">
                        <td className="p-3 font-medium">Coverage Amount</td>
                        <td className="p-3 text-center">Decreases with mortgage balance</td>
                        <td className="p-3 text-center">Remains level</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="p-3 font-medium">Premium Cost</td>
                        <td className="p-3 text-center">Lower initial cost</td>
                        <td className="p-3 text-center">Higher but level cost</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="p-3 font-medium">Beneficiary Control</td>
                        <td className="p-3 text-center">May pay lender directly</td>
                        <td className="p-3 text-center">Full beneficiary control</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="p-3 font-medium">Flexibility</td>
                        <td className="p-3 text-center">Tied to mortgage</td>
                        <td className="p-3 text-center">Can be used for any purpose</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="p-3 font-medium">Underwriting</td>
                        <td className="p-3 text-center">Simplified/guaranteed issue</td>
                        <td className="p-3 text-center">Full medical underwriting</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="p-3 font-medium">Portability</td>
                        <td className="p-3 text-center">Limited portability</td>
                        <td className="p-3 text-center">Fully portable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Choose Mortgage Protection If:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Your primary concern is mortgage payoff</li>
                      <li>• You want the lowest initial cost</li>
                      <li>• You have health issues that make traditional life insurance expensive</li>
                      <li>• You prefer simplified underwriting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Choose Level Term Life If:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• You want maximum flexibility for beneficiaries</li>
                      <li>• You need coverage for other debts and expenses</li>
                      <li>• You're in good health and can qualify for better rates</li>
                      <li>• You want level coverage throughout the term</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Mortgage Protection Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Mortgage Balance: ${calculatorValues.mortgageBalance.toLocaleString()}</Label>
                      <Slider
                        value={[calculatorValues.mortgageBalance]}
                        onValueChange={(value) => setCalculatorValues({...calculatorValues, mortgageBalance: value[0]})}
                        max={1000000}
                        min={50000}
                        step={10000}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={calculatorValues.age}
                        onChange={(e) => setCalculatorValues({...calculatorValues, age: Number(e.target.value)})}
                        min="18"
                        max="75"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Mortgage Term: {calculatorValues.term} years</Label>
                      <Slider
                        value={[calculatorValues.term]}
                        onValueChange={(value) => setCalculatorValues({...calculatorValues, term: value[0]})}
                        max={30}
                        min={10}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={calculatorValues.gender} onValueChange={(value) => setCalculatorValues({...calculatorValues, gender: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="smoker">Smoker Status</Label>
                      <Select value={calculatorValues.smoker} onValueChange={(value) => setCalculatorValues({...calculatorValues, smoker: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">Non-smoker</SelectItem>
                          <SelectItem value="yes">Smoker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
                      <h4 className="font-semibold text-lg mb-4">Estimated Monthly Premiums</h4>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-blue-600">Decreasing Term (Mortgage Protection)</h5>
                            <TrendingDown className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-2xl font-bold text-blue-600">${results.decreasingTerm.monthly}/mo</div>
                          <div className="text-sm text-gray-600">Coverage decreases with mortgage balance</div>
                        </div>

                        <div className="bg-white p-4 rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-green-600">Level Term Life Insurance</h5>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="text-2xl font-bold text-green-600">${results.levelTerm.monthly}/mo</div>
                          <div className="text-sm text-gray-600">Full coverage amount maintained</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-yellow-50 rounded border">
                        <h6 className="font-medium text-yellow-800 mb-1">Cost Comparison</h6>
                        <div className="text-sm text-yellow-700">
                          <div>Mortgage Protection: ${results.decreasingTerm.totalCost.toLocaleString()} total</div>
                          <div>Level Term: ${results.levelTerm.totalCost.toLocaleString()} total</div>
                          <div className="font-medium mt-1">
                            Savings with Mortgage Protection: ${(results.levelTerm.totalCost - results.decreasingTerm.totalCost).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <p className="text-xs text-gray-600">
                    *Estimates are for illustration purposes only. Actual premiums will vary based on health, carrier, and specific policy features.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-500" />
                    Home Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Guaranteed Home Ownership</h5>
                      <p className="text-sm text-gray-600">Family keeps the home without mortgage payments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Immediate Protection</h5>
                      <p className="text-sm text-gray-600">Coverage begins as soon as policy is in force</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Emotional Security</h5>
                      <p className="text-sm text-gray-600">Family doesn't lose their home during grief</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Financial Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Lower Cost</h5>
                      <p className="text-sm text-gray-600">More affordable than equivalent term life insurance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Level Premiums</h5>
                      <p className="text-sm text-gray-600">Monthly payments stay the same throughout term</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Tax-Free Benefit</h5>
                      <p className="text-sm text-gray-600">Death benefit is paid income tax-free</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    Easy Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Quick Application</h5>
                      <p className="text-sm text-gray-600">Simple application process with minimal paperwork</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">No Medical Exam</h5>
                      <p className="text-sm text-gray-600">Many policies require only basic health questions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Fast Approval</h5>
                      <p className="text-sm text-gray-600">Get approved and covered quickly</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    Family Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Children's Stability</h5>
                      <p className="text-sm text-gray-600">Kids can stay in the same home and school district</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Spouse Protection</h5>
                      <p className="text-sm text-gray-600">Surviving spouse keeps largest asset without debt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Legacy Preservation</h5>
                      <p className="text-sm text-gray-600">Home can be passed to next generation debt-free</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4 border-t">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Contact a Specialist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MortgageProtectionModal;
