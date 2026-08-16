import { useEffect, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import RiskDistribution from '../../components/admin/RiskDistribution';
import ApplicationTrendChart from '../../components/admin/ApplicationTrendChart';
import Loader from '../../components/common/Loader';
import { getRiskDistribution, getApplicationTrend, getAdminApplications } from '../../services/adminService';

export default function RiskAnalysis() {
  const [risk, setRisk] = useState([]);
  const [trend, setTrend] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [r, t, apps] = await Promise.all([getRiskDistribution(), getApplicationTrend(), getAdminApplications()]);
      if (!cancelled) {
        setRisk(r); setTrend(t); setApplications(apps);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading risk analysis…" /></div>;

  const gradeCounts = ['A', 'B', 'C', 'D', 'E'].map((grade) => ({
    grade,
    count: applications.filter((a) => a.riskGrade === grade).length,
  }));
  const maxGradeCount = Math.max(...gradeCounts.map((g) => g.count), 1);

  return (
    <>
      <PageHeader title="Risk Analysis" description="Portfolio risk exposure across grades and time." />

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <RiskDistribution data={risk} />
        <ApplicationTrendChart data={trend} />
      </div>

      <div className="card card-pad">
        <h3 style={{ fontSize: 15, marginBottom: 4 }}>Applications by Risk Grade</h3>
        <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>Distribution of the current portfolio across A–E grades</p>
        <div className="bar-chart">
          {gradeCounts.map((g) => (
            <div key={g.grade} className="bar-chart-col">
              <div className="bar-chart-bar" style={{ height: `${(g.count / maxGradeCount) * 100}%` }} title={`${g.count} applications`} />
              <div className="bar-chart-label">Grade {g.grade}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
