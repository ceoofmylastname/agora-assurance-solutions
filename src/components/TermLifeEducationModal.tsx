
import React from 'react';
import { X, Shield, DollarSign, Clock, TrendingUp, Users, Heart, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TermLifeEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermLifeEducationModal = ({ isOpen, onClose }: TermLifeEducationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Understanding Term Life Insurance
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* What is Term Life Insurance */}
          <Card className="border-2 border-[#15AFF7]/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-[#15AFF7] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3">What is Term Life Insurance?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Term life insurance provides temporary life insurance coverage for a specific period (term). 
                    If you pass away during the term, your beneficiaries receive the death benefit. 
                    It's designed to provide financial protection during your most vulnerable years.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-2 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3">How Does It Work?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600"><strong>Choose Your Term:</strong> Select 10, 15, 20, or 30 years</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600"><strong>Pay Premiums:</strong> Make monthly or annual payments</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600"><strong>Coverage Active:</strong> Your family is protected during the term</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600"><strong>Benefit Paid:</strong> Death benefit goes to beneficiaries if needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-blue-500/20">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-blue-500 mb-3" />
                <h4 className="font-bold mb-2">Affordable Premiums</h4>
                <p className="text-sm text-gray-600">
                  Significantly lower costs compared to permanent life insurance, 
                  making it accessible for young families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500/20">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-purple-500 mb-3" />
                <h4 className="font-bold mb-2">Flexible Terms</h4>
                <p className="text-sm text-gray-600">
                  Choose coverage periods that align with your financial obligations 
                  like mortgages or children's education.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/20">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-bold mb-2">Family Protection</h4>
                <p className="text-sm text-gray-600">
                  Ensures your family can maintain their lifestyle and 
                  meet financial obligations if something happens to you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-500/20">
              <CardContent className="p-6">
                <Heart className="w-8 h-8 text-pink-500 mb-3" />
                <h4 className="font-bold mb-2">Peace of Mind</h4>
                <p className="text-sm text-gray-600">
                  Simple, straightforward coverage that's easy to understand 
                  and provides security during life's uncertainties.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Who Should Consider Term Life */}
          <Card className="border-2 border-[#15AFF7]/20 bg-gradient-to-r from-[#15AFF7]/5 to-blue-600/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Who Should Consider Term Life Insurance?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">Young families with children</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">Homeowners with mortgages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">Single income households</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">People with significant debt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">Business owners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#15AFF7]" />
                    <span className="text-sm">Budget-conscious individuals</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-gray-600">
              Ready to protect your family with affordable term life insurance?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => {
                  window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank');
                }}
                className="px-6 py-2 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all"
              >
                Get Your Quote Now
              </Button>
              <Button 
                variant="outline"
                onClick={onClose}
                className="px-6 py-2 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermLifeEducationModal;
