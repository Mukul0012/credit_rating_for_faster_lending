export default function Select({ label, name, options = [], error, hint, required, placeholder = 'Select an option', className = '', ...rest }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select id={name} name={name} className={`select ${error ? 'input-invalid' : ''}`} aria-invalid={Boolean(error)} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const text = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {error ? <p className="field-error">{error}</p> : hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
