import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

import SchoolOwnerRegistration from './pages/SchoolOwnerRegistration';
import Login from './pages/Login';
import { UserProfilePage } from './pages/UserProfilePage';
import HomePage from './pages/HomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/school-owner-registration" element={<SchoolOwnerRegistration />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        {/* Add more public routes as needed */}
      </Route>

      {/* Protected Routes (placeholder) */}
    </Routes>
  );
};
