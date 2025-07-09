
const PIXABAY_API_KEY = '51218545-80ff2c30c3aafd7d2623095a8';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
}

export const fetchPixabayImages = async (query: string, category: string = 'business'): Promise<PixabayImage[]> => {
  try {
    const response = await fetch(
      `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&category=${category}&image_type=photo&orientation=horizontal&min_width=800&per_page=10&safesearch=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch images from Pixabay');
    }
    
    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.error('Error fetching Pixabay images:', error);
    return [];
  }
};

export const getImageForBlogPost = async (title: string, category: string): Promise<string | null> => {
  const searchQueries = [
    // Primary search terms based on category
    category === 'Life Insurance' ? 'family protection insurance' :
    category === 'Final Expense' ? 'funeral insurance family' :
    category === 'Retirement' ? 'retirement planning savings' :
    'insurance protection family',
    
    // Fallback searches
    'business handshake agreement',
    'financial planning document',
    'family security protection'
  ];
  
  for (const query of searchQueries) {
    const images = await fetchPixabayImages(query, 'business');
    if (images.length > 0) {
      return images[0].webformatURL;
    }
  }
  
  return null;
};
