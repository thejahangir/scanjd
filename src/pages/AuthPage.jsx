import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileSearch, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import Logo from '../assets/scanjd-logo.png'

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot_password'
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-white">
        {/* Header */}
        <div className="p-8">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer w-max"
          >
            {/* <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <FileSearch className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Scan<span className="text-brand-blue">JD</span>
            </span> */}
            <img src={Logo} alt="ScanJD Logo" className='logo-scanjd' />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24">
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <LoginForm key="login" onToggleMode={setAuthMode} />
            )}
            {authMode === 'register' && (
              <RegisterForm key="register" onToggleMode={setAuthMode} />
            )}
            {authMode === 'forgot_password' && (
              <ForgotPasswordForm key="forgot_password" onToggleMode={setAuthMode} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Illustration/Marketing (Split Layout) */}
      {/* Right Column: Illustration/Marketing (Split Layout) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Background Decor */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-gray-900" />
          <img src="/auth-merged-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-purple/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-red/20 blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            The intelligent way to discover your next great hire.
          </h2>
          <div className="space-y-4">
            {[
              "Reduce manual screening time by 80%",
              "Identify top talent instantly with AI matching",
              "Share shortlisted candidates securely with clients",
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-3 text-blue-50"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard floating mockup piece */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl mt-12"
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <div>
              <div className="text-white font-bold">Top Match: Sarah Jenkins</div>
              <div className="text-blue-200 text-sm">Senior Frontend Developer</div>
            </div>
            <div className="bg-green-500/20 border border-green-400/30 text-green-300 px-3 py-1 rounded-lg font-bold">
              98% Match
            </div>
          </div>
          <div className="flex gap-2">
            {['React', 'TypeScript', 'Tailwind'].map(skill => (
              <span key={skill} className="bg-white/5 text-blue-100 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
