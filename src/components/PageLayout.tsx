
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButton from '@/components/FloatingContactButton';
import MemoryWidget from '@/components/MemoryWidget';
import { useInsuranceImageOptimizer } from '@/hooks/useInsuranceImageOptimizer';
import { useImageOptimizationDebug } from '@/hooks/useImageOptimizationDebug';

type PageLayoutProps = {
  children: React.ReactNode;
  showContact?: boolean;
};

const PageLayout = ({ children, showContact = true }: PageLayoutProps) => {
  const location = useLocation();
  const { optimizeAllImages } = useInsuranceImageOptimizer();
  const { runImageOptimizationDebug } = useImageOptimizationDebug();

  // Effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Effect to optimize images on page load
  useEffect(() => {
    // Small delay to ensure images are in the DOM
    const timeoutId = setTimeout(() => {
      optimizeAllImages();
      
      // Only run debug in development
      if (process.env.NODE_ENV === 'development') {
        runImageOptimizationDebug();
      }
    }, 300); // Increased delay to ensure all images are loaded

    return () => clearTimeout(timeoutId);
  }, [location.pathname, optimizeAllImages, runImageOptimizationDebug]);

  return (
    <div className="min-h-screen bg-white w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
      {showContact && <FloatingContactButton />}
      <MemoryWidget />
    </div>
  );
};

export default PageLayout;
