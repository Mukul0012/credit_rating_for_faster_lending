import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="section">
      <div className="cta-section">
        <h2>Ready to see your credit assessment?</h2>
        <p className="text-muted" style={{ maxWidth: 480, margin: '0 auto 24px' }}>
          Start your application in minutes and get an explainable decision — no paperwork, no waiting rooms.
        </p>
        <Button variant="accent" icon={ArrowRight} onClick={() => navigate('/applicant/apply')}>
          Apply for Loan
        </Button>
      </div>
    </section>
  );
}
