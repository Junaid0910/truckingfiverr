import React, { useState, useEffect } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './src/pages/Home';
import { AuthProvider, useAuth } from './src/lib/AuthContext';
import Programs from './src/pages/Programs';
import ProgramDetail from './src/pages/ProgramDetail';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import Register from './src/pages/Register';
import Jobs from './src/pages/Jobs';
import StudentPortal from './src/pages/StudentPortal';
import Financing from './src/pages/Financing';
import Support from './src/pages/Support';
import Privacy from './src/pages/Privacy';
import Terms from './src/pages/Terms';
import RefundPolicy from './src/pages/RefundPolicy';
import Accessibility from './src/pages/Accessibility';
import Login from './src/pages/Login';
import StudentDashboard from './src/pages/StudentDashboard';
import StudentCourses from './src/pages/StudentCourses';
import StudentJobs from './src/pages/StudentJobs';
import StudentPayments from './src/pages/StudentPayments';
import Documents from './src/pages/Documents';
import Resumes from './src/pages/Resumes';
import CourseViewer from './src/pages/CourseViewer';
import StudentSchedule from './src/pages/StudentSchedule';
import StudentSettings from './src/pages/StudentSettings';
import InstructorDashboard from './src/pages/InstructorDashboard';
import InstructorStudents from './src/pages/InstructorStudents';
import InstructorSchedule from './src/pages/InstructorSchedule';
import InstructorMaterials from './src/pages/InstructorMaterials';
import InstructorSettings from './src/pages/InstructorSettings';
import AdminDashboard from './src/pages/AdminDashboard';
import AdminStudents from './src/pages/AdminStudents';
import AdminInstructors from './src/pages/AdminInstructors';
import AdminCourses from './src/pages/AdminCourses';
import AdminPayments from './src/pages/AdminPayments';
import AdminReports from './src/pages/AdminReports';
import AdminSettings from './src/pages/AdminSettings';
import EmployerDashboard from './src/pages/EmployerDashboard';
import EmployerEmployees from './src/pages/EmployerEmployees';
import EmployerPrograms from './src/pages/EmployerPrograms';
import EmployerBilling from './src/pages/EmployerBilling';
import EmployerSettings from './src/pages/EmployerSettings';
import DashboardLayout from './src/components/DashboardLayout';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  // We need to use the AuthContext to derive the current user's role, but
  // AuthProvider must wrap the parts that consume it. To keep the existing
  // structure we render an inner component which reads the context.

  const InnerApp: React.FC = () => {
  const { user, setUser } = useAuth();
    const [userRole, setUserRole] = useState<string | null>(() => localStorage.getItem('userRole'));

    useEffect(() => {
      // Sync role between AuthContext and local storage.
      // Prefer an explicitly stored role (set by the login form) so a user selection
      // like "Employer" isn't immediately overridden by a backend 'me' response
      // during demo mode.
      const stored = localStorage.getItem('userRole');
      if (stored) {
        setUserRole(stored);
        return;
      }
      if (user && (user as any).role) {
        setUserRole((user as any).role);
        localStorage.setItem('userRole', (user as any).role);
      } else if (!user) {
        localStorage.removeItem('userRole');
        setUserRole(null);
      }
    }, [user]);

    const handleLogout = () => {
      // Clear token and auth state
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUser(null);
    };

    const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ 
      children, 
      allowedRoles 
    }) => {
      const role = userRole;
      if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
      }
      return <>{children}</>;
    };

    return (
      <Router>
        <main className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/login" element={<Login onSetUserRole={setUserRole} />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/student/*" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout userRole="student" onLogout={handleLogout}>
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="courses" element={<StudentCourses />} />
                    <Route path="jobs" element={<StudentJobs />} />
                    <Route path="course/:courseId" element={<CourseViewer />} />
                    <Route path="payments" element={<StudentPayments />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="resumes" element={<Resumes />} />
                    <Route path="schedule" element={<StudentSchedule />} />
                    <Route path="settings" element={<StudentSettings />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/instructor/*" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <DashboardLayout userRole="instructor" onLogout={handleLogout}>
                  <Routes>
                    <Route path="dashboard" element={<InstructorDashboard />} />
                    <Route path="students" element={<InstructorStudents />} />
                    <Route path="schedule" element={<InstructorSchedule />} />
                    <Route path="materials" element={<InstructorMaterials />} />
                    <Route path="settings" element={<InstructorSettings />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout userRole="admin" onLogout={handleLogout}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="students" element={<AdminStudents />} />
                    <Route path="instructors" element={<AdminInstructors />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/employer/*" element={
              <ProtectedRoute allowedRoles={['employer']}>
                <DashboardLayout userRole="employer" onLogout={handleLogout}>
                  <Routes>
                    <Route path="dashboard" element={<EmployerDashboard />} />
                    <Route path="employees" element={<EmployerEmployees />} />
                    <Route path="programs" element={<EmployerPrograms />} />
                    <Route path="billing" element={<EmployerBilling />} />
                    <Route path="settings" element={<EmployerSettings />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    );
  };

  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </Theme>
  );
}

export default App;