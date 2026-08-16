import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const DECISION_CONFIG = {
  Approved: { className: 'approved', icon: CheckCircle2, iconBg: 'var(--color-success-100)', iconColor: 'var(--color-success-700)', title: 'LOAN APPROVED' },
  Rejected: { className: 'rejected', icon: XCircle, iconBg: 'var(--color-danger-100)', iconColor: 'var(--color-danger-700)', title: 'LOAN REJECTED' },
  'Under Review': { className: 'review', icon: Clock, iconBg: 'var(--color-warning-100)', iconColor: 'var(--color-warning-700)', title: 'UNDER MANUAL REVIEW' },
};

export default function DecisionCard({ decision = 'Under Review', message }) {
  const config = DECISION_CONFIG[decision] || DECISION_CONFIG['Under Review'];
  const Icon = config.icon;

  return (
    <div className={`decision-banner ${config.className}`}>
      <div className="decision-banner-icon" style={{ background: config.iconBg, color: config.iconColor }}>
        <Icon size={26} />
      </div>
      <div>
        <h2>{config.title}</h2>
        {message && <p className="text-muted" style={{ marginBottom: 0 }}>{message}</p>}
      </div>
    </div>
  );
}
