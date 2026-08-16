import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { LOAN_TYPES, LOAN_PURPOSES, REPAYMENT_FREQUENCIES, SECURED_OPTIONS } from '../../utils/constants';
import { isRequired, validateLoanAmount, runValidators } from '../../utils/validation';

export default function LoanDetailsForm({ initialValues = {}, onNext, onBack }) {
  const [values, setValues] = useState({
    loanType: '', loanPurpose: '', requestedAmount: '', loanTenure: '',
    repaymentFrequency: 'Monthly', securedType: 'Unsecured',
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = runValidators(values, {
      loanType: (v) => isRequired(v, 'Loan type'),
      loanPurpose: (v) => isRequired(v, 'Loan purpose'),
      requestedAmount: validateLoanAmount,
      loanTenure: (v) => isRequired(v, 'Loan tenure'),
    });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onNext(values);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-step-card">
        <h2 className="form-step-title">Loan Details</h2>
        <p className="form-step-desc">Tell us about the loan you're looking for.</p>

        <div className="field-row">
          <Select label="Loan Type" name="loanType" options={LOAN_TYPES} value={values.loanType} onChange={handleChange} error={errors.loanType} required />
          <Select label="Loan Purpose" name="loanPurpose" options={LOAN_PURPOSES} value={values.loanPurpose} onChange={handleChange} error={errors.loanPurpose} required />
        </div>

        <div className="field-row">
          <Input label="Requested Loan Amount (₹)" name="requestedAmount" type="number" min="1000" value={values.requestedAmount} onChange={handleChange} error={errors.requestedAmount} required />
          <Select
            label="Loan Tenure"
            name="loanTenure"
            options={['12 months', '24 months', '36 months', '48 months', '60 months', '84 months', '120 months']}
            value={values.loanTenure}
            onChange={handleChange}
            error={errors.loanTenure}
            required
          />
        </div>

        <div className="field-row">
          <Select label="Repayment Frequency" name="repaymentFrequency" options={REPAYMENT_FREQUENCIES} value={values.repaymentFrequency} onChange={handleChange} error={errors.repaymentFrequency} />
          <div className="field">
            <label className="field-label">Secured / Unsecured</label>
            <div className="radio-group">
              {SECURED_OPTIONS.map((opt) => (
                <label key={opt} className={`radio-pill ${values.securedType === opt ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="securedType"
                    value={opt}
                    checked={values.securedType === opt}
                    onChange={handleChange}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onBack}>Previous</Button>
          <div className="form-actions-right">
            <Button type="submit" variant="accent">Continue</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
