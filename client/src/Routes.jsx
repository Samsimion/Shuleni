import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

import SchoolOwnerRegistration from './pages/SchoolOwnerRegistration';
import Login from './pages/Login';
import UserProfilePage from './pages/UserProfilePage';
import LandingPage from './pages/LandingPage';
import CreateStudentRegistration from './pages/CreateStudentRegistration';
import CreateEducatorRegistration from './pages/CreateEducatorRegistration';
import ChangePassword from './pages/ChangePassword';
import SchoolStats from './pages/SchoolStats';
import Unauthorized from './pages/Unauthorized';
import OwnerPage from './pages/OwnerPage';
import CreateSchool from './pages/CreateSchool';
import SchoolDetails from './components/schools/SchoolDetails';
import StudentDashboard from './components/dashboards/StudentDashboard';
import EducatorDashboard from './components/dashboards/EducatorDashboard';
import useAuth from './hooks/useAuth';
import StudentClasses from './pages/StudentClasses';
import StudentAssessments from './pages/StudentAssessments';
import StudentAttendance from './pages/StudentAttendance';
import StudentGrades from './pages/StudentGrades';


export const AppRoutes = () => {
  const { loading } = useAuth();




  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  return (
    <Routes>
      {/* 🔁 Default route */}
      <Route
        path="/"
        element={
          <LandingPage />
        }
      />

      {/* 🌐 Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/school-owner-registration" element={<SchoolOwnerRegistration />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* <Route path="/user-profile" element={<UserProfilePage/>}/> */}
      </Route>

      {/* 🔐 Owner-only routes */}
      
      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-school"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <CreateSchool />
          </ProtectedRoute>
        }
      />
      

      <Route
        path="/create-student-registration"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <CreateStudentRegistration />
          </ProtectedRoute>
        }
        
      />

      <Route
        path="/create-educator-registration"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <CreateEducatorRegistration />
          </ProtectedRoute>
        }
      />

      <Route
        path="/school-stats"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <SchoolStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/school/:schoolId/details"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <SchoolDetails />
          </ProtectedRoute>
        }
      />



      {/* 🔐 Educator-only routes */}
      <Route
        path="/educator-dashboard"
        element={
          <ProtectedRoute allowedRoles={['educator']}>
            <EducatorDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔐 Student-only routes */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/classes"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentClasses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/assessments"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentAssessments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/grades"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentGrades />
          </ProtectedRoute>
        }
      />



      {/* 🔐 Shared routes: owner, educator, student */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute allowedRoles={['owner', 'educator', 'student']}>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-profile"
        element={
          <ProtectedRoute allowedRoles={['owner', 'educator', 'student']}>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

