import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      window.location.href = '/#contact-info';
      return;
    }
    
    // If we're already on the home page, smooth scroll to contact section
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  if (!isVisible) return null;
  
  return (
    <Button 
      onClick={handleContactClick}
      className="fixed bottom-6 right-6 z-50 bg-[#15AFF7] hover:bg-[#0D94D1] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
    >
      <MessageSquare className="w-6 h-6" />
    </Button>
  );
};
export default FloatingContactButton;