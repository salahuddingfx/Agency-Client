import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const PRIMARY_LINKS = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Services',  path: '/services' },
  { name: 'Pricing',   path: '/pricing' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Team',      path: '/team' },
  { name: 'Contact',   path: '/contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 rounded-2xl border border-white/20 dark:border-white/5 glass-nav ${
        isScrolled ? 'py-2.5 shadow-xl bg-white/70 dark:bg-[#020617]/70' : 'py-3.5 bg-white/60 dark:bg-brand-darker/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:rounded-lg"
          >
            <Logo size={30} className="shrink-0 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-bold font-display text-slate-900 dark:text-white transition-colors duration-300 text-sm sm:text-base tracking-[0.15em]">
                NEXTORA
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.22em] text-brand-primary font-semibold leading-none">
                STUDIO
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 relative bg-slate-200/30 dark:bg-white/5 rounded-full p-1 border border-white/10 dark:border-white/5">
            {PRIMARY_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium tracking-wide rounded-full transition-all duration-300 whitespace-nowrap focus-visible:ring-1 focus-visible:ring-brand-primary ${
                    active
                      ? 'text-brand-primary'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 shadow-sm rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTAs (lg+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/portal"
              className={`p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
              title="Client Portal"
            >
              <User size={15} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white text-xs font-semibold rounded-full shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              <span>Start Project</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* MOBILE CONTROLS (below lg) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-all duration-300"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => setIsOpen(v => !v)}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[45] lg:hidden bg-slate-950/20 dark:bg-black/40 backdrop-blur-md"
              onClick={close}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden fixed left-4 right-4 top-20 z-[50] overflow-y-auto border border-white/20 dark:border-white/5 shadow-2xl glass-card rounded-2xl"
              style={{ maxHeight: `calc(100vh - 100px)` }}
            >
              <div className="px-4 py-4 space-y-1">
                {PRIMARY_LINKS.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={close}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-150 ${
                        active
                          ? 'text-brand-primary bg-brand-primary/10'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
                    </Link>
                  );
                })}

                <div className="h-px bg-slate-200 dark:bg-white/5 my-2" />

                <Link
                  to="/portal"
                  onClick={close}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    location.pathname.startsWith('/portal')
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5'
                  }`}
                >
                  <User size={15} />
                  Client Portal
                </Link>

                <div className="pt-2 px-1 pb-2">
                  <Link
                    to="/contact"
                    onClick={close}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white text-sm font-semibold rounded-xl shadow-premium hover:shadow-glow transition-all duration-300"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight size={15} />
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
