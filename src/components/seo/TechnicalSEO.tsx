
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Clock, Zap, Shield, Smartphone, Globe } from 'lucide-react';

export const TechnicalSEO = () => {
  const coreWebVitals = {
    lcp: { value: 2.1, threshold: 2.5, status: 'good' },
    fid: { value: 85, threshold: 100, status: 'good' },
    cls: { value: 0.08, threshold: 0.1, status: 'good' },
    fcp: { value: 1.4, threshold: 1.8, status: 'good' }
  };

  const technicalIssues = [
    {
      category: 'Crawling',
      severity: 'high',
      issue: '404 Error Pages',
      count: 3,
      description: 'Broken internal links found',
      pages: ['/old-page-1', '/services/deprecated', '/blog/old-post']
    },
    {
      category: 'Mobile',
      severity: 'medium',
      issue: 'Mobile Usability',
      count: 2,
      description: 'Text too small on mobile devices',
      pages: ['/terms', '/privacy-policy']
    },
    {
      category: 'Performance',
      severity: 'low',
      issue: 'Image Optimization',
      count: 12,
      description: 'Unoptimized images affecting load speed',
      pages: ['/services/term-life', '/blog']
    }
  ];

  const siteHealth = {
    https: true,
    robotsTxt: true,
    sitemap: true,
    structured_data: true,
    canonical_tags: true,
    meta_robots: true,
    h1_tags: true,
    alt_tags: false
  };

  const pageSpeed = {
    desktop: { score: 94, lcp: 1.8, fid: 15, cls: 0.05 },
    mobile: { score: 87, lcp: 2.4, fid: 95, cls: 0.08 }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVitalStatus = (value, threshold, metric) => {
    let status;
    if (metric === 'cls') {
      status = value <= threshold ? 'good' : 'poor';
    } else {
      status = value <= threshold ? 'good' : 'poor';
    }
    
    return {
      color: status === 'good' ? 'text-green-600' : 'text-red-600',
      icon: status === 'good' ? CheckCircle : AlertTriangle
    };
  };

  return (
    <div className="space-y-6">
      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Core Web Vitals
          </CardTitle>
          <CardDescription>Google's key performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">LCP</h4>
                <Badge className={getVitalStatus(coreWebVitals.lcp.value, coreWebVitals.lcp.threshold, 'lcp').color.replace('text-', 'bg-').replace('-600', '-100')}>
                  {coreWebVitals.lcp.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{coreWebVitals.lcp.value}s</div>
              <Progress value={(coreWebVitals.lcp.threshold - coreWebVitals.lcp.value) / coreWebVitals.lcp.threshold * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Largest Contentful Paint</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">FID</h4>
                <Badge className={getVitalStatus(coreWebVitals.fid.value, coreWebVitals.fid.threshold, 'fid').color.replace('text-', 'bg-').replace('-600', '-100')}>
                  {coreWebVitals.fid.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{coreWebVitals.fid.value}ms</div>
              <Progress value={(coreWebVitals.fid.threshold - coreWebVitals.fid.value) / coreWebVitals.fid.threshold * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">First Input Delay</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">CLS</h4>
                <Badge className={getVitalStatus(coreWebVitals.cls.value, coreWebVitals.cls.threshold, 'cls').color.replace('text-', 'bg-').replace('-600', '-100')}>
                  {coreWebVitals.cls.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{coreWebVitals.cls.value}</div>
              <Progress value={(1 - coreWebVitals.cls.value / coreWebVitals.cls.threshold) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Cumulative Layout Shift</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">FCP</h4>
                <Badge className={getVitalStatus(coreWebVitals.fcp.value, coreWebVitals.fcp.threshold, 'fcp').color.replace('text-', 'bg-').replace('-600', '-100')}>
                  {coreWebVitals.fcp.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{coreWebVitals.fcp.value}s</div>
              <Progress value={(coreWebVitals.fcp.threshold - coreWebVitals.fcp.value) / coreWebVitals.fcp.threshold * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">First Contentful Paint</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Speed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Desktop Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-green-600">{pageSpeed.desktop.score}</div>
              <div className="flex-1">
                <Progress value={pageSpeed.desktop.score} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Excellent performance</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">LCP</p>
                <p className="font-semibold">{pageSpeed.desktop.lcp}s</p>
              </div>
              <div>
                <p className="text-muted-foreground">FID</p>
                <p className="font-semibold">{pageSpeed.desktop.fid}ms</p>
              </div>
              <div>
                <p className="text-muted-foreground">CLS</p>
                <p className="font-semibold">{pageSpeed.desktop.cls}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-yellow-600">{pageSpeed.mobile.score}</div>
              <div className="flex-1">
                <Progress value={pageSpeed.mobile.score} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Good performance</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">LCP</p>
                <p className="font-semibold">{pageSpeed.mobile.lcp}s</p>
              </div>
              <div>
                <p className="text-muted-foreground">FID</p>
                <p className="font-semibold">{pageSpeed.mobile.fid}ms</p>
              </div>
              <div>
                <p className="text-muted-foreground">CLS</p>
                <p className="font-semibold">{pageSpeed.mobile.cls}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Technical Issues
          </CardTitle>
          <CardDescription>Critical technical SEO issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalIssues.map((issue, index) => (
              <Alert key={index} className={`border-l-4 ${
                issue.severity === 'high' ? 'border-l-red-500 bg-red-50' :
                issue.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
                'border-l-blue-500 bg-blue-50'
              }`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{issue.issue}</h4>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline">
                          {issue.count} issues
                        </Badge>
                      </div>
                      <p className="text-sm">{issue.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Affected pages: {issue.pages.join(', ')}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Fix Issues
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Site Health Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Site Health Checklist
          </CardTitle>
          <CardDescription>Essential technical SEO elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(siteHealth).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {value ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <Badge className={value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {value ? 'Pass' : 'Fail'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
