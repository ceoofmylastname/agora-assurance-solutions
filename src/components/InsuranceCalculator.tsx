import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, Ruler, Shield, DollarSign, Diamond, Sailboat, Wallet, Armchair, Umbrella, Trees, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { submitInsuranceCalculator } from '@/utils/emailService';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { z } from 'zod';

interface InsuranceCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webhookUrl?: string;
}

const products = [
  { id: 'term', name: 'Term', icon: Shield, subtitle: null },
  { id: 'return-of-premium', name: 'Return of Premium', icon: DollarSign, subtitle: 'Premium returned if I outlive my term duration' },
  { id: 'permanent', name: 'Permanent Insurance', icon: Diamond, subtitle: 'All Lifetime Options' },
  { id: 'retirement-income', name: 'Supplemental Retirement Income', icon: Sailboat, subtitle: 'Accumulation IUL' },
  { id: 'whole-life', name: 'Whole Life', icon: Wallet, subtitle: 'Guaranteed, tax-deferred growth' },
  { id: 'lifetime-income', name: 'Lifetime Income', icon: Armchair, subtitle: 'Annuity' },
  { id: 'long-term-care', name: 'Long Term Care', icon: Armchair, subtitle: null },
  { id: 'accidental-death', name: 'Accidental Death', icon: Umbrella, subtitle: "I can't qualify for life insurance" },
  { id: 'final-expense', name: 'Final Expense', icon: Trees, subtitle: 'Burial expenses', ageRestricted: true },
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const emailSchema = z.string().email({ message: "Invalid email address" });
const phoneSchema = z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Phone must be in format (XXX) XXX-XXXX" });

export default function InsuranceCalculator({ open, onOpenChange, webhookUrl }: InsuranceCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    healthRating: 0,
    nicotineUse: '',
    height: '',
    weight: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    priority: '',
    coverageAmount: 1000000,
    state: 'Nevada',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = (currentStep / 8) * 100;

  const calculateAge = () => {
    if (!formData.birthMonth || !formData.birthDay || !formData.birthYear) return 0;
    const today = new Date();
    const birthDate = new Date(
      parseInt(formData.birthYear),
      parseInt(formData.birthMonth) - 1,
      parseInt(formData.birthDay)
    );
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFormData('phone', formatted);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        break;
      case 2:
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 3:
        if (formData.healthRating === 0) newErrors.healthRating = 'Health rating is required';
        break;
      case 4:
        if (!formData.nicotineUse) newErrors.nicotineUse = 'Nicotine/Cannabis use is required';
        break;
      case 5:
        if (!formData.height) newErrors.height = 'Height is required';
        if (formData.weight && (parseInt(formData.weight) < 50 || parseInt(formData.weight) > 500)) {
          newErrors.weight = 'Weight must be between 50-500 lbs';
        }
        break;
      case 6:
        if (!formData.birthMonth) newErrors.birthMonth = 'Birth month is required';
        if (!formData.birthDay) newErrors.birthDay = 'Birth day is required';
        if (!formData.birthYear) newErrors.birthYear = 'Birth year is required';
        const calculatedAge = calculateAge();
        if (calculatedAge < 18 || calculatedAge > 85) {
          newErrors.birthYear = 'Age must be between 18-85';
        }
        break;
      case 7:
        if (!formData.priority) newErrors.priority = 'Please select a priority';
        break;
      case 8:
        const emailResult = emailSchema.safeParse(formData.email);
        if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
        const phoneResult = phoneSchema.safeParse(formData.phone);
        if (!phoneResult.success) newErrors.phone = phoneResult.error.errors[0].message;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        age: calculateAge(),
        submittedAt: new Date().toISOString(),
        source: 'agora-calculator',
      };

      await submitInsuranceCalculator(payload);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setShowSuccess(true);
      toast({
        title: "Success!",
        description: "Thank you! An agent will contact you shortly.",
      });

      setTimeout(() => {
        onOpenChange(false);
        setShowSuccess(false);
        setCurrentStep(1);
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          healthRating: 0,
          nicotineUse: '',
          height: '',
          weight: '',
          birthMonth: '',
          birthDay: '',
          birthYear: '',
          priority: '',
          coverageAmount: 1000000,
          state: 'Nevada',
          email: '',
          phone: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hi, ready to secure any unforeseen events in your life? I'll get your life insurance quotes in seconds. Ready to go?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className={`pl-10 ${formData.firstName ? 'border-blue-500 ring-2 ring-blue-200' : ''} ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="First Name"
                  />
                </div>
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="pl-10"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Great to meet you, {formData.firstName}! What's your gender?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  updateFormData('gender', 'male');
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.gender === 'male'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-5xl mb-3">👨</div>
                <div className="text-xl font-semibold text-gray-900">Male</div>
              </button>
              <button
                onClick={() => {
                  updateFormData('gender', 'female');
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.gender === 'female'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="text-5xl mb-3">👩</div>
                <div className="text-xl font-semibold text-gray-900">Female</div>
              </button>
            </div>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              In your opinion, how healthy are you?
            </h2>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateFormData('healthRating', rating)}
                  className="transition-all hover:scale-110"
                >
                  <Heart
                    className={`w-12 h-12 md:w-16 md:h-16 ${
                      formData.healthRating >= rating
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Click for Advanced Health Classes
              </a>
            </div>
            {errors.healthRating && <p className="text-sm text-red-500 text-center">{errors.healthRating}</p>}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Nicotine or Cannabis Use?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  updateFormData('nicotineUse', 'never');
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.nicotineUse === 'never'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-4xl mb-2">🚭</div>
                <div className="text-lg font-semibold text-gray-900">Never</div>
              </button>
              <button
                onClick={() => {
                  updateFormData('nicotineUse', 'previously');
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.nicotineUse === 'previously'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="text-4xl mb-2">🚬</div>
                <div className="text-lg font-semibold text-gray-900">Previously</div>
              </button>
              <button
                onClick={() => {
                  updateFormData('nicotineUse', 'currently');
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.nicotineUse === 'currently'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="text-4xl mb-2">🚬</div>
                <div className="text-lg font-semibold text-gray-900">Currently</div>
              </button>
            </div>
            {errors.nicotineUse && <p className="text-sm text-red-500 text-center">{errors.nicotineUse}</p>}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What is Your Height and Weight?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height *</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Select value={formData.height} onValueChange={(value) => updateFormData('height', value)}>
                    <SelectTrigger className={`pl-10 ${formData.height ? 'border-green-500' : ''} ${errors.height ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select height" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto bg-white pointer-events-auto">
                      {Array.from({ length: 36 }, (_, i) => {
                        const feet = Math.floor((48 + i) / 12);
                        const inches = (48 + i) % 12;
                        return (
                          <SelectItem key={i} value={`${feet}' ${inches}"`}>
                            {feet}' {inches}"
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
              </div>
              <div>
                <Label htmlFor="weight">Weight (Optional)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                  placeholder="Weight (lbs)"
                  min="50"
                  max="500"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
              </div>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Don't know {formData.firstName}'s weight?
              </a>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Last question, {formData.firstName}. What's your date of birth?
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="birthMonth">Month *</Label>
                <Select value={formData.birthMonth} onValueChange={(value) => updateFormData('birthMonth', value)}>
                  <SelectTrigger className={errors.birthMonth ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, idx) => (
                      <SelectItem key={idx} value={String(idx + 1)}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.birthMonth && <p className="text-sm text-red-500 mt-1">{errors.birthMonth}</p>}
              </div>
              <div>
                <Label htmlFor="birthDay">Day *</Label>
                <Input
                  id="birthDay"
                  type="number"
                  value={formData.birthDay}
                  onChange={(e) => updateFormData('birthDay', e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className={errors.birthDay ? 'border-red-500' : ''}
                />
                {errors.birthDay && <p className="text-sm text-red-500 mt-1">{errors.birthDay}</p>}
              </div>
              <div>
                <Label htmlFor="birthYear">Year *</Label>
                <Input
                  id="birthYear"
                  type="number"
                  value={formData.birthYear}
                  onChange={(e) => updateFormData('birthYear', e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className={errors.birthYear ? 'border-red-500' : ''}
                />
                {errors.birthYear && <p className="text-sm text-red-500 mt-1">{errors.birthYear}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 7:
        const availableProducts = products.filter(p => !p.ageRestricted || age >= 50);
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Please Select Your Top Priority
              </h2>
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Or click here to see all categories
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.id}
                    onClick={() => updateFormData('priority', product.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                      formData.priority === product.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        formData.priority === product.id ? 'bg-blue-500' : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-6 h-6 ${formData.priority === product.id ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{product.name}</div>
                      {product.subtitle && (
                        <div className="text-xs text-gray-500">{product.subtitle}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.priority && <p className="text-sm text-red-500 text-center">{errors.priority}</p>}
          </motion.div>
        );

      case 8:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Almost done! Let's calculate your coverage.
            </h2>

            {/* Coverage Amount Slider */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  ${formData.coverageAmount.toLocaleString()}
                </div>
                <Label className="text-sm text-gray-600">Coverage Amount</Label>
              </div>
              <Slider
                value={[formData.coverageAmount]}
                onValueChange={([value]) => updateFormData('coverageAmount', value)}
                min={50000}
                max={10000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$50,000</span>
                <span>$10,000,000</span>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@email.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(XXX) XXX-XXXX"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information Summary</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Age:</span>
                  <div className="font-semibold">{age} years old</div>
                </div>
                <div>
                  <span className="text-gray-600">Gender:</span>
                  <div className="font-semibold capitalize">{formData.gender}</div>
                </div>
                <div>
                  <span className="text-gray-600">Priority:</span>
                  <div className="font-semibold capitalize">{products.find(p => p.id === formData.priority)?.name}</div>
                </div>
                <div>
                  <span className="text-gray-600">Coverage:</span>
                  <div className="font-semibold">${formData.coverageAmount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">State:</span>
                  <div className="font-semibold">{formData.state}</div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">An agent will contact you shortly.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Insurance Calculator - Step {currentStep} of 8</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of 8</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 8 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.email || !formData.phone}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Quote'}
            </Button>
          )}
        </div>

        {/* Helper Text */}
        <div className="text-center text-sm text-gray-500 mt-4">
          Need help? Call us at{' '}
          <a href="tel:916-288-9400" className="text-blue-500 hover:underline">
            916-288-9400
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
