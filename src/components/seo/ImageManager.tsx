import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Image, AlertTriangle, CheckCircle, Edit3, Zap, RefreshCw, Sparkles, Download, Globe, FileImage, PackageOpen } from 'lucide-react';
import { useSiteScanner } from '@/hooks/useSiteScanner';
import { useToast } from '@/hooks/use-toast';
import { BulkWebPConverter } from './BulkWebPConverter';
import { convertImageToWebP, downloadBlob } from '@/utils/webpConverter';

export const ImageManager = () => {
  const { images, metrics, isScanning, isConverting, scanSiteImages, updateImageAlt, generateAISuggestion, convertToWebP } = useSiteScanner();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBulkConverter, setShowBulkConverter] = useState(false);
  const { toast } = useToast();

  const filteredImages = images.filter(img => 
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.usedIn.some(page => page.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: images.length,
    optimized: images.filter(img => img.hasAlt && img.isOptimized).length,
    missingAlt: images.filter(img => !img.hasAlt).length,
    needsImprovement: images.filter(img => img.hasAlt && !img.isOptimized).length,
    canConvert: images.filter(img => img.canConvertToWebP).length
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
    toast({
      title: "AI Alt Text Applied",
      description: `Generated alt text: "${suggestion.substring(0, 50)}${suggestion.length > 50 ? '...' : ''}"`,
    });
  };

  const handleWebPConversion = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image || !image.canConvertToWebP) return;

    try {
      const result = await convertImageToWebP(image.src, image.filename, { quality: 0.8, format: 'webp' });
      downloadBlob(result.blob, result.filename);
      
      toast({
        title: "WebP Conversion Complete",
        description: `Saved ${((result.savingsPercent || 0)).toFixed(1)}% file size. Image downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "Could not convert image to WebP. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-blue-600 rounded-lg">
                <Image className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-blue-900">{stats.total}</p>
                <p className="text-xs lg:text-sm text-blue-700">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-green-600 rounded-lg">
                <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-green-900">{stats.optimized}</p>
                <p className="text-xs lg:text-sm text-green-700">Optimized</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-yellow-600 rounded-lg">
                <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-yellow-900">{stats.needsImprovement}</p>
                <p className="text-xs lg:text-sm text-yellow-700">Needs Work</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-red-600 rounded-lg">
                <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-red-900">{stats.missingAlt}</p>
                <p className="text-xs lg:text-sm text-red-700">Missing Alt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-purple-600 rounded-lg">
                <FileImage className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-purple-900">{stats.canConvert}</p>
                <p className="text-xs lg:text-sm text-purple-700">WebP Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg lg:text-xl">Site-wide Image SEO Manager</CardTitle>
                <CardDescription>Real-time scanning and optimization of all website images</CardDescription>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {metrics && (
                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                  Last scan: {metrics.lastUpdated.toLocaleTimeString()}
                </Badge>
              )}
              <div className="flex gap-2">
                {stats.canConvert > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowBulkConverter(true)}
                    className="gap-2 w-full sm:w-auto"
                  >
                    <PackageOpen className="h-4 w-4" />
                    Bulk Convert ({stats.canConvert})
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={scanSiteImages}
                  disabled={isScanning}
                  className="gap-2 w-full sm:w-auto"
                >
                  <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? 'Scanning Site...' : 'Scan All Pages'}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by filename, alt text, or page URL..."
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
                <strong>{stats.missingAlt} images</strong> across your website are missing alt tags, affecting accessibility and SEO.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Images Table */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-0">
          {filteredImages.length === 0 ? (
            <div className="p-12 text-center">
              <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Found</h3>
              <p className="text-gray-600 mb-4">
                {images.length === 0 
                  ? "No images detected. Click 'Scan All Pages' to scan your entire website."
                  : "No images match your search criteria."
                }
              </p>
              {images.length === 0 && (
                <Button 
                  onClick={scanSiteImages} 
                  className="gap-2"
                  disabled={isScanning}
                >
                  <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
                  Scan Website
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Preview</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Alt Text</TableHead>
                    <TableHead>Used In</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImages.map((image) => (
                    <TableRow key={image.id} className="hover:bg-gray-50">
                      <TableCell>
                        <img
                          src={image.src}
                          alt={image.alt || 'Image preview'}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNFY0ME00MCAzMkgyNCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{image.filename}</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">{image.format}</Badge>
                            {image.width && image.height && (
                              <Badge variant="outline" className="text-xs">{image.width}×{image.height}</Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {image.alt ? (
                            <p className="text-sm text-gray-900 truncate">{image.alt}</p>
                          ) : (
                            <span className="text-red-600 font-medium text-sm">⚠️ Missing</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">
                            {image.usedIn.join(', ')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(image)} variant="outline">
                          {getStatusIcon(image)}
                          <span className="ml-1">{getStatusText(image)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleAISuggestion(image)}
                            className="gap-1 text-xs px-2 py-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Button>
                          
                          {image.canConvertToWebP && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleWebPConversion(image.id)}
                              disabled={isConverting === image.id}
                              className="gap-1 text-xs px-2 py-1"
                            >
                              <Download className="h-3 w-3" />
                              WebP
                            </Button>
                          )}
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="gap-1 text-xs px-2 py-1">
                                <Edit3 className="h-3 w-3" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Image Metadata</DialogTitle>
                                <DialogDescription>
                                  Update alt text and metadata for better SEO and accessibility
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
                                    <p className="text-sm text-muted-foreground">Used in: {image.usedIn.join(', ')}</p>
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
                                </div>
                                
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Save Changes</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk WebP Converter Modal */}
      <BulkWebPConverter 
        images={images}
        isOpen={showBulkConverter}
        onClose={() => setShowBulkConverter(false)}
      />
    </div>
  );
};
