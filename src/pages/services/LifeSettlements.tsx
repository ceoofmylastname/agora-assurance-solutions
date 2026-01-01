
import { ArrowLeft, CheckCircle, DollarSign, Shield, TrendingUp, Users, Clock, Heart, Calculator, Target, Building2, Coins, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SEO from '@/components/SEO';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  carrier: z.string().min(1, "Please select your insurance carrier"),
  years: z.string().min(1, "Please specify years"),
  months: z.string().min(1, "Please specify months"),
  coverageAmount: z.string().min(1, "Please enter the coverage amount"),
  contactMethod: z.enum(["email", "phone"], {
    required_error: "Please select a contact method",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to being contacted",
  }),
});

const LifeSettlements = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      carrier: "",
      years: "",
      months: "",
      coverageAmount: "",
      contactMethod: "email",
      consent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Form Submitted Successfully!",
        description: "Philip will contact you within 24 hours with your policy evaluation.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        title="Life Settlements - Turn Your Life Insurance Into Cash | Agora Assurance Solutions"
        description="Discover life settlements - sell your life insurance policy for more than cash value. Get immediate funds while you're alive instead of letting your policy lapse."
        keywords={['life settlements', 'sell life insurance', 'policy sale', 'senior life insurance', 'viatical settlements', 'life insurance cash']}
      />
      
      <section className="pt-16 sm:pt-20 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#15AFF7] mb-4 sm:mb-6 lg:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <motion.div 
            className="relative mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-2xl sm:rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 transform -rotate-1">
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center" variants={itemVariants}>
                <div>
                  <motion.div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-xs sm:text-sm font-medium" variants={itemVariants}>
                    <DollarSign className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Life Settlements
                  </motion.div>
                  <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight" variants={itemVariants}>
                    Unlock Your Policy's Hidden Value
                  </motion.h1>
                  <motion.p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed" variants={itemVariants}>
                    Turn your life insurance policy into immediate cash. Get more than surrender value and stop paying premiums on coverage you no longer need.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4" variants={itemVariants}>
                    <button 
                      onClick={() => {
                        const formSection = document.getElementById('settlement-form');
                        if (formSection) {
                          formSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium text-center touch-manipulation"
                    >
                      Get Policy Evaluation
                    </button>
                    <button 
                      onClick={() => {
                        const learnSection = document.getElementById('how-it-works');
                        if (learnSection) {
                          learnSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium text-center touch-manipulation"
                    >
                      Learn More
                    </button>
                  </motion.div>
                </div>
                <motion.div className="relative order-first lg:order-last" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-xl sm:rounded-2xl transform rotate-3 scale-105"></div>
                  <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#15AFF7] to-blue-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                        <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">2-5x More Value</h3>
                      <p className="text-sm sm:text-base text-gray-600">Than cash surrender value</p>
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs sm:text-sm text-gray-500">Cash Surrender</span>
                          <span className="text-base sm:text-lg font-semibold text-red-500">$10,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Life Settlement</span>
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-500">$35,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* What is a Life Settlement Section */}
          <motion.div 
            id="how-it-works"
            className="mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-6 sm:mb-8 lg:mb-12" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">What is a Life Settlement?</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto px-4">
                A life settlement is a financial transaction where you sell your existing life insurance policy to a third party for more than its cash surrender value but less than the death benefit.
              </p>
            </motion.div>
            
            <motion.div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100" variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">1</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">You Own Policy</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">You have a life insurance policy that you no longer need or can't afford</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">Sell to Buyer</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Third party buyer purchases your policy for cash payment</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">Buyer Takes Over</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Buyer pays all future premiums and receives death benefit</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div 
            className="mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-6 sm:mb-8 lg:mb-12" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Choose Life Settlements?</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Transform your underutilized life insurance policy into immediate financial benefits
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-blue-600/5 rounded-xl sm:rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-[#15AFF7] mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Immediate Cash</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Receive a lump sum payment immediately instead of waiting for the death benefit or losing the policy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-xl sm:rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Higher Value</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Typically receive 2-5 times more than cash surrender value, maximizing your policy's worth.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-xl sm:rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">No More Premiums</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Stop paying expensive premiums on coverage you no longer need or can't afford.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-xl sm:rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Flexible Use</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Use funds for medical care, retirement, debt relief, or improving quality of life.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-600/5 rounded-xl sm:rounded-2xl transform rotate-1 scale-105 group-hover:rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Quick Process</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Straightforward process handled by our experts. Receive cash within weeks.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-xl sm:rounded-2xl transform -rotate-1 scale-105 group-hover:-rotate-2 transition-transform duration-300"></div>
                <Card className="relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 h-full">
                  <CardContent className="p-0">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Peace of Mind</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Convert an underutilized asset into financial security for you and your loved ones.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Meet Philip Section */}
          <motion.div 
            className="mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 xl:p-12" variants={itemVariants}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <motion.div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-xs sm:text-sm font-medium" variants={itemVariants}>
                    Meet Your Expert
                  </motion.div>
                  <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4" variants={itemVariants}>
                    Philip Giordano
                  </motion.h2>
                  <motion.p className="text-lg sm:text-xl text-[#15AFF7] font-semibold mb-3 sm:mb-4" variants={itemVariants}>
                    Regional Director - Life Settlements
                  </motion.p>
                  <motion.p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base" variants={itemVariants}>
                    With years of experience in life settlements, Philip specializes in helping clients unlock the hidden value in their life insurance policies. He works directly with leading settlement companies to ensure you receive the maximum value for your policy.
                  </motion.p>
                  <motion.div className="space-y-2 sm:space-y-3" variants={itemVariants}>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#15AFF7] mr-2 sm:mr-3 flex-shrink-0" />
                      <a href="tel:916-848-7907" className="text-base sm:text-lg font-medium hover:text-[#15AFF7] transition-colors touch-manipulation">
                        (916) 848-7907
                      </a>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#15AFF7] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <a href="mailto:lifesettlements@agoraassurancesolutions.com" className="text-base sm:text-lg font-medium hover:text-[#15AFF7] transition-colors break-all touch-manipulation">
                        lifesettlements@agoraassurancesolutions.com
                      </a>
                    </div>
                  </motion.div>
                </div>
                <motion.div className="relative order-1 lg:order-2" variants={itemVariants}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/20 to-blue-600/20 rounded-xl sm:rounded-2xl transform rotate-3 scale-105"></div>
                  <img 
                    src="/lovable-uploads/4f729cbe-cd65-4873-bfa1-27e7df8b3d85.png" 
                    alt="Philip Giordano - Regional Director"
                    className="relative rounded-xl sm:rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-sm sm:max-w-md mx-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Settlement Form */}
          <motion.div 
            id="settlement-form"
            className="mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Find Out How Much Your Policy Is Worth</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Get a free evaluation of your life insurance policy with no obligation. Philip will review your information and provide a personalized assessment.
              </p>
            </motion.div>
            
            <motion.div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 xl:p-12" variants={itemVariants}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" className="h-12 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" className="h-12 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="carrier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Insurance Carrier *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select your insurance carrier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="aig">AIG</SelectItem>
                            <SelectItem value="allianz">Allianz</SelectItem>
                            <SelectItem value="axa">AXA</SelectItem>
                            <SelectItem value="lincoln">Lincoln Financial</SelectItem>
                            <SelectItem value="metlife">MetLife</SelectItem>
                            <SelectItem value="nationwide">Nationwide</SelectItem>
                            <SelectItem value="new-york-life">New York Life</SelectItem>
                            <SelectItem value="northwestern-mutual">Northwestern Mutual</SelectItem>
                            <SelectItem value="prudential">Prudential</SelectItem>
                            <SelectItem value="transamerica">Transamerica</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label className="text-sm sm:text-base font-medium">How long have you had your policy in force? *</Label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
                      <FormField
                        control={form.control}
                        name="years"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Years" className="h-12 text-base" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="months"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Months" className="h-12 text-base" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="coverageAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Coverage Amount *</FormLabel>
                        <FormControl>
                          <Input placeholder="$500,000" className="h-12 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm sm:text-base">If Philip needs more information to get you a higher offer, would you like the information texted or emailed to you? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-3 touch-manipulation">
                              <RadioGroupItem value="email" id="email" className="w-5 h-5" />
                              <Label htmlFor="email" className="text-sm sm:text-base cursor-pointer">Email</Label>
                            </div>
                            <div className="flex items-center space-x-3 touch-manipulation">
                              <RadioGroupItem value="phone" id="phone" className="w-5 h-5" />
                              <Label htmlFor="phone" className="text-sm sm:text-base cursor-pointer">Phone/Text</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 touch-manipulation">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="w-5 h-5 mt-0.5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm leading-relaxed cursor-pointer">
                            I consent to being contacted by Agora Assurance Solutions regarding my inquiry. I understand that my information will be used in accordance with the privacy policy. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#15AFF7] hover:bg-[#0D94D1] text-white font-medium text-base sm:text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 touch-manipulation"
                    >
                      {isSubmitting ? "Submitting..." : "Get My Policy Evaluation"}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/5 to-blue-600/5 rounded-2xl sm:rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-12 shadow-2xl text-center transform -rotate-1">
              <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#15AFF7] to-blue-600 bg-clip-text text-transparent" variants={itemVariants}>
                Your Financial Freedom Awaits
              </motion.h2>
              <motion.p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-4" variants={itemVariants}>
                Don't let your life insurance policy become a financial burden. Contact Philip today for a free consultation and discover how much your policy could be worth in a life settlement.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center" variants={itemVariants}>
                <a 
                  href="tel:916-848-7907"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all transform hover:scale-105 shadow-lg font-medium inline-flex items-center justify-center touch-manipulation"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call (916) 848-7907
                </a>
                <a 
                  href="mailto:lifesettlements@agoraassurancesolutions.com"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#15AFF7] text-[#15AFF7] rounded-lg hover:bg-[#15AFF7] hover:text-white transition-all font-medium inline-flex items-center justify-center touch-manipulation"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LifeSettlements;
