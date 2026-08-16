// Presentation-layer formatting helpers (currency, dates, masking).

export function formatCurrency(value, { compact = false } = {}) {
  const num = Number(value) || 0;
  if (compact) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0);
}

export function formatPercent(value, decimals = 1) {
  const num = Number(value) || 0;
  return `${num.toFixed(decimals)}%`;
}

export function formatDate(value, { withTime = false } = {}) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  if (withTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  return date.toLocaleDateString('en-IN', options);
}

/**
 * Masks an Aadhaar number so only the last 4 digits are visible, e.g.
 * "234567891234" -> "XXXX XXXX 1234"
 */
export function maskAadhaar(value) {
  if (!value) return '';
  const digits = value.replace(/\s/g, '');
  if (digits.length < 4) return 'XXXX XXXX XXXX';
  const last4 = digits.slice(-4);
  return `XXXX XXXX ${last4}`;
}

/**
 * Masks a PAN number, revealing only the first 2 and last 1 characters.
 */
export function maskPAN(value) {
  if (!value || value.length < 10) return value || '';
  return `${value.slice(0, 2)}${'X'.repeat(6)}${value.slice(-1)}`;
}

export function formatPhone(value) {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return value;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function titleCase(value = '') {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}
