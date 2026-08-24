import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AnimatedCounter,
  Avatar,
  Button,
  CTA,
  FAQ,
  FeatureGrid,
  Grid,
  Hero,
  Section,
  Stats,
  Testimonials,
} from '@the_viveksingh/vivek-ui';

import { HeroBookingCard } from '@/components/hero-booking-card';
import { CareInNumbers } from '@/components/care-in-numbers';
import { DoctorCard } from '@/components/doctor-card';
import { BreadcrumbJsonLd, FaqJsonLd, HospitalJsonLd } from '@/components/json-ld';
import { departments } from '@/data/departments';
import { doctors } from '@/data/doctors';
import { clinicStats, faqs, testimonials } from '@/data/content';

export const metadata: Metadata = {
  title: 'Free Hospital Website Template (Next.js) — Appointment Booking | MediCare Plus',
  description:
    'A free, open-source Next.js 16 hospital website template with a four-step online appointment booking flow, doctor profiles and SVG charts. Built with VivekUI, zero runtime dependencies.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featured = doctors.slice(0, 4);

  return (
    <>
      <HospitalJsonLd />
      <FaqJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }]} />

      {/* ------------------------------------------------------------- hero */}
      <div className="hero">
        <div className="hero-motif" aria-hidden="true" />
        <Hero
          layout="split"
          padding="xl"
          aria-label="Care that fits your calendar"
          eyebrow="Multi-specialty clinic · Indiranagar, Bengaluru"
          title={
            <span className="hero-title">
              Care that fits your <em>calendar</em>
            </span>
          }
          description={
            <>
              <p className="hero-lede">
                Eight specialties, 84 consultants, and a booking flow that takes four steps and no
                phone call. Pick a doctor, pick a slot, and get on with your day.
              </p>
              <ul className="hero-proof" style={{ marginTop: 'var(--vk-space-5)' }}>
                <li>No referral needed</li>
                <li>Cashless insurance</li>
                <li>Free rescheduling</li>
              </ul>
            </>
          }
          actions={
            <>
              <Button asChild size="lg">
                <Link href="/book">Book an appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/doctors">Browse doctors</Link>
              </Button>
            </>
          }
          media={<HeroBookingCard />}
        />
      </div>

      {/* ------------------------------------------------------------ stats */}
      <Stats
        padding="lg"
        aria-label="The clinic in numbers"
        columns={{ base: 2, md: 4 }}
        items={clinicStats.map((stat) => ({
          id: stat.id,
          label: stat.label,
          description: stat.description,
          value: (
            <AnimatedCounter
              value={stat.value}
              locale="en-IN"
              suffix={stat.value > 1000 ? '+' : ''}
              format={{ maximumFractionDigits: 0 }}
            />
          ),
        }))}
      />

      {/* ------------------------------------------------------ departments */}
      <FeatureGrid
        padding="xl"
        background="muted"
        eyebrow="Departments"
        title="Eight specialties, one address"
        description="Everything from a routine health check to a cardiac workup happens in the same building, which means your notes, scans and consultants never have to be posted anywhere."
        columns={{ base: 1, sm: 2, lg: 4 }}
        /* The glyph goes in bare: FeatureGrid already wraps `icon` in its own
           tinted chip, so a wrapper of ours would nest one box inside another. */
        features={departments.map((d) => ({
          id: d.slug,
          icon: d.icon,
          title: d.name,
          description: d.summary,
        }))}
      />
      <Section padding="none" background="muted">
        <div className="cta-row" style={{ justifyContent: 'center', paddingBottom: 'var(--vk-space-16)' }}>
          <Button asChild variant="outline" size="lg">
            <Link href="/departments">Explore all departments</Link>
          </Button>
        </div>
      </Section>

      {/* --------------------------------------------------------- doctors */}
      <Section padding="xl" aria-label="Meet the consultants">
        <div className="split-head">
          <Section.Header
            eyebrow="Our consultants"
            title="Meet a few of the people you would be seeing"
            description="Every profile lists qualifications, languages spoken and the real weekly clinic timetable."
            style={{ flex: '1 1 28rem' }}
          />
          <Button asChild variant="ghost">
            <Link href="/doctors">All 84 consultants →</Link>
          </Button>
        </div>

        <Grid as="ul" role="list" cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>
          {featured.map((doctor, index) => (
            <li key={doctor.slug}>
              <DoctorCard doctor={doctor} priority={index < 2} />
            </li>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------ the charts */}
      <CareInNumbers />

      {/* --------------------------------------------------- testimonials */}
      <Testimonials
        padding="xl"
        aria-label="What patients say"
        eyebrow="Patient stories"
        title="What people actually say afterwards"
        description="Collected from post-visit surveys. Names changed, wording theirs."
        columns={{ base: 1, md: 2, lg: 3 }}
        items={testimonials.map((t) => ({
          id: t.id,
          quote: t.quote,
          author: t.author,
          role: t.role,
          avatar: <Avatar src={t.avatar} name={t.author} size="md" />,
        }))}
      />

      {/* --------------------------------------------------------------- faq */}
      <FAQ
        padding="xl"
        background="muted"
        aria-label="Frequently asked questions"
        eyebrow="Before you book"
        title="Questions we get asked every week"
        items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
        defaultOpen={0}
      />

      {/* --------------------------------------------------------------- cta */}
      <CTA
        padding="xl"
        variant="primary"
        title="Your next appointment is four steps away"
        description="Choose a department, pick a slot that suits you, and you are done. No account, no callback."
        actions={
          <>
            <Button asChild size="lg" variant="solid">
              <Link href="/book">Book an appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/built-with">See how this site was built</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
