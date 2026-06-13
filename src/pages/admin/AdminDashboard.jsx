import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Target, 
  Award, 
  UserCheck2,
  TrendingUp,
  ArrowUpRight,
  Briefcase,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { mockRecruiters, mockAnalytics } from '../../data/mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const statsCards = [
    { title: 'Total Job Descriptions', value: '24', change: '+12% this month', icon: FileText, color: 'from-blue-600 to-indigo-600', bgLight: 'bg-brand-blue/10', textAccent: 'text-brand-blue', path: '/admin/jds' },
    { title: 'Total Candidates', value: '1,840', change: '+240 parsed recently', icon: Users, color: 'from-purple-600 to-indigo-600', bgLight: 'bg-brand-purple/10', textAccent: 'text-brand-purple', path: '/admin/candidates' },
    { title: 'Active Recruiters', value: '12', change: '3 internal, 9 agency', icon: Briefcase, color: 'from-emerald-600 to-teal-600', bgLight: 'bg-emerald-50', textAccent: 'text-emerald-600', path: '/admin/recruiters' },
    { title: 'AI Match Accuracy', value: '94.2%', change: '+1.4% engine update', icon: Target, color: 'from-amber-500 to-orange-500', bgLight: 'bg-amber-50', textAccent: 'text-brand-yellow', path: '/admin/analytics' },
    { title: 'Shortlisted Candidates', value: '228', change: '12.4% conversion', icon: Award, color: 'from-brand-red to-orange-600', bgLight: 'bg-red-50', textAccent: 'text-brand-red', path: '/admin/candidates' },
    { title: 'Placements Ongoing', value: '42', change: 'Avg 14 days to hire', icon: UserCheck2, color: 'from-sky-600 to-blue-600', bgLight: 'bg-sky-50', textAccent: 'text-sky-600', path: '/admin/analytics' },
  ];

  const funnelData = mockAnalytics.YTD.funnelData;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time platform overview — hiring progress and team performance.</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => navigate('/admin/upload-resume')}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            Bulk Screen Resumes
          </button>
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
              onClick={() => navigate(card.path)}
              className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
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

      {/* Bottom Section: Recruiter table (left 2/3) + Funnel (right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recruiter Performance Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 h-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Recruiter Performance</h2>
                <p className="text-xs text-gray-500 mt-0.5">Active jobs, shortlists, and placement success per recruiter.</p>
              </div>
              <button
                onClick={() => navigate('/admin/recruiters')}
                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Recruiter</th>
                    <th className="px-4 py-3 text-center">Active Jobs</th>
                    <th className="px-4 py-3 text-center">Shortlisted</th>
                    <th className="px-4 py-3 text-center">Placement Rate</th>
                    <th className="px-4 py-3">Efficiency</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {mockRecruiters.map((recruiter) => (
                    <tr key={recruiter.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 text-brand-blue font-extrabold text-[10px] flex items-center justify-center">
                            {recruiter.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 leading-tight">{recruiter.name}</div>
                            <div className="text-[10px] text-gray-400">{recruiter.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center font-bold text-gray-700">{recruiter.activeJDs}</td>
                      <td className="px-4 py-3.5 text-center font-extrabold text-brand-purple">{recruiter.shortlistedTotal}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-bold">
                          {recruiter.placementRate}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
                              style={{ width: `${recruiter.efficiencyScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-gray-700 text-[10px]">{recruiter.efficiencyScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                          recruiter.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {recruiter.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Candidate Hiring Journey Funnel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Candidate Hiring Journey</h2>
              <p className="text-xs text-gray-500 mt-0.5">YTD progress from resume upload to placement.</p>
            </div>
            <button
              onClick={() => navigate('/admin/analytics')}
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              Details <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {funnelData.map((stage, idx) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.07 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-600 leading-tight">{stage.stage}</span>
                  <span className="text-gray-900 font-extrabold tabular-nums">
                    {stage.count.toLocaleString()} <span className="text-gray-400 font-normal">({stage.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ delay: 0.4 + idx * 0.07, type: 'spring', stiffness: 80, damping: 14 }}
                    className={`h-full ${stage.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Overall conversion</span>
            <span className="font-extrabold text-brand-red">1.7% placement rate</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
