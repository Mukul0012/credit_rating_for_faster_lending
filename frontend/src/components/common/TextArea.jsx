export default function TextArea({ label, name, error, hint, required, className = '', ...rest }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea id={name} name={name} className={`textarea ${error ? 'input-invalid' : ''}`} aria-invalid={Boolean(error)} {...rest} />
      {error ? <p className="field-error">{error}</p> : hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
