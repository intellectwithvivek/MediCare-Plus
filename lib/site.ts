/**
 * Single source of truth for URLs, contact details and the UTM-tagged
 * promotion links. Every link to the VivekUI ecosystem goes through
 * `vivekui()` so the campaign tag can never drift between pages.
 */

export const SITE = {
  name: 'MediCare Plus',
  tagline: 'Care that fits your calendar',
  url: 'https://medicare.vivekkumarsingh.in',
  description:
    'MediCare Plus is a free, open-source Next.js website template for a multi-specialty clinic, with a four-step online appointment booking flow built entirely with VivekUI.',
  emergencyPhone: '+91-80-4000-1122',
  emergencyPhoneHref: 'tel:+918040001122',
  reception: '+91-80-4000-1100',
  email: 'appointments@medicareplus.example',
  address: {
    street: '14 Lakeview Avenue, Indiranagar',
    locality: 'Bengaluru',
    region: 'KA',
    postalCode: '560038',
    country: 'IN',
  },
  geo: { latitude: 12.9784, longitude: 77.6408 },
  mapQuery: 'Indiranagar, Bengaluru, Karnataka 560038, India',
  timeZone: 'Asia/Kolkata',
  repo: 'MediCare-Plus',
  repoUrl: 'https://github.com/intellectwithvivek/MediCare-Plus',
  cloneCommand: 'git clone https://github.com/intellectwithvivek/MediCare-Plus.git',
  author: 'Vivek Kumar Singh',
  authorUrl: 'https://vivekkumarsingh.in/',
  license: 'MIT',
} as const;

const CAMPAIGN = 'hospital';

/** Appends the campaign UTMs for a given placement to a VivekUI-ecosystem URL. */
export function utm(url: string, medium: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=vivekui-template&utm_campaign=${CAMPAIGN}&utm_medium=${medium}`;
}

export const LINKS = {
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
} as const;

export const INSTALL_COMMAND = 'npm i @the_viveksingh/vivek-ui';

/** Deep link to a single component's docs page, UTM-tagged for the /built-with table. */
export function componentDocs(slug: string): string {
  return utm(`${LINKS.components}/${slug}`, 'builtwith');
}

export const OPENING_HOURS = [
  { days: 'Monday – Friday', hours: '08:00 – 20:00' },
  { days: 'Saturday', hours: '08:00 – 17:00' },
  { days: 'Sunday', hours: '09:00 – 13:00' },
  { days: 'Emergency & trauma', hours: 'Open 24 × 7' },
] as const;

/** Schema.org `openingHoursSpecification` mirroring OPENING_HOURS. */
export const OPENING_HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '20:00',
  },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '17:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '13:00' },
];
