import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, Files, UserCircle2, Activity, LogOut,
  Users, Gauge, FileBarChart2, Cpu, Settings, X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initials } from '../../utils/formatters';

const APPLICANT_LINKS = [
  { to: '/applicant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applicant/apply', label: 'Apply for Loan', icon: FilePlus2 },
  { to: '/applicant/applications', label: 'My Applications', icon: Files },
  { to: '/applicant/status', label: 'Application Status', icon: Activity },
  { to: '/applicant/profile', label: 'Profile', icon: UserCircle2 },
];

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/applications', label: 'Applications', icon: Files },
  { to: '/admin/applicants', label: 'Applicants', icon: Users },
  { to: '/admin/risk-analysis', label: 'Risk Analysis', icon: Gauge },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart2 },
  { to: '/admin/model-performance', label: 'ML Model Performance', icon: Cpu },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

/**
 * Pure presentational sidebar. Open/closed state lives in DashboardLayout
 * so the layout can react to it (e.g. reflow content) instead of this
 * component floating a button on top of the page.
 */
export default function Sidebar({ role = 'applicant', mobileOpen = false, onCloseMobile, onCollapse }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = role === 'admin' ? ADMIN_LINKS : APPLICANT_LINKS;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className={`sidebar-backdrop ${mobileOpen ? 'show' : ''}`} onClick={onCloseMobile} />
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/logo.svg" alt="CrediFast" height={26} />
          <button
            className="modal-close"
            style={{ marginLeft: 'auto', color: '#fff' }}
            onClick={() => { onCollapse?.(); onCloseMobile?.(); }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
          <button className="sidebar-link" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials(user?.name || 'U')}</div>
            <div className="sidebar-user-meta">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}