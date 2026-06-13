import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Building2, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Calendar,
  SlidersHorizontal
} from 'lucide-react';
import { extendedJDs } from '../../data/mockData';

const parseUploadDate = (dateStr) => {
  if (!dateStr) return 0;
  const now = new Date();
  const str = dateStr.toLowerCase().trim();
  
  if (str === 'just now') {
    return now.getTime();
  }
  if (str.includes('hour')) {
    const hours = parseInt(str) || 1;
    return now.getTime() - hours * 60 * 60 * 1000;
  }
  if (str.includes('yesterday')) {
    return now.getTime() - 24 * 60 * 60 * 1000;
  }
  if (str.includes('day')) {
    const days = parseInt(str) || 1;
    return now.getTime() - days * 24 * 60 * 60 * 1000;
  }
  if (str.includes('week')) {
    const weeks = parseInt(str) || 1;
    return now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000;
  }
  if (str.includes('month')) {
    const months = parseInt(str) || 1;
    return now.getTime() - months * 30 * 24 * 60 * 60 * 1000;
  }
  
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    return parsed;
  }
  return 0;
};

const RecruiterJDsPage = () => {
  const navigate = useNavigate();
  // Representing mandates accessible or assigned to recruiter operations
  const [jds] = useState(extendedJDs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredJDs = useMemo(() => {
    let result = jds.filter(jd => {
      const matchesSearch = jd.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            jd.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            jd.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'ALL' || jd.status.toUpperCase() === statusFilter.toUpperCase();
      
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => parseUploadDate(b.uploadDate) - parseUploadDate(a.uploadDate));
    return result;
  }, [jds, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">List of Job Description</h1>
          <p className="text-sm text-gray-500 mt-1">Select an assigned mandate to evaluate automated resume scores, skills extracted, and shortlist workflows.</p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search titles, target entities, or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <span>Filter Status:</span>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Assigned ({jds.length})</option>
            <option value="Active">Active</option>
            <option value="Reviewing">Reviewing</option>
          </select>
        </div>
      </div>

      {/* Grid listing array */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJDs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400 text-xs bg-white border border-gray-200 rounded-2xl">
            No mapped mandate aligns with the typed token parameters.
          </div>
        ) : (
          filteredJDs.map((jd, idx) => (
            <motion.div
              key={jd.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/recruiter/jd/${jd.id}`)}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-purple/30 transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadge(jd.status)}`}>
                    {jd.status}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    Target: May 2026
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
                  <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{jd.id}</span>
                  <span>•</span>
                  <span>{jd.experienceRequired}</span>
                </div>

                {/* Score weights */}
                <div className="mt-4 p-3 bg-brand-purple/5 rounded-xl border border-brand-purple/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">AI Match Score</span>
                    <span className="font-bold text-brand-purple">{jd.matchAccuracy}% Coherence</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple rounded-full" style={{ width: `${jd.matchAccuracy}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                    <span className="truncate max-w-[140px]">Skills: <strong>{jd.skillsRequired.slice(0, 2).join(', ')}</strong></span>
                    <span className="text-emerald-600 font-bold flex-shrink-0">{jd.matchingResumesCount} Resumes</span>
                  </div>
                </div>
              </div>

              {/* Lower execution link */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {jd.uploadDate}
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-brand-purple group-hover:translate-x-1 transition-transform cursor-pointer">
                  View JD Details
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecruiterJDsPage;
