import { motion } from 'framer-motion';
import { ArrowRight, Play, Upload, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
        <img src="/hero-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-red/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-medium text-sm mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse"></span>
            ScanJD AI Engine 2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            AI-Powered Resume Screening for <br className="hidden md:block" />
            <span className="text-gradient">Modern Recruiters</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Scan resumes against job descriptions instantly, shortlist smarter candidates, and save hours of manual screening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-blue text-white font-medium text-lg hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-700 border border-gray-200 font-medium text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                <Play className="w-4 h-4 text-gray-600 group-hover:text-brand-blue" fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8 text-sm text-gray-500 font-medium"
          >
            {/* <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> 14-day free trial
            </div> */}
          </motion.div>
        </div>

        {/* Dashboard Preview / Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-primary rounded-[2rem] blur-2xl opacity-20 transform -translate-y-4 scale-105"></div>
          <div className="relative glass-card rounded-[2rem] p-4 md:p-6 shadow-2xl border border-white/40 overflow-hidden">
            {/* Browser top bar mock */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
              {/* Fake UI Left panel */}
              <div className="flex-1 space-y-4">
                <div className="h-40 border-2 border-dashed border-brand-blue/30 rounded-xl bg-brand-blue/5 flex flex-col items-center justify-center text-brand-blue/70 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-brand-blue/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="font-medium text-sm">Drag & Drop Resumes (PDF, DOCX)</span>
                  <span className="text-xs opacity-70">or click to browse</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Scanning Progress</span>
                    <span className="text-brand-blue font-bold">85%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gradient-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Fake UI Right panel (Results) */}
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Top Matches
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Jenkins', role: 'Senior Frontend Dev', match: 98 },
                    { name: 'Michael Chen', role: 'Frontend Engineer', match: 94 },
                    { name: 'Emily Rodriguez', role: 'React Developer', match: 89 },
                  ].map((candidate, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 + (i * 0.2) }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white shadow-sm flex items-center justify-center font-bold text-brand-blue">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{candidate.name}</p>
                          <p className="text-xs text-gray-500">{candidate.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 font-bold text-xs border border-green-100">
                          {candidate.match}% Match
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Animated scanning line effect overlay */}
            <motion.div 
              animate={{ 
                top: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 4, 
                ease: "linear", 
                repeat: Infinity 
              }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent pointer-events-none z-10 border-b border-brand-blue/20 shadow-[0_4px_20px_rgba(0,133,247,0.1)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
