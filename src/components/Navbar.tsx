import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const logoProps = {
    alt: "Agora Assurance Solutions - Your Independent Insurance Partner",
    title: "Agora Assurance Solutions - Navigate to Homepage",
    className: "h-8 w-auto sm:h-10 md:h-12",
    loading: "eager" as const,
    fetchPriority: "high" as const
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group" onClick={() => window.scrollTo(0, 0)}>
            {isScrolled ? (
              <img 
                src="/lovable-uploads/99f03d19-d521-4882-9c68-a2bbe122b1f9.png" 
                {...logoProps}
              />
            ) : (
              <img 
                src="/lovable-uploads/d80f077b-ae61-4d6f-ac4a-100f2e403fd2.png" 
                {...logoProps}
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Products
              </Link>
              <Link to="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                How It Works
              </Link>
              <Link to="/why-agora" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Why Agora
              </Link>
              <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Blog
              </Link>
              <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Contact
              </Link>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#15AFF7] transition-colors"
                  onClick={() => window.open('tel:+19162889400', '_self')}
                  title="Call Agora Assurance Solutions at (916) 288-9400"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (916) 288-9400
                </button>
                
                <button 
                  className="flex items-center px-4 py-2 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-colors font-medium"
                  onClick={() => navigate('/booking')}
                  title="Book a free consultation with our licensed advisors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Book Free Call
                </button>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#15AFF7] focus:outline-none"
              title={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Home
              </Link>
              <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Products
              </Link>
              <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                How It Works
              </Link>
              <Link to="/why-agora" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Why Agora
              </Link>
              <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Blog
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Contact
              </Link>
              
              <button 
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#15AFF7] transition-colors justify-center"
                onClick={() => window.open('tel:+19162889400', '_self')}
                title="Call Agora Assurance Solutions at (916) 288-9400"
              >
                <Phone className="w-4 h-4 mr-2" />
                (916) 288-9400
              </button>
              
              <button 
                className="flex items-center w-full px-3 py-2 bg-[#15AFF7] text-white rounded-md font-medium justify-center hover:bg-[#0D94D1] transition-colors"
                onClick={() => navigate('/booking')}
                title="Book a free consultation with our licensed advisors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Book Free Call
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
