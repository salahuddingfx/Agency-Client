import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * GlassDropdown - Dropdown select/menu styling using Liquid Glass tokens.
 */
export default function GlassDropdown({
  label,
  options = [],
  selectedOption,
  onSelect,
  placeholder = 'Select option',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`} {...props}>
      {label && (
        <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 pl-1">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card border border-slate-200/50 dark:border-white/5 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-slate-800 dark:text-white hover:border-brand-primary/30 w-full"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={14} className={`ml-2 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute right-0 left-0 mt-2 z-30 rounded-xl overflow-hidden glass-card shadow-xl border border-slate-200 dark:border-white/10"
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors ${
                    selectedOption?.value === opt.value
                      ? 'text-brand-primary font-semibold bg-brand-primary/5 dark:bg-brand-primary/10'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
