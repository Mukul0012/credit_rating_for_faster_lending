import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath = isAdmin ? '/admin/dashboard' : '/applicant/dashboard';

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="" height={30} />
        </Link>

        <nav className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#features">Features</a>
          <NavLink to="/applicant/status">Check Status</NavLink>
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate(dashboardPath)}>
                Hi, {user?.name?.split(' ')[0]}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => { logout(); navigate('/'); }}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="accent" size="sm" onClick={() => navigate('/register')}>
                Apply for Loan
              </Button>
            </>
          )}
          <button className="navbar-toggle" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
