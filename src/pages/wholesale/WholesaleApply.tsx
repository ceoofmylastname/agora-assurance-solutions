import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import WholesaleShell from '@/components/wholesale/WholesaleShell';
import SEO from '@/components/SEO';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, RateLimiter } from '@/utils/security';
import { AGENCY_SIZES, CARRIERS, US_STATES, VERTICALS, WEEKLY_PRODUCTION } from '@/lib/wholesale';
import { cn } from '@/lib/utils';

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(10, 'Enter a valid phone number').max(30),
  agencyName: z.string().trim().min(1, 'Agency name is required').max(160),
  website: z.string().trim().max(200).optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  agencySize: z.string().min(1, 'Choose your agency size'),
  weeklyProduction: z.string().min(1, 'Choose your weekly production'),
  currentImo: z.string().trim().min(1, 'Tell us who you are contracted through today').max(160),
  carriers: z.array(z.string()).default([]),
  carriersOther: z.string().trim().max(300).optional().or(z.literal('')),
  interests: z.array(z.string()).min(1, 'Pick at least one'),
  goals: z.string().trim().max(2000).optional().or(z.literal('')),
  honeypot: z.string().max(0, 'Bot detected'),
});

type Values = z.infer<typeof schema>;

const limiter = new RateLimiter(3, 10 * 60 * 1000);

const selectClass =
  'flex h-12 w-full rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.75rem_center] pr-10';

