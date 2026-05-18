'use client';

import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '@/lib/a11y-utils';

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="sr-only focus:not-sr-only fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors focus-visible-ring"
        aria-label="Show keyboard shortcuts help (Press ? to open)"
      >
        <span className="flex items-center gap-2">
          <HelpCircle size={16} />
          Keyboard Help
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
          <div className="bg-bg-surface rounded-lg shadow-2xl max-w-md w-full border border-border-subtle">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 id="shortcuts-title" className="text-lg font-semibold text-text-primary">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-bg-elevated transition-colors focus-visible-ring"
                aria-label="Close keyboard shortcuts dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Navigation</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Dashboard</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Ctrl+Shift+D</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">New Scenario</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Ctrl+Shift+S</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Visualizer</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Ctrl+Shift+V</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Feedback</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Ctrl+Shift+F</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">General</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Skip to main content</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Tab</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Focus navigation</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Tab / Shift+Tab</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Show this dialog</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">?</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Forms & Dropdowns</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Open dropdown</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">↓ or Enter</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Navigate options</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">↑ ↓</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Select option</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Enter</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-secondary">Close dropdown</dt>
                    <dd className="bg-bg-elevated px-2 py-1 rounded text-text-muted font-mono text-xs">Esc</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="p-6 border-t border-border-subtle">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors focus-visible-ring"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        div[role='dialog'] > div {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
