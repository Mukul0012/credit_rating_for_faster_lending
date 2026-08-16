import { Loader2 } from 'lucide-react';

/**
 * Reusable button. variant: primary | accent | secondary | ghost | danger | success
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  block = false,
  icon: Icon,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <Loader2 size={16} className="spin-icon" style={{ animation: 'spin 0.7s linear infinite' }} /> : Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}
