import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Target, Heart, Users, MapPin, MousePointer, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AnimatedCounter from "@/components/ui/animated-counter";
import PageLayout from "@/components/PageLayout";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <section className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 via-transparent to-blue-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#15AFF7] to-blue-600 bg-clip-text text-transparent">
                About Agora Assurance Solutions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing the insurance industry through transparency, innovation, and genuine care for every family we serve.
              </p>
            </motion.div>

            {/* Leadership Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-12 text-center">Leadership with Vision</h2>
              
              {/* Row 1: Kevin Jenson - Centered */}
              <div className="flex justify-center mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="w-full max-w-sm"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/10 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-[#15AFF7]/30">
                              <img alt="Kevin Jenson - Founder & CEO" className="w-full h-full object-cover" src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Kevin Jenson</h3>
                            <p className="text-[#15AFF7] font-semibold text-base mb-4">Founder & CEO</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              With nearly two decades in life insurance and annuities—including executive leadership at Quility—Kevin founded Agora in 2025 to reinvent the client experience.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-[#15AFF7] group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" alt="Kevin Jenson" className="w-24 h-24 rounded-full object-cover" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Kevin Jenson</h2>
                            <p className="text-[#15AFF7] text-xl font-semibold">Founder & CEO</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Kevin Jenson's journey from the baseball diamond to the boardroom is a testament to his unyielding drive and visionary leadership. With nearly two decades in life insurance and annuities, Kevin has revolutionized the industry and propelled agencies to new heights.</p>
                          <p>As President and CEO of Asurea Wholesale, Kevin led remarkable growth in life and annuity sales, culminating in a strategic merger that birthed Quility Wholesale in 2020. As a founding shareholder and Senior Vice President, he drove seamless transitions and continued success.</p>
                          <p>In 2024, Kevin founded Agora Assurance Solutions to usher in the next era of consumer education, leveraging innovative marketing programs and cutting-edge technology to elevate industry standards.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>

              {/* Row 2: Benjamin, Olga, Jeff */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto">
                {/* Benjamin Schroeder */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-blue-500/30">
                              <img alt="Benjamin Schroeder" className="w-full h-full object-cover object-top" src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Benjamin Schroeder</h3>
                            <p className="text-blue-500 font-semibold text-base mb-4">Director of Communications</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              A skilled strategist with a background in coaching and corporate leadership, Ben ensures our mission stays aligned across every channel.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" alt="Benjamin Schroeder" className="w-24 h-24 rounded-full object-cover object-top" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Benjamin Schroeder</h2>
                            <p className="text-blue-500 text-xl font-semibold">Director of Communications</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Benjamin Schroeder serves as the Director of Communications at Agora Assurance Solutions, where he spearheads strategic communication initiatives that drive organizational growth and foster meaningful partnerships.</p>
                          <p>With over 15 years of experience in strategic communications and coaching, Benjamin combines deep understanding of corporate dynamics with a passion for transforming business narratives through collaborative leadership.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Olga Lomova */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-purple-500/30">
                              <img alt="Olga Lomova" className="w-full h-full object-cover object-top" src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Olga Lomova</h3>
                            <p className="text-purple-500 font-semibold text-base mb-4">Chief Strategy Officer</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              An immigrant entrepreneur with deep expertise in financial marketing, Olga leads Agora's growth with passion for inclusion and innovation.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" alt="Olga Lomova" className="w-24 h-24 rounded-full object-cover object-top" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Olga Lomova</h2>
                            <p className="text-purple-500 text-xl font-semibold">Chief Strategy Officer</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Olga Lomova serves as the Chief Strategy Officer at Agora Assurance Solutions, where she spearheads strategic initiatives that drive growth and innovation. With over 10 years of experience in Online Marketing and Financial Services, Olga combines deep understanding of technology-driven market dynamics with a passion for transforming visionary ideas into actionable plans.</p>
                          <p>Olga migrated to the United States in 1998 with her family, fleeing Christian persecution from the Soviet Union. Her worldwide connections and strategic acumen have been instrumental in creating partnerships which have built an ecosystem for consumers nationwide to make better informed decisions.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Jeff Utley */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-orange-500/30">
                              <img alt="Jeff Utley" className="w-full h-full object-cover object-center" src="/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Jeff Utley</h3>
                            <p className="text-orange-500 font-semibold text-base mb-4">Director of Advanced Markets</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              A distinguished 25+ year veteran from New York Life and MassMutual, Jeff brings unparalleled expertise in advanced financial planning.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png" alt="Jeff Utley" className="w-24 h-24 rounded-full object-cover object-center" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Jeff Utley</h2>
                            <p className="text-orange-500 text-xl font-semibold">Director of Advanced Markets</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Jeff Utley brings over 25 years of distinguished experience from premier financial institutions including New York Life and MassMutual. As Director of Advanced Markets, he specializes in sophisticated financial planning strategies and client relationship management.</p>
                          <p>Jeff's expertise spans comprehensive estate planning, business succession strategies, and advanced insurance solutions, making him an invaluable resource for high-net-worth clients and complex financial situations.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>

              {/* Row 3: Sean, John, Tonya */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Sean Fogelson */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-emerald-500/30">
                              <img alt="Sean Fogelson" className="w-full h-full object-cover object-center" src="/lovable-uploads/6cf856c2-ebee-49a3-85c9-23f3905aa18b.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Sean Fogelson</h3>
                            <p className="text-emerald-500 font-semibold text-base mb-4">National Sales Director</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              With deep expertise in sales strategy and team development, Sean drives national growth while fostering excellence and continuous improvement.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/6cf856c2-ebee-49a3-85c9-23f3905aa18b.png" alt="Sean Fogelson" className="w-24 h-24 rounded-full object-cover object-center" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Sean Fogelson</h2>
                            <p className="text-emerald-500 text-xl font-semibold">National Sales Director</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Sean Fogelson serves as National Sales Director at Agora Assurance Solutions, where he leads sales strategy and team development initiatives across the country. With extensive experience in building high-performing sales organizations, Sean drives growth while maintaining the highest standards of client service.</p>
                          <p>Sean's approach combines data-driven sales methodologies with a deep commitment to agent development and training, ensuring sustainable growth and exceptional client outcomes.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* John Hyman */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-700/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-indigo-500/30">
                              <img alt="John Hyman" className="w-full h-full object-cover object-center" src="/lovable-uploads/4f729cbe-cd65-4873-bfa1-27e7df8b3d85.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">John Hyman</h3>
                            <p className="text-indigo-500 font-semibold text-base mb-4">Senior Advisor</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              A seasoned insurance professional with extensive experience in client advisory services and strategic planning guidance.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/4f729cbe-cd65-4873-bfa1-27e7df8b3d85.png" alt="John Hyman" className="w-24 h-24 rounded-full object-cover object-center" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">John Hyman</h2>
                            <p className="text-indigo-500 text-xl font-semibold">Senior Advisor</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>John Hyman serves as Senior Advisor at Agora Assurance Solutions, bringing decades of experience in insurance and financial services. His expertise spans client advisory services, strategic planning, and comprehensive risk management solutions.</p>
                          <p>John's consultative approach and deep industry knowledge make him an invaluable resource for both clients and the internal team, ensuring strategic decisions are grounded in practical experience and market insight.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Tonya Melson */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-2xl scale-105 transition-all duration-300"></div>
                        <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
                          <div className="flex justify-center mb-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-purple-500/30">
                              <img alt="Tonya Melson" className="w-full h-full object-cover object-center" src="/lovable-uploads/3c7a3fb0-824b-4cd7-9e6f-6c247e91bae1.png" />
                            </div>
                          </div>
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tonya Melson</h3>
                            <p className="text-purple-600 font-semibold text-base mb-4">Senior Insurance Professional</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                              Over 20 years bridging healthcare and insurance, Tonya brings unique insights to help families understand their protection needs.
                            </p>
                            <Button variant="outline" className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                              Read Full Bio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <img src="/lovable-uploads/3c7a3fb0-824b-4cd7-9e6f-6c247e91bae1.png" alt="Tonya Melson" className="w-24 h-24 rounded-full object-cover object-center" />
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">Tonya Melson</h2>
                            <p className="text-purple-600 text-xl font-semibold">Senior Insurance Professional</p>
                          </div>
                        </div>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>Tonya Melson is a seasoned insurance professional with over 20 years of managerial and clinical experience, uniquely blending expertise in business operations and patient care. From 2007 through 2023, Tonya successfully managed medical office operations while contributing directly to patient care.</p>
                          <p>Her healthcare background provides invaluable perspective on the critical importance of proper protection for families, allowing her to help clients understand their options and make informed decisions with confidence and compassion.</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>
            </motion.div>

            {/* By the Numbers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">By the Numbers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-[#15AFF7] mb-2">
                    <AnimatedCounter end={20} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">years of combined experience</div>
                </div>
                <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={500} suffix="M+" />
                  </div>
                  <div className="text-gray-600 text-sm">in benefits created for families</div>
                </div>
                <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    <AnimatedCounter end={10000} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">lives protected nationwide</div>
                </div>
                <div className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    <AnimatedCounter end={100} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">business and carrier partnerships</div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <Link to="/careers" className="group inline-flex items-center px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-200 shadow-lg font-medium cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95">
                Join Our Team
                <MousePointer className="ml-2 w-4 h-4 group-hover:animate-pulse transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;