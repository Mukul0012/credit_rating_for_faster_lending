const STATS = [
  { value: '50,000+', label: 'Applications Scored' },
  { value: '94.1%', label: 'Model ROC-AUC' },
  { value: '2.3 min', label: 'Avg. Decision Time' },
  { value: '35%', label: 'Fewer Manual Reviews' },
];

export default function Statistics() {
  return (
    <section className="stats-band">
      <div className="container">
        <div className="stats-band-grid">
          {STATS.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
