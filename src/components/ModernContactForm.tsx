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
    <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Get In Touch
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            CONTACT US
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to protect what matters most? Let's discuss your insurance needs and find the perfect solution for you.
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="relative w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
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
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                  {currentStepData.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  {currentStepData.subtitle}
                </p>
                {currentStepData.description && (
                  <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
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
                               <motion.div
                                key={service.id}
                                className={`group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                                  field.value === service.id
                                    ? 'border-primary bg-gradient-to-br from-primary/5 to-blue-500/5 shadow-lg shadow-primary/10'
                                    : 'border-border bg-white/50 hover:border-primary/30 hover:shadow-md'
                                }`}
                                onClick={() => field.onChange(service.id)}
                                whileHover={{ scale: 1.02, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: service.id.length * 0.05 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                    field.value === service.id
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                                  }`}>
                                    <service.icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold transition-colors ${
                                      field.value === service.id ? 'text-foreground' : 'text-foreground group-hover:text-primary'
                                    }`}>{service.name}</h4>
                                  </div>
                                </div>
                              </motion.div>
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
                               <currentStepData.icon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 z-10" />
                             )}
                             <FormControl>
                               {currentStepData.isTextarea ? (
                                 <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.4 }}
                                 >
                                   <Textarea
                                     placeholder={currentStepData.placeholder}
                                     className="min-h-[140px] pl-14 pr-6 py-5 text-lg border-2 border-border bg-white/70 backdrop-blur-sm rounded-2xl focus:border-primary focus:ring-0 resize-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg placeholder:text-muted-foreground/60"
                                     onKeyDown={handleKeyPress}
                                     {...field}
                                   />
                                 </motion.div>
                               ) : (
                                 <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.4 }}
                                 >
                                   <Input
                                     type={currentStepData.type || 'text'}
                                     placeholder={currentStepData.placeholder}
                                     className="pl-14 pr-6 text-lg h-16 border-2 border-border bg-white/70 backdrop-blur-sm rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg placeholder:text-muted-foreground/60"
                                     onKeyDown={handleKeyPress}
                                     {...field}
                                   />
                                 </motion.div>
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

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-12 mt-12 border-t border-border/50">
                {currentStep > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-8 py-4 text-muted-foreground border-border bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-muted/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Previous</span>
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 hover:from-primary/90 hover:via-blue-500/90 hover:to-purple-500/90 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
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
      </div>
    </section>
  );
};

export default ModernContactForm;