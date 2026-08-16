export default function RiskDistribution({ data = [] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  let cumulative = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 15, marginBottom: 4 }}>Risk Distribution</h3>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>Applications by risk band</p>
      <div className="donut-wrap">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <g transform="rotate(-90 75 75)">
            {data.map((slice) => {
              const fraction = slice.value / total;
              const dash = fraction * circumference;
              const dashArray = `${dash} ${circumference - dash}`;
              const dashOffset = -cumulative * circumference;
              cumulative += fraction;
              return (
                <circle
                  key={slice.label}
                  cx="75" cy="75" r={radius} fill="none"
                  stroke={slice.color} strokeWidth="22"
                  strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                />
              );
            })}
          </g>
        </svg>
        <div className="donut-legend">
          {data.map((slice) => (
            <div key={slice.label}>
              <span className="swatch" style={{ background: slice.color }} />
              <span>{slice.label} — <strong>{slice.value}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
