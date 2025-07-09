import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Send, Mail, User, MessageSquare, ArrowRight, ArrowLeft, CheckCircle, Shield, Home, Heart, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
  timestamp: z.number()
});

type FormValues = z.infer<typeof formSchema>;

const insuranceServices = [
  { id: 'term-life', name: 'Term Life Insurance', icon: Shield },
  { id: 'mortgage-protection', name: 'Mortgage Protection', icon: Home },
  { id: 'final-expense', name: 'Final Expense Insurance', icon: Heart },
  { id: 'annuities', name: 'Annuity Solutions', icon: TrendingUp },
  { id: 'life-settlements', name: 'Life Settlements', icon: DollarSign },
  { id: 'tax-asset-protection', name: 'Tax & Asset Protection', icon: FileText }
];

const EMAILJS_SERVICE_ID = "service_i3h66xg";
const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/TLhrYb7SRrWrly615tCI/webhook-trigger/198f9752-05be-412e-b5dc-4dd58a596f56";

const steps = [
  {
    id: 'welcome',
    title: 'Hi there! 👋',
    subtitle: 'Ready to protect what matters most?',
    description: 'Let\'s find the perfect insurance solution for you. This will only take a few minutes.',
    isQuestion: false
  },
  {
    id: 'firstName',
    title: 'What\'s your first name?',
    subtitle: 'We\'d love to know what to call you',
    field: 'firstName',
    icon: User,
    placeholder: 'Enter your first name',
    isQuestion: true
  },
  {
    id: 'lastName',
    title: 'And your last name?',
    subtitle: 'Just to complete your information',
    field: 'lastName',
    icon: User,
    placeholder: 'Enter your last name',
    isQuestion: true
  },
  {
    id: 'email',
    title: 'What\'s your email address?',
    subtitle: 'We\'ll use this to send you your quote and follow up',
    field: 'email',
    icon: Mail,
    placeholder: 'your.email@example.com',
    type: 'email',
    isQuestion: true
  },
  {
    id: 'service',
    title: 'Which insurance service interests you?',
    subtitle: 'Select the service you\'d like to learn more about',
    field: 'service',
    isServiceSelection: true,
    isQuestion: true
  },
  {
    id: 'message',
    title: 'Tell us about your insurance needs',
    subtitle: 'What questions do you have? Any specific requirements?',
    field: 'message',
    icon: MessageSquare,
    placeholder: 'Tell us about your current situation, coverage needs, budget considerations, or any questions you have about our services...',
    isTextarea: true,
    isQuestion: true
  },
  {
    id: 'submit',
    title: 'Perfect! ✨',
    subtitle: 'Ready to get your personalized quote?',
    description: 'We\'ll review your information and get back to you within 24 hours with a customized insurance solution.',
    isQuestion: false
  }
];

const ModernContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStartTime] = useState<number>(Date.now());
  
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      service: '',
      message: '',
      honeypot: '',
      timestamp: formStartTime
    }
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    const step = steps[currentStep];
    if (!step.isQuestion) return true;
    
    const fieldName = step.field as keyof FormValues;
    const result = await form.trigger(fieldName);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      nextStep();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === steps.length - 1) {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const colors = ['#15AFF7', '#0D94D1', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 3;

      // Left side confetti
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.2),
        gravity: randomInRange(0.4, 0.6),
        drift: randomInRange(-0.4, 0.4),
      });

      // Right side confetti
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.2),
        gravity: randomInRange(0.4, 0.6),
        drift: randomInRange(-0.4, 0.4),
      });
    }, 250);
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    
    try {
      const data = form.getValues();
      
      // Bot checks
      if (data.honeypot) {
        toast({
          title: "Error",
          description: "There was a problem with your submission. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      const timeDiff = Date.now() - data.timestamp;
      if (timeDiff < 3000) {
        toast({
          title: "Error",
          description: "Please take a moment to review your message before submitting.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const { honeypot, timestamp, ...emailData } = data;
      
      // Send to webhook (primary method)
      const webhookData = {
        firstName: emailData.firstName,
        lastName: emailData.lastName,
        email: emailData.email,
        service: emailData.service,
        message: emailData.message,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error('Webhook submission failed');
      }
      
      setIsSubmitted(true);
      
      // Fire confetti celebration
      fireConfetti();
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default"
      });

      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        message: '',
        honeypot: '',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  if (isSubmitted) {
    return (
      <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
            }}
            className="bg-[#15AFF7] hover:bg-[#0D94D1]"
          >
            Send Another Message
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-2 bg-[#15AFF7] text-white rounded-full text-sm font-medium">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CONTACT US
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Ready to protect what matters most? Let's discuss your insurance needs and find the perfect solution for you.
          </p>
        </div>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Step Content */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentStepData.title}
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  {currentStepData.subtitle}
                </p>
                {currentStepData.description && (
                  <p className="text-gray-500">
                    {currentStepData.description}
                  </p>
                )}
              </div>

              {/* Form Fields */}
              <Form {...form}>
                <div className="space-y-6">
                  {currentStepData.isServiceSelection && (
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {insuranceServices.map((service) => (
                              <div
                                key={service.id}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                  field.value === service.id
                                    ? 'border-[#15AFF7] bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => field.onChange(service.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    field.value === service.id
                                      ? 'bg-[#15AFF7] text-white'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <service.icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {currentStepData.isQuestion && !currentStepData.isServiceSelection && (
                    <FormField
                      control={form.control}
                      name={currentStepData.field as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            {currentStepData.icon && (
                              <currentStepData.icon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                            )}
                            <FormControl>
                              {currentStepData.isTextarea ? (
                                <Textarea
                                  placeholder={currentStepData.placeholder}
                                  className="min-h-[120px] pl-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#15AFF7] focus:ring-0 resize-none"
                                  onKeyDown={handleKeyPress}
                                  {...field}
                                />
                              ) : (
                                <Input
                                  type={currentStepData.type || 'text'}
                                  placeholder={currentStepData.placeholder}
                                  className="pl-12 text-lg h-14 border-2 border-gray-200 rounded-xl focus:border-[#15AFF7] focus:ring-0"
                                  onKeyDown={handleKeyPress}
                                  {...field}
                                />
                              )}
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Hidden fields */}
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} tabIndex={-1} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timestamp"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] hover:from-[#0D94D1] hover:to-[#0A7FB0] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] hover:from-[#0D94D1] hover:to-[#0A7FB0] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    {currentStep === 0 ? 'Get Started' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Hint */}
              {currentStepData.isQuestion && (
                <p className="text-sm text-gray-400 text-center">
                  Press Enter to continue
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ModernContactForm;