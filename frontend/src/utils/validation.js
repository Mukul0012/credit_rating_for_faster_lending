// Lightweight, dependency-free validators. Each returns an error string
// (or '' when the value is valid) so forms can do:
//   const error = validateEmail(value); if (error) { ... }

export const isRequired = (value, label = 'This field') => {
  if (value === null || value === undefined) return `${label} is required.`;
  if (typeof value === 'string' && value.trim() === '') return `${label} is required.`;
  if (Array.isArray(value) && value.length === 0) return `${label} is required.`;
  return '';
};

export const validateEmail = (value) => {
  if (!value) return 'Email is required.';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? '' : 'Please enter a valid email address.';
};

export const validatePhone = (value) => {
  if (!value) return 'Mobile number is required.';
  const regex = /^[6-9]\d{9}$/;
  return regex.test(value.replace(/\s/g, '')) ? '' : 'Please enter a valid 10-digit mobile number.';
};

export const validatePAN = (value) => {
  if (!value) return 'PAN number is required.';
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(value.toUpperCase()) ? '' : 'Please enter a valid PAN number (e.g. ABCDE1234F).';
};

export const validateAadhaar = (value) => {
  if (!value) return 'Aadhaar number is required.';
  const digits = value.replace(/\s/g, '');
  const regex = /^\d{12}$/;
  return regex.test(digits) ? '' : 'Please enter a valid 12-digit Aadhaar number.';
};

export const validatePincode = (value) => {
  if (!value) return 'PIN code is required.';
  const regex = /^\d{6}$/;
  return regex.test(value) ? '' : 'Please enter a valid 6-digit PIN code.';
};

export const validateNumeric = (value, label = 'This field', { min, max } = {}) => {
  if (value === '' || value === null || value === undefined) return `${label} is required.`;
  const num = Number(value);
  if (Number.isNaN(num)) return `${label} must be a number.`;
  if (min !== undefined && num < min) return `${label} must be at least ${min}.`;
  if (max !== undefined && num > max) return `${label} must be at most ${max}.`;
  return '';
};

export const validateLoanAmount = (value) => validateNumeric(value, 'Loan amount', { min: 1000, max: 100000000 });

export const validateIncome = (value) => validateNumeric(value, 'Monthly income', { min: 1 });

export const validateUtilization = (value) => validateNumeric(value, 'Credit utilization', { min: 0, max: 100 });

export const validateDate = (value, label = 'Date') => {
  if (!value) return `${label} is required.`;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return `Please enter a valid ${label.toLowerCase()}.`;
  if (date > new Date()) return `${label} cannot be in the future.`;
  return '';
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password.';
  return password === confirmPassword ? '' : 'Passwords do not match.';
};

/**
 * Runs a map of { field: validatorFn } against a values object and
 * returns a map of { field: errorMessage } containing only the fields
 * that failed. An empty object means the form is valid.
 */
export function runValidators(values, validatorMap) {
  const errors = {};
  Object.entries(validatorMap).forEach(([field, validator]) => {
    const error = validator(values[field], values);
    if (error) errors[field] = error;
  });
  return errors;
}
