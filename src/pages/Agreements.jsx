import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassBadge from '../components/ui/GlassBadge';

const SECTIONS = [
  {
    title: '1. Service Scope & Project Definition',
    content: `Nextora Studio provides custom software development, web application engineering, mobile app development (React Native), UI/UX design, cloud POS system configuration, and ERP/CRM layout services. All deliverables are defined exclusively within the approved Statement of Work (SOW) or project proposal. Any feature, module, or integration not explicitly listed in the signed SOW falls outside the scope of this agreement and requires a separate change order.`,
  },
  {
    title: '2. Project Timeline & Milestones',
    content: `Project timelines are estimates based on the assumption of timely client cooperation. Milestone deadlines begin from the date of signed agreement and receipt of the initial deposit. Delays in client deliverables — including but not limited to branding assets, API credentials, content copy, database access, and feedback approvals — will result in proportional deadline extensions. Nextora Studio is not liable for launch delays caused by client-side bottlenecks.`,
  },
  {
    title: '3. Payment Terms & Schedule',
    content: `Payment schedules are structured as follows: 30% non-refundable deposit upon signing, 30% at the midpoint milestone, 30% upon final delivery, and 10% upon project sign-off. All invoices are net-15. Late payments incur a 2% monthly compounding fee. Projects paused for more than 30 days due to non-payment will be invoiced for all completed work to date, and the remaining balance converts to a fixed billable amount.`,
  },
  {
    title: '4. Late Payment Consequences',
    content: `If any invoice remains unpaid for more than 30 days past its due date, Nextora Studio reserves the right to suspend all ongoing work, revoke access to staging environments and development servers, and disable client portal access. Work will resume only after the outstanding balance plus any accrued late fees is received in full. Accounts unpaid for more than 60 days may be referred to a third-party collections agency, and the client will be responsible for all associated recovery costs.`,
  },
  {
    title: '5. Intellectual Property Ownership',
    content: `Full intellectual property rights, including all source code, design files, database schemas, API configurations, and custom assets created specifically for the client project, transfer to the client upon receipt of final payment. Until full payment is received, all work product remains the exclusive property of Nextora Studio. Pre-existing libraries, frameworks, third-party packages, and internal tooling used during development remain the property of their respective owners and are licensed to the client for project use only.`,
  },
  {
    title: '6. Third-Party Licenses & Dependencies',
    content: `Projects may incorporate third-party libraries, npm packages, SDKs, cloud services, and open-source frameworks. Each dependency carries its own license agreement, which the client accepts upon project delivery. Nextora Studio is not responsible for license compliance, fee changes, or discontinuation of third-party services. The client assumes all responsibility for maintaining license compliance for any software delivered under open-source or commercial third-party licenses.`,
  },
  {
    title: '7. Confidentiality & Non-Disclosure',
    content: `Both parties agree to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, technical architectures, API keys, database credentials, client lists, and unpublished project details shared during the engagement. This obligation survives the termination of this agreement for a period of 36 months. Neither party shall disclose confidential information to any third party without prior written consent, except as required by law.`,
  },
  {
    title: '8. Revisions & Change Management',
    content: `The standard project scope includes up to two (2) rounds of revisions per milestone. Additional revision rounds are billed at $85/hour for standard work and $120/hour for specialized integrations. A revision is defined as a modification to approved deliverables — not a new feature or scope expansion. All revision requests must be submitted in writing through the client portal or email. Verbal revision requests are not binding until confirmed in writing.`,
  },
  {
    title: '9. Scope Creep & Change Orders',
    content: `Any request that expands the original project scope — including new features, additional pages, third-party integrations, or design overhauls beyond the approved SOW — constitutes scope creep and triggers a formal Change Order process. Change Orders include a detailed scope description, revised timeline estimate, and cost breakdown. No out-of-scope work begins until the Change Order is signed by both parties and the associated deposit is received.`,
  },
  {
    title: '10. Warranty & Defect Resolution',
    content: `Nextora Studio provides a 60-day post-launch warranty covering defects in workmanship, broken functionality, and layout rendering issues that existed at the time of final delivery. The warranty does not cover issues arising from client-side modifications, third-party service changes, browser updates, hosting environment changes, or user-caused data corruption. Warranty claims must be submitted in writing within the 60-day window.`,
  },
  {
    title: '11. Limitation of Liability',
    content: `Nextora Studio's total aggregate liability under this agreement shall not exceed the total contract value paid by the client. In no event shall Nextora Studio be liable for indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill. This limitation applies regardless of the legal theory — whether in contract, tort, negligence, or strict liability.`,
  },
  {
    title: '12. Indemnification',
    content: `The client agrees to indemnify, defend, and hold harmless Nextora Studio, its directors, employees, contractors, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney fees) arising out of or related to the client's use of delivered products, violation of third-party rights, breach of this agreement, or any negligent or willful misconduct by the client.`,
  },
  {
    title: '13. Termination & Cancellation',
    content: `Either party may terminate this agreement with 14 days written notice if the other party materially breaches any provision and fails to cure such breach within the notice period. Upon termination by the client without cause, all completed work up to the termination date becomes billable, and the initial deposit remains non-refundable. Upon termination by Nextora Studio for cause, the client forfeits all payments made and remains liable for any outstanding balances.`,
  },
  {
    title: '14. Post-Termination Obligations',
    content: `Upon termination or expiration of this agreement, Nextora Studio will provide all completed source code, design assets, and project documentation within 10 business days of final payment receipt. The client must remove all Nextora Studio credentials and access tokens from delivered systems. Any outstanding invoices become immediately due and payable in full. Confidentiality obligations survive termination as outlined in Section 7.`,
  },
  {
    title: '15. Hosting & Infrastructure',
    content: `Unless explicitly included in the project scope, hosting infrastructure, domain registration, SSL certificates, CDN services, and cloud server costs are the client's responsibility. Nextora Studio may recommend hosting providers but assumes no liability for hosting performance, uptime, security breaches, or data loss on third-party infrastructure. Clients are responsible for maintaining their own backups and disaster recovery plans.`,
  },
  {
    title: '16. Maintenance & Support',
    content: `Post-launch maintenance and support services are available under separate Service Level Agreements (SLAs). Standard support covers bug fixes, security patches, and minor content updates. Emergency support (critical system failures) is available 24/7 for Enterprise SLA holders. Support requests must be submitted through the client portal. Response times vary by SLA tier: Enterprise (4 hours), Professional (8 hours), Starter (24 hours).`,
  },
  {
    title: '17. Content & Material Responsibility',
    content: `The client is solely responsible for all content provided for the project, including text, images, videos, logos, trademarks, and copyrighted materials. The client warrants that all provided content does not infringe upon any third-party intellectual property rights. Nextora Studio is not liable for any legal claims arising from client-supplied content. The client shall obtain all necessary permissions and licenses for any third-party content used in the project.`,
  },
  {
    title: '18. Portfolio & Marketing Rights',
    content: `Unless explicitly declined in writing at the time of signing, Nextora Studio reserves the right to display the completed project in its portfolio, case studies, marketing materials, website, and social media channels. Project details shared in the portfolio will be limited to publicly available information and high-level technical achievements. The client may request NDA-bound portfolio restrictions as a project addendum.`,
  },
  {
    title: '19. Non-Solicitation',
    content: `During the term of this agreement and for 12 months following its termination, the client agrees not to directly or indirectly solicit, recruit, or hire any Nextora Studio employee, contractor, or consultant who was involved in the client's project. Violation of this provision entitles Nextora Studio to liquidated damages equal to 50% of the annualized compensation of the solicited individual, in addition to any other available legal remedies.`,
  },
  {
    title: '20. Force Majeure',
    content: `Neither party shall be liable for delays or failures in performance resulting from causes beyond its reasonable control, including but not limited to natural disasters, pandemics, war, terrorism, government actions, power outages, internet infrastructure failures, cyberattacks, or acts of God. The affected party must provide prompt written notice and make commercially reasonable efforts to mitigate the impact and resume performance as soon as practicable.`,
  },
  {
    title: '21. Dispute Resolution',
    content: `Any dispute, controversy, or claim arising out of or relating to this agreement shall first be addressed through good-faith negotiation between the parties for a period of 30 days. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration under the rules of the American Arbitration Association (AAA). The arbitration shall take place in a mutually agreed-upon jurisdiction, and the decision of the arbitrator shall be final and binding.`,
  },
  {
    title: '22. Governing Law & Jurisdiction',
    content: `This agreement shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles. The parties consent to the exclusive jurisdiction of state and federal courts located in Wilmington, Delaware for any proceedings not subject to arbitration under Section 21.`,
  },
  {
    title: '23. Data Protection & Privacy',
    content: `Both parties agree to comply with all applicable data protection regulations, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and any other relevant data protection laws. If the project involves processing personal data of EU residents, a separate Data Processing Agreement (DPA) shall be executed. Nextora Studio implements industry-standard encryption, access controls, and security practices to protect all data.`,
  },
  {
    title: '24. Severability & Waiver',
    content: `If any provision of this agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The failure of either party to enforce any provision of this agreement shall not be construed as a waiver of that provision or the right to enforce it at a later time. Any waiver must be in writing and signed by the waiving party.`,
  },
  {
    title: '25. Entire Agreement & Amendments',
    content: `This agreement, together with any signed SOWs, Change Orders, and referenced addendums, constitutes the entire agreement between the parties and supersedes all prior oral or written agreements, representations, and understandings. This agreement may only be modified by a written instrument signed by authorized representatives of both parties. No unilateral amendments or addendums shall be binding.`,
  },
];

