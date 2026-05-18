'use client';

import Link from 'next/link';
import { SKIP_LINKS } from '@/lib/a11y-utils';

export function SkipLinks() {
  return (
    <>
      {SKIP_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
