'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  MessageSquare,
  Settings,
  User,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', id: 'nav-dashboard' },
  { href: '/scenario', icon: FileText, label: 'New Scenario', id: 'nav-scenario' },
  { href: '/visualizer', icon: GitBranch, label: 'Visualizer', id: 'nav-visualizer' },
  { href: '/feedback', icon: MessageSquare, label: 'Feedback', id: 'nav-feedback' },
];

const BOTTOM_ITEMS = [
  { href: '#', icon: User, label: 'Profile', id: 'nav-profile' },
  { href: '#', icon: Settings, label: 'Settings', id: 'nav-settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-0 top-0 h-full w-[72px] bg-bg-surface border-r border-border-subtle flex flex-col items-center py-6 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform"
        aria-label="Career Sandbox Home"
        id="nav-logo"
      >
        CS
      </Link>

      {/* Main nav */}
      <div className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label, id }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              id={id}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
                group
                ${isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                }
              `}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />

              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-bg-elevated text-text-primary text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-border-subtle z-50">
                {label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col gap-2 mt-auto">
        {BOTTOM_ITEMS.map(({ href, icon: Icon, label, id }) => (
          <Link
            key={id}
            href={href}
            id={id}
            aria-label={label}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all duration-200 group relative"
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-bg-elevated text-text-primary text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-border-subtle z-50">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
