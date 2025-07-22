
export interface InsuranceImageContext {
  filename: string;
  usedIn: string[];
  element?: HTMLImageElement;
  isHeroImage?: boolean;
  isTeamMember?: boolean;
  isProductImage?: boolean;
  isCarrierLogo?: boolean;
}

export const generateInsuranceSpecificAltText = (context: InsuranceImageContext): string => {
  const { filename, usedIn, isHeroImage, isTeamMember, isProductImage, isCarrierLogo } = context;
  const filenameLC = filename.toLowerCase();
  const pagesText = usedIn.join(', ').toLowerCase();
  
  // Carrier logos
  if (isCarrierLogo || filenameLC.includes('logo') || filenameLC.includes('carrier')) {
    const carrierName = extractCarrierName(filename);
    return `${carrierName} - Trusted insurance partner providing reliable coverage solutions`;
  }
  
  // Team member photos
  if (isTeamMember || filenameLC.includes('team') || filenameLC.includes('advisor') || filenameLC.includes('agent')) {
    const memberName = extractMemberName(filename);
    return `${memberName} - Licensed insurance advisor specializing in life insurance and financial protection`;
  }
  
  // Hero images
  if (isHeroImage || filenameLC.includes('hero') || filenameLC.includes('banner')) {
    if (pagesText.includes('life') || pagesText.includes('term')) {
      return 'Happy family protected by comprehensive life insurance coverage from Agora Assurance Solutions';
    }
    if (pagesText.includes('annuities') || pagesText.includes('retirement')) {
      return 'Secure retirement planning with annuities and financial protection strategies';
    }
    if (pagesText.includes('mortgage') || pagesText.includes('home')) {
      return 'Family home protected with mortgage protection insurance and homeowners coverage';
    }
    return 'Professional insurance consultation providing comprehensive financial protection solutions';
  }
  
  // Product-specific images
  if (isProductImage || filenameLC.includes('product') || filenameLC.includes('coverage')) {
    if (pagesText.includes('term-life') || filenameLC.includes('term')) {
      return 'Term life insurance policy documents showing affordable coverage options for families';
    }
    if (pagesText.includes('whole-life') || filenameLC.includes('whole')) {
      return 'Whole life insurance policy illustration with cash value growth and permanent protection';
    }
    if (pagesText.includes('universal-life') || filenameLC.includes('universal')) {
      return 'Universal life insurance policy showing flexible premiums and investment options';
    }
    if (pagesText.includes('final-expense') || filenameLC.includes('final')) {
      return 'Final expense insurance policy providing burial and funeral cost coverage';
    }
    if (pagesText.includes('annuities') || filenameLC.includes('annuity')) {
      return 'Annuity contract showing guaranteed retirement income and tax-deferred growth';
    }
    if (pagesText.includes('mortgage') || filenameLC.includes('mortgage')) {
      return 'Mortgage protection insurance policy covering home loan payments';
    }
  }
  
  // Page-specific context
  if (pagesText.includes('about') || pagesText.includes('careers')) {
    return 'Agora Assurance Solutions office environment with professional insurance advisors';
  }
  
  if (pagesText.includes('blog') || pagesText.includes('education')) {
    return 'Insurance education and financial planning resources for informed decision making';
  }
  
  // Family/lifestyle images
  if (filenameLC.includes('family') || filenameLC.includes('couple') || filenameLC.includes('children')) {
    return 'Happy family enjoying financial security and peace of mind through comprehensive insurance protection';
  }
  
  // Professional/business images
  if (filenameLC.includes('business') || filenameLC.includes('professional') || filenameLC.includes('meeting')) {
    return 'Professional insurance consultation meeting discussing personalized coverage options';
  }
  
  // Default insurance-focused alt text
  return 'Insurance and financial protection services illustration from Agora Assurance Solutions';
};

const extractCarrierName = (filename: string): string => {
  const name = filename.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '');
  return name.split(/[-_]/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

const extractMemberName = (filename: string): string => {
  const name = filename.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '');
  const cleanName = name.replace(/team|advisor|agent|member/gi, '').trim();
  return cleanName.split(/[-_]/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ') || 'Insurance Advisor';
};

export const optimizeImageForInsurance = (element: HTMLImageElement): void => {
  // Add loading="lazy" for better performance
  if (!element.hasAttribute('loading')) {
    element.setAttribute('loading', 'lazy');
  }
  
  // Add decoding="async" for better rendering performance
  if (!element.hasAttribute('decoding')) {
    element.setAttribute('decoding', 'async');
  }
  
  // Add importance hints for hero images
  const src = element.src.toLowerCase();
  if (src.includes('hero') || src.includes('banner')) {
    element.setAttribute('fetchpriority', 'high');
  }
};

export const addInsuranceImageStructuredData = (images: any[]): any => {
  const imageObjects = images
    .filter(img => img.hasAlt && img.src.startsWith('http'))
    .map(img => ({
      "@type": "ImageObject",
      "url": img.src,
      "description": img.alt,
      "width": img.width,
      "height": img.height
    }));
    
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Agora Assurance Solutions Image Gallery",
    "description": "Professional insurance and financial services imagery",
    "image": imageObjects
  };
};
