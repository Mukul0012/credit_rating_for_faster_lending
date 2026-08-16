import { Pencil } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatDate, maskAadhaar, maskPAN, formatPercent } from '../../utils/formatters';
import { calculateTotalDebt, calculateTotalEMI, calculateDTI, calculateLTI } from '../../utils/calculations';

function ReviewItem({ label, value }) {
  return (
    <div className="review-item">
      <div className="label">{label}</div>
      <div className="value">{value || '—'}</div>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="card card-pad review-section">
      <div className="review-section-head">
        <h3>{title}</h3>
        <Button variant="ghost" size="sm" icon={Pencil} onClick={onEdit}>Edit</Button>
      </div>
      <div className="review-grid">{children}</div>
    </div>
  );
}

export default function ReviewApplication({ draft, goToStep, onSubmit, submitting }) {
  const { personal = {}, employment = {}, loan = {}, credit = {}, existingLoans = [] } = draft;

  const totalDebt = calculateTotalDebt(existingLoans);
  const totalEmi = calculateTotalEMI(existingLoans);
  const dti = calculateDTI(totalEmi, employment.monthlyIncome);
  const lti = calculateLTI(loan.requestedAmount, employment.annualIncome);

  return (
    <div className="form-step-card">
      <h2 className="form-step-title">Review &amp; Submit</h2>
      <p className="form-step-desc">Please review your details carefully before submitting.</p>

      <ReviewSection title="Personal Information" onEdit={() => goToStep(0)}>
        <ReviewItem label="Full Name" value={personal.fullName} />
        <ReviewItem label="Date of Birth" value={formatDate(personal.dateOfBirth)} />
        <ReviewItem label="Age" value={personal.age} />
        <ReviewItem label="Gender" value={personal.gender} />
        <ReviewItem label="PAN Number" value={maskPAN(personal.panNumber)} />
        <ReviewItem label="Aadhaar Number" value={maskAadhaar(personal.aadhaarNumber)} />
        <ReviewItem label="Mobile" value={personal.mobile} />
        <ReviewItem label="Email" value={personal.email} />
        <ReviewItem label="City / State" value={`${personal.city || ''}${personal.city && personal.state ? ', ' : ''}${personal.state || ''}`} />
        <ReviewItem label="PIN Code" value={personal.pincode} />
        <ReviewItem label="Marital Status" value={personal.maritalStatus} />
        <ReviewItem label="Dependents" value={personal.dependents} />
      </ReviewSection>

      <ReviewSection title="Employment Information" onEdit={() => goToStep(1)}>
        <ReviewItem label="Employment Type" value={employment.employmentType} />
        <ReviewItem label="Employer" value={employment.employerName} />
        <ReviewItem label="Job Title" value={employment.jobTitle} />
        <ReviewItem label="Duration" value={employment.employmentDuration} />
        <ReviewItem label="Monthly Income" value={formatCurrency(employment.monthlyIncome)} />
        <ReviewItem label="Annual Income" value={formatCurrency(employment.annualIncome)} />
      </ReviewSection>

      <ReviewSection title="Loan Details" onEdit={() => goToStep(2)}>
        <ReviewItem label="Loan Type" value={loan.loanType} />
        <ReviewItem label="Purpose" value={loan.loanPurpose} />
        <ReviewItem label="Requested Amount" value={formatCurrency(loan.requestedAmount)} />
        <ReviewItem label="Tenure" value={loan.loanTenure} />
        <ReviewItem label="Repayment Frequency" value={loan.repaymentFrequency} />
        <ReviewItem label="Secured / Unsecured" value={loan.securedType} />
      </ReviewSection>

      <ReviewSection title="Credit History" onEdit={() => goToStep(3)}>
        <ReviewItem label="Credit History Length" value={`${credit.creditHistoryYears || 0} years`} />
        <ReviewItem label="Total Accounts" value={credit.totalAccounts} />
        <ReviewItem label="Active Accounts" value={credit.activeAccounts} />
        <ReviewItem label="Credit Utilization" value={formatPercent(credit.creditUtilization)} />
        <ReviewItem label="Payment History" value={credit.paymentHistory} />
        <ReviewItem label="Missed Payments" value={credit.missedPayments} />
      </ReviewSection>

      <ReviewSection title="Existing Loans" onEdit={() => goToStep(4)}>
        <ReviewItem label="Number of Loans" value={existingLoans.length} />
        <ReviewItem label="Total Outstanding Debt" value={formatCurrency(totalDebt)} />
        <ReviewItem label="Total Monthly EMI" value={formatCurrency(totalEmi)} />
      </ReviewSection>

      <div className="card card-pad review-section">
        <div className="review-section-head">
          <h3>Financial Metrics</h3>
        </div>
        <div className="review-grid">
          <ReviewItem label="Debt-to-Income (DTI)" value={formatPercent(dti)} />
          <ReviewItem label="Loan-to-Income (LTI)" value={lti} />
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={() => goToStep(4)}>Previous</Button>
        <div className="form-actions-right">
          <Button type="button" variant="accent" onClick={onSubmit} loading={submitting}>
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}
