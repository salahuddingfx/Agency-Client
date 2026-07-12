import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Careers', path: '/careers' },
    { name: 'Pricing Plans', path: '/pricing' },
    { name: 'Case Studies', path: '/case-studies' },
  ];

  const servicesLinks = [
    { name: 'Web Development', path: '/services' },
    { name: 'Mobile App Development', path: '/services' },
    { name: 'Custom Software', path: '/services' },
    { name: 'POS Solutions', path: '/services' },
    { name: 'ERP & CRM Systems', path: '/services' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'Graphics Design', path: '/services' },
    { name: 'AI & Machine Learning', path: '/services' },
  ];

  const resourcesLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Blog Posts', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { name: 'Service Agreements', path: '/agreements' },
    { name: 'Privacy Policy', path: '/legal/privacy-policy' },
    { name: 'Terms & Conditions', path: '/legal/terms-and-conditions' },
    { name: 'Cookie Policy', path: '/legal/cookie-policy' },
    { name: 'Refund Policy', path: '/legal/refund-policy' },
    { name: 'Service Agreement', path: '/legal/service-agreement' },
  ];

  return (
    <footer className="bg-brand-darker border-t border-slate-200/50 dark:border-white/5 pt-16 sm:pt-20 pb-10 text-slate-400 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[350px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-16">

          {/* Brand Info — spans 2 cols on large */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <Logo size={32} className="group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-[0.2em] font-display text-slate-900 dark:text-white">NEXTORA</span>
                <span className="text-[7.5px] uppercase tracking-[0.25em] text-brand-primary font-semibold">STUDIO</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Bespoke digital architecture. We engineer and design premium software, cloud platforms, and brand strategies that power modern enterprises.
            </p>
            <div className="space-y-3">
              <a href="mailto:nextorastudio@gmail.com" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors group">
                <Mail size={15} className="text-brand-primary shrink-0" />
                <span>nextorastudio@gmail.com</span>
              </a>
              <a href="tel:+8801851075537" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors group">
                <Phone size={15} className="text-brand-primary shrink-0" />
                <span>+880 185-107-5537</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={15} className="text-brand-primary shrink-0" />
                <span>Global Remote · Est. 2025</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { name: 'GitHub', url: 'https://github.com/nextorastudio', icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/> },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/nextorastudio', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
                { name: 'X / Twitter', url: 'https://x.com/nextorastudio', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 border border-slate-200 dark:border-white/10 rounded-xl hover:text-white hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all duration-300"
                  title={social.name}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="pl-0 sm:pl-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-5">Services</h3>
            <ul className="space-y-3 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-5">Resources</h3>
            <ul className="space-y-3 text-sm mb-6">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-4">Newsletter</h3>
            {subscribed ? (
              <div className="flex items-center gap-2 text-brand-primary text-xs font-semibold">
                <CheckCircle2 size={14} />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email..."
                  className="w-full bg-slate-100/50 dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-xs px-3.5 py-3 rounded-xl outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-3 bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 text-brand-primary text-xs font-semibold rounded-xl transition-all duration-300"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={12} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/50 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs">
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors duration-150">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-500 text-center sm:text-left">
              © {currentYear} Nextora Studio. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-500 dark:text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-1">
              Crafted with <Heart size={11} className="text-red-500 fill-red-500" /> by
              <a
                href="https://nextorastudio.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-accent transition-colors font-semibold"
              >
                Nextora Studio Team
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
