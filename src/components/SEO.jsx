import { useEffect } from 'react';

export default function SEO({ title, description, schema }) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nextora Studio",
    "alternateName": "Nextora",
    "url": "https://nextorastudio.com",
    "logo": "https://nextorastudio.com/logo.png",
    "sameAs": [
      "https://github.com/nextorastudio",
      "https://linkedin.com/company/nextorastudio",
      "https://twitter.com/nextorastudio"
    ],
    "description": "Where Ideas Take Shape. A premium digital software agency specializing in Web Dev, App Dev, POS, CRM, ERP, and UI/UX.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Global Remote",
      "addressCountry": "US"
    }
  };

  useEffect(() => {
    // Tab title
    document.title = title ? `${title} | Nextora Studio` : 'Nextora Studio | Where Ideas Take Shape';

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Nextora Studio builds premium websites, mobile applications, software, POS systems, and CRM/ERP solutions that help businesses grow.';

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title ? `${title} | Nextora Studio` : 'Nextora Studio | Where Ideas Take Shape';

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || 'Nextora Studio is an enterprise-grade digital software agency transforming ideas into powerful digital solutions.';

    // Schema JSON-LD
    let schemaScript = document.getElementById('seo-schema-script');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schema || defaultSchema);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-schema-script';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schema || defaultSchema);
      document.head.appendChild(schemaScript);
    }
  }, [title, description, schema]);

  return null;
}
