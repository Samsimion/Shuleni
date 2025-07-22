import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, School } from 'lucide-react';
import axios from '../api/axios';

const CreateEducatorRegistration = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    school_email: '',
    tsc_number: '',
    class_id: '',
  });

  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function DashboardRedirect(){
    navigate('/owner-dashboard')
  }

  function StudentCreatorRedirect(){
    navigate('/create-student-registration')
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const cleanFormData = {
      ...formData,
      class_id: formData.class_id === '' ? null : parseInt(formData.class_id, 10),
    };

    try {
      const response = await axios.post('/admin/create-educator', cleanFormData, {
        withCredentials: true, // needed if using cookies for JWT
      });

      // Capture the data returned from the server
      const { message, school_email, temporary_password, teacher_id } = response.data;
      
      // Display the important information to the user
      alert(`${message}\n\nSchool Email: ${school_email}\nTemporary Password: ${temporary_password}\nTeacher ID: ${teacher_id}`);
      
      // You could also store this data in state if you want to display it in the UI
      console.log('Educator created:', {
        message,
        school_email,
        temporary_password,
        teacher_id
      });

      setFormData({
        full_name: '',
        school_email: '',
        tsc_number: '',
        class_id: '',
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Educator creation failed');
    } finally {
      navigate('/owner-dashboard');  
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
            <button onClick={DashboardRedirect} className="block w-full text-left px-3 py-2 rounded text-blue-700 bg-blue-100 font-medium">
              Dashboard
            </button>
            <button onClick={StudentCreatorRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
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
      

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <User className="mx-auto h-12 w-12 text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Create New Educator</h2>
            <p className="text-gray-600">Add an educator to your school system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: 'Full Name',
                name: 'full_name',
                icon: <User />,
                type: 'text',
                placeholder: 'Enter full name',
              },
              {
                label: 'School Email',
                name: 'school_email',
                icon: <Mail />,
                type: 'email',
                placeholder: 'Enter school email',
              },
              {
                label: 'TSC Number',
                name: 'tsc_number',
                icon: <Shield />,
                type: 'text',
                placeholder: 'Enter TSC number',
              },
              {
                label: 'Class ID (Optional)',
                name: 'class_id',
                icon: <School />,
                type: 'text',
                placeholder: 'Enter class ID',
              },
            ].map(({ label, name, icon, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  {icon && (
                    <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                      {icon}
                    </span>
                  )}
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    required={name === 'full_name' || name === 'school_email' || name === 'tsc_number'}
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Educator...' : 'Create Educator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEducatorRegistration;
