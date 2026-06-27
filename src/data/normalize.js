/**
 * Normalizes API data to match frontend mock data shapes.
 * Backend models are simpler (e.g., skills stored as "React:96,Node:94" string),
 * so this converts them to the array/object format the UI expects.
 */

function parseSkillsString(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  if (typeof skills === 'string' && skills.includes(':')) {
    return skills.split(',').map(s => {
      const [name, level] = s.trim().split(':');
      return { name: name?.trim() || '', level: parseInt(level) || 0 };
    });
  }
  return [];
}

function toArr(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string' && val) return val.split(',').map(s => s.trim()).filter(Boolean);
  return [];
}

export function normalizeTeamMembers(members) {
  if (!Array.isArray(members)) return [];
  return members.map(m => ({
    ...m,
    id: m._id || m.id,
    skills: parseSkillsString(m.skills),
    socials: m.socials || { github: '#', linkedin: '#', twitter: '#' },
    bio: m.bio || '',
    avatarGradient: m.avatarGradient || 'from-brand-primary to-brand-accent',
    avatarUrl: m.avatarUrl || '',
  }));
}

export function normalizeServices(services) {
  if (!Array.isArray(services)) return [];
  return services.map(s => ({
    ...s,
    id: s._id || s.id,
    features: toArr(s.features),
    iconName: s.iconName || s.category || 'Layers',
    slug: s.slug || s.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}

export function normalizePortfolios(projects) {
  if (!Array.isArray(projects)) return [];
  return projects.map(p => ({
    ...p,
    id: p._id || p.id,
    services: toArr(p.services),
    summary: p.summary || p.description || '',
    imageColor: p.imageColor || 'from-blue-600 to-cyan-500',
  }));
}

export function normalizeCaseStudies(studies) {
  if (!Array.isArray(studies)) return [];
  return studies.map(s => ({
    ...s,
    id: s._id || s.id,
    stats: Array.isArray(s.stats) ? s.stats : [
      { label: 'Problem', value: s.problem ? '1 identified' : 'N/A' },
      { label: 'Solution', value: s.solution ? 'Delivered' : 'Pending' },
      { label: 'Result', value: s.result || 'In progress' },
    ],
    category: s.category || 'Custom Software',
    summary: s.summary || s.problem || '',
    coverColor: s.coverColor || 'from-blue-600 to-indigo-700',
  }));
}

export function normalizeCareers(careers) {
  if (!Array.isArray(careers)) return [];
  return careers.map(c => ({
    ...c,
    id: c._id || c.id,
    type: c.type || c.department || 'Full-time',
    responsibilities: toArr(c.responsibilities),
    requirements: toArr(c.requirements),
  }));
}

export function normalizeTechnologies(techs) {
  if (!Array.isArray(techs)) return [];
  return techs.map(t => ({
    ...t,
    id: t._id || t.id,
  }));
}

export function normalizeTestimonials(testimonials) {
  if (!Array.isArray(testimonials)) return [];
  return testimonials.map(t => ({
    ...t,
    id: t._id || t.id,
  }));
}

export function normalizeBlogs(blogs) {
  if (!Array.isArray(blogs)) return [];
  return blogs.map(b => ({
    ...b,
    id: b._id || b.id,
    tags: toArr(b.tags),
    summary: b.summary || b.excerpt || '',
  }));
}
