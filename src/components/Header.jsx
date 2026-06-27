import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User, Sun, Moon, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const PRIMARY_LINKS = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Services',  path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing',   path: '/pricing' },
  { name: 'Contact',   path: '/contact' },
];

const MORE_LINKS = [
  { name: 'Case Studies',  path: '/case-studies' },
  { name: 'Technologies',  path: '/technologies' },
  { name: 'Our Team',      path: '/team' },
  { name: 'Blog',          path: '/blog' },
  { name: 'Careers',       path: '/careers' },
  { name: 'FAQ',           path: '/faq' },
];

const ALL_MOBILE_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen,      setIsOpen]      = useState(false);
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [moreOpen,    setMoreOpen]    = useState(false);
  const [headerHeight,setHeaderHeight]= useState(57);
  const location  = useLocation();
  const moreRef   = useRef(null);
  const headerRef = useRef(null);

  // ── Scroll state ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Measure header height for drawer positioning ───────────────
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // ── Close drawer on route change ──────────────────────────────
  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // ── Lock body scroll when mobile drawer is open ───────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Close "More" dropdown on outside click ────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const close         = useCallback(() => setIsOpen(false), []);
  const isMoreActive  = MORE_LINKS.some(l => location.pathname === l.path);

  // ── Header background classes (theme-aware) ───────────────────
  // When scrolled OR mobile drawer is open → show solid bg
  const headerBg = (isScrolled || isOpen)
    ? 'bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 py-2 shadow-lg'
    : 'bg-transparent py-3 border-b border-transparent';

  // ── Drawer bg (solid, theme-aware via Tailwind class) ─────────
  // We render two overlapping divs — one for light, one for dark —
  // but only the right one shows thanks to Tailwind's dark: variant.
  // Actually simpler: use a className that Tailwind can pick up.
  const drawerBgClass = 'bg-white dark:bg-[#020617]';

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">

          {/* ══ LOGO ══════════════════════════════════════════════ */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:rounded-lg"
          >
            <Logo size={28} className="shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold font-display text-slate-900 dark:text-white transition-colors duration-300 text-sm sm:text-base tracking-[0.15em]">
                NEXTORA
              </span>
              <span className="text-[7px] uppercase tracking-[0.2em] text-brand-primary font-medium leading-none">
                STUDIO
              </span>
            </div>
          </Link>

          {/* ══ DESKTOP NAV (lg+) ══════════════════════════════════ */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {PRIMARY_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium tracking-wide rounded-lg transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* More ▾ dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(v => !v)}
                className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium tracking-wide rounded-lg transition-all duration-200 ${
                  isMoreActive || moreOpen
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                More
                <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{   opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {MORE_LINKS.map((link) => {
                      const active = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setMoreOpen(false)}
                          className={`block px-4 py-2.5 text-xs font-medium transition-all duration-150 ${
                            active
                              ? 'text-brand-primary bg-brand-primary/10'
                              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ══ DESKTOP CTAs (lg+) ════════════════════════════════ */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              to="/portal"
              className={`p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300 ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
              title="Client Portal"
            >
              <User size={16} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-semibold rounded-lg shadow-premium hover:shadow-glow transition-all duration-300 whitespace-nowrap"
            >
              <span>Start Project</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* ══ MOBILE CONTROLS (below lg) ════════════════════════ */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-all duration-300"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Hamburger — always visible */}
            <button
              onClick={() => setIsOpen(v => !v)}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* ══ MOBILE DRAWER ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[45] lg:hidden bg-black/50"
              onClick={close}
            />

            {/* ── Drawer panel ──
                Uses Tailwind dark: variant — fully opaque in both themes.
                Light  = white (#ffffff)
                Dark   = deep slate (#020617)
            ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -6  }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`
                lg:hidden fixed left-0 right-0 z-[50]
                overflow-y-auto
                border-b border-slate-200 dark:border-slate-800
                shadow-2xl
                ${drawerBgClass}
              `}
              style={{
                top:       `${headerHeight}px`,
                maxHeight: `calc(100vh - ${headerHeight}px)`,
              }}
            >
              <div className="px-4 py-4 space-y-1">

                {/* Nav links */}
                {ALL_MOBILE_LINKS.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={close}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-150 ${
                        active
                          ? 'text-brand-primary bg-brand-primary/10'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-700/60 my-2" />

                {/* Client Portal */}
                <Link
                  to="/portal"
                  onClick={close}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    location.pathname.startsWith('/portal')
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <User size={16} />
                  Client Portal
                </Link>

                {/* CTA */}
                <div className="pt-2 px-1 pb-2">
                  <Link
                    to="/contact"
                    onClick={close}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-xl shadow-premium"
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
