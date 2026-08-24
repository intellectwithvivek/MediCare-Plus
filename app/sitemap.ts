import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { doctors } from '@/data/doctors';

/**
 * A fixed `lastModified`. Using `new Date()` would stamp today's date on every
 * URL at every build, which tells a crawler the whole site changed when
 * nothing did — and search engines learn to ignore the field.
 */
const LAST_MODIFIED = new Date('2026-08-24');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/book`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/doctors`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/departments`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/built-with`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // `images` feeds Google's image sitemap extension, which is the only way a
  // portrait on a profile page gets discovered as an image in its own right.
  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${SITE.url}/doctors/${d.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    images: [d.photo],
  }));

  return [...staticRoutes, ...doctorRoutes].map((entry) => ({
    ...entry,
    lastModified: LAST_MODIFIED,
  }));
}
