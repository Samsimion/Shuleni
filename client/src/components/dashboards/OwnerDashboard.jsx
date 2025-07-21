import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaPlusCircle, FaChartBar, FaCalendarAlt } from "react-icons/fa"; // FaCalendarAlt added

const OwnerDashboard = () => {
  const ownerName = "Debby Chepkoech";
  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";

  const backgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80";

  return (
    <div className="min-h-screen flex bg-gray-100 relative overflow-hidden">
      {/* Subtle Background Image */}
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

      <main className="flex-1 p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <p className="text-gray-600 hidden sm:block">Welcome, {ownerName}</p>
      
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
              <FaUserGraduate className="text-blue-500 text-3xl" />
              <div>
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-xl font-semibold text-gray-800">1,245</h3>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
              <FaChalkboardTeacher className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-500">Total Teachers</p>
                <h3 className="text-xl font-semibold text-gray-800">58</h3>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="bg-blue-700 text-white p-4 rounded-lg shadow-md hover:bg-blue-800 flex items-center justify-center space-x-2">
                    <FaPlusCircle className="text-2xl" />
                    <span>Add New Student</span>
                </button>
                <button className="bg-green-700 text-white p-4 rounded-lg shadow-md hover:bg-green-800 flex items-center justify-center space-x-2">
                    <FaChalkboardTeacher className="text-2xl" />
                    <span>Add New Teacher</span>
                </button>
                <button className="bg-indigo-700 text-white p-4 rounded-lg shadow-md hover:bg-indigo-800 flex items-center justify-center space-x-2"> {/* Changed purple to indigo */}
                    <FaClipboardList className="text-2xl" />
                    <span>Generate Report</span>
                </button>
                 <button className="bg-amber-700 text-white p-4 rounded-lg shadow-md hover:bg-amber-800 flex items-center justify-center space-x-2"> {/* Darker yellow */}
                    <FaCalendarAlt className="text-2xl" />
                    <span>View Calendar</span>
                </button>
            </div>
          </section>

          

          {/* Upcoming Events/Calendar Snippet - NEW SECTION */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FaCalendarAlt className="text-purple-600" />
                <span>Upcoming Events</span>
            </h2>
            <div className="bg-white shadow rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-gray-700">
                    <span className="font-semibold text-gray-600">📅 Aug 10, 2025:</span>
                    <span>Parent-Teacher Conference</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                    <span className="font-semibold text-gray-600">📅 Aug 15, 2025:</span>
                    <span>School Board Meeting</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                    <span className="font-semibold text-gray-600">📅 Aug 22, 2025:</span>
                    <span>Annual Sports Day</span>
                </li>
              </ul>
            </div>
          </section>

      </main>
    </div>
  );
};

export default OwnerDashboard;