const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Central API fetch helper
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
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

  forgotPassword: (email) => 
    request('/auth/forgot-password', {
      method: 'POST',
      body: { email }
    }),

  resetPassword: (token, password) => 
    request(`/auth/reset-password/user/${token}`, {
      method: 'PUT',
      body: { password }
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
    })
};
