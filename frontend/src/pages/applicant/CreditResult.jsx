import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Download, FileText, LayoutDashboard } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import CreditScoreCard from '../../components/credit/CreditScoreCard';
import RiskGradeCard from '../../components/credit/RiskGradeCard';
import RiskGauge from '../../components/credit/RiskGauge';
import CreditMetrics from '../../components/credit/CreditMetrics';
import DecisionCard from '../../components/credit/DecisionCard';
import DecisionExplanation from '../../components/credit/DecisionExplanation';
import { getCreditResult } from '../../services/creditService';
import { formatCurrency } from '../../utils/formatters';
import { useNotification } from '../../context/NotificationContext';

export default function CreditResult() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const navigate = useNavigate();
  const notify = useNotification();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getCreditResult(applicationId);
        if (!cancelled) setResult(data);
      } catch (err) {
        if (!cancelled) notify.error(err.message || 'Unable to load your result.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [applicationId]);

  if (loading) {
    return <div className="card card-pad"><Loader fullPage label="Loading your result…" /></div>;
  }

  if (!result) {
    return <div className="card card-pad"><p>We couldn't find a result for this application.</p></div>;
  }

  return (
    <>
      <PageHeader
        title="Credit Assessment Result"
        description={`Application ${result.application_id}`}
        actions={
          <>
            <Button variant="secondary" icon={Download} onClick={() => notify.info('Report download is a demo action for now.')}>
              Download Report
            </Button>
            <Button variant="secondary" icon={FileText} onClick={() => navigate(`/applicant/status?applicationId=${result.application_id}`)}>
              View Application
            </Button>
            <Button variant="accent" icon={LayoutDashboard} onClick={() => navigate('/applicant/dashboard')}>
              Back to Dashboard
            </Button>
          </>
        }
      />

      <DecisionCard decision={result.decision} message={`Loan amount ${formatCurrency(result.loan_amount)} · Tenure ${result.loan_tenure}`} />

      <div className="result-hero">
        <CreditScoreCard score={result.credit_score} />
        <RiskGradeCard grade={result.risk_grade} level={result.risk_level} probability={result.default_probability} />
      </div>

      <div className="mt-24" style={{ marginBottom: 24 }}>
        <RiskGauge probability={result.default_probability} level={result.risk_level} />
      </div>

      <div className="mt-24" style={{ marginBottom: 24 }}>
        <CreditMetrics metrics={result.metrics} />
      </div>

      <DecisionExplanation reasons={result.reasons} decision={result.decision} />
    </>
  );
}
