import { BrainCog, ShieldCheck, Zap, FileSearch, Lock, Bot } from 'lucide-react';

const FEATURES = [
  { icon: BrainCog, title: 'AI Credit Scoring', desc: 'A trained model scores creditworthiness from 20+ financial and behavioral features.' },
  { icon: ShieldCheck, title: 'Risk Detection', desc: 'Applicants are graded A through E with a clear low/medium/high risk level.' },
  { icon: Zap, title: 'Faster Decisions', desc: 'Get a decision in minutes instead of days, with no manual paperwork chase.' },
  { icon: FileSearch, title: 'Explainable Results', desc: 'Every decision comes with plain-language reasons, not a black-box number.' },
  { icon: Lock, title: 'Secure Data', desc: 'Sensitive identifiers like PAN and Aadhaar are masked throughout the product.' },
  { icon: Bot, title: 'Automated Assessment', desc: 'DTI, LTI, and utilization are calculated automatically — no manual entry.' },
];

export default function Features() {
  return (
    <section className="section" style={{ background: 'var(--color-white)' }} id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Platform</span>
          <h2>Built for Confident Lending Decisions</h2>
          <p className="text-muted">Everything a lender needs to assess risk quickly and transparently.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-hover feature-card">
              <div className="feature-icon">
                <f.icon size={22} />
              </div>
              <h3 style={{ fontSize: 16 }}>{f.title}</h3>
              <p className="text-muted" style={{ fontSize: 14, marginBottom: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
