import Badge from '../common/Badge';
import { RISK_LEVEL_COLOR } from '../../utils/constants';

export default function RiskGradeCard({ grade, level, probability }) {
  return (
    <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
      <div className="flex-between">
        <span className="text-muted" style={{ fontSize: 13, fontWeight: 600 }}>Risk Grade</span>
        <Badge variant={RISK_LEVEL_COLOR[level] || 'neutral'}>{level} Risk</Badge>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: 'var(--color-navy-900)' }}>
        {grade}
      </div>
      {probability !== undefined && (
        <div className="text-muted" style={{ fontSize: 13 }}>
          Default probability: <strong style={{ color: 'var(--color-text-900)' }}>{Math.round(probability * 100)}%</strong>
        </div>
      )}
    </div>
  );
}
