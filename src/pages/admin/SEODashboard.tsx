
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SEOOverview } from '@/components/seo/SEOOverview';
import { ImageManager } from '@/components/seo/ImageManager';
import { MetaManager } from '@/components/seo/MetaManager';
import { KeywordTracker } from '@/components/seo/KeywordTracker';
import { BacklinkAnalyzer } from '@/components/seo/BacklinkAnalyzer';
import { TechnicalSEO } from '@/components/seo/TechnicalSEO';
import { CompetitorAnalysis } from '@/components/seo/CompetitorAnalysis';
import { SEOReports } from '@/components/seo/SEOReports';
import { Shield, TrendingUp, Image, FileText, Search, Link, Settings, Users, BarChart3, Zap } from 'lucide-react';

const SEODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'SEO Health & Performance', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { id: 'images', label: 'Images', icon: Image, description: 'Alt Tags & Media SEO', color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
    { id: 'meta', label: 'Meta Data', icon: FileText, description: 'Titles & Descriptions', color: 'bg-green-500/10 text-green-600 border-green-200' },
    { id: 'keywords', label: 'Keywords', icon: Search, description: 'Rankings & SERP', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
    { id: 'backlinks', label: 'Backlinks', icon: Link, description: 'Link Profile & Analysis', color: 'bg-pink-500/10 text-pink-600 border-pink-200' },
    { id: 'technical', label: 'Technical', icon: Settings, description: 'Site Health & Audit', color: 'bg-red-500/10 text-red-600 border-red-200' },
    { id: 'competitors', label: 'Competitors', icon: Users, description: 'Market Intelligence', color: 'bg-teal-500/10 text-teal-600 border-teal-200' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, description: 'Export & Analytics', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' }
  ];

  return (
    <>
      <Helmet>
        <title>SEO Command Center - Agora Assurance Solutions</title>
        <meta name="description" content="Advanced SEO management dashboard for monitoring and optimizing search performance" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Modern Header */}
        <div className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    SEO Command Center
                  </h1>
                  <p className="text-muted-foreground font-medium">Real-time SEO Intelligence & Optimization</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live Monitoring
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Modern Tab Navigation */}
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border shadow-sm min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`flex flex-col items-center gap-2 p-4 min-w-[120px] rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white shadow-md border-2 scale-105' + ' ' + tab.color
                          : 'hover:bg-white/80 hover:shadow-sm'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? '' : 'text-muted-foreground'}`} />
                      <div className="text-center">
                        <span className={`text-sm font-semibold ${isActive ? '' : 'text-muted-foreground'}`}>
                          {tab.label}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{tab.description}</p>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab Content with Modern Cards */}
            <div className="space-y-8">
              <TabsContent value="overview" className="space-y-8 mt-8">
                <SEOOverview />
              </TabsContent>

              <TabsContent value="images" className="space-y-8 mt-8">
                <ImageManager />
              </TabsContent>

              <TabsContent value="meta" className="space-y-8 mt-8">
                <MetaManager />
              </TabsContent>

              <TabsContent value="keywords" className="space-y-8 mt-8">
                <KeywordTracker />
              </TabsContent>

              <TabsContent value="backlinks" className="space-y-8 mt-8">
                <BacklinkAnalyzer />
              </TabsContent>

              <TabsContent value="technical" className="space-y-8 mt-8">
                <TechnicalSEO />
              </TabsContent>

              <TabsContent value="competitors" className="space-y-8 mt-8">
                <CompetitorAnalysis />
              </TabsContent>

              <TabsContent value="reports" className="space-y-8 mt-8">
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