const Section = ({ step, title, hint, children }: { step: string; title: string; hint?: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-1">{step}</p>
      <h2 className="ws-display text-xl font-bold text-[#0d2238]">{title}</h2>
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
    {children}
  </section>
);

const WholesaleApply = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', agencyName: '', website: '', state: '',
      agencySize: '', weeklyProduction: '', currentImo: '', carriers: [], carriersOther: '',
      interests: [], goals: '', honeypot: '',
    },
  });

  const onSubmit = async (v: Values) => {
    if (Date.now() - startedAt < 4000) {
      toast({ title: 'Slow down', description: 'Please take a moment to review your answers.', variant: 'destructive' });
      return;
    }
    if (!limiter.isAllowed(v.email.toLowerCase())) {
      toast({ title: 'Too many attempts', description: 'Please wait a few minutes and try again.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('wholesale_applications').insert({
      first_name: sanitizeInput(v.firstName),
      last_name: sanitizeInput(v.lastName),
      email: v.email.trim().toLowerCase(),
      phone: sanitizeInput(v.phone),
      agency_name: sanitizeInput(v.agencyName),
      website: v.website ? sanitizeInput(v.website) : null,
      state: v.state || null,
      agency_size: v.agencySize,
      weekly_production: v.weeklyProduction,
      current_imo: sanitizeInput(v.currentImo),
      carriers: v.carriers,
      carriers_other: v.carriersOther ? sanitizeInput(v.carriersOther) : null,
      interests: v.interests,
      goals: v.goals ? sanitizeInput(v.goals) : null,
      source: 'website',
    });
    setSubmitting(false);
    if (error) {
      console.error('wholesale application failed', error);
      toast({ title: 'Something went wrong', description: 'Your application did not go through. Please try again or email info@agoraassurancesolutions.com.', variant: 'destructive' });
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  return (
    <WholesaleShell dark={false}>
      <SEO
        title="Apply for Agora Wholesale Access"
        description="Tell us about your agency. Approved partners receive a portal login with contracts, technology, leads and tools."
      />
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-3xl">
          <Link to="/wholesale" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Wholesale
          </Link>

          {done ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-12 text-center">
              <CheckCircle2 className="w-14 h-14 text-[#15AFF7] mx-auto mb-4" />
              <h1 className="ws-display text-3xl font-bold text-[#0d2238] mb-3">Application received</h1>
              <p className="text-gray-600 leading-relaxed max-w-lg mx-auto mb-6">
                Thank you. A person on our team reads every application. If your agency is a fit, we will reach out to schedule a call, and once approved your portal invitation arrives by email.
              </p>
              <Link to="/wholesale" className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-lg bg-[#0d2238] text-white font-semibold">
                Back to Wholesale
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#15AFF7] mb-2">Agora Wholesale</p>
                <h1 className="ws-display text-3xl md:text-4xl font-bold text-[#0d2238] mb-2">Apply for access</h1>
                <p className="text-gray-600">About five minutes. Everything you share stays with Agora's review team.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-keep-form noValidate>
                  {/* honeypot */}
                  <FormField control={form.control} name="honeypot" render={({ field }) => (
                    <input {...field} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  )} />

                  <Section step="Step 1 of 5" title="You">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First name</FormLabel><FormControl><Input {...field} autoComplete="given-name" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Last name</FormLabel><FormControl><Input {...field} autoComplete="family-name" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Work email</FormLabel><FormControl><Input type="email" inputMode="email" autoComplete="email" {...field} className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Mobile phone</FormLabel><FormControl><Input type="tel" inputMode="tel" autoComplete="tel" {...field} className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </Section>

                  <Section step="Step 2 of 5" title="Your agency">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="agencyName" render={({ field }) => (
                        <FormItem className="sm:col-span-2"><FormLabel>Agency name</FormLabel><FormControl><Input {...field} autoComplete="organization" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem><FormLabel>Website <span className="text-gray-400 font-normal">(optional)</span></FormLabel><FormControl><Input {...field} inputMode="url" placeholder="https://" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="state" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home state</FormLabel>
                          <FormControl>
                            <select {...field} className={selectClass}>
                              <option value="">Choose a state</option>
                              {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="agencySize" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency size</FormLabel>
                          <FormControl>
                            <select {...field} className={selectClass}>
                              <option value="">How many producers?</option>
                              {AGENCY_SIZES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="weeklyProduction" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weekly production (annual premium)</FormLabel>
                          <FormControl>
                            <select {...field} className={selectClass}>
                              <option value="">Typical week</option>
                              {WEEKLY_PRODUCTION.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="currentImo" render={({ field }) => (
                        <FormItem className="sm:col-span-2"><FormLabel>Current IMO / upline</FormLabel><FormControl><Input {...field} placeholder="Who are you contracted through today?" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </Section>

                  <Section step="Step 3 of 5" title="Carriers you write" hint="Pick everything that applies.">
                    <FormField control={form.control} name="carriers" render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-wrap gap-2">
                          {CARRIERS.map((c) => {
                            const on = field.value.includes(c);
                            return (
                              <button
                                type="button"
                                key={c}
                                onClick={() => field.onChange(toggle(field.value, c))}
                                aria-pressed={on}
                                className={cn(
                                  'min-h-[44px] px-4 rounded-full border text-sm font-medium transition-colors',
                                  on ? 'bg-[#0d2238] border-[#0d2238] text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-500',
                                )}
                              >
                                {c}
                              </button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="carriersOther" render={({ field }) => (
                      <FormItem className="mt-4"><FormLabel>Other carriers</FormLabel><FormControl><Input {...field} placeholder="Anyone we missed, comma separated" className="h-12 text-base" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </Section>

                  <Section step="Step 4 of 5" title="What you want from Agora" hint="Choose one or more of the four verticals.">
                    <FormField control={form.control} name="interests" render={({ field }) => (
                      <FormItem>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {VERTICALS.map((v) => {
                            const on = field.value.includes(v.id);
                            return (
                              <label
                                key={v.id}
                                className={cn(
                                  'flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors',
                                  on ? 'border-[#15AFF7] bg-blue-50' : 'border-gray-200 hover:border-gray-400',
                                )}
                              >
                                <Checkbox checked={on} onCheckedChange={() => field.onChange(toggle(field.value, v.id))} className="mt-1" />
                                <span>
                                  <span className="block font-semibold text-gray-900">{v.name}</span>
                                  <span className="block text-sm text-gray-600">{v.tagline}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </Section>

                  <Section step="Step 5 of 5" title="Anything else" hint="What would make this a win for your agency in the next 90 days?">
                    <FormField control={form.control} name="goals" render={({ field }) => (
                      <FormItem><FormControl><Textarea rows={5} {...field} className="text-base" placeholder="Current pain points, carriers you want, systems you are replacing, lead volume you need..." /></FormControl><FormMessage /></FormItem>
                    )} />
                  </Section>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-gray-500 max-w-md">
                      By applying you agree to be contacted by Agora Assurance Solutions about the Wholesale program. We do not share your information with third parties.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center min-h-[52px] px-8 rounded-lg ws-btn disabled:opacity-60 text-white font-semibold shadow-lg transition-all active:scale-95"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit application <ArrowRight className="ml-2 w-5 h-5" /></>}
                    </button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </WholesaleShell>
  );
};

export default WholesaleApply;
