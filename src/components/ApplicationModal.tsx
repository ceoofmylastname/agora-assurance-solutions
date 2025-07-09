import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const applicationSchema = z.object({
  referredBy: z.string().min(1, 'Please list who referred you'),
  referredByDirector: z.string().min(1, 'Please select a director'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  state: z.string().min(1, 'Resident state is required'),
  address: z.string().min(1, 'Current address is required'),
  licensed: z.string().min(1, 'Please select licensing status'),
  marketingBudget: z.string().min(1, 'Marketing budget is required'),
  needsCRM: z.string().min(1, 'Please select an option'),
  willingToService: z.string().min(1, 'Please select an option'),
  consent: z.boolean().refine(val => val === true, 'You must consent to continue'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      referredBy: '',
      referredByDirector: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      address: '',
      licensed: '',
      marketingBudget: '',
      needsCRM: '',
      willingToService: '',
      consent: false,
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      form.reset();
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <DialogHeader className="relative pb-6">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Apply to become an Agora Advisor Today
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="referredBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        LIST THE PERSON WHO REFERRED YOU *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px] focus:border-blue-400"
                          placeholder="Enter referrer information..."
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Enter Your First Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Resident State
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="State"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licensed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Are You Currently Licensed
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-400">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="yes" className="text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white">No</SelectItem>
                          <SelectItem value="in-progress" className="text-white">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="needsCRM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Do you need access to a CRM & Quoting Tools?
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-400">
                            <SelectValue placeholder="Yes or No" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="yes" className="text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="referredByDirector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Referred by Director *
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-400">
                            <SelectValue placeholder="Select Director..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="director1" className="text-white">Director 1</SelectItem>
                          <SelectItem value="director2" className="text-white">Director 2</SelectItem>
                          <SelectItem value="director3" className="text-white">Director 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Enter Your Last Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last Name"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Enter Your Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Phone Number"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Current Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Address"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Weekly Marketing Budget?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Amount"
                          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="willingToService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Are you willing to service our online clients and work leads?
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-blue-400">
                            <SelectValue placeholder="Yes or NO" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="yes" className="text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-4 pt-6 border-t border-slate-700">
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-slate-300">
                        I consent to being contacted by Agora Assurance Solutions regarding my inquiry. 
                        I understand that my information will be used in accordance with the privacy policy.
                      </FormLabel>
                      <FormMessage className="text-red-400" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-center text-sm text-slate-400">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
                {" | "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};