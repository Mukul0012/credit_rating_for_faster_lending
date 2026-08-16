import { Files, CheckCircle2, XCircle, Clock } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function AdminStats({ stats }) {
  if (!stats) return null;
  return (
    <div className="stat-grid">
      <StatCard icon={Files} label="Total Applications" value={stats.totalApplications.toLocaleString('en-IN')} />
      <StatCard icon={CheckCircle2} label="Approved" value={stats.approved.toLocaleString('en-IN')} iconBg="var(--color-success-50)" iconColor="var(--color-success-700)" />
      <StatCard icon={XCircle} label="Rejected" value={stats.rejected.toLocaleString('en-IN')} iconBg="var(--color-danger-50)" iconColor="var(--color-danger-700)" />
      <StatCard icon={Clock} label="Pending" value={stats.pending.toLocaleString('en-IN')} iconBg="var(--color-warning-50)" iconColor="var(--color-warning-700)" />
    </div>
  );
}
