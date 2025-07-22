import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate, FaClipboardList, FaCalendarAlt, FaBook, FaSignOutAlt, FaUserCircle, FaBell
} from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const studentName = "Jane Doe";
  const admissionNumber = "S-2025-001";
  const grade = "10A";
  const classId = "CLS-003";
  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";
  const backgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80";

  const handleLogout = () => {
    console.log("Logout clicked (design mode).");
    alert("Logout clicked! In a real app, this would log you out.");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      <aside className="w-64 bg-white shadow-md p-4 z-10">
        <div className="flex items-center space-x-2 mb-8">
          <img src={schoolLogo} alt="School Logo" className="w-12 h-12" />
          <span className="text-lg font-semibold">{schoolName}</span>
        </div>
        <nav className="space-y-4">
          <button className="block w-full text-left px-3 py-2 rounded text-blue-700 bg-blue-100 font-medium">
            <FaUserGraduate className="inline-block mr-2" /> Dashboard
          </button>
          <button onClick={() => navigate('/student/grades')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            <FaClipboardList className="inline-block mr-2" /> My Grades
          </button>
          <button onClick={() => navigate('/student/assignments')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            <FaBook className="inline-block mr-2" /> Assignments
          </button>
          <button onClick={() => navigate('/student/timetable')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            <FaCalendarAlt className="inline-block mr-2" /> Timetable
          </button>
          <button onClick={() => navigate('/profile')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            <FaUserCircle className="inline-block mr-2" /> My Profile
          </button>
          <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600">
            <FaSignOutAlt className="inline-block mr-2" /> Log out
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <div className="flex items-center space-x-3">
            <p className="text-gray-600 hidden sm:block">Welcome, {studentName}</p>
            <FaUserCircle className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FaUserGraduate className="text-blue-500 text-3xl" />
            <div>
              <p className="text-gray-500">Admission No.</p>
              <h3 className="text-xl font-semibold text-gray-800">{admissionNumber}</h3>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FaClipboardList className="text-green-500 text-3xl" />
            <div>
              <p className="text-gray-500">Current Grade</p>
              <h3 className="text-xl font-semibold text-gray-800">{grade}</h3>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FaBook className="text-purple-500 text-3xl" />
            <div>
              <p className="text-gray-500">Current Class ID</p>
              <h3 className="text-xl font-semibold text-gray-800">{classId}</h3>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <FaBell className="text-yellow-600" />
            <span>Latest Announcements</span>
          </h2>
          <div className="bg-white shadow rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>July 25, 2025:</strong> Mid-term exams schedule released.</li>
              <li><strong>August 1, 2025:</strong> School reopens for Term 3.</li>
              <li><strong>August 5, 2025:</strong> Essay competition deadline.</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">Visit 'Announcements' for full details.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <FaClipboardList className="text-indigo-600" />
            <span>Quick Access</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-indigo-700 text-white p-4 rounded-lg shadow-md hover:bg-indigo-800 flex items-center justify-center space-x-2">
              <FaClipboardList className="text-2xl" />
              <span>View My Grades</span>
            </button>
            <button className="bg-teal-700 text-white p-4 rounded-lg shadow-md hover:bg-teal-800 flex items-center justify-center space-x-2">
              <FaBook className="text-2xl" />
              <span>Submit Assignment</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;