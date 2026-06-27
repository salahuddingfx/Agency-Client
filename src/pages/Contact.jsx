import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../api/api';

// ── Config ─────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '8801XXXXXXXXX'; // ← Replace with your real WhatsApp Business number
const CONTACT_EMAIL   = 'hello@nextorastudio.com';

const BUDGET_OPTIONS = [
  '$5k - $10k (Starter)',
  '$10k - $25k (Professional)',
  '$25k - $50k (Enterprise)',
  '$50k+ (Custom Solution)',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: BUDGET_OPTIONS[1],
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // ── Inline validation ──────────────────────────────────────────
  const validateField = (name, value) => {
    const errs = { ...errors };
    if (name === 'name') {
      if (value.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
      else delete errs.name;
    }
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = 'Enter a valid email address.';
      else delete errs.email;
    }
    if (name === 'details') {
      if (value.trim().length < 10) errs.details = 'Please provide at least 10 characters.';
      else delete errs.details;
    }
    setErrors(errs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // ── Submit → POST /api/v1/contacts ────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = {};
    if (!formData.name.trim()) finalErrors.name = 'Name is required.';
    if (!formData.email.trim()) finalErrors.email = 'Email is required.';
    if (formData.details.trim().length < 10) finalErrors.details = 'Project details are required (min 10 chars).';

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // Backend schema: { name, email, subject, text }
      // We map budget + details → subject + text
      const subject = `Project Inquiry — Budget: ${formData.budget}`;
      const text = formData.details;

      await api.submitContact(formData.name, formData.email, subject, text);

      setStatus('success');
      setFormData({ name: '', email: '', budget: BUDGET_OPTIONS[1], details: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please email us directly.');
    }

    setTimeout(() => setStatus('idle'), 7000);
  };

  // ── WhatsApp click ─────────────────────────────────────────────
  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi Nextora Studio! My name is ${formData.name || 'there'}. Budget: ${formData.budget}. ${formData.details || 'I would like to discuss a project.'}`
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
        description="Get in touch with Nextora Studio. Submit your project scope and our team will respond within 12 business hours."
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
          Fill in the form and our team will respond within 12 business hours — or chat instantly via WhatsApp.
        </p>
      </section>

      {/* ─── CONTACT GRID ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
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
                className="w-full flex items-center gap-4 p-3.5 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 rounded-xl border border-brand-slateAccent/30 hover:border-green-500/30 transition-all group text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-green-500/5 border border-green-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-green-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                    WhatsApp Chat
                    <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Pre-fills from your form data</p>
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

            {/* Response time */}
            <div className="glass-card p-5 rounded-xl border border-brand-primary/10">
              <p className="text-xs font-semibold text-white mb-2">⚡ Response Time</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                We respond to all project inquiries within{' '}
                <strong className="text-white">12 business hours</strong>. For urgent matters, WhatsApp is fastest.
              </p>
            </div>
          </div>

          {/* Right column — Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-5 sm:p-8 lg:p-10 rounded-xl relative overflow-hidden">

              {/* Success overlay */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-darker/96 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <CheckCircle2 size={44} className="text-brand-primary mb-4" />
                    <h3 className="text-lg font-bold text-white font-display">Message Sent! 🎉</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                      Your inquiry has been saved to our CRM. Our team will contact you within 12 business hours.
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
                    <p className="text-xs text-slate-400 mt-2 max-w-sm">{errorMsg}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Or email us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-primary underline">{CONTACT_EMAIL}</a>
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-5 text-xs text-brand-primary border border-brand-primary/30 px-4 py-1.5 rounded-lg hover:bg-brand-primary/10 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-5 sm:mb-6">
                Project Inquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name */}
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
                    {errors.name && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />{errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
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
                    {errors.email && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />{errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Estimated Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="glass-input">
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Project Details *</label>
                  <textarea
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe your project, required integrations, target launch date, and key features..."
                    className="glass-input resize-none"
                  />
                  {errors.details && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} />{errors.details}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs sm:text-sm font-bold rounded-lg shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={14} className="animate-spin" /><span>Sending to CRM...</span></>
                    ) : (
                      <><Send size={14} /><span>Launch Inquiry</span></>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-600 text-center mt-2">
                    Your data is saved securely to our admin CRM. No spam, ever.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
