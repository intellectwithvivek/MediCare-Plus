import Link from 'next/link';
import {
  Badge,
  Button,
  Clock,
  Code,
  CopyButton,
  Divider,
  Footer,
  MapEmbed,
  Text,
} from '@the_viveksingh/vivek-ui';
import { Logo } from '@/components/logo';
import { INSTALL_COMMAND, LINKS, OPENING_HOURS, SITE, utm } from '@/lib/site';
import { departments } from '@/data/departments';

/**
 * A server component. `Clock`, `MapEmbed` and `CopyButton` are each their own
 * `'use client'` module, so they become three small islands inside otherwise
 * static markup rather than pulling the whole footer onto the client.
 *
 * `Footer` takes `children` as an escape hatch from its default brand/columns
 * layout; the `<footer>` landmark, container and background still come from it.
 */
export function SiteFooter() {
  const careLinks = departments.slice(0, 4);

  return (
    <Footer className="site-footer" padding="none" background="muted">
      {/* ------------------------------------------------- open-source notice */}
      <section className="oss-band" aria-labelledby="oss-heading">
        <div className="oss-inner">
          <div>
            <div className="badge-row">
              <Badge tone="success" variant="soft" pill>
                Free &amp; open source
              </Badge>
              <Badge tone="neutral" variant="outline" pill>
                {SITE.license} licensed
              </Badge>
            </div>

            <h2 id="oss-heading" className="oss-title">
              This whole site is a template you can take
            </h2>

            <Text tone="muted" style={{ marginTop: 'var(--vk-space-3)', maxWidth: '38rem' }}>
              MediCare Plus is an open-source Next.js template built by{' '}
              <a href={SITE.authorUrl} target="_blank" rel="noopener noreferrer">
                {SITE.author}
              </a>
              . Developers can clone it as a starting point; clinics and agencies can rebrand it and
              put it in front of real patients. No licence fee, no attribution requirement, no
              locked &ldquo;pro&rdquo; tier — swap the mock data in <Code>/data</Code> for your own
              and deploy.
            </Text>
          </div>

          <div className="oss-actions">
            <span className="oss-label">Clone it</span>
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
            <div className="cta-row" style={{ marginTop: 'var(--vk-space-4)' }}>
              <Button asChild size="sm">
                <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
                  ★ Star on GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={`${SITE.repoUrl}/generate`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Use this template
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link href="/built-with">How it is built</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- promotion kit */}
      <div className="promo-band">
        <div className="promo-inner">
          <div>
            <Text size="lg" weight="medium">
              Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime
              dependencies.
            </Text>
            <Text tone="muted" style={{ marginTop: 'var(--vk-space-2)' }}>
              One install, one CSS import, no config.
            </Text>
            <div className="promo-links" style={{ marginTop: 'var(--vk-space-4)' }}>
              <a href={utm(LINKS.docs, 'footer')} target="_blank" rel="noopener noreferrer">
                Docs
              </a>
              <a href={LINKS.npm} target="_blank" rel="noopener noreferrer">
                npm
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={utm(LINKS.author, 'footer')} target="_blank" rel="noopener noreferrer">
                Author — Vivek Kumar Singh
              </a>
            </div>
          </div>

          <div className="install-row">
            <Code block>{INSTALL_COMMAND}</Code>
            <CopyButton
              value={INSTALL_COMMAND}
              variant="outline"
              label="Copy"
              copiedLabel="Copied"
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- footer top */}
      <div className="footer-top">
        <div>
          <Link href="/" className="brand">
            <Logo size={30} gradientId="mark-footer" />
            <span className="brand-text">
              <b>MediCare</b> <span>Plus</span>
            </span>
          </Link>
          <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-4)', maxWidth: '26rem' }}>
            A multi-specialty clinic in Indiranagar, Bengaluru. Eight specialties, 84 consultants,
            and an appointment you can book at midnight without speaking to anyone.
          </Text>
          <address style={{ marginTop: 'var(--vk-space-4)', fontStyle: 'normal' }}>
            <Text size="sm" tone="muted">
              {SITE.address.street}
              <br />
              {SITE.address.locality} {SITE.address.postalCode}
            </Text>
            <Text size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
              Reception <a href={`tel:${SITE.reception.replace(/[^+\d]/g, '')}`}>{SITE.reception}</a>
              <br />
              Emergency <a href={SITE.emergencyPhoneHref}>{SITE.emergencyPhone}</a>
            </Text>
          </address>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-heading">Care</h2>
          <ul className="footer-list">
            {careLinks.map((d) => (
              <li key={d.slug}>
                <Link href="/departments">{d.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/departments">All departments</Link>
            </li>
          </ul>

          <h2 className="footer-heading" style={{ marginTop: 'var(--vk-space-8)' }}>
            Visit
          </h2>
          <ul className="footer-list">
            <li>
              <Link href="/doctors">Find a doctor</Link>
            </li>
            <li>
              <Link href="/book">Book an appointment</Link>
            </li>
            <li>
              <Link href="/built-with">Built with VivekUI</Link>
            </li>
            <li>
              <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
                Use this template
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Opening hours</h2>
          <table className="hours-table">
            <tbody>
              {OPENING_HOURS.map((row) => (
                <tr key={row.days}>
                  <th scope="row">{row.days}</th>
                  <td>{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="clock-badge" style={{ marginTop: 'var(--vk-space-4)' }}>
            <span>Now in Bengaluru</span>
            <Clock timeZone={SITE.timeZone} locale="en-IN" hour12={false} showSeconds />
          </div>

          <div className="map-frame" style={{ marginTop: 'var(--vk-space-5)' }}>
            <MapEmbed
              title={`Map showing ${SITE.name}, ${SITE.address.locality}`}
              lat={SITE.geo.latitude}
              lon={SITE.geo.longitude}
              zoom={15}
              ratio={16 / 10}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="footer-bottom">
        <p className="disclaimer">
          <strong>Demo template — not a real medical provider.</strong> MediCare Plus is a free,
          open-source Next.js template. Nothing here is medical advice, no appointment is really
          booked, and every doctor, phone number and statistic is fictional.
        </p>
        <p>© {new Date().getFullYear()} MediCare Plus template · MIT licensed</p>
      </div>
    </Footer>
  );
}
