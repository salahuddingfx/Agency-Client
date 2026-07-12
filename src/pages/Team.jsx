import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { teamMembers } from '../data/mockData';
import { normalizeTeamMembers } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassBadge from '../components/ui/GlassBadge';
import GlassAvatar from '../components/ui/GlassAvatar';
import GlassModal from '../components/ui/GlassModal';

export default function Team() {
  const { data: rawMembers = teamMembers } = useFetch(() => api.getTeam(), teamMembers);
  const members = normalizeTeamMembers(rawMembers);
  const [selectedMember, setSelectedMember] = useState(null);

  const GRADIENTS = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-500',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-500',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Meet Our Engineers & Designers" 
        description="Meet the Nextora Studio team. Get to know our system architects, web developers, mobile designers, and performance engineers." 
        keywords={[
          'nextora studio leadership',
          'software architects',
          'UI UX designers',
          'full stack developers',
          'remote team'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Our Crew</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Meet the Minds Building <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Next-Gen Products</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Our senior engineering team brings together decades of collective SaaS product design and cloud deployment experience.
        </p>
      </section>

      {/* --- TEAM GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {members.map((member, idx) => {
            const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            const grad = member.avatarGradient || GRADIENTS[idx % GRADIENTS.length];
            return (
              <GlassCard 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                className="hover:border-brand-primary/30 flex flex-col justify-between p-6 sm:p-8 text-left relative"
                hoverEffect="lift"
              >
                <div>
                  {/* Avatar */}
                  <div className="flex items-center space-x-4 mb-6">
                    <GlassAvatar
                      src={member.avatarUrl}
                      initials={initials}
                      gradient={grad}
                      size="lg"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-tight">{member.name}</h3>
                      <p className="text-xs font-semibold text-brand-primary mt-1">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Technical Skill Gauges */}
                  <div className="space-y-4 mb-8 pt-5 border-t border-slate-200/50 dark:border-white/5">
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-350 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={13} className="text-brand-primary" />
                      <span>Focus Expertise</span>
                    </h4>
                    {member.skills.slice(0, 3).map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">{skill.name}</span>
                          <span className="text-brand-primary font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-brand-slateAccent/50 rounded-full overflow-hidden">
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
                <div className="pt-5 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {member.experience}
                  </span>

                  <div className="flex space-x-3.5 text-slate-400 dark:text-slate-500">
                    <a href={member.socials.github} onClick={(e) => e.stopPropagation()} className="hover:text-brand-primary transition-colors" title="GitHub">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    </a>
                    <a href={member.socials.linkedin} onClick={(e) => e.stopPropagation()} className="hover:text-brand-primary transition-colors" title="LinkedIn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href={member.socials.twitter} onClick={(e) => e.stopPropagation()} className="hover:text-brand-primary transition-colors" title="Twitter / X">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* --- TEAM MEMBER DETAIL MODAL --- */}
      <GlassModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name}
      >
        {selectedMember && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pt-2">
            <GlassAvatar
              src={selectedMember.avatarUrl}
              initials={selectedMember.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              gradient={selectedMember.avatarGradient || 'from-brand-primary to-brand-accent'}
              size="xl"
            />

            <div className="flex-1 text-center sm:text-left space-y-5">
              <div>
                <GlassBadge variant="primary" className="mb-2 font-semibold">
                  {selectedMember.experience}
                </GlassBadge>
                <p className="text-sm font-semibold text-brand-primary">{selectedMember.role}</p>
              </div>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-300 leading-relaxed font-sans">
                {selectedMember.bio}
              </p>

              {/* Skills Section */}
              <div className="space-y-4 pt-5 border-t border-slate-200/50 dark:border-white/5">
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-350 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                  <ShieldCheck size={13} className="text-brand-primary" />
                  <span>Focus Expertise</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedMember.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1 text-left">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">{skill.name}</span>
                        <span className="text-brand-primary font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-brand-slateAccent/50 rounded-full overflow-hidden">
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
              <div className="pt-5 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Contact directly</span>
                <div className="flex space-x-4 text-slate-400 dark:text-slate-500">
                  <a href={selectedMember.socials.github} className="hover:text-brand-primary p-1 transition-colors" title="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  </a>
                  <a href={selectedMember.socials.linkedin} className="hover:text-brand-primary p-1 transition-colors" title="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={selectedMember.socials.twitter} className="hover:text-brand-primary p-1 transition-colors" title="Twitter / X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </GlassModal>
    </motion.div>
  );
}
