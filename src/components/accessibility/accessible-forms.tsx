'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { FOCUS_STYLES } from '@/lib/a11y-utils';

interface AccessibleInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'number' | 'search';
  autoComplete?: string;
}

/**
 * Accessible text input component with WCAG AA compliance
 */
export function AccessibleInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  required,
  disabled,
  type = 'text',
  autoComplete,
}: AccessibleInputProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const ariaDescribedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {/* Label - Always visible, associated with input */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
        {required && (
          <span aria-label="required" className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>

      {/* Input field */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
        className={`
          w-full px-3 py-2 rounded-lg border-2
          bg-white text-text-primary placeholder-text-muted
          transition-colors duration-200
          disabled:bg-bg-muted disabled:text-text-muted disabled:cursor-not-allowed
          ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-border-subtle focus:border-accent'
          }
          ${FOCUS_STYLES.ring}
        `}
      />

      {/* Hint text */}
      {hint && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}

      {/* Error message - Associated with input via aria-describedby */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          id={errorId}
          role="alert"
          className="flex items-center gap-2 text-sm text-red-600"
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}

interface AccessibleSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Accessible select dropdown with WCAG AA compliance
 */
export function AccessibleSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  hint,
  required,
  disabled,
}: AccessibleSelectProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const ariaDescribedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
        {required && (
          <span aria-label="required" className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>

      {/* Select */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
        className={`
          w-full px-3 py-2 rounded-lg border-2
          bg-white text-text-primary
          transition-colors duration-200
          disabled:bg-bg-muted disabled:text-text-muted disabled:cursor-not-allowed
          ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-border-subtle focus:border-accent'
          }
          ${FOCUS_STYLES.ring}
        `}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Hint */}
      {hint && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          id={errorId}
          role="alert"
          className="flex items-center gap-2 text-sm text-red-600"
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}

interface AccessibleCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
}

/**
 * Accessible checkbox with WCAG AA compliance
 */
export function AccessibleCheckbox({
  id,
  label,
  checked,
  onChange,
  hint,
  disabled,
}: AccessibleCheckboxProps) {
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-describedby={hint ? hintId : undefined}
          className={`
            w-4 h-4 rounded border-2
            bg-white text-accent
            transition-colors duration-200
            disabled:bg-bg-muted disabled:cursor-not-allowed
            ${FOCUS_STYLES.ring}
          `}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-primary cursor-pointer hover:text-accent"
        >
          {label}
        </label>
      </div>

      {hint && (
        <p id={hintId} className="ml-6 text-xs text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Accessible button with WCAG AA compliance
 */
export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'md',
  ariaLabel,
  disabled,
  className,
  ...props
}: AccessibleButtonProps) {
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    secondary: 'bg-bg-elevated text-text-primary border-2 border-border-subtle hover:border-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        rounded-lg font-semibold transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${FOCUS_STYLES.ring}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Live region for screen reader announcements
 */
export function LiveRegion({
  message,
  type = 'polite',
}: {
  message: string;
  type?: 'polite' | 'assertive';
}) {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

export default {
  AccessibleInput,
  AccessibleSelect,
  AccessibleCheckbox,
  AccessibleButton,
  LiveRegion,
};
