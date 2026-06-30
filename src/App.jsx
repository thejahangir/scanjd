import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(15);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setProgress(0), 200); // reset after hidden
      }, 300); // stay at 100% for a bit
      clearInterval(interval);
    }, 700);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Top Progress Bar */}
      <div 
        className={`fixed top-0 left-0 z-[10000] w-full h-[10px] bg-brand-blue/10 pointer-events-none transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          className="h-full bg-brand-blue transition-all duration-200 ease-out"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(37, 99, 235, 0.7), 0 0 5px rgba(37, 99, 235, 0.5)'
          }}
        />
      </div>

      {/* Main Content with Blur */}
      <div className={`min-h-screen transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
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
      </div>
    </>
  );
}

// Trigger HMR update
export default App;
