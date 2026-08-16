import Badge from '../common/Badge';
import { formatPercent, formatDate } from '../../utils/formatters';

export default function ModelPerformance({ metrics }) {
  if (!metrics) return null;
  const rows = [
    { label: 'Accuracy', value: formatPercent(metrics.accuracy * 100) },
    { label: 'Precision', value: formatPercent(metrics.precision * 100) },
    { label: 'Recall', value: formatPercent(metrics.recall * 100) },
    { label: 'F1 Score', value: formatPercent(metrics.f1Score * 100) },
    { label: 'ROC-AUC', value: metrics.rocAuc.toFixed(3) },
  ];

  return (
    <div className="card card-pad">
      <div className="flex-between" style={{ marginBottom: 4 }}>
        <h3 style={{ fontSize: 15, margin: 0 }}>ML Model Performance</h3>
        {metrics.isDemoData && <Badge variant="warning">Demo Data</Badge>}
      </div>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>
        {metrics.modelVersion} · last trained {formatDate(metrics.lastTrained)}
      </p>
      <div className="metric-grid">
        {rows.map((row) => (
          <div key={row.label} className="metric-tile card">
            <div className="metric-value">{row.value}</div>
            <div className="metric-label">{row.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
