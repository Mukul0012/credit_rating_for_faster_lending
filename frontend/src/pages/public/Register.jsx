import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  isRequired,
  runValidators,
} from '../../utils/validation';

export default function Register() {
  const { register, loading } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();

  const [values, setValues] = useState({ fullName: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = runValidators(values, {
      fullName: (v) => isRequired(v, 'Full name'),
      email: validateEmail,
      mobile: validatePhone,
      password: validatePassword,
      confirmPassword: (v, all) => validateConfirmPassword(all.password, v),
    });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const user = await register(values);
      notify.success('Account created successfully!');
      navigate('/applicant/dashboard', { replace: true });
    } catch (err) {
      notify.error(err.message || 'Unable to create account.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="auth-brand">
          <ShieldCheck size={22} color="var(--color-blue-600)" />
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>CrediFast</strong>
        </div>
        <h2 className="text-center" style={{ fontSize: 22 }}>Create your account</h2>
        <p className="text-muted text-center" style={{ fontSize: 14 }}>Apply for a loan and track your credit assessment.</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Full Name"
            name="fullName"
            icon={User}
            placeholder="Ganesh Rao"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
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
            label="Mobile Number"
            name="mobile"
            icon={Phone}
            placeholder="9876543210"
            value={values.mobile}
            onChange={handleChange}
            error={errors.mobile}
            required
          />
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            placeholder="At least 8 characters"
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
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" variant="accent" block loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="auth-footer-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
