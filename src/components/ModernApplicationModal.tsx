
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  referredBy: z.string().min(1, 'Please tell us who referred you'),
  referredByDirector: z.string().min(1, 'Please select a director'),
  firstName: z.string().min(1, 'What\'s your first name?'),
  lastName: z.string().min(1, 'What\'s your last name?'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  state: z.string().min(1, 'Which state do you live in?'),
  address: z.string().min(1, 'What\'s your current address?'),
  licensed: z.string().min(1, 'Please let us know your licensing status'),
  marketingBudget: z.string().min(1, 'What\'s your weekly marketing budget?'),
  needsCRM: z.string().min(1, 'Do you need CRM access?'),
  willingToService: z.string().min(1, 'Are you willing to service online clients?'),
  consent: z.boolean().refine(val => val === true, 'Please accept to continue'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ModernApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 'referredBy',
    title: 'Who referred you to us?',
    subtitle: 'We\'d love to know who introduced you to our community',
    type: 'textarea',
    placeholder: 'Tell us about the person who referred you...'
  },
  {
    id: 'referredByDirector',
    title: 'Which director referred you?',
    subtitle: 'Select the director who recommended you',
    type: 'select',
    options: [
      { value: 'adam-t', label: 'Adam T.' },
      { value: 'benjamin-s', label: 'Benjamin S.' },
      { value: 'jalil-d', label: 'Jalil D.' },
      { value: 'jeff-u', label: 'Jeff U.' },
      { value: 'john-m', label: 'John M.' },
      { value: 'paul-j', label: 'Paul J.' },
      { value: 'shahid-s', label: 'Shahid S.' },
      { value: 'sean-f', label: 'Sean F.' },
      { value: 'suhail-h', label: 'Suhail H.' },
      { value: 'tonya-m', label: 'Tonya M.' },
      { value: 'smith-e', label: 'Smith E.' },
      { value: 'agora-direct', label: 'Agora Direct' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'name',
    title: 'What\'s your name?',
    subtitle: 'Let\'s get to know you better',
    type: 'name-split',
    fields: ['firstName', 'lastName']
  },
  {
    id: 'email',
    title: 'What\'s your email address?',
    subtitle: 'We\'ll use this to send you updates about your application',
    type: 'email',
    placeholder: 'your.email@example.com'
  },
  {
    id: 'phone',
    title: 'What\'s your phone number?',
    subtitle: 'We\'ll call you to discuss your application',
    type: 'tel',
    placeholder: '(555) 123-4567'
  },
  {
    id: 'location',
    title: 'Where are you located?',
    subtitle: 'Tell us about your location',
    type: 'location-split',
    fields: ['state', 'address']
  },
  {
    id: 'licensed',
    title: 'Are you currently licensed?',
    subtitle: 'Let us know your current licensing status',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes, I\'m licensed' },
      { value: 'no', label: 'No, I\'m not licensed' },
      { value: 'in-progress', label: 'Currently in progress' }
    ]
  },
  {
    id: 'marketingBudget',
    title: 'What\'s your weekly marketing budget?',
    subtitle: 'This helps us understand your investment capacity',
    type: 'text',
    placeholder: '$500'
  },
  {
    id: 'needsCRM',
    title: 'Do you need access to CRM & Quoting Tools?',
    subtitle: 'We provide comprehensive tools for our advisors',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes, I need CRM access' },
      { value: 'no', label: 'No, I have my own tools' }
    ]
  },
  {
    id: 'willingToService',
    title: 'Are you willing to service online clients?',
    subtitle: 'We have a network of online leads that need assistance',
    type: 'select',
    options: [
      { value: 'yes', label: 'Yes, I\'m willing' },
      { value: 'no', label: 'No, I prefer in-person only' }
    ]
  },
  {
    id: 'consent',
    title: 'Almost done!',
    subtitle: 'Just need your consent to get started',
    type: 'consent'
  }
];

