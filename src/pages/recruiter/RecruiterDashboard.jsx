import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Award, 
  Sparkles, 
  Clock, 
  Building2, 
  ChevronRight, 
  Calendar,
  Layers
} from 'lucide-react';
import { initialJobDescriptions, mockCandidates } from '../../data/mockData';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  // Filter JDs to represent those assigned to current logged demo user "Marcus Vance" or similar
  const [assignedJDs] = useState(() => {
    return initialJobDescriptions.slice(0, 4);
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Recruiter Operations Control</h1>
          <p className="text-sm text-gray-500 mt-1">Review active screening pipelines, trigger resume processing, and send shortlisted matches to clients.</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button 
            onClick={() => navigate('/recruiter/upload-jd')}
            className="px-4 py-2.5 bg-white border border-brand-purple/20 text-brand-purple rounded-xl font-bold text-sm hover:bg-brand-purple/10 transition-all shadow-sm"
          >
            Upload Job Post
          </button>
          <button 
            onClick={() => navigate('/recruiter/upload-resume')}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            Bulk Screen Resumes
          </button>
        </div>
      </div>

      {/* Stats summary pipeline overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Assigned Job Posts", count: "4 Active", subtitle: "Parsing workflows enabled", icon: FileText, color: "text-brand-purple", bg: "bg-brand-purple/10" },
          { title: "Candidate Pipeline", count: "112 Intakes", subtitle: "Bulk parsers completed", icon: Users, color: "text-brand-blue", bg: "bg-brand-blue/10" },
          { title: "Shortlisted Total", count: "34 Approved", subtitle: "Ready for client view", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "AI Priority Matches", count: "8 Urgent", subtitle: ">95% skill threshold", icon: Sparkles, color: "text-brand-yellow", bg: "bg-amber-50" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">{item.title}</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1.5">{item.count}</div>
                </div>
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <span className="text-[11px] text-gray-500 block pt-3 border-t border-gray-100 mt-3">{item.subtitle}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Main Assigned JD Cards Grid Viewport */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-purple" />
            Active Job Descriptions & Matching Candidates
          </h2>
          <span className="text-xs font-semibold text-gray-400">Assigned Deadline Boundaries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedJDs.map((jd, idx) => (
            <motion.div
              key={jd.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (idx * 0.05) }}
              onClick={() => navigate(`/recruiter/jd/${jd.id}`)}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-purple/30 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Upper Section */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadge(jd.status)}`}>
                    {jd.status}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: May 30, 2026
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mt-3 group-hover:text-brand-purple transition-colors line-clamp-1">
                  {jd.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    {jd.company}
                  </span>
                  <span>•</span>
                  <span>{jd.experienceRequired}</span>
                </div>

                {/* Score indicators */}
                <div className="mt-5 p-3 bg-brand-purple/5 rounded-xl border border-brand-purple/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">AI Priority Screening Eval</span>
                    <span className="font-bold text-brand-purple">{jd.matchAccuracy}% Coherence</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple rounded-full" style={{ width: `${jd.matchAccuracy}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                    <span>Skills: <strong>{jd.skillsRequired.slice(0, 3).join(', ')}</strong></span>
                    <span className="text-emerald-600 font-bold">{jd.matchingResumesCount} Resumes Parsed</span>
                  </div>
                </div>
              </div>

              {/* Lower execution strip */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                  <strong>3 Hot Matches</strong> auto-tagged
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-brand-purple group-hover:translate-x-1 transition-transform">
                  Screen Resumes
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suggested Candidate Pipeline spot */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            AI Priority Matching Candidates Spotlight
          </h3>
          <p className="text-xs text-gray-500">Auto-extracted intakes clearing your standard technical baseline parameters.</p>
        </div>

        <div className="divide-y divide-gray-100 border-t border-gray-100 pt-2">
          {mockCandidates.slice(0, 3).map((c) => (
            <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 px-2 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple font-bold flex items-center justify-center flex-shrink-0 border border-brand-purple/20">
                  {c.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{c.name}</h4>
                  <p className="text-xs text-gray-400">{c.currentRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between sm:justify-end">
                <div className="text-right">
                  <span className="text-xs font-bold text-brand-purple block">{c.match}% Fit</span>
                  <span className="text-[10px] text-gray-400 block">{c.resumeScore} ATS Eval</span>
                </div>
                <button 
                  onClick={() => navigate(`/recruiter/jd/${c.jdId}`)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-brand-purple/10 hover:text-brand-purple border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-all"
                >
                  Review Application
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
