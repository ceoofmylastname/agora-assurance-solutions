
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, Shield, Building, Calculator, BarChart3, FileText, CheckCircle, MessageSquare, RefreshCcw } from "lucide-react";
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/ui/animated-counter";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [currentSprint, setCurrentSprint] = useState(1);
  const totalSprints = 3;
  const isMobile = useIsMobile();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
          (entry.target as HTMLElement).style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.feature-item');
      elements.forEach(el => {
        if (!el.classList.contains('animate-slide-in')) {
          (el as HTMLElement).style.opacity = '0';
          observer.observe(el);
        }
      });
    }
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const animateProgress = () => {
      setProgressValue(0);
      interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentSprint(prev => prev < totalSprints ? prev + 1 : 1);
              animateProgress();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };
    animateProgress();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const stepFlowItems = [{
    icon: <Search className="h-10 w-10 text-gray-700" />,
    title: "Smart Comparison Engine",
    description: "AI-powered tool that instantly compares plans from 100+ carriers"
  }, {
    icon: <Shield className="h-10 w-10 text-gray-700" />,
    title: "Licensed Expert Guidance",
    description: "State-licensed advisors who advocate for your best interests, not commissions"
  }, {
    icon: <Building className="h-10 w-10 text-gray-700" />,
    title: "Trusted Carrier Network",
    description: "A-rated insurance companies with proven financial stability"
  }];
  const sprintPhases = [{
    name: "Quote",
    icon: <Calculator className="h-4 w-4" />
  }, {
    name: "Compare",
    icon: <BarChart3 className="h-4 w-4" />
  }, {
    name: "Apply",
    icon: <FileText className="h-4 w-4" />
  }, {
    name: "Protect",
    icon: <Shield className="h-4 w-4" />
  }];

  return <>
      <section id="technology" className="bg-gray-50 py-10 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Our Process
            </div>
            <h2 className="text-3xl font-bold mb-4">How Agora Makes Insurance Simple</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From initial quote to final coverage, we've streamlined every step to give you transparent, 
              fast, and reliable insurance protection.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-10 transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stepFlowItems.map((item, index) => <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-gray-50 rounded-full p-4 mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 shadow-lg">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                      {index === 0 && <p className="text-xs text-gray-500">Our AI analyzes your profile against hundreds of insurance plans to find your perfect match in seconds.</p>}
                      {index === 1 && <p className="text-xs text-gray-500">Licensed professionals who are legally bound to put your interests first, with no carrier bias or commission pressure.</p>}
                      {index === 2 && <p className="text-xs text-gray-500">We only work with financially stable, A-rated carriers with proven track records of paying claims.</p>}
                    </div>
                  </HoverCardContent>
                </HoverCard>)}
            </div>

            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>
              
              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-10 shadow-md">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">Your Insurance Journey</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">From quote to coverage in 24 hours</span>
                    <RefreshCcw className="h-5 w-5 text-gray-600 animate-rotate-slow" />
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">Transparent process with real-time updates at every step</p>
                
                <div className="relative mb-2">
                  <Progress value={progressValue} className="h-3 bg-gray-200" />
                </div>
                
                <div className={cn("grid gap-1 mt-4", isMobile ? "grid-cols-2 gap-y-2" : "grid-cols-4")}>
                  {sprintPhases.map((phase, index) => <div key={index} className={cn("text-center p-2 rounded transition-all", progressValue >= index / sprintPhases.length * 100 && progressValue < (index + 1) / sprintPhases.length * 100 ? "bg-blue-50 border border-blue-100" : "bg-gray-50")}>
                      <div className="flex flex-col items-center">
                        <div className={cn("rounded-full p-1 mb-1", progressValue >= index / sprintPhases.length * 100 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500")}>
                          {phase.icon}
                        </div>
                        <span className="text-xs font-medium">{phase.name}</span>
                      </div>
                    </div>)}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-2">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-2 shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Real-time updates and transparent communication</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-2 sm:mt-0">
                    <span className="mr-2">Continuous improvement</span>
                    <div className="flex space-x-1">
                      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></span>
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse animation-delay-400"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-16 mb-10">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-400 rounded-full p-1">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>
              
              <div className="md:hidden flex justify-center items-center h-full">
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
                <div className="bg-gray-400 rounded-full p-1 mx-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="w-1/3 h-0.5 bg-gray-300"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-8 max-w-xl mx-auto text-center shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-black/10 rounded-full animate-pulse-slow"></div>
                <div className="relative bg-white rounded-full p-4 border border-gray-200 shadow-md">
                  <Shield className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Protected & Secure</h3>
              <p className="text-gray-700">Your family's financial future is now protected</p>
              <div className="flex justify-center mt-4 space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300 animate-pulse"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-500 animate-pulse animation-delay-200"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-700 animate-pulse animation-delay-400"></span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button onClick={scrollToContact} className="inline-flex items-center px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group w-full sm:w-auto justify-center">
                Get Your Free Quote
                <MessageSquare className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>;
};
export default Features;
