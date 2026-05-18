'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const KEYBOARD_SHORTCUTS: Record<string, string> = {
  '/': 'd',
  '/scenario': 's',
  '/visualizer': 'v',
  '/feedback': 'f',
};

export function useKeyboardNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const key = e.key.toLowerCase();
        for (const [route, shortcut] of Object.entries(KEYBOARD_SHORTCUTS)) {
          if (key === shortcut) {
            e.preventDefault();
            router.push(route);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);
}

export function getKeyboardShortcut(route: string): string {
  return KEYBOARD_SHORTCUTS[route] || '';
}
