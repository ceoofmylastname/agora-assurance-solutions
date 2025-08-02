// Critical resource preloader
export const preloadCriticalResources = () => {
  // Skip preloading as Vite handles asset imports properly
  // The hero image will be bundled and optimized by Vite

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.href = 'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQQoyeyHLkT11dPUxLBzT0DL1E7kSyYGfFwv6E3QjsJgnw.woff2';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

// Prefetch next sections
export const prefetchNextSections = () => {
  const prefetchModules = [
    () => import('@/components/OptimizedFeatures'),
    () => import('@/components/products/ProductsSection'),
    () => import('@/components/OptimizedHowItWorks')
  ];

  // Prefetch with requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    prefetchModules.forEach((importFn, index) => {
      requestIdleCallback(() => {
        setTimeout(() => importFn(), index * 1000);
      });
    });
  }
};