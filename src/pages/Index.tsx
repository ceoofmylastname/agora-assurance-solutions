
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import MissionLeadership from '@/components/MissionLeadership';
import Projects from '@/components/Projects';
import WhyAgora from '@/components/WhyAgora';
import HowItWorks from '@/components/HowItWorks';
import CustomerStories from '@/components/CustomerStories';
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
        title="Agora Assurance Solutions - Your Independent, Tech-Powered Insurance Partner" 
        description="Built by industry pioneers and powered by AI-driven systems, we combine cutting-edge comparison tools, transparent advocacy, and licensed expertise to deliver insurance solutions with zero confusion and total peace of mind."
        imageUrl="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=630&fit=crop"
        keywords={['insurance', 'life insurance', 'mortgage protection', 'final expense', 'annuities', 'tax solutions', 'insurance quotes', 'licensed advisors', 'consumer advocacy', 'transparent insurance']}
      />
      <Hero />
      <Features />
      <MissionLeadership />
      <WhyAgora />
      <HowItWorks />
      <CustomerStories />
      <Projects />
      <BlogPreview />
    </PageLayout>
  );
};

export default Index;
