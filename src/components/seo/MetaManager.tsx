
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Edit3, Eye, Smartphone, Monitor, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const MetaManager = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  // Mock data - in real implementation, this would scan all pages
  const pages = [
    {
      id: 1,
      url: '/',
      title: 'Agora Assurance Solutions - Your Independent Insurance Partner',
      metaDescription: 'Comprehensive life insurance, mortgage protection, and annuity solutions. Get personalized quotes and expert guidance from licensed professionals.',
      h1: 'Your Independent Insurance Partner',
      h2Count: 4,
      h3Count: 8,
      status: 'complete',
      issues: [],
      titleLength: 64,
      descLength: 142
    },
    {
      id: 2,
      url: '/services/term-life',
      title: 'Term Life Insurance - Affordable Protection',
      metaDescription: '',
      h1: 'Term Life Insurance',
      h2Count: 3,
      h3Count: 6,
      status: 'missing',
      issues: ['Missing meta description'],
      titleLength: 42,
      descLength: 0
    },
    {
      id: 3,
      url: '/about',
      title: 'About Agora Assurance Solutions - Our Story and Mission to Protect Families',
      metaDescription: 'Learn about our mission to provide personalized insurance solutions. Founded on trust, expertise, and commitment to protecting what matters most.',
      h1: 'About Agora Assurance Solutions',
      h2Count: 2,
      h3Count: 4,
      status: 'warning',
      issues: ['Title too long (78 characters)'],
      titleLength: 78,
      descLength: 135
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-100';
      case 'missing': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const SERPPreview = ({ page, device = 'desktop' }) => (
    <div className={`border rounded-lg p-4 ${device === 'mobile' ? 'max-w-sm' : 'max-w-lg'}`}>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">
          agora.yenomai.com{page.url}
        </div>
        <div className="text-blue-600 hover:underline cursor-pointer font-medium">
          {page.title}
        </div>
        <div className="text-sm text-muted-foreground line-clamp-2">
          {page.metaDescription || 'No meta description available'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{pages.length}</p>
                <p className="text-sm text-muted-foreground">Total Pages</p>
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
                  {pages.filter(p => p.status === 'complete').length}
                </p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {pages.filter(p => p.status === 'warning').length}
                </p>
                <p className="text-sm text-muted-foreground">Warnings</p>
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
                  {pages.filter(p => p.status === 'missing').length}
                </p>
                <p className="text-sm text-muted-foreground">Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Page Meta Data Manager
          </CardTitle>
          <CardDescription>Manage titles, descriptions, and heading structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pages.map((page) => (
              <Card key={page.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{page.url}</h3>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div>
                        <Label className="text-xs text-muted-foreground">Title ({page.titleLength} chars)</Label>
                        <p className={page.titleLength > 60 ? 'text-yellow-600' : ''}>
                          {page.title}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Meta Description ({page.descLength} chars)
                        </Label>
                        <p className={page.descLength === 0 ? 'text-red-500' : page.descLength > 160 ? 'text-yellow-600' : ''}>
                          {page.metaDescription || 'Missing meta description'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Headings</Label>
                        <p>H1: {page.h1} | H2: {page.h2Count} | H3: {page.h3Count}</p>
                      </div>
                    </div>
                    {page.issues.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {page.issues.map((issue, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>SERP Preview - {page.url}</DialogTitle>
                          <DialogDescription>
                            How this page appears in search results
                          </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="desktop">
                          <TabsList>
                            <TabsTrigger value="desktop" className="flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              Desktop
                            </TabsTrigger>
                            <TabsTrigger value="mobile" className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4" />
                              Mobile
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="desktop" className="space-y-4">
                            <div className="bg-gray-50 p-6 rounded-lg">
                              <h4 className="font-medium mb-4">Google Search Results</h4>
                              <SERPPreview page={page} device="desktop" />
                            </div>
                          </TabsContent>
                          <TabsContent value="mobile" className="space-y-4">
                            <div className="bg-gray-50 p-6 rounded-lg">
                              <h4 className="font-medium mb-4">Mobile Search Results</h4>
                              <SERPPreview page={page} device="mobile" />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex items-center gap-2">
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Edit Meta Data - {page.url}</DialogTitle>
                          <DialogDescription>
                            Update SEO elements for better search visibility
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label htmlFor="title">Title Tag</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {page.titleLength}/60 chars
                                </span>
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Zap className="h-3 w-3" />
                                  AI
                                </Button>
                              </div>
                            </div>
                            <Input
                              id="title"
                              defaultValue={page.title}
                              placeholder="Enter page title"
                            />
                            {page.titleLength > 60 && (
                              <p className="text-xs text-yellow-600 mt-1">
                                Title is too long for optimal display
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label htmlFor="description">Meta Description</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {page.descLength}/160 chars
                                </span>
                                <Button size="sm" variant="outline" className="flex items-center gap-1">
                                  <Zap className="h-3 w-3" />
                                  AI
                                </Button>
                              </div>
                            </div>
                            <Textarea
                              id="description"
                              defaultValue={page.metaDescription}
                              placeholder="Enter meta description"
                              rows={3}
                            />
                            {page.descLength === 0 && (
                              <p className="text-xs text-red-600 mt-1">
                                Meta description is required for SEO
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="h1">H1 Heading</Label>
                            <Input
                              id="h1"
                              defaultValue={page.h1}
                              placeholder="Main page heading"
                            />
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Preview</h4>
                            <SERPPreview page={page} />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
