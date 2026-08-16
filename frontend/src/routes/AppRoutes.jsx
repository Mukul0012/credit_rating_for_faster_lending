import { Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import ApplicantLayout from '../layouts/ApplicantLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import ApplicantDashboard from '../pages/applicant/ApplicantDashboard';
import LoanApplication from '../pages/applicant/LoanApplication';
import AssessmentProcessing from '../pages/applicant/AssessmentProcessing';
import CreditResult from '../pages/applicant/CreditResult';
import ApplicationStatus from '../pages/applicant/ApplicationStatus';
import MyApplications from '../pages/applicant/MyApplications';
import Profile from '../pages/applicant/Profile';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminApplications from '../pages/admin/AdminApplications';
import AdminApplicationDetails from '../pages/admin/AdminApplicationDetails';
import AdminApplicants from '../pages/admin/AdminApplicants';
import RiskAnalysis from '../pages/admin/RiskAnalysis';
import AdminModelPerformance from '../pages/admin/ModelPerformance';
import Reports from '../pages/admin/Reports';
import AdminSettings from '../pages/admin/AdminSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Applicant (protected) */}
      <Route
        element={
          <ProtectedRoute>
            <ApplicantLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
        <Route path="/applicant/apply" element={<LoanApplication />} />
        <Route path="/applicant/assessment" element={<AssessmentProcessing />} />
        <Route path="/applicant/result" element={<CreditResult />} />
        <Route path="/applicant/status" element={<ApplicationStatus />} />
        <Route path="/applicant/applications" element={<MyApplications />} />
        <Route path="/applicant/profile" element={<Profile />} />
      </Route>

      {/* Admin (protected, requires admin role) */}
      <Route
        element={
          <ProtectedRoute requireRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/applications/:id" element={<AdminApplicationDetails />} />
        <Route path="/admin/applicants" element={<AdminApplicants />} />
        <Route path="/admin/risk-analysis" element={<RiskAnalysis />} />
        <Route path="/admin/model-performance" element={<AdminModelPerformance />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
