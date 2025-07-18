
import { useState, useEffect } from 'react';

export interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  loadTime: number | null;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null
  });

  useEffect(() => {
    // Largest Contentful Paint
    const observeLCP = () => {
      if ('web-vitals' in window || typeof window !== 'undefined') {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay
    const observeFID = () => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          setMetrics(prev => ({ 
            ...prev, 
            fid: (entry as any).processingStart - entry.startTime 
          }));
        });
      }).observe({ entryTypes: ['first-input'] });
    };

    // Cumulative Layout Shift
    const observeCLS = () => {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // First Contentful Paint
    const observeFCP = () => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        });
      }).observe({ entryTypes: ['paint'] });
    };

    // Time to First Byte
    const observeTTFB = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          setMetrics(prev => ({ ...prev, ttfb }));
        }
      }
    };

    // Page Load Time
    const observeLoadTime = () => {
      window.addEventListener('load', () => {
        if (typeof window !== 'undefined' && 'performance' in window) {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          setMetrics(prev => ({ ...prev, loadTime }));
        }
      });
    };

    // Initialize observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    observeTTFB();
    observeLoadTime();

  }, []);

  const getPerformanceScore = (): string => {
    const { lcp, fid, cls } = metrics;
    
    if (lcp === null || fid === null || cls === null) return 'Measuring...';
    
    let score = 0;
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (lcp < 2500) score += 33;
    else if (lcp < 4000) score += 16;
    
    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (fid < 100) score += 33;
    else if (fid < 300) score += 16;
    
    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (cls < 0.1) score += 34;
    else if (cls < 0.25) score += 17;
    
    if (score >= 85) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  return {
    metrics,
    performanceScore: getPerformanceScore(),
    isLoading: Object.values(metrics).some(value => value === null)
  };
};
