import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Web app manifest. `maskable` is a separate file from `any` on purpose:
 * Android crops a maskable icon to whatever shape the launcher uses, so it
 * carries a smaller mark inside the safe zone, while the `any` icon keeps its
 * own rounded plate for contexts that do no cropping at all.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — appointment booking`,
    short_name: SITE.name,
    description: SITE.description,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#0b62d6',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['health', 'medical', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      {
        name: 'Book an appointment',
        short_name: 'Book',
        url: '/book',
        description: 'Start the four-step booking flow',
      },
      {
        name: 'Find a doctor',
        short_name: 'Doctors',
        url: '/doctors',
        description: 'Browse consultants by specialty',
      },
    ],
  };
}
