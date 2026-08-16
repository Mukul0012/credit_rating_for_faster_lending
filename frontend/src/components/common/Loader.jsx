export default function Loader({ size = 'md', label, fullPage = false }) {
  const spinner = <span className={`loader ${size === 'lg' ? 'loader-lg' : ''}`} role="status" aria-label={label || 'Loading'} />;

  if (fullPage) {
    return (
      <div className="page-loader">
        {spinner}
        {label && <span>{label}</span>}
      </div>
    );
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {spinner}
      {label && <span>{label}</span>}
    </span>
  );
}
