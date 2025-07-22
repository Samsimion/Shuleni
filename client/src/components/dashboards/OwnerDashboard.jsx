import React from "react";

import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaPlusCircle, FaChartBar, FaCalendarAlt, FaBuilding, FaEdit, FaTrash } from "react-icons/fa";


const OwnerDashboard = () => {
  const navigate = useNavigate()

  function handleRedirect(){
    navigate('/create-student-registration')
  }

  function CreateEducatorRedirect(){
    navigate('/create-educator-registration')
  }

  const ownerName = "Debby Chepkoech";
  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";

  const backgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80";

  const ownedSchools = [
    { id: 1, name: "Shuleni Academy", location: "Nairobi", established: "2010" },
    { id: 2, name: "Bright Future Primary", location: "Mombasa", established: "2015" },
    { id: 3, name: "Excel High School", location: "Kisumu", established: "2018" },
    { id: 4, name: "Summit Learning Center", location: "Eldoret", established: "2020" },
  ];

  const handleEditSchool = (schoolId, schoolName) => {
    console.log(`Edit school with ID: ${schoolId}, Name: ${schoolName}`);
    alert(`(Future Functionality) Navigating to edit page for ${schoolName}`);
  };

  const handleDeleteSchool = (schoolId, schoolName) => {
    if (window.confirm(`Are you sure you want to delete ${schoolName}? This action cannot be undone.`)) {
      console.log(`Delete school with ID: ${schoolId}, Name: ${schoolName}`);
      alert(`(Future Functionality) Deleting ${schoolName}...`);
    }
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
              Dashboard
            </button>
            <button onClick={handleRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage students
            </button>
            <button onClick={CreateEducatorRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage teachers
            </button>
            <button onClick={CreateEducatorRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage schools
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Reports
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Profile
            </button>
            <button className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Log out
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

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={handleRedirect} className="bg-blue-700 text-white p-4 rounded-lg shadow-md hover:bg-blue-800 flex items-center justify-center space-x-2">
                    <FaPlusCircle className="text-2xl" />
                    <span>Add New Student</span>
                </button>
                <button onClick={CreateEducatorRedirect} className="bg-green-700 text-white p-4 rounded-lg shadow-md hover:bg-green-800 flex items-center justify-center space-x-2">
                    <FaChalkboardTeacher className="text-2xl" />
                    <span>Add New Teacher</span>
                </button>
                <button className="bg-indigo-700 text-white p-4 rounded-lg shadow-md hover:bg-indigo-800 flex items-center justify-center space-x-2">
                    <FaClipboardList className="text-2xl" />
                    <span>Generate Report</span>
                </button>
                 <button className="bg-amber-700 text-white p-4 rounded-lg shadow-md hover:bg-amber-800 flex items-center justify-center space-x-2">
                    <FaCalendarAlt className="text-2xl" />
                    <span>View Calendar</span>
                </button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
    
                <span>My Schools ({ownedSchools.length})</span>
            </h2>
            <div className="bg-white shadow rounded-lg p-6">
              {ownedSchools.length === 0 ? (
                <p className="text-gray-600">No schools found. Click 'Add New School' to get started!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedSchools.map(school => (
                    <div key={school.id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{school.name}</h3>
                      <p className="text-gray-600 text-sm">Location: {school.location}</p>
                      <p className="text-gray-600 text-sm mb-3">Est.: {school.established}</p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleEditSchool(school.id, school.name)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center space-x-1"
                        >
                          <FaEdit className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(school.id, school.name)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
               <div className="mt-6 text-center">
                    <button className="bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 flex items-center justify-center space-x-2 mx-auto">
                        <FaPlusCircle className="text-xl" />
                        <span>Add New School</span>
                    </button>
                </div>
            </div>
          </section>

      

      </main>
    </div>
  );
};

export default OwnerDashboard;