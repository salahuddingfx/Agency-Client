import { motion } from 'framer-motion';
import { Layers, Monitor, HardDrive, Terminal, Sliders } from 'lucide-react';
import SEO from '../components/SEO';
import { technologies } from '../data/mockData';

export default function Technologies() {
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Infrastructure', 'Tools'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': return <Monitor className="text-brand-primary" size={16} />;
      case 'Backend': return <Terminal className="text-brand-primary" size={16} />;
      case 'Database': return <HardDrive className="text-brand-primary" size={16} />;
      case 'Infrastructure': return <Layers className="text-brand-primary" size={16} />;
      default: return <Sliders className="text-brand-primary" size={16} />;
    }
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
        title="Our Technologies" 
        description="See Nextora Studio's tech stack capabilities, featuring React.js, Vite, Node.js, Express, MongoDB, Docker container setups, and Cloudflare CDNs." 
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Stack</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Premium Technologies for <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Robust Infrastructures</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          We use industry-standard, fast, and scalable technologies to ensure your web pages load instantly, applications sync offline, and hosting remains cost-effective.
        </p>
      </section>

      {/* --- TECH GRID BY CATEGORY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {categories.filter(c => c !== 'All').map((category) => {
            const list = technologies.filter(t => t.category === category);
            if (list.length === 0) return null;

            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-brand-slateAccent pb-3">
                  <div className="p-1.5 bg-brand-primary/5 rounded border border-brand-primary/10">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-lg font-semibold text-white font-display tracking-wide uppercase">
                    {category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((tech) => (
                    <div 
                      key={tech.name}
                      className="glass-card p-6 rounded-lg hover:border-brand-primary/20 transition-colors flex items-start space-x-4"
                    >
                      {/* Icon wrapper representation */}
                      <div className="w-10 h-10 rounded-full bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-xs text-brand-primary">
                        {tech.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 font-display">{tech.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </motion.div>
  );
}
