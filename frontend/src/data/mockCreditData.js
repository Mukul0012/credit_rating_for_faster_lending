// Mock shape of what the ML backend will eventually return for a
// submitted application. Keep this structure aligned with the sample
// response documented in the backend integration guide (see README).

export const mockCreditResult = {
  application_id: 'APP10234',
  credit_score: 782,
  risk_grade: 'A',
  risk_level: 'Low',
  default_probability: 0.08,
  decision: 'Approved',
  loan_amount: 500000,
  loan_tenure: '36 months',
  reasons: [
    'Stable income',
    'Good payment history',
    'Low credit utilization',
    'No previous defaults',
    'Healthy debt-to-income ratio',
  ],
  metrics: {
    dti: 28,
    credit_utilization: 24,
    existing_loans: 1,
    missed_payments: 0,
    credit_history_years: 6,
  },
};

export const mockRejectedCreditResult = {
  application_id: 'APP10151',
  credit_score: 588,
  risk_grade: 'D',
  risk_level: 'High',
  default_probability: 0.47,
  decision: 'Rejected',
  loan_amount: 250000,
  loan_tenure: '24 months',
  reasons: [
    'High credit utilization',
    'Recent missed payments',
    'Elevated debt-to-income ratio',
    'Short credit history',
  ],
  metrics: {
    dti: 58,
    credit_utilization: 82,
    existing_loans: 3,
    missed_payments: 4,
    credit_history_years: 1,
  },
};

export function getMockCreditResultByApplicationId(applicationId) {
  if (applicationId === mockRejectedCreditResult.application_id) return mockRejectedCreditResult;
  return { ...mockCreditResult, application_id: applicationId || mockCreditResult.application_id };
}
