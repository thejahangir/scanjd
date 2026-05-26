import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else if (email.toLowerCase().includes('recruiter')) {
      navigate('/recruiter');
    } else {
      // Default to admin panel for demo exploration
      navigate('/admin');
    }
  };

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@scanjd.com');
      setPassword('adminpassword123');
    } else {
      setEmail('recruiter@scanjd.com');
      setPassword('recruiterpass123');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-600">Enter your credentials to access your dashboard</p>
      </div>

      {/* Quick Demo Pre-fill helpers */}
      <div className="mb-6 p-3 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex flex-col gap-2">
        <div className="text-xs font-semibold text-brand-blue uppercase tracking-wider text-center">
          Quick Demo Access
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemo('admin')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-xs font-medium text-gray-700 hover:text-brand-blue transition-all shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            Admin Login
          </button>
          <button
            type="button"
            onClick={() => fillDemo('recruiter')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-brand-purple/10 border border-brand-purple/20 rounded-lg text-xs font-medium text-gray-700 hover:text-brand-purple transition-all shadow-sm cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-purple" />
            Recruiter Login
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <button 
              type="button" 
              onClick={() => onToggleMode('forgot_password')}
              className="text-sm font-semibold text-brand-blue hover:text-brand-blue/90 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all duration-200 outline-none shadow-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-md shadow-brand-blue/20 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/30 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 mt-2 cursor-pointer"
        >
          Sign in
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button 
          onClick={() => onToggleMode('register')}
          className="font-medium text-brand-blue hover:text-brand-blue/90 cursor-pointer"
        >
          Request access
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;
