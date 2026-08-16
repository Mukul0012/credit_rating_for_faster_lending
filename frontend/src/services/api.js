import axios from 'axios';

// Single Axios instance used by every service file. The base URL comes
// from the environment so nothing here needs to change when the real
// FastAPI/Node.js backend goes live — just set VITE_API_BASE_URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the auth token (once real JWT auth exists) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('credifast_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error normalization so callers can rely on
// `error.message` always being a human-readable string.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject({ ...error, message });
  }
);

export default api;
