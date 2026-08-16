import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { EMPLOYMENT_TYPES, EMPLOYMENT_STATUS } from '../../utils/constants';
import { calculateAnnualIncome } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { isRequired, validateIncome, runValidators } from '../../utils/validation';

export default function EmploymentForm({ initialValues = {}, onNext, onBack }) {
  const [values, setValues] = useState({
    employmentType: '', employerName: '', jobTitle: '', employmentDuration: '',
    employmentStatus: '', monthlyIncome: '', otherIncome: '0',
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  const annualIncome = calculateAnnualIncome(values.monthlyIncome, values.otherIncome);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const showEmployerFields = !['Student', 'Unemployed', 'Retired'].includes(values.employmentType);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validators = {
      employmentType: (v) => isRequired(v, 'Employment type'),
      monthlyIncome: validateIncome,
    };
    if (showEmployerFields) {
      validators.employerName = (v) => isRequired(v, 'Employer name');
      validators.employmentStatus = (v) => isRequired(v, 'Employment status');
    }
    const validationErrors = runValidators(values, validators);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onNext({ ...values, annualIncome });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-step-card">
        <h2 className="form-step-title">Employment &amp; Income</h2>
        <p className="form-step-desc">This helps us understand your repayment capacity.</p>

        <div className="field-row">
          <Select label="Employment Type" name="employmentType" options={EMPLOYMENT_TYPES} value={values.employmentType} onChange={handleChange} error={errors.employmentType} required />
          <Select label="Employment Status" name="employmentStatus" options={EMPLOYMENT_STATUS} value={values.employmentStatus} onChange={handleChange} error={errors.employmentStatus} required={showEmployerFields} disabled={!showEmployerFields} />
        </div>

        {showEmployerFields && (
          <>
            <div className="field-row">
              <Input label="Employer Name" name="employerName" value={values.employerName} onChange={handleChange} error={errors.employerName} required />
              <Input label="Job Title" name="jobTitle" value={values.jobTitle} onChange={handleChange} error={errors.jobTitle} />
            </div>
            <Input
              label="Employment Duration"
              name="employmentDuration"
              placeholder="e.g. 3 years 4 months"
              value={values.employmentDuration}
              onChange={handleChange}
              error={errors.employmentDuration}
            />
          </>
        )}

        <div className="field-row">
          <Input label="Monthly Income (₹)" name="monthlyIncome" type="number" min="0" value={values.monthlyIncome} onChange={handleChange} error={errors.monthlyIncome} required />
          <Input label="Other Income (₹ / year)" name="otherIncome" type="number" min="0" value={values.otherIncome} onChange={handleChange} error={errors.otherIncome} hint="Rental, freelance, or other annual income" />
        </div>

        <Input label="Annual Income" name="annualIncome" value={formatCurrency(annualIncome)} readOnly disabled hint="Calculated automatically: (monthly income × 12) + other income" />

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
