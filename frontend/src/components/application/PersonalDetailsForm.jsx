import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { GENDER_OPTIONS, MARITAL_STATUS } from '../../utils/constants';
import { calculateAge } from '../../utils/calculations';
import {
  isRequired,
  validateEmail,
  validatePhone,
  validatePAN,
  validateAadhaar,
  validatePincode,
  validateDate,
  runValidators,
} from '../../utils/validation';

export default function PersonalDetailsForm({ initialValues = {}, onNext }) {
  const [values, setValues] = useState({
    fullName: '', dateOfBirth: '', gender: '', panNumber: '', aadhaarNumber: '',
    mobile: '', email: '', address: '', city: '', state: '', pincode: '',
    maritalStatus: '', dependents: '0',
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  const age = calculateAge(values.dateOfBirth);

  useEffect(() => {
    // keep in sync if navigating back to this step with different draft data
    setValues((prev) => ({ ...prev, ...initialValues }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = runValidators(values, {
      fullName: (v) => isRequired(v, 'Full name'),
      dateOfBirth: (v) => validateDate(v, 'Date of birth'),
      gender: (v) => isRequired(v, 'Gender'),
      panNumber: validatePAN,
      aadhaarNumber: validateAadhaar,
      mobile: validatePhone,
      email: validateEmail,
      address: (v) => isRequired(v, 'Address'),
      city: (v) => isRequired(v, 'City'),
      state: (v) => isRequired(v, 'State'),
      pincode: validatePincode,
      maritalStatus: (v) => isRequired(v, 'Marital status'),
    });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onNext({ ...values, age });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-step-card">
        <h2 className="form-step-title">Personal Details</h2>
        <p className="form-step-desc">Tell us a little about yourself. This information is kept private and secure.</p>

        <div className="field-row">
          <Input label="Full Name" name="fullName" value={values.fullName} onChange={handleChange} error={errors.fullName} required />
          <Input label="Date of Birth" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} required />
        </div>

        <div className="field-row">
          <Input label="Age" name="age" value={age} readOnly disabled hint="Calculated automatically from date of birth" />
          <Select label="Gender" name="gender" options={GENDER_OPTIONS} value={values.gender} onChange={handleChange} error={errors.gender} required />
        </div>

        <div className="field-row">
          <Input label="PAN Number" name="panNumber" placeholder="ABCDE1234F" style={{ textTransform: 'uppercase' }} value={values.panNumber} onChange={handleChange} error={errors.panNumber} required />
          <Input label="Aadhaar Number" name="aadhaarNumber" placeholder="12-digit number" value={values.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} required hint="Only the last 4 digits will be shown after this step" />
        </div>

        <div className="field-row">
          <Input label="Mobile Number" name="mobile" placeholder="9876543210" value={values.mobile} onChange={handleChange} error={errors.mobile} required />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" value={values.email} onChange={handleChange} error={errors.email} required />
        </div>

        <Input label="Address" name="address" placeholder="House no., street, locality" value={values.address} onChange={handleChange} error={errors.address} required />

        <div className="field-row">
          <Input label="City" name="city" value={values.city} onChange={handleChange} error={errors.city} required />
          <Input label="State" name="state" value={values.state} onChange={handleChange} error={errors.state} required />
        </div>

        <div className="field-row">
          <Input label="PIN Code" name="pincode" placeholder="6-digit PIN code" value={values.pincode} onChange={handleChange} error={errors.pincode} required />
          <Select label="Marital Status" name="maritalStatus" options={MARITAL_STATUS} value={values.maritalStatus} onChange={handleChange} error={errors.maritalStatus} required />
        </div>

        <Input
          label="Number of Dependents"
          name="dependents"
          type="number"
          min="0"
          max="15"
          value={values.dependents}
          onChange={handleChange}
          error={errors.dependents}
        />

        <div className="form-actions">
          <span />
          <div className="form-actions-right">
            <Button type="submit" variant="accent">Continue</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
