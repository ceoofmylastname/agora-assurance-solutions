
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOOverview } from '@/components/seo/SEOOverview';
import { ImageManager } from '@/components/seo/ImageManager';
import { MetaManager } from '@/components/seo/MetaManager';
import { KeywordTracker } from '@/components/seo/KeywordTracker';
import { BacklinkAnalyzer } from '@/components/seo/BacklinkAnalyzer';
import { TechnicalSEO } from '@/components/seo/TechnicalSEO';
import { CompetitorAnalysis } from '@/components/seo/CompetitorAnalysis';
import { SEOReports } from '@/components/seo/SEOReports';
import { Shield, TrendingUp, Image, FileText, Search, Link, Settings, Users, BarChart3 } from 'lucide-react';

const SEODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'SEO Health & Performance' },
    { id: 'images', label: 'Images', icon: Image, description: 'Alt Tags & Media SEO' },
    { id: 'meta', label: 'Meta Data', icon: FileText, description: 'Titles & Descriptions' },
    { id: 'keywords', label: 'Keywords', icon: Search, description: 'Rankings & SERP' },
    { id: 'backlinks', label: 'Backlinks', icon: Link, description: 'Link Profile & Analysis' },
    { id: 'technical', label: 'Technical', icon: Settings, description: 'Site Health & Audit' },
    { id: 'competitors', label: 'Competitors', icon: Users, description: 'Market Intelligence' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, description: 'Export & Analytics' }
  ];

  return (
    <>
      <Helmet>
        <title>SEO Dashboard - Agora Assurance Solutions</title>
        <meta name="description" content="Comprehensive SEO management dashboard for monitoring and optimizing search performance" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">SEO Command Center</h1>
                  <p className="text-muted-foreground">Advanced SEO Management & Analytics</p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Real-time Monitoring Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex flex-col items-center gap-1 p-3 min-w-[100px]"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="space-y-6">
              <TabsContent value="overview" className="space-y-6">
                <SEOOverview />
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <ImageManager />
              </TabsContent>

              <TabsContent value="meta" className="space-y-6">
                <MetaManager />
              </TabsContent>

              <TabsContent value="keywords" className="space-y-6">
                <KeywordTracker />
              </TabsContent>

              <TabsContent value="backlinks" className="space-y-6">
                <BacklinkAnalyzer />
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                <TechnicalSEO />
              </TabsContent>

              <TabsContent value="competitors" className="space-y-6">
                <CompetitorAnalysis />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <SEOReports />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SEODashboard;
