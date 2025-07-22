
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import InsuranceExplainerWidget from '@/components/InsuranceExplainerWidget';
import { useEffect, Suspense } from 'react';
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
import { SectionSkeleton, CardGridSkeleton, ContactFormSkeleton } from '@/components/LoadingFallback';

const Index = () => {
  // Fix any ID conflicts when the page loads
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      // If there are multiple elements with id="contact", rename one
      contactElements[1].id = 'contact-footer';
    }
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Get Instant Insurance Quotes & Expert Guidance - Agora Assurance" 
        description="Compare life insurance, mortgage protection, and annuity plans instantly. Get personalized quotes in seconds with guidance from licensed advisors. Zero confusion, total peace of mind."
        imageUrl="/lovable-uploads/99f03d19-d521-4882-9c68-a2bbe122b1f9.png"
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
      
      {/* Insurance Explainer Widget Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <ErrorBoundary fallback={<SectionSkeleton />}>
            <Suspense fallback={<SectionSkeleton />}>
              <InsuranceExplainerWidget />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <ErrorBoundary fallback={<CardGridSkeleton />}>
        <Suspense fallback={<CardGridSkeleton />}>
          <LazyProductsSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyHowItWorks />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyFeatures />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyWhyAgora />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyCustomerStories />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyBlogSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <LazyFAQSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<ContactFormSkeleton />}>
        <Suspense fallback={<ContactFormSkeleton />}>
          <LazyModernContactForm />
        </Suspense>
      </ErrorBoundary>
      <PerformanceMonitor />
    </PageLayout>
  );
};

export default Index;
