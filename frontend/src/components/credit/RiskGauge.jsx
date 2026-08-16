// Semi-circle gauge visualizing default probability, no chart library needed.
export default function RiskGauge({ probability = 0, level = 'Low' }) {
  const pct = Math.min(100, Math.max(0, probability * 100));
  const angle = (pct / 100) * 180;
  const needleColor = level === 'Low' ? 'var(--color-success-600)' : level === 'Medium' ? 'var(--color-warning-600)' : 'var(--color-danger-600)';

  // needle endpoint from center (100,95) with radius 78
  const rad = (Math.PI * (180 - angle)) / 180;
  const x = 100 + 78 * Math.cos(rad);
  const y = 95 - 78 * Math.sin(rad);

  return (
    <div className="card card-pad" style={{ textAlign: 'center' }}>
      <div className="text-muted" style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Default Risk Gauge</div>
      <svg width="200" height="110" viewBox="0 0 200 110">
        <path d="M 15 95 A 85 85 0 0 1 185 95" fill="none" stroke="var(--color-success-100)" strokeWidth="16" />
        <path d="M 15 95 A 85 85 0 0 1 100 12" fill="none" stroke="var(--color-warning-100)" strokeWidth="16" opacity="0" />
        <path d="M 15 95 A 85 85 0 0 1 185 95" fill="none" stroke="url(#gaugeGradient)" strokeWidth="16" strokeLinecap="round" />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        <line x1="100" y1="95" x2={x} y2={y} stroke={needleColor} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="100" cy="95" r="6" fill={needleColor} />
      </svg>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: needleColor, marginTop: -6 }}>
        {Math.round(pct)}%
      </div>
      <div className="text-muted" style={{ fontSize: 12 }}>Probability of default</div>
    </div>
  );
}
