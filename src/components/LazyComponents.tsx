import { lazy } from 'react';

// Lazy load below-the-fold components with prefetch
export const LazyCustomerStories = lazy(() => 
  import(/* webpackChunkName: "customer-stories" */ '@/components/CustomerStories')
);
export const LazyBlogSection = lazy(() => 
  import(/* webpackChunkName: "blog-section" */ '@/components/BlogSection')
);
export const LazyFAQSection = lazy(() => 
  import(/* webpackChunkName: "faq-section" */ '@/components/FAQSection')
);
export const LazyModernContactForm = lazy(() => 
  import(/* webpackChunkName: "contact-form" */ '@/components/ModernContactForm')
);
export const LazyFeatures = lazy(() => 
  import(/* webpackChunkName: "features" */ '@/components/OptimizedFeatures')
);
export const LazyHowItWorks = lazy(() => 
  import(/* webpackChunkName: "how-it-works" */ '@/components/OptimizedHowItWorks')
);
export const LazyWhyAgora = lazy(() => 
  import(/* webpackChunkName: "why-agora" */ '@/components/OptimizedWhyAgora')
);
export const LazyProductsSection = lazy(() => 
  import(/* webpackChunkName: "products" */ './products/ProductsSection')
);