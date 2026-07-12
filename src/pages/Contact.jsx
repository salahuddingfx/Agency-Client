import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../api/api';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';
import GlassInput from '../components/ui/GlassInput';
import GlassDropdown from '../components/ui/GlassDropdown';

const WHATSAPP_NUMBER = '8801851075537';
const CONTACT_EMAIL   = 'nextorastudio@gmail.com';

const BUDGET_OPTIONS = [
  { value: '$5k - $10k (Starter)', label: '$5k - $10k (Starter)' },
  { value: '$10k - $25k (Professional)', label: '$10k - $25k (Professional)' },
  { value: '$25k - $50k (Enterprise)', label: '$25k - $50k (Enterprise)' },
  { value: '$50k+ (Custom Solution)', label: '$50k+ (Custom Solution)' },
];

const CATEGORY_OPTIONS = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'Point of Sale (POS) Systems', label: 'Point of Sale (POS) Systems' },
  { value: 'ERP & CRM Systems', label: 'ERP & CRM Systems' },
  { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
  { value: 'Graphics Design & Branding', label: 'Graphics Design & Branding' },
  { value: 'Others', label: 'Others' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: CATEGORY_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleDropdownSelect = (opt) => {
    setFormData((prev) => ({ ...prev, budget: opt }));
  };

  const handleCategorySelect = (opt) => {
    setFormData((prev) => ({ ...prev, category: opt }));
  };

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
      const subject = `Project Inquiry: ${formData.category.value} — Budget: ${formData.budget.value}`;
      const text = `Interested in: ${formData.category.value}\nBudget range: ${formData.budget.value}\n\nProject Scope:\n${formData.details}`;

      await api.submitContact(formData.name, formData.email, subject, text);

      setStatus('success');
      setFormData({ name: '', email: '', category: CATEGORY_OPTIONS[0], budget: BUDGET_OPTIONS[1], details: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please email us directly.');
    }

    setTimeout(() => setStatus('idle'), 7000);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi Nextora Studio! My name is ${formData.name || 'there'}. I am interested in ${formData.category.value}. Budget: ${formData.budget.value}. Details: ${formData.details || 'I would like to discuss a project.'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO
        title="Contact Us - Start Your Project"
        description="Get in touch with Nextora Studio. Submit your project scope and our team will respond within 12 business hours."
        keywords={[
          'hire software agency',
          'hire developers',
          'start custom web project',
          'software consultation',
          'contact nextora studio'
        ]}
      />

      {/* Background glows */}
      <div className="absolute top-[10%] left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-brand-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-brand-accent/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Connect</GlassBadge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-4">
          Start Your Technical{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Discovery Session
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Fill in the form and our team will respond within 12 business hours — or chat instantly via WhatsApp.
        </p>
      </section>

      {/* ─── CONTACT GRID ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6 sm:p-8" hoverEffect="none">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display mb-2 pl-1 uppercase tracking-widest text-slate-400 dark:text-slate-500">Communication Channels</h3>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-5 p-4 bg-slate-100/50 dark:bg-brand-slateAccent/10 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors font-display">Direct Email</h4>
                    <p className="text-[11px] font-medium text-slate-550 dark:text-slate-450 mt-1">{CONTACT_EMAIL}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center gap-5 p-4 bg-slate-100/50 dark:bg-brand-slateAccent/10 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-green-500/30 transition-all duration-300 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white group-hover:text-green-500 transition-colors flex items-center gap-2.5 font-display">
                      <span>WhatsApp Chat</span>
                      <span className="text-[8px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full tracking-widest uppercase">Live</span>
                    </h4>
                    <p className="text-[11px] font-medium text-slate-555 dark:text-slate-450 mt-1">Pre-fills from your form data</p>
                  </div>
                </button>

                {/* Location */}
                <div className="flex items-center gap-5 p-4 bg-slate-100/50 dark:bg-brand-slateAccent/10 rounded-2xl border border-slate-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white font-display">Global Remote Agency</h4>
                    <p className="text-[11px] font-medium text-slate-550 dark:text-slate-450 mt-1">Serving clients worldwide · Est. 2025</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Response time */}
            <GlassCard className="p-6 sm:p-8" hoverEffect="none">
              <p className="text-sm font-bold text-slate-800 dark:text-white mb-2.5 pl-1 font-display">⚡ Response Time</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-1">
                We respond to all project inquiries within{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">12 business hours</strong>. For urgent matters, WhatsApp is fastest.
              </p>
            </GlassCard>
          </div>

          {/* Right column — Form */}
          <div className="lg:col-span-7">
            <GlassCard className="relative overflow-hidden p-6 sm:p-10" hoverEffect="none">

              {/* Success overlay */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/96 dark:bg-brand-darker/96 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <CheckCircle2 size={48} className="text-brand-primary mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Message Sent! 🎉</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2.5 max-w-sm leading-relaxed">
                      Your inquiry has been saved to our CRM. Our team will contact you within 12 business hours.
                    </p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/96 dark:bg-brand-darker/96 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Submission Failed</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">{errorMsg}</p>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-2.5">
                      Or email us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-primary underline font-semibold">{CONTACT_EMAIL}</a>
                    </p>
                    <GlassButton
                      onClick={() => setStatus('idle')}
                      variant="outline"
                      className="mt-6 px-6"
                    >
                      Try Again
                    </GlassButton>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display mb-6 border-b border-slate-200/50 dark:border-white/5 pb-4 uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Project Inquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <GlassInput
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    error={errors.name}
                  />

                  {/* Email */}
                  <GlassInput
                    label="Work Email *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Category */}
                  <div className="w-full flex flex-col space-y-1.5 text-left">
                    <span className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
                      Project Category
                    </span>
                    <GlassDropdown
                      options={CATEGORY_OPTIONS}
                      selectedOption={formData.category}
                      onSelect={handleCategorySelect}
                      className="w-full"
                    />
                  </div>

                  {/* Budget */}
                  <div className="w-full flex flex-col space-y-1.5 text-left">
                    <span className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
                      Estimated Budget
                    </span>
                    <GlassDropdown
                      options={BUDGET_OPTIONS}
                      selectedOption={formData.budget}
                      onSelect={handleDropdownSelect}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <GlassInput
                  label="Project Details *"
                  textarea
                  rows={5}
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe your project, required integrations, target launch date, and key features..."
                  error={errors.details}
                />

                {/* Submit */}
                <div className="pt-2">
                  <GlassButton
                    type="submit"
                    disabled={status === 'loading'}
                    variant="primary"
                    className="w-full py-3.5"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={15} className="animate-spin" /><span>Sending to CRM...</span></>
                    ) : (
                      <><Send size={15} /><span>Launch Inquiry</span></>
                    )}
                  </GlassButton>
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 text-center mt-3">
                    Your data is saved securely to our admin CRM. No spam, ever.
                  </p>
                </div>
              </form>
            </GlassCard>
          </div>

        </div>
      </section>

      {/* ─── GOOGLE MAP SECTION ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <GlassCard className="p-0 overflow-hidden rounded-2xl" hoverEffect="none">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.664795997418!2d92.07100457511362!3d21.324257580399998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc34f0598d58f%3A0xe4809bd721d06fbb!2sNextora%20Studio!5e0!3m2!1sen!2sus!4v1783876992779!5m2!1sen!2sus"
            width="100%"
            className="w-full h-[350px] sm:h-[450px]"
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nextora Studio Head Office Coordinates"
          />
        </GlassCard>
      </section>
    </motion.div>
  );
}
