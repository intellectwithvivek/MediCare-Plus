import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import { notFound } from 'next/navigation';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  CTA,
  Rating,
  Section,
  Text,
  Timeline,
} from '@the_viveksingh/vivek-ui';

import { BreadcrumbJsonLd, PhysicianJsonLd } from '@/components/json-ld';
import { WeeklyTimetable } from '@/components/weekly-timetable';
import { getDepartment } from '@/data/departments';
import { doctors, getDoctor } from '@/data/doctors';

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/doctors/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) return { title: 'Doctor not found' };

  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: `Book ${doctor.name}, ${doctor.specialty} consultant at MediCare Plus with ${doctor.experienceYears} years of experience. Qualifications, languages spoken and weekly availability.`,
    alternates: { canonical: `/doctors/${doctor.slug}` },
    openGraph: {
      type: 'profile',
      title: `${doctor.name} — ${doctor.specialty} | MediCare Plus`,
      description: doctor.bio,
      url: `/doctors/${doctor.slug}`,
      images: [{ url: doctor.photo, width: 800, height: 800, alt: `Portrait of ${doctor.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doctor.name} — ${doctor.specialty}`,
      description: doctor.bio,
      images: [doctor.photo],
    },
  };
}

export default async function DoctorProfilePage({ params }: PageProps<'/doctors/[slug]'>) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();

  const department = getDepartment(doctor.department);

  return (
    <>
      <PhysicianJsonLd doctor={doctor} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
          { name: doctor.name, path: `/doctors/${doctor.slug}` },
        ]}
      />

      <Section padding="md">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Doctors', href: '/doctors' },
            { label: doctor.name, current: true },
          ]}
        />
      </Section>

      {/* ---------------------------------------------------- profile header */}
      <Section padding="md" aria-label={`About ${doctor.name}`}>
        <div className="profile-header">
          <div className="profile-photo">
            <NextImage
              src={doctor.photo}
              alt={`Portrait of ${doctor.name}, ${doctor.specialty} consultant at MediCare Plus`}
              fill
              sizes="(max-width: 52rem) 100vw, 288px"
              priority
            />
          </div>

          <div>
            <h1 style={{ fontSize: 'var(--vk-text-3xl)', letterSpacing: '-0.02em', margin: 0 }}>
              {doctor.name}
            </h1>

            <div className="badge-row" style={{ marginTop: 'var(--vk-space-4)' }}>
              <Badge tone="primary" variant="solid">
                {doctor.specialty}
              </Badge>
              {doctor.subspecialties.map((s) => (
                <Badge key={s} tone="primary" variant="soft">
                  {s}
                </Badge>
              ))}
            </div>

            <div className="meta-row" style={{ marginTop: 'var(--vk-space-4)' }}>
              <Rating
                value={doctor.rating}
                readOnly
                allowHalf
                label={`Patient rating for ${doctor.name}`}
              />
              <span>
                <strong>{doctor.rating}</strong> from {doctor.reviewCount} patient reviews
              </span>
            </div>

            <Text size="lg" style={{ marginTop: 'var(--vk-space-5)', maxWidth: '44rem' }}>
              {doctor.bio}
            </Text>

            <dl className="profile-facts" style={{ marginTop: 'var(--vk-space-6)' }}>
              <div>
                <dt>Experience</dt>
                <dd>{doctor.experienceYears} years</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{department?.name}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{doctor.languages.join(', ')}</dd>
              </div>
              <div>
                <dt>Consultation</dt>
                <dd>₹{doctor.consultationFee}</dd>
              </div>
            </dl>

            <div className="cta-row" style={{ marginTop: 'var(--vk-space-6)' }}>
              <Button asChild size="lg">
                <Link href={`/book?doctor=${doctor.slug}`}>Book with {doctor.name}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/doctors?department=${doctor.department}`}>
                  Other {department?.name} consultants
                </Link>
              </Button>
            </div>
            <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-3)' }}>
              Next available: <strong>{doctor.nextAvailable}</strong>
            </Text>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- qualifications */}
      <Section padding="lg" aria-label="Qualifications">
        <Section.Header
          eyebrow="Training"
          title="Qualifications and appointments"
          description="Where the letters after the name came from."
        />
        <div style={{ marginTop: 'var(--vk-space-8)', maxWidth: '48rem' }}>
          <Timeline>
            {doctor.qualifications.map((q, index) => (
              <Timeline.Item
                key={q.year + q.title}
                title={q.title}
                description={q.detail}
                timestamp={q.year}
                status={index === doctor.qualifications.length - 1 ? 'current' : 'complete'}
                headingLevel={3}
              />
            ))}
          </Timeline>
        </div>
      </Section>

      {/* ------------------------------------------------ weekly availability */}
      <Section padding="lg" background="muted" aria-label="Weekly availability">
        <Section.Header
          eyebrow="Timetable"
          title="A typical week"
          description="Read-only — this is the standing clinic timetable, not live availability. Use the booking flow for actual free slots."
        />

        <Card variant="outline" padding="lg" style={{ marginTop: 'var(--vk-space-8)' }}>
          <WeeklyTimetable doctorName={doctor.name} availability={doctor.availability} />
          <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-4)' }}>
            Arrow keys move between blocks; every block announces its day, times and duration.
            Sunday is emergency cover only and is not shown.
          </Text>
        </Card>
      </Section>

      <CTA
        padding="xl"
        variant="muted"
        title={`Ready to see ${doctor.name}?`}
        description={`Pick a slot in ${department?.name} — most first appointments are available within three days.`}
        actions={
          <Button asChild size="lg">
            <Link href={`/book?doctor=${doctor.slug}`}>Book an appointment</Link>
          </Button>
        }
      />
    </>
  );
}
