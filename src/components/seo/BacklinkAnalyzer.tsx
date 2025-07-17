
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ExternalLink, Plus } from 'lucide-react';

export const BacklinkAnalyzer = () => {
  const backlinks = [
    {
      id: 1,
      domain: 'insurancenews.com',
      url: 'https://insurancenews.com/life-insurance-guide',
      anchor: 'term life insurance',
      domainAuthority: 78,
      trustFlow: 65,
      status: 'active',
      type: 'dofollow',
      firstSeen: '2024-01-15',
      traffic: 2400
    },
    {
      id: 2,
      domain: 'financialplanning.org',
      url: 'https://financialplanning.org/resources',
      anchor: 'Agora Assurance Solutions',
      domainAuthority: 82,
      trustFlow: 71,
      status: 'active',
      type: 'dofollow',
      firstSeen: '2024-02-03',
      traffic: 1890
    },
    {
      id: 3,
      domain: 'retirementblog.net',
      url: 'https://retirementblog.net/annuities-comparison',
      anchor: 'annuity experts',
      domainAuthority: 45,
      trustFlow: 38,
      status: 'lost',
      type: 'dofollow',
      firstSeen: '2023-11-20',
      traffic: 0
    }
  ];

  const competitors = [
    {
      domain: 'competitor1.com',
      backlinks: 15600,
      domains: 890,
      domainAuthority: 68,
      organicTraffic: 45000
    },
    {
      domain: 'competitor2.com',
      backlinks: 23400,
      domains: 1240,
      domainAuthority: 72,
      organicTraffic: 67000
    }
  ];

  const opportunities = [
    {
      domain: 'insurance-journal.com',
      domainAuthority: 75,
      relevance: 'high',
      likelihood: 'medium',
      contact: 'editor@insurance-journal.com'
    },
    {
      domain: 'money-guide.org',
      domainAuthority: 68,
      relevance: 'medium',
      likelihood: 'high',
      contact: 'content@money-guide.org'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'lost': return 'text-red-600 bg-red-100';
      case 'toxic': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDomainAuthorityColor = (da) => {
    if (da >= 70) return 'text-green-600';
    if (da >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Backlink Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{backlinks.length}</p>
                <p className="text-sm text-muted-foreground">Total Backlinks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {backlinks.filter(b => b.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Links</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {backlinks.filter(b => b.status === 'lost').length}
                </p>
                <p className="text-sm text-muted-foreground">Lost Links</p>
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
                  {Math.round(backlinks.reduce((sum, b) => sum + b.domainAuthority, 0) / backlinks.length)}
                </p>
                <p className="text-sm text-muted-foreground">Avg Domain Authority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backlinks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backlinks">Backlink Profile</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="opportunities">Link Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Backlink Profile
              </CardTitle>
              <CardDescription>Monitor your link portfolio quality and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backlinks.map((link) => (
                  <Card key={link.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{link.domain}</h3>
                          <Badge className={getStatusColor(link.status)}>
                            {link.status}
                          </Badge>
                          <Badge variant="outline">
                            {link.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Anchor: "{link.anchor}"
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>DA: <span className={getDomainAuthorityColor(link.domainAuthority)}>{link.domainAuthority}</span></span>
                          <span>TF: {link.trustFlow}</span>
                          <span>Traffic: {link.traffic.toLocaleString()}</span>
                          <span>First seen: {link.firstSeen}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Backlink Analysis</CardTitle>
              <CardDescription>Compare your link profile with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((comp, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{comp.domain}</h3>
                        <p className="text-sm text-muted-foreground">
                          Competitor analysis
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Backlinks</p>
                          <p className="font-semibold">{comp.backlinks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Domains</p>
                          <p className="font-semibold">{comp.domains.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">DA</p>
                          <p className={`font-semibold ${getDomainAuthorityColor(comp.domainAuthority)}`}>
                            {comp.domainAuthority}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Traffic</p>
                          <p className="font-semibold">{comp.organicTraffic.toLocaleString()}</p>
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
              <CardTitle>Link Building Opportunities</CardTitle>
              <CardDescription>High-quality prospects for link acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{opp.domain}</h3>
                          <Badge className={
                            opp.relevance === 'high' ? 'bg-green-100 text-green-800' :
                            opp.relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {opp.relevance} relevance
                          </Badge>
                          <Badge variant="outline">
                            {opp.likelihood} likelihood
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contact: {opp.contact}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Domain Authority</p>
                          <p className={`font-semibold ${getDomainAuthorityColor(opp.domainAuthority)}`}>
                            {opp.domainAuthority}
                          </p>
                        </div>
                        <Button size="sm" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add to Campaign
                        </Button>
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
