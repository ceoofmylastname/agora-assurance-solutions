
import React, { useState } from 'react';
import { Calculator, Heart, Shield, Users, DollarSign, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FinalExpenseEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinalExpenseEducationModal: React.FC<FinalExpenseEducationModalProps> = ({ isOpen, onClose }) => {
  const [calculatorValues, setCalculatorValues] = useState({
    age: 65,
    gender: 'male',
    state: 'California',
    coverage: 10000
  });

  const calculatePremium = () => {
    const { age, gender, coverage } = calculatorValues;
    let basePremium = coverage * 0.02;
    
    // Age factor
    const ageFactor = Math.max(1, (age - 50) * 0.05);
    basePremium *= ageFactor;
    
    // Gender factor
    if (gender === 'male') {
      basePremium *= 1.1;
    }
    
    return Math.round(basePremium / 12);
  };

  const monthlyPremium = calculatePremium();

  const expenseBreakdown = {
    funeral: 8500,
    burial: 3500,
    headstone: 2000,
    flowers: 500,
    reception: 1500,
    other: 1000
  };

  const totalExpenses = Object.values(expenseBreakdown).reduce((sum, cost) => sum + cost, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-red-500" />
            Final Expense Insurance Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  What is Final Expense Insurance?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Final expense insurance is a type of whole life insurance designed to cover end-of-life costs 
                  such as funeral expenses, burial costs, and outstanding debts. It provides peace of mind knowing 
                  your loved ones won't face financial burden during an already difficult time.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">What It Covers</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Funeral and memorial services</li>
                      <li>• Burial or cremation costs</li>
                      <li>• Outstanding medical bills</li>
                      <li>• Credit card debt</li>
                      <li>• Other final expenses</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Key Features</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Coverage amounts: $5,000 - $50,000</li>
                      <li>• No medical exam required</li>
                      <li>• Fixed premiums that never increase</li>
                      <li>• Cash value accumulation</li>
                      <li>• Guaranteed acceptance (ages 50-85)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">Average Final Expenses by Category</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {Object.entries(expenseBreakdown).map(([category, cost]) => (
                      <div key={category} className="flex justify-between">
                        <span className="capitalize text-yellow-700">{category}:</span>
                        <span className="font-medium text-yellow-800">${cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-yellow-200">
                    <div className="flex justify-between font-semibold text-yellow-800">
                      <span>Total Average:</span>
                      <span>${totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Application Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">1</div>
                    <h4 className="font-semibold mb-2">Quick Application</h4>
                    <p className="text-sm text-gray-600">Complete a simple health questionnaire - no medical exam required</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">2</div>
                    <h4 className="font-semibold mb-2">Instant Decision</h4>
                    <p className="text-sm text-gray-600">Get approved immediately with guaranteed acceptance for qualifying ages</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">3</div>
                    <h4 className="font-semibold mb-2">Coverage Begins</h4>
                    <p className="text-sm text-gray-600">Protection starts immediately with full benefits after waiting period</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">4</div>
                    <h4 className="font-semibold mb-2">Peace of Mind</h4>
                    <p className="text-sm text-gray-600">Your family is protected from unexpected final expenses</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Understanding the Waiting Period</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-red-500 mb-2">Graded Death Benefit (First 2-3 Years)</h5>
                      <p className="text-sm text-gray-600">If death occurs due to natural causes during the waiting period, beneficiaries receive premiums paid plus interest</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-500 mb-2">Full Death Benefit (After Waiting Period)</h5>
                      <p className="text-sm text-gray-600">After the waiting period, beneficiaries receive the full death benefit regardless of cause</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded border">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Accidental death is typically covered from day one, even during the waiting period.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-red-500" />
                  Final Expense Premium Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={calculatorValues.age}
                        onChange={(e) => setCalculatorValues({...calculatorValues, age: Number(e.target.value)})}
                        min="50"
                        max="85"
                        className="mt-1"
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
                      <Label htmlFor="state">State</Label>
                      <Select value={calculatorValues.state} onValueChange={(value) => setCalculatorValues({...calculatorValues, state: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="California">California</SelectItem>
                          <SelectItem value="Texas">Texas</SelectItem>
                          <SelectItem value="Florida">Florida</SelectItem>
                          <SelectItem value="New York">New York</SelectItem>
                          <SelectItem value="Illinois">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="coverage">Coverage Amount</Label>
                      <Select value={calculatorValues.coverage.toString()} onValueChange={(value) => setCalculatorValues({...calculatorValues, coverage: Number(value)})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000">$5,000</SelectItem>
                          <SelectItem value="10000">$10,000</SelectItem>
                          <SelectItem value="15000">$15,000</SelectItem>
                          <SelectItem value="20000">$20,000</SelectItem>
                          <SelectItem value="25000">$25,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg border">
                      <h4 className="font-semibold text-lg mb-4">Estimated Premium</h4>
                      
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-red-500">${monthlyPremium}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Annual Premium:</span>
                          <span className="font-medium">${(monthlyPremium * 12).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage Amount:</span>
                          <span className="font-medium">${calculatorValues.coverage.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage Multiple:</span>
                          <span className="font-medium">{Math.round(calculatorValues.coverage / (monthlyPremium * 12))}x</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded border">
                      <h5 className="font-medium text-blue-800 mb-2">Why Final Expense Insurance?</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Protect family from debt burden</li>
                        <li>• Ensure dignified funeral arrangements</li>
                        <li>• Fixed premiums never increase</li>
                        <li>• No medical exam required</li>
                        <li>• Cash value builds over time</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-xs text-yellow-800">
                    *Estimates are for illustration purposes only. Actual premiums may vary based on health, location, and carrier underwriting.
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
                    <Users className="h-5 w-5 text-purple-500" />
                    Family Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">No Financial Burden</h5>
                      <p className="text-sm text-gray-600">Family won't have to pay out-of-pocket for final expenses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Quick Claim Process</h5>
                      <p className="text-sm text-gray-600">Fast payout to cover immediate expenses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Flexible Use of Funds</h5>
                      <p className="text-sm text-gray-600">Beneficiaries can use proceeds for any purpose</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Financial Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Affordable Premiums</h5>
                      <p className="text-sm text-gray-600">Low monthly payments that fit most budgets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Cash Value Growth</h5>
                      <p className="text-sm text-gray-600">Policy builds cash value you can borrow against</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Guaranteed Premiums</h5>
                      <p className="text-sm text-gray-600">Premiums never increase regardless of health changes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Peace of Mind
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Guaranteed Acceptance</h5>
                      <p className="text-sm text-gray-600">No medical exam or health questions for most applicants</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Immediate Coverage</h5>
                      <p className="text-sm text-gray-600">Protection starts right away with graded benefits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">No Restrictions</h5>
                      <p className="text-sm text-gray-600">Coverage regardless of pre-existing conditions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-500" />
                    Simple Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Easy Application</h5>
                      <p className="text-sm text-gray-600">Simple online or phone application process</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Quick Approval</h5>
                      <p className="text-sm text-gray-600">Most applications approved within minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Flexible Payment Options</h5>
                      <p className="text-sm text-gray-600">Monthly, quarterly, or annual payment options</p>
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
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Contact a Specialist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinalExpenseEducationModal;
