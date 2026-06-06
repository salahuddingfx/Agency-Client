import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', budget: '$10k - $25k', desc: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHub, setActiveHub] = useState(null);

  const hubs = [
    { city: 'San Francisco', coords: { x: '18%', y: '32%' }, info: 'HQ & System Architects' },
    { city: 'London', coords: { x: '46%', y: '25%' }, info: 'UI/UX Design Studio' },
    { city: 'Tokyo', coords: { x: '82%', y: '35%' }, info: 'Mobile Engineering Lead' }
  ];

  // Dynamic input validation
  const validateField = (name, value) => {
    let errs = { ...formErrors };
    if (name === 'name') {
      if (value.trim().length < 2) {
        errs.name = 'Name must be at least 2 characters.';
      } else {
        delete errs.name;
      }
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errs.email = 'Enter a valid email address.';
      } else {
        delete errs.email;
      }
    }
    if (name === 'desc') {
      if (value.trim().length < 10) {
        errs.desc = 'Description must be at least 10 characters.';
      } else {
        delete errs.desc;
      }
    }
    setFormErrors(errs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalErrors = {};
    if (!formData.name.trim()) finalErrors.name = 'Name is required.';
    if (!formData.email.trim()) finalErrors.email = 'Email is required.';
    if (formData.desc.trim().length < 10) finalErrors.desc = 'Details are required.';

    if (Object.keys(finalErrors).length > 0) {
      setFormErrors(finalErrors);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', budget: '$10k - $25k', desc: '' });
    }, 4000);
  };

  // WhatsApp click handler
  const openWhatsApp = () => {
    const textMsg = encodeURIComponent(
      `Hi Nextora Studio team, my name is ${formData.name || 'Client'}. I would like to discuss a project with a budget of ${formData.budget}. Details: ${formData.desc || 'I need details on custom software.'}`
    );
    window.open(`https://wa.me/15556398672?text=${textMsg}`, '_blank');
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
        title="Contact Us" 
        description="Get in touch with Nextora Studio. Submit project scopes, chat via WhatsApp, or locate our engineering hubs." 
      />

      {/* Background Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Connect</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
          Start Your Technical <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Discovery Session</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Submit project parameters to receive scope estimates, or chat instantly with our client coordinator.
        </p>
      </section>

      {/* --- CONTACT GRID CONTENT --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Methods Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-xl space-y-6">
              <h3 className="text-base font-bold text-white font-display">Communication Channels</h3>

              <div className="space-y-4">
                <a href="mailto:hello@nextorastudio.com" className="flex items-start gap-4 p-3 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 rounded-lg border border-brand-slateAccent/30 hover:border-brand-primary/20 transition-all group">
                  <div className="w-9 h-9 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-brand-primary transition-colors">Direct Email</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">hello@nextorastudio.com</p>
                  </div>
                </a>

                <div 
                  onClick={openWhatsApp}
                  className="flex items-start gap-4 p-3 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 rounded-lg border border-brand-slateAccent/30 hover:border-green-500/30 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-md bg-green-500/5 border border-green-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={16} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-green-400 transition-colors flex items-center gap-1.5">
                      <span>WhatsApp Hotline</span>
                      <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">Active</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Auto-generate WhatsApp message</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-brand-slateAccent/20 rounded-lg border border-brand-slateAccent/30">
                  <div className="w-9 h-9 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Office Location</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">San Francisco Hub: 100 Innovation Way</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive World Map representation */}
            <div className="glass-card p-6 rounded-xl overflow-hidden relative">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Our Hub Network</h4>
              
              {/* Styled CSS Map dot layout */}
              <div className="h-44 bg-slate-950/60 rounded-lg border border-brand-slateAccent relative overflow-hidden">
                {/* World map layout dots representation */}
                <div className="absolute inset-0 opacity-15 bg-grid-glow" />
                
                {hubs.map((hub) => (
                  <button
                    key={hub.city}
                    onMouseEnter={() => setActiveHub(hub)}
                    onMouseLeave={() => setActiveHub(null)}
                    className="absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: hub.coords.x, top: hub.coords.y }}
                  >
                    <span className="absolute inset-0 bg-brand-primary/40 rounded-full animate-ping pointer-events-none" />
                    <span className="absolute inset-1 bg-brand-primary rounded-full border border-white" />
                  </button>
                ))}

                {/* Hub Information Overlay display */}
                <div className="absolute bottom-3 left-3 right-3 bg-brand-darker/90 backdrop-blur border border-brand-slateAccent/50 p-2 rounded text-[10px]">
                  {activeHub ? (
                    <div>
                      <span className="font-bold text-white block">{activeHub.city}</span>
                      <span className="text-slate-400">{activeHub.info}</span>
                    </div>
                  ) : (
                    <span className="text-slate-500 italic">Hover pins to see engineering specialties.</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 rounded-xl relative">
              
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-darker/95 rounded-xl z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <CheckCircle2 size={48} className="text-brand-primary mb-4 animate-bounce" />
                    <h3 className="text-lg font-bold text-white font-display">Message Sync Completed</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm">
                      Thank you! Our client coordinator has queued your parameters. We will contact you at <strong>{formData.email}</strong> within 12 business hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Name</label>
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
                        <AlertCircle size={10} />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Work Email</label>
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
                        <AlertCircle size={10} />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="glass-input"
                  >
                    <option>$5k - $10k (Starter)</option>
                    <option>$10k - $25k (Professional)</option>
                    <option>$25k - $50k (Enterprise)</option>
                    <option>$50k+ (Custom Solution)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Project Details</label>
                  <textarea
                    name="desc"
                    rows={4}
                    value={formData.desc}
                    onChange={handleChange}
                    placeholder="Tell us about the integrations, target launch date, and features..."
                    className="glass-input resize-none"
                  />
                  {formErrors.desc && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} />
                      <span>{formErrors.desc}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Send size={14} />
                    <span>Launch Inquiry</span>
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
