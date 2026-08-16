import api from './api';

// ---------------------------------------------------------------------
// MOCK AUTH SERVICE
// This entire file uses local mock logic so the frontend can run with
// zero backend. Once FastAPI/Node.js auth is ready, replace the bodies
// below with the commented `api.post(...)` calls — the function
// signatures and return shapes are already designed to match.
// ---------------------------------------------------------------------

const MOCK_DELAY = 700;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USER = {
  id: 'usr_001',
  name: 'Ganesh Rao',
  email: 'ganesh.rao@example.com',
  role: 'applicant',
};

const MOCK_ADMIN = {
  id: 'adm_001',
  name: 'Admin User',
  email: 'admin@credifast.com',
  role: 'admin',
};

export async function login({ email, password }) {
  await wait(MOCK_DELAY);
  if (!email || !password) {
    throw { message: 'Email and password are required.' };
  }
  // REAL API:
  // const { data } = await api.post('/auth/login', { email, password });
  // return data;

  const isAdmin = email.toLowerCase().includes('admin');
  const user = isAdmin ? MOCK_ADMIN : { ...MOCK_USER, email };
  const token = 'mock-jwt-token';
  localStorage.setItem('credifast_token', token);
  localStorage.setItem('credifast_user', JSON.stringify(user));
  return { user, token };
}

export async function register({ fullName, email, mobile, password }) {
  await wait(MOCK_DELAY);
  if (!fullName || !email || !mobile || !password) {
    throw { message: 'Please fill in all required fields.' };
  }
  // REAL API:
  // const { data } = await api.post('/auth/register', { fullName, email, mobile, password });
  // return data;

  const user = { id: 'usr_new', name: fullName, email, role: 'applicant' };
  const token = 'mock-jwt-token';
  localStorage.setItem('credifast_token', token);
  localStorage.setItem('credifast_user', JSON.stringify(user));
  return { user, token };
}

export function logout() {
  localStorage.removeItem('credifast_token');
  localStorage.removeItem('credifast_user');
  // REAL API (optional): api.post('/auth/logout');
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('credifast_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem('credifast_token');
}
