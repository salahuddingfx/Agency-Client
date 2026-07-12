import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * GlassAccordion - A premium accordion component featuring smooth framer-motion height expand
 * and Liquid Glass design principles.
 */
export default function GlassAccordion({
  title,
  children,
  isOpen,
  onToggle,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`glass-card rounded-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden transition-all duration-300 ${className}`} {...props}>
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-slate-100/20 dark:hover:bg-white/5 transition-colors gap-4"
      >
        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white font-display flex items-start space-x-3">
          {Icon && <Icon size={16} className="text-brand-primary mt-0.5 flex-shrink-0" />}
          <span>{title}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200/30 dark:border-white/5 pl-11">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
