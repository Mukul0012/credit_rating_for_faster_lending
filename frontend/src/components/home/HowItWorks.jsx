import { FileText, BrainCircuit, ShieldAlert, BadgeCheck } from 'lucide-react';

const STEPS = [
  { icon: FileText, title: 'Apply', desc: 'Submit your personal, employment, and loan details in a guided form.' },
  { icon: BrainCircuit, title: 'Analyze', desc: 'Our model reviews income, credit history, and existing obligations.' },
  { icon: ShieldAlert, title: 'Predict Risk', desc: 'A risk grade and default probability are generated in seconds.' },
  { icon: BadgeCheck, title: 'Make Decision', desc: 'Get an explainable approval or rejection with clear reasons.' },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Process</span>
          <h2>How It Works</h2>
          <p className="text-muted">From application to decision in four straightforward steps.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div key={step.title} className="card card-hover step-card">
              <div className="step-num">{i + 1}</div>
              <h3 style={{ fontSize: 16 }}>{step.title}</h3>
              <p className="text-muted" style={{ fontSize: 14, marginBottom: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
