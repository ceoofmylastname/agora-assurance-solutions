// Critical resource preloader
export const preloadCriticalResources = () => {
  // Preload hero image with correct path
  const heroImageLink = document.createElement('link');
  heroImageLink.rel = 'preload';
  heroImageLink.as = 'image';
  heroImageLink.href = '/src/assets/hero-family-protection.webp';
  heroImageLink.type = 'image/webp';
  heroImageLink.imageSizes = '100vw';
  heroImageLink.imageSrcset = '/src/assets/hero-family-protection.webp 1920w';
  document.head.appendChild(heroImageLink);

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