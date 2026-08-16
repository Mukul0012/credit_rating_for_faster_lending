import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { STATUS_BADGE_MAP, RISK_LEVEL_COLOR } from '../../utils/constants';

const COLUMNS = ['Application ID', 'Applicant', 'Loan Amount', 'Credit Score', 'Risk Grade', 'Risk Level', 'Decision', 'Date', 'Action'];

export default function ApplicationsTable({ applications = [] }) {
  if (applications.length === 0) {
    return <EmptyState title="No applications match your filters" description="Try adjusting the filters or search above." />;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.applicationId}>
              <td><strong>{app.applicationId}</strong></td>
              <td>{app.applicant}</td>
              <td>{formatCurrency(app.loanAmount)}</td>
              <td>{app.creditScore}</td>
              <td>{app.riskGrade}</td>
              <td><Badge variant={RISK_LEVEL_COLOR[app.riskLevel] || 'neutral'}>{app.riskLevel}</Badge></td>
              <td><Badge variant={STATUS_BADGE_MAP[app.decision] || 'neutral'}>{app.decision}</Badge></td>
              <td>{formatDate(app.date)}</td>
              <td>
                <Link to={`/admin/applications/${app.applicationId}`} className="icon-btn" aria-label="View application details">
                  <Eye size={15} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
