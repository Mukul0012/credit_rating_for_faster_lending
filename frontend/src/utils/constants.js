// Centralized enums/options used across forms, tables and filters.
// Keeping these here means a wording change only needs to happen once.

export const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-employed',
  'Business Owner',
  'Government Employee',
  'Contract',
  'Student',
  'Unemployed',
  'Retired',
];

export const EMPLOYMENT_STATUS = ['Active', 'Probation', 'Notice Period', 'On Leave'];

export const LOAN_TYPES = ['Personal Loan', 'Home Loan', 'Vehicle Loan', 'Education Loan', 'Business Loan'];

export const LOAN_PURPOSES = [
  'Education',
  'Medical',
  'Home Purchase',
  'Vehicle Purchase',
  'Business',
  'Debt Consolidation',
  'Personal',
  'Other',
];

export const REPAYMENT_FREQUENCIES = ['Monthly', 'Quarterly', 'Bi-Annually'];

export const SECURED_OPTIONS = ['Secured', 'Unsecured'];

export const MARITAL_STATUS = ['Single', 'Married', 'Divorced', 'Widowed'];

export const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export const PAYMENT_STATUS_OPTIONS = ['On Time', 'Delayed', 'Defaulted'];

export const PAYMENT_HISTORY_OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor'];

export const CREDIT_CARD_USAGE_OPTIONS = ['None', 'Low (<30%)', 'Moderate (30-60%)', 'High (>60%)'];

export const APPLICATION_STATUS = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const RISK_GRADES = ['A', 'B', 'C', 'D', 'E'];

export const RISK_LEVEL_COLOR = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

export const STATUS_BADGE_MAP = {
  Approved: 'success',
  Rejected: 'danger',
  Pending: 'warning',
  'Under Review': 'info',
};

export const STEPPER_STEPS = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'employment', label: 'Employment & Income' },
  { key: 'loan', label: 'Loan Details' },
  { key: 'credit', label: 'Credit History' },
  { key: 'existing', label: 'Existing Loans' },
  { key: 'review', label: 'Review & Submit' },
];

export const MODEL_INFO = {
  name: 'XGBoost',
  version: 'v2.3.1',
  featuresAnalyzed: 24,
};
