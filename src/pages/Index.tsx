
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductsSection from '@/components/ProductsSection';
import HowItWorks from '@/components/HowItWorks';
import WhyAgora from '@/components/WhyAgora';
import CustomerStories from '@/components/CustomerStories';
import ModernContactForm from '@/components/ModernContactForm';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

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
        imageUrl="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=630&fit=crop"
        keywords={['insurance', 'life insurance', 'mortgage protection', 'final expense', 'annuities', 'tax solutions', 'insurance quotes', 'licensed advisors', 'instant quotes', 'family protection']}
      />
      <Hero />
      <ProductsSection />
      <HowItWorks />
      <Features />
      <WhyAgora />
      <CustomerStories />
      <ModernContactForm />
    </PageLayout>
  );
};

export default Index;
