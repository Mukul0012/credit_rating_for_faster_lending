import { Link } from 'react-router-dom';
import ApplicationTable from './ApplicationTable';
import Button from '../common/Button';

export default function RecentApplications({ applications = [] }) {
  const recent = applications.slice(0, 4);
  return (
    <div className="card card-pad">
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, margin: 0 }}>Recent Applications</h3>
        <Link to="/applicant/applications">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      <ApplicationTable applications={recent} />
    </div>
  );
}
