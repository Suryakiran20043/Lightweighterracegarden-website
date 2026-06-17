import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://terracegardenorganics.com';

  // Core static pages
  const staticPages = [
    '',
    '/shop',
    '/about',
    '/sustainability',
    '/contact',
    '/faq',
    '/guides',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic slugs for products
  const productSlugs = ['cherry-tomato-seeds', 'lightweight-potting-soil'];
  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic slugs for guides
  const guideSlugs = ['beginner-terrace-gardening', 'home-composting-guide'];
  const guidePages = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...guidePages];
}
