
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const shouldUseDarkText = !isHomePage || isScrolled;
  const shouldUseWhiteBackground = !isHomePage || isScrolled;

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
        className={cn("fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full", shouldUseWhiteBackground ? "bg-white shadow-sm" : "bg-transparent")} 
        initial={{ opacity: 1, y: 0 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={shouldUseDarkText ? "/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png" : "/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png"} 
                  alt="Agora Assurance Solutions Logo" 
                  className="h-8 w-auto" 
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu className={cn(shouldUseDarkText ? "" : "text-white")}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-0 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                        {/* Clean Header */}
                        <div className="bg-gradient-to-r from-[#15AFF7] to-blue-600 px-6 py-4 text-white">
                          <h3 className="font-space font-bold text-lg">Our Services</h3>
                          <p className="font-space text-blue-100 text-sm">Professional insurance solutions</p>
                        </div>
                        
                        <div className="p-5">
                          <div className="grid grid-cols-2 gap-5">
                            {/* Life Insurance Column */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-[#15AFF7] rounded-full"></div>
                                <h4 className="font-space font-semibold text-sm text-gray-800">Life Insurance</h4>
                              </div>
                              
                              <Link to="/services/term-life" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-[#15AFF7] transition-colors text-sm">Term Life</div>
                                <p className="text-xs text-gray-600 mt-1">Affordable family protection</p>
                              </Link>
                              
                              <Link to="/services/whole-life" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-[#15AFF7] transition-colors text-sm">Whole Life</div>
                                <p className="text-xs text-gray-600 mt-1">Lifelong coverage with cash value</p>
                              </Link>
                              
                              <Link to="/services/universal-life" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-[#15AFF7] transition-colors text-sm">Universal Life</div>
                                <p className="text-xs text-gray-600 mt-1">Flexible premiums & investments</p>
                              </Link>
                              
                              <Link to="/services/indexed-universal-life" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-[#15AFF7] transition-colors text-sm">Indexed Universal</div>
                                <p className="text-xs text-gray-600 mt-1">Market upside, downside protection</p>
                              </Link>
                            </div>
                            
                            {/* Specialized Services Column */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <h4 className="font-space font-semibold text-sm text-gray-800">Specialized Services</h4>
                              </div>
                              
                              <Link to="/services/final-expense" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Final Expense</div>
                                <p className="text-xs text-gray-600 mt-1">End-of-life coverage</p>
                              </Link>
                              
                              <Link to="/services/mortgage-protection" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Mortgage Protection</div>
                                <p className="text-xs text-gray-600 mt-1">Secure your family home</p>
                              </Link>
                              
                              <Link to="/services/annuities" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Annuities</div>
                                <p className="text-xs text-gray-600 mt-1">Guaranteed retirement income</p>
                              </Link>
                              
                              <Link to="/services/tax-asset-protection" className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="font-space font-medium text-gray-900 group-hover:text-purple-600 transition-colors text-sm">Tax & Asset Protection</div>
                                <p className="text-xs text-gray-600 mt-1">Wealth preservation strategies</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/* Compact Footer */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <p className="font-space text-xs text-gray-600">Need guidance?</p>
                            <button 
                              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                              className="font-space font-medium text-xs text-[#15AFF7] hover:text-blue-600 transition-colors"
                            >
                              Contact Expert →
                            </button>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/faq">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                        FAQ
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/careers">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                        Agora Advisor Solutions
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <button onClick={() => scrollToSection('contact')} className={cn("px-4 py-2 rounded-md transition-colors", shouldUseDarkText ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600")}>
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
                className={cn("focus:outline-none relative w-6 h-6", shouldUseDarkText ? "text-gray-700" : "text-white")}
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
            className={cn("absolute right-0 top-0 h-full w-80 shadow-2xl", shouldUseWhiteBackground ? "bg-white" : "bg-primary")}
            variants={menuVariants}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <img 
                src={shouldUseDarkText ? "/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png" : "/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png"} 
                alt="Agora Logo" 
                className="h-8 w-auto" 
              />
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className={cn("p-2 rounded-lg transition-colors", shouldUseDarkText ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-gray-800")}
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
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
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
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
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
                <div className={cn("px-4 py-2 text-sm font-semibold uppercase tracking-wider", shouldUseDarkText ? "text-gray-500" : "text-gray-400")}>
                  Services
                </div>
                <div className="pl-4 space-y-1">
                  <Link 
                    to="/services/term-life" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Term Life Insurance
                  </Link>
                  <Link 
                    to="/services/whole-life" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Whole Life Insurance
                  </Link>
                  <Link 
                    to="/services/annuities" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Annuities
                  </Link>
                  <Link 
                    to="/services/final-expense" 
                    className={cn("block px-4 py-3 rounded-lg text-base transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} 
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
                  to="/faq" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  FAQ
                </Link>
              </motion.div>

              <motion.div variants={menuItemVariants}>
                <Link 
                  to="/careers" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", shouldUseDarkText ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
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
