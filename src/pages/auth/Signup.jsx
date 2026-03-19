import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Briefcase } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await signup(formData);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.message || 'Failed to signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-600 p-2 rounded-xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 text-sm">Join InternConnect to find or post opportunities.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-100 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-4 mb-6">
            <label className={`flex-1 py-3 px-4 rounded-xl border-2 cursor-pointer text-center text-sm font-medium transition-colors ${formData.role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="role" 
                value="student" 
                className="hidden" 
                checked={formData.role === 'student'} 
                onChange={handleChange} 
              />
              Student
            </label>
            <label className={`flex-1 py-3 px-4 rounded-xl border-2 cursor-pointer text-center text-sm font-medium transition-colors ${formData.role === 'company' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="role" 
                value="company" 
                className="hidden" 
                checked={formData.role === 'company'} 
                onChange={handleChange} 
              />
              Company
            </label>
          </div>

          <Input
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />

          {formData.role === 'company' && (
             <Input
               label="Company Name"
               name="companyName"
               required
               value={formData.companyName}
               onChange={handleChange}
               placeholder="TechCorp Innovations"
             />
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
          />

          <Button type="submit" className="w-full py-2.5 mt-2" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
