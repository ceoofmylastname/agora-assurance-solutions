
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';
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
        title="Agora Assurance Solutions - Your Independent Insurance Partner" 
        description="Get instant quotes, compare plans, and connect with licensed advisors. Term life, mortgage protection, final expense, annuities & more. Zero confusion, total peace of mind."
        imageUrl="/lovable-uploads/99f03d19-d521-4882-9c68-a2bbe122b1f9.png"
        keywords={['insurance', 'life insurance', 'mortgage protection', 'final expense', 'annuities', 'tax solutions', 'insurance quotes', 'licensed advisors', 'instant quotes', 'family protection']}
      />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
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
    </PageLayout>
  );
};

export default Index;
