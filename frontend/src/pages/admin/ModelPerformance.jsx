import { useEffect, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import ModelPerformance from '../../components/admin/ModelPerformance';
import Loader from '../../components/common/Loader';
import { getModelPerformance } from '../../services/adminService';
import { MODEL_INFO } from '../../utils/constants';

export default function ModelPerformancePage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await getModelPerformance();
      if (!cancelled) { setMetrics(data); setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="card card-pad"><Loader fullPage label="Loading model metrics…" /></div>;

  return (
    <>
      <PageHeader title="ML Model Performance" description="How the credit risk model is currently performing." />
      <ModelPerformance metrics={metrics} />

      <div className="card card-pad mt-24">
        <h3 style={{ fontSize: 15, marginBottom: 12 }}>Model Details</h3>
        <div className="review-grid">
          <div className="review-item"><div className="label">Model</div><div className="value">{MODEL_INFO.name}</div></div>
          <div className="review-item"><div className="label">Version</div><div className="value">{metrics?.modelVersion}</div></div>
          <div className="review-item"><div className="label">Features Used</div><div className="value">{MODEL_INFO.featuresAnalyzed}+</div></div>
        </div>
      </div>
    </>
  );
}
