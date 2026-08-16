import api from './api';
import { getMockCreditResultByApplicationId } from '../data/mockCreditData';

// ---------------------------------------------------------------------
// MOCK CREDIT SERVICE
// This is the single place that stands in for the ML model call.
// The frontend never computes a credit score itself — it only ever
// displays whatever this function returns. Swap the body for the real
// API call and every page that consumes it (CreditResult, dashboard
// cards, etc.) keeps working unchanged.
// ---------------------------------------------------------------------

const MOCK_DELAY = 2600; // simulates the ML pipeline "thinking"
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runCreditAssessment(applicationId) {
  await wait(MOCK_DELAY);
  // REAL API:
  // const { data } = await api.post(`/credit/assess/${applicationId}`);
  // return data;
  return getMockCreditResultByApplicationId(applicationId);
}

export async function getCreditResult(applicationId) {
  await wait(400);
  // REAL API:
  // const { data } = await api.get(`/credit/result/${applicationId}`);
  // return data;
  return getMockCreditResultByApplicationId(applicationId);
}
