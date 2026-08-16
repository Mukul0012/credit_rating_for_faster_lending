import ApplicationRow from './ApplicationRow';
import EmptyState from '../common/EmptyState';
import { Inbox } from 'lucide-react';

const COLUMNS = ['Application ID', 'Date', 'Loan Type', 'Amount', 'Credit Score', 'Risk Grade', 'Status', 'Action'];

export default function ApplicationTable({ applications = [] }) {
  if (applications.length === 0) {
    return <EmptyState icon={Inbox} title="No applications yet" description="Applications you submit will show up here." />;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <ApplicationRow key={app.applicationId} application={app} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
