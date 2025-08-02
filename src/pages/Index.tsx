import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { CriticalCSS } from '@/components/CriticalCSS';
import { ServiceWorker } from '@/components/ServiceWorker';
import { useEffect, Suspense } from 'react';
import { LazySection } from '@/components/LazySection';
import { OptimizedSkeleton } from '@/components/OptimizedSkeleton';
import { preloadCriticalResources, prefetchNextSections } from '@/utils/preloader';
import { 
  LazyFeatures, 
  LazyProductsSection, 
  LazyHowItWorks, 
  LazyWhyAgora, 
  LazyCustomerStories, 
  LazyBlogSection, 
  LazyFAQSection, 
  LazyModernContactForm 
} from '@/components/LazyComponents';

const Index = () => {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Prefetch next sections after hero loads
    const timer = setTimeout(() => {
      prefetchNextSections();
    }, 1000);

    // Handle scroll to contact section if hash is present
    const handleHashScroll = () => {
      if (window.location.hash === '#contact') {
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500); // Wait for components to load
      }
    };

    handleHashScroll();

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <CriticalCSS />
      <ServiceWorker />
      <SEO 
        title="Get Instant Insurance Quotes & Expert Guidance - Agora Assurance" 
        description="Compare life insurance, mortgage protection, and annuity plans instantly. Get personalized quotes in seconds with guidance from licensed advisors. Zero confusion, total peace of mind."
        imageUrl="/src/assets/hero-family-protection.webp"
        keywords={[
          'instant insurance quotes', 
          'compare life insurance plans', 
          'mortgage protection insurance', 
          'final expense coverage', 
          'retirement annuities', 
          'licensed insurance advisors', 
          'personalized insurance quotes', 
          'family protection planning',
          'tax-free life insurance benefits',
          'secure financial future'
        ]}
      />
      <BreadcrumbNavigation />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <LazySection fallback={<OptimizedSkeleton variant="card" height="400px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="400px" />}>
            <LazyProductsSection />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="350px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="350px" />}>
            <LazyHowItWorks />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="300px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="300px" />}>
            <LazyFeatures />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="300px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="300px" />}>
            <LazyWhyAgora />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="400px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="400px" />}>
            <LazyCustomerStories />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="350px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="350px" />}>
            <LazyBlogSection />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="300px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="300px" />}>
            <LazyFAQSection />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection fallback={<OptimizedSkeleton variant="card" height="600px" />}>
        <ErrorBoundary>
          <Suspense fallback={<OptimizedSkeleton variant="card" height="600px" />}>
            <LazyModernContactForm />
          </Suspense>
        </ErrorBoundary>
      </LazySection>
      <PerformanceMonitor />
    </PageLayout>
  );
};

export default Index;
