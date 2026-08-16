// Mock data for the admin/analytics screens.

export const mockAdminStats = {
  totalApplications: 1284,
  approved: 812,
  rejected: 298,
  pending: 174,
  approvalRate: 63.2,
};

export const mockApplicationTrend = [
  { month: 'Mar', applications: 142 },
  { month: 'Apr', applications: 168 },
  { month: 'May', applications: 190 },
  { month: 'Jun', applications: 205 },
  { month: 'Jul', applications: 236 },
  { month: 'Aug', applications: 251 },
];

export const mockRiskDistribution = [
  { label: 'Low Risk', value: 612, color: '#16A34A' },
  { label: 'Medium Risk', value: 431, color: '#D97706' },
  { label: 'High Risk', value: 241, color: '#DC2626' },
];

export const mockModelPerformance = {
  accuracy: 0.912,
  precision: 0.887,
  recall: 0.864,
  f1Score: 0.875,
  rocAuc: 0.941,
  modelVersion: 'XGBoost v2.3.1',
  lastTrained: '2026-07-01',
  isDemoData: true,
};

export const mockAdminApplications = [
  {
    applicationId: 'APP10234',
    applicant: 'Ganesh Rao',
    loanAmount: 500000,
    creditScore: 782,
    riskGrade: 'A',
    riskLevel: 'Low',
    decision: 'Approved',
    loanType: 'Personal Loan',
    date: '2026-07-28',
  },
  {
    applicationId: 'APP10198',
    applicant: 'Priya Sharma',
    loanAmount: 850000,
    creditScore: 705,
    riskGrade: 'B',
    riskLevel: 'Low',
    decision: 'Approved',
    loanType: 'Vehicle Loan',
    date: '2026-06-14',
  },
  {
    applicationId: 'APP10151',
    applicant: 'Arjun Mehta',
    loanAmount: 250000,
    creditScore: 588,
    riskGrade: 'D',
    riskLevel: 'High',
    decision: 'Rejected',
    loanType: 'Personal Loan',
    date: '2026-05-02',
  },
  {
    applicationId: 'APP10267',
    applicant: 'Fatima Khan',
    loanAmount: 3200000,
    creditScore: 651,
    riskGrade: 'C',
    riskLevel: 'Medium',
    decision: 'Under Review',
    loanType: 'Home Loan',
    date: '2026-08-10',
  },
  {
    applicationId: 'APP10289',
    applicant: 'Rohit Verma',
    loanAmount: 600000,
    creditScore: 720,
    riskGrade: 'B',
    riskLevel: 'Low',
    decision: 'Pending',
    loanType: 'Education Loan',
    date: '2026-08-13',
  },
  {
    applicationId: 'APP10301',
    applicant: 'Sneha Iyer',
    loanAmount: 180000,
    creditScore: 542,
    riskGrade: 'E',
    riskLevel: 'High',
    decision: 'Rejected',
    loanType: 'Personal Loan',
    date: '2026-08-14',
  },
];

export function getMockAdminApplicationById(applicationId) {
  return mockAdminApplications.find((a) => a.applicationId === applicationId) || null;
}
