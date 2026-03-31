import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid = formData.name.trim() && isEmailValid && formData.password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: null // Enforce generic blank setup interceptor
      });
      addToast('Account created successfully!', 'success');
      navigate('/select-role'); // Shift explicitly to role setup step
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center"
      >
        <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Create an account</h2>
        <p className="text-[#a1a1aa] text-lg">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white hover:text-blue-400 transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#111111] py-10 px-4 shadow-2xl border border-[#1f1f1f] sm:rounded-3xl sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            
            <Input
              label="Full Name"
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email address"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <div>
              <Button type="submit" className="w-full py-3.5 text-base shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !isFormValid}>
                {loading ? 'Creating account...' : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign up
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-[#a1a1aa] text-center mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
