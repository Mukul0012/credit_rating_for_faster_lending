import api from './api';
import { mockApplications, getMockApplicationById } from '../data/mockApplications';

// ---------------------------------------------------------------------
// MOCK APPLICATION SERVICE — see README "Backend Integration Guide"
// for the exact swap-in points once /api/applications exists.
// ---------------------------------------------------------------------

const MOCK_DELAY = 600;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createApplication(applicationData) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.post('/applications', applicationData);
  // return data;

  const applicationId = `APP${Math.floor(10000 + Math.random() * 89999)}`;
  return {
    applicationId,
    status: 'Pending',
    submittedAt: new Date().toISOString(),
    ...applicationData,
  };
}

export async function getApplication(applicationId) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.get(`/applications/${applicationId}`);
  // return data;

  const found = getMockApplicationById(applicationId);
  if (!found) throw { message: `No application found with ID ${applicationId}.` };
  return found;
}

export async function getMyApplications() {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.get('/applications/mine');
  // return data;
  return mockApplications;
}

export async function getApplicationStatus(applicationId) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.get(`/applications/${applicationId}/status`);
  // return data;

  const found = getMockApplicationById(applicationId);
  if (!found) throw { message: `No application found with ID ${applicationId}.` };
  return { applicationId: found.applicationId, status: found.status };
}
