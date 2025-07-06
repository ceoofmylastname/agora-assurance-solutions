
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhyWrlds from '@/components/WhyWrlds';
import BlogPreview from '@/components/BlogPreview';
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
        title="SecureGuard Insurance - Protecting Your Family's Future" 
        description="Comprehensive insurance solutions for life, auto, home, and business protection. Get personalized coverage with trusted local agents."
        imageUrl="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=630&fit=crop"
        keywords={['insurance', 'life insurance', 'auto insurance', 'home insurance', 'business insurance', 'family protection', 'insurance quotes']}
      />
      <Hero />
      <Features />
      <WhyWrlds />
      <Projects />
      <BlogPreview />
    </PageLayout>
  );
};

export default Index;
