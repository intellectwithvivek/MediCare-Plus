import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@the_viveksingh/vivek-ui/styles.css';
import '@the_viveksingh/vivek-ui/charts.css';
import './globals.css';

import { Providers } from '@/components/providers';
import { SiteHeader } from '@/components/site-header';
import { TemplateBanner } from '@/components/template-banner';
import { SiteFooter } from '@/components/site-footer';
import { themeScript } from '@/lib/theme-script';
import { SITE } from '@/lib/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Free Hospital Website Template (Next.js) — Appointment Booking | MediCare Plus',
    template: '%s | MediCare Plus',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  publisher: 'Vivek Kumar Singh',
  keywords: [
    'free hospital website template nextjs',
    'nextjs appointment booking template',
    'hospital website template',
    'clinic website template react',
    'open source hospital template',
    'nextjs 16 template',
    'VivekUI',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: 'Free Hospital Website Template (Next.js) — Appointment Booking | MediCare Plus',
    description: SITE.description,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hospital Website Template (Next.js) — Appointment Booking',
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'health',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: 'default' },
  other: {
    // Read by answer engines and crawlers that look for a plain-text summary
    // before parsing the DOM.
    'llms-txt': `${SITE.url}/llms.txt`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Paints the stored theme before first paint, so a dark-mode visitor
            never gets a white flash on the way in. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <TemplateBanner />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
