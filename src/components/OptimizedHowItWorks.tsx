import { memo } from "react";
import { Search, Calculator, UserCheck, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const steps = [
  {
    id: 1,
    title: "Explore Products",
    description: "Browse term life, mortgage protection, final expense, annuities, life settlements, and tax solutions in one place.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Get Instant Quotes",
    description: "Enter a few details, then watch tailored rates from multiple carriers appear—no calls required.",
    icon: <Calculator className="w-8 h-8" />,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Connect with an Advisor",
    description: "If you want personalized advice, schedule a free consult with one of our licensed experts.",
    icon: <UserCheck className="w-8 h-8" />,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Buy & Protect",
    description: "Complete your application online or by phone; our tech ensures fast underwriting and policy delivery.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-[#15AFF7]"
  }
];

const OptimizedHowItWorks = memo(() => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="how-it-works" ref={ref} className="bg-white py-16 md:py-24 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`}>
          <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting the right insurance protection has never been easier. Our streamlined process gets you covered in minutes, not weeks.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`text-center transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white mx-auto shadow-lg hover-scale transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-12 transition-all duration-700 ${isInView ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <div className="bg-gradient-to-r from-[#15AFF7]/10 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of families who trust Agora Assurance for their protection needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
                className="px-6 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-colors font-medium"
              >
                Get an Instant Quote
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Book Free Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedHowItWorks.displayName = 'OptimizedHowItWorks';

export default OptimizedHowItWorks;