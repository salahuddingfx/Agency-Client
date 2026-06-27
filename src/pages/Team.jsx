import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import SEO from '../components/SEO';
import { teamMembers } from '../data/mockData';
import { normalizeTeamMembers } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

export default function Team() {
  const { data: rawMembers = teamMembers } = useFetch(() => api.getTeam(), teamMembers);
  const members = normalizeTeamMembers(rawMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Our Team" 
        description="Meet the Nextora Studio team. Get to know our system architects, web developers, mobile designers, and performance engineers." 
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Crew</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Meet the Minds Building <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Next-Gen Products</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Our senior engineering team brings together decades of collective SaaS product design and cloud deployment experience.
        </p>
      </section>

      {/* --- TEAM GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div 
              key={member.id} 
              onClick={() => setSelectedMember(member)}
              className="glass-card rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Avatar Placeholder */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${member.avatarGradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">{member.name}</h3>
                    <p className="text-xs text-brand-primary font-medium mt-1">{member.role}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Technical Skill Gauges */}
                <div className="space-y-4 mb-8 pt-4 border-t border-brand-slateAccent/40">
                  <h4 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-brand-primary" />
                    <span>Focus Expertise</span>
                  </h4>
                  {member.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">{skill.name}</span>
                        <span className="text-brand-primary font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-brand-slateAccent/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-primary rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience and Social links */}
              <div className="pt-4 border-t border-brand-slateAccent/40 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {member.experience}
                </span>

                <div className="flex space-x-3 text-slate-400">
                  <a href={member.socials.github} className="hover:text-white transition-colors" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  </a>
                  <a href={member.socials.linkedin} className="hover:text-white transition-colors" title="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={member.socials.twitter} className="hover:text-white transition-colors" title="Twitter / X">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- TEAM MEMBER DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full rounded-2xl overflow-hidden p-6 sm:p-10 relative border border-brand-primary/20"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-slateAccent hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                {/* Big Avatar */}
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr ${selectedMember.avatarGradient} flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-xl shrink-0`}>
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-4">
                  <div>
                    <span className="inline-block text-xs font-semibold text-brand-primary bg-brand-primary/5 px-2.5 py-1 border border-brand-primary/10 rounded mb-2">
                      {selectedMember.experience}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">{selectedMember.name}</h2>
                    <p className="text-sm text-brand-primary font-medium mt-1">{selectedMember.role}</p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {selectedMember.bio}
                  </p>

                  {/* Skills Section */}
                  <div className="space-y-4 pt-4 border-t border-brand-slateAccent/40">
                    <h4 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                      <ShieldCheck size={12} className="text-brand-primary" />
                      <span>Focus Expertise</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedMember.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">{skill.name}</span>
                            <span className="text-brand-primary font-semibold">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-brand-slateAccent/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-primary rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="pt-6 border-t border-brand-slateAccent/40 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Contact directly:</span>
                    <div className="flex space-x-4 text-slate-400">
                      <a href={selectedMember.socials.github} className="hover:text-white p-1 transition-colors" title="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      </a>
                      <a href={selectedMember.socials.linkedin} className="hover:text-white p-1 transition-colors" title="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href={selectedMember.socials.twitter} className="hover:text-white p-1 transition-colors" title="Twitter / X">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
