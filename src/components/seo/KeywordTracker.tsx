
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, TrendingDown, Target, Plus, Filter, MapPin, MessageSquare, BarChart3 } from 'lucide-react';
import { insuranceKeywords, analyzeKeywordOpportunities, trackKeywordPerformance, type KeywordData } from '@/utils/seo/keywordTracker';

export const KeywordTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Enhanced keyword data with new categories
  const keywords: KeywordData[] = [
    {
      keyword: 'life insurance',
      searchVolume: 12000,
      difficulty: 65,
      position: 3,
      url: '/services/term-life',
      category: 'primary',
      intent: 'commercial'
    },
    {
      keyword: 'life insurance California',
      searchVolume: 2400,
      difficulty: 58,
      position: 2,
      url: '/services/term-life',
      category: 'geo-specific',
      intent: 'commercial'
    },
    {
      keyword: 'term vs whole life insurance',
      searchVolume: 8900,
      difficulty: 72,
      position: 5,
      url: '/services/term-life',
      category: 'comparison',
      intent: 'informational'
    },
    {
      keyword: 'what is the best life insurance for seniors',
      searchVolume: 1800,
      difficulty: 52,
      position: 7,
      url: '/services/final-expense',
      category: 'voice-search',
      intent: 'informational'
    },
    {
      keyword: 'no medical exam life insurance for seniors',
      searchVolume: 1200,
      difficulty: 38,
      position: 4,
      url: '/services/final-expense',
      category: 'long-tail',
      intent: 'commercial'
    }
  ];

  const opportunities = analyzeKeywordOpportunities(keywords.map(k => k.keyword));
  const performance = trackKeywordPerformance(keywords);

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || keyword.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 40) return 'text-green-600 bg-green-100';
    if (difficulty < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'geo-specific': return <MapPin className="h-4 w-4" />;
      case 'voice-search': return <MessageSquare className="h-4 w-4" />;
      case 'comparison': return <BarChart3 className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'geo-specific': return 'bg-blue-100 text-blue-800';
      case 'voice-search': return 'bg-purple-100 text-purple-800';
      case 'comparison': return 'bg-orange-100 text-orange-800';
      case 'long-tail': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{performance.totalVolume.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Search Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{performance.geoKeywords.length}</p>
                <p className="text-sm text-muted-foreground">Geo-Specific Keywords</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{performance.voiceSearchKeywords.length}</p>
                <p className="text-sm text-muted-foreground">Voice Search Keywords</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{performance.lowCompetitionKeywords.length}</p>
                <p className="text-sm text-muted-foreground">Low Competition</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracking">Keyword Tracking</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="geo-targeting">Geo Targeting</TabsTrigger>
          <TabsTrigger value="voice-search">Voice Search</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Enhanced Keyword Performance
              </CardTitle>
              <CardDescription>Track rankings across all keyword categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="geo-specific">Geo-Specific</option>
                  <option value="voice-search">Voice Search</option>
                  <option value="comparison">Comparison</option>
                  <option value="long-tail">Long-tail</option>
                  <option value="primary">Primary</option>
                </select>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Keyword
                </Button>
              </div>

              <div className="space-y-4">
                {filteredKeywords.map((keyword, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{keyword.keyword}</h3>
                          <Badge className={getCategoryColor(keyword.category)}>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(keyword.category)}
                              {keyword.category}
                            </div>
                          </Badge>
                          <Badge className={getDifficultyColor(keyword.difficulty)}>
                            Difficulty: {keyword.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {keyword.intent}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{keyword.url}</p>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Position</p>
                          <span className="text-2xl font-bold">#{keyword.position || 'N/A'}</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-semibold">{keyword.searchVolume.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Opportunities</CardTitle>
              <CardDescription>High-potential keywords based on enhanced analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.slice(0, 10).map((opp, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{opp.keyword}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getCategoryColor(opp.category)}>
                            {opp.category}
                          </Badge>
                          <Badge variant="outline">{opp.intent}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-semibold">{opp.searchVolume.toLocaleString()}</p>
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

        <TabsContent value="geo-targeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geographic Keyword Strategy
              </CardTitle>
              <CardDescription>Location-based keyword optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Top States</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>California</span>
                        <span className="text-sm text-muted-foreground">2,400 vol</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Texas</span>
                        <span className="text-sm text-muted-foreground">1,800 vol</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Florida</span>
                        <span className="text-sm text-muted-foreground">1,600 vol</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Geo Opportunities</h4>
                    <div className="space-y-2">
                      <Badge className="bg-green-100 text-green-800">Arizona +15%</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Nevada +12%</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Colorado +8%</Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Local Modifiers</h4>
                    <div className="space-y-1 text-sm">
                      <div>"near me" - 890 vol</div>
                      <div>"in [city]" - 650 vol</div>
                      <div>"local" - 420 vol</div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice-search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Voice Search Optimization
              </CardTitle>
              <CardDescription>Conversational and question-based keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {performance.voiceSearchKeywords.map((keyword, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">"{keyword.keyword}"</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Intent: {keyword.intent} • Volume: {keyword.searchVolume}
                          </p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          Voice Optimized
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Voice Search Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">Question Words</h5>
                      <div className="space-y-1 text-sm">
                        <div>"What is..." - High intent</div>
                        <div>"How much..." - Commercial</div>
                        <div>"Where can I..." - Local</div>
                        <div>"Which is..." - Comparison</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">Natural Language</h5>
                      <div className="space-y-1 text-sm">
                        <div>Conversational tone</div>
                        <div>Complete sentences</div>
                        <div>Local context</div>
                        <div>Action-oriented</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
