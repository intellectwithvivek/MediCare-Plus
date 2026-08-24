'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Alert, Badge, Button, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui';
import { Logo } from '@/components/logo';
import { SITE, LINKS, utm } from '@/lib/site';

const NAV = [
  { href: '/doctors', label: 'Doctors' },
  { href: '/departments', label: 'Departments' },
  { href: '/book', label: 'Book' },
  { href: '/built-with', label: 'Built with' },
];

/**
 * Client-side because the navbar marks the current route with `aria-current`,
 * which needs `usePathname`. `Navbar` is a client component in any case — it
 * owns the mobile disclosure, its focus trap and its dismiss handling.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header>
      {/*
        `icon={null}` on purpose. Alert is a flex row of [icon][content], so its
        own glyph would sit against the left edge of a full-bleed bar while the
        text below it is centred in a 1180px container — the two can never line
        up. The icon goes inside the container instead, where it belongs.
      */}
      <Alert tone="info" variant="soft" className="emergency-bar" icon={null}>
        <div className="emergency-bar-inner">
          <span className="emergency-bar-primary">
            <span className="emergency-bar-icon" aria-hidden="true">
              🚑
            </span>
            <strong>24 × 7 Emergency</strong>
            <a href={SITE.emergencyPhoneHref}>{SITE.emergencyPhone}</a>
          </span>
          <span className="emergency-bar-note">
            Walk-in trauma and casualty — no appointment needed.
          </span>
        </div>
      </Alert>

      <Navbar sticky aria-label="Main">
        <Navbar.Brand asChild>
          <Link href="/" className="brand">
            <Logo size={30} gradientId="mark-header" />
            <span className="brand-text">
              <b>MediCare</b> <span>Plus</span>
            </span>
          </Link>
        </Navbar.Brand>

        <Navbar.Links>
          {NAV.map((item) => (
            <Navbar.Link
              key={item.href}
              asChild
              active={pathname === item.href || pathname.startsWith(item.href + '/')}
            >
              <Link href={item.href}>{item.label}</Link>
            </Navbar.Link>
          ))}
        </Navbar.Links>

        <Navbar.Actions>
          <a
            href={utm(LINKS.docs, 'navbar')}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-badge"
            title="This site is built with VivekUI — read the docs"
          >
            <Badge variant="soft" tone="primary" pill>
              ⚡ Built with VivekUI
            </Badge>
          </a>
          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-badge nav-badge-repo"
            title="Free and open source — view the source on GitHub"
          >
            <Badge variant="outline" tone="neutral" pill>
              ★ Open source
            </Badge>
          </a>
          <ThemeToggle mode="toggle" />
          {/* Two labels, one shown at a time by CSS. The navbar has to hold the
              brand, a theme toggle, this CTA and the menu button inside 288px
              on a small phone, and "Book appointment" alone is 150px of that. */}
          <Button asChild size="sm">
            <Link href="/book">
              <span className="nav-cta-long">Book appointment</span>
              <span className="nav-cta-short">Book</span>
            </Link>
          </Button>
        </Navbar.Actions>

        <Navbar.Toggle />
      </Navbar>
    </header>
  );
}
