
import React from 'react';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export const PerformanceMonitor = () => {
  const { metrics, performanceScore, isLoading } = usePerformanceMetrics();

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Good': return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatMetric = (value: number | null, unit: string = 'ms') => {
    if (value === null) return 'Measuring...';
    if (unit === 'ms') return `${Math.round(value)}ms`;
    if (unit === 's') return `${(value / 1000).toFixed(2)}s`;
    return value.toFixed(3);
  };

  const getMetricStatus = (metric: string, value: number | null) => {
    if (value === null) return 'measuring';
    
    switch (metric) {
      case 'lcp':
        return value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value < 0.1 ? 'good' : value < 0.25 ? 'needs-improvement' : 'poor';
      case 'fcp':
        return value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor';
      case 'ttfb':
        return value < 800 ? 'good' : value < 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'measuring';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg bg-white/95 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Zap className="h-4 w-4" />
          Performance Monitor
          <Badge className={getScoreColor(performanceScore)} variant="outline">
            {performanceScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getStatusColor(getMetricStatus('lcp', metrics.lcp))}>
                {formatMetric(metrics.lcp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span className={getStatusColor(getMetricStatus('fid', metrics.fid))}>
                {formatMetric(metrics.fid)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={getStatusColor(getMetricStatus('cls', metrics.cls))}>
                {formatMetric(metrics.cls, 'score')}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={getStatusColor(getMetricStatus('fcp', metrics.fcp))}>
                {formatMetric(metrics.fcp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span className={getStatusColor(getMetricStatus('ttfb', metrics.ttfb))}>
                {formatMetric(metrics.ttfb)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Load:</span>
              <span className="text-gray-600">
                {formatMetric(metrics.loadTime, 's')}
              </span>
            </div>
          </div>
        </div>
        
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3 animate-pulse" />
            Collecting performance data...
          </div>
        )}
      </CardContent>
    </Card>
  );
};
