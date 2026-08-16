// Reusable financial calculations shared across the application form,
// the review page, and the (mock) credit result page.
// None of these functions produce a real credit score — that always
// comes from the backend/ML model. See services/creditService.js.

/**
 * Calculate age in whole years from a date-of-birth string (yyyy-mm-dd).
 */
export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return '';
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return '';

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age >= 0 ? age : '';
}

/**
 * Annual income = monthly income * 12 + other (already-annual) income.
 */
export function calculateAnnualIncome(monthlyIncome, otherIncome = 0) {
  const monthly = Number(monthlyIncome) || 0;
  const other = Number(otherIncome) || 0;
  return monthly * 12 + other;
}

/**
 * Sum of the outstanding amount across every existing loan.
 */
export function calculateTotalDebt(existingLoans = []) {
  return existingLoans.reduce((sum, loan) => sum + (Number(loan.outstandingAmount) || 0), 0);
}

/**
 * Sum of the monthly EMI across every existing loan.
 */
export function calculateTotalEMI(existingLoans = []) {
  return existingLoans.reduce((sum, loan) => sum + (Number(loan.monthlyEmi) || 0), 0);
}

/**
 * Debt-to-Income ratio (%) = Total Monthly Debt / Monthly Income * 100
 */
export function calculateDTI(totalMonthlyEmi, monthlyIncome) {
  const income = Number(monthlyIncome) || 0;
  if (income <= 0) return 0;
  const dti = (Number(totalMonthlyEmi) / income) * 100;
  return Math.round(dti * 10) / 10;
}

/**
 * Loan-to-Income ratio = Requested Loan Amount / Annual Income
 */
export function calculateLTI(requestedLoanAmount, annualIncome) {
  const annual = Number(annualIncome) || 0;
  if (annual <= 0) return 0;
  const lti = Number(requestedLoanAmount) / annual;
  return Math.round(lti * 100) / 100;
}
