export default function StatCard({ icon: Icon, label, value, iconBg = 'var(--color-blue-50)', iconColor = 'var(--color-blue-600)', trend }) {
  return (
    <div className="card card-pad stat-card">
      <div className="stat-card-top">
        <div className="stat-icon" style={{ background: iconBg, color: iconColor }}>
          <Icon size={19} />
        </div>
        {trend && (
          <span className={`stat-trend ${trend.direction === 'down' ? 'stat-trend-down' : 'stat-trend-up'}`}>
            {trend.direction === 'down' ? '↓' : '↑'} {trend.value}
          </span>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
