import { ArrowLeft, Shield, Lock, FileText, Users, Phone, Mail, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
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
        title="Privacy Policy - Agora Assurance Solutions"
        description="Learn how Agora Assurance Solutions protects your personal information and privacy in our comprehensive privacy policy."
        keywords={['privacy policy', 'data protection', 'personal information', 'insurance privacy', 'HIPAA compliance']}
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
                  <Shield className="inline-block w-4 h-4 mr-2" />
                  Privacy Policy
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Your Privacy is Our Priority
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  At Agora Assurance Solutions, we are committed to protecting your personal information and maintaining the highest standards of privacy and security.
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
                      { id: 'introduction', title: 'Introduction' },
                      { id: 'information-collection', title: 'Information We Collect' },
                      { id: 'how-we-use', title: 'How We Use Information' },
                      { id: 'sharing-disclosure', title: 'Sharing & Disclosure' },
                      { id: 'data-security', title: 'Data Security' },
                      { id: 'hipaa-compliance', title: 'HIPAA Compliance' },
                      { id: 'cookies', title: 'Cookies & Tracking' },
                      { id: 'your-rights', title: 'Your Rights' },
                      { id: 'data-retention', title: 'Data Retention' },
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
                
                <motion.section id="introduction" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-[#15AFF7] bg-gradient-to-r from-[#15AFF7]/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-[#15AFF7] mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Agora Assurance Solutions ("we," "our," or "us") is committed to protecting your privacy and maintaining the confidentiality of your personal information. As a licensed insurance agency, we understand the sensitive nature of the information you share with us and take our responsibility to protect it seriously.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any capacity. We are committed to transparency and compliance with all applicable privacy laws and regulations.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="information-collection" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-green-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Personal Information</h3>
                      <p className="text-gray-600 mb-4">We collect personal information that you voluntarily provide to us, including:</p>
                      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                        <li>Contact information (name, address, phone number, email)</li>
                        <li>Date of birth and Social Security Number</li>
                        <li>Financial information (income, assets, debts)</li>
                        <li>Health information (medical history, current health status)</li>
                        <li>Beneficiary information</li>
                        <li>Employment information</li>
                        <li>Insurance application details</li>
                      </ul>

                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Automatically Collected Information</h3>
                      <p className="text-gray-600 mb-4">We also automatically collect certain information when you visit our website:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>IP address and browser information</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Device information and operating system</li>
                        <li>Referring website information</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="how-we-use" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 text-purple-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                      </div>
                      <p className="text-gray-600 mb-4">We use your information for legitimate business purposes, including:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Processing insurance applications and quotes</li>
                        <li>Underwriting and risk assessment</li>
                        <li>Policy administration and claims processing</li>
                        <li>Customer service and support</li>
                        <li>Compliance with legal and regulatory requirements</li>
                        <li>Marketing and communication (with your consent)</li>
                        <li>Website improvement and analytics</li>
                        <li>Fraud prevention and security</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="sharing-disclosure" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-orange-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">4. Sharing and Disclosure</h2>
                      </div>
                      <p className="text-gray-600 mb-4">We may share your information with:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Insurance companies for underwriting and policy issuance</li>
                        <li>Third-party service providers who assist us in our business operations</li>
                        <li>Regulatory authorities when required by law</li>
                        <li>Legal counsel and auditors</li>
                        <li>Medical professionals for health information verification</li>
                        <li>Credit reporting agencies (with your consent)</li>
                      </ul>
                      <p className="text-gray-600 font-medium">
                        We will never sell your personal information to third parties for marketing purposes.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="data-security" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Lock className="w-6 h-6 text-red-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
                      </div>
                      <p className="text-gray-600 mb-4">We implement comprehensive security measures to protect your information:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>SSL encryption for data transmission</li>
                        <li>Secure data storage systems</li>
                        <li>Access controls and authentication</li>
                        <li>Regular security audits and updates</li>
                        <li>Employee training on data protection</li>
                        <li>Incident response procedures</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="hipaa-compliance" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-blue-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">6. HIPAA Compliance</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        When handling protected health information, we comply with the Health Insurance Portability and Accountability Act (HIPAA) and maintain appropriate safeguards to protect your medical information.
                      </p>
                      <p className="text-gray-600">
                        You have the right to request restrictions on how your health information is used and disclosed, and to request copies of your health information that we maintain.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="cookies" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 text-yellow-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">7. Cookies and Tracking Technologies</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        We use cookies and similar technologies to enhance your website experience, analyze usage patterns, and provide personalized content. You can manage your cookie preferences through your browser settings.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="your-rights" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-indigo-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">8. Your Privacy Rights</h2>
                      </div>
                      <p className="text-gray-600 mb-4">You have the right to:</p>
                      <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                        <li>Access your personal information</li>
                        <li>Request corrections to your information</li>
                        <li>Request deletion of your information (subject to legal requirements)</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Request restrictions on information use</li>
                        <li>Receive a copy of your information</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="data-retention" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-teal-500 bg-gradient-to-r from-teal-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 text-teal-500 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">9. Data Retention</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Insurance records may be retained for extended periods as required by law.
                      </p>
                    </CardContent>
                  </Card>
                </motion.section>

                <motion.section id="contact-us" className="mb-12" variants={itemVariants}>
                  <Card className="border-l-4 border-l-[#15AFF7] bg-gradient-to-r from-[#15AFF7]/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-[#15AFF7] mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">10. Contact Us</h2>
                      </div>
                      <p className="text-gray-600 mb-6">
                        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
                            <a href="tel:+19168487907" className="text-[#15AFF7] hover:underline">
                              (916) 848-7907
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

export default PrivacyPolicy;