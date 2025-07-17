
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, TrendingDown, Search, Link, Eye, Plus } from 'lucide-react';

export const CompetitorAnalysis = () => {
  const competitors = [
    {
      domain: 'competitor1.com',
      organicTraffic: 145000,
      organicKeywords: 8940,
      backlinks: 15600,
      domainAuthority: 68,
      monthlyChange: 12.5,
      topKeywords: ['life insurance quotes', 'term life insurance', 'whole life insurance'],
      gapOpportunities: 156
    },
    {
      domain: 'competitor2.com',
      organicTraffic: 89000,
      organicKeywords: 6720,
      backlinks: 12400,
      domainAuthority: 62,
      monthlyChange: -5.2,
      topKeywords: ['mortgage protection', 'final expense insurance', 'annuities'],
      gapOpportunities: 203
    },
    {
      domain: 'competitor3.com',
      organicTraffic: 67000,
      organicKeywords: 4890,
      backlinks: 8900,
      domainAuthority: 58,
      monthlyChange: 8.7,
      topKeywords: ['retirement planning', 'investment annuities', 'tax planning'],
      gapOpportunities: 124
    }
  ];

  const keywordGaps = [
    {
      keyword: 'best life insurance companies',
      volume: 8900,
      difficulty: 65,
      competitorPosition: 3,
      ourPosition: null,
      opportunity: 'high'
    },
    {
      keyword: 'term vs whole life insurance',
      volume: 12400,
      difficulty: 58,
      competitorPosition: 2,
      ourPosition: 15,
      opportunity: 'high'
    },
    {
      keyword: 'annuity vs 401k',
      volume: 6700,
      difficulty: 52,
      competitorPosition: 4,
      ourPosition: null,
      opportunity: 'medium'
    }
  ];

  const contentGaps = [
    {
      topic: 'Life Insurance Calculator',
      type: 'Tool',
      competitorHas: true,
      weHave: false,
      estimatedTraffic: 15600,
      priority: 'high'
    },
    {
      topic: 'Retirement Planning Guide',
      type: 'Content',
      competitorHas: true,
      weHave: false,
      estimatedTraffic: 8900,
      priority: 'medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Competitor Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Competitor Landscape
          </CardTitle>
          <CardDescription>Track and analyze your main competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.map((comp, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{comp.domain}</h3>
                      <Badge variant="outline">
                        DA: {comp.domainAuthority}
                      </Badge>
                      <div className={`flex items-center gap-1 text-sm ${
                        comp.monthlyChange > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comp.monthlyChange > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(comp.monthlyChange)}%
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {comp.organicTraffic.toLocaleString()} organic visits
                      </span>
                      <span className="flex items-center gap-1">
                        <Search className="h-3 w-3" />
                        {comp.organicKeywords.toLocaleString()} keywords
                      </span>
                      <span className="flex items-center gap-1">
                        <Link className="h-3 w-3" />
                        {comp.backlinks.toLocaleString()} backlinks
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Top Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {comp.topKeywords.map((keyword, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {comp.gapOpportunities} opportunities
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Analyze
                      </Button>
                      <Button size="sm">
                        View Gaps
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keyword Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Keyword Gap Analysis
          </CardTitle>
          <CardDescription>Keywords where competitors rank but you don't</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keywordGaps.map((gap, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{gap.keyword}</h4>
                      <Badge className={
                        gap.opportunity === 'high' ? 'bg-green-100 text-green-800' :
                        gap.opportunity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {gap.opportunity} opportunity
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Volume: {gap.volume.toLocaleString()}</span>
                      <span>Difficulty: {gap.difficulty}</span>
                      <span>Competitor: #{gap.competitorPosition}</span>
                      <span>Us: {gap.ourPosition ? `#${gap.ourPosition}` : 'Not ranking'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <div className="flex items-center gap-2">
                        <Progress value={gap.difficulty} className="w-16 h-2" />
                        <span className="text-sm">{gap.difficulty}</span>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Target
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Content Gap Analysis
          </CardTitle>
          <CardDescription>Content and tools your competitors have that you don't</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentGaps.map((gap, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{gap.topic}</h4>
                      <Badge variant="outline">{gap.type}</Badge>
                      <Badge className={
                        gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                        gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {gap.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Estimated Traffic: {gap.estimatedTraffic.toLocaleString()}</span>
                      <span>Competitor has: {gap.competitorHas ? 'Yes' : 'No'}</span>
                      <span>We have: {gap.weHave ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Research
                    </Button>
                    <Button size="sm">
                      Plan Content
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
