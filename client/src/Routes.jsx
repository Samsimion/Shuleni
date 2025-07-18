import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

import { UserProfilePage } from './pages/UserProfilePage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<UserProfilePage />} />

        {/* Add more public routes as needed */}
        
      </Route>


        {/* Protected Routes */}
    </Routes>
  );
};