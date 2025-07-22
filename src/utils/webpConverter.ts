
export interface ConversionOptions {
  quality: number;
  format: 'webp';
}

export interface ConversionResult {
  originalSize: number;
  convertedSize: number;
  savings: number;
  savingsPercent: number;
  blob: Blob;
  filename: string;
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
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      // Convert to WebP with specified quality
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
        options.quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
  });
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
