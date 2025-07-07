
const PIXABAY_API_KEY = '51218545-80ff2c30c3aafd7d2623095a8';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  views: number;
  downloads: number;
}

export const searchPixabayImages = async (
  query: string,
  category: string = 'all',
  imageType: string = 'photo',
  perPage: number = 20
): Promise<PixabayImage[]> => {
  try {
    const response = await fetch(
      `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=${imageType}&category=${category}&min_width=1920&min_height=1080&per_page=${perPage}&safesearch=true&order=popular`
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
