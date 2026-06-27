import { useEffect } from 'react';

const SITE_NAME = 'Nextora Studio';
const SITE_URL  = 'https://nextorastudio.tech';
const OG_IMAGE  = `${SITE_URL}/og-image.png`;

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  image, 
  type, 
  author, 
  themeColor, 
  schema, 
  noindex = false 
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Where Ideas Take Shape`;
  const metaDesc  = description || `${SITE_NAME} builds premium custom websites, React Native mobile apps, cloud POS systems, and ERP / CRM software layouts globally.`;
  const canonicalUrl = canonical || window.location.origin + window.location.pathname;
  
  const defaultKeywords = [
    'Nextora Studio', 'Nextora', 'software development agency', 'web development',
    'mobile app development', 'POS systems', 'CRM software', 'ERP dashboards',
    'headless frontend', 'React Native apps', 'UI/UX design', 'custom software'
  ];

  const pageKeywords = Array.isArray(keywords)
    ? keywords
    : keywords
      ? keywords.split(',').map(k => k.trim())
      : [];
  const mergedKeywords = Array.from(new Set([...pageKeywords, ...defaultKeywords])).join(', ');

  let pageImage = image || OG_IMAGE;
  if (pageImage && !pageImage.startsWith('http')) {
    pageImage = pageImage.startsWith('/') ? `${SITE_URL}${pageImage}` : `${SITE_URL}/${pageImage}`;
  }

  const pageType = type || 'website';
  const pageAuthor = author || SITE_NAME;
  const pageThemeColor = themeColor || '#0f172a';

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

    // Helper: upsert a <link> tag
    const upsertLink = (rel, value) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', value);
    };

    // ── Standard meta ──────────────────────────────────────────────────
    upsertMeta('meta[name="description"]',   'name=description',   metaDesc);
    upsertMeta('meta[name="keywords"]',      'name=keywords',      mergedKeywords);
    upsertMeta('meta[name="robots"]',        'name=robots',        noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('meta[name="author"]',        'name=author',        pageAuthor);
    upsertMeta('meta[name="theme-color"]',   'name=theme-color',   pageThemeColor);

    // ── Canonical ──────────────────────────────────────────────────────
    upsertLink('canonical', canonicalUrl);

    // ── Open Graph ─────────────────────────────────────────────────────
    upsertMeta('meta[property="og:title"]',       'property=og:title',       fullTitle);
    upsertMeta('meta[property="og:description"]', 'property=og:description', metaDesc);
    upsertMeta('meta[property="og:type"]',        'property=og:type',        pageType);
    upsertMeta('meta[property="og:url"]',         'property=og:url',         canonicalUrl);
    upsertMeta('meta[property="og:image"]',       'property=og:image',       pageImage);
    upsertMeta('meta[property="og:image:width"]', 'property=og:image:width', '1200');
    upsertMeta('meta[property="og:image:height"]','property=og:image:height','630');
    upsertMeta('meta[property="og:site_name"]',   'property=og:site_name',   SITE_NAME);

    // ── Twitter Card ───────────────────────────────────────────────────
    upsertMeta('meta[name="twitter:card"]',        'name=twitter:card',        'summary_large_image');
    upsertMeta('meta[name="twitter:site"]',        'name=twitter:site',        '@nextorastudio');
    upsertMeta('meta[name="twitter:title"]',       'name=twitter:title',       fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name=twitter:description', metaDesc);
    upsertMeta('meta[name="twitter:image"]',       'name=twitter:image',       pageImage);

    // ── Organization JSON-LD Schema (Always present) ────────────────────
    let orgScript = document.getElementById('seo-org-schema-script');
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.id   = 'seo-org-schema-script';
      orgScript.type = 'application/ld+json';
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify(defaultSchema);

    // ── Page-Specific JSON-LD Schema (Optional) ─────────────────────────
    let pageScript = document.getElementById('seo-page-schema-script');
    if (schema) {
      if (!pageScript) {
        pageScript = document.createElement('script');
        pageScript.id   = 'seo-page-schema-script';
        pageScript.type = 'application/ld+json';
        document.head.appendChild(pageScript);
      }
      pageScript.textContent = JSON.stringify(schema);
    } else if (pageScript) {
      pageScript.remove();
    }
  }, [fullTitle, metaDesc, mergedKeywords, canonicalUrl, pageImage, pageType, pageAuthor, pageThemeColor, schema, noindex]);

  return null;
}
