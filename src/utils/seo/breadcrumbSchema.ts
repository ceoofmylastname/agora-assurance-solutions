
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://agoraassurancesolutions.com${item.url}`
  }))
});

export const getBreadcrumbsForPath = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' }
  ];

  if (pathname === '/') return breadcrumbs;

  const pathSegments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Map segments to readable names
    const segmentNames: Record<string, string> = {
      'services': 'Services',
      'term-life': 'Term Life Insurance',
      'final-expense': 'Final Expense Insurance',
      'annuities': 'Annuities',
      'mortgage-protection': 'Mortgage Protection',
      'universal-life': 'Universal Life Insurance',
      'whole-life': 'Whole Life Insurance',
      'indexed-universal-life': 'Indexed Universal Life',
      'tax-asset-protection': 'Tax & Asset Protection',
      'life-settlements': 'Life Settlements',
      'about': 'About Us',
      'blog': 'Blog',
      'faq': 'FAQ',
      'quote': 'Get Quote',
      'contact': 'Contact'
    };

    const name = segmentNames[segment] || segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    breadcrumbs.push({ name, url: currentPath });
  });

  return breadcrumbs;
};
