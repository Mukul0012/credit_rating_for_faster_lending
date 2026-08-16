import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Loader2, Circle, BrainCircuit } from 'lucide-react';
import { runCreditAssessment } from '../../services/creditService';
import { MODEL_INFO } from '../../utils/constants';
import { useNotification } from '../../context/NotificationContext';

const PIPELINE_STEPS = [
  'Application Submitted',
  'Applicant Information Verified',
  'Income Analyzed',
  'Credit History Evaluated',
  'Debt Metrics Calculated',
  'AI Risk Prediction',
  'Final Decision',
];

export default function AssessmentProcessing() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId') || 'APP10234';
  const navigate = useNavigate();
  const notify = useNotification();
  const [activeIndex, setActiveIndex] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Advance the visual pipeline roughly in step with the mock ML call.
    const stepInterval = setInterval(() => {
      setActiveIndex((prev) => Math.min(prev + 1, PIPELINE_STEPS.length - 1));
    }, 380);

    async function assess() {
      try {
        const result = await runCreditAssessment(applicationId);
        clearInterval(stepInterval);
        setActiveIndex(PIPELINE_STEPS.length);
        setTimeout(() => {
          navigate(`/applicant/result?applicationId=${result.application_id}`, { replace: true });
        }, 500);
      } catch (err) {
        clearInterval(stepInterval);
        notify.error(err.message || 'Assessment failed. Please try again.');
        navigate('/applicant/dashboard');
      }
    }
    assess();

    return () => clearInterval(stepInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  return (
    <div className="card card-pad" style={{ maxWidth: 620, margin: '40px auto', textAlign: 'center' }}>
      <div className="empty-state-icon" style={{ margin: '0 auto 20px' }}>
        <BrainCircuit size={26} />
      </div>
      <h2 style={{ fontSize: 20 }}>Analyzing Your Credit Profile</h2>
      <p className="text-muted">Sit tight — this usually takes just a few seconds.</p>

      <div className="pipeline-list" style={{ textAlign: 'left' }}>
        {PIPELINE_STEPS.map((step, index) => {
          const state = index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'pending';
          return (
            <div key={step} className={`pipeline-item ${state}`}>
              {state === 'done' && <Check size={16} />}
              {state === 'active' && <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} />}
              {state === 'pending' && <Circle size={14} />}
              {step}
            </div>
          );
        })}
      </div>

      <div className="card card-pad" style={{ background: 'var(--color-bg)', textAlign: 'left', fontSize: 13 }}>
        <div className="flex-between" style={{ marginBottom: 6 }}>
          <span className="text-muted">AI Model</span>
          <strong>{MODEL_INFO.name}</strong>
        </div>
        <div className="flex-between" style={{ marginBottom: 6 }}>
          <span className="text-muted">Features Analyzed</span>
          <strong>{MODEL_INFO.featuresAnalyzed}+</strong>
        </div>
        <div className="flex-between">
          <span className="text-muted">Status</span>
          <strong>{activeIndex >= PIPELINE_STEPS.length ? 'Complete' : 'Processing'}</strong>
        </div>
      </div>
    </div>
  );
}
