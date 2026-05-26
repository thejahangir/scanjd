import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  HelpCircle,
  X
} from 'lucide-react';
import { initialJobDescriptions, mockCandidates } from '../../data/mockData';

const JDDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCandidatesTab = searchParams.get('tab') === 'candidates';

  // Load JD and candidate state
  const jd = useMemo(() => {
    return initialJobDescriptions.find(item => item.id === (id || "JD-2026-001")) || initialJobDescriptions[0];
  }, [id]);

  // Synchronize document page title
  useEffect(() => {
    if (isCandidatesTab) {
      document.title = "List of Candidates | ScanJD";
    } else {
      document.title = `${jd.title} | ScanJD`;
    }
  }, [isCandidatesTab, jd.title]);

  const [candidates, setCandidates] = useState(() => {
    // filter candidate set mapped to this JD or fallback
    const filtered = mockCandidates.filter(c => c.jdId === jd.id);
    return filtered.length > 0 ? filtered : mockCandidates;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('MATCH_DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Selected Candidate for preview panel drawer
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

  // Table filtering and sorting execution
  const processedCandidates = useMemo(() => {
    let result = [...candidates];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.skillsMatch.some(s => s.toLowerCase().includes(q)) ||
        c.status.toLowerCase().includes(q)
      );
    }

    // Status Filter
    if (statusFilter !== 'ALL') {
      result = result.filter(c => c.status.toUpperCase() === statusFilter.toUpperCase());
    }

    // Sort By Match %
    if (sortBy === 'MATCH_DESC') {
      result.sort((a, b) => b.match - a.match);
    } else if (sortBy === 'MATCH_ASC') {
      result.sort((a, b) => a.match - b.match);
    }

    return result;
  }, [candidates, searchQuery, statusFilter, sortBy]);

  // Pagination bounds
  const totalPages = Math.ceil(processedCandidates.length / itemsPerPage) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedCandidates.slice(start, start + itemsPerPage);
  }, [processedCandidates, currentPage]);

  const handleShortlistToggle = (candidateId) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        const nextStatus = c.status === 'Shortlisted' ? 'Screening' : 'Shortlisted';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    // Also update current active candidate view if changed
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => ({
        ...prev,
        status: prev.status === 'Shortlisted' ? 'Screening' : 'Shortlisted'
      }));
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Shortlisted': 
        return <span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-lg text-xs font-bold">Shortlisted</span>;
      case 'Interview Scheduled': 
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">Interviewing</span>;
      case 'Rejected': 
        return <span className="px-2.5 py-1 bg-red-50 text-brand-red border border-red-200 rounded-lg text-xs font-bold">Rejected</span>;
      default: 
        return <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-lg text-xs font-bold">Screening</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Back Action & Title banner */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">{isCandidatesTab ? "Active Talent Pool" : jd.id}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{isCandidatesTab ? "All Assigned Recruiters" : `Uploaded ${jd.uploadDate}`}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isCandidatesTab ? "List of Candidates" : jd.title}
            </h1>
          </div>
        </div>

        <button 
          onClick={() => navigate('/admin/jds')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-brand-blue" />
          Back to JD List
        </button>
      </div>



      {/* Main Grid Viewport: Split Layout between Table and Insights/Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Span: Matching Resume Table Component */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Filter candidate name or skill..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Status selection */}
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none"
                >
                  <option value="ALL">All Status</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Screening">Screening</option>
                  <option value="Rejected">Rejected</option>
                </select>

                {/* Sorting parameter */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none"
                >
                  <option value="MATCH_DESC">Sort: Top Match %</option>
                  <option value="MATCH_ASC">Sort: Lowest Match</option>
                </select>
              </div>
            </div>

            {/* Actual Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="p-4 pl-6">Candidate</th>
                    <th className="p-4">AI Coherence</th>
                    <th className="p-4">Skills Extracted</th>
                    <th className="p-4">Exp</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {paginatedCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-400">
                        No parsed candidates match the targeted filtering boundaries.
                      </td>
                    </tr>
                  ) : (
                    paginatedCandidates.map((c) => {
                      const isSelected = selectedCandidate?.id === c.id;
                      return (
                        <tr 
                          key={c.id}
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsPreviewOpen(true);
                          }}
                          className={`hover:bg-brand-blue/5 cursor-pointer transition-colors ${isSelected ? 'bg-brand-blue/10 shadow-sm' : ''}`}
                        >
                          <td className="p-4 pl-6 font-semibold text-gray-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 font-bold text-brand-blue flex items-center justify-center flex-shrink-0">
                                {c.initials}
                              </div>
                              <div>
                                <div className="text-gray-900 font-bold leading-tight">{c.name}</div>
                                <div className="text-[11px] text-gray-400 font-normal">{c.resumeScore} ATS Eval</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-bold">
                            <span className="text-brand-blue flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-brand-yellow" />
                              {c.match}%
                            </span>
                          </td>

                          <td className="p-4 max-w-xs">
                            <div className="flex flex-wrap gap-1">
                              {c.skillsMatch.slice(0, 2).map(s => (
                                <span key={s} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] font-semibold text-gray-600">
                                  {s}
                                </span>
                              ))}
                              {c.skillsMatch.length > 2 && (
                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500">
                                  +{c.skillsMatch.length - 2}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-4 text-gray-600 font-medium">{c.experience}</td>

                          <td className="p-4">{getStatusBadge(c.status)}</td>

                          <td className="p-4 pr-6 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleShortlistToggle(c.id)}
                              title={c.status === 'Shortlisted' ? 'Remove shortlist' : 'Shortlist candidate'}
                              className={`p-1.5 rounded-lg border transition-all ${
                                c.status === 'Shortlisted' 
                                  ? 'bg-brand-purple text-white border-brand-purple' 
                                  : 'bg-white hover:bg-gray-50 text-gray-400 border-gray-200 hover:text-brand-purple'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => alert(`Simulated file processing: Downloading raw PDF payload for ${c.name}`)}
                              title="Download ATS parsed CV"
                              className="p-1.5 bg-white hover:bg-gray-50 text-gray-400 hover:text-brand-blue border border-gray-200 rounded-lg transition-all"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCandidate(c);
                                setIsPreviewOpen(true);
                              }}
                              title="Inspect full parsed report"
                              className="p-1.5 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg transition-all"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedCandidates.length)} of {processedCandidates.length} entries
              </div>
              <div className="flex items-center gap-1">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="p-1 border border-gray-200 rounded disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-bold text-gray-700">Page {currentPage} of {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="p-1 border border-gray-200 rounded disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>


        </div>

        {/* Right Span: Dynamic Resume Preview & Analysis Side-Panel */}
        <AnimatePresence>
          {isPreviewOpen && selectedCandidate ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 sticky top-20"
            >
              {/* Header preview drawer */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-blue uppercase">Profile Deep Dive</span>
                    <span className="px-2 py-0.5 bg-brand-yellow/10 text-brand-yellow font-bold text-[10px] rounded">
                      {selectedCandidate.match}% Match
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedCandidate.name}</h3>
                  <p className="text-xs text-gray-500">{selectedCandidate.currentRole}</p>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* AI Recommendation Summary Block */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> AI Engine Summary Recommendation
                </span>
                <div className="p-3 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 border border-brand-blue/20 rounded-xl text-xs text-gray-700 leading-relaxed italic">
                  "{selectedCandidate.aiRecommendation}"
                </div>
              </div>

              {/* Detailed Extracted Metrics */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-gray-500 block mb-1.5">Skills Extracted & Verified:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skillsMatch.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCandidate.missingSkills.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-500 block mb-1.5">Required Skills Missing:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.missingSkills.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-red-50 text-brand-red border border-red-100 rounded-md font-semibold flex items-center gap-1 text-[11px]">
                          <XCircle className="w-3 h-3 text-brand-red" /> {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{selectedCandidate.skillGapText}</p>
                  </div>
                )}

                {/* Suggested Interview Prep Questions */}
                {selectedCandidate.interviewQuestions.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <span className="font-bold text-gray-700 block flex items-center gap-1 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 text-brand-blue" /> Suggested Live Screening Topics
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-gray-600 list-disc pl-4">
                      {selectedCandidate.interviewQuestions.map((q, i) => (
                        <li key={i} className="leading-tight">{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action items bar */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleShortlistToggle(selectedCandidate.id)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs text-center border transition-all ${
                    selectedCandidate.status === 'Shortlisted'
                      ? 'bg-brand-purple text-white border-brand-purple shadow-sm shadow-brand-purple/20'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {selectedCandidate.status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                </button>
                <button 
                  onClick={() => alert(`Simulated API call: Executing shareable PDF bundle view for ${selectedCandidate.name}`)}
                  className="py-2 px-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-brand-blue/20 flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" /> Full CV
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-xs">
              Click on any candidate row to preview comprehensive parsing calculations and resume scores.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JDDetailsPage;
