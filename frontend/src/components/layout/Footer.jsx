import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <ShieldCheck size={20} color="#3B82F6" />
              <strong style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 16 }}>CrediFast</strong>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 280 }}>
              AI-powered credit assessment that helps lenders make faster, explainable decisions.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul className="footer-links-list">
              <li><Link to="/applicant/apply">Apply for a Loan</Link></li>
              <li><Link to="/applicant/status">Track Application</Link></li>
              <li><a href="/#features">Features</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="footer-links-list">
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#">About</a></li>
              <li><a href="/#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul className="footer-links-list">
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CrediFast.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
