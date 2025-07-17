
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Search, Image, Zap, RefreshCw } from 'lucide-react';
import { useSiteScanner } from '@/hooks/useSiteScanner';

export const SEOOverview = () => {
  const { metrics, images, pages, isScanning, scanSiteImages } = useSiteScanner();

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Scanning site for SEO data...</p>
        </div>
      </div>
    );
  }

  const seoScore = metrics.overallScore;
  const criticalIssues = [
    ...(metrics.imagesWithoutAlt > 0 ? [`${metrics.imagesWithoutAlt} images missing alt tags`] : []),
    ...(pages.some(p => p.issues.length > 0) ? ['Pages with meta data issues'] : [])
  ];

  const topPages = pages.map((page, index) => ({
    url: page.url,
    title: page.title,
    issues: page.issues.length,
    h1: page.h1,
    rank: index + 1
  }));

  return (
    <div className="space-y-8">
      {/* Real-time SEO Health Score */}
      <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Live SEO Health Score</CardTitle>
                <CardDescription>Real-time analysis of all SEO factors</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={scanSiteImages}
              disabled={isScanning}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-5xl font-bold text-primary">{seoScore}/100</div>
            <div className="flex-1 space-y-3">
              <Progress value={seoScore} className="h-4 bg-gray-100" />
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  {seoScore >= 90 ? 'Excellent' : seoScore >= 70 ? 'Good' : seoScore >= 50 ? 'Fair' : 'Needs Improvement'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {metrics.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <Badge 
              className={`px-4 py-2 text-sm font-semibold ${
                seoScore >= 90 ? 'bg-green-100 text-green-800 border-green-200' :
                seoScore >= 70 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                seoScore >= 50 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              {seoScore >= 90 ? 'Excellent' : seoScore >= 70 ? 'Good' : seoScore >= 50 ? 'Fair' : 'Poor'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalImages}</p>
                <p className="text-sm text-muted-foreground">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{metrics.imagesWithoutAlt}</p>
                <p className="text-sm text-muted-foreground">Missing Alt Tags</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.totalImages - metrics.imagesWithoutAlt}
                </p>
                <p className="text-sm text-muted-foreground">Optimized Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalPages}</p>
                <p className="text-sm text-muted-foreground">Pages Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <Card className="bg-white border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Critical SEO Issues
            </CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticalIssues.map((issue, index) => (
              <Alert key={index} className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  {issue}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Zap className="h-5 w-5" />
            AI-Powered Recommendations
          </CardTitle>
          <CardDescription>Smart suggestions to improve your SEO performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {metrics.imagesWithoutAlt > 0 && (
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Image Optimization Priority</h4>
                <p className="text-sm text-blue-700">
                  Add alt text to {metrics.imagesWithoutAlt} images to improve accessibility and SEO. 
                  This could increase your SEO score by up to {Math.round((metrics.imagesWithoutAlt / metrics.totalImages) * 20)} points.
                </p>
                <Button size="sm" className="mt-2" variant="outline">
                  Fix Images Now
                </Button>
              </div>
            )}
            
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
              <p className="text-sm text-blue-700">
                Focus on technical SEO improvements and content optimization to reach the next performance tier.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Page Analysis */}
      <Card className="bg-white border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Current Page Analysis
          </CardTitle>
          <CardDescription>Real-time analysis of the current page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{page.url}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{page.title}</p>
                  <p className="text-xs text-muted-foreground">H1: {page.h1}</p>
                </div>
                <div className="text-right">
                  <Badge variant={page.issues === 0 ? "default" : "destructive"}>
                    {page.issues === 0 ? 'Optimized' : `${page.issues} Issues`}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
