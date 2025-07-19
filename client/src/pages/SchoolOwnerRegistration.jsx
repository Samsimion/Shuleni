import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Mail, School, User } from 'lucide-react';
import axios from '../api/axios';

const SchoolOwnerRegistration = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    school_name: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('/register/owner', formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <School className="mx-auto h-12 w-12 text-blue-500 mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Create Your School</h2>
        <p className="text-gray-600">Register as a school owner to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: 'Full Name',
            name: 'full_name',
            icon: <User />,
            type: 'text',
            placeholder: 'Enter your full name',
          },
          {
            label: 'Email Address',
            name: 'email',
            icon: <Mail />,
            type: 'email',
            placeholder: 'Enter your email',
          },
          {
            label: 'Password',
            name: 'password',
            icon: <Lock />,
            type: 'password',
            placeholder: 'Create a password',
          },
          {
            label: 'School Name',
            name: 'school_name',
            icon: <BookOpen />,
            type: 'text',
            placeholder: 'Enter your school name',
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
                required
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Brief description of your school"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Creating School...' : 'Create School'}
        </button>
      </form>
    </div>
  );
};

export default SchoolOwnerRegistration;
