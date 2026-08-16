import api from './api';
import {
  mockAdminStats,
  mockApplicationTrend,
  mockRiskDistribution,
  mockModelPerformance,
  mockAdminApplications,
  getMockAdminApplicationById,
} from '../data/mockAdminData';

// ---------------------------------------------------------------------
// MOCK ADMIN SERVICE
// ---------------------------------------------------------------------

const MOCK_DELAY = 600;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAdminStats() {
  await wait(MOCK_DELAY);
  // REAL API: const { data } = await api.get('/admin/stats'); return data;
  return mockAdminStats;
}

export async function getApplicationTrend() {
  await wait(MOCK_DELAY);
  // REAL API: const { data } = await api.get('/admin/analytics/trend'); return data;
  return mockApplicationTrend;
}

export async function getRiskDistribution() {
  await wait(MOCK_DELAY);
  // REAL API: const { data } = await api.get('/admin/analytics/risk-distribution'); return data;
  return mockRiskDistribution;
}

export async function getModelPerformance() {
  await wait(MOCK_DELAY);
  // REAL API: const { data } = await api.get('/admin/model-performance'); return data;
  return mockModelPerformance;
}

export async function getAdminApplications() {
  await wait(MOCK_DELAY);
  // REAL API: const { data } = await api.get('/admin/applications'); return data;
  return mockAdminApplications;
}

export async function getAdminApplicationDetails(applicationId) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.get(`/admin/applications/${applicationId}`);
  // return data;
  const found = getMockAdminApplicationById(applicationId);
  if (!found) throw { message: `No application found with ID ${applicationId}.` };
  return found;
}

export async function updateApplicationDecision(applicationId, decision) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.patch(`/admin/applications/${applicationId}/decision`, { decision });
  // return data;
  return { applicationId, decision, updatedAt: new Date().toISOString() };
}
