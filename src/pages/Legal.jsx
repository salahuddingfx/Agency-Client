import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const POLICIES = {
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: <Shield className="text-brand-primary" size={24} />,
    lastUpdated: 'June 27, 2026',
    sections: [
      { title: '1. Introduction & Scope', content: 'Nextora Studio ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our client portal, or engage our services. This policy applies to all users, clients, and visitors regardless of location.' },
      { title: '2. Information We Collect', content: 'We collect information you voluntarily provide: full name, business email, phone number, company name, project descriptions, budget parameters, branding assets, API credentials, and database configurations. We also automatically collect IP address, browser type, device information, pages visited, time spent, referral source, and cookie identifiers.' },
      { title: '3. How We Use Your Information', content: 'We use collected data to: draft technical project scopes, execute development sprints, communicate milestones, provide client portal access, process invoices, send project updates, respond to support tickets, improve our services, and comply with legal obligations. We never sell your personal information to third parties.' },
      { title: '4. Legal Basis for Processing', content: 'We process your data based on: contractual necessity (delivering agreed services), legitimate interest (improving our platform, preventing fraud), consent (marketing communications), and legal compliance (tax records, regulatory requirements). You may withdraw consent at any time without affecting the lawfulness of prior processing.' },
      { title: '5. Data Sharing & Third Parties', content: 'We may share data with: cloud hosting providers (AWS, Vercel, Cloudflare), payment processors (Stripe), analytics services (Google Analytics), communication tools (email, Slack), and legal advisors when required. All third-party processors are contractually bound to protect your data to standards equivalent to our own.' },
      { title: '6. International Data Transfers', content: 'Your data may be processed in countries outside your jurisdiction. We ensure adequate protection through Standard Contractual Clauses (SCCs), data processing agreements, and compliance with GDPR Chapter V requirements. By using our services, you consent to such transfers subject to appropriate safeguards.' },
      { title: '7. Data Retention', content: 'We retain personal data for the duration of our business relationship plus 36 months. Project files, source code, and documentation are retained for 24 months after project completion. Financial records are kept for 7 years as required by tax law. Anonymized analytics data may be retained indefinitely.' },
      { title: '8. Data Security Measures', content: 'We implement AES-256 encryption at rest, TLS 1.3 encryption in transit, multi-factor authentication for all accounts, role-based access controls, regular security audits, automated vulnerability scanning, and SOC 2 compliant infrastructure. Our incident response plan ensures breach notification within 72 hours.' },
      { title: '9. Your Rights (GDPR)', content: 'If you are in the EU, you have the right to: access your personal data, rectify inaccurate data, erase your data ("right to be forgotten"), restrict processing, data portability, object to processing, and not be subject to automated decision-making. Submit requests to nextorastudio@gmail.com.' },
      { title: '10. Your Rights (CCPA)', content: 'If you are a California resident, you have the right to: know what personal information is collected, know if your data is sold, delete your personal information, opt-out of the sale of personal information, and not be discriminated against for exercising your rights. We do not sell personal information.' },
      { title: '11. Cookies & Tracking', content: 'We use essential cookies for session management and security, analytics cookies (Google Analytics) to understand usage patterns, and preference cookies to remember your settings. We do not use advertising or cross-site tracking cookies. You can manage cookie preferences through your browser settings.' },
      { title: '12. Client Portal Security', content: 'The client portal uses encrypted sessions, automatic timeout after 30 minutes of inactivity, IP-based access logging, and role-based permissions. Credentials are hashed with bcrypt. Portal access can be revoked at any time by contacting support.' },
      { title: '13. Children\'s Privacy', content: 'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly.' },
      { title: '14. Email Communications', content: 'Project-related emails (milestone updates, invoice notifications, support responses) are transactional and not optional. Marketing emails require explicit opt-in consent and include an unsubscribe link. We use email open/click tracking to improve communication relevance.' },
      { title: '15. Third-Party Links', content: 'Our website may contain links to third-party sites. We are not responsible for the privacy practices of external sites. We encourage you to review the privacy policy of every site you visit. Links to third-party services within delivered projects are governed by those services\' own policies.' },
      { title: '16. Data Breach Notification', content: 'In the event of a data breach affecting your personal information, we will notify you within 72 hours via email and provide: description of the breach, types of data affected, remediation steps taken, and recommendations for your protection. We will also notify relevant supervisory authorities as required by law.' },
      { title: '17. Automated Decision Making', content: 'We do not use automated decision-making or profiling that produces legal or similarly significant effects. Analytics tools help us understand aggregate usage patterns but do not make decisions about individual users.' },
      { title: '18. Do Not Track Signals', content: 'Some browsers transmit "Do Not Track" (DNT) signals. We honor DNT signals by disabling non-essential tracking. Essential cookies required for site functionality remain active regardless of DNT settings.' },
      { title: '19. Policy Updates', content: 'We may update this Privacy Policy periodically. Material changes will be communicated via email to active clients and a prominent notice on our website at least 30 days before taking effect. The "Last Updated" date at the top reflects the most recent revision.' },
      { title: '20. Contact Information', content: 'For privacy-related inquiries, data requests, or complaints, contact our Data Protection Officer at nextorastudio@gmail.com or write to: Nextora Studio, Privacy Department, Global Remote Operations. We aim to respond to all requests within 30 days.' },
    ],
  },

  'terms-and-conditions': {
    title: 'Terms & Conditions',
    icon: <FileText className="text-brand-primary" size={24} />,
    lastUpdated: 'June 27, 2026',
    sections: [
      { title: '1. Acceptance of Terms', content: 'By accessing our website, using our client portal, or engaging our services, you agree to be bound by these Terms & Conditions. If you do not agree, do not use our services. These terms apply to all visitors, clients, and users of Nextora Studio.' },
      { title: '2. Services Description', content: 'Nextora Studio provides custom software development, web application engineering, React Native mobile app development, UI/UX design, cloud POS system configuration, and ERP/CRM layout services. Service details are defined in individual project proposals and Statements of Work (SOW).' },
      { title: '3. Eligibility', content: 'Our services are available to individuals who are at least 18 years old and capable of forming a binding contract. By engaging our services, you represent and warrant that you meet these eligibility requirements and have the legal authority to bind the entity you represent.' },
      { title: '4. Account Registration', content: 'Access to the client portal requires accurate and complete registration information. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account. Notify us immediately of any unauthorized access.' },
      { title: '5. Project Proposals & SOWs', content: 'Project proposals and Statements of Work (SOWs) define the specific scope, deliverables, timeline, and pricing for each engagement. These documents become binding upon signing by authorized representatives of both parties. Proposals are valid for 30 days from the date of issue.' },
      { title: '6. Payment Terms', content: 'Standard payment schedule: 30% deposit upon signing, 30% at midpoint milestone, 30% upon final delivery, 10% upon sign-off. All invoices are net-15. Late payments incur 2% monthly compounding interest. We accept bank transfers, credit cards, and cryptocurrency payments.' },
      { title: '7. Late Payment Penalties', content: 'Unpaid invoices beyond 15 days result in work suspension. Beyond 30 days, staging environment access is revoked. Beyond 60 days, accounts are referred to collections. The client is responsible for all recovery costs, legal fees, and accrued interest.' },
      { title: '8. Intellectual Property', content: 'All custom work product (source code, designs, databases, configurations) transfers to the client upon full payment. Pre-existing libraries, frameworks, open-source packages, and internal tooling remain property of their respective owners and are licensed for project use.' },
      { title: '9. Client Responsibilities', content: 'Clients must provide: timely feedback (within 5 business days of review requests), complete branding assets, accurate content copy, valid API credentials, database access, and hosting configurations. Delays in client deliverables result in proportional timeline extensions.' },
      { title: '10. Revisions Policy', content: 'Standard scope includes two (2) revision rounds per milestone. Additional revisions are billed at $85/hour (standard) or $120/hour (specialized). A revision is a modification to approved work — not a new feature. All revision requests must be submitted in writing.' },
      { title: '11. Scope Changes', content: 'Features or work outside the approved SOW constitute scope changes. A formal Change Order with updated scope, timeline, and cost must be signed by both parties before out-of-scope work begins. No verbal change requests are binding.' },
      { title: '12. Project Timelines', content: 'Timeline estimates assume continuous client cooperation. Milestone deadlines begin from signed agreement and deposit receipt. Force majeure events, client delays, and scope changes extend deadlines proportionally. We provide weekly progress updates via the client portal.' },
      { title: '13. Quality Assurance', content: 'All deliverables undergo internal QA testing before client review. Clients receive a minimum 5-business-day review period for each milestone. Issues reported during the review period are addressed at no additional cost. Post-review changes are billed as revisions.' },
      { title: '14. Warranty Period', content: 'A 60-day post-launch warranty covers defects in workmanship and broken functionality that existed at delivery. The warranty excludes: client modifications, third-party service changes, browser updates, hosting environment changes, and user-caused data corruption.' },
      { title: '15. Limitation of Liability', content: 'Total aggregate liability shall not exceed the total contract value. We are not liable for indirect, incidental, special, consequential, or punitive damages including loss of profits, data, business opportunities, or goodwill, regardless of the legal theory.' },
      { title: '16. Indemnification', content: 'Clients indemnify Nextora Studio against claims arising from: misuse of delivered products, violation of third-party rights, breach of this agreement, negligent or willful misconduct, and client-supplied content that infringes intellectual property rights.' },
      { title: '17. Termination', content: 'Either party may terminate with 14 days written notice for material breach. Client-initiated termination without cause: all completed work becomes billable, deposit non-refundable. Nextora-initiated termination for cause: client forfeits all payments made.' },
      { title: '18. Confidentiality', content: 'Both parties maintain strict confidentiality of proprietary information shared during the engagement. This includes trade secrets, business strategies, technical architectures, API keys, and unpublished project details. Obligations survive termination for 36 months.' },
      { title: '19. Non-Solicitation', content: 'For 12 months after termination, the client agrees not to solicit, recruit, or hire any Nextora Studio employee or contractor involved in the client\'s project. Violation entitles us to liquidated damages equal to 50% of the individual\'s annualized compensation.' },
      { title: '20. Dispute Resolution', content: 'Disputes first undergo 30 days of good-faith negotiation. Unresolved disputes proceed to binding arbitration under AAA rules in a mutually agreed jurisdiction. Arbitration decisions are final and binding. Each party bears its own legal costs unless the arbitrator rules otherwise.' },
      { title: '21. Governing Law', content: 'This agreement is governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Exclusive jurisdiction for non-arbitration proceedings lies with state and federal courts in Wilmington, Delaware.' },
      { title: '22. Force Majeure', content: 'Neither party is liable for delays caused by events beyond reasonable control: natural disasters, pandemics, war, government actions, power outages, internet failures, or cyberattacks. The affected party must provide prompt notice and make reasonable efforts to resume performance.' },
      { title: '23. Severability', content: 'If any provision is found invalid or unenforceable, the remaining provisions continue in full force. Failure to enforce any provision does not constitute a waiver of that provision or the right to enforce it later.' },
      { title: '24. Entire Agreement', content: 'These Terms, together with signed SOWs, Change Orders, and referenced addendums, constitute the entire agreement and supersede all prior oral or written understandings. Modifications require a written instrument signed by both parties.' },
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy',
    icon: <CheckCircle className="text-brand-primary" size={24} />,
    lastUpdated: 'June 27, 2026',
    sections: [
      { title: '1. What Are Cookies', content: 'Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience. Cookies can be "session" (deleted when you close your browser) or "persistent" (remain until they expire).' },
      { title: '2. How We Use Cookies', content: 'Nextora Studio uses cookies to: maintain your session on the client portal, remember your theme preference (light/dark mode), analyze website traffic and usage patterns, detect and prevent security threats, and improve site performance and user experience.' },
      { title: '3. Essential Cookies', content: 'These cookies are required for basic site functionality. They include: session cookies for client portal authentication, CSRF tokens for form security, load balancer affinity cookies, and cookie consent preference storage. Disabling these cookies will break core functionality.' },
      { title: '4. Analytics Cookies', content: 'We use Google Analytics to understand how visitors interact with our website. Analytics cookies collect anonymous information: pages visited, time on page, bounce rate, traffic source, and device type. This data helps us improve our content and user experience.' },
      { title: '5. Preference Cookies', content: 'Preference cookies remember your choices to provide a more personalized experience. Examples include: your selected theme (light or dark mode), language preference, and whether you have dismissed any notification banners. These cookies improve usability but are not strictly necessary.' },
      { title: '6. Third-Party Cookies', content: 'Some cookies are placed by third-party services integrated into our site: Google Analytics (analytics), Vercel (hosting analytics), and Stripe (payment processing). These third parties have their own cookie policies and privacy practices.' },
      { title: '7. Advertising Cookies', content: 'Nextora Studio does NOT use advertising or remarketing cookies. We do not track your browsing behavior across websites or serve targeted advertisements. We do not participate in any advertising networks or data broker programs.' },
      { title: '8. Social Media Cookies', content: 'Social media cookies are placed when you use social sharing buttons or embedded social content. While we provide links to our social media profiles, we do not embed social widgets that set cookies on our main website pages.' },
      { title: '9. Managing Cookies via Browser', content: 'You can control cookies through your browser settings: Chrome (Settings > Privacy > Cookies), Firefox (Options > Privacy), Safari (Preferences > Privacy), Edge (Settings > Cookies). Each browser has different cookie management interfaces.' },
      { title: '10. Blocking Cookies', content: 'Blocking all cookies will prevent: client portal login, theme preference saving, and some analytics. The website will still function for browsing, but personalized features will be unavailable. We recommend allowing essential cookies at minimum.' },
      { title: '11. Clearing Cookies', content: 'To clear cookies: open your browser settings, navigate to privacy/security, select "Clear browsing data" or "Cookies and site data", choose the time range, and confirm. This will log you out of the client portal and reset preferences.' },
      { title: '12. Cookie Consent', content: 'When you first visit our site, a cookie consent banner allows you to accept or decline non-essential cookies. Your choice is stored in a preference cookie so the banner does not reappear. You can change your preferences at any time by clearing the preference cookie.' },
      { title: '13. Local Storage', content: 'In addition to cookies, we may use browser local storage to: cache API responses for faster page loads, store temporary form data to prevent loss, and maintain UI state preferences. Local storage is stored locally on your device and is not sent to our servers.' },
      { title: '14. Session Storage', content: 'Session storage is used for: maintaining form state during multi-step processes, storing temporary filter/sort preferences, and keeping track of modal/dialog states. Session storage is automatically cleared when you close the browser tab.' },
      { title: '15. Cookie Duration', content: 'Session cookies: expire when you close your browser. Persistent cookies: expire after 12 months (theme preference) or 30 days (analytics). The cookie consent preference is stored for 12 months. You can manually clear any cookie at any time.' },
      { title: '16. Children & Cookies', content: 'We do not knowingly place cookies on devices belonging to children under 13. If we discover that a child\'s device has cookies from our site, we will delete them promptly. We comply with COPPA requirements regarding children\'s online privacy.' },
      { title: '17. Cookie Security', content: 'All cookies are transmitted over HTTPS (encrypted connections). Essential session cookies use the Secure flag (HTTPS only) and HttpOnly flag (not accessible via JavaScript). We implement SameSite cookie attributes to prevent cross-site request forgery.' },
      { title: '18. International Cookie Regulations', content: 'Our cookie practices comply with: EU ePrivacy Directive, GDPR requirements, California Consumer Privacy Act (CCPA), and other applicable data protection regulations. We maintain records of consent for audit purposes.' },
      { title: '19. Changes to This Policy', content: 'We may update this Cookie Policy to reflect changes in our practices or legal requirements. Material changes will be communicated through the cookie consent banner and a notice on our website. The "Last Updated" date indicates the most recent revision.' },
      { title: '20. Contact Us', content: 'For questions about our cookie practices, contact nextorastudio@gmail.com or visit our Privacy Policy page for general data protection inquiries. We respond to all cookie-related requests within 10 business days.' },
    ],
  },

  'refund-policy': {
    title: 'Refund Policy',
    icon: <Shield className="text-brand-primary" size={24} />,
    lastUpdated: 'June 27, 2026',
    sections: [
      { title: '1. Refund Eligibility Overview', content: 'Nextora Studio offers refunds under specific circumstances outlined in this policy. Refund eligibility depends on the project stage, milestone status, and the nature of the request. All refund requests must be submitted in writing to nextorastudio@gmail.com.' },
      { title: '2. Initial Deposit (30%)', content: 'The initial project deposit (30% of total contract value) is non-refundable once engineering sprints have commenced. The deposit covers: initial discovery and research, project planning and architecture, environment setup, and team resource allocation. Pre-commencement deposits are fully refundable within 7 days of payment.' },
      { title: '3. Completed Milestones', content: 'Milestones that have been delivered, reviewed, and approved by the client are considered finalized. Approved milestone payments are non-refundable. The client has a 5-business-day review period per milestone to request changes before approval.' },
      { title: '4. In-Progress Milestones', content: 'For milestones currently in development, a partial refund may be issued for the unused portion of work not yet commenced. The refund amount is calculated based on documented engineering hours completed versus total estimated hours for that milestone.' },
      { title: '5. Cancellation Before Work Begins', content: 'If the client cancels the project before any engineering work has commenced, a full refund of all payments made (excluding the initial deposit) will be issued within 10 business days. The initial deposit remains non-refundable per Section 2.' },
      { title: '6. Cancellation During Development', content: 'If the client cancels during active development, the client is billed for: all completed work to date, any third-party licenses purchased, and committed infrastructure costs. Refunds are issued only for prepaid amounts exceeding the above charges.' },
      { title: '7. Client-Initiated Delays', content: 'If a project is paused or delayed for more than 60 days due to client inaction (missing assets, unresponsive feedback), the deposit and completed milestone payments are non-refundable. Reactivation requires a new deposit of 15% of the remaining project balance.' },
      { title: '8. Scope Change Refunds', content: 'If scope changes result in a reduction of originally contracted work, the difference may be credited as a partial refund or applied to future services. Credits are valid for 12 months from the date of issuance.' },
      { title: '9. Quality Disputes', content: 'If the client disputes deliverable quality, both parties agree to a good-faith review period of 15 business days. If the quality issue is verified, Nextora Studio will remedy the deficiency at no additional cost. If no deficiency is found, the original payment stands.' },
      { title: '10. Warranty Period Refunds', content: 'During the 60-day post-launch warranty period, defects in workmanship will be corrected at no charge. If a defect cannot be remedied after 3 correction attempts, the client may request a partial refund of up to 10% of the affected milestone value.' },
      { title: '11. Subscription & Retainer Refunds', content: 'Monthly retainer and subscription services may be cancelled with 30 days written notice. Unused prepaid days within the current billing cycle are refunded on a pro-rata basis. Future billing cycles are stopped upon cancellation confirmation.' },
      { title: '12. Hosting & Infrastructure Costs', content: 'Third-party hosting fees, domain registrations, SSL certificates, and cloud infrastructure costs are non-refundable. These costs are passed through at actual cost and are payable regardless of project status.' },
      { title: '13. Refund Processing', content: 'Approved refunds are processed within 10 business days via the original payment method. Bank transfer refunds may take an additional 5 business days to appear. International wire transfers may incur additional processing fees.' },
      { title: '14. Chargeback Prevention', content: 'Before initiating a chargeback with your bank or credit card company, please contact us directly at nextorastudio@gmail.com. We are committed to resolving billing disputes promptly. Unauthorized chargebacks may result in service suspension and additional fees.' },
      { title: '15. Dispute Resolution', content: 'Refund disputes that cannot be resolved through direct communication will be submitted to binding arbitration under AAA rules. The arbitration decision is final and binding. Each party bears its own legal costs unless the arbitrator rules otherwise.' },
      { title: '16. Force Majeure Refunds', content: 'If project cancellation is caused by force majeure events (natural disasters, pandemics, government actions), both parties negotiate a fair allocation of costs for work completed. Prepaid amounts for uncommenced work are refunded.' },
      { title: '17. Termination by Nextora', content: 'If Nextora Studio terminates the agreement for cause (client breach, non-payment), no refunds are issued for payments made. The client remains liable for any outstanding balances. Termination for convenience by Nextora entitles the client to a pro-rata refund.' },
      { title: '18. Promotional & Discounted Services', content: 'Services purchased under promotional pricing, bundle discounts, or special offers may have modified refund terms as specified at the time of purchase. Promotional refunds are limited to the actual amount paid, not the original listed price.' },
      { title: '19. Currency & Exchange', content: 'Refunds are issued in the same currency as the original payment. Currency exchange rate fluctuations between the payment date and refund date are not covered by Nextora Studio. Any bank fees associated with currency conversion are the client\'s responsibility.' },
      { title: '20. Policy Modifications', content: 'This Refund Policy may be updated periodically. The version in effect at the time of the original purchase agreement governs refund eligibility. Material changes will be communicated to active clients via email at least 15 days before taking effect.' },
    ],
  },

  'service-agreement': {
    title: 'Service Agreement',
    icon: <FileText className="text-brand-primary" size={24} />,
    lastUpdated: 'June 27, 2026',
    sections: [
      { title: '1. Agreement Overview', content: 'This Service Agreement establishes the terms under which Nextora Studio provides professional development, design, and consulting services. It applies to all engagements unless superseded by a custom Statement of Work (SOW) signed by both parties.' },
      { title: '2. Service Tiers', content: 'We offer three service tiers: Starter (up to $15K, basic web/app development), Professional ($15K–$75K, custom integrations, advanced UI/UX), and Enterprise ($75K+, dedicated team, SLA guarantees, priority support). Tier-specific benefits are detailed in our Pricing page.' },
      { title: '3. Project Onboarding', content: 'Upon signing, clients receive: a dedicated project manager, access to the client portal, onboarding documentation, initial discovery call, and a project timeline. Onboarding is completed within 5 business days of deposit receipt. Late onboarding due to client delays extends the project timeline.' },
      { title: '4. Development Methodology', content: 'We follow Agile/Scrum methodology with 2-week sprints. Each sprint includes: sprint planning, daily standups (optional client participation), sprint review with demo, and retrospective. Clients receive sprint reports and access to staging environments for continuous review.' },
      { title: '5. Communication Channels', content: 'Primary communication: client portal task board and messaging. Secondary: email for formal approvals and documentation. Optional: Slack/Teams channel for real-time collaboration (Professional and Enterprise tiers). Response times: 4 hours (Enterprise), 8 hours (Professional), 24 hours (Starter).' },
      { title: '6. Deliverables & Acceptance', content: 'Deliverables include: source code (Git repository), design files (Figma/Adobe XD), documentation, deployment configurations, and API documentation. Acceptance occurs via client portal sign-off within the review period. Silence after the review period constitutes acceptance.' },
      { title: '7. Maintenance SLAs', content: 'Post-launch maintenance tiers: Enterprise (4-hour response, 24/7 support, monthly security audits), Professional (8-hour response, business hours, quarterly updates), Starter (24-hour response, business hours, annual reviews). SLA details are in separate maintenance agreements.' },
      { title: '8. Source Code Management', content: 'All source code is maintained in private Git repositories. Clients receive read access during development and full ownership upon final payment. Code follows industry standards: linting, unit tests, CI/CD pipelines, and documented commit history.' },
      { title: '9. Testing & QA', content: 'Quality assurance includes: automated unit and integration testing, cross-browser compatibility testing, responsive design testing, performance optimization, accessibility audits (WCAG 2.1 AA), and security vulnerability scanning. Test reports are shared with clients.' },
      { title: '10. Deployment & Launch', content: 'Deployment is coordinated with the client and scheduled during low-traffic periods. Pre-launch checklist includes: environment verification, DNS configuration, SSL installation, backup procedures, and rollback plan. Post-launch monitoring for 48 hours is included.' },
      { title: '11. Hosting Recommendations', content: 'We recommend hosting providers based on project requirements but do not operate hosting infrastructure. Recommended providers: Vercel (frontend), AWS/GCP (backend), PlanetScale/Supabase (database). Hosting setup assistance is included in Professional and Enterprise tiers.' },
      { title: '12. Third-Party Integrations', content: 'Integration with third-party services (payment gateways, CRMs, analytics) is quoted separately. We handle API integration, webhook configuration, and data synchronization. Third-party service costs and subscription fees are the client\'s responsibility.' },
      { title: '13. Training & Handoff', content: 'Upon project completion, we provide: admin panel training session (1 hour), user documentation, technical architecture guide, and deployment runbook. Additional training sessions are available at $150/hour. Recorded training sessions are provided for future reference.' },
      { title: '14. Support Hours', content: 'Standard support: Monday–Friday, 9:00 AM–6:00 PM (client\'s local timezone). Enterprise SLA: 24/7 support with guaranteed response times. Emergency support (critical system failures) is available outside business hours for Enterprise clients only.' },
      { title: '15. Escalation Process', content: 'Support escalation: Level 1 (support team, 4–24 hours), Level 2 (technical lead, 2–8 hours), Level 3 (CTO/Founding team, 1–4 hours), Level 4 (emergency response, immediate). Each level has defined response and resolution targets.' },
      { title: '16. Intellectual Property Transfer', content: 'Upon full payment, all custom work product IP transfers to the client: source code, custom designs, database schemas, API configurations, and project documentation. Third-party libraries retain their original licenses. Pre-existing Nextora tooling remains our property.' },
      { title: '17. Non-Compete', content: 'During the engagement and for 6 months after completion, Nextora Studio will not develop a substantially similar product for a direct competitor of the client, provided the client identifies competitors in writing at project inception. This clause is limited to the specific project scope.' },
      { title: '18. Insurance & Liability', content: 'Nextora Studio maintains professional liability insurance (Errors & Omissions) covering our consulting and development services. Our total liability is capped at the total contract value. We are not liable for indirect, consequential, or punitive damages.' },
      { title: '19. Subcontracting', content: 'Nextora Studio may engage specialized subcontractors for specific technical tasks (e.g., 3D modeling, complex algorithms). All subcontractors are bound by the same confidentiality and quality standards. The client will be notified of any subcontractor involvement.' },
      { title: '20. Performance Metrics', content: 'We track and report: sprint velocity, bug density, code coverage, page load performance, accessibility scores, and uptime metrics (for hosted solutions). Performance reports are delivered monthly for Enterprise clients and at milestone completion for other tiers.' },
      { title: '21. Data Migration', content: 'Data migration from existing systems is quoted separately based on complexity. We support migrations from: legacy databases, CMS platforms, ERP systems, and custom applications. Data integrity validation is included as part of the migration process.' },
      { title: '22. Compliance & Standards', content: 'We develop with compliance in mind: GDPR, CCPA, HIPAA (healthcare projects), PCI DSS (payment processing), SOC 2 (enterprise applications). Compliance requirements must be specified at project inception as they significantly impact architecture and timeline.' },
      { title: '23. Documentation Standards', content: 'All projects include: README documentation, API documentation (OpenAPI/Swagger), architecture diagrams, deployment guides, and user manuals. Documentation is maintained in the project repository and delivered as part of the final handoff.' },
      { title: '24. Termination for Convenience', content: 'Either party may terminate without cause with 30 days written notice. Upon termination: all completed work is delivered, the client pays for completed milestones, unused prepaid amounts are refunded (minus deposit), and all credentials are transferred.' },
    ],
  },
};

