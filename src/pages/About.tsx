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
              <h2 className="text-3xl font-bold mb-8 text-center">Leadership with Vision</h2>
              
              {/* Row 1: Kevin Jenson - Featured CEO */}
              <div className="flex justify-center mb-12">
                <div className="relative group cursor-pointer max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/10 to-blue-600/10 rounded-2xl scale-105 transition-all duration-300"></div>
                  <div className="relative bg-white rounded-xl border border-gray-200 p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 min-h-[380px] flex flex-col">
                    <div className="flex justify-center mb-6">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-[#15AFF7]/30">
                        <img alt="Kevin Jenson - Founder & CEO" className="w-full h-full object-cover" src="https://storage.googleapis.com/msgsndr/TLhrYb7SRrWrly615tCI/media/686eb76d038ba82a1245496a.jpeg" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Kevin Jenson</h3>
                      <p className="text-[#15AFF7] font-semibold text-lg mb-4">Founder & CEO</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                        With nearly two decades in life insurance and annuities—including executive leadership at Quility—Kevin founded Agora in 2025 to reinvent the client experience with technology, speed, and service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Benjamin, Olga, Jeff */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
                {/* Benjamin */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-blue-500/20">
                    <img alt="Benjamin Schroeder" className="w-full h-full object-cover" src="/lovable-uploads/8a8c0896-4865-4bb8-aa18-10e30d79d044.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Benjamin Schroeder</h3>
                  <p className="text-blue-500 font-medium mb-3 text-sm">Director of Communications</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    A skilled strategist with a background in coaching and corporate leadership.
                  </p>
                </div>

                {/* Olga */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-purple-500/20">
                    <img alt="Olga Lomova" className="w-full h-full object-cover" src="/lovable-uploads/a2fbd740-44fc-4440-90f2-d0ea3ac39d55.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Olga Lomova</h3>
                  <p className="text-purple-500 font-medium mb-3 text-sm">Chief Strategy Officer</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    An immigrant entrepreneur with deep expertise in financial marketing.
                  </p>
                </div>

                {/* Jeff */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-orange-500/20">
                    <img alt="Jeff Utley" className="w-full h-full object-cover" src="/lovable-uploads/4020c004-3f22-4c03-891b-11e71f0bffbc.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Jeff Utley</h3>
                  <p className="text-orange-500 font-medium mb-3 text-sm">Director of Advanced Markets</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    A distinguished 25+ year veteran from New York Life and MassMutual.
                  </p>
                </div>
              </div>

              {/* Row 3: Sean, John, Tonya */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
                {/* Sean */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-emerald-500/20">
                    <img alt="Sean Fogelson" className="w-full h-full object-cover" src="/lovable-uploads/6cf856c2-ebee-49a3-85c9-23f3905aa18b.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Sean Fogelson</h3>
                  <p className="text-emerald-500 font-medium mb-3 text-sm">National Sales Director</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    Deep expertise in sales strategy and team development.
                  </p>
                </div>

                {/* John */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-indigo-500/20">
                    <img alt="John Hyman" className="w-full h-full object-cover" src="/lovable-uploads/4f729cbe-cd65-4873-bfa1-27e7df8b3d85.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">John Hyman</h3>
                  <p className="text-indigo-500 font-medium mb-3 text-sm">Senior Advisor</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    Seasoned insurance professional with extensive advisory experience.
                  </p>
                </div>

                {/* Tonya */}
                <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[350px] flex flex-col">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-purple-500/20">
                    <img alt="Tonya Melson" className="w-full h-full object-cover" src="/lovable-uploads/3c7a3fb0-824b-4cd7-9e6f-6c247e91bae1.png" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Tonya Melson</h3>
                  <p className="text-purple-600 font-medium mb-3 text-sm">Senior Insurance Professional</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    Over 20 years bridging healthcare and insurance expertise.
                  </p>
                </div>
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