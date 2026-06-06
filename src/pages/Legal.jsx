import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function Legal() {
  const { policyId } = useParams();

  const getPolicyContent = (id) => {
    switch (id) {
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          icon: <Shield className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: `
            <h3 class="text-sm font-bold text-white mt-6 mb-2">1. Information We Collect</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">We collect information that you directly submit through our inquiry forms or support tickets, such as your full name, business email address, project descriptions, and budget parameters. We also track client portal logs to ensure platform security audits.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">2. How We Use Information</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">We utilize collected parameters to draft technical project scopes, execute CRM dashboard services, communicate milestones, and contact you regarding support ticket updates. We will never sell or distribute your credentials to third-party databases.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">3. Storage & Data Protection</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">All client data, uploaded mock wireframes, database credentials, and sitemaps are hosted on encrypted cloud hosting networks. Access to code repositories is gated via secure multi-factor authentication locks.</p>
          `
        };
      case 'terms-and-conditions':
        return {
          title: 'Terms & Conditions',
          icon: <FileText className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: `
            <h3 class="text-sm font-bold text-white mt-6 mb-2">1. Scope of Engagement</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Nextora Studio provides design, development, and hosting configuration services based on approved milestone schedules. Any changes to original design documents or custom code integrations may require separate addendums.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">2. Customer Obligations</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Clients must deliver branding assets, database API endpoints, or copy specifications inside scheduled timeline limits. Nextora is not liable for launch delays caused by missing client-supplied configurations.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">3. Termination Policy</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Either party may terminate a project agreement upon 14 days written notice if major contract breaches are not corrected. Upon termination, client is billed for all engineering hours completed up to that date.</p>
          `
        };
      case 'cookie-policy':
        return {
          title: 'Cookie Policy',
          icon: <CheckCircle className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: `
            <h3 class="text-sm font-bold text-white mt-6 mb-2">1. Cookies We Implement</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Nextora Studio uses essential cookie sessions to track client portal login credentials and security parameters. We do not use intrusive advertisement cookies that track your browser activities outside our site.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">2. Disabling Cookies</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">You may disable cookie storage inside your local browser settings; however, doing so will block login access to our secure client tracker portal dashboard.</p>
          `
        };
      case 'refund-policy':
        return {
          title: 'Refund Policy',
          icon: <Shield className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: `
            <h3 class="text-sm font-bold text-white mt-6 mb-2">1. Upfront Milestone Deposits</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Upfront project onboarding deposits (typically 30% of total contracted price) cover initial design research, layout wireframing, and environment setups. Deposits are non-refundable once engineering sprints have commenced.</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">2. In-Progress Milestones</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Completed and approved milestones represent finalized work products. Refunds are not issued for segments already signed off by the client during review stages.</p>
          `
        };
      case 'service-agreement':
        return {
          title: 'Service Agreement',
          icon: <FileText className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: `
            <h3 class="text-sm font-bold text-white mt-6 mb-2">1. SLA Maintenance Contracts</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Nextora Studio provides maintenance support covering server uptime tracking, database security patches, and minor display fixes. Response SLAs range from 4 hours (Enterprise) to 24 hours (Starter).</p>
            <h3 class="text-sm font-bold text-white mt-6 mb-2">2. Source Code Transfer</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">Full legal source code copyrights and intellectual property rights are officially transferred to the client upon full payment of all contracted invoices.</p>
          `
        };
      default:
        return {
          title: 'Legal Document',
          icon: <FileText className="text-brand-primary" size={24} />,
          lastUpdated: 'May 24, 2026',
          text: '<p class="text-slate-400 leading-relaxed">Please select a valid legal policy document link in the sitemap footer.</p>'
        };
    }
  };

  const content = getPolicyContent(policyId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title={content.title} 
        description={`Read Nextora Studio's official legal policy document: ${content.title}.`} 
      />

      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 py-12">
        <div className="glass-card p-8 sm:p-12 rounded-xl border border-brand-slateAccent">
          
          <div className="flex items-center space-x-3 border-b border-brand-slateAccent/40 pb-5 mb-8">
            <div className="w-10 h-10 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
              {content.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display leading-tight">{content.title}</h1>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Last Updated: {content.lastUpdated}</p>
            </div>
          </div>

          <div 
            className="prose prose-invert text-xs sm:text-sm text-slate-400 space-y-4 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: content.text }}
          />

        </div>
      </section>

    </motion.div>
  );
}
