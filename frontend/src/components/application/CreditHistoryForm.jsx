import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { PAYMENT_HISTORY_OPTIONS, CREDIT_CARD_USAGE_OPTIONS } from '../../utils/constants';
import { isRequired, validateNumeric, validateUtilization, runValidators } from '../../utils/validation';

export default function CreditHistoryForm({ initialValues = {}, onNext, onBack }) {
  const [values, setValues] = useState({
    creditHistoryYears: '', totalAccounts: '', activeAccounts: '', closedAccounts: '',
    creditUtilization: '', previousDefaults: '0', missedPayments: '0', recentMissedPayments: '0',
    maxDaysPastDue: '0', recentEnquiries: '0', paymentHistory: '', creditCardUsage: '',
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
      creditHistoryYears: (v) => validateNumeric(v, 'Credit history length', { min: 0, max: 60 }),
      totalAccounts: (v) => validateNumeric(v, 'Number of credit accounts', { min: 0 }),
      activeAccounts: (v) => validateNumeric(v, 'Active credit accounts', { min: 0 }),
      closedAccounts: (v) => validateNumeric(v, 'Closed credit accounts', { min: 0 }),
      creditUtilization: validateUtilization,
      paymentHistory: (v) => isRequired(v, 'Payment history'),
      creditCardUsage: (v) => isRequired(v, 'Credit card usage'),
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
        <h2 className="form-step-title">Credit History</h2>
        <p className="form-step-desc">Details about your credit accounts and repayment behavior.</p>

        <div className="field-row">
          <Input label="Credit History Length (years)" name="creditHistoryYears" type="number" min="0" value={values.creditHistoryYears} onChange={handleChange} error={errors.creditHistoryYears} required />
          <Input label="Credit Utilization (%)" name="creditUtilization" type="number" min="0" max="100" value={values.creditUtilization} onChange={handleChange} error={errors.creditUtilization} required />
        </div>

        <div className="field-row">
          <Input label="Number of Credit Accounts" name="totalAccounts" type="number" min="0" value={values.totalAccounts} onChange={handleChange} error={errors.totalAccounts} required />
          <Input label="Active Credit Accounts" name="activeAccounts" type="number" min="0" value={values.activeAccounts} onChange={handleChange} error={errors.activeAccounts} required />
        </div>

        <div className="field-row">
          <Input label="Closed Credit Accounts" name="closedAccounts" type="number" min="0" value={values.closedAccounts} onChange={handleChange} error={errors.closedAccounts} required />
          <Input label="Previous Loan Defaults" name="previousDefaults" type="number" min="0" value={values.previousDefaults} onChange={handleChange} error={errors.previousDefaults} />
        </div>

        <div className="field-row">
          <Input label="Missed Payments (lifetime)" name="missedPayments" type="number" min="0" value={values.missedPayments} onChange={handleChange} error={errors.missedPayments} />
          <Input label="Recent Missed Payments (12 mo.)" name="recentMissedPayments" type="number" min="0" value={values.recentMissedPayments} onChange={handleChange} error={errors.recentMissedPayments} />
        </div>

        <div className="field-row">
          <Input label="Maximum Days Past Due" name="maxDaysPastDue" type="number" min="0" value={values.maxDaysPastDue} onChange={handleChange} error={errors.maxDaysPastDue} />
          <Input label="Recent Credit Enquiries (6 mo.)" name="recentEnquiries" type="number" min="0" value={values.recentEnquiries} onChange={handleChange} error={errors.recentEnquiries} />
        </div>

        <div className="field-row">
          <Select label="Payment History" name="paymentHistory" options={PAYMENT_HISTORY_OPTIONS} value={values.paymentHistory} onChange={handleChange} error={errors.paymentHistory} required />
          <Select label="Credit Card Usage" name="creditCardUsage" options={CREDIT_CARD_USAGE_OPTIONS} value={values.creditCardUsage} onChange={handleChange} error={errors.creditCardUsage} required />
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
