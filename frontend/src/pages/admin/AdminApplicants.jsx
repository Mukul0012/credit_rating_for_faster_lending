import { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { getAdminApplications } from '../../services/adminService';
import { initials } from '../../utils/formatters';
import { RISK_LEVEL_COLOR } from '../../utils/constants';
import { useNotification } from '../../context/NotificationContext';

/**
 * Derives a unique applicant list from the applications dataset —
 * there is no separate applicants endpoint yet in the mock API.
 */
export default function AdminApplicants() {
  const notify = useNotification();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getAdminApplications();
        if (!cancelled) setApplications(data);
      } catch (err) {
        if (!cancelled) notify.error(err.message || 'Unable to load applicants.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applicants = useMemo(() => {
    const map = new Map();
    applications.forEach((app) => {
      if (!map.has(app.applicant)) {
        map.set(app.applicant, { name: app.applicant, applications: [], latestRisk: app.riskLevel });
      }
      map.get(app.applicant).applications.push(app);
    });
    return Array.from(map.values()).filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
  }, [applications, search]);

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading applicants…" /></div>;

  return (
    <>
      <PageHeader title="Applicants" description="Everyone who has submitted a loan application." />

      <div className="filter-bar">
        <Input icon={Search} placeholder="Search applicants" name="search" value={search} onChange={(e) => setSearch(e.target.value)} className="mb-0" />
      </div>

      {applicants.length === 0 ? (
        <EmptyState title="No applicants found" description="Try a different search term." />
      ) : (
        <div className="card card-pad">
          {applicants.map((applicant) => (
            <div key={applicant.name} className="loan-item-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="sidebar-avatar" style={{ background: 'var(--color-navy-900)' }}>{initials(applicant.name)}</div>
                <div className="loan-item-meta">
                  <strong>{applicant.name}</strong>
                  <span>{applicant.applications.length} application{applicant.applications.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <Badge variant={RISK_LEVEL_COLOR[applicant.latestRisk] || 'neutral'}>{applicant.latestRisk} Risk</Badge>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
