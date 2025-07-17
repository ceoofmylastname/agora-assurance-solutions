
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Search, Link, Image } from 'lucide-react';

export const SEOOverview = () => {
  const seoScore = 87;
  const metrics = [
    { label: 'Organic Traffic', value: '24,891', change: '+12.5%', trend: 'up' },
    { label: 'Keyword Rankings', value: '1,247', change: '+8.2%', trend: 'up' },
    { label: 'Backlinks', value: '3,156', change: '-2.1%', trend: 'down' },
    { label: 'Core Web Vitals', value: '94/100', change: '+5.3%', trend: 'up' }
  ];

  const issues = [
    { type: 'warning', message: '23 images missing alt tags', count: 23 },
    { type: 'error', message: '5 pages with duplicate meta descriptions', count: 5 },
    { type: 'info', message: '12 opportunities for featured snippets', count: 12 }
  ];

  const topPages = [
    { url: '/', traffic: 8945, keywords: 234, position: 1.2 },
    { url: '/services/term-life', traffic: 6721, keywords: 189, position: 2.1 },
    { url: '/services/mortgage-protection', traffic: 4532, keywords: 156, position: 1.8 },
    { url: '/about', traffic: 3210, keywords: 98, position: 2.9 }
  ];

  return (
    <div className="space-y-6">
      {/* SEO Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Overall SEO Health Score
          </CardTitle>
          <CardDescription>Comprehensive analysis of all SEO factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-green-600">{seoScore}/100</div>
            <div className="flex-1">
              <Progress value={seoScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                Excellent performance. Focus on technical improvements for 90+
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Excellent
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Issues & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            SEO Issues & Opportunities
          </CardTitle>
          <CardDescription>Critical issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {issues.map((issue, index) => (
            <Alert key={index} className={`${
              issue.type === 'error' ? 'border-red-200 bg-red-50' :
              issue.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                issue.type === 'error' ? 'text-red-600' :
                issue.type === 'warning' ? 'text-yellow-600' :
                'text-blue-600'
              }`} />
              <AlertDescription className="flex items-center justify-between">
                <span>{issue.message}</span>
                <Badge variant="outline" className="ml-2">
                  {issue.count}
                </Badge>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Top Performing Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Top Performing Pages
          </CardTitle>
          <CardDescription>Pages driving the most organic traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{page.url}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {page.traffic.toLocaleString()} visits
                    </span>
                    <span className="flex items-center gap-1">
                      <Search className="h-3 w-3" />
                      {page.keywords} keywords
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Avg pos: {page.position}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