export const ModernApplicationModal: React.FC<ModernApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  });

  const watchedValues = watch();
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting application data to webhook:", data);
      
      const response = await fetch('https://services.leadconnectorhq.com/hooks/TLhrYb7SRrWrly615tCI/webhook-trigger/a242f4e7-7948-4821-87b6-2c3959e07f78', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...data,
          formType: 'advisor_application',
          timestamp: new Date().toISOString(),
          source: window.location.origin,
        }),
      });

      setIsComplete(true);
      
      setTimeout(() => {
        toast({
          title: "Application Submitted Successfully!",
          description: "Thank you for your interest. We'll be in touch soon.",
        });
        reset();
        onClose();
        setIsComplete(false);
        setCurrentStep(0);
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const step = steps[currentStep];
    let isValid = true;
    
    if (step.type === 'name-split') {
      isValid = await trigger(['firstName', 'lastName']);
    } else if (step.type === 'location-split') {
      isValid = await trigger(['state', 'address']);
    } else if (step.fields) {
      isValid = await trigger(step.fields as any);
    } else {
      isValid = await trigger(step.id as any);
    }
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < steps.length - 1) {
      e.preventDefault();
      nextStep();
    }
  };

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderField = () => {
    const step = currentStepData;
    const fieldError = errors[step.id as keyof ApplicationFormData];
    const nameErrors = errors.firstName || errors.lastName;
    const locationErrors = errors.state || errors.address;
    
    switch (step.type) {
      case 'textarea':
        return (
          <div className="space-y-6">
            <div className="relative">
              <textarea
                {...register(step.id as keyof ApplicationFormData)}
                rows={4}
                className="w-full text-lg md:text-2xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-4 md:p-6 resize-none placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50"
                placeholder={step.placeholder}
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                Press Enter to continue
              </div>
            </div>
            {fieldError && (
              <p className="text-destructive text-base md:text-lg animate-fade-in flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {fieldError.message}
              </p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <div className="grid gap-3">
              {step.options?.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue(step.id as keyof ApplicationFormData, option.value as any);
                    setTimeout(nextStep, 300);
                  }}
                  className="group relative w-full text-left p-4 md:p-6 rounded-xl border-2 border-border bg-card/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-base md:text-lg hover:scale-[1.02] transform min-h-[60px] flex items-center shadow-sm hover:shadow-md"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fade-in 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex-1 pr-4 font-medium text-foreground group-hover:text-primary transition-colors">{option.label}</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                      <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
            {fieldError && (
              <p className="text-destructive text-base md:text-lg animate-fade-in flex items-center gap-2 mt-4">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {fieldError.message}
              </p>
            )}
          </div>
        );
        
      case 'name-split':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">First Name</label>
                <input
                  {...register('firstName')}
                  type="text"
                  className="w-full text-base sm:text-lg md:text-xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-3 sm:p-4 md:p-5 placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 group-hover:shadow-md min-h-[48px]"
                  placeholder="Enter your first name"
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
              </div>
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                <input
                  {...register('lastName')}
                  type="text"
                  className="w-full text-base sm:text-lg md:text-xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-3 sm:p-4 md:p-5 placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 group-hover:shadow-md min-h-[48px]"
                  placeholder="Enter your last name"
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            {nameErrors && (
              <p className="text-destructive text-sm sm:text-base md:text-lg animate-fade-in flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {errors.firstName?.message || errors.lastName?.message}
              </p>
            )}
          </div>
        );
        
      case 'location-split':
        return (
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-muted-foreground mb-2">State</label>
              <input
                {...register('state')}
                type="text"
                className="w-full text-lg md:text-xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-4 md:p-5 placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 group-hover:shadow-md"
                placeholder="Enter your state"
                onKeyDown={handleKeyPress}
                autoFocus
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Full Address</label>
              <input
                {...register('address')}
                type="text"
                className="w-full text-lg md:text-xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-4 md:p-5 placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 group-hover:shadow-md"
                placeholder="Enter your full address"
                onKeyDown={handleKeyPress}
              />
            </div>
            {locationErrors && (
              <p className="text-destructive text-base md:text-lg animate-fade-in flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {errors.state?.message || errors.address?.message}
              </p>
            )}
          </div>
        );
        
      case 'consent':
        return (
          <div className="space-y-6">
            <div 
              className="group flex items-start space-x-4 md:space-x-5 p-6 md:p-8 rounded-2xl border-2 border-border bg-card/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
              onClick={() => {
                const currentValue = watchedValues.consent;
                setValue('consent', !currentValue);
              }}
            >
              <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                watchedValues.consent 
                  ? 'bg-primary border-primary shadow-lg scale-110' 
                  : 'border-border group-hover:border-primary/50 group-hover:bg-primary/5'
              }`}>
                {watchedValues.consent && <Check className="w-4 h-4 text-primary-foreground" />}
              </div>
              <div className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300">
                <span className="font-medium text-foreground">I consent</span> to being contacted by Agora Assurance Solutions regarding my inquiry. 
                I understand that my information will be used in accordance with the{' '}
                <span className="text-primary hover:underline cursor-pointer">privacy policy</span>.
              </div>
            </div>
            {errors.consent && (
              <p className="text-destructive text-base md:text-lg animate-fade-in flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {errors.consent.message}
              </p>
            )}
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className="relative group">
              <input
                {...register(step.id as keyof ApplicationFormData)}
                type={step.type}
                className="w-full text-lg md:text-2xl bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none p-4 md:p-6 placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 group-hover:shadow-md"
                placeholder={step.placeholder}
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                Press Enter to continue
              </div>
            </div>
            {fieldError && (
              <p className="text-destructive text-base md:text-lg animate-fade-in flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-xs">!</span>
                {fieldError.message}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-muted/95 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-4 h-[95vh] sm:h-[90vh] md:h-[85vh] bg-background/98 backdrop-blur-sm border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary/90 to-accent transition-all duration-700 ease-out rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-2 sm:p-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Close modal"
        >
          <X size={18} className="sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="h-full flex flex-col">
          {isComplete ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center space-y-8 animate-fade-in">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">Perfect!</h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Your application has been submitted successfully. We'll be in touch soon.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center overflow-y-auto max-h-[75vh]">
                <div className="max-w-2xl mx-auto w-full">
                  <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
                      <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm md:text-base font-bold">
                        {currentStep + 1} of {steps.length}
                      </div>
                      <div className="h-px flex-1 bg-border"></div>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 leading-tight">
                      {currentStepData.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                      {currentStepData.subtitle}
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    {renderField()}
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="p-4 sm:p-6 md:p-8 border-t border-border bg-muted/30 backdrop-blur-sm">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="group flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-sm md:text-base font-medium hover:bg-background/50 rounded-xl min-h-[44px]"
                  >
                    <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                    <span>Back</span>
                  </button>
                  
                  <div className="flex space-x-1.5 sm:space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 ${
                          index < currentStep 
                            ? 'bg-primary scale-110' 
                            : index === currentStep 
                            ? 'bg-primary/70 scale-125 animate-pulse' 
                            : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting || !watchedValues.consent}
                      className="group flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 hover:scale-[1.02] transform font-semibold text-sm md:text-base min-h-[44px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          <span className="hidden xs:inline">Submitting...</span>
                          <span className="xs:hidden">...</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden xs:inline">Submit Application</span>
                          <span className="xs:hidden">Submit</span>
                          <Check size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="group flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] transform font-semibold text-sm md:text-base min-h-[44px]"
                    >
                      <span>Continue</span>
                      <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
