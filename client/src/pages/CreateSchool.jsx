import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, MapPin, FileText, Building } from 'lucide-react';
import axios from '../api/axios';

const CreateSchool = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: ''
  });

  const schoolName = "Shuleni Academy";
  const schoolLogo = "/logo.png";

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function DashboardRedirect(){
    navigate('/owner-dashboard')
  }

  function EducatorRedirect(){
    navigate('/create-educator-registration')
  }

  function StudentRedirect(){
    navigate('/create-student-registration')
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/create-school', formData, {
        withCredentials: true, // needed if using cookies for JWT
      });

      // Capture the data returned from the server
      const { message, school_id, school_name, description, address } = response.data;
      
      // Display the important information to the user
      alert(`${message}\n\nSchool ID: ${school_id}\nSchool Name: ${school_name}\nDescription: ${description || 'N/A'}\nAddress: ${address || 'N/A'}`);
      
      // You could also store this data in state if you want to display it in the UI
      console.log('School created:', {
        message,
        school_id,
        school_name,
        description,
        address
      });

      setFormData({
        name: '',
        description: '',
        address: ''
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'School creation failed');
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
            <button onClick={DashboardRedirect} className="block w-full text-left px-3 py-2 rounded text-indigo-700 bg-indigo-100 font-medium">
              Dashboard
            </button>
            <button onClick={StudentRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              Manage students
            </button>
            <button onClick={EducatorRedirect} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
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
            <Building className="mx-auto h-12 w-12 text-indigo-500 mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Create New School</h2>
            <p className="text-gray-600">Add a school to the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: 'School Name',
                name: 'name',
                icon: <School />,
                type: 'text',
                placeholder: 'Enter school name',
              },
              {
                label: 'Description (Optional)',
                name: 'description',
                icon: <FileText />,
                type: 'textarea',
                placeholder: 'Enter school description',
              },
              {
                label: 'Address (Optional)',
                name: 'address',
                icon: <MapPin />,
                type: 'text',
                placeholder: 'Enter school address',
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
                  {type === 'textarea' ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={placeholder}
                      rows={4}
                      required={name === 'name'}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={placeholder}
                      required={name === 'name'}
                    />
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating School...' : 'Create School'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSchool;
