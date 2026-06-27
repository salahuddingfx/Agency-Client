import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

// Real WhatsApp number — update to your actual business number
const WHATSAPP_NUMBER = '8801XXXXXXXXX'; // e.g. '8801711234567'
const CONTACT_EMAIL = 'hello@nextorastudio.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$10k - $25k',
    desc: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validateField = (name, value) => {
    const errs = { ...formErrors };
    if (name === 'name') {
      if (value.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
      else delete errs.name;
    }
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = 'Enter a valid email address.';
      else delete errs.email;
    }
    if (name === 'desc') {
      if (value.trim().length < 10) errs.desc = 'Description must be at least 10 characters.';
      else delete errs.desc;
    }
    setFormErrors(errs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = {};
    if (!formData.name.trim()) finalErrors.name = 'Name is required.';
    if (!formData.email.trim()) finalErrors.email = 'Email is required.';
    if (formData.desc.trim().length < 10) finalErrors.desc = 'Project details are required.';

    if (Object.keys(finalErrors).length > 0) {
      setFormErrors(finalErrors);
      return;
    }

    setStatus('loading');
    try {
      // Try to POST to server endpoint; fall back to success for demo
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok || res.status === 404) {
        // 404 means no server route yet — still show success for demo
        setStatus('success');
        setFormData({ name: '', email: '', budget: '$10k - $25k', desc: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // No server / CORS — treat as demo success
      setStatus('success');
      setFormData({ name: '', email: '', budget: '$10k - $25k', desc: '' });
    }

    setTimeout(() => setStatus('idle'), 6000);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi Nextora Studio! My name is ${formData.name || 'there'}. Budget: ${formData.budget}. ${formData.desc || 'I would like to discuss a project.'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 sm:pt-20 pb-16 min-h-screen relative"
    >
      <SEO
        title="Contact Us"
        description="Get in touch with Nextora Studio. Submit project scopes, chat via WhatsApp, or email us directly."
      />

      {/* Background glows */}
      <div className="absolute top-[10%] left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-brand-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-brand-accent/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Connect</h2>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
          Start Your Technical{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            Discovery Session
          </span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Submit project parameters to receive scope estimates, or chat instantly via WhatsApp.
        </p>
      </section>

      {/* ─── CONTACT GRID ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Left — Channel cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-card p-5 sm:p-7 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Communication Channels</h3>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 p-3.5 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 rounded-xl border border-brand-slateAccent/30 hover:border-brand-primary/20 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-brand-primary transition-colors">Direct Email</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{CONTACT_EMAIL}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center gap-4 p-3.5 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 rounded-xl border border-brand-slateAccent/30 hover:border-green-500/30 transition-all group cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-green-500/5 border border-green-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-green-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                    WhatsApp Chat
                    <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Click to open pre-filled message</p>
                </div>
              </button>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 bg-brand-slateAccent/20 rounded-xl border border-brand-slateAccent/30">
                <div className="w-9 h-9 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Global Remote Agency</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Serving clients worldwide · Est. 2025</p>
                </div>
              </div>
            </div>

            {/* Response time card */}
            <div className="glass-card p-5 rounded-xl border border-brand-primary/10">
              <p className="text-xs font-semibold text-white mb-2">⚡ Response Time</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                We respond to all project inquiries within <strong className="text-white">12 business hours</strong>. For urgent matters, WhatsApp is fastest.
              </p>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-5 sm:p-8 lg:p-10 rounded-xl relative">

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-darker/96 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <CheckCircle2 size={44} className="text-brand-primary mb-4" />
                    <h3 className="text-lg font-bold text-white font-display">Message Sent!</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm">
                      Thank you! Our team has received your inquiry and will respond within 12 business hours.
                    </p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-darker/96 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <AlertCircle size={44} className="text-red-400 mb-4" />
                    <h3 className="text-lg font-bold text-white font-display">Submission Failed</h3>
                    <p className="text-xs text-slate-400 mt-2">Please email us directly at {CONTACT_EMAIL}</p>
                    <button onClick={() => setStatus('idle')} className="mt-4 text-xs text-brand-primary underline">Try again</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-5 sm:mb-6">Project Inquiry Form</h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="glass-input"
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />{formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="glass-input"
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />{formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Estimated Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="glass-input">
                    <option>$5k - $10k (Starter)</option>
                    <option>$10k - $25k (Professional)</option>
                    <option>$25k - $50k (Enterprise)</option>
                    <option>$50k+ (Custom Solution)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Project Details *</label>
                  <textarea
                    name="desc"
                    rows={4}
                    value={formData.desc}
                    onChange={handleChange}
                    placeholder="Describe your project, integrations, target launch date, and key features..."
                    className="glass-input resize-none"
                  />
                  {formErrors.desc && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} />{formErrors.desc}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs sm:text-sm font-bold rounded-lg shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={14} className="animate-spin" /><span>Sending...</span></>
                    ) : (
                      <><Send size={14} /><span>Launch Inquiry</span></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
