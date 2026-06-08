const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Central API fetch helper
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && !(config.body instanceof FormData) && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Network request failed');
  }

  return data;
}

export const api = {
  // Authentication API endpoints
  login: (email, password) => 
    request('/auth/login', {
      method: 'POST',
      body: { email, password }
    }),

  register: (name, email, password, company) => 
    request('/auth/register', {
      method: 'POST',
      body: { name, email, password, company }
    }),

  verifyOtp: (email, otpCode) => 
    request('/auth/verify-otp', {
      method: 'POST',
      body: { email, otpCode }
    }),

  resendOtp: (email) => 
    request('/auth/resend-otp', {
      method: 'POST',
      body: { email }
    }),

  forgotPassword: (email) => 
    request('/auth/forgot-password', {
      method: 'POST',
      body: { email }
    }),

  resetPasswordOtp: (email, otpCode, password) => 
    request('/auth/reset-password-otp', {
      method: 'POST',
      body: { email, otpCode, password }
    }),

  // Client Data API endpoints
  getProjects: () => 
    request('/projects'),

  getInvoices: () => 
    request('/invoices'),

  getTickets: () => 
    request('/tickets'),

  createTicket: (subject, category, urgency, message) => 
    request('/tickets', {
      method: 'POST',
      body: { subject, category, urgency, message }
    }),

  updateProfile: (formData) => 
    request('/users/me', {
      method: 'PUT',
      body: formData
    })
};
