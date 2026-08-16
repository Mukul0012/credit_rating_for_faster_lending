import { formatCurrency, formatDate } from '../../utils/formatters';
import Badge from '../common/Badge';
import { STATUS_BADGE_MAP } from '../../utils/constants';

/**
 * Compact summary card used on the Application Status and Credit
 * Result pages to remind the applicant what they applied for.
 */
export default function ApplicationSummary({ application }) {
  if (!application) return null;
  const { applicationId, loanType, loanAmount, date, status } = application;

  return (
    <div className="card card-pad flex-between" style={{ flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Application ID</div>
        <strong style={{ fontSize: 16 }}>{applicationId}</strong>
      </div>
      <div>
        <div className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Loan Type</div>
        <strong style={{ fontSize: 15 }}>{loanType}</strong>
      </div>
      <div>
        <div className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Amount</div>
        <strong style={{ fontSize: 15 }}>{formatCurrency(loanAmount)}</strong>
      </div>
      <div>
        <div className="text-muted" style={{ fontSize: 12, marginBottom: 4 }}>Submitted</div>
        <strong style={{ fontSize: 15 }}>{formatDate(date)}</strong>
      </div>
      <Badge variant={STATUS_BADGE_MAP[status] || 'neutral'}>{status}</Badge>
    </div>
  );
}
