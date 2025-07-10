
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
        className={cn("fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-transparent")} 
        initial={{ opacity: 1, y: 0 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={isScrolled ? "/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png" : "/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png"} 
                  alt="Agora Assurance Solutions Logo" 
                  className="h-8 w-auto" 
                />
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
                      <motion.div 
                        className="w-[900px] p-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden relative"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#15AFF7]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
                        
                        {/* Ultra-Modern Header */}
                        <div className="relative bg-gradient-to-r from-[#15AFF7] via-blue-600 to-purple-600 p-8 text-white overflow-hidden">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+Cjwvc3ZnPgo=')] opacity-30"></div>
                          <div className="relative z-10">
                            <motion.h3 
                              className="font-space font-black text-2xl mb-3 tracking-tight"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              Premium Services
                            </motion.h3>
                            <motion.p 
                              className="font-space text-blue-100/90 text-base font-light leading-relaxed"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              Cutting-edge financial protection tailored to your unique needs
                            </motion.p>
                          </div>
                        </div>
                        
                        <div className="relative p-8 bg-white/80 backdrop-blur-sm">
                          <div className="grid grid-cols-3 gap-8">
                            {/* Life Insurance Column */}
                            <motion.div 
                              className="space-y-5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                  <div className="w-4 h-4 bg-gradient-to-br from-[#15AFF7] to-blue-600 rounded-full shadow-lg"></div>
                                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-[#15AFF7] to-blue-600 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <h4 className="font-space font-black text-xl bg-gradient-to-r from-[#15AFF7] via-blue-600 to-purple-600 bg-clip-text text-transparent">Life Protection</h4>
                              </div>
                              
                              <Link to="/services/term-life" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-[#15AFF7]/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(21,175,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-[#15AFF7] transition-all duration-500 text-lg mb-2">Term Life</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Smart, affordable family protection</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#15AFF7] to-blue-600 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/whole-life" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-[#15AFF7]/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(21,175,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-[#15AFF7] transition-all duration-500 text-lg mb-2">Whole Life</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Lifetime coverage with wealth building</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#15AFF7] to-blue-600 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/universal-life" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-[#15AFF7]/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(21,175,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#15AFF7]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-[#15AFF7] transition-all duration-500 text-lg mb-2">Universal Life</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Flexible premiums, investment growth</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#15AFF7] to-blue-600 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                            </motion.div>
                            
                            {/* Specialized Protection Column */}
                            <motion.div 
                              className="space-y-5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                  <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <h4 className="font-space font-black text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">Specialized Plans</h4>
                              </div>
                              
                              <Link to="/services/final-expense" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-purple-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(168,85,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-500 text-lg mb-2">Final Expense</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Dignified end-of-life planning</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/mortgage-protection" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-purple-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(168,85,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-500 text-lg mb-2">Mortgage Shield</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Secure your family's home</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/annuities" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-purple-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(168,85,247,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-500 text-lg mb-2">Retirement Annuities</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Guaranteed income for life</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                            </motion.div>

                            {/* Premium Services Column */}
                            <motion.div 
                              className="space-y-5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                  <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <h4 className="font-space font-black text-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Premium Solutions</h4>
                              </div>
                              
                              <Link to="/services/indexed-universal-life" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-emerald-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(16,185,129,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-emerald-600 transition-all duration-500 text-lg mb-2">Indexed Universal</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Market upside, downside protection</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/life-settlements" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-emerald-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(16,185,129,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-emerald-600 transition-all duration-500 text-lg mb-2">Life Settlements</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Unlock hidden policy value</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                              
                              <Link to="/services/tax-asset-protection" className="group relative block p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/30 hover:border-emerald-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-8px_rgba(16,185,129,0.25)] transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                  <div className="font-space font-bold text-gray-900 group-hover:text-emerald-600 transition-all duration-500 text-lg mb-2">Wealth Protection</div>
                                  <p className="text-sm text-gray-600 font-space font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Advanced tax & asset strategies</p>
                                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-700 rounded-full"></div>
                                </div>
                              </Link>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Ultra-Modern Footer */}
                        <motion.div 
                          className="relative bg-gradient-to-r from-gray-900/5 via-gray-800/5 to-gray-900/5 backdrop-blur-xl px-8 py-6 border-t border-white/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="text-center">
                            <p className="font-space text-gray-700 text-base mb-2">
                              Ready to secure your future?
                            </p>
                            <button 
                              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#15AFF7] via-blue-600 to-purple-600 text-white font-space font-bold text-sm rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-8px_rgba(21,175,247,0.4)] transform hover:-translate-y-1 hover:scale-105"
                            >
                              <span>Speak with Expert</span>
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.div>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/faq">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                        FAQ
                      </NavigationMenuLink>
                    </Link>
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
            className={cn("absolute right-0 top-0 h-full w-80 shadow-2xl", isScrolled ? "bg-white" : "bg-primary")}
            variants={menuVariants}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <img 
                src={isScrolled ? "/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png" : "/lovable-uploads/b09383f5-a02b-439b-b5de-34a1fe9f2a1f.png"} 
                alt="Agora Logo" 
                className="h-8 w-auto" 
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
                  to="/faq" 
                  className={cn("block px-4 py-4 rounded-lg text-lg font-medium transition-colors border-l-4 border-transparent hover:border-[#15AFF7]", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-800")} 
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
