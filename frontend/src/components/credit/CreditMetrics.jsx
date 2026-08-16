import { formatPercent } from '../../utils/formatters';

export default function CreditMetrics({ metrics = {} }) {
  const tiles = [
    { label: 'DTI', value: formatPercent(metrics.dti) },
    { label: 'Credit Utilization', value: formatPercent(metrics.credit_utilization ?? metrics.creditUtilization) },
    { label: 'Existing Loans', value: metrics.existing_loans ?? metrics.existingLoans ?? 0 },
    { label: 'Missed Payments', value: metrics.missed_payments ?? metrics.missedPayments ?? 0 },
  ];

  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 15, marginBottom: 16 }}>Credit Metrics</h3>
      <div className="metric-grid">
        {tiles.map((tile) => (
          <div key={tile.label} className="metric-tile card">
            <div className="metric-value">{tile.value}</div>
            <div className="metric-label">{tile.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
