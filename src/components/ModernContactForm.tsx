import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Send, Mail, User, MessageSquare, ArrowRight, ArrowLeft, CheckCircle, Shield, Home, Heart, TrendingUp, DollarSign, FileText, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { sendContactEmail, submitToWebhook } from '@/utils/emailService';
import { sanitizeInput, sanitizeEmail, sanitizePhone, RateLimiter } from '@/utils/security';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  smsConsent: z.boolean(),
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

const steps = [
  {
    id: 'welcome',
    title: 'Hi there! 👋🏻',
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
    id: 'phone',
    title: 'What\'s your phone number?',
    subtitle: 'We\'ll use this to contact you about your quote',
    field: 'phone',
    icon: Phone,
    placeholder: '(555) 123-4567',
    type: 'tel',
    isQuestion: true
  },
  {
    id: 'smsConsent',
    title: 'One more thing...',
    subtitle: 'We\'d like your permission to contact you',
    field: 'smsConsent',
    isConsent: true,
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
  const rateLimiter = new RateLimiter(3, 300000); // 3 submissions per 5 minutes
  
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      smsConsent: false,
      service: '',
      message: '',
      honeypot: '',
      timestamp: formStartTime
    },
    mode: 'onChange'
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
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Enhanced modern color palette with metallics and gradients
    const modernColors = [
      '#15AFF7', '#0D94D1', '#4F46E5', '#7C3AED', '#EC4899', '#F59E0B',
      '#10B981', '#06B6D4', '#8B5CF6', '#F97316', '#EF4444', '#22C55E',
      '#3B82F6', '#A855F7', '#F472B6', '#FBBF24', '#34D399', '#60A5FA',
      '#FFD700', '#C0C0C0', '#E6E6FA', '#FF69B4', '#00CED1', '#FF6347'
    ];

    const shapes = ['circle', 'square'] as const;

    let celebrationStage = 0;
    
    // Stage 1: Initial explosion from center
    setTimeout(() => {
      confetti({
        particleCount: 60,
        startVelocity: 45,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: modernColors,
        shapes: [...shapes],
        scalar: randomInRange(1.2, 2.0),
        gravity: randomInRange(0.6, 0.8),
        drift: randomInRange(-0.6, 0.6),
      });
    }, 0);

    // Stage 2: Continuous side cannons with varying intensities
    const sideCannonInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      celebrationStage = Math.floor((duration - timeLeft) / 1000);

      if (timeLeft <= 0) {
        clearInterval(sideCannonInterval);
        return;
      }

      // Dynamic particle count based on stage
      const baseParticleCount = celebrationStage < 2 ? 20 : 15;
      const particleVariation = randomInRange(0.7, 1.3);
      const particleCount = Math.floor(baseParticleCount * particleVariation);

      // Left side cannon with multiple angles
      confetti({
        particleCount,
        startVelocity: randomInRange(35, 55),
        spread: randomInRange(60, 90),
        angle: randomInRange(45, 90),
        origin: { x: randomInRange(0, 0.1), y: randomInRange(0.5, 0.8) },
        colors: modernColors,
        shapes: [...shapes],
        scalar: randomInRange(0.8, 1.8),
        gravity: randomInRange(0.4, 0.7),
        drift: randomInRange(0.2, 0.8),
        ticks: randomInRange(150, 300),
      });

      // Right side cannon with multiple angles  
      confetti({
        particleCount,
        startVelocity: randomInRange(35, 55),
        spread: randomInRange(60, 90),
        angle: randomInRange(90, 135),
        origin: { x: randomInRange(0.9, 1), y: randomInRange(0.5, 0.8) },
        colors: modernColors,
        shapes: [...shapes],
        scalar: randomInRange(0.8, 1.8),
        gravity: randomInRange(0.4, 0.7),
        drift: randomInRange(-0.8, -0.2),
        ticks: randomInRange(150, 300),
      });

      // Additional corner bursts
      if (Math.random() > 0.6) {
        confetti({
          particleCount: Math.floor(particleCount * 0.6),
          startVelocity: randomInRange(25, 40),
          spread: randomInRange(45, 75),
          angle: randomInRange(60, 120),
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.3) },
          colors: modernColors.slice(0, 12),
          shapes: [...shapes],
          scalar: randomInRange(0.6, 1.2),
          gravity: randomInRange(0.3, 0.5),
          drift: randomInRange(-0.4, 0.4),
        });
      }

    }, randomInRange(80, 150));

    // Stage 3: Sparkle shower from top
    setTimeout(() => {
      const sparkleInterval = setInterval(() => {
        confetti({
          particleCount: randomInRange(8, 15),
          startVelocity: randomInRange(15, 25),
          spread: randomInRange(30, 60),
          angle: 270,
          origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0, 0.2) },
          colors: ['#FFD700', '#C0C0C0', '#15AFF7', '#7C3AED', '#F59E0B'],
          shapes: ['circle'],
          scalar: randomInRange(0.4, 0.8),
          gravity: randomInRange(0.2, 0.4),
          drift: randomInRange(-0.3, 0.3),
          ticks: randomInRange(100, 200),
        });
      }, 200);

      setTimeout(() => clearInterval(sparkleInterval), 2000);
    }, 1500);

    // Stage 4: Final flourish with large particles
    setTimeout(() => {
      confetti({
        particleCount: 40,
        startVelocity: 50,
        spread: 100,
        angle: 90,
        origin: { x: 0.5, y: 0.8 },
        colors: ['#FFD700', '#15AFF7', '#7C3AED', '#10B981', '#F59E0B'],
        shapes: [...shapes],
        scalar: randomInRange(1.5, 2.5),
        gravity: randomInRange(0.5, 0.7),
        drift: randomInRange(-0.5, 0.5),
        ticks: 400,
      });
    }, 3500);

    // Stage 5: Gentle floating celebration particles
    setTimeout(() => {
      const floatingInterval = setInterval(() => {
        confetti({
          particleCount: randomInRange(3, 6),
          startVelocity: randomInRange(10, 20),
          spread: randomInRange(40, 80),
          angle: randomInRange(60, 120),
          origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.6, 0.9) },
          colors: ['#FFD700', '#C0C0C0', '#15AFF7', '#E6E6FA'],
          shapes: ['circle'],
          scalar: randomInRange(0.5, 1.0),
          gravity: randomInRange(0.1, 0.3),
          drift: randomInRange(-0.2, 0.2),
          ticks: 300,
        });
      }, 400);

      setTimeout(() => clearInterval(floatingInterval), 1500);
    }, 4000);
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    // Rate limiting check
    const clientId = 'contact-form'; // In real app, use IP or user ID
    if (!rateLimiter.isAllowed(clientId)) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before submitting another message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = form.getValues();
      
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('All form data:', data);
      
      // Enhanced validation for phone field
      if (!data.phone || data.phone.trim() === '') {
        console.error('❌ Phone field is empty or undefined');
        toast({
          title: "Error",
          description: "Phone number is required. Please enter your phone number.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
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
      
      // Sanitize and validate all inputs
      const sanitizedEmail = sanitizeEmail(data.email);
      const sanitizedPhone = sanitizePhone(data.phone);
      
      if (!sanitizedEmail) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (!sanitizedPhone) {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create emailData object with sanitized data
      const emailData = {
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        email: sanitizedEmail,
        phone: sanitizedPhone,
        service: sanitizeInput(data.service),
        message: sanitizeInput(data.message),
        smsConsent: data.smsConsent
      };
      
      // Enhanced webhook data with all form fields
      const webhookData = {
        firstName: emailData.firstName,
        lastName: emailData.lastName,
        email: emailData.email,
        phone: emailData.phone,
        service: emailData.service,
        message: emailData.message,
        smsConsent: data.smsConsent,
        full_name: `${emailData.firstName} ${emailData.lastName}`,
        lead_source: 'Website Contact Form',
        timestamp: new Date().toISOString(),
        source: 'contact_form',
        'Questions': emailData.message,
        'Service - (SL)': emailData.service,
        'first_name': emailData.firstName,
        'last_name': emailData.lastName
      };

      // Send to webhook via Supabase edge function
      try {
        await submitToWebhook(webhookData);
        console.log('✅ Webhook submitted successfully');
      } catch (webhookError) {
        console.error('❌ Webhook submission failed:', webhookError);
        // Don't fail the entire submission if webhook fails
      }

      // Send email via Supabase edge function
      try {
        await sendContactEmail(emailData);
        console.log('✅ Email sent successfully via Supabase/Resend');
      } catch (emailError) {
        console.error('❌ Failed to send email via Supabase/Resend:', emailError);
        // Don't fail the entire submission if email fails
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
        phone: '',
        smsConsent: false,
        service: '',
        message: '',
        honeypot: '',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('❌ Error sending email:', error);
      
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Ready to protect what matters most? Let's discuss your insurance needs and find the perfect solution for you.
          </p>
          
          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="tel:916-659-5663"
              className="group flex items-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Call Now</div>
                <div className="text-sm opacity-90 font-medium">916-659-5663</div>
              </div>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-px h-8 bg-border hidden sm:block"></div>
              <span className="text-lg font-medium">or</span>
              <div className="w-px h-8 bg-border hidden sm:block"></div>
            </div>
            <div className="text-lg font-semibold text-primary">Fill out the form below</div>
          </div>
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
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Step Content */}
              <div className="text-center mb-16">
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
                                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border
                                  ${field.value === service.id
                                    ? 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/10'
                                    : 'bg-slate-50/80 border-slate-200/50 hover:bg-slate-100/90 hover:border-slate-300/60 shadow-md hover:shadow-lg'
                                  }`}
                                onClick={() => field.onChange(service.id)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: service.id.length * 0.05 }}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                    field.value === service.id
                                      ? 'bg-primary text-white'
                                      : 'bg-white text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                                  }`}>
                                    <service.icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold transition-colors ${
                                      field.value === service.id ? 'text-primary' : 'text-foreground group-hover:text-primary'
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
                  
                  {currentStepData.isConsent && (
                    <FormField
                      control={form.control}
                      name="smsConsent"
                      render={({ field }) => (
                        <FormItem>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50"
                          >
                            <div className="flex items-start space-x-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 h-6 w-6 rounded-md border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </FormControl>
                              <div className="flex-1">
                                <label 
                                  htmlFor="smsConsent" 
                                  className="text-base leading-relaxed text-foreground cursor-pointer"
                                  onClick={() => field.onChange(!field.value)}
                                >
                                  I consent to receive text messages and phone calls from Agora Assurance Solutions regarding insurance quotes, policy information, and follow-up communications. Standard message and data rates may apply. I understand I can opt out at any time by replying STOP to any message or requesting removal during a call.
                                </label>
                                <p className="text-sm text-muted-foreground mt-3">
                                  We respect your privacy and will only contact you regarding your insurance inquiry.
                                </p>
                              </div>
                            </div>
                            <FormMessage className="mt-4" />
                          </motion.div>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {currentStepData.isQuestion && !currentStepData.isServiceSelection && !currentStepData.isConsent && (
                    <FormField
                      control={form.control}
                      name={currentStepData.field as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                           <div className="relative">
                             {currentStepData.icon && (
                               <currentStepData.icon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 z-20" />
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
                                     className="min-h-[140px] pl-14 pr-6 py-5 text-lg bg-white/90 backdrop-blur-sm rounded-2xl border-0 transition-all duration-500 resize-none placeholder:text-muted-foreground/60
                                       shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
                                       hover:shadow-[0_20px_48px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                                       focus:shadow-[0_24px_56px_rgba(21,175,247,0.25),0_12px_20px_rgba(21,175,247,0.15),inset_0_1px_0_rgba(255,255,255,1)]
                                       transform-gpu hover:scale-[1.01] focus:scale-[1.02] hover:-translate-y-1 focus:-translate-y-2
                                       before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none"
                                     style={{ 
                                       filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
                                       transformStyle: 'preserve-3d'
                                     }}
                                      onKeyDown={handleKeyPress}
                                      value={typeof field.value === 'string' ? field.value : ''}
                                      onChange={(e) => {
                                       console.log(`${currentStepData.field} field changed:`, e.target.value);
                                       field.onChange(e);
                                     }}
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
                                     className="pl-14 pr-6 text-lg h-16 bg-white/90 backdrop-blur-sm rounded-2xl border-0 transition-all duration-500 placeholder:text-muted-foreground/60
                                       shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
                                       hover:shadow-[0_20px_48px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                                       focus:shadow-[0_24px_56px_rgba(21,175,247,0.25),0_12px_20px_rgba(21,175,247,0.15),inset_0_1px_0_rgba(255,255,255,1)]
                                       transform-gpu hover:scale-[1.01] focus:scale-[1.02] hover:-translate-y-1 focus:-translate-y-2
                                       before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none"
                                     style={{ 
                                       filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
                                       transformStyle: 'preserve-3d'
                                     }}
                                      onKeyDown={handleKeyPress}
                                      value={typeof field.value === 'string' ? field.value : ''}
                                      onChange={(e) => {
                                       console.log(`${currentStepData.field} field changed:`, e.target.value);
                                       if (currentStepData.field === 'phone') {
                                         console.log('📞 PHONE FIELD UPDATE:', e.target.value);
                                       }
                                       field.onChange(e);
                                     }}
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
                          <Input {...field} tabIndex={-1} value={field.value || ''} />
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
                          <Input type="hidden" {...field} value={field.value || formStartTime} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-16 mt-16">
                {currentStep > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-8 py-4 text-muted-foreground bg-white/90 backdrop-blur-sm rounded-2xl border-0 transition-all duration-500 transform-gpu hover:scale-105 hover:-translate-y-1
                      shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
                      hover:shadow-[0_20px_48px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]"
                    style={{ 
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
                      transformStyle: 'preserve-3d'
                    }}
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
                    className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-500 text-white rounded-2xl font-medium transition-all duration-500 transform-gpu hover:scale-105 hover:-translate-y-1
                      shadow-[0_12px_40px_rgba(21,175,247,0.35),0_4px_12px_rgba(21,175,247,0.25)]
                      hover:shadow-[0_20px_56px_rgba(21,175,247,0.4),0_8px_20px_rgba(21,175,247,0.3)]
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none"
                    style={{ 
                      filter: 'drop-shadow(0 25px 50px rgba(21,175,247,0.3))',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 text-white rounded-2xl font-semibold transition-all duration-500 transform-gpu hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0
                      shadow-[0_12px_40px_rgba(21,175,247,0.35),0_4px_12px_rgba(21,175,247,0.25)]
                      hover:shadow-[0_24px_64px_rgba(21,175,247,0.4),0_12px_24px_rgba(21,175,247,0.3)]
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none"
                    style={{ 
                      filter: 'drop-shadow(0 25px 50px rgba(21,175,247,0.3))',
                      transformStyle: 'preserve-3d'
                    }}
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
    </section>
  );
};

export default ModernContactForm;
