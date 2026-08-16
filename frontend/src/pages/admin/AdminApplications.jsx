import { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import ApplicationsTable from '../../components/admin/ApplicationsTable';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Loader from '../../components/common/Loader';
import { getAdminApplications } from '../../services/adminService';
import { LOAN_TYPES } from '../../utils/constants';
import { useNotification } from '../../context/NotificationContext';

const STATUS_FILTERS = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];
const RISK_FILTERS = ['All', 'A', 'B', 'C', 'D', 'E'];

export default function AdminApplications() {
  const notify = useNotification();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [loanTypeFilter, setLoanTypeFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminApplications();
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
    return applications.filter((app) => {
      if (statusFilter !== 'All' && app.decision !== statusFilter) return false;
      if (riskFilter !== 'All' && app.riskGrade !== riskFilter) return false;
      if (loanTypeFilter && app.loanType !== loanTypeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!app.applicant.toLowerCase().includes(q) && !app.applicationId.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [applications, statusFilter, riskFilter, loanTypeFilter, search]);

  return (
    <>
      <PageHeader title="Applications" description="Review and act on every submitted loan application." />

      <div className="filter-bar">
        <Input icon={Search} placeholder="Search by applicant or application ID" value={search} onChange={(e) => setSearch(e.target.value)} name="search" className="mb-0" />
        <Select name="loanType" options={LOAN_TYPES} placeholder="All Loan Types" value={loanTypeFilter} onChange={(e) => setLoanTypeFilter(e.target.value)} className="mb-0" />
      </div>

      <div className="filter-pill-group" style={{ marginBottom: 12 }}>
        {STATUS_FILTERS.map((f) => (
          <button key={f} className={`filter-pill ${statusFilter === f ? 'active' : ''}`} onClick={() => setStatusFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="filter-pill-group" style={{ marginBottom: 20 }}>
        {RISK_FILTERS.map((f) => (
          <button key={f} className={`filter-pill ${riskFilter === f ? 'active' : ''}`} onClick={() => setRiskFilter(f)}>
            {f === 'All' ? 'All Grades' : `Grade ${f}`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card card-pad"><Loader fullPage label="Loading applications…" /></div>
      ) : (
        <div className="card card-pad">
          <ApplicationsTable applications={filtered} />
        </div>
      )}
    </>
  );
}
