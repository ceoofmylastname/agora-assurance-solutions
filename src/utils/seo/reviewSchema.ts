
export interface ReviewData {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  headline?: string;
}

export const createReviewSchema = (reviews: ReviewData[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Agora Assurance Solutions',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: calculateAverageRating(reviews),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  },
  review: reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    headline: review.headline || `${review.rating}-star review by ${review.author}`
  }))
});

export const createLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://agoraassurancesolutions.com',
  name: 'Agora Assurance Solutions',
  description: 'Independent insurance agency providing comprehensive life, mortgage, and annuity solutions',
  url: 'https://agoraassurancesolutions.com',
  telephone: '+1-916-848-7907',
  email: 'info@agoraassurance.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2500',
    bestRating: '5',
    worstRating: '1'
  },
  priceRange: '$$'
});

function calculateAverageRating(reviews: ReviewData[]): string {
  if (reviews.length === 0) return '4.8';
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}
