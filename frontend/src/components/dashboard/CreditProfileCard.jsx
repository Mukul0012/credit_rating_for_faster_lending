import Badge from '../common/Badge';
import { RISK_LEVEL_COLOR } from '../../utils/constants';
import { formatDate, formatPercent } from '../../utils/formatters';

export default function CreditProfileCard({ profile }) {
  if (!profile) return null;
  const { creditScore, riskGrade, riskLevel, creditHistoryYears, activeAccounts, creditUtilization, lastUpdated } = profile;

  return (
    <div className="card card-pad">
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, margin: 0 }}>Credit Profile</h3>
        <Badge variant={RISK_LEVEL_COLOR[riskLevel] || 'neutral'}>Grade {riskGrade}</Badge>
      </div>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <div>
          <div className="stat-value">{creditScore}</div>
          <div className="stat-label">Current Credit Score</div>
        </div>
      </div>
      <div className="review-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="review-item">
          <div className="label">Credit History</div>
          <div className="value">{creditHistoryYears} yrs</div>
        </div>
        <div className="review-item">
          <div className="label">Active Accounts</div>
          <div className="value">{activeAccounts}</div>
        </div>
        <div className="review-item">
          <div className="label">Utilization</div>
          <div className="value">{formatPercent(creditUtilization)}</div>
        </div>
      </div>
      <p className="text-muted" style={{ fontSize: 12, marginTop: 16, marginBottom: 0 }}>
        Last updated {formatDate(lastUpdated)}
      </p>
    </div>
  );
}
