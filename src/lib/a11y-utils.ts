/**
 * Accessibility Utilities & Constants
 * WCAG 2.1 AA Compliance
 */

/**
 * Color Contrast Ratios for WCAG AA
 * Text: 4.5:1 (normal), 3:1 (large)
 * UI Components: 3:1
 */
export const A11Y_COLORS = {
  // High contrast combinations (WCAG AA compliant)
  text: {
    primary: '#1a202c', // Dark text on light bg
    secondary: '#4a5568', // Medium gray
    muted: '#718096', // Light gray
    onDark: '#f7fafc', // Light text on dark bg
  },
  background: {
    light: '#ffffff',
    elevated: '#f7fafc',
    muted: '#edf2f7',
  },
  semantic: {
    success: '#22543d', // Dark green text
    warning: '#744210', // Dark orange text
    error: '#742a2a', // Dark red text
    info: '#1e3a8a', // Dark blue text
  },
};

/**
 * Focus styles for keyboard navigation
 */
export const FOCUS_STYLES = {
  ring: 'ring-2 ring-offset-2 ring-accent focus-visible:outline-none',
  underline: 'underline underline-offset-2',
  border: 'border-2 border-accent',
};

/**
 * ARIA Labels for common UI patterns
 */
export const ARIA_LABELS = {
  closeButton: 'Close dialog',
  expandButton: 'Expand section',
  collapseButton: 'Collapse section',
  menuButton: 'Open menu',
  searchButton: 'Search',
  nextButton: 'Go to next page',
  previousButton: 'Go to previous page',
  sortButton: 'Sort by',
  filterButton: 'Filter results',
};

/**
 * Semantic heading hierarchy
 */
export const HEADING_LEVELS = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
} as const;

/**
 * Skip links for keyboard users
 */
export const SKIP_LINKS = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
];

/**
 * Keyboard shortcuts mapping
 */
export const KEYBOARD_SHORTCUTS = {
  escape: 'Esc',
  enter: 'Enter',
  space: 'Space',
  tab: 'Tab',
  arrowUp: 'Arrow Up',
  arrowDown: 'Arrow Down',
  arrowLeft: 'Arrow Left',
  arrowRight: 'Arrow Right',
};

/**
 * Screen reader announcements
 */
export const SR_ANNOUNCEMENTS = {
  loading: 'Loading content, please wait',
  success: 'Operation completed successfully',
  error: 'An error occurred. Please try again.',
  scenarioGenerated: 'Career scenario generated successfully',
  confidenceUpdated: 'Confidence score updated',
  formSubmitted: 'Form submitted',
};

/**
 * Helper to create accessible button
 */
export const getA11yButtonProps = (
  ariaLabel: string,
  ariaPressed?: boolean
) => ({
  'aria-label': ariaLabel,
  ...(ariaPressed !== undefined && { 'aria-pressed': ariaPressed }),
});

/**
 * Helper to create accessible form field
 */
export const getA11yFieldProps = (
  label: string,
  error?: string,
  required?: boolean
) => ({
  id: label.toLowerCase().replace(/\s+/g, '-'),
  'aria-label': label,
  'aria-required': required || false,
  'aria-invalid': !!error,
  'aria-describedby': error ? `${label}-error` : undefined,
});

/**
 * Helper for live regions (announcements)
 */
export const LIVE_REGION_ROLES = {
  polite: 'polite', // Don't interrupt
  assertive: 'assertive', // Interrupt immediately
  status: 'status', // Status updates
  alert: 'alert', // Error/warning alerts
};

export default {
  A11Y_COLORS,
  FOCUS_STYLES,
  ARIA_LABELS,
  HEADING_LEVELS,
  SKIP_LINKS,
  KEYBOARD_SHORTCUTS,
  SR_ANNOUNCEMENTS,
  LIVE_REGION_ROLES,
};
