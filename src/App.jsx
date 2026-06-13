import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

// Admin Layout & Roles
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJDsPage from './pages/admin/AdminJDsPage';
import JDDetailsPage from './pages/admin/JDDetailsPage';
import AdminCandidatesPage from './pages/admin/AdminCandidatesPage';
import RecruiterManagement from './pages/admin/RecruiterManagement';
import AnalyticsScreen from './pages/admin/AnalyticsScreen';
import UploadJDScreen from './pages/admin/UploadJDScreen';
import AdminUploadResumeScreen from './pages/admin/AdminUploadResumeScreen';
import AdminReviewMatchesScreen from './pages/admin/AdminReviewMatchesScreen';

// Recruiter Layout & Roles
import RecruiterLayout from './layouts/RecruiterLayout';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterJDsPage from './pages/recruiter/RecruiterJDsPage';
import RecruiterJDDetails from './pages/recruiter/RecruiterJDDetails';
import UploadResumeScreen from './pages/recruiter/UploadResumeScreen';
import RecruiterCandidatesPage from './pages/recruiter/RecruiterCandidatesPage';
import ReviewMatchesScreen from './pages/recruiter/ReviewMatchesScreen';

function App() {
  return (
    <Routes>
      {/* Landing page and login workflows */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Role 1 — Admin Panel Routing */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="jds" element={<AdminJDsPage />} />
        <Route path="jd/:id" element={<JDDetailsPage />} />
        <Route path="candidates" element={<AdminCandidatesPage />} />
        <Route path="recruiters" element={<RecruiterManagement />} />
        <Route path="analytics" element={<AnalyticsScreen />} />
        <Route path="upload-jd" element={<UploadJDScreen />} />
        <Route path="upload-resume" element={<AdminUploadResumeScreen />} />
        <Route path="review-matches" element={<AdminReviewMatchesScreen />} />
        {/* Dynamic catchall fallback redirecting cleanly within demo bounds */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Role 2 — Recruiter Panel Routing */}
      <Route path="/recruiter" element={<RecruiterLayout />}>
        <Route index element={<RecruiterDashboard />} />
        <Route path="jds" element={<RecruiterJDsPage />} />
        <Route path="jd/:id" element={<RecruiterJDDetails />} />
        <Route path="candidates" element={<RecruiterCandidatesPage />} />
        <Route path="upload-resume" element={<UploadResumeScreen />} />
        <Route path="review-matches" element={<ReviewMatchesScreen />} />
        {/* Fallback bounds */}
        <Route path="*" element={<Navigate to="/recruiter" replace />} />
      </Route>

      {/* Universal system fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Trigger HMR update
export default App;
