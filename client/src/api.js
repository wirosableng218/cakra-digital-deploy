// API utility functions for communicating with backend

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API methods
export const api = {
  // GET request
  get: (endpoint) => apiRequest(endpoint),
  
  // POST request
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};

// Specific API endpoints
export const endpoints = {
  health: '/health',
  users: '/users',
  contact: '/contact',
};

// Example usage functions
export const getUsers = () => api.get(endpoints.users);
export const submitContact = (formData) => api.post(endpoints.contact, formData);
export const checkHealth = () => api.get(endpoints.health);
