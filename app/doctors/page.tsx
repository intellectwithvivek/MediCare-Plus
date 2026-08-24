import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge, Breadcrumb, Button, EmptyState, Grid, Section, Text } from '@the_viveksingh/vivek-ui';

import { DoctorCard } from '@/components/doctor-card';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { departments, getDepartment } from '@/data/departments';
import { doctors } from '@/data/doctors';

export const metadata: Metadata = {
  title: 'Find a doctor',
  description:
    'Browse consultants at MediCare Plus by specialty. Every profile lists qualifications, languages, patient ratings and a live weekly availability timetable.',
  alternates: { canonical: '/doctors' },
  openGraph: {
    title: 'Find a doctor | MediCare Plus',
    description:
      'Consultants across eight specialties, with qualifications, ratings and weekly availability.',
    url: '/doctors',
  },
};

/**
 * Filtering happens on the server from the query string rather than in client
 * state, which keeps the whole page a server component and makes every filtered
 * view a real, linkable, indexable URL.
 */
export default async function DoctorsPage({ searchParams }: PageProps<'/doctors'>) {
  const params = await searchParams;
  const raw = Array.isArray(params.department) ? params.department[0] : params.department;
  const active = raw && getDepartment(raw) ? raw : undefined;
  const visible = active ? doctors.filter((d) => d.department === active) : doctors;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
        ]}
      />

      <Section padding="md">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Doctors', current: true }]} />
      </Section>

      <Section padding="none">
        <Section.Header
          eyebrow="Consultants"
          title="Find a doctor"
          description="Eight specialties under one roof. Pick a name and book straight from the profile, or filter by the department you need."
          headingLevel={1}
          titleSize="2xl"
        />
      </Section>

      <Section padding="lg">
        <nav aria-label="Filter by department" style={{ marginBottom: 'var(--vk-space-8)' }}>
          <ul className="badge-row" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <Link href="/doctors" aria-current={!active ? 'page' : undefined} className="nav-badge">
                <Badge variant={!active ? 'solid' : 'outline'} tone="primary" pill>
                  All {doctors.length}
                </Badge>
              </Link>
            </li>
            {departments.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/doctors?department=${d.slug}`}
                  aria-current={active === d.slug ? 'page' : undefined}
                  className="nav-badge"
                >
                  <Badge variant={active === d.slug ? 'solid' : 'outline'} tone="primary" pill>
                    {d.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {visible.length === 0 ? (
          <EmptyState
            icon={<span aria-hidden="true">🔍</span>}
            title="No consultants in that department yet"
            description="Every specialty in this template has at least one consultant — try clearing the filter."
            actions={
              <Button asChild variant="outline">
                <Link href="/doctors">Show all consultants</Link>
              </Button>
            }
          />
        ) : (
          <>
            <Text size="sm" tone="muted" aria-live="polite" style={{ marginBottom: 'var(--vk-space-5)' }}>
              Showing {visible.length} of {doctors.length} consultants
              {active ? ` in ${getDepartment(active)?.name}` : ''}.
            </Text>
            <Grid as="ul" role="list" cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
              {visible.map((doctor, index) => (
                <li key={doctor.slug}>
                  <DoctorCard doctor={doctor} priority={index < 3} />
                </li>
              ))}
            </Grid>
          </>
        )}
      </Section>
    </>
  );
}
