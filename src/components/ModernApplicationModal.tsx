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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
          <div className="space-y-4">
            <textarea
              {...register(step.id as keyof ApplicationFormData)}
              rows={4}
              className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 resize-none placeholder-gray-400"
              placeholder={step.placeholder}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            {fieldError && (
              <p className="text-red-500 text-lg animate-fade-in">{fieldError.message}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-4">
            {step.options?.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setValue(step.id as keyof ApplicationFormData, option.value as any);
                  setTimeout(nextStep, 300);
                }}
                className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-xl hover:scale-105 transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </button>
            ))}
            {fieldError && (
              <p className="text-red-500 text-lg animate-fade-in">{fieldError.message}</p>
            )}
          </div>
        );
        
      case 'name-split':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  {...register('firstName')}
                  type="text"
                  className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 placeholder-gray-400"
                  placeholder="First name"
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
              </div>
              <div>
                <input
                  {...register('lastName')}
                  type="text"
                  className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 placeholder-gray-400"
                  placeholder="Last name"
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            {nameErrors && (
              <p className="text-red-500 text-lg animate-fade-in">
                {errors.firstName?.message || errors.lastName?.message}
              </p>
            )}
          </div>
        );
        
      case 'location-split':
        return (
          <div className="space-y-6">
            <div>
              <input
                {...register('state')}
                type="text"
                className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 placeholder-gray-400"
                placeholder="State"
                onKeyDown={handleKeyPress}
                autoFocus
              />
            </div>
            <div>
              <input
                {...register('address')}
                type="text"
                className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 placeholder-gray-400"
                placeholder="Full address"
                onKeyDown={handleKeyPress}
              />
            </div>
            {locationErrors && (
              <p className="text-red-500 text-lg animate-fade-in">
                {errors.state?.message || errors.address?.message}
              </p>
            )}
          </div>
        );
        
      case 'consent':
        return (
          <div className="space-y-6">
            <div 
              className="flex items-start space-x-4 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
              onClick={() => {
                const currentValue = watchedValues.consent;
                setValue('consent', !currentValue);
              }}
            >
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                watchedValues.consent ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
                {watchedValues.consent && <Check className="w-4 h-4 text-white" />}
              </div>
              <div className="text-lg text-gray-700 leading-relaxed">
                I consent to being contacted by Agora Assurance Solutions regarding my inquiry. 
                I understand that my information will be used in accordance with the privacy policy.
              </div>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-lg animate-fade-in">{errors.consent.message}</p>
            )}
          </div>
        );
        
      default:
        return (
          <div className="space-y-4">
            <input
              {...register(step.id as keyof ApplicationFormData)}
              type={step.type}
              className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none p-4 placeholder-gray-400"
              placeholder={step.placeholder}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            {fieldError && (
              <p className="text-red-500 text-lg animate-fade-in">{fieldError.message}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="h-full flex flex-col">
          {isComplete ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Perfect!</h2>
                  <p className="text-xl text-gray-600">Your application has been submitted successfully.</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 p-12 flex flex-col justify-center">
                <div className="max-w-3xl mx-auto w-full">
                  <div className="mb-12 animate-fade-in">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-2xl font-bold text-blue-500">
                        {currentStep + 1}
                      </span>
                      <span className="text-lg text-gray-400">
                        of {steps.length}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                      {currentStepData.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      {currentStepData.subtitle}
                    </p>
                  </div>
                  
                  <div className="animate-fade-in">
                    {renderField()}
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="p-8 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center max-w-3xl mx-auto">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                    <span>Back</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting || !watchedValues.consent}
                      className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 transform font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Check size={20} />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 transform font-semibold"
                    >
                      <span>Continue</span>
                      <ChevronRight size={20} />
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