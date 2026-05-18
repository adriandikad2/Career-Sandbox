/**
 * WCAG 2.1 AA Accessibility Testing Utilities
 */

export interface ColorContrast {
  ratio: number;
  passesAANormal: boolean;
  passesAALarge: boolean;
  passesAAA: boolean;
}

/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    const c = val / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Parse RGB string or hex color to RGB array
 */
export function parseColor(color: string): [number, number, number] | null {
  // Remove whitespace
  color = color.replace(/\s/g, '');

  // Parse hex color
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
  }

  // Parse rgb() format
  const rgbMatch = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  }

  return null;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(
  fg: [number, number, number],
  bg: [number, number, number]
): number {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check color contrast compliance
 */
export function checkContrast(
  fgColor: string,
  bgColor: string
): ColorContrast | null {
  const fg = parseColor(fgColor);
  const bg = parseColor(bgColor);

  if (!fg || !bg) return null;

  const ratio = getContrastRatio(fg, bg);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAANormal: ratio >= 4.5,
    passesAALarge: ratio >= 3,
    passesAAA: ratio >= 7,
  };
}

/**
 * Check if an element has sufficient focus indicator
 */
export function checkFocusIndicator(element: HTMLElement): {
  hasFocusStyle: boolean;
  suggestion: string;
} {
  const styles = window.getComputedStyle(element, ':focus-visible');
  const outline = styles.outline;
  const boxShadow = styles.boxShadow;
  const ring = styles.border;

  const hasFocusStyle = outline !== 'none' || boxShadow !== 'none' || ring !== 'none';

  return {
    hasFocusStyle,
    suggestion: !hasFocusStyle
      ? 'Add focus-visible styles (outline, box-shadow, or border) to this element'
      : 'Focus indicator looks good',
  };
}

/**
 * Check if an element is keyboard accessible
 */
export function checkKeyboardAccessibility(element: HTMLElement): {
  isKeyboardAccessible: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check if element is interactive
  const isInteractive =
    ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName) ||
    element.getAttribute('role') === 'button' ||
    element.getAttribute('role') === 'menuitem';

  if (!isInteractive) {
    issues.push('Element is not an interactive element');
  }

  // Check if interactive element is focusable
  if (isInteractive) {
    const tabindex = element.getAttribute('tabindex');
    const isNaturallyFocusable = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
      element.tagName
    );
    const isFocusable =
      isNaturallyFocusable ||
      (tabindex && parseInt(tabindex) >= 0) ||
      element.hasAttribute('role');

    if (!isFocusable) {
      issues.push('Interactive element is not focusable (add tabindex="0" or role)');
    }
  }

  return {
    isKeyboardAccessible: issues.length === 0,
    issues,
  };
}

/**
 * Check if an element has proper ARIA labels
 */
export function checkAriaLabels(element: HTMLElement): {
  hasLabel: boolean;
  labelSources: string[];
  issues: string[];
} {
  const labelSources: string[] = [];
  const issues: string[] = [];

  // Check for aria-label
  if (element.hasAttribute('aria-label')) {
    labelSources.push('aria-label');
  }

  // Check for aria-labelledby
  if (element.hasAttribute('aria-labelledby')) {
    labelSources.push('aria-labelledby');
  }

  // Check for associated label (for inputs)
  if (element.tagName === 'INPUT') {
    const id = element.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) {
        labelSources.push('associated label');
      }
    }
  }

  // Check for image alt text
  if (element.tagName === 'IMG') {
    if (element.hasAttribute('alt')) {
      labelSources.push('alt text');
    } else {
      issues.push('Image missing alt text');
    }
  }

  // Check for button/link text
  if (['BUTTON', 'A'].includes(element.tagName)) {
    const text = element.textContent?.trim();
    if (text) {
      labelSources.push('text content');
    } else if (labelSources.length === 0) {
      issues.push('Button/link has no accessible text');
    }
  }

  return {
    hasLabel: labelSources.length > 0,
    labelSources,
    issues,
  };
}

/**
 * Run comprehensive WCAG AA audit on an element
 */
export function auditElement(element: HTMLElement): {
  passed: number;
  failed: number;
  warnings: number;
  details: {
    contrast?: ColorContrast;
    focusIndicator?: { hasFocusStyle: boolean; suggestion: string };
    keyboardAccessibility?: { isKeyboardAccessible: boolean; issues: string[] };
    ariaLabels?: { hasLabel: boolean; labelSources: string[]; issues: string[] };
  };
} {
  let passed = 0;
  let failed = 0;
  let warnings = 0;
  const details: any = {};

  // Check color contrast (for text and UI components)
  const fgColor = window.getComputedStyle(element).color;
  const bgColor = window.getComputedStyle(element).backgroundColor;
  const contrast = checkContrast(fgColor, bgColor);
  if (contrast) {
    details.contrast = contrast;
    if (contrast.passesAANormal) {
      passed++;
    } else {
      failed++;
    }
  }

  // Check focus indicator
  const focusCheck = checkFocusIndicator(element);
  details.focusIndicator = focusCheck;
  if (focusCheck.hasFocusStyle) {
    passed++;
  } else {
    warnings++;
  }

  // Check keyboard accessibility
  const keyboardCheck = checkKeyboardAccessibility(element);
  details.keyboardAccessibility = keyboardCheck;
  if (keyboardCheck.isKeyboardAccessible) {
    passed++;
  } else if (keyboardCheck.issues.length > 0) {
    failed++;
  }

  // Check ARIA labels
  const ariaCheck = checkAriaLabels(element);
  details.ariaLabels = ariaCheck;
  if (ariaCheck.hasLabel) {
    passed++;
  } else if (ariaCheck.issues.length > 0) {
    warnings++;
  }

  return { passed, failed, warnings, details };
}

/**
 * Generate accessibility report for a page
 */
export function generateA11yReport(selector = 'body'): {
  totalElements: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  results: Array<{ element: HTMLElement; audit: ReturnType<typeof auditElement> }>;
} {
  const container = document.querySelector(selector);
  if (!container) {
    return { totalElements: 0, passedChecks: 0, failedChecks: 0, warningChecks: 0, results: [] };
  }

  const interactiveElements = container.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [role="menuitem"]'
  );

  const results: Array<{ element: HTMLElement; audit: ReturnType<typeof auditElement> }> = [];
  let totalPassed = 0;
  let totalFailed = 0;
  let totalWarnings = 0;

  interactiveElements.forEach((el) => {
    const audit = auditElement(el as HTMLElement);
    results.push({ element: el as HTMLElement, audit });
    totalPassed += audit.passed;
    totalFailed += audit.failed;
    totalWarnings += audit.warnings;
  });

  return {
    totalElements: interactiveElements.length,
    passedChecks: totalPassed,
    failedChecks: totalFailed,
    warningChecks: totalWarnings,
    results,
  };
}
