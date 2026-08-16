const VARIANT_MAP = {
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-warning',
  info: 'badge-info',
  neutral: 'badge-neutral',
};

export default function Badge({ children, variant = 'neutral', dot = false, className = '' }) {
  return (
    <span className={`badge ${VARIANT_MAP[variant] || VARIANT_MAP.neutral} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
