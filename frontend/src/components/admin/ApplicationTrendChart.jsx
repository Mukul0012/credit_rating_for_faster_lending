export default function ApplicationTrendChart({ data = [] }) {
  const max = Math.max(...data.map((d) => d.applications), 1);
  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 15, marginBottom: 4 }}>Application Trend</h3>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 8 }}>Monthly submitted applications</p>
      <div className="bar-chart">
        {data.map((d) => (
          <div key={d.month} className="bar-chart-col">
            <div className="bar-chart-bar" style={{ height: `${(d.applications / max) * 100}%` }} title={`${d.applications} applications`} />
            <div className="bar-chart-label">{d.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
