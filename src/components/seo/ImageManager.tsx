
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image, AlertTriangle, CheckCircle, Edit3, Zap, RefreshCw, Sparkles } from 'lucide-react';
import { useSiteScanner } from '@/hooks/useSiteScanner';

export const ImageManager = () => {
  const { images, metrics, isScanning, scanSiteImages, updateImageAlt, generateAISuggestion } = useSiteScanner();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = images.filter(img => 
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: images.length,
    optimized: images.filter(img => img.hasAlt && img.isOptimized).length,
    missingAlt: images.filter(img => !img.hasAlt).length,
    needsImprovement: images.filter(img => img.hasAlt && !img.isOptimized).length
  };

  const getStatusColor = (image: any) => {
    if (image.hasAlt && image.isOptimized) return 'text-green-600 bg-green-100 border-green-200';
    if (image.hasAlt) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getStatusIcon = (image: any) => {
    if (image.hasAlt && image.isOptimized) return <CheckCircle className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getStatusText = (image: any) => {
    if (image.hasAlt && image.isOptimized) return 'Optimized';
    if (image.hasAlt) return 'Needs Improvement';
    return 'Missing Alt Text';
  };

  const handleAISuggestion = (image: any) => {
    const suggestion = generateAISuggestion(image);
    updateImageAlt(image.id, suggestion);
  };

  return (
    <div className="space-y-8">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Image className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                <p className="text-sm text-blue-700">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.optimized}</p>
                <p className="text-sm text-green-700">Fully Optimized</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-900">{stats.needsImprovement}</p>
                <p className="text-sm text-yellow-700">Needs Work</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{stats.missingAlt}</p>
                <p className="text-sm text-red-700">Missing Alt Text</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Image className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Live Image SEO Manager</CardTitle>
                <CardDescription>Real-time scanning and optimization of all site images</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {metrics && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Last scan: {metrics.lastUpdated.toLocaleTimeString()}
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={scanSiteImages}
                disabled={isScanning}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search images by filename or alt text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-200"
              />
            </div>
          </div>

          {stats.missingAlt > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{stats.missingAlt} images</strong> are missing alt tags, which affects accessibility and SEO rankings.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid gap-6">
        {filteredImages.length === 0 ? (
          <Card className="bg-white border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Found</h3>
              <p className="text-gray-600">
                {images.length === 0 
                  ? "No images detected on the current page. Navigate to pages with images and refresh the scan."
                  : "No images match your search criteria."
                }
              </p>
              {images.length === 0 && (
                <Button 
                  onClick={scanSiteImages} 
                  className="mt-4 gap-2"
                  disabled={isScanning}
                >
                  <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
                  Scan for Images
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredImages.map((image) => (
            <Card key={image.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="shrink-0">
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt || 'Image preview'}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA4VjE2TTE2IDEySDgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                        }}
                      />
                      <div className="absolute -top-2 -right-2">
                        <Badge className={getStatusColor(image)} variant="outline">
                          {getStatusIcon(image)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{image.filename}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{image.format}</Badge>
                          <Badge className={getStatusColor(image)} variant="outline">
                            {getStatusText(image)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleAISuggestion(image)}
                          className="gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          AI Suggest
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2">
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Image Metadata</DialogTitle>
                              <DialogDescription>
                                Update alt text and other metadata for better SEO and accessibility
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex gap-4">
                                <img
                                  src={image.src}
                                  alt={image.alt || 'Image preview'}
                                  className="w-32 h-32 object-cover rounded-lg border"
                                />
                                <div className="flex-1 space-y-2">
                                  <p className="font-medium">{image.filename}</p>
                                  <p className="text-sm text-muted-foreground">Format: {image.format}</p>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="gap-2"
                                    onClick={() => handleAISuggestion(image)}
                                  >
                                    <Zap className="h-4 w-4" />
                                    Generate AI Alt Text
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="alt">Alt Text *</Label>
                                  <Textarea
                                    id="alt"
                                    value={image.alt}
                                    onChange={(e) => updateImageAlt(image.id, e.target.value)}
                                    placeholder="Describe the image for screen readers and SEO"
                                    rows={2}
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {image.alt.length}/125 characters (recommended max)
                                  </p>
                                </div>
                                
                                <div>
                                  <Label htmlFor="title">Title Attribute</Label>
                                  <Input
                                    id="title"
                                    defaultValue={image.title}
                                    placeholder="Optional image title for tooltips"
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
                    </div>
                    
                    <div className="grid gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground font-medium">Alt Text</Label>
                        <p className="text-sm mt-1">
                          {image.alt ? (
                            <span className="text-gray-900">{image.alt}</span>
                          ) : (
                            <span className="text-red-600 font-medium">⚠️ Missing - Required for accessibility</span>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground font-medium">Used In</Label>
                        <p className="text-sm text-gray-600 mt-1">{image.usedIn.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
