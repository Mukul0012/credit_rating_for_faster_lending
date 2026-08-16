import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function ApplicantLayout() {
  return (
    <DashboardLayout role="applicant">
      <Outlet />
    </DashboardLayout>
  );
}
