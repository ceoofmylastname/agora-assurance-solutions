
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-black")} initial={{
      opacity: 1,
      y: 0
    }} animate={{
      opacity: 1,
      y: 0
    }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png" alt="Agora Assurance Solutions Logo" className={cn("h-8 w-auto", isScrolled ? "" : "brightness-0 invert")} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg text-[#15AFF7] mb-3">Life Insurance</h4>
                          <Link to="/services/term-life" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Term Life Insurance</div>
                            <p className="text-sm text-gray-500">Affordable protection for your family's future</p>
                          </Link>
                          <Link to="/services/whole-life" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Whole Life Insurance</div>
                            <p className="text-sm text-gray-500">Lifelong protection with cash value growth</p>
                          </Link>
                          <Link to="/services/universal-life" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Universal Life Insurance</div>
                            <p className="text-sm text-gray-500">Flexible premiums with investment options</p>
                          </Link>
                          <Link to="/services/indexed-universal-life" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Indexed Universal Life</div>
                            <p className="text-sm text-gray-500">Market-linked growth with downside protection</p>
                          </Link>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg text-[#15AFF7] mb-3">Specialized Protection</h4>
                          <Link to="/services/final-expense" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Final Expense Insurance</div>
                            <p className="text-sm text-gray-500">End-of-life coverage made simple</p>
                          </Link>
                          <Link to="/services/mortgage-protection" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Mortgage Protection</div>
                            <p className="text-sm text-gray-500">Keep your home in the family</p>
                          </Link>
                          <Link to="/services/annuities" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Annuities</div>
                            <p className="text-sm text-gray-500">Guaranteed retirement income solutions</p>
                          </Link>
                          <Link to="/services/life-settlements" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Life Settlements</div>
                            <p className="text-sm text-gray-500">Unlock value from existing policies</p>
                          </Link>
                          <Link to="/services/tax-asset-protection" className="block p-3 space-y-1 rounded-lg hover:bg-gradient-to-r hover:from-[#15AFF7]/10 hover:to-blue-600/10 transition-all duration-300 border border-transparent hover:border-[#15AFF7]/20">
                            <div className="font-medium">Tax & Asset Protection</div>
                            <p className="text-sm text-gray-500">Strategic wealth preservation solutions</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                
                
                <NavigationMenuItem>
                  <Link to="/careers">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Careers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <button onClick={() => scrollToSection('contact')} className={cn("px-4 py-2 rounded-md transition-colors", isScrolled ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600")}>
                    Contact Us
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced for better touch targets */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-4 pt-4 pb-6 space-y-2 shadow-lg overflow-y-auto max-h-screen", isScrolled ? "bg-white" : "bg-black")}>
          <Link to="/" className={cn("block px-4 py-3 rounded-lg text-base font-medium touch-manipulation", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Home
          </Link>
          
          <Link to="/about" className={cn("block px-4 py-3 rounded-lg text-base font-medium touch-manipulation", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            About Us
          </Link>
          
          {/* Services with better mobile UX */}
          <div className="space-y-1">
            <div className={cn("px-4 py-2 text-sm font-semibold", isScrolled ? "text-gray-500" : "text-gray-400")}>Services</div>
            <Link to="/services/term-life" className={cn("block px-4 py-2 rounded-md text-sm touch-manipulation", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-900")} onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}>
              Term Life Insurance
            </Link>
            <Link to="/services/whole-life" className={cn("block px-4 py-2 rounded-md text-sm touch-manipulation", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-900")} onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}>
              Whole Life Insurance
            </Link>
            <Link to="/services/annuities" className={cn("block px-4 py-2 rounded-md text-sm touch-manipulation", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-900")} onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}>
              Annuities
            </Link>
            <Link to="/services/final-expense" className={cn("block px-4 py-2 rounded-md text-sm touch-manipulation", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-900")} onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}>
              Final Expense
            </Link>
          </div>
          
          
          <Link to="/careers" className={cn("block px-4 py-3 rounded-lg text-base font-medium touch-manipulation", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Careers
          </Link>
          
          <button onClick={() => scrollToSection('contact')} className={cn("block w-full text-left px-4 py-3 rounded-lg text-base font-medium touch-manipulation", isScrolled ? "text-white bg-[#15AFF7] hover:bg-[#0D94D1]" : "text-black bg-white hover:bg-gray-100")}>
            Contact Us
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
