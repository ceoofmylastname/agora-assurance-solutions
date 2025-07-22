
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactButton from '@/components/FloatingContactButton';
import MemoryWidget from '@/components/MemoryWidget';
import { useInsuranceImageOptimizer } from '@/hooks/useInsuranceImageOptimizer';

type PageLayoutProps = {
  children: React.ReactNode;
  showContact?: boolean;
};

const PageLayout = ({ children, showContact = true }: PageLayoutProps) => {
  const location = useLocation();
  const { optimizeAllImages } = useInsuranceImageOptimizer();

  // Effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Effect to optimize images on page load
  useEffect(() => {
    // Small delay to ensure images are in the DOM
    const timeoutId = setTimeout(() => {
      optimizeAllImages();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, optimizeAllImages]);

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
