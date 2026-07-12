import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Briefcase, FileText, CheckCircle2, X } from 'lucide-react';
import SEO from '../components/SEO';
import { careersData } from '../data/mockData';
import { normalizeCareers } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';
import { useToast } from '../components/Toast';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';
import GlassInput from '../components/ui/GlassInput';

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
          'ui ux designer hiring',
          'work at nextora studio'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Careers</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Build the Future of <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Digital Commerce & SaaS</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Nextora Studio operates as a globally synchronized remote team. We seek engineers and designers who care about precision, testing, and visuals.
        </p>
      </section>

      {/* --- JOBS LISTING SECTION --- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        <div className="space-y-6">
          {jobs.map((job) => (
            <GlassCard 
              key={job.id} 
              className="hover:border-brand-primary/30 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8"
              hoverEffect="lift"
            >
              <div className="space-y-3.5">
                <div className="flex flex-wrap gap-2">
                  <GlassBadge variant="primary" className="font-semibold text-[9px]">
                    {job.department}
                  </GlassBadge>
                  <GlassBadge variant="secondary" className="font-semibold text-[9px]">
                    {job.type}
                  </GlassBadge>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display leading-tight">{job.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <MapPin size={13} className="text-brand-primary shrink-0" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Briefcase size={13} className="text-brand-primary shrink-0" />
                    <span>{job.experience}</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-slate-600 dark:text-slate-350 font-bold">{job.salary}</span>
                </div>
              </div>

              <GlassButton
                onClick={() => setSelectedJob(job)}
                variant="glass"
                className="shrink-0 self-start md:self-center"
              >
                Learn & Apply
              </GlassButton>
            </GlassCard>
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
              className="absolute inset-0 bg-slate-950/20 dark:bg-black/50 backdrop-blur-md"
            />

            {/* Application Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#020617] border-l border-slate-200 dark:border-white/5 h-full overflow-y-auto p-6 sm:p-10 z-10 text-left flex flex-col justify-between"
            >
              <div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 mb-6"
                >
                  <X size={16} />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{selectedJob.department}</span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 font-display leading-tight">{selectedJob.title}</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{selectedJob.location} &bull; {selectedJob.type} &bull; {selectedJob.salary}</p>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-slate-200/50 dark:border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 pl-1">Requirements</h3>
                    <ul className="space-y-2.5 list-disc list-inside text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-slate-200/50 dark:border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 pl-1">Responsibilities</h3>
                    <ul className="space-y-2.5 list-disc list-inside text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {selectedJob.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                    </ul>
                  </div>

                  {/* Application Form */}
                  <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 relative">
                    <AnimatePresence>
                      {isApplied && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white dark:bg-[#020617] z-20 flex flex-col items-center justify-center text-center p-4"
                        >
                          <CheckCircle2 size={40} className="text-brand-primary mb-3" />
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Application Received</h4>
                          <p className="text-[11px] sm:text-xs text-slate-550 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
                            Thank you! We will review your profile and update you at <strong>{applyForm.email}</strong>.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-5 pl-1">Apply for this Role</h3>
                    <form onSubmit={handleApply} className="space-y-4">
                      <GlassInput
                        label="Full Name"
                        required
                        value={applyForm.name}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                      <GlassInput
                        label="Email Address"
                        type="email"
                        required
                        value={applyForm.email}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                      <GlassInput
                        label="Portfolio or CV URL"
                        type="url"
                        required
                        value={applyForm.resume}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, resume: e.target.value }))}
                        placeholder="https://myportfolio.com/cv.pdf"
                      />
                      <GlassInput
                        label="Short Cover Letter (Optional)"
                        textarea
                        rows={3}
                        value={applyForm.coverLetter}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                        placeholder="Why are you a good fit for Nextora?"
                      />
                      <GlassButton
                        type="submit"
                        variant="primary"
                        className="w-full mt-2"
                      >
                        <FileText size={15} />
                        <span>Submit Application</span>
                      </GlassButton>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
