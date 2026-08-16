import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { validateEmail, runValidators, isRequired } from '../../utils/validation';

export default function Login() {
  const { login, loading } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runValidators(values, {
      email: validateEmail,
      password: (v) => isRequired(v, 'Password'),
    });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const user = await login(values);
      notify.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      const redirectTo = location.state?.from || (user.role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      notify.error(err.message || 'Unable to log in.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="auth-brand">
          <ShieldCheck size={22} color="var(--color-blue-600)" />
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>CrediFast</strong>
        </div>
        <h2 className="text-center" style={{ fontSize: 22 }}>Log in to your account</h2>
        <p className="text-muted text-center" style={{ fontSize: 14 }}>Track applications and view your credit profile.</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
            suffix={
              <button type="button" className="input-suffix-btn" onClick={() => setShowPassword((s) => !s)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <div className="flex-between" style={{ marginBottom: 24 }}>
            <label className="checkbox-row">
              <input type="checkbox" name="rememberMe" checked={values.rememberMe} onChange={handleChange} />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ fontSize: 13.5, fontWeight: 600 }}>Forgot password?</Link>
          </div>

          <Button type="submit" variant="accent" block loading={loading}>
            Log In
          </Button>
        </form>

        <p className="auth-footer-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
