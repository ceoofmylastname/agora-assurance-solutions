import { memo } from "react";
import { Shield, Calculator, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import AnimatedCounter from "@/components/ui/animated-counter";

const OptimizedWhyAgora = memo(() => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="why-agora" ref={ref} className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Why should I choose Agora Assurance Solutions?
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            With 50+ years combined experience, 25,000+ lives protected, and $500M+ in tax-free benefits created, we offer technology-driven comparison tools and licensed expert guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className={`bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              {isInView && <AnimatedCounter end={50} suffix="+" />} Years
            </h3>
            <p className="text-gray-700">Combined experience protecting families and building financial security</p>
          </div>
          
          <div className={`bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              {isInView && <AnimatedCounter end={25000} suffix="+" />}
            </h3>
            <p className="text-gray-700">
              Lives protected through our comprehensive insurance and financial solutions
            </p>
          </div>
          
          <div className={`bg-blue-50 p-6 rounded-xl border border-blue-200 text-center hover:bg-blue-100 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#15AFF7]" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              {isInView && <AnimatedCounter end={500} suffix="M" prefix="$" />}
            </h3>
            <p className="text-gray-700">
              In tax-free benefits created for our clients and their families
            </p>
          </div>
        </div>
        
        <div className="mb-12">
          <div className={`text-center mb-8 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What makes Agora different from other insurance companies?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our unique technology-driven approach combines AI comparison tools with independent consumer advocacy and state-licensed expertise for transparent, personalized service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Calculator className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Technology-Driven</h4>
                  <p className="text-gray-700">We leverage AI and proprietary systems to compare a wide range of products at once, giving you clarity without overwhelm.</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Shield className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Consumer-First Advocacy</h4>
                  <p className="text-gray-700">As an independent consumer advocate, our mission is centered on transparency, not commission.</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1400ms' }}>
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <Award className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Licensed Experts</h4>
                  <p className="text-gray-700">We connect you directly to vetted, state-regulated advisors—no bots, no middlemen.</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1600ms' }}>
              <div className="flex items-start">
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                  <CheckCircle className="w-6 h-6 text-[#15AFF7]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Peace of Mind</h4>
                  <p className="text-gray-700">Over {isInView && <AnimatedCounter end={50} className="text-gray-700" />} years of combined experience, {isInView && <AnimatedCounter end={100} suffix="+" className="text-gray-700" />} business partners, and proven results you can trust.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`text-center mt-10 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1800ms' }}>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all group font-medium"
            >
              Get Your Personalized Quote Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedWhyAgora.displayName = 'OptimizedWhyAgora';

export default OptimizedWhyAgora;