import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function ExistingLoanCard({ loan, onEdit, onRemove }) {
  return (
    <div className="loan-item-card">
      <div className="loan-item-meta">
        <strong>{loan.loanType}</strong>
        <span>Outstanding: {formatCurrency(loan.outstandingAmount)}</span>
        <span>EMI: {formatCurrency(loan.monthlyEmi)}</span>
        <span>{loan.paymentStatus}</span>
      </div>
      <div className="loan-item-actions">
        <button className="icon-btn" onClick={onEdit} aria-label="Edit loan">
          <Pencil size={15} />
        </button>
        <button className="icon-btn icon-btn-danger" onClick={onRemove} aria-label="Remove loan">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
