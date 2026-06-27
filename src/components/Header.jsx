import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-darker/80 backdrop-blur-md border-b border-brand-slateAccent/50 py-2 sm:py-3 shadow-lg'
          : 'bg-transparent py-3 sm:py-4 lg:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] 3xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">

          {/* ===== LOGO ===== */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:rounded-lg"
          >
            <Logo size={28} className="sm:hidden shrink-0" />
            <Logo size={32} className="hidden sm:block lg:hidden shrink-0" />
            <Logo size={36} className="hidden lg:block xl:hidden shrink-0" />
            <Logo size={40} className="hidden xl:block shrink-0" />
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="font-bold font-display text-slate-900 dark:text-white transition-colors duration-300 text-base sm:text-lg lg:text-xl xl:text-2xl tracking-[0.15em] sm:tracking-[0.2em]">
                NEXTORA
              </span>
              <span className="text-[7px] sm:text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-primary font-medium">
                STUDIO
              </span>
            </div>
          </Link>

          {/* ===== DESKTOP NAV (lg+) ===== */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium tracking-wide rounded-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
                    active
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ===== DESKTOP CTA (lg+) ===== */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 xl:p-2.5 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} className="xl:w-5 xl:h-5" /> : <Moon size={16} className="xl:w-5 xl:h-5" />}
            </button>
            <Link
              to="/portal"
              className={`p-2 xl:p-2.5 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
              title="Client Portal"
            >
              <User size={16} className="xl:w-5 xl:h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 xl:py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary hover:to-brand-secondary text-white text-xs xl:text-sm font-semibold rounded-lg shadow-premium hover:shadow-glow transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Start Project</span>
              <ArrowRight size={12} className="xl:w-4 xl:h-4" />
            </Link>
          </div>

          {/* ===== MOBILE CONTROLS (below lg) ===== */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link
              to="/portal"
              className={`p-2 sm:p-2.5 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
            >
              <User size={15} />
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 sm:p-2.5 rounded-lg border border-slate-300 dark:border-brand-slateAccent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-30 lg:hidden"
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-brand-darker/98 backdrop-blur-xl border-b border-slate-200 dark:border-brand-slateAccent shadow-2xl z-40"
            >
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={close}
                      className={`block px-4 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
                        active
                          ? 'text-brand-primary bg-brand-primary/10'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-3 sm:pt-4 px-1">
                  <Link
                    to="/contact"
                    onClick={close}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm sm:text-base font-semibold rounded-xl shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
