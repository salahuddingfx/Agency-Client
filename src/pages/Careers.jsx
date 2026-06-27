import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Briefcase, FileText, CheckCircle2, X } from 'lucide-react';
import SEO from '../components/SEO';
import { careersData } from '../data/mockData';
import { normalizeCareers } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';
import { useToast } from '../components/Toast';

export default function Careers() {
  const { data: rawJobs = careersData } = useFetch(() => api.getCareers(), careersData);
  const jobs = normalizeCareers(rawJobs);
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', resume: '', coverLetter: '' });
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email || !applyForm.resume) {
      toast.warning('Please fill all required inputs.');
      return;
    }
    setIsApplied(true);
    setTimeout(() => {
      setIsApplied(false);
      setSelectedJob(null);
      setApplyForm({ name: '', email: '', resume: '', coverLetter: '' });
    }, 3000);
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
        title="Careers - Join Our Remote Team" 
        description="Join Nextora Studio. Explore open technical positions for senior engineers, designers, and developer internships." 
        keywords={[
          'software engineer jobs',
          'remote tech jobs',
          'UI UX designer hiring',
          'work at nextora studio'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Careers</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Build the Future of <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Digital Commerce & SaaS</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Nextora Studio operates as a globally synchronized remote team. We seek engineers and designers who care about precision, testing, and visuals.
        </p>
      </section>

      {/* --- JOBS LISTING SECTION --- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="glass-card p-6 sm:p-8 rounded-xl hover:border-brand-primary/25 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/15 px-2 py-0.5 rounded">
                    {job.department}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-slateAccent/40 text-slate-400 px-2 py-0.5 rounded">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-display">{job.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <MapPin size={12} className="text-brand-primary" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Briefcase size={12} className="text-brand-primary" />
                    <span>{job.experience}</span>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 font-medium">{job.salary}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2.5 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-md transition-colors flex-shrink-0 self-start md:self-center"
              >
                Learn & Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- SLIDE OVER JOB DRAWER (Framer Motion) --- */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Application Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-brand-darker border-l border-brand-slateAccent h-full overflow-y-auto p-6 sm:p-10 z-10"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 border border-brand-slateAccent text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors mb-6"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest">{selectedJob.department}</span>
                  <h2 className="text-xl font-bold text-white mt-1 font-display leading-tight">{selectedJob.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">{selectedJob.location} &bull; {selectedJob.type} &bull; {selectedJob.salary}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-slateAccent/40">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Requirements</h3>
                  <ul className="space-y-2 list-disc list-inside text-xs text-slate-400 leading-relaxed">
                    {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-slateAccent/40">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Responsibilities</h3>
                  <ul className="space-y-2 list-disc list-inside text-xs text-slate-400 leading-relaxed">
                    {selectedJob.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>

                {/* Application Form */}
                <div className="pt-6 border-t border-brand-slateAccent/40 relative">
                  <AnimatePresence>
                    {isApplied && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-darker z-20 flex flex-col items-center justify-center text-center p-4"
                      >
                        <CheckCircle2 size={36} className="text-brand-primary mb-3" />
                        <h4 className="text-sm font-bold text-white">Application Received</h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Thank you! We will review your profile and update you at <strong>{applyForm.email}</strong>.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Apply for this Role</h3>
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={applyForm.name}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={applyForm.email}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Portfolio or CV URL</label>
                      <input
                        type="url"
                        required
                        value={applyForm.resume}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, resume: e.target.value }))}
                        placeholder="https://myportfolio.com/cv.pdf"
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Short Cover Letter (Optional)</label>
                      <textarea
                        rows={3}
                        value={applyForm.coverLetter}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                        placeholder="Why are you a good fit for Nextora?"
                        className="glass-input resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-1 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium"
                    >
                      <FileText size={14} />
                      <span>Submit Application</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
