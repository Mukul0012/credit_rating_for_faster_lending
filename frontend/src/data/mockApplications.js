// Mock applications for the current logged-in applicant.
// Replace with a real API response — see services/applicationService.js.

export const mockApplications = [
  {
    applicationId: 'APP10234',
    date: '2026-07-28',
    loanType: 'Personal Loan',
    loanAmount: 500000,
    creditScore: 782,
    riskGrade: 'A',
    status: 'Approved',
  },
  {
    applicationId: 'APP10198',
    date: '2026-06-14',
    loanType: 'Vehicle Loan',
    loanAmount: 850000,
    creditScore: 705,
    riskGrade: 'B',
    status: 'Approved',
  },
  {
    applicationId: 'APP10151',
    date: '2026-05-02',
    loanType: 'Personal Loan',
    loanAmount: 250000,
    creditScore: 588,
    riskGrade: 'D',
    status: 'Rejected',
  },
  {
    applicationId: 'APP10267',
    date: '2026-08-10',
    loanType: 'Home Loan',
    loanAmount: 3200000,
    creditScore: null,
    riskGrade: null,
    status: 'Under Review',
  },
  {
    applicationId: 'APP10289',
    date: '2026-08-13',
    loanType: 'Education Loan',
    loanAmount: 600000,
    creditScore: null,
    riskGrade: null,
    status: 'Pending',
  },
];

export function getMockApplicationById(applicationId) {
  return mockApplications.find((app) => app.applicationId === applicationId) || null;
}
