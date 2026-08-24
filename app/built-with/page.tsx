import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge, Breadcrumb, Button, Code, CopyButton, Section, Table, Text } from '@the_viveksingh/vivek-ui';

import { BreadcrumbJsonLd } from '@/components/json-ld';
import { componentMap } from '@/data/component-map';
import { INSTALL_COMMAND, LINKS, SITE, componentDocs, utm } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Built with VivekUI',
  description:
    'Every section of this free Next.js hospital template mapped to the VivekUI component that renders it — Scheduler, Stepper, OTPInput, DatePicker and three SVG charts, all from one zero-dependency package.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI | MediCare Plus',
    description:
      'Section-by-section breakdown of the 45+ VivekUI components behind this free Next.js hospital booking template.',
    url: '/built-with',
  },
};

export default function BuiltWithPage() {
  const uniqueComponents = new Set(componentMap.map((c) => c.component)).size;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Built with VivekUI', path: '/built-with' },
        ]}
      />

      <Section padding="md">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Built with VivekUI', current: true }]}
        />
      </Section>

      <Section padding="none">
        <h1 style={{ fontSize: 'var(--vk-text-3xl)', letterSpacing: '-0.02em', margin: 0 }}>
          Built with VivekUI
        </h1>
        <p className="builtwith-lede" style={{ marginTop: 'var(--vk-space-5)' }}>
          This entire website is built with VivekUI, a free React component library with zero
          runtime dependencies. No Tailwind, no shadcn, no MUI, no Bootstrap — one install, one CSS
          import, and the {uniqueComponents} components listed below.
        </p>

        <div className="install-row" style={{ marginTop: 'var(--vk-space-6)', maxWidth: '34rem' }}>
          <Code block>{INSTALL_COMMAND}</Code>
          <CopyButton value={INSTALL_COMMAND} variant="outline" label="Copy" copiedLabel="Copied" />
        </div>

        <div className="oss-actions" style={{ marginTop: 'var(--vk-space-6)', maxWidth: '34rem' }}>
          <span className="oss-label">Clone this template</span>
          <div className="install-row">
            <Code block>{SITE.cloneCommand}</Code>
            <CopyButton
              value={SITE.cloneCommand}
              variant="outline"
              label="Copy"
              copiedLabel="Copied"
              aria-label="Copy the git clone command"
            />
          </div>
          <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-3)' }}>
            MIT licensed. Free for commercial use, no attribution required.
          </Text>
        </div>

        <div className="cta-row" style={{ marginTop: 'var(--vk-space-6)' }}>
          <Button asChild size="lg">
            <a href={utm(LINKS.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
              Read the Docs
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              Star VivekUI on GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href={`${SITE.repoUrl}/generate`} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>
        </div>
      </Section>

      {/* --------------------------------------------------------- callout */}
      <Section padding="lg">
        <div className="callout">
          <p>
            <strong>
              Scheduler, Stepper, OTPInput and all three charts ship in the same zero-dependency
              package
            </strong>{' '}
            as the Button and the Card. There is no separate charts install, no pro tier and no
            peer dependency beyond React itself — which matters most for the Scheduler, the one
            component shadcn/ui, Mantine and Radix simply do not have, and that MUI puts behind a
            paid licence.
          </p>
        </div>

        <div className="badge-row" style={{ marginTop: 'var(--vk-space-6)' }}>
          <Badge tone="primary" variant="soft" pill>
            91 components
          </Badge>
          <Badge tone="primary" variant="soft" pill>
            6 SVG charts
          </Badge>
          <Badge tone="success" variant="soft" pill>
            0 runtime dependencies
          </Badge>
          <Badge tone="neutral" variant="outline" pill>
            MIT licensed
          </Badge>
          <Badge tone="neutral" variant="outline" pill>
            React 18 & 19
          </Badge>
        </div>
      </Section>

      {/* ----------------------------------------------------------- table */}
      <Section padding="lg" aria-label="Component map">
        <Section.Header
          eyebrow="The map"
          title="Every section, and the component behind it"
          description="Each component name links straight to its documentation page."
        />

        <div className="table-scroll" style={{ marginTop: 'var(--vk-space-8)' }}>
          <Table striped hoverable stickyHeader size="md">
            <Table.Caption visuallyHidden>
              VivekUI components used by the MediCare Plus template, by page section
            </Table.Caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                <Table.HeaderCell scope="col">Component</Table.HeaderCell>
                <Table.HeaderCell scope="col">What it does here</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {componentMap.map((entry) => (
                <Table.Row key={entry.section + entry.component}>
                  <Table.Cell label="Section">{entry.section}</Table.Cell>
                  <Table.Cell label="Component">
                    <a
                      href={componentDocs(entry.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 'var(--vk-weight-semibold)' }}
                    >
                      {entry.component}
                    </a>
                  </Table.Cell>
                  <Table.Cell label="What it does here">{entry.role}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-5)' }}>
          Charts are imported from <Code>@the_viveksingh/vivek-ui/charts</Code> — the same install,
          a separate entry point so the SVG code never lands in a bundle that does not draw a chart.
        </Text>
      </Section>

      {/* ------------------------------------------------------- what's ours */}
      <Section padding="lg" background="muted">
        <Section.Header
          eyebrow="For balance"
          title="What is not a component"
          description="So you know exactly where the library stops and the template starts."
        />
        <ul className="footer-list" style={{ marginTop: 'var(--vk-space-6)', maxWidth: '46rem', gap: 'var(--vk-space-3)' }}>
          <li>
            The hero&apos;s cross-lattice and pulse motif — about forty lines of CSS in{' '}
            <Code>app/globals.css</Code>, using an SVG mask so the colour follows the theme token.
          </li>
          <li>
            The slot chips in booking step 2 — plain <Code>&lt;button aria-pressed&gt;</Code>{' '}
            elements, because a slot grid wants its own hit area and struck-through disabled state.
          </li>
          <li>
            Mock data in <Code>/data</Code> and structured data in{' '}
            <Code>components/json-ld.tsx</Code>. There is no backend and no auth.
          </li>
          <li>
            The blue accent — four CSS custom properties overriding VivekUI&apos;s defaults. Every
            VivekUI rule sits inside <Code>:where()</Code>, so a plain class or{' '}
            <Code>:root</Code> override wins without <Code>!important</Code>.
          </li>
        </ul>

        <div className="cta-row" style={{ marginTop: 'var(--vk-space-8)' }}>
          <Button asChild>
            <a href={utm(LINKS.author, 'builtwith')} target="_blank" rel="noopener noreferrer">
              Built by Vivek Kumar Singh
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={LINKS.npm} target="_blank" rel="noopener noreferrer">
              View on npm
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/book">Try the booking flow</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
