import { ArrowLeft, Scale, Shield, FileText, Users, Phone, Mail, AlertCircle, Clock, Building, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Terms & Conditions - Agora Assurance Solutions"
        description="Review the terms and conditions for using Agora Assurance Solutions' services and website. Understand your rights and responsibilities."
        keywords={['terms and conditions', 'service agreement', 'insurance terms', 'legal conditions', 'user agreement']}
      />
      
      <section className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#15AFF7] mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 touch-manipulation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <motion.div 
            className="relative mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#15AFF7]/10 to-blue-600/10 rounded-3xl transform rotate-1 scale-105"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 transform -rotate-1">
              <motion.div className="text-center" variants={itemVariants}>
                <div className="inline-block mb-4 px-4 py-2 bg-[#15AFF7]/10 text-[#15AFF7] rounded-full text-sm font-medium">
                  <Scale className="inline-block w-4 h-4 mr-2" />
                  Terms & Conditions
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Terms & Conditions
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  These terms and conditions outline the rules and regulations for the use of Agora Assurance Solutions' services and website.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Table of Contents */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <Card className="sticky top-24 border-2 border-gray-100 hover:border-[#15AFF7]/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Table of Contents</h3>
                  <nav className="space-y-2">
                    {[
                      { id: 'acceptance', title: 'Acceptance of Terms' },
                      { id: 'definitions', title: 'Definitions' },
                      { id: 'services', title: 'Services Description' },
                      { id: 'user-obligations', title: 'User Obligations' },
                      { id: 'insurance-process', title: 'Insurance Process' },
                      { id: 'fees-payments', title: 'Fees & Payments' },
                      { id: 'disclaimers', title: 'Disclaimers' },
                      { id: 'limitations', title: 'Limitations of Liability' },
                      { id: 'indemnification', title: 'Indemnification' },
                      { id: 'termination', title: 'Termination' },
                      { id: 'governing-law', title: 'Governing Law' },
                      { id: 'sms-communications', title: 'SMS Communications' },
                      { id: 'contact-us', title: 'Contact Us' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-[#15AFF7] transition-colors py-1"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="prose prose-lg max-w-none">
                
                <motion.section id="acceptance" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-[#15AFF7] bg-gradient-to-r from-[#15AFF7]/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Scale className="w-6 h-6 text-[#15AFF7] mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        By accessing and using the services provided by Agora Assurance Solutions ("Company," "we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        If you do not agree to abide by the above, please do not use our services. Your continued use of our services following the posting of changes to these terms will mean you accept those changes.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="definitions" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 text-green-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">2. Definitions</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">"Services"</h3>
                          <p className="text-gray-600">Insurance consultation, policy comparison, application assistance, and related insurance services provided by Agora Assurance Solutions.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">"Client" or "You"</h3>
                          <p className="text-gray-600">Any individual or entity that uses our services or accesses our website.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">"Website"</h3>
                          <p className="text-gray-600">The Agora Assurance Solutions website and all associated digital platforms.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">"Insurance Carriers"</h3>
                          <p className="text-gray-600">Third-party insurance companies with whom we have partnerships or through whom we facilitate insurance policies.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="services" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-purple-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">3. Services Description</h2>
                      </div>
                      <p className="text-gray-600 mb-4">Agora Assurance Solutions provides the following services:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Insurance consultation and advice</li>
                        <li>Policy comparison and analysis</li>
                        <li>Application assistance and processing</li>
                        <li>Claims support and guidance</li>
                        <li>Risk assessment and recommendation</li>
                        <li>Ongoing policy management and support</li>
                      </ul>
                      <p className="text-gray-600 font-medium">
                        We act as an intermediary between clients and insurance carriers. Final policy terms and conditions are determined by the insurance carrier, not by Agora Assurance Solutions.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="user-obligations" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-orange-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">4. User Obligations</h2>
                      </div>
                      <p className="text-gray-600 mb-4">As a user of our services, you agree to:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Provide accurate and complete information</li>
                        <li>Update us promptly of any changes to your information</li>
                        <li>Cooperate with underwriting and application processes</li>
                        <li>Pay all premiums and fees as required</li>
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Not misrepresent any material facts</li>
                        <li>Maintain the confidentiality of your account information</li>
                      </ul>
                      <p className="text-gray-600 font-medium text-red-600">
                        Failure to provide accurate information may result in policy denial, cancellation, or claims rejection.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="insurance-process" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Building className="w-6 h-6 text-blue-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">5. Insurance Process</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Application Process</h3>
                          <p className="text-gray-600">We assist with insurance applications but do not guarantee approval. Final decisions rest with the insurance carrier.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Underwriting</h3>
                          <p className="text-gray-600">Insurance carriers may require medical exams, financial documentation, or other information during underwriting.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Policy Issuance</h3>
                          <p className="text-gray-600">Policies are issued by insurance carriers, not by Agora Assurance Solutions. We act as an intermediary in this process.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Claims</h3>
                          <p className="text-gray-600">Claims are processed by insurance carriers. We provide support and guidance throughout the claims process.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="fees-payments" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-6 h-6 text-yellow-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">6. Fees and Payments</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Service Fees</h3>
                          <p className="text-gray-600">Our services are typically provided at no direct cost to clients. We receive compensation from insurance carriers for successful policy placements.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Premium Payments</h3>
                          <p className="text-gray-600">Insurance premiums are paid directly to insurance carriers or through approved payment processors. We may facilitate premium payments but are not responsible for payment processing failures.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Refunds</h3>
                          <p className="text-gray-600">Refund policies are determined by insurance carriers. We will assist with refund requests but cannot guarantee outcomes.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="disclaimers" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">7. Disclaimers</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">No Guarantees</h3>
                          <p className="text-gray-600">We do not guarantee insurance approval, specific rates, or claim outcomes. Insurance decisions are made by carriers based on their underwriting guidelines.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Information Accuracy</h3>
                          <p className="text-gray-600">While we strive to provide accurate information, insurance terms, rates, and availability are subject to change. Always refer to official policy documents for definitive terms.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900">Third-Party Content</h3>
                          <p className="text-gray-600">Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these sites.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="limitations" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Scale className="w-6 h-6 text-indigo-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">8. Limitations of Liability</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        To the fullest extent permitted by law, Agora Assurance Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Our total liability to you for all damages, losses, and causes of action shall not exceed the amount of fees paid to us by you in the twelve (12) months preceding the claim.
                      </p>
                      <p className="text-gray-600 font-medium">
                        Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="indemnification" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-teal-500 bg-gradient-to-r from-teal-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-teal-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">9. Indemnification</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        You agree to defend, indemnify, and hold harmless Agora Assurance Solutions, its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from:
                      </p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Your use of our services</li>
                        <li>Your violation of any term of these conditions</li>
                        <li>Your violation of any third-party right</li>
                        <li>Any claim that your information caused damage to a third party</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="termination" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-pink-500 bg-gradient-to-r from-pink-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-pink-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">10. Termination</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Either party may terminate the service relationship at any time with written notice. Upon termination, your right to use our services will cease immediately.
                      </p>
                      <p className="text-gray-600 mb-4">
                        We reserve the right to terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
                      </p>
                      <p className="text-gray-600">
                        Termination of our services does not affect existing insurance policies, which remain in effect according to their terms with the insurance carrier.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="governing-law" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-gray-500 bg-gradient-to-r from-gray-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Building className="w-6 h-6 text-gray-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">11. Governing Law</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        These terms and conditions are governed by and construed in accordance with the laws of the state where Agora Assurance Solutions is licensed to operate, without regard to conflict of law principles.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Any legal action or proceeding relating to these terms shall be brought exclusively in the courts of competent jurisdiction in our primary business location.
                      </p>
                      <p className="text-gray-600">
                        If any provision of these terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="sms-communications" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-cyan-500 bg-gradient-to-r from-cyan-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-cyan-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">12. SMS Communications & Text Messaging</h2>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        By opting in to SMS communications from Agora Assurance Solutions, you agree to the following terms regarding text messaging:
                      </p>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Types of Messages</h3>
                      <p className="text-gray-600 mb-4">We may send the following types of SMS messages with your consent:</p>
                      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                        <li>Appointment reminders and scheduling confirmations</li>
                        <li>Policy updates and renewal notifications</li>
                        <li>Insurance quote information and follow-ups</li>
                        <li>Marketing and promotional messages (only with explicit opt-in)</li>
                      </ul>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Opt-Out Instructions</h3>
                      <p className="text-gray-600 mb-4">
                        You may opt out of receiving SMS messages at any time by replying <strong>STOP</strong> to any text message you receive from us. Upon opting out, you will receive a confirmation message and no further SMS messages will be sent unless you re-subscribe.
                      </p>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Customer Support</h3>
                      <p className="text-gray-600 mb-4">
                        For assistance with SMS communications, reply <strong>HELP</strong> to any message or contact us at <a href="tel:+19166595663" className="text-[#15AFF7] hover:underline">(916) 659-5663</a> or <a href="mailto:info@agoraassurancesolutions.com" className="text-[#15AFF7] hover:underline">info@agoraassurancesolutions.com</a>.
                      </p>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Message & Data Rates</h3>
                      <p className="text-gray-600 mb-4">
                        Message frequency may vary. Standard message and data rates may apply depending on your mobile carrier and plan. Agora Assurance Solutions is not responsible for any charges incurred from your carrier.
                      </p>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Carrier Liability Disclaimer</h3>
                      <p className="text-gray-600 mb-4">
                        Mobile carriers are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission by your mobile carrier and network availability.
                      </p>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Age Restriction</h3>
                      <p className="text-gray-600 mb-4">
                        You must be at least 18 years of age to opt in to our SMS communications program. By opting in, you confirm that you are 18 years of age or older.
                      </p>

                      <p className="text-gray-600">
                        For more information about how we handle your mobile information, please review our{' '}
                        <Link to="/privacy" className="text-[#15AFF7] hover:underline">Privacy Policy</Link>.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="contact-us" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-[#15AFF7] bg-gradient-to-r from-[#15AFF7]/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-[#15AFF7] mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">13. Contact Us</h2>
                      </div>
                      <p className="text-gray-600 mb-6">
                        If you have any questions about these Terms and Conditions, please contact us:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-[#15AFF7] mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <a href="mailto:info@agoraassurancesolutions.com" className="text-[#15AFF7] hover:underline">
                              info@agoraassurancesolutions.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-[#15AFF7] mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <a href="tel:+19166595663" className="text-[#15AFF7] hover:underline">
                              (916) 659-5663
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsConditions;