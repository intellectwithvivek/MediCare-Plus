import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { doctors } from '@/data/doctors';

/**
 * A fixed `lastModified`. Using `new Date()` would stamp today's date on every
 * URL at every build, which tells a crawler the whole site changed when
 * nothing did — and search engines learn to ignore the field.
 */
const LAST_MODIFIED = new Date('2026-08-24');

/**
 * Next.js interpolates sitemap values into XML without escaping them
 * (`build/webpack/loaders/metadata/resolve-route-data.js`), so a URL carrying
 * `&` — every Unsplash URL in this template — produces a document no XML
 * parser will accept, and Search Console rejects the file whole.
 *
 * Escaping to `&amp;` here would work today but break the moment Next.js
 * starts escaping properly, giving `&amp;amp;`. Reducing the URL to a single
 * query parameter removes the ampersand at the source instead, which is
 * correct under either behaviour.
 */
function sitemapSafeImage(url: string): string {
  const [base] = url.split('?');
  return `${base}?w=1600`;
}

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
  //
  // These point at images.unsplash.com. Google only indexes cross-domain
  // images when the hosting domain is also verified in Search Console, so
  // these entries stay inert until the photos are served from this domain —
  // which is exactly what happens when you swap the mock data for your own.
  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${SITE.url}/doctors/${d.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    images: [sitemapSafeImage(d.photo)],
  }));

  return [...staticRoutes, ...doctorRoutes].map((entry) => ({
    ...entry,
    lastModified: LAST_MODIFIED,
  }));
}
