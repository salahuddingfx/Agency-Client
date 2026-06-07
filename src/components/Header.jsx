import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User } from 'lucide-react';

export default function Header() {
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
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Team', path: '/team' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
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
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/NEXTORA-LOGO.png"
              alt="Nextora Logo"
              className="w-9 h-9 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-[0.2em] font-display text-white">NEXTORA</span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-brand-primary font-medium">STUDIO</span>
            </div>
          </Link>

          {/* Navigation Center */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-xs font-medium tracking-wide rounded-md transition-colors ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Right */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/portal"
              className={`p-2 rounded-full border border-brand-slateAccent text-slate-300 hover:text-brand-primary hover:border-brand-primary/30 transition-all ${
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
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              to="/portal"
              className={`p-2 rounded-full border border-brand-slateAccent text-slate-300 hover:text-brand-primary transition-all ${
                location.pathname.startsWith('/portal') ? 'text-brand-primary border-brand-primary/30 bg-brand-primary/5' : ''
              }`}
            >
              <User size={16} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md border border-brand-slateAccent text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                    className={`block px-4 py-3 rounded-md text-sm font-medium tracking-wide ${
                      isActive
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
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
