import { useEffect, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import AdminStats from '../../components/admin/AdminStats';
import ApplicationTrendChart from '../../components/admin/ApplicationTrendChart';
import RiskDistribution from '../../components/admin/RiskDistribution';
import ModelPerformance from '../../components/admin/ModelPerformance';
import Loader from '../../components/common/Loader';
import {
  getAdminStats, getApplicationTrend, getRiskDistribution, getModelPerformance,
} from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const [risk, setRisk] = useState([]);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [s, t, r, m] = await Promise.all([
        getAdminStats(), getApplicationTrend(), getRiskDistribution(), getModelPerformance(),
      ]);
      if (!cancelled) {
        setStats(s); setTrend(t); setRisk(r); setModel(m);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading dashboard…" /></div>;

  const approvalRate = stats ? ((stats.approved / stats.totalApplications) * 100).toFixed(1) : 0;

  return (
    <>
      <PageHeader title="Admin Dashboard" description="Portfolio-wide view of applications, risk, and model health." />
      <AdminStats stats={stats} />

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <ApplicationTrendChart data={trend} />
        <RiskDistribution data={risk} />
      </div>

      <div className="card card-pad" style={{ marginBottom: 20 }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: 15, margin: 0 }}>Approval Rate</h3>
            <p className="text-muted" style={{ fontSize: 13, marginBottom: 0 }}>Share of applications approved to date</p>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: 'var(--color-success-700)' }}>
            {approvalRate}%
          </div>
        </div>
      </div>

      <ModelPerformance metrics={model} />
    </>
  );
}
