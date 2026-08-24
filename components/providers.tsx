'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, ToastProvider } from '@the_viveksingh/vivek-ui';

/**
 * The one client boundary the whole site shares. Everything below it can still
 * be a server component — React only needs the *provider* on the client, not
 * its children.
 *
 * Light is the default rather than `system`: a clinic reads as trustworthy in
 * daylight, and someone who prefers dark still gets it from the navbar toggle,
 * which persists to localStorage.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="medicareplus-theme">
      <ToastProvider position="bottom-end" duration={6000} max={3}>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
