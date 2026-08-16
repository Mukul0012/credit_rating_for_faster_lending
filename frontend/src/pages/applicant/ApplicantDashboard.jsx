import { useEffect, useState } from 'react';
import { FileText, CheckCircle2, Clock, Gauge } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import StatCard from '../../components/dashboard/StatCard';
import RecentApplications from '../../components/dashboard/RecentApplications';
import CreditProfileCard from '../../components/dashboard/CreditProfileCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { getMyApplications } from '../../services/applicationService';
import { mockApplicantSummary, mockCreditProfile } from '../../data/mockDashboardData';
import { useNavigate } from 'react-router-dom';

export default function ApplicantDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getMyApplications();
        if (!cancelled) setApplications(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unable to load applications.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
        description="Here's a snapshot of your loan applications and credit profile."
        actions={<Button variant="accent" onClick={() => navigate('/applicant/apply')}>Apply for Loan</Button>}
      />

      <div className="stat-grid">
        <StatCard icon={FileText} label="Total Applications" value={mockApplicantSummary.totalApplications} />
        <StatCard icon={CheckCircle2} label="Approved" value={mockApplicantSummary.approved} iconBg="var(--color-success-50)" iconColor="var(--color-success-700)" />
        <StatCard icon={Clock} label="Pending" value={mockApplicantSummary.pending} iconBg="var(--color-warning-50)" iconColor="var(--color-warning-700)" />
        <StatCard icon={Gauge} label="Credit Score" value={mockApplicantSummary.currentCreditScore} iconBg="var(--color-blue-50)" iconColor="var(--color-blue-600)" />
      </div>

      <div className="grid-2 dashboard-grid" style={{ alignItems: 'start' }}>
        {loading ? (
          <div className="card card-pad"><Loader fullPage label="Loading applications…" /></div>
        ) : error ? (
          <div className="card card-pad"><p style={{ color: 'var(--color-danger-600)', margin: 0 }}>{error}</p></div>
        ) : (
          <RecentApplications applications={applications} />
        )}
        <CreditProfileCard profile={mockCreditProfile} />
      </div>
    </>
  );
}
