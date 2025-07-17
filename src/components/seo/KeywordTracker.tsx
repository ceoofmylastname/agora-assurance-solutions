
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, TrendingDown, Target, Plus, Filter } from 'lucide-react';

export const KeywordTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const keywords = [
    {
      keyword: 'life insurance',
      position: 3,
      previousPosition: 5,
      searchVolume: 12000,
      difficulty: 65,
      url: '/services/term-life',
      clicks: 890,
      impressions: 15600,
      ctr: 5.7
    },
    {
      keyword: 'term life insurance',
      position: 2,
      previousPosition: 3,
      searchVolume: 8900,
      difficulty: 58,
      url: '/services/term-life',
      clicks: 1250,
      impressions: 18900,
      ctr: 6.6
    },
    {
      keyword: 'mortgage protection insurance',
      position: 1,
      previousPosition: 1,
      searchVolume: 3400,
      difficulty: 45,
      url: '/services/mortgage-protection',
      clicks: 2100,
      impressions: 8900,
      ctr: 23.6
    },
    {
      keyword: 'annuities for retirement',
      position: 7,
      previousPosition: 4,
      searchVolume: 2800,
      difficulty: 52,
      url: '/services/annuities',
      clicks: 125,
      impressions: 3400,
      ctr: 3.7
    }
  ];

  const opportunities = [
    { keyword: 'final expense insurance', volume: 4500, difficulty: 35, opportunity: 'high' },
    { keyword: 'whole life insurance rates', volume: 6700, difficulty: 68, opportunity: 'medium' },
    { keyword: 'retirement planning', volume: 15600, difficulty: 78, opportunity: 'low' }
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 40) return 'text-green-600 bg-green-100';
    if (difficulty < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPositionTrend = (current, previous) => {
    if (current < previous) return { icon: TrendingUp, color: 'text-green-600', text: 'up' };
    if (current > previous) return { icon: TrendingDown, color: 'text-red-600', text: 'down' };
    return { icon: Target, color: 'text-gray-600', text: 'same' };
  };

  return (
    <div className="space-y-6">
      {/* Keyword Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{keywords.length}</p>
                <p className="text-sm text-muted-foreground">Tracked Keywords</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {keywords.filter(k => k.position <= 3).length}
                </p>
                <p className="text-sm text-muted-foreground">Top 3 Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {keywords.reduce((sum, k) => sum + k.clicks, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {(keywords.reduce((sum, k) => sum + k.ctr, 0) / keywords.length).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg CTR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracking">Keyword Tracking</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Keyword Performance
              </CardTitle>
              <CardDescription>Track rankings and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Keyword
                </Button>
              </div>

              <div className="space-y-4">
                {keywords.map((keyword, index) => {
                  const trend = getPositionTrend(keyword.position, keyword.previousPosition);
                  const TrendIcon = trend.icon;
                  
                  return (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{keyword.keyword}</h3>
                            <Badge className={getDifficultyColor(keyword.difficulty)}>
                              Difficulty: {keyword.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{keyword.url}</p>
                        </div>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <p className="text-sm text-muted-foreground">Position</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">#{keyword.position}</span>
                              <TrendIcon className={`h-4 w-4 ${trend.color}`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Volume</p>
                            <p className="font-semibold">{keyword.searchVolume.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Clicks</p>
                            <p className="font-semibold">{keyword.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">CTR</p>
                            <p className="font-semibold">{keyword.ctr}%</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Research</CardTitle>
              <CardDescription>Discover new keyword opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Enter seed keyword..." className="flex-1" />
                  <Button>Research</Button>
                </div>
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a seed keyword to discover related opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Opportunities</CardTitle>
              <CardDescription>High-potential keywords to target</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{opp.keyword}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={
                            opp.opportunity === 'high' ? 'bg-green-100 text-green-800' :
                            opp.opportunity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {opp.opportunity.toUpperCase()} opportunity
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-semibold">{opp.volume.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Difficulty</p>
                          <div className="flex items-center gap-2">
                            <Progress value={opp.difficulty} className="w-16 h-2" />
                            <span className="text-sm">{opp.difficulty}</span>
                          </div>
                        </div>
                        <Button size="sm">Target</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
