
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Clock, DollarSign, CheckCircle, Info, Phone } from 'lucide-react';

interface FixedAnnuitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FixedAnnuitiesModal: React.FC<FixedAnnuitiesModalProps> = ({ isOpen, onClose }) => {
  const benefits = [
    {
      icon: Shield,
      title: "Principal Protection",
      description: "Your initial investment is guaranteed and protected from market losses"
    },
    {
      icon: TrendingUp,
      title: "Guaranteed Returns",
      description: "Fixed interest rates provide predictable growth for your retirement savings"
    },
    {
      icon: Clock,
      title: "Tax-Deferred Growth",
      description: "Your money grows without immediate tax implications until withdrawal"
    },
    {
      icon: DollarSign,
      title: "Steady Income Stream",
      description: "Convert your savings into reliable monthly payments for life"
    }
  ];

  const features = [
    "No market risk - your money is protected",
    "Guaranteed minimum interest rate",
    "Flexible payout options at retirement",
    "Death benefit protection for beneficiaries",
    "No annual contribution limits",
    "Professional money management"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Fixed Annuities: Your Path to Guaranteed Retirement Income
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Info className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">What is a Fixed Annuity?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A fixed annuity is a financial product that provides guaranteed income for retirement. 
                    You make either a single lump-sum payment or a series of payments to an insurance company, 
                    and in return, they guarantee a specific interest rate and future income payments. 
                    Think of it as a contract that turns your savings into a predictable paycheck for life.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Returns */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Badge variant="secondary" className="mb-2">Current Market Rates</Badge>
                <div className="text-3xl font-bold text-primary">3-5% Annual</div>
                <p className="text-sm text-muted-foreground">Guaranteed fixed interest rate</p>
              </div>
              <div className="bg-muted/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Example:</strong> A $100,000 fixed annuity at 4% annual rate could provide 
                  approximately $600-800 monthly income for life starting at age 65.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <benefit.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Features & Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Who Should Consider */}
          <Card className="bg-blue-50/50 border-blue-200/50 dark:bg-blue-900/10 dark:border-blue-800/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Who Should Consider Fixed Annuities?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Conservative investors</strong> who prioritize capital preservation over high returns
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Pre-retirees</strong> seeking predictable income to supplement Social Security
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Risk-averse individuals</strong> who want guaranteed returns without market volatility
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Those with maxed-out retirement accounts</strong> looking for additional tax-deferred growth
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Considerations */}
          <Card className="bg-amber-50/50 border-amber-200/50 dark:bg-amber-900/10 dark:border-amber-800/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Considerations</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  • <strong>Liquidity:</strong> Early withdrawals may incur surrender charges and tax penalties
                </p>
                <p className="text-sm text-muted-foreground">
                  • <strong>Inflation:</strong> Fixed payments may lose purchasing power over time
                </p>
                <p className="text-sm text-muted-foreground">
                  • <strong>Fees:</strong> Some annuities have administrative fees that can impact returns
                </p>
                <p className="text-sm text-muted-foreground">
                  • <strong>Insurance company strength:</strong> Choose financially stable insurers with high ratings
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Learn More?</h3>
              <p className="text-muted-foreground mb-4">
                Speak with our financial experts to determine if a fixed annuity fits your retirement strategy
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => window.open('tel:+19162889400', '_self')}
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call (916) 288-9400
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FixedAnnuitiesModal;
