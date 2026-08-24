import { SITE, OPENING_HOURS_SPEC } from '@/lib/site';
import { departments } from '@/data/departments';
import { faqs } from '@/data/content';
import type { Doctor } from '@/data/doctors';

/**
 * One place that writes structured data, so every route emits the same shapes.
 *
 * `JSON.stringify` output is escaped for `<` before it goes into the script
 * tag: a stray `</script>` inside any of this copy would otherwise close the
 * block early and dump the rest of the graph into the page as markup.
 */
function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const DEMO_NOTICE =
  'Demonstration content in an open-source website template. This is not a real medical provider; the practitioners, contact details and figures are fictional.';

const MIT_LICENSE = 'https://opensource.org/licenses/MIT';

/** The author, referenced by both the site and the template entity. */
const authorNode = {
  '@type': 'Person',
  '@id': `${SITE.url}/#author`,
  name: SITE.author,
  url: SITE.authorUrl,
  jobTitle: 'Software engineer',
  sameAs: [SITE.authorUrl, 'https://github.com/intellectwithvivek'],
};

/**
 * The template itself is a real thing, unlike the clinic — so this is the one
 * node on the page making claims a crawler can actually verify.
 */
const templateNode = {
  '@type': 'SoftwareSourceCode',
  '@id': `${SITE.url}/#template`,
  name: 'MediCare Plus — Next.js hospital website template',
  description:
    'A free, open-source Next.js 16 website template for a multi-specialty clinic, with a four-step online appointment booking flow.',
  codeRepository: SITE.repoUrl,
  programmingLanguage: ['TypeScript', 'React'],
  runtimePlatform: 'Next.js 16',
  license: MIT_LICENSE,
  isAccessibleForFree: true,
  author: { '@id': `${SITE.url}/#author` },
  maintainer: { '@id': `${SITE.url}/#author` },
  keywords:
    'nextjs template, hospital website template, appointment booking, react, typescript, open source',
};

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/**
 * Hospital + MedicalClinic for the homepage.
 *
 * Deliberately no `aggregateRating`, on this node or on `Physician`. The star
 * ratings on the page are visibly demo content, but a machine-readable
 * `reviewCount` for a clinic that does not exist is a fabricated review
 * claim — exactly what Google's structured-data spam policy is aimed at, and
 * this deploys on a subdomain of the author's real domain. `SoftwareSourceCode`
 * below carries the claims that are actually true.
 */
export function HospitalJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Hospital', 'MedicalClinic'],
            '@id': `${SITE.url}/#organization`,
            name: SITE.name,
            description: SITE.description,
            url: SITE.url,
            telephone: SITE.reception,
            email: SITE.email,
            address: postalAddress,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: SITE.geo.latitude,
              longitude: SITE.geo.longitude,
            },
            openingHoursSpecification: OPENING_HOURS_SPEC,
            availableService: {
              '@type': 'MedicalProcedure',
              name: 'Outpatient specialist consultation',
            },
            medicalSpecialty: departments.map((d) => d.specialty),
            isAcceptingNewPatients: true,
            // No `aggregateRating`. See the note above `HospitalJsonLd`.
            disambiguatingDescription: DEMO_NOTICE,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE.url}/#website`,
            url: SITE.url,
            name: SITE.name,
            inLanguage: 'en-IN',
            publisher: { '@id': `${SITE.url}/#organization` },
            creator: { '@id': `${SITE.url}/#author` },
            license: MIT_LICENSE,
            isBasedOn: { '@id': `${SITE.url}/#template` },
          },
          authorNode,
          templateNode,
        ],
      }}
    />
  );
}

/** Physician, for a single doctor profile. */
export function PhysicianJsonLd({ doctor }: { doctor: Doctor }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Physician',
        '@id': `${SITE.url}/doctors/${doctor.slug}#physician`,
        name: doctor.name,
        url: `${SITE.url}/doctors/${doctor.slug}`,
        image: doctor.photo,
        description: doctor.bio,
        medicalSpecialty: doctor.specialty,
        knowsLanguage: doctor.languages,
        address: postalAddress,
        telephone: SITE.reception,
        memberOf: { '@type': 'Hospital', name: SITE.name, url: SITE.url },
        // No `aggregateRating`. See the note above `HospitalJsonLd`.
        disambiguatingDescription: DEMO_NOTICE,
      }}
    />
  );
}

export interface Crumb {
  name: string;
  /** Path only — turned into an absolute URL here. */
  path: string;
}

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      }}
    />
  );
}

/** FAQPage, built from the same copy the FAQ component renders. */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }}
    />
  );
}
