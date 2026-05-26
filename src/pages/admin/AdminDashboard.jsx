import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  UserCheck, 
  Target, 
  Award, 
  UserCheck2,
  TrendingUp,
  ArrowUpRight,
  Briefcase,
  Building2,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { initialJobDescriptions } from '../../data/mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jds] = useState(initialJobDescriptions);

  const statsCards = [
    { title: 'Total Job Descriptions', value: '24', change: '+12% this month', icon: FileText, color: 'from-blue-600 to-indigo-600', bgLight: 'bg-brand-blue/10', textAccent: 'text-brand-blue' },
    { title: 'Total Candidates', value: '1,840', change: '+240 parsed recently', icon: Users, color: 'from-purple-600 to-indigo-600', bgLight: 'bg-brand-purple/10', textAccent: 'text-brand-purple' },
    { title: 'Active Recruiters', value: '12', change: '3 internal, 9 agency', icon: Briefcase, color: 'from-emerald-600 to-teal-600', bgLight: 'bg-emerald-50', textAccent: 'text-emerald-600' },
    { title: 'AI Match Accuracy', value: '94.2%', change: '+1.4% engine update', icon: Target, color: 'from-amber-500 to-orange-500', bgLight: 'bg-amber-50', textAccent: 'text-brand-yellow' },
    { title: 'Shortlisted Candidates', value: '228', change: '12.4% conversion', icon: Award, color: 'from-brand-red to-orange-600', bgLight: 'bg-red-50', textAccent: 'text-brand-red' },
    { title: 'Placements Ongoing', value: '42', change: 'Avg 14 days to hire', icon: UserCheck2, color: 'from-sky-600 to-blue-600', bgLight: 'bg-sky-50', textAccent: 'text-sky-600' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Interviewing': return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
      case 'Closed': return 'bg-gray-50 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time platform usage, AI extraction workflows, and team productivity.</p>
        </div>

      </div>

      {/* Top Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{card.title}</span>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 tracking-tight">{card.value}</div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${card.bgLight} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${card.textAccent}`} />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {card.change}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-blue transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* JD Card Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Active Mandates & Job Descriptions</h2>
            <p className="text-xs text-gray-500">Showing auto-matched status from incoming staffing agency resumes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jds.map((jd, index) => (
            <motion.div
              key={jd.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (index * 0.05) }}
              onClick={() => navigate(`/admin/jd/${jd.id}`)}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group cursor-pointer"
            >
              {/* Upper Section */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(jd.status)}`}>
                    {jd.status}
                  </span>
                  <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-lg text-[11px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-yellow" />
                    {jd.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mt-3 group-hover:text-brand-blue transition-colors line-clamp-1">
                  {jd.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    {jd.company}
                  </span>
                  <span>•</span>
                  <span>{jd.experienceRequired}</span>
                </div>

                {/* Progress Bar & Scores */}
                <div className="mt-5 p-3 bg-gray-50/80 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">AI Match Coherence</span>
                    <span className="font-bold text-brand-blue">{jd.matchAccuracy}%</span>
                  </div>
                  {/* Actual Progress Indicators */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500"
                      style={{ width: `${jd.matchAccuracy}%` }}
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Assigned: <strong className="text-gray-700">{jd.recruiterAssigned}</strong></span>
                    <span className="text-emerald-600 font-bold">{jd.matchingResumesCount} Resumes Matched</span>
                  </div>
                </div>
              </div>

              {/* Lower Details Trigger */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {jd.uploadDate}
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:text-brand-blue/90 transition-colors group-hover:translate-x-1 cursor-pointer">
                  View JD Details
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
