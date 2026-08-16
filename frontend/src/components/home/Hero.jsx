import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Button from '../common/Button';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow" style={{ background: 'rgba(59,130,246,0.15)', color: '#93C5FD' }}>
              AI-Powered Lending
            </span>
            <h1>AI-Powered Credit Assessment for Faster Lending</h1>
            <p className="lead">
              Evaluate credit risk faster using intelligent financial analysis and machine learning.
            </p>
            <div className="hero-actions">
              <Button variant="accent" icon={ArrowRight} onClick={() => navigate('/applicant/apply')}>
                Apply for Loan
              </Button>
              <Button
                variant="secondary"
                icon={PlayCircle}
                style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                onClick={() => navigate('/applicant/status')}
              >
                Check Application Status
              </Button>
            </div>
           
          </div>

         
        </div>
      </div>
    </section>
  );
}
