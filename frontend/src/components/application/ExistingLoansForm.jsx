import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import EmptyState from '../common/EmptyState';
import ExistingLoanCard from './ExistingLoanCard';
import { LOAN_TYPES, PAYMENT_STATUS_OPTIONS } from '../../utils/constants';
import { calculateTotalDebt, calculateTotalEMI } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { isRequired, validateNumeric, runValidators } from '../../utils/validation';

const emptyLoan = {
  loanType: '', originalAmount: '', outstandingAmount: '', monthlyEmi: '',
  remainingTenure: '', paymentStatus: 'On Time', missedPayments: '0',
};

export default function ExistingLoansForm({ hasExistingLoans, existingLoans = [], onNext, onBack, setHasExistingLoans, setExistingLoans }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loanValues, setLoanValues] = useState(emptyLoan);
  const [errors, setErrors] = useState({});

  const totalDebt = calculateTotalDebt(existingLoans);
  const totalEmi = calculateTotalEMI(existingLoans);

  const openAddModal = () => {
    setLoanValues(emptyLoan);
    setErrors({});
    setEditIndex(null);
    setModalOpen(true);
  };

  const openEditModal = (index) => {
    setLoanValues(existingLoans[index]);
    setErrors({});
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleLoanChange = (e) => {
    const { name, value } = e.target;
    setLoanValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSaveLoan = () => {
    const validationErrors = runValidators(loanValues, {
      loanType: (v) => isRequired(v, 'Loan type'),
      outstandingAmount: (v) => validateNumeric(v, 'Outstanding amount', { min: 0 }),
      monthlyEmi: (v) => validateNumeric(v, 'Monthly EMI', { min: 0 }),
    });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const updated = [...existingLoans];
    if (editIndex === null) {
      updated.push(loanValues);
    } else {
      updated[editIndex] = loanValues;
    }
    setExistingLoans(updated);
    setModalOpen(false);
  };

  const handleRemoveLoan = (index) => {
    setExistingLoans(existingLoans.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-step-card">
        <h2 className="form-step-title">Existing Loans</h2>
        <p className="form-step-desc">Do you currently have any existing loans?</p>

        <div className="radio-group" style={{ marginBottom: 24 }}>
          {['Yes', 'No'].map((opt) => {
            const boolValue = opt === 'Yes';
            return (
              <label key={opt} className={`radio-pill ${hasExistingLoans === boolValue ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="hasExistingLoans"
                  checked={hasExistingLoans === boolValue}
                  onChange={() => setHasExistingLoans(boolValue)}
                />
                {opt}
              </label>
            );
          })}
        </div>

        {hasExistingLoans && (
          <>
            {existingLoans.length === 0 ? (
              <EmptyState title="No loans added yet" description="Add each existing loan so we can calculate your total obligations." />
            ) : (
              <div style={{ marginBottom: 16 }}>
                {existingLoans.map((loan, index) => (
                  <ExistingLoanCard
                    key={index}
                    loan={loan}
                    onEdit={() => openEditModal(index)}
                    onRemove={() => handleRemoveLoan(index)}
                  />
                ))}
              </div>
            )}

            <Button type="button" variant="secondary" icon={Plus} onClick={openAddModal}>
              Add Existing Loan
            </Button>

            {existingLoans.length > 0 && (
              <div className="grid-2 mt-24">
                <div className="card card-pad">
                  <div className="stat-label">Total Outstanding Debt</div>
                  <div className="stat-value">{formatCurrency(totalDebt)}</div>
                </div>
                <div className="card card-pad">
                  <div className="stat-label">Total Monthly EMI</div>
                  <div className="stat-value">{formatCurrency(totalEmi)}</div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onBack}>Previous</Button>
          <div className="form-actions-right">
            <Button type="submit" variant="accent">Continue</Button>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editIndex === null ? 'Add Existing Loan' : 'Edit Existing Loan'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleSaveLoan}>Save Loan</Button>
          </>
        }
      >
        <Select label="Loan Type" name="loanType" options={LOAN_TYPES} value={loanValues.loanType} onChange={handleLoanChange} error={errors.loanType} required />
        <div className="field-row">
          <Input label="Original Loan Amount (₹)" name="originalAmount" type="number" min="0" value={loanValues.originalAmount} onChange={handleLoanChange} error={errors.originalAmount} />
          <Input label="Outstanding Amount (₹)" name="outstandingAmount" type="number" min="0" value={loanValues.outstandingAmount} onChange={handleLoanChange} error={errors.outstandingAmount} required />
        </div>
        <div className="field-row">
          <Input label="Monthly EMI (₹)" name="monthlyEmi" type="number" min="0" value={loanValues.monthlyEmi} onChange={handleLoanChange} error={errors.monthlyEmi} required />
          <Input label="Remaining Tenure (months)" name="remainingTenure" type="number" min="0" value={loanValues.remainingTenure} onChange={handleLoanChange} error={errors.remainingTenure} />
        </div>
        <div className="field-row">
          <Select label="Payment Status" name="paymentStatus" options={PAYMENT_STATUS_OPTIONS} value={loanValues.paymentStatus} onChange={handleLoanChange} error={errors.paymentStatus} />
          <Input label="Missed Payments" name="missedPayments" type="number" min="0" value={loanValues.missedPayments} onChange={handleLoanChange} error={errors.missedPayments} />
        </div>
      </Modal>
    </form>
  );
}
