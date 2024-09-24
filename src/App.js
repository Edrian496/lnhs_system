import React, { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './style/login.css'; 
import LoginForm from './components/login';
import Layout from './components/layout';
import HomePage from './pages/home';
import StudentPage from './pages/student';
import GradesPage from './subpages/grade';
import AttendancePage from './subpages/attendance';
import EmployeePage from './pages/employee';
import SchoolYearPage from './subpages/schoolyear';
import EnrolledStudentsPage from './subpages/enrolledstudent';
import SubjectsPage from './pages/subject';
import Sectionlist from './subpages/sectionlist';
import SectionPage from './subpages/section';
import ListofStudentEnrolleesPage from './subpages/liststudent';
import SummaryReportonPromotionPage from './subpages/summary';
import EarlyEnrollmentReportPage from './subpages/earlyenrollment';
import StudentDetailPage from './subpages/studentdetail';
import SchedulePage from './subpages/schedule'; 



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    setRole(localStorage.getItem('role') || '');
  }, []);

  const handleLogin = (username, password, navigate, userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', userRole);
    navigate('/home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        {isAuthenticated && (
          <Route element={<Layout role={role} handleLogout={handleLogout} />}>
            <Route path="/home" element={<HomePage />} />

            <Route path="/section-list" element={<Sectionlist />} />
            <Route path="/section" element={<SectionPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/students/:id/details" element={<StudentDetailPage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/school-year" element={<SchoolYearPage />} />
            <Route path="/enrolled-students" element={<EnrolledStudentsPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/list-of-student-enrollees" element={<ListofStudentEnrolleesPage />} />
            <Route path="/summary-report-promotion" element={<SummaryReportonPromotionPage />} />
            <Route path="/early-enrollment-report" element={<EarlyEnrollmentReportPage />} />
            <Route path="/schedule" element={<SchedulePage />} />

          </Route>
        )}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
