
export interface ConversionOptions {
  quality: number;
  format: 'webp' | 'avif';
}

export interface ConversionResult {
  originalSize: number;
  convertedSize: number;
  savings: number;
  savingsPercent: number;
  blob: Blob;
  filename: string;
}

export interface CompressedImageResult {
  originalSize: number;
  compressedSize: number;
  savings: number;
  webpDataUrl: string;
}

export const convertImageToWebP = async (
  imageSrc: string, 
  originalFilename: string, 
  options: ConversionOptions = { quality: 0.8, format: 'webp' }
): Promise<ConversionResult> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate appropriate dimensions
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      
      // Limit maximum dimensions to 2048px while preserving aspect ratio
      const maxDimension = 2048;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Apply smart compression quality based on image content
      const imageData = ctx.getImageData(0, 0, width, height);
      const smartQuality = getOptimalQuality(imageData, options.quality);
      
      // Convert to WebP with calculated quality
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }
          
          // Calculate original size (estimate)
          const originalSize = await estimateImageSize(imageSrc);
          const convertedSize = blob.size;
          const savings = originalSize - convertedSize;
          const savingsPercent = ((savings / originalSize) * 100);
          
          const filename = originalFilename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
          
          resolve({
            originalSize,
            convertedSize,
            savings,
            savingsPercent,
            blob,
            filename
          });
        },
        'image/webp',
        smartQuality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
  });
};

// New function to compress an image element directly
export const compressImageToWebP = async (imgElement: HTMLImageElement): Promise<CompressedImageResult | null> => {
  try {
    // Skip if the image hasn't loaded yet or has no dimensions
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
      return null;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    // Set canvas dimensions to match the image's natural size
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    
    // Draw the image to the canvas
    ctx.drawImage(imgElement, 0, 0);
    
    // Calculate optimal quality based on image content and size
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const optimalQuality = getOptimalQuality(imageData, 0.75);
    
    // Get original size through a blob
    const originalBlob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(blob => resolve(blob), 'image/png', 1.0);
    });
    
    if (!originalBlob) return null;
    
    // Get compressed size as WebP
    const webpBlob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(blob => resolve(blob), 'image/webp', optimalQuality);
    });
    
    if (!webpBlob) return null;
    
    // Convert WebP blob to data URL for direct use
    const webpDataUrl = await blobToDataURL(webpBlob);
    
    const originalSize = originalBlob.size;
    const compressedSize = webpBlob.size;
    const savings = originalSize - compressedSize;
    
    return {
      originalSize,
      compressedSize,
      savings,
      webpDataUrl
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    return null;
  }
};

// Helper function to convert blob to data URL
const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Smart function to determine optimal compression quality based on image content
const getOptimalQuality = (imageData: ImageData, baseQuality: number = 0.8): number => {
  // This is a simplified approach - a real implementation would analyze
  // the image content more thoroughly
  const data = imageData.data;
  let totalVariance = 0;
  let totalPixels = imageData.width * imageData.height;
  
  // Sample pixels to calculate variance (for efficiency)
  const sampleRate = Math.max(1, Math.floor(totalPixels / 10000));
  let sampleCount = 0;
  
  for (let i = 0; i < data.length; i += 4 * sampleRate) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Calculate local variance (simplified)
    if (i > 0 && i < data.length - 4) {
      const prevR = data[i - 4];
      const prevG = data[i - 3];
      const prevB = data[i - 2];
      
      const variance = Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);
      totalVariance += variance;
      sampleCount++;
    }
  }
  
  // Normalize variance
  const avgVariance = sampleCount > 0 ? totalVariance / sampleCount : 0;
  
  // Adjust quality based on variance:
  // - High variance (detailed images) = higher quality
  // - Low variance (flat colors) = lower quality
  let adjustedQuality = baseQuality;
  
  if (avgVariance > 30) {
    // More detailed image, increase quality
    adjustedQuality = Math.min(0.92, baseQuality + 0.1);
  } else if (avgVariance < 10) {
    // Less detailed image, decrease quality
    adjustedQuality = Math.max(0.65, baseQuality - 0.15);
  }
  
  // Also consider image size
  if (totalPixels > 1000000) { // > 1 megapixel
    // Slightly reduce quality for large images
    adjustedQuality = Math.max(0.65, adjustedQuality - 0.05);
  }
  
  return adjustedQuality;
};

const estimateImageSize = async (imageSrc: string): Promise<number> => {
  try {
    const response = await fetch(imageSrc, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      return parseInt(contentLength, 10);
    }
  } catch (error) {
    // Fallback estimation based on image dimensions and format
    console.log('Could not fetch image size, using estimation');
  }
  
  // Fallback: estimate based on typical file sizes
  return 500000; // 500KB average estimate
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const createZipDownload = async (conversions: ConversionResult[]) => {
  // For now, we'll download individual files
  // In a real app, you might use a library like JSZip
  conversions.forEach((conversion, index) => {
    setTimeout(() => {
      downloadBlob(conversion.blob, conversion.filename);
    }, index * 100); // Stagger downloads to avoid browser limits
  });
};
