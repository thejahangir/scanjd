import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPasswordForm = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="mb-6">
        <button 
          onClick={() => onToggleMode('login')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset password</h2>
        <p className="text-gray-600">Enter your email and we'll send you a reset link</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-md shadow-brand-blue/20 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/30 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 mt-2 cursor-pointer"
          >
            Send reset link
            <Send className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Check your email</h3>
          <p className="text-sm text-gray-600 mb-6">
            We've sent a password reset link to <span className="font-semibold text-gray-800">{email}</span>.
          </p>
          <button
            onClick={() => onToggleMode('login')}
            className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all cursor-pointer"
          >
            Return to login
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ForgotPasswordForm;
