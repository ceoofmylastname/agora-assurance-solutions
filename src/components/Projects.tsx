import { useState, useRef, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    id: 1,
    title: "Life Insurance Protection",
    brand: "The Johnson Family", 
    description: "Sarah secured $500,000 in life insurance coverage for just $45/month, ensuring her children's future is protected no matter what happens.",
    tags: ["Life Insurance", "Family Protection", "Affordable Coverage", "Peace of Mind"],
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    isFeatured: true,
    link: "/term-life",
    details: `
      Sarah Johnson, a working mother of two, needed comprehensive life insurance but was worried about high premiums. Through Agora's comparison platform, she discovered affordable term life options from top-rated carriers. Features include instant quotes, no medical exam options, and flexible coverage amounts. Benefits: $500,000 coverage for under $50/month, application completed in 15 minutes, policy issued within 48 hours, and peace of mind knowing her family is financially protected.
    `
  },
  {
    id: 2,
    title: "Mortgage Protection Success",
    brand: "The Martinez Family",
    description: "Carlos found mortgage protection insurance that costs 60% less than what his bank offered, securing his family's home for just $32/month.",
    tags: ["Mortgage Protection", "Home Security", "Cost Savings", "Family Safety"],
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    link: "/mortgage-protection"
  },
  {
    id: 3,
    title: "Final Expense Planning",
    brand: "Robert & Mary Thompson",
    description: "This retired couple secured $25,000 in final expense coverage with no medical exams required, ensuring their children won't face financial burden.",
    tags: ["Final Expense", "Senior Coverage", "No Medical Exam", "Guaranteed Acceptance"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    link: "/final-expense"
  },
  {
    id: 4,
    title: "Retirement Annuity Success",
    brand: "David Chen",
    description: "David secured a guaranteed 5.2% annual return on his retirement savings through a fixed annuity, ensuring steady income for life.",
    tags: ["Annuities", "Retirement Planning", "Guaranteed Income", "Financial Security"],
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    link: "/annuities"
  },
  {
    id: 5,
    title: "Small Business Protection",
    brand: "Green Valley Landscaping",
    description: "This family business saved $3,600 annually on their business insurance while increasing their liability coverage by 50%.",
    tags: ["Business Insurance", "Liability Coverage", "Cost Reduction", "Small Business"],
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    link: "/business-insurance"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject(prev => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: 0.2
    });
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveProject(prev => (prev + 1) % projects.length);
    } else if (isRightSwipe) {
      setActiveProject(prev => (prev - 1 + projects.length) % projects.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === activeProject) return "scale-100 opacity-100 z-20";
    if (index === (activeProject + 1) % projects.length) return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (activeProject - 1 + projects.length) % projects.length) return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };
  
  return <section id="success-stories" ref={projectsRef} className="bg-white py-[50px] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            Customer Success Stories
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Real Solutions, Real Results
          </h2>
          <p className="text-gray-600">
            Discover how Agora Assurance Solutions has helped families and businesses across the country find the perfect insurance coverage at unbeatable prices.
          </p>
          {isMobile && (
            <div className="flex items-center justify-center mt-4 animate-pulse-slow">
              <div className="flex items-center text-blue-500">
                <ChevronLeft size={16} />
                <p className="text-sm mx-1">Swipe to navigate</p>
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="relative h-[550px] overflow-hidden" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`} 
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="overflow-hidden h-[500px] border border-gray-100 shadow-sm hover:shadow-md flex flex-col">
                  <div 
                    className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8)), url(${project.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.brand.toUpperCase()}</h3>
                      <div className="w-12 h-1 bg-white mb-2"></div>
                      <p className="text-white/90 text-sm">{project.title}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-gray-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-blue-600 text-sm font-medium">{project.brand}</p>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs animate-pulse-slow" 
                            style={{ animationDelay: `${idx * 300}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        to={project.link} 
                        className="text-blue-600 flex items-center hover:underline relative overflow-hidden group font-medium"
                        onClick={() => {
                          if (project.link.startsWith('/')) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <span className="relative z-10">Get Your Quote</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {!isMobile && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev - 1 + projects.length) % projects.length)}
                aria-label="Previous success story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110" 
                onClick={() => setActiveProject(prev => (prev + 1) % projects.length)}
                aria-label="Next success story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {projects.map((_, idx) => (
              <button 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === idx ? 'bg-blue-600 w-5' : 'bg-gray-200 hover:bg-gray-300'}`} 
                onClick={() => setActiveProject(idx)}
                aria-label={`Go to success story ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>;
};

export default Projects;
