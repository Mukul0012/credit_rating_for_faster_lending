import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={26} />
      </div>
      <h3>{title}</h3>
      {description && <p className="text-muted" style={{ maxWidth: 360, margin: '0 auto' }}>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
