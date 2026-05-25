import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react';

const RegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
        <p className="text-gray-600">Start screening resumes 10x faster today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="Jane Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="jane@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="Acme Corp"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-md shadow-brand-blue/20 text-sm font-bold text-white bg-brand-blue hover:bg-blue-800 hover:shadow-lg hover:shadow-brand-blue/30 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 mt-2 cursor-pointer"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button 
          onClick={() => onToggleMode('login')}
          className="font-medium text-brand-blue hover:text-blue-800 cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
