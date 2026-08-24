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
      <Alert
        tone="info"
        variant="soft"
        className="emergency-bar"
        icon={<span aria-hidden="true">🚑</span>}
      >
        <div className="emergency-bar-inner">
          <span>
            <strong>24 × 7 Emergency:</strong>{' '}
            <a href={SITE.emergencyPhoneHref}>{SITE.emergencyPhone}</a>
          </span>
          <span>Walk-in trauma and casualty, no appointment needed.</span>
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
          <Button asChild size="sm">
            <Link href="/book">Book appointment</Link>
          </Button>
        </Navbar.Actions>

        <Navbar.Toggle />
      </Navbar>
    </header>
  );
}
