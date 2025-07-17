
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image, AlertTriangle, CheckCircle, Edit3, Download, Upload, Zap } from 'lucide-react';

export const ImageManager = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real implementation, this would come from scanning components
  const images = [
    {
      id: 1,
      src: '/lovable-uploads/610dc05e-0552-4a89-97b1-852580e78ec0.png',
      filename: 'agora-logo.png',
      format: 'PNG',
      size: '45KB',
      alt: 'Agora Assurance Solutions Logo',
      title: 'Insurance Company Logo',
      description: 'Professional logo for Agora Assurance Solutions',
      status: 'complete',
      usedIn: ['Header', 'Footer', 'About Page']
    },
    {
      id: 2,
      src: '/lovable-uploads/hero-family-protection.webp',
      filename: 'hero-family-protection.webp',
      format: 'WebP',
      size: '128KB',
      alt: '',
      title: '',
      description: '',
      status: 'missing',
      usedIn: ['Homepage Hero']
    },
    {
      id: 3,
      src: '/lovable-uploads/life-insurance-analysis.webp',
      filename: 'life-insurance-analysis.webp',
      format: 'WebP',
      size: '95KB',
      alt: 'Life insurance policy analysis document',
      title: '',
      description: '',
      status: 'partial',
      usedIn: ['Services Page', 'Blog']
    },
    {
      id: 4,
      src: '/lovable-uploads/retirement-planning-couple.webp',
      filename: 'retirement-planning-couple.webp',
      format: 'WebP',
      size: '156KB',
      alt: 'Happy couple planning retirement with financial advisor',
      title: 'Retirement Planning Session',
      description: 'Professional consultation for retirement planning services',
      status: 'complete',
      usedIn: ['Annuities Page']
    }
  ];

  const filteredImages = images.filter(img => 
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: images.length,
    complete: images.filter(img => img.status === 'complete').length,
    missing: images.filter(img => img.status === 'missing').length,
    partial: images.filter(img => img.status === 'partial').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-100';
      case 'missing': return 'text-red-600 bg-red-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4" />;
      case 'missing': return <AlertTriangle className="h-4 w-4" />;
      case 'partial': return <AlertTriangle className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.complete}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{stats.partial}</p>
                <p className="text-sm text-muted-foreground">Partial</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.missing}</p>
                <p className="text-sm text-muted-foreground">Missing Alt</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Image SEO Manager
          </CardTitle>
          <CardDescription>Manage alt tags, titles, and descriptions for all images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search images by filename or alt text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Bulk Import
            </Button>
          </div>

          {stats.missing > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {stats.missing} images are missing alt tags, which affects accessibility and SEO.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="shrink-0">
                  <img
                    src={image.src}
                    alt={image.alt || 'Image preview'}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{image.filename}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{image.format}</Badge>
                        <Badge variant="outline">{image.size}</Badge>
                        <Badge className={getStatusColor(image.status)}>
                          {getStatusIcon(image.status)}
                          <span className="ml-1 capitalize">{image.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Image Metadata</DialogTitle>
                          <DialogDescription>
                            Update alt text, title, and description for SEO optimization
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <img
                              src={image.src}
                              alt={image.alt || 'Image preview'}
                              className="w-32 h-32 object-cover rounded-lg border"
                            />
                            <div className="flex-1 space-y-2">
                              <p className="font-medium">{image.filename}</p>
                              <p className="text-sm text-muted-foreground">
                                Used in: {image.usedIn.join(', ')}
                              </p>
                              <Button size="sm" variant="outline" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                AI Generate
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="alt">Alt Text *</Label>
                              <Input
                                id="alt"
                                defaultValue={image.alt}
                                placeholder="Describe the image for screen readers"
                              />
                            </div>
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                defaultValue={image.title}
                                placeholder="Image title for tooltips"
                              />
                            </div>
                            <div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                defaultValue={image.description}
                                placeholder="Detailed image description for context"
                                rows={3}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Alt Text</Label>
                      <p className="text-sm">{image.alt || <span className="text-red-500">Missing</span>}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Title</Label>
                      <p className="text-sm">{image.title || <span className="text-muted-foreground">Not set</span>}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Used In</Label>
                      <p className="text-sm">{image.usedIn.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
