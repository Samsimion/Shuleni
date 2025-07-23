import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../api/axios';
import { FaUserGraduate, FaChalkboardTeacher, FaPlusCircle, FaTrash, FaUsers, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from '../common/Sidebar';

const ClassManagement = () => {
  const { schoolId, classId } = useParams();
  const navigate = useNavigate();

  const [schoolData, setSchoolData] = useState({
    school: {},
    classes: [],
    unassigned_students: [],
    unassigned_teachers: [],
    stats: {}
  });
  const [currentClass, setCurrentClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [selectedTeachers, setSelectedTeachers] = useState(new Set());
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetchSchoolData();
  }, [schoolId]);

  const fetchSchoolData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/schools/${schoolId}/details`);
      setSchoolData(response.data);
      
      // Find current class if classId is provided
      if (classId && classId !== 'new') {
        const currentClassData = response.data.classes.find(c => c.id === parseInt(classId));
        setCurrentClass(currentClassData);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching school details:', err);
      setError(err.message || 'Failed to load school details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName.trim()) {
      setError('Class name is required');
      return;
    }

    try {
      const response = await api.post(`/schools/${schoolId}/classes`, {
        name: newClassName
      });
      
      setSuccessMessage('Class created successfully!');
      setNewClassName('');
      setShowCreateClass(false);
      await fetchSchoolData(); // Refresh data
    } catch (err) {
      setError(err.message || 'Failed to create class');
    }
  };

  const handleAssignUsers = async (userIds, role) => {
    if (!currentClass || userIds.length === 0) return;

    try {
      const response = await api.post(`/schools/${schoolId}/classes/${currentClass.id}/assignments`, {
        user_ids: Array.from(userIds),
        role: role
      });

      setSuccessMessage(`Successfully assigned ${userIds.size} ${role}s to ${currentClass.name}`);
      
      // Clear selections
      if (role === 'student') {
        setSelectedStudents(new Set());
      } else {
        setSelectedTeachers(new Set());
      }
      
      await fetchSchoolData(); // Refresh data
    } catch (err) {
      setError(err.message || 'Failed to assign users');
    }
  };

  const handleRemoveUser = async (userId) => {
    if (!currentClass) return;

    try {
      await api.delete(`/schools/${schoolId}/classes/${currentClass.id}/assignments`, {
        data: { user_ids: [userId] }
      });

      setSuccessMessage('User removed from class successfully');
      await fetchSchoolData(); // Refresh data
    } catch (err) {
      setError(err.message || 'Failed to remove user');
    }
  };

  const toggleStudentSelection = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const toggleTeacherSelection = (teacherId) => {
    const newSelected = new Set(selectedTeachers);
    if (newSelected.has(teacherId)) {
      newSelected.delete(teacherId);
    } else {
      newSelected.add(teacherId);
    }
    setSelectedTeachers(newSelected);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading class management...</span>
      </div>
    );
  }

  const backgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80";

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

      <Sidebar />

      <main className="flex-1 p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {currentClass ? `Manage ${currentClass.name}` : `Manage Classes - ${schoolData.school.name}`}
            </h1>
            {currentClass && (
              <p className="text-gray-600 mt-2">
                Students: {currentClass.total_students} | Teachers: {currentClass.total_teachers}
              </p>
            )}
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => setShowCreateClass(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create New Class
            </button>
            <button 
              onClick={() => navigate(`/school/${schoolId}/details`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to School
            </button>
          </div>
        </header>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
            <button 
              onClick={() => setSuccessMessage('')}
              className="float-right text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Create Class Modal */}
        {showCreateClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Create New Class</h3>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Enter class name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowCreateClass(false);
                    setNewClassName('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateClass}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Class Selection */}
        {!currentClass && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Class to Manage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolData.classes.map(classItem => (
                <div key={classItem.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                     onClick={() => navigate(`/school/${schoolId}/class/${classItem.id}/manage`)}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{classItem.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Students: {classItem.total_students}</p>
                  <p className="text-gray-600 text-sm">Teachers: {classItem.total_teachers}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Current Class Management */}
        {currentClass && (
          <>
            {/* Current Class Members */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Current Students */}
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaUserGraduate className="text-blue-500 mr-2" />
                  Students in {currentClass.name} ({currentClass.students?.length || 0})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentClass.students?.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{student.full_name}</p>
                        <p className="text-sm text-gray-500">{student.admission_number}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveUser(student.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Current Teachers */}
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaChalkboardTeacher className="text-green-500 mr-2" />
                  Teachers in {currentClass.name} ({currentClass.teachers?.length || 0})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentClass.teachers?.map(teacher => (
                    <div key={teacher.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{teacher.full_name}</p>
                        <p className="text-sm text-gray-500">{teacher.tsc_number}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveUser(teacher.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Assignment Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Unassigned Students */}
              <section className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaUserGraduate className="text-blue-500 mr-2" />
                    Unassigned Students ({schoolData.unassigned_students.length})
                  </h3>
                  {selectedStudents.size > 0 && (
                    <button
                      onClick={() => handleAssignUsers(selectedStudents, 'student')}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                      Assign Selected ({selectedStudents.size})
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {schoolData.unassigned_students.map(student => (
                    <div key={student.id} className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{student.full_name}</p>
                        <p className="text-sm text-gray-500">
                          {student.admission_number} • Grade: {student.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Unassigned Teachers */}
              <section className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaChalkboardTeacher className="text-green-500 mr-2" />
                    Unassigned Teachers ({schoolData.unassigned_teachers.length})
                  </h3>
                  {selectedTeachers.size > 0 && (
                    <button
                      onClick={() => handleAssignUsers(selectedTeachers, 'educator')}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                    >
                      Assign Selected ({selectedTeachers.size})
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {schoolData.unassigned_teachers.map(teacher => (
                    <div key={teacher.id} className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedTeachers.has(teacher.id)}
                        onChange={() => toggleTeacherSelection(teacher.id)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{teacher.full_name}</p>
                        <p className="text-sm text-gray-500">TSC: {teacher.tsc_number}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
        </div>
      </main>
    </div>
  );
};

export default ClassManagement;
