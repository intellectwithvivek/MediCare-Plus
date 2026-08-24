import type { Metadata } from 'next';
import { Breadcrumb, Section } from '@the_viveksingh/vivek-ui';

import { BookingFlow } from '@/components/booking-flow';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Book an appointment',
  description:
    'Book a consultation at MediCare Plus in four steps: choose a department and doctor, pick a free slot, add your details, and verify by OTP. No account needed.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book an appointment | MediCare Plus',
    description:
      'Four steps, no phone call: department, slot, details, verification. A free Next.js booking-flow template built with VivekUI.',
    url: '/book',
  },
};

/**
 * `searchParams` is a Promise in Next.js 16 and has to be awaited before it can
 * be read. `/book?doctor=ananya-rao` and `/book?department=cardiology` both
 * pre-seed the flow, which is what the doctor cards and the hero link to.
 */
export default async function BookPage({ searchParams }: PageProps<'/book'>) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Book an appointment', path: '/book' },
        ]}
      />

      <Section padding="md">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Book an appointment', current: true }]}
        />
      </Section>

      <Section padding="none">
        <Section.Header
          eyebrow="Appointments"
          title="Book an appointment"
          description="Four steps, about a minute. Nothing is charged online — you settle at reception."
          headingLevel={1}
          titleSize="2xl"
        />
      </Section>

      <Section padding="lg">
        <BookingFlow
          initialDepartment={first(params.department)}
          initialDoctor={first(params.doctor)}
        />
      </Section>
    </>
  );
}
