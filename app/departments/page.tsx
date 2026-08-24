import type { Metadata } from 'next';
import Link from 'next/link';
import { Avatar, Badge, Breadcrumb, Button, Card, CTA, Grid, Section, Text } from '@the_viveksingh/vivek-ui';

import { BreadcrumbJsonLd } from '@/components/json-ld';
import { departments } from '@/data/departments';
import { doctorsByDepartment } from '@/data/doctors';

export const metadata: Metadata = {
  title: 'Departments',
  description:
    'Eight specialties at MediCare Plus: Cardiology, Orthopaedics, Paediatrics, Neurology, Dermatology, ENT, Gynaecology and General Medicine — what each one treats and who leads it.',
  alternates: { canonical: '/departments' },
  openGraph: {
    title: 'Departments | MediCare Plus',
    description: 'Eight specialties under one roof, with the conditions each department treats.',
    url: '/departments',
  },
};

export default function DepartmentsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Departments', path: '/departments' },
        ]}
      />

      <Section padding="md">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Departments', current: true }]} />
      </Section>

      <Section padding="none">
        <Section.Header
          eyebrow="Specialties"
          title="Departments"
          description="Everything from a routine health check to a cardiac workup happens in the same building. Your notes, scans and consultants never have to be posted anywhere."
          headingLevel={1}
          titleSize="2xl"
        />
      </Section>

      <Section padding="lg">
        <Grid as="ul" role="list" cols={{ base: 1, md: 2 }} gap={6}>
          {departments.map((dept) => {
            const count = doctorsByDepartment(dept.slug).length;
            return (
              <li key={dept.slug}>
                <Card variant="outline" padding="lg" className="dept-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--vk-space-4)' }}>
                    <span className="dept-icon" aria-hidden="true">
                      {dept.icon}
                    </span>
                    <div>
                      <h2 className="doctor-name">{dept.name}</h2>
                      <Text size="sm" tone="muted">
                        {count} consultant{count === 1 ? '' : 's'}
                      </Text>
                    </div>
                  </div>

                  <Text>{dept.description}</Text>

                  <div>
                    <h3 className="footer-heading" style={{ marginBottom: 'var(--vk-space-3)' }}>
                      Commonly treated
                    </h3>
                    <div className="badge-row">
                      {dept.conditions.map((condition) => (
                        <Badge key={condition} variant="soft" tone="neutral" pill>
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="dept-head">
                    <Avatar src={dept.head.avatar} name={dept.head.name} size="md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text size="sm" tone="muted">
                        Head of department
                      </Text>
                      <Text size="sm" weight="semibold">
                        <Link href={`/doctors/${dept.head.slug}`} style={{ color: 'inherit' }}>
                          {dept.head.name}
                        </Link>
                      </Text>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/doctors?department=${dept.slug}`}>See team</Link>
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </Grid>
      </Section>

      <CTA
        padding="xl"
        variant="primary"
        title="Not sure which department you need?"
        description="Book General Medicine. They will examine you, order what is needed, and refer you on the same day if it belongs elsewhere."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/book?department=general-medicine">Book General Medicine</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/doctors">Browse all consultants</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
