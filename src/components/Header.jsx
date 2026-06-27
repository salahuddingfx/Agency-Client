import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-darker/80 backdrop-blur-md border-b border-brand-slateAccent/50 py-3 shadow-lg'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Left */}
          <Link to="/" className="flex items-center sm:space-x-3 group shrink-0 min-w-0">
            <Logo size={32} className="transform group-hover:scale-105 transition-transform duration-300 shrink-0" />
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-lg font-bold tracking-[0.2em] font-display text-slate-900 dark:text-white transition-colors duration-300">NEXTORA</span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-brand-primary font-medium">STUDIO</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-xs font-medium tracking-wide rounded-md transition-all duration-300 ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-slate-400 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:border-brand-primary/30 transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link
              to="/portal"
              className={`p-2 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-300 hover:text-brand-primary hover:border-brand-primary/30 transition-all duration-300 ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
              title="Client Portal"
            >
              <User size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary hover:to-brand-secondary text-white text-xs font-semibold rounded-md shadow-premium hover:shadow-glow transition-all duration-300"
            >
              <span>Start Project</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile hamburger icon */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-300 hover:text-brand-primary transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <Link
              to="/portal"
              className={`p-1.5 sm:p-2 rounded-full border border-slate-300 dark:border-brand-slateAccent text-slate-600 dark:text-slate-300 hover:text-brand-primary transition-all duration-300 ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
            >
              <User size={14} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 sm:p-2 rounded-md border border-slate-300 dark:border-brand-slateAccent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-brand-darker/95 backdrop-blur-lg border-b border-brand-slateAccent"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-md shadow-premium"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
