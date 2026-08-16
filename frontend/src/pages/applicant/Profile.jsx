import { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { initials } from '../../utils/formatters';

export default function Profile() {
  const { user } = useAuth();
  const notify = useNotification();
  const [values, setValues] = useState({ name: user?.name || '', email: user?.email || '', mobile: '' });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    notify.success('Profile updated.');
  };

  return (
    <>
      <PageHeader title="Profile" description="Manage your personal account details." />

      <div className="card card-pad" style={{ maxWidth: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div className="sidebar-avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{initials(user?.name || 'U')}</div>
          <div>
            <strong style={{ fontSize: 16 }}>{user?.name}</strong>
            <div className="text-muted" style={{ fontSize: 13, textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
        </div>

        <form onSubmit={handleSave} noValidate>
          <Input label="Full Name" name="name" icon={User} value={values.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" icon={Mail} value={values.email} onChange={handleChange} required />
          <Input label="Mobile Number" name="mobile" icon={Phone} value={values.mobile} onChange={handleChange} placeholder="9876543210" />
          <Button type="submit" variant="accent" loading={saving}>Save Changes</Button>
        </form>
      </div>
    </>
  );
}
