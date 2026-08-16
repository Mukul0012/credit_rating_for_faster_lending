import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export default function AdminSettings() {
  const { user } = useAuth();
  const notify = useNotification();
  const [values, setValues] = useState({ name: user?.name || '', email: user?.email || '' });
  const [autoDecision, setAutoDecision] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    notify.success('Settings saved.');
  };

  return (
    <>
      <PageHeader title="Settings" description="Manage your admin account and platform preferences." />

      <div className="card card-pad" style={{ maxWidth: 560, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Account</h3>
        <form onSubmit={handleSave} noValidate>
          <Input label="Full Name" name="name" value={values.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} required />
          <Button type="submit" variant="accent" loading={saving}>Save Changes</Button>
        </form>
      </div>

      <div className="card card-pad" style={{ maxWidth: 560 }}>
        <h3 style={{ fontSize: 15, marginBottom: 4 }}>Platform Preferences</h3>
        <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>Demo-only toggle — not persisted to a backend yet.</p>
        <label className="checkbox-row">
          <input type="checkbox" checked={autoDecision} onChange={(e) => setAutoDecision(e.target.checked)} />
          Auto-approve applications graded A with DTI under 30%
        </label>
      </div>
    </>
  );
}
