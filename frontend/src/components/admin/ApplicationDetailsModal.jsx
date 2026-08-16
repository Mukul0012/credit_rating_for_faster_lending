import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { STATUS_BADGE_MAP, RISK_LEVEL_COLOR } from '../../utils/constants';

/**
 * Compact quick-view modal used from the applications list. For the full
 * page breakdown, admins are routed to AdminApplicationDetails instead.
 */
export default function ApplicationDetailsModal({ open, onClose, application, onApprove, onReject }) {
  if (!application) return null;
  const { applicationId, applicant, loanAmount, creditScore, riskGrade, riskLevel, decision, date, loanType } = application;

  return (
    <Modal open={open} onClose={onClose} title={`Application ${applicationId}`} size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="danger" onClick={() => onReject?.(applicationId)}>Reject</Button>
          <Button variant="success" onClick={() => onApprove?.(applicationId)}>Approve</Button>
        </>
      }
    >
      <div className="review-grid">
        <div className="review-item"><div className="label">Applicant</div><div className="value">{applicant}</div></div>
        <div className="review-item"><div className="label">Loan Type</div><div className="value">{loanType}</div></div>
        <div className="review-item"><div className="label">Loan Amount</div><div className="value">{formatCurrency(loanAmount)}</div></div>
        <div className="review-item"><div className="label">Credit Score</div><div className="value">{creditScore}</div></div>
        <div className="review-item"><div className="label">Risk Grade</div><div className="value">{riskGrade}</div></div>
        <div className="review-item"><div className="label">Submitted</div><div className="value">{formatDate(date)}</div></div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Badge variant={RISK_LEVEL_COLOR[riskLevel] || 'neutral'}>{riskLevel} Risk</Badge>
        <Badge variant={STATUS_BADGE_MAP[decision] || 'neutral'}>{decision}</Badge>
      </div>
    </Modal>
  );
}
