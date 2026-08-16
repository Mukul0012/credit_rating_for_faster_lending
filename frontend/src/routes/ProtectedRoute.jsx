import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route tree that requires authentication (and optionally a
 * specific role). Redirects to /login, preserving where the user was
 * headed so we can send them back after they sign in.
 */
export default function ProtectedRoute({ children, requireRole }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    const fallback = user?.role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
