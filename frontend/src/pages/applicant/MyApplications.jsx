import { useEffect, useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import ApplicationTable from '../../components/dashboard/ApplicationTable';
import Loader from '../../components/common/Loader';
import { getMyApplications } from '../../services/applicationService';
import { useNotification } from '../../context/NotificationContext';

const FILTERS = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

export default function MyApplications() {
  const notify = useNotification();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getMyApplications();
        if (!cancelled) setApplications(data);
      } catch (err) {
        if (!cancelled) notify.error(err.message || 'Unable to load applications.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return applications;
    return applications.filter((app) => app.status === activeFilter);
  }, [applications, activeFilter]);

  return (
    <>
      <PageHeader title="My Applications" description="All the loan applications you've submitted." />

      <div className="filter-pill-group" style={{ marginBottom: 20 }}>
        {FILTERS.map((f) => (
          <button key={f} className={`filter-pill ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card card-pad"><Loader fullPage label="Loading your applications…" /></div>
      ) : (
        <div className="card card-pad">
          <ApplicationTable applications={filtered} />
        </div>
      )}
    </>
  );
}
