
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Download, Mail, Calendar, FileText, TrendingUp, Eye, Search } from 'lucide-react';

export const SEOReports = () => {
  const reportTemplates = [
    {
      name: 'Executive SEO Summary',
      description: 'High-level overview for stakeholders',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      format: 'PDF'
    },
    {
      name: 'Technical SEO Audit',
      description: 'Detailed technical analysis',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-10',
      format: 'PDF + Excel'
    },
    {
      name: 'Keyword Performance Report',
      description: 'Ranking changes and opportunities',
      frequency: 'Weekly',
      lastGenerated: '2024-01-16',
      format: 'Excel'
    },
    {
      name: 'Competitor Analysis',
      description: 'Market position and gap analysis',
      frequency: 'Monthly',
      lastGenerated: '2024-01-12',
      format: 'PDF'
    }
  ];

  const scheduledReports = [
    {
      name: 'Weekly Keyword Report',
      recipients: ['ceo@agora.com', 'marketing@agora.com'],
      nextSend: '2024-01-22',
      status: 'active'
    },
    {
      name: 'Monthly Executive Summary',
      recipients: ['board@agora.com'],
      nextSend: '2024-02-01',
      status: 'active'
    }
  ];

  const exportData = {
    keywords: 1247,
    pages: 45,
    backlinks: 3156,
    images: 234
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats for Export */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{exportData.keywords}</p>
                <p className="text-sm text-muted-foreground">Keywords Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{exportData.pages}</p>
                <p className="text-sm text-muted-foreground">Pages Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{exportData.backlinks}</p>
                <p className="text-sm text-muted-foreground">Backlinks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{exportData.images}</p>
                <p className="text-sm text-muted-foreground">Images</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="export">Data Export</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Report Templates
              </CardTitle>
              <CardDescription>Generate comprehensive SEO reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: {template.frequency}</span>
                          <span>Last: {template.lastGenerated}</span>
                          <span>Format: {template.format}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Customize
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Automated report delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Schedule New Report
                  </Button>
                </div>
                {scheduledReports.map((report, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{report.name}</h3>
                          <Badge className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Recipients: {report.recipients.join(', ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Next send: {report.nextSend}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Send Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Export
              </CardTitle>
              <CardDescription>Export raw data for external analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Export Type</h4>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Data</SelectItem>
                        <SelectItem value="keywords">Keywords Only</SelectItem>
                        <SelectItem value="pages">Page Data</SelectItem>
                        <SelectItem value="backlinks">Backlinks</SelectItem>
                        <SelectItem value="images">Image Metadata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Format</h4>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Date Range</h4>
                  <div className="flex gap-4">
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="1year">Last year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
