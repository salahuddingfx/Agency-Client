import React from 'react';

/**
 * GlassInput - Reusable text field with frosted background, focus glow, and clean borders.
 */
export default function GlassInput({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  textarea = false,
  rows = 4,
  error = '',
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseInputClasses = `w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border ${
    error ? 'border-red-500' : 'border-slate-200 dark:border-brand-slateAccent'
  } text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10`;

  return (
    <div className={`space-y-1.5 text-left w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={inputId}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseInputClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={baseInputClasses}
          {...props}
        />
      )}

      {error && (
        <span className="block text-xs text-red-500 mt-1 pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
