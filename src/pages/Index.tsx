
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhyAgora from '@/components/WhyAgora';
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
        title="Agora Assurance Solutions - Discover Truth & Transparency" 
        description="Supporting your family's assurance and well-being with advanced systems and AI. Compare insurance plans, get personalized quotes, and connect with licensed advisors."
        imageUrl="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=630&fit=crop"
        keywords={['insurance', 'life insurance', 'mortgage protection', 'final expense', 'annuities', 'tax solutions', 'insurance quotes', 'licensed advisors']}
      />
      <Hero />
      <Features />
      <WhyAgora />
      <Projects />
      <BlogPreview />
    </PageLayout>
  );
};

export default Index;
