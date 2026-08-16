import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Send } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import CreditMetrics from '../../components/credit/CreditMetrics';
import DecisionExplanation from '../../components/credit/DecisionExplanation';
import { getAdminApplicationDetails, updateApplicationDecision } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { STATUS_BADGE_MAP, RISK_LEVEL_COLOR } from '../../utils/constants';
import { getMockCreditResultByApplicationId } from '../../data/mockCreditData';
import { useNotification } from '../../context/NotificationContext';

export default function AdminApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = useNotification();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' | 'reject' | 'review'
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminApplicationDetails(id);
        if (!cancelled) setApplication(data);
      } catch (err) {
        if (!cancelled) notify.error(err.message || 'Application not found.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleConfirm = async () => {
    if (!confirmAction) return;
    setUpdating(true);
    const decisionMap = { approve: 'Approved', reject: 'Rejected', review: 'Under Review' };
    try {
      await updateApplicationDecision(id, decisionMap[confirmAction]);
      setApplication((prev) => ({ ...prev, decision: decisionMap[confirmAction] }));
      notify.success(`Application marked as ${decisionMap[confirmAction]}.`);
    } catch (err) {
      notify.error(err.message || 'Unable to update the application.');
    } finally {
      setUpdating(false);
      setConfirmAction(null);
    }
  };

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading application…" /></div>;
  if (!application) return <div className="card card-pad"><p>Application not found.</p></div>;

  const creditResult = getMockCreditResultByApplicationId(application.applicationId);

  return (
    <>
      <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/admin/applications')} style={{ marginBottom: 12 }}>
        Back to Applications
      </Button>

      <PageHeader
        title={`Application ${application.applicationId}`}
        description={`Submitted by ${application.applicant} on ${formatDate(application.date)}`}
        actions={
          <>
            <Button variant="secondary" icon={Send} onClick={() => setConfirmAction('review')}>Send for Manual Review</Button>
            <Button variant="danger" icon={XCircle} onClick={() => setConfirmAction('reject')}>Reject</Button>
            <Button variant="success" icon={CheckCircle2} onClick={() => setConfirmAction('approve')}>Approve</Button>
          </>
        }
      />

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card card-pad">
          <h3 style={{ fontSize: 15, marginBottom: 16 }}>Applicant &amp; Loan</h3>
          <div className="review-grid">
            <div className="review-item"><div className="label">Applicant</div><div className="value">{application.applicant}</div></div>
            <div className="review-item"><div className="label">Loan Type</div><div className="value">{application.loanType}</div></div>
            <div className="review-item"><div className="label">Loan Amount</div><div className="value">{formatCurrency(application.loanAmount)}</div></div>
            <div className="review-item"><div className="label">Credit Score</div><div className="value">{application.creditScore}</div></div>
            <div className="review-item"><div className="label">Risk Grade</div><div className="value">{application.riskGrade}</div></div>
            <div className="review-item"><div className="label">Submitted</div><div className="value">{formatDate(application.date)}</div></div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Badge variant={RISK_LEVEL_COLOR[application.riskLevel] || 'neutral'}>{application.riskLevel} Risk</Badge>
            <Badge variant={STATUS_BADGE_MAP[application.decision] || 'neutral'}>{application.decision}</Badge>
          </div>
        </div>

        <CreditMetrics metrics={creditResult.metrics} />
      </div>

      <DecisionExplanation reasons={creditResult.reasons} decision={application.decision} />

      <ConfirmDialog
        open={Boolean(confirmAction)}
        title={
          confirmAction === 'approve' ? 'Approve this application?' :
          confirmAction === 'reject' ? 'Reject this application?' :
          'Send for manual review?'
        }
        message="This is a demo action — it updates the local view only and does not call a real backend yet."
        confirmLabel={confirmAction === 'approve' ? 'Approve' : confirmAction === 'reject' ? 'Reject' : 'Send'}
        variant={confirmAction === 'approve' ? 'success' : confirmAction === 'reject' ? 'danger' : 'accent'}
        loading={updating}
        onConfirm={handleConfirm}
        onClose={() => setConfirmAction(null)}
      />
    </>
  );
}
