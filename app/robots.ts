import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Filtered doctor listings are the same records in a different order —
        // useful to a person, duplicate content to a crawler.
        disallow: ['/doctors?department=', '/book?'],
      },
    ],
    sitemap: SITE.url + '/sitemap.xml',
    host: SITE.url,
  };
}
