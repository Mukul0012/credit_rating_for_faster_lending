import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { STATUS_BADGE_MAP } from '../../utils/constants';

export default function ApplicationRow({ application }) {
  const { applicationId, date, loanType, loanAmount, creditScore, riskGrade, status } = application;
  return (
    <tr>
      <td><strong>{applicationId}</strong></td>
      <td>{formatDate(date)}</td>
      <td>{loanType}</td>
      <td>{formatCurrency(loanAmount)}</td>
      <td>{creditScore ?? '—'}</td>
      <td>{riskGrade ?? '—'}</td>
      <td><Badge variant={STATUS_BADGE_MAP[status] || 'neutral'}>{status}</Badge></td>
      <td>
        <Link to={`/applicant/status?applicationId=${applicationId}`} className="icon-btn" aria-label="View application">
          <Eye size={15} />
        </Link>
      </td>
    </tr>
  );
}
