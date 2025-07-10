import { lazy } from 'react';

// Lazy load below-the-fold components
export const LazyCustomerStories = lazy(() => import('@/components/CustomerStories'));
export const LazyBlogSection = lazy(() => import('@/components/BlogSection'));
export const LazyFAQSection = lazy(() => import('@/components/FAQSection'));
export const LazyModernContactForm = lazy(() => import('@/components/ModernContactForm'));
export const LazyFeatures = lazy(() => import('@/components/OptimizedFeatures'));
export const LazyHowItWorks = lazy(() => import('@/components/OptimizedHowItWorks'));
export const LazyWhyAgora = lazy(() => import('@/components/OptimizedWhyAgora'));
export const LazyProductsSection = lazy(() => import('./products/ProductsSection'));