const DEFAULT_POLICY = {
  title: 'Legal Document',
  icon: <FileText className="text-brand-primary" size={24} />,
  lastUpdated: 'June 27, 2026',
  sections: [
    { title: 'Notice', content: 'Please select a valid legal policy document from the footer links. If you believe this is an error, contact our legal team at nextorastudio@gmail.com.' },
  ],
};

export default function Legal() {
  const { policyId } = useParams();
  const policy = POLICIES[policyId] || DEFAULT_POLICY;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO
        title={`${policy.title} | Legal Policy`}
        description={`Read Nextora Studio's official ${policy.title} document. We maintain compliance and trust with clear terms.`}
        keywords={[
          policy.title.toLowerCase(),
          'nextora studio legal',
          'privacy guidelines',
          'service terms'
        ]}
      />

      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <div className="glass-card p-8 sm:p-12 rounded-xl border border-brand-slateAccent">
          <div className="flex items-center space-x-3 border-b border-brand-slateAccent/40 pb-5 mb-8">
            <div className="w-10 h-10 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
              {policy.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">{policy.title}</h1>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Last Updated: {policy.lastUpdated}</p>
            </div>
          </div>

          <div className="space-y-1">
            {policy.sections.map((section, i) => (
              <details
                key={i}
                className="group border border-brand-slateAccent/30 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-sm font-semibold text-slate-200 dark:text-slate-200 hover:bg-white/5 dark:hover:bg-white/5 transition-colors list-none">
                  <span>{section.title}</span>
                  <span className="text-slate-500 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {section.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
