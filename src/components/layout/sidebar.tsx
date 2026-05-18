'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useKeyboardNavigation, getKeyboardShortcut } from '@/hooks/use-keyboard-navigation';
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  MessageSquare,
  UserCircle,
  Briefcase
} from 'lucide-react';
import { useCareerStore } from '@/store/career-store';

const NAV_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', id: 'nav-dashboard' },
  { href: '/scenario', icon: FileText, label: 'New Scenario', id: 'nav-scenario' },
  { href: '/visualizer', icon: GitBranch, label: 'Visualizer', id: 'nav-visualizer' },
  { href: '/feedback', icon: MessageSquare, label: 'Feedback', id: 'nav-feedback' },
];

export function Sidebar() {
  const pathname = usePathname();
  useKeyboardNavigation();
  const { userRole, setUserRole } = useCareerStore();

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
          const shortcut = getKeyboardShortcut(href);
          return (
            <Link
              key={href}
              href={href}
              id={id}
              aria-label={`${label}${shortcut ? ` (Ctrl+Shift+${shortcut.toUpperCase()})` : ''}`}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
                group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none
                ${isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                }
              `}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />

              {/* Tooltip with keyboard shortcut */}
              <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-bg-elevated text-text-primary text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-border-subtle z-50">
                <div>{label}</div>
                {shortcut && <div className="text-text-muted text-2xs">Ctrl+Shift+{shortcut.toUpperCase()}</div>}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r-full" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col gap-2 mt-auto">
        <button
          onClick={() => setUserRole(userRole === 'employee' ? 'hr' : 'employee')}
          className={`
            relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
            group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none
            ${
              userRole === 'hr'
                ? 'bg-accent/20 text-accent'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
            }
          `}
          aria-label={`Switch to ${userRole === 'employee' ? 'HR' : 'Employee'} mode`}
          title={`Switch to ${userRole === 'employee' ? 'HR' : 'Employee'} mode`}
        >
          {userRole === 'employee' ? <UserCircle size={20} /> : <Briefcase size={20} />}
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-bg-elevated text-text-primary text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-border-subtle z-50">
            <div>Role: {userRole === 'employee' ? 'Employee' : 'HR'}</div>
            <div className="text-text-muted text-2xs">Click to switch</div>
          </span>
        </button>
      </div>
    </nav>
  );
}
