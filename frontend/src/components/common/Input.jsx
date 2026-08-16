import { forwardRef } from 'react';

/**
 * Reusable text input with label, error, hint, and optional leading icon
 * or trailing action (e.g. show/hide password).
 */
const Input = forwardRef(function Input(
  { label, name, error, hint, required, icon: Icon, suffix, className = '', ...rest },
  ref
) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrap">
        {Icon && <Icon size={16} className="input-icon" />}
        <input
          ref={ref}
          id={name}
          name={name}
          className={`input ${error ? 'input-invalid' : ''}`}
          style={Icon ? { paddingLeft: 40 } : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        />
        {suffix}
      </div>
      {error ? (
        <p className="field-error" id={`${name}-error`}>{error}</p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
