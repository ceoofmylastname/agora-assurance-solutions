
import React, { useState } from 'react';
import { ChevronDown, Shield, TrendingUp, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface InsuranceType {
  title: string;
  definition: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}

const InsuranceExplainerWidget = () => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would integrate with your CRM or webhook
    alert('Thank you! We will contact you soon with your personalized quote.');
  };

  const lifeInsuranceTypes: InsuranceType[] = [
    {
      title: "Term Life Insurance",
      definition: "Provides coverage for a specific period (10, 20, or 30 years) at affordable rates.",
      pros: ["Lowest cost option", "Simple and straightforward", "Flexible term lengths"],
      cons: ["Temporary coverage only", "No cash value", "Premiums increase with age"],
      bestFor: ["Young families", "Mortgage protection", "Income replacement needs"]
    },
    {
      title: "Whole Life Insurance",
      definition: "Permanent life insurance with guaranteed death benefit and cash value growth.",
      pros: ["Lifetime coverage", "Guaranteed cash value", "Fixed premiums"],
      cons: ["Higher premiums", "Lower returns vs investments", "Less flexibility"],
      bestFor: ["Estate planning", "Long-term wealth transfer", "Conservative investors"]
    },
    {
      title: "Universal Life Insurance",
      definition: "Flexible permanent life insurance with adjustable premiums and death benefits.",
      pros: ["Premium flexibility", "Adjustable death benefit", "Cash value growth"],
      cons: ["Complex structure", "Market risk", "May require higher premiums later"],
      bestFor: ["Variable income earners", "Business owners", "Those wanting flexibility"]
    },
    {
      title: "Indexed Universal Life",
      definition: "Universal life with cash value tied to stock market index performance.",
      pros: ["Market upside potential", "Downside protection", "Tax advantages"],
      cons: ["Complexity", "Caps on returns", "Higher fees"],
      bestFor: ["Growth-oriented individuals", "Tax-conscious investors", "Retirement planning"]
    }
  ];

  const annuityTypes: InsuranceType[] = [
    {
      title: "Immediate Annuities",
      definition: "Provide guaranteed income payments that start within one year of purchase.",
      pros: ["Immediate income stream", "Guaranteed payments", "Simple structure"],
      cons: ["No liquidity", "Inflation risk", "No growth potential"],
      bestFor: ["Retirees needing income now", "Pension replacement", "Risk-averse individuals"]
    },
    {
      title: "Fixed Deferred Annuities",
      definition: "Grow at a guaranteed interest rate and provide income at a future date.",
      pros: ["Guaranteed growth", "Principal protection", "Tax deferral"],
      cons: ["Lower returns", "Inflation risk", "Surrender charges"],
      bestFor: ["Conservative savers", "Pre-retirees", "CD alternatives"]
    },
    {
      title: "Indexed Annuities",
      definition: "Growth tied to market index performance with principal protection.",
      pros: ["Market upside potential", "Principal protection", "Various crediting methods"],
      cons: ["Complex features", "Caps on returns", "Long surrender periods"],
      bestFor: ["Moderate risk tolerance", "Retirement accumulation", "Market participation with protection"]
    },
    {
      title: "Variable Annuities",
      definition: "Investment options in sub-accounts with potential for higher returns.",
      pros: ["Investment control", "Unlimited upside", "Death benefit options"],
      cons: ["Market risk", "High fees", "Complex structure"],
      bestFor: ["Experienced investors", "Long-term growth", "Tax-deferred investing"]
    }
  ];

  const AccordionSection = ({ items, keyPrefix }: { items: InsuranceType[], keyPrefix: string }) => (
    <div className="space-y-3">
      {items.map((item, index) => {
        const key = `${keyPrefix}-${index}`;
        const isOpen = openAccordions[key];
        
        return (
          <Collapsible key={key} open={isOpen} onOpenChange={() => toggleAccordion(key)}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-left text-gray-900">{item.title}</h3>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 bg-gray-50 border-l border-r border-b border-gray-200 rounded-b-lg">
                <p className="text-gray-700 mb-4">{item.definition}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Pros:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">Cons:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-2">×</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#15AFF7] mb-2">Best For:</h4>
                  <ul className="text-sm text-gray-600">
                    {item.bestFor.map((audience, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-[#15AFF7] mr-2">•</span>
                        {audience}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Insurance & Annuity Guide
          </h2>
          <p className="text-blue-100">
            Understand your options and find the perfect coverage for your needs
          </p>
        </div>
      </div>

      <Tabs defaultValue="life-insurance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 m-0 rounded-none">
          <TabsTrigger value="life-insurance" className="flex items-center space-x-2 py-4">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Life Insurance</span>
          </TabsTrigger>
          <TabsTrigger value="annuities" className="flex items-center space-x-2 py-4">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Annuities</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2 py-4">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Get Quote</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="life-insurance" className="mt-0">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Life Insurance Types</h3>
              <p className="text-gray-600">
                Protect your loved ones with the right life insurance coverage. Click each option to learn more.
              </p>
            </div>
            <AccordionSection items={lifeInsuranceTypes} keyPrefix="life" />
          </TabsContent>

          <TabsContent value="annuities" className="mt-0">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Annuity Types</h3>
              <p className="text-gray-600">
                Secure your retirement with guaranteed income. Explore your annuity options below.
              </p>
            </div>
            <AccordionSection items={annuityTypes} keyPrefix="annuity" />
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-xl font-semibold text-gray-900">
                  Get Your Personalized Quote
                </CardTitle>
                <p className="text-center text-gray-600">
                  Connect with our licensed advisors for expert guidance
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        className="pl-10"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        className="pl-10"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="pl-10"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#15AFF7] hover:bg-[#0D94D1] text-white py-3"
                  >
                    Request My Quote
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you consent to receive communications from our licensed advisors.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InsuranceExplainerWidget;
