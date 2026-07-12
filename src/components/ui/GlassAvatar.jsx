import React from 'react';

/**
 * GlassAvatar - Premium avatar component with gradient ring and border shadows.
 */
export default function GlassAvatar({
  src,
  alt = 'Avatar',
  initials = '??',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  gradient = 'from-blue-500 to-indigo-600',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  }[size];

  return (
    <div
      className={`relative rounded-full p-[1.5px] bg-gradient-to-br ${gradient} shadow-premium flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
      {...props}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-brand-dark flex items-center justify-center font-bold text-slate-800 dark:text-white border border-white/20">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    </div>
  );
}
