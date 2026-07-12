const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Automatically switch subdomains on nextorastudio.tech
  if (window.location.hostname.includes('nextorastudio.tech')) {
    return 'https://api.nextorastudio.tech/api/v1';
  }
  // Automatically switch subdomains on nextora.tech
  if (window.location.hostname.includes('nextora.tech')) {
    return 'https://api.nextora.tech/api/v1';
  }
  return 'http://localhost:5000/api/v1';
};

const API_BASE = getApiBase();

// Central API fetch helper
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = { ...options, headers };

  if (config.body && !(config.body instanceof FormData) && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  // ── Auth ─────────────────────────────────────────────────────────────────
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),

  register: (name, email, password, company) =>
    request('/auth/register', { method: 'POST', body: { name, email, password, company } }),

  verifyOtp: (email, otpCode) =>
    request('/auth/verify-otp', { method: 'POST', body: { email, otpCode } }),

  resendOtp: (email) =>
    request('/auth/resend-otp', { method: 'POST', body: { email } }),

  forgotPassword: (email) =>
    request('/auth/forgot-password', { method: 'POST', body: { email } }),

  resetPasswordOtp: (email, otpCode, password) =>
    request('/auth/reset-password-otp', { method: 'POST', body: { email, otpCode, password } }),

  // ── Public: Services ─────────────────────────────────────────────────────
  getServices: () => request('/services'),

  // ── Public: Portfolio ─────────────────────────────────────────────────────
  getPortfolios: () => request('/portfolios'),

  // ── Public: Case Studies ─────────────────────────────────────────────────
  getCaseStudies: () => request('/case-studies'),

  // ── Public: Blog ──────────────────────────────────────────────────────────
  getBlogs: () => request('/blogs'),
  getBlog: (id) => request(`/blogs/${id}`),

  // ── Public: Team ──────────────────────────────────────────────────────────
  getTeam: () => request('/teams'),

  // ── Public: Technologies ─────────────────────────────────────────────────
  getTechnologies: () => request('/technologies'),

  // ── Public: Testimonials ─────────────────────────────────────────────────
  getTestimonials: () => request('/testimonials'),

  // ── Public: Careers ───────────────────────────────────────────────────────
  getCareers: () => request('/careers'),

  // ── Public: Contact Form (no auth required) ────────────────────────────
  // Fields: name, email, subject, text
  submitContact: (name, email, subject, text) =>
    request('/contacts', {
      method: 'POST',
      body: { name, email, subject, text },
    }),

  // ── Public: Job Application ───────────────────────────────────────────────
  submitApplication: (name, email, roleApplied, fileUrl, coverLetter) =>
    request('/applications', {
      method: 'POST',
      body: { name, email, roleApplied, fileUrl, coverLetter },
    }),

  // ── Authenticated: Client Portal ─────────────────────────────────────────
  getProjects: () => request('/projects'),

  getInvoices: () => request('/invoices'),

  getTickets: () => request('/tickets'),

  createTicket: (subject, category, urgency, message) =>
    request('/tickets', { method: 'POST', body: { subject, category, urgency, message } }),

  updateProfile: (formData) =>
    request('/users/me', { method: 'PUT', body: formData }),
};
