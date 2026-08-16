import { useEffect, useState } from 'react';
import { FileBarChart2, Download } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { getAdminStats, getModelPerformance } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';
import { formatPercent } from '../../utils/formatters';

const REPORTS = [
  { id: 'monthly-summary', title: 'Monthly Portfolio Summary', desc: 'Applications, approvals, and rejections for the current month.' },
  { id: 'risk-exposure', title: 'Risk Exposure Report', desc: 'Breakdown of outstanding exposure by risk grade.' },
  { id: 'model-performance', title: 'Model Performance Report', desc: 'Accuracy, precision, recall, and ROC-AUC over time.' },
];

export default function Reports() {
  const notify = useNotification();
  const [stats, setStats] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [s, m] = await Promise.all([getAdminStats(), getModelPerformance()]);
      if (!cancelled) { setStats(s); setModel(m); setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading reports…" /></div>;

  return (
    <>
      <PageHeader title="Reports" description="Download or preview portfolio and model reports." />

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card card-pad">
          <div className="stat-label">Approval Rate</div>
          <div className="stat-value">{formatPercent(stats.approvalRate)}</div>
        </div>
        <div className="card card-pad">
          <div className="stat-label">Model Accuracy</div>
          <div className="stat-value">{formatPercent(model.accuracy * 100)}</div>
        </div>
      </div>

      <div className="card card-pad">
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Available Reports</h3>
        {REPORTS.map((report) => (
          <div key={report.id} className="loan-item-card">
            <div className="loan-item-meta">
              <strong><FileBarChart2 size={15} style={{ marginRight: 6, verticalAlign: -2 }} />{report.title}</strong>
              <span>{report.desc}</span>
            </div>
            <Button variant="secondary" size="sm" icon={Download} onClick={() => notify.info('Report export is a demo action for now.')}>
              Export
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
