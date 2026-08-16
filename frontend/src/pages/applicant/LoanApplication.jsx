import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import ApplicationStepper from '../../components/application/ApplicationStepper';
import PersonalDetailsForm from '../../components/application/PersonalDetailsForm';
import EmploymentForm from '../../components/application/EmploymentForm';
import LoanDetailsForm from '../../components/application/LoanDetailsForm';
import CreditHistoryForm from '../../components/application/CreditHistoryForm';
import ExistingLoansForm from '../../components/application/ExistingLoansForm';
import ReviewApplication from '../../components/application/ReviewApplication';
import { useApplication } from '../../context/ApplicationContext';
import { useNotification } from '../../context/NotificationContext';
import { createApplication } from '../../services/applicationService';

export default function LoanApplication() {
  const navigate = useNavigate();
  const notify = useNotification();
  const {
    draft, currentStep, setCurrentStep, updateSection,
    setExistingLoans, setHasExistingLoans, resetDraft, setSubmittedApplication,
  } = useApplication();
  const [submitting, setSubmitting] = useState(false);

  const goToStep = (step) => setCurrentStep(step);
  const next = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await createApplication(draft);
      setSubmittedApplication(result);
      notify.success('Application submitted successfully!');
      navigate(`/applicant/assessment?applicationId=${result.applicationId}`);
      resetDraft();
    } catch (err) {
      notify.error(err.message || 'Unable to submit your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Loan Application" description="Complete all steps to submit your loan application." />
      <ApplicationStepper currentStep={currentStep} />

      <div className="card card-pad">
        {currentStep === 0 && (
          <PersonalDetailsForm initialValues={draft.personal} onNext={(values) => { updateSection('personal', values); next(); }} />
        )}
        {currentStep === 1 && (
          <EmploymentForm initialValues={draft.employment} onNext={(values) => { updateSection('employment', values); next(); }} onBack={back} />
        )}
        {currentStep === 2 && (
          <LoanDetailsForm initialValues={draft.loan} onNext={(values) => { updateSection('loan', values); next(); }} onBack={back} />
        )}
        {currentStep === 3 && (
          <CreditHistoryForm initialValues={draft.credit} onNext={(values) => { updateSection('credit', values); next(); }} onBack={back} />
        )}
        {currentStep === 4 && (
          <ExistingLoansForm
            hasExistingLoans={draft.hasExistingLoans}
            existingLoans={draft.existingLoans}
            setHasExistingLoans={setHasExistingLoans}
            setExistingLoans={setExistingLoans}
            onNext={next}
            onBack={back}
          />
        )}
        {currentStep === 5 && (
          <ReviewApplication draft={draft} goToStep={goToStep} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </>
  );
}
