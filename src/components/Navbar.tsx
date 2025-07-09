
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

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.3
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      x: 50, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <>
      <motion.nav 
        className={cn("fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-black")} 
        initial={{ opacity: 1, y: 0 }} 
        animate={{ opacity: 1, y: 0 }}
      >
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
                        Agora Advisor Solutions
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
              <motion.button 
                onClick={toggleMenu} 
                className={cn("focus:outline-none relative w-6 h-6", isScrolled ? "text-gray-700" : "text-white")}
                animate={isMenuOpen ? "open" : "closed"}
              >
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu - Modern Full Screen Overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial="closed"
          animate="open"
          exit="exit"
          variants={menuVariants}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <motion.div
            className={cn("absolute right-0 top-0 h-full w-80 shadow-2xl", isScrolled ? "bg-white" : "bg-black")}
            variants={menuVariants}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <img 
                src="/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png" 
                alt="Agora Logo" 
                className={cn("h-8 w-auto", isScrolled ? "" : "brightness-0 invert")} 
              />
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className={cn("p-2 rounded-lg transition-colors", isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-gray-800")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="px-6 py-4 space-y-2 h-full overflow-y-auto">
              <motion.div variants={menuItemVariants}>
                <Link 
                  to="/" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Home
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <Link 
                  to="/about" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  About Us
                </Link>
              </motion.div>
              
              {/* Services Section */}
              <motion.div variants={menuItemVariants} className="space-y-2">
                <div className={cn("px-4 py-2 text-sm font-semibold uppercase tracking-wider", isScrolled ? "text-gray-500" : "text-gray-400")}>
                  Services
                </div>
                <div className="pl-4 space-y-1">
                  <Link 
                    to="/services/term-life" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Term Life Insurance
                  </Link>
                  <Link 
                    to="/services/whole-life" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Whole Life Insurance
                  </Link>
                  <Link 
                    to="/services/annuities" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Annuities
                  </Link>
                  <Link 
                    to="/services/final-expense" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Final Expense
                  </Link>
                </div>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <Link 
                  to="/careers" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Agora Advisor Solutions
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants} className="pt-4">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
