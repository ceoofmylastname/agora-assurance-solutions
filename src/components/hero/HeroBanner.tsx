import { Calculator, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import heroFamilyProtection from "@/assets/hero-family-protection.webp";
import { OptimizedImage } from "@/components/OptimizedImage";

const HeroBanner = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="banner-container bg-[#15AFF7] relative overflow-hidden h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] w-full">
      <div className="absolute inset-0 bg-[#15AFF7] w-full">
        <OptimizedImage
          src={heroFamilyProtection}
          alt="Happy family of four - parents and two children enjoying time together outdoors, representing family protection and security"
          className="w-full h-full opacity-70"
          priority={true}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABAMCBf/EACUQAAIBAwMEAwEBAAAAAAAAAAECEQADIQQSMUEFUWETInGBkf/EABYBAQEBAAAAAAAAAAAAAAAAAAIDBP/EABwRAAICAwEBAAAAAAAAAAAAAAABAhEDEiExQf/aAAwDAQACEQMRAD8A5/S6epKmppLam2gO4QfEgZcnHH8VKsNQ9q6zK0MJwQcYr0/TVNsIERURFChRgAV5j/kL2itPqzqEKlLrbgBDLzgfFehGVK0VQQAgVTUan7ySjJPFaYiZgJntRh3bsKtpybUcKQBBV6uJpSq7WQqf4/6itKRsQwPFK+T+xJv0lOKaG4LSyMn3z/lEoKVqnBOHF//Z"
          width={1920}
          height={1080}
          sizes="100vw"
          mobilePosition="center"
          desktopPosition="center top"
          mobileAspectRatio="4/3"
          desktopAspectRatio="16/9"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
      </div>
      
      <div className="banner-overlay bg-transparent pt-8 sm:pt-16 md:pt-20 lg:pt-28 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-4xl text-center animate-fade-in">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight break-words px-2">
              Cut the Chaos. Get Covered.
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light px-4 sm:px-6 mt-2 sm:mt-4">
              We're rewriting the insurance experience—no confusing terms, no endless forms, just fast, reliable coverage that puts you in control from the very first click.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center items-center px-4 sm:px-0">
              <button 
                className="w-full sm:w-auto min-h-[52px] px-6 sm:px-8 py-3 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-semibold touch-manipulation active:scale-95" 
                onClick={() => window.open('https://quickstart.assurity.com/agoraassurancesolutions', '_blank')}
              >
                Get Instant Quote
                <Calculator className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                className="w-full sm:w-auto min-h-[52px] px-6 sm:px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-300/20 flex items-center justify-center group text-sm sm:text-base font-semibold border-2 border-white touch-manipulation active:scale-95" 
                onClick={() => navigate('/booking')}
              >
                Book Free Appointment
                <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;