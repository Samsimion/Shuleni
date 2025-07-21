import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/school-owner-registration', label: 'Add School', icon: <FaSchool /> },
  { path: '/create-student-registration', label: 'Add Student', icon: <FaUserGraduate /> },
  { path: '/create-educator-registration', label: 'Add Educator', icon: <FaChalkboardTeacher /> },
  { path: '/school-stats', label: 'School Stats', icon: <FaChartBar /> },
  { path: '/user-profile', label: 'User Profile', icon: <FaUserCircle /> },
];

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">Admin Dashboard</div>
      <ul className="flex space-x-4 items-center">
        {navItems.map(({ path, label, icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-1 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
        {/* Logout Item */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;

