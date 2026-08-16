export default function CreditScoreCard({ score, max = 900 }) {
  const pct = Math.min(100, Math.max(0, (score / max) * 100));
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct / 100) * circumference;

  const color = score >= 750 ? 'var(--color-success-600)' : score >= 620 ? 'var(--color-warning-600)' : 'var(--color-danger-600)';

  return (
    <div className="card score-ring-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="var(--color-border)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r="54" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div style={{ marginTop: -96, textAlign: 'center' }}>
        <div className="score-value">{score}</div>
        <div className="score-max">/ {max}</div>
      </div>
      <div style={{ marginTop: 60, fontSize: 13, fontWeight: 600, color: 'var(--color-text-500)' }}>Credit Score</div>
    </div>
  );
}
