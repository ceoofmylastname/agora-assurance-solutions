
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Edit3, Eye, Smartphone, Monitor, AlertTriangle, CheckCircle, Zap, RefreshCw } from 'lucide-react';
import { usePageScanner } from '@/hooks/usePageScanner';
import { PageMeta } from '@/hooks/useSiteScanner';
import { useToast } from '@/hooks/use-toast';

export const MetaManager = () => {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageMeta | null>(null);
  const [editingPage, setEditingPage] = useState<PageMeta | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    metaDescription: '',
    h1: ''
  });

  const { isScanning, scanAllPagesMeta, updatePageMeta } = usePageScanner();
  const { toast } = useToast();

  useEffect(() => {
    // Initial scan
    handleRefreshPages();
  }, []);

  const handleRefreshPages = async () => {
    try {
      const scannedPages = await scanAllPagesMeta();
      setPages(scannedPages);
    } catch (error) {
      console.error('Failed to scan pages:', error);
      toast({
        title: "Scan Failed",
        description: "Could not scan all pages. Showing current page only.",
        variant: "destructive",
      });
    }
  };

  const handleEditPage = (page: PageMeta) => {
    setEditingPage(page);
    setEditForm({
      title: page.title,
      metaDescription: page.metaDescription,
      h1: page.h1
    });
  };

  const handleSaveChanges = async () => {
    if (!editingPage) return;

    try {
      await updatePageMeta(editingPage.url, editForm);
      
      // Update the pages state with new data
      setPages(prev => prev.map(page => 
        page.url === editingPage.url 
          ? {
              ...page,
              title: editForm.title,
              metaDescription: editForm.metaDescription,
              h1: editForm.h1,
              titleLength: editForm.title.length,
              descLength: editForm.metaDescription.length,
              issues: calculateIssues(editForm)
            }
          : page
      ));

      setEditingPage(null);
      toast({
        title: "Changes Saved",
        description: "Page metadata has been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast({
        title: "Save Failed",
        description: "Could not save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculateIssues = (formData: typeof editForm): string[] => {
    const issues: string[] = [];
    if (!formData.title) issues.push('Missing title tag');
    if (!formData.metaDescription) issues.push('Missing meta description');
    if (!formData.h1) issues.push('Missing H1 tag');
    if (formData.title.length > 60) issues.push('Title too long');
    if (formData.title.length < 30 && formData.title.length > 0) issues.push('Title too short');
    if (formData.metaDescription.length > 160) issues.push('Description too long');
    if (formData.metaDescription.length < 120 && formData.metaDescription.length > 0) issues.push('Description too short');
    return issues;
  };

  const getStatusColor = (page: PageMeta) => {
    if (page.issues.length === 0) return 'text-green-600 bg-green-100';
    if (page.issues.length <= 2) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatus = (page: PageMeta) => {
    if (page.issues.length === 0) return 'complete';
    if (page.issues.length <= 2) return 'warning';
    return 'missing';
  };

  const SERPPreview = ({ page, device = 'desktop' }: { page: PageMeta; device?: string }) => (
    <div className={`border rounded-lg p-4 ${device === 'mobile' ? 'max-w-sm' : 'max-w-lg'}`}>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">
          agora.yenomai.com{page.url}
        </div>
        <div className="text-blue-600 hover:underline cursor-pointer font-medium">
          {page.title || 'No title'}
        </div>
        <div className="text-sm text-muted-foreground line-clamp-2">
          {page.metaDescription || 'No meta description available'}
        </div>
      </div>
    </div>
  );

  const generateAISuggestion = (page: PageMeta, field: 'title' | 'metaDescription') => {
    const pageContext = page.url.toLowerCase();
    
    if (field === 'title') {
      if (pageContext.includes('life') || pageContext.includes('insurance')) {
        return 'Life Insurance Solutions - Protect Your Family\'s Future | Agora Assurance';
      } else if (pageContext.includes('about')) {
        return 'About Agora Assurance - Your Trusted Insurance Partner';
      } else {
        return 'Professional Insurance Services | Agora Assurance Solutions';
      }
    } else {
      if (pageContext.includes('life') || pageContext.includes('insurance')) {
        return 'Comprehensive life insurance solutions to protect your family\'s financial future. Get personalized quotes and expert guidance from licensed professionals.';
      } else if (pageContext.includes('about')) {
        return 'Learn about our mission to provide personalized insurance solutions. Founded on trust, expertise, and commitment to protecting what matters most.';
      } else {
        return 'Professional insurance and financial protection services. Get expert guidance and personalized solutions for your family\'s security.';
      }
    }
  };

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
                  {pages.filter(p => getStatus(p) === 'complete').length}
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
                  {pages.filter(p => getStatus(p) === 'warning').length}
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
                  {pages.filter(p => getStatus(p) === 'missing').length}
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Page Meta Data Manager
              </CardTitle>
              <CardDescription>Manage titles, descriptions, and heading structure</CardDescription>
            </div>
            <Button 
              onClick={handleRefreshPages} 
              disabled={isScanning}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isScanning && pages.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center space-y-2">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Scanning pages for meta data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page, index) => (
                <Card key={`${page.url}-${index}`} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{page.url}</h3>
                        <Badge className={getStatusColor(page)}>
                          {getStatus(page)}
                        </Badge>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Title ({page.titleLength} chars)</Label>
                          <p className={page.titleLength > 60 ? 'text-yellow-600' : ''}>
                            {page.title || 'No title'}
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
                          <p>H1: {page.h1 || 'Missing'} | H2: {page.h2Count} | H3: {page.h3Count}</p>
                        </div>
                      </div>
                      {page.issues.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {page.issues.map((issue, issueIndex) => (
                            <Badge key={issueIndex} variant="destructive" className="text-xs">
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
                      <Dialog open={editingPage?.url === page.url} onOpenChange={(open) => !open && setEditingPage(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center gap-2" onClick={() => handleEditPage(page)}>
                            <Edit3 className="h-4 w-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Edit Meta Data - {page.url}</DialogTitle>
                            <DialogDescription>
                              Update SEO elements for better search visibility
                              {page.url !== window.location.pathname && (
                                <span className="block mt-1 text-yellow-600 text-xs">
                                  Note: Changes to other pages will only apply temporarily for preview
                                </span>
                              )}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="title">Title Tag</Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {editForm.title.length}/60 chars
                                  </span>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex items-center gap-1"
                                    onClick={() => setEditForm(prev => ({ ...prev, title: generateAISuggestion(page, 'title') }))}
                                  >
                                    <Zap className="h-3 w-3" />
                                    AI
                                  </Button>
                                </div>
                              </div>
                              <Input
                                id="title"
                                value={editForm.title}
                                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter page title"
                              />
                              {editForm.title.length > 60 && (
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
                                    {editForm.metaDescription.length}/160 chars
                                  </span>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex items-center gap-1"
                                    onClick={() => setEditForm(prev => ({ ...prev, metaDescription: generateAISuggestion(page, 'metaDescription') }))}
                                  >
                                    <Zap className="h-3 w-3" />
                                    AI
                                  </Button>
                                </div>
                              </div>
                              <Textarea
                                id="description"
                                value={editForm.metaDescription}
                                onChange={(e) => setEditForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                                placeholder="Enter meta description"
                                rows={3}
                              />
                              {editForm.metaDescription.length === 0 && (
                                <p className="text-xs text-red-600 mt-1">
                                  Meta description is required for SEO
                                </p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="h1">H1 Heading</Label>
                              <Input
                                id="h1"
                                value={editForm.h1}
                                onChange={(e) => setEditForm(prev => ({ ...prev, h1: e.target.value }))}
                                placeholder="Main page heading"
                              />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Preview</h4>
                              <SERPPreview page={{ ...page, title: editForm.title, metaDescription: editForm.metaDescription }} />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setEditingPage(null)}>Cancel</Button>
                              <Button onClick={handleSaveChanges}>Save Changes</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
