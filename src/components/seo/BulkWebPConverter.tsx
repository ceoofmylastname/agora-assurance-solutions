
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { SiteImage } from '@/hooks/useSiteScanner';
import { convertImageToWebP, ConversionResult, createZipDownload } from '@/utils/webpConverter';
import { useToast } from '@/hooks/use-toast';

interface BulkWebPConverterProps {
  images: SiteImage[];
  isOpen: boolean;
  onClose: () => void;
}

export const BulkWebPConverter: React.FC<BulkWebPConverterProps> = ({
  images,
  isOpen,
  onClose
}) => {
  const [quality, setQuality] = useState<number>(0.8);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const { toast } = useToast();

  const eligibleImages = images.filter(img => img.canConvertToWebP);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getQualityLabel = (q: number) => {
    if (q >= 0.9) return 'High (90%+)';
    if (q >= 0.7) return 'Medium (70-90%)';
    return 'Low (50-70%)';
  };

  const handleBulkConversion = async () => {
    if (eligibleImages.length === 0) return;

    setIsConverting(true);
    setProgress(0);
    setResults([]);

    const conversions: ConversionResult[] = [];

    for (let i = 0; i < eligibleImages.length; i++) {
      const image = eligibleImages[i];
      setCurrentImage(image.filename);
      
      try {
        const result = await convertImageToWebP(image.src, image.filename, { 
          quality, 
          format: 'webp' 
        });
        conversions.push(result);
        setResults(prev => [...prev, result]);
      } catch (error) {
        console.error(`Failed to convert ${image.filename}:`, error);
        toast({
          title: "Conversion Failed",
          description: `Could not convert ${image.filename}`,
          variant: "destructive"
        });
      }
      
      setProgress(((i + 1) / eligibleImages.length) * 100);
    }

    setIsConverting(false);
    setCurrentImage('');

    if (conversions.length > 0) {
      toast({
        title: "Bulk Conversion Complete",
        description: `Successfully converted ${conversions.length} images to WebP format.`,
      });
    }
  };

  const handleDownloadAll = async () => {
    if (results.length === 0) return;
    
    try {
      await createZipDownload(results);
      toast({
        title: "Download Started",
        description: "All converted images are being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download converted images.",
        variant: "destructive"
      });
    }
  };

  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalConvertedSize = results.reduce((sum, r) => sum + r.convertedSize, 0);
  const totalSavings = totalOriginalSize - totalConvertedSize;
  const totalSavingsPercent = totalOriginalSize > 0 ? (totalSavings / totalOriginalSize) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Bulk WebP Conversion
          </DialogTitle>
          <DialogDescription>
            Convert multiple images to WebP format for better performance and smaller file sizes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quality Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Conversion Quality</label>
            <Select value={quality.toString()} onValueChange={(value) => setQuality(parseFloat(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.9">{getQualityLabel(0.9)} - Best quality, larger files</SelectItem>
                <SelectItem value="0.8">{getQualityLabel(0.8)} - Recommended balance</SelectItem>
                <SelectItem value="0.7">{getQualityLabel(0.7)} - Good quality, smaller files</SelectItem>
                <SelectItem value="0.5">{getQualityLabel(0.5)} - Smallest files</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Images Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">{eligibleImages.length}</div>
              <div className="text-sm text-blue-700">Eligible Images</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">{results.length}</div>
              <div className="text-sm text-purple-700">Converted</div>
            </div>
          </div>

          {/* Progress */}
          {isConverting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Converting images...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              {currentImage && (
                <p className="text-xs text-muted-foreground">Converting: {currentImage}</p>
              )}
            </div>
          )}

          {/* Results Summary */}
          {results.length > 0 && !isConverting && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Conversion Complete</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Original Size:</span>
                  <span className="ml-2 font-medium">{formatFileSize(totalOriginalSize)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">New Size:</span>
                  <span className="ml-2 font-medium">{formatFileSize(totalConvertedSize)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Savings:</span>
                  <span className="ml-2 font-medium text-green-600">
                    {formatFileSize(totalSavings)} ({totalSavingsPercent.toFixed(1)}%)
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <Badge variant="outline" className="ml-2">WebP</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex gap-2">
              {results.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleDownloadAll}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download All ({results.length})
                </Button>
              )}
              <Button 
                onClick={handleBulkConversion}
                disabled={isConverting || eligibleImages.length === 0}
                className="gap-2"
              >
                <Zap className="h-4 w-4" />
                {isConverting ? 'Converting...' : `Convert ${eligibleImages.length} Images`}
              </Button>
            </div>
          </div>

          {/* Warning for no eligible images */}
          {eligibleImages.length === 0 && (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-800">No images eligible for WebP conversion found.</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
