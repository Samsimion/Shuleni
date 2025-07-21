import React from "react";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const OwnerDashboard = () => {
  const ownerName = "Debby Chepkoech";
  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";
  const backgroundImage =
    "https://images.unsplash.com/photo-1596496053841-934f39a4b45c?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Semi-transparent White Overlay */}
      <div className="absolute inset-0 z-0 bg-white bg-opacity-30 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white bg-opacity-90 shadow-md p-6 hidden md:block">
          <div className="flex items-center space-x-3 mb-10">
            <img src={schoolLogo} alt="School Logo" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">{schoolName}</h2>
              <p className="text-sm text-gray-400">Owner</p>
            </div>
          </div>
          <nav className="space-y-4">
            <button className="block w-full text-left px-3 py-2 rounded text-blue-700 bg-blue-100 font-medium">
              Dashboard
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage students
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage teachers
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Reports
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Profile
            </button>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <p className="text-gray-600 hidden sm:block">Welcome, {ownerName}</p>
              <img src={schoolLogo} alt="Profile" className="w-10 h-10 rounded-full shadow" />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-90 shadow rounded-lg p-5 flex items-center space-x-4">
              <FaUserGraduate className="text-blue-500 text-3xl" />
              <div>
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-xl font-semibold text-gray-800">1,245</h3>
              </div>
            </div>
            <div className="bg-white bg-opacity-90 shadow rounded-lg p-5 flex items-center space-x-4">
              <FaChalkboardTeacher className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-500">Total Teachers</p>
                <h3 className="text-xl font-semibold text-gray-800">58</h3>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white bg-opacity-90 shadow rounded-lg p-4 text-gray-600">
              <ul className="space-y-2">
                <li>📌 Monthly staff meeting scheduled</li>
                <li>💡 System update planned for next week</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
