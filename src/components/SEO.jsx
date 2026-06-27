import { useEffect } from 'react';

const SITE_NAME = 'Nextora Studio';
const SITE_URL  = 'https://nextorastudio.tech';
const OG_IMAGE  = `${SITE_URL}/og-image.svg`;

export default function SEO({ title, description, schema }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Where Ideas Take Shape`;
  const metaDesc  = description || `${SITE_NAME} builds premium websites, mobile apps, POS systems, and CRM/ERP solutions that help businesses grow.`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Nextora',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://github.com/nextorastudio',
      'https://linkedin.com/company/nextorastudio',
      'https://x.com/nextorastudio',
    ],
    description: 'Where Ideas Take Shape. A premium digital software agency specializing in Web Dev, App Dev, POS, CRM, ERP, and UI/UX.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Global Remote',
      addressCountry: 'US',
    },
  };

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────
    document.title = fullTitle;

    // Helper: upsert a <meta> tag
    const upsertMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrKey, attrVal] = attr.split('=');
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.content = value;
    };

    // ── Standard meta ──────────────────────────────────────────────────
    upsertMeta('meta[name="description"]',   'name=description',   metaDesc);
    upsertMeta('meta[name="robots"]',        'name=robots',        'index, follow');

    // ── Open Graph ─────────────────────────────────────────────────────
    upsertMeta('meta[property="og:title"]',       'property=og:title',       fullTitle);
    upsertMeta('meta[property="og:description"]', 'property=og:description', metaDesc);
    upsertMeta('meta[property="og:type"]',        'property=og:type',        'website');
    upsertMeta('meta[property="og:url"]',         'property=og:url',         SITE_URL);
    upsertMeta('meta[property="og:image"]',       'property=og:image',       OG_IMAGE);
    upsertMeta('meta[property="og:image:width"]', 'property=og:image:width', '1200');
    upsertMeta('meta[property="og:image:height"]','property=og:image:height','630');
    upsertMeta('meta[property="og:site_name"]',   'property=og:site_name',   SITE_NAME);

    // ── Twitter Card ───────────────────────────────────────────────────
    upsertMeta('meta[name="twitter:card"]',        'name=twitter:card',        'summary_large_image');
    upsertMeta('meta[name="twitter:site"]',        'name=twitter:site',        '@nextorastudio');
    upsertMeta('meta[name="twitter:title"]',       'name=twitter:title',       fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name=twitter:description', metaDesc);
    upsertMeta('meta[name="twitter:image"]',       'name=twitter:image',       OG_IMAGE);

    // ── JSON-LD Schema ─────────────────────────────────────────────────
    let schemaScript = document.getElementById('seo-schema-script');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id   = 'seo-schema-script';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema || defaultSchema);
  }, [fullTitle, metaDesc, schema]);

  return null;
}
