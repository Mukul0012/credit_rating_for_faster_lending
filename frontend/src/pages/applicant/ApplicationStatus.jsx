import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FileCheck2, ShieldCheck, BrainCircuit, Gauge, BadgeCheck } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import { getApplicationStatus } from '../../services/applicationService';
import { STATUS_BADGE_MAP } from '../../utils/constants';
import { useNotification } from '../../context/NotificationContext';

const STAGES = [
  { key: 'submitted', label: 'Application Submitted', icon: FileCheck2 },
  { key: 'verification', label: 'Verification', icon: ShieldCheck },
  { key: 'assessment', label: 'Credit Assessment', icon: BrainCircuit },
  { key: 'risk', label: 'Risk Evaluation', icon: Gauge },
  { key: 'decision', label: 'Final Decision', icon: BadgeCheck },
];

function stageCountFor(status) {
  if (status === 'Approved' || status === 'Rejected') return 5;
  if (status === 'Under Review') return 3;
  return 1;
}

export default function ApplicationStatus() {
  const [searchParams] = useSearchParams();
  const notify = useNotification();
  const [applicationId, setApplicationId] = useState(searchParams.get('applicationId') || '');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e?.preventDefault();
    if (!applicationId) {
      notify.warning('Please enter an application ID.');
      return;
    }
    setLoading(true);
    try {
      const data = await getApplicationStatus(applicationId.trim());
      setStatus(data);
    } catch (err) {
      setStatus(null);
      notify.error(err.message || 'Application not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('applicationId')) handleLookup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedCount = status ? stageCountFor(status.status) : 0;

  return (
    <>
      <PageHeader title="Application Status" description="Enter your application ID to track its progress." />

      <div className="card card-pad" style={{ marginBottom: 24 }}>
        <form onSubmit={handleLookup} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <Input
              label="Application ID"
              name="applicationId"
              placeholder="e.g. APP10234"
              icon={Search}
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
            />
          </div>
          <Button type="submit" variant="accent" loading={loading} style={{ marginBottom: 20 }}>
            Track Application
          </Button>
        </form>
      </div>

      {loading && <div className="card card-pad"><Loader fullPage label="Looking up your application…" /></div>}

      {!loading && status && (
        <div className="card card-pad">
          <div className="flex-between" style={{ marginBottom: 24 }}>
            <div>
              <div className="text-muted" style={{ fontSize: 13 }}>Application</div>
              <strong style={{ fontSize: 18 }}>{status.applicationId}</strong>
            </div>
            <Badge variant={STATUS_BADGE_MAP[status.status] || 'neutral'}>{status.status}</Badge>
          </div>

          <div className="timeline">
            {STAGES.map((stage, index) => {
              const complete = index < completedCount;
              const current = index === completedCount;
              const Icon = stage.icon;
              return (
                <div key={stage.key} className={`timeline-item ${complete ? 'complete' : current ? 'current' : ''}`}>
                  <div className="timeline-marker-col">
                    <div className="timeline-dot" />
                    {index < STAGES.length - 1 && <div className="timeline-connector" />}
                  </div>
                  <div className="timeline-content">
                    <strong><Icon size={14} style={{ marginRight: 6, verticalAlign: -2 }} />{stage.label}</strong>
                    <span>{complete ? 'Completed' : current ? 'In progress' : 'Pending'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