export default function Agreements() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative text-left animate-fade-in"
    >
      <SEO
        title="Service Agreements & Project Terms"
        description="Official service agreements, terms, and conditions governing all projects and engagements with Nextora Studio."
        keywords={[
          'service agreements',
          'project terms',
          'client contracts',
          'software consulting agreement',
          'nextora terms'
        ]}
      />

      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 py-12">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors mb-8 uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <GlassCard className="p-8 sm:p-12 border-slate-200 dark:border-white/5" hoverEffect="none">
          {/* Header */}
          <div className="flex items-center space-x-4 border-b border-slate-200/50 dark:border-white/5 pb-5 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
              <FileText className="text-brand-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                Service Agreements & Terms
              </h1>
              <p className="text-[10px] text-slate-550 dark:text-slate-500 mt-1.5 uppercase font-bold tracking-wider">
                Effective Date: June 2026 &middot; 25 Sections
              </p>
            </div>
          </div>

          {/* Intro */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-sans">
            This Service Agreement ("Agreement") is entered into between Nextora Studio ("Provider", "we", "us") and the client ("Client", "you") engaging our services. By signing a project proposal, submitting a deposit, or accessing the client portal, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions set forth herein.
          </p>

          {/* Sections */}
          <div className="space-y-4">
            {SECTIONS.map((section, i) => (
              <details
                key={i}
                className="group border border-slate-200/50 dark:border-white/5 rounded-xl overflow-hidden glass-card transition-all duration-300"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors list-none font-display">
                  <span>{section.title}</span>
                  <span className="text-slate-500 group-open:rotate-180 transition-transform duration-350">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans border-t border-slate-100 dark:border-white/5 pt-3 mt-1">
                  {section.content}
                </div>
              </details>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-slate-200/50 dark:border-white/5">
            <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed font-semibold">
              By engaging Nextora Studio's services, signing a project proposal, or accessing the client portal, you confirm that you are authorized to bind the entity you represent to this Agreement. If you do not agree to any provision herein, do not proceed with the engagement.
            </p>
          </div>
        </GlassCard>
      </section>
    </motion.div>
  );
}
