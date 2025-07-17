
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEOOverview } from '@/components/seo/SEOOverview';
import { ImageManager } from '@/components/seo/ImageManager';
import { MetaManager } from '@/components/seo/MetaManager';
import { KeywordTracker } from '@/components/seo/KeywordTracker';
import { BacklinkAnalyzer } from '@/components/seo/BacklinkAnalyzer';
import { TechnicalSEO } from '@/components/seo/TechnicalSEO';
import { CompetitorAnalysis } from '@/components/seo/CompetitorAnalysis';
import { SEOReports } from '@/components/seo/SEOReports';
import { Shield, TrendingUp, Image, FileText, Search, Link, Settings, Users, BarChart3, Zap, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SEODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'SEO Health & Performance', color: 'text-blue-600' },
    { id: 'images', label: 'Images', icon: Image, description: 'Alt Tags & Media SEO', color: 'text-purple-600' },
    { id: 'meta', label: 'Meta Data', icon: FileText, description: 'Titles & Descriptions', color: 'text-green-600' },
    { id: 'keywords', label: 'Keywords', icon: Search, description: 'Rankings & SERP', color: 'text-orange-600' },
    { id: 'backlinks', label: 'Backlinks', icon: Link, description: 'Link Profile & Analysis', color: 'text-pink-600' },
    { id: 'technical', label: 'Technical', icon: Settings, description: 'Site Health & Audit', color: 'text-red-600' },
    { id: 'competitors', label: 'Competitors', icon: Users, description: 'Market Intelligence', color: 'text-teal-600' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, description: 'Export & Analytics', color: 'text-indigo-600' }
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <Helmet>
        <title>SEO Command Center - Agora Assurance Solutions</title>
        <meta name="description" content="Advanced SEO management dashboard for monitoring and optimizing search performance" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Professional Header */}
        <div className="border-b bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
                  <div className="relative p-2.5 lg:p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                    <Shield className="h-5 w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
                    SEO Command Center
                  </h1>
                  <p className="text-sm lg:text-base text-muted-foreground font-medium hidden sm:block">
                    Real-time SEO Intelligence & Optimization
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 lg:gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-200 px-2 lg:px-3 py-1 hidden sm:flex">
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full mr-1.5 lg:mr-2 animate-pulse"></div>
                  <span className="text-xs lg:text-sm">Live Monitoring</span>
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-2 lg:px-3 py-1 hidden md:flex">
                  <Zap className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-1" />
                  <span className="text-xs lg:text-sm">AI Powered</span>
                </Badge>
                
                {/* Mobile Menu Button */}
                {isMobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="lg:hidden"
                  >
                    {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 lg:space-y-8">
            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block">
              <TabsList className="grid w-full grid-cols-4 xl:grid-cols-8 gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border shadow-sm h-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`flex flex-col items-center gap-2 p-4 min-h-[80px] rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white shadow-md border-2 border-blue-200 scale-[1.02]'
                          : 'hover:bg-white/80 hover:shadow-sm'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? tab.color : 'text-muted-foreground'}`} />
                      <div className="text-center">
                        <span className={`text-sm font-semibold block ${isActive ? 'text-gray-900' : 'text-muted-foreground'}`}>
                          {tab.label}
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5 hidden xl:block">{tab.description}</p>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden">
              {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu}></div>
              )}
              
              <div className={`${mobileMenuOpen ? 'block' : 'hidden'} fixed top-[88px] left-0 right-0 bg-white border-b shadow-lg z-50 max-h-[50vh] overflow-y-auto`}>
                <div className="p-4 space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? tab.color : 'text-muted-foreground'}`} />
                        <div className="text-left">
                          <span className="font-semibold block">{tab.label}</span>
                          <span className="text-sm text-muted-foreground">{tab.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Active Tab Display */}
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex items-center gap-3">
                  {(() => {
                    const activeTabData = tabs.find(tab => tab.id === activeTab);
                    const Icon = activeTabData?.icon || BarChart3;
                    return (
                      <>
                        <Icon className={`h-6 w-6 ${activeTabData?.color || 'text-blue-600'}`} />
                        <div>
                          <h2 className="font-semibold text-gray-900">{activeTabData?.label}</h2>
                          <p className="text-sm text-muted-foreground">{activeTabData?.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6 lg:space-y-8">
              <TabsContent value="overview" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <SEOOverview />
              </TabsContent>

              <TabsContent value="images" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <ImageManager />
              </TabsContent>

              <TabsContent value="meta" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <MetaManager />
              </TabsContent>

              <TabsContent value="keywords" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <KeywordTracker />
              </TabsContent>

              <TabsContent value="backlinks" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <BacklinkAnalyzer />
              </TabsContent>

              <TabsContent value="technical" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <TechnicalSEO />
              </TabsContent>

              <TabsContent value="competitors" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
                <CompetitorAnalysis />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
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
