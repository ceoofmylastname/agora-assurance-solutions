
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, DollarSign, AlertTriangle, Target, Phone, X } from 'lucide-react';

interface VariableAnnuitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VariableAnnuitiesModal: React.FC<VariableAnnuitiesModalProps> = ({ isOpen, onClose }) => {
  const scrollToContact = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Variable Annuities Explained
          </DialogTitle>
          <p className="text-muted-foreground text-center text-sm sm:text-base">
            Growth potential with investment flexibility for your retirement
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* What are Variable Annuities */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-bold">What are Variable Annuities?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Variable annuities are investment products that allow you to invest in a variety of sub-accounts, 
                similar to mutual funds. Your returns depend on the performance of your chosen investments, 
                offering potential for higher growth but with market-related risks.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Key Features & Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Investment Control",
                  description: "Choose from multiple investment options to match your risk tolerance and goals",
                  icon: TrendingUp,
                  color: "text-green-500"
                },
                {
                  title: "Tax-Deferred Growth", 
                  description: "Your investments grow tax-deferred until you begin withdrawals",
                  icon: DollarSign,
                  color: "text-blue-500"
                },
                {
                  title: "Death Benefit Protection",
                  description: "Guarantees your beneficiaries receive at least your initial investment",
                  icon: Shield,
                  color: "text-purple-500"
                },
                {
                  title: "Income Riders Available",
                  description: "Optional guaranteed income riders for retirement income planning",
                  icon: Target,
                  color: "text-orange-500"
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <feature.icon className={`w-5 h-5 ${feature.color} mr-3 mt-1 flex-shrink-0`} />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How They Work */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">How Variable Annuities Work</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Accumulation Phase</h4>
                    <p className="text-sm text-muted-foreground">You make premium payments and choose how to allocate your money among available investment options.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Investment Growth</h4>
                    <p className="text-sm text-muted-foreground">Your account value fluctuates based on the performance of your selected investment options.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Distribution Phase</h4>
                    <p className="text-sm text-muted-foreground">Convert to income payments or make withdrawals based on your account's current value.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Options Example */}
          <div>
            <h3 className="text-xl font-bold mb-4">Common Investment Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Conservative Portfolio", allocation: "Bonds & Stable Value", risk: "Low", color: "bg-green-500/10 text-green-700" },
                { name: "Balanced Portfolio", allocation: "60% Stocks, 40% Bonds", risk: "Moderate", color: "bg-blue-500/10 text-blue-700" },
                { name: "Growth Portfolio", allocation: "80%+ Stocks", risk: "High", color: "bg-red-500/10 text-red-700" }
              ].map((option, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <Badge className={`${option.color} mb-2`}>{option.risk} Risk</Badge>
                    <h4 className="font-semibold text-sm mb-2">{option.name}</h4>
                    <p className="text-xs text-muted-foreground">{option.allocation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Considerations */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/20 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">Important Considerations</h3>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                    <li>• <strong>Market Risk:</strong> Your account value will fluctuate with market performance</li>
                    <li>• <strong>Fees:</strong> Management fees, mortality charges, and rider fees may apply</li>
                    <li>• <strong>Surrender Charges:</strong> Early withdrawal penalties may apply during initial years</li>
                    <li>• <strong>Tax Implications:</strong> Withdrawals are taxed as ordinary income</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Scenario */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">Example Scenario</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Initial Investment:</span>
                    <span className="block text-lg font-bold text-primary">$100,000</span>
                  </div>
                  <div>
                    <span className="font-medium">Investment Mix:</span>
                    <span className="block text-sm text-muted-foreground">70% Growth, 30% Conservative</span>
                  </div>
                  <div>
                    <span className="font-medium">Potential 10-Year Value:</span>
                    <span className="block text-lg font-bold text-green-600">$160,000 - $180,000*</span>
                  </div>
                  <div>
                    <span className="font-medium">Annual Income Potential:</span>
                    <span className="block text-lg font-bold text-blue-600">$6,400 - $7,200*</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  *Hypothetical example assuming 6-8% average annual return. Actual results will vary.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Explore Variable Annuities?</h3>
              <p className="mb-4 opacity-90">
                Our financial advisors can help you determine if variable annuities align with your retirement goals and risk tolerance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="secondary" 
                  onClick={scrollToContact}
                  className="flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => window.open('tel:+19162889400', '_self')}
                >
                  Call (916) 288-9400
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VariableAnnuitiesModal;
