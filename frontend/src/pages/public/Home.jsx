import { CheckCircle2 } from 'lucide-react';
import Hero from '../../components/home/Hero';
import HowItWorks from '../../components/home/HowItWorks';
import Features from '../../components/home/Features';
import Statistics from '../../components/home/Statistics';
import CTASection from '../../components/home/CTASection';

const WHY_POINTS = [
  'Decisions backed by a trained ML model, not a static rules sheet',
  'Every approval or rejection ships with a plain-language explanation',
  'Applicants track status in real time instead of waiting on a call',
  'Sensitive identifiers stay masked throughout the experience',
];

function WhyCrediFast() {
  return (
    <section className="section" style={{ background: 'var(--color-white)' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Why CrediFast</span>
            <h2>Lending Decisions People Can Actually Trust</h2>
            <p className="text-muted">
              CrediFast replaces slow, opaque underwriting with a transparent, model-driven process
              that treats every applicant fairly and explains itself along the way.
            </p>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {WHY_POINTS.map((point) => (
              <li key={point} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--color-success-600)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14.5, color: 'var(--color-text-700)' }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Statistics />
      <WhyCrediFast />
      <CTASection />
    </>
  );
}
