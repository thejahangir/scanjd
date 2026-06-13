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
  X,
  Building2
} from 'lucide-react';
import { extendedJDs, mockCandidates, mockRecruiters } from '../../data/mockData';

const JDDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCandidatesTab = searchParams.get('tab') === 'candidates';

  // Load JD and candidate state
  const [jd, setJd] = useState(() => {
    return extendedJDs.find(item => item.id === (id || "JD-UX2026-001")) || extendedJDs[0];
  });
  
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Keep state in sync if id changes
  useEffect(() => {
    const currentJD = extendedJDs.find(item => item.id === (id || "JD-UX2026-001")) || extendedJDs[0];
    setJd(currentJD);
    
    // Also sync candidates mapping
    const filtered = mockCandidates.filter(c => c.jdId === currentJD.id);
    setCandidates(filtered);
  }, [id]);

  const handleUpdateRecruiter = (newRecruiter) => {
    const jdIndex = extendedJDs.findIndex(j => j.id === jd.id);
    if (jdIndex !== -1) {
      extendedJDs[jdIndex].recruiterAssigned = newRecruiter;
    }
    setJd(prev => ({ ...prev, recruiterAssigned: newRecruiter }));
  };

  // Synchronize document page title
  useEffect(() => {
    if (isCandidatesTab) {
      document.title = "List of Candidates | ScanJD";
    } else {
      document.title = `${jd.title} | ScanJD`;
    }
  }, [isCandidatesTab, jd.title]);

  const [candidates, setCandidates] = useState(() => {
    // filter candidate set mapped to this JD
    return mockCandidates.filter(c => c.jdId === jd.id);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Interviewing': return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
      case 'Closed': return 'bg-gray-50 text-gray-500 border-gray-200';
      default: return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">{isCandidatesTab ? "Active Talent Pool" : jd.id}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{isCandidatesTab ? "All Assigned Recruiters" : `Uploaded ${jd.uploadDate}`}</span>
            </div>
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

      {/* Job Description Details Card */}
      {!isCandidatesTab && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 flex-1">
              {/* Header status tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getStatusColor(jd.status)}`}>
                  {jd.status}
                </span>
                <span className="px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-lg text-[11px] font-bold flex items-center gap-1 border border-brand-blue/20">
                  <Sparkles className="w-3 h-3 text-brand-yellow animate-pulse" />
                  {jd.badge || "Core Mandate"}
                </span>
                <span className="text-xs text-gray-400 font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                  ID: {jd.id}
                </span>
              </div>

              {/* Title & Organization info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">{jd.title}</h2>
                <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-2 font-medium">
                  <span className="flex items-center gap-1 font-semibold text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {jd.company}
                  </span>
                  <span>•</span>
                  <span>{jd.department || "Core Engineering"} Department</span>
                  <span>•</span>
                  <span>Hiring Manager: <strong className="text-gray-800">{jd.hiringManager || "Sanjana Sen"}</strong></span>
                </div>
              </div>

              {/* Role Description */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">About This Role</h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
                  {jd.description || `We are looking for a highly capable ${jd.title} to manage technical architecture and features at ${jd.company}. This hire will own implementation strategies, drive development best practices, and work closely with product stakeholders using our primary requirements.`}
                </p>
              </div>

              {/* Required Skills */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Required Skills & Parameters
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {jd.skillsRequired && jd.skillsRequired.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-brand-blue/5 border border-brand-blue/10 text-brand-blue rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side: Job At a Glance */}
            <div className="w-full md:w-80 bg-gray-50/50 rounded-2xl border border-gray-200/80 overflow-hidden self-stretch flex flex-col justify-between">
              {/* Header */}
              <div className="px-4 pt-4">
                <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pb-2 border-b border-gray-200">
                  Job At a Glance
                </h3>
              </div>

              {/* Rows */}
              <div className="flex-1 flex flex-col divide-y divide-gray-100">
                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Experience</span>
                  <span className="text-[11px] font-bold text-gray-800">{jd.experienceRequired}</span>
                </div>

                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Location</span>
                  <span className="text-[11px] font-bold text-gray-800">{jd.location || "Remote"}</span>
                </div>

                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Mode of Working</span>
                  <span className="text-[11px] font-bold text-gray-800">{jd.workMode || "Hybrid"}</span>
                </div>

                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Posted On</span>
                  <span className="text-[11px] font-bold text-gray-800">{jd.uploadDate}</span>
                </div>

                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Department</span>
                  <span className="text-[11px] font-bold text-gray-800">{jd.department || "Core Product"}</span>
                </div>

                <div className="flex items-center px-4 py-1">
                  <span className="flex-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Status</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    jd.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    jd.status === 'Reviewing' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    jd.status === 'Interviewing' ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' :
                    'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>{jd.status}</span>
                </div>

                {/* Recruiter Lead */}
                <div className="flex items-center px-4 py-1.5 relative gap-2">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">Recruiter</span>

                  {/* Clickable avatar + name — opens dropdown */}
                  <div
                    className="flex items-center gap-2 ml-auto cursor-pointer group"
                    onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                  >
                    {jd.recruiterAssigned ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 text-brand-blue font-bold text-[9px] flex items-center justify-center border border-brand-blue/30 shadow-sm flex-shrink-0">
                          {(() => {
                            const r = mockRecruiters.find(rec => rec.name === jd.recruiterAssigned);
                            return r ? r.avatar : jd.recruiterAssigned.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                          })()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-gray-800 truncate leading-tight group-hover:text-brand-blue transition-colors group-hover:underline underline-offset-2 decoration-brand-blue/40">{jd.recruiterAssigned}</div>
                          <div className="text-[9px] text-gray-400 leading-none mt-0.5 truncate">
                            {(() => {
                              const r = mockRecruiters.find(rec => rec.name === jd.recruiterAssigned);
                              return r ? r.role : 'Technical Recruiter';
                            })()}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 group-hover:border-brand-blue bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand-blue font-bold text-xs flex-shrink-0 transition-colors">+</div>
                        <div className="text-[11px] font-bold text-gray-400 group-hover:text-brand-blue transition-colors leading-tight">Click to assign</div>
                      </>
                    )}
                  </div>

                  {/* Dropdown */}
                  {showAssignDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowAssignDropdown(false)} />
                      <div
                        className="absolute bottom-full right-0 mb-2 z-20 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 text-xs text-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-1.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1.5">
                          Assign Recruiter
                        </div>
                        {mockRecruiters.map(r => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => { handleUpdateRecruiter(r.name); setShowAssignDropdown(false); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-brand-blue/5 hover:text-brand-blue text-left transition-colors cursor-pointer"
                          >
                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-brand-blue/20">
                              {r.avatar}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs leading-tight text-gray-900 truncate">{r.name}</div>
                              <div className="text-[9px] text-gray-400 leading-tight mt-0.5 truncate">{r.role}</div>
                            </div>
                          </button>
                        ))}
                        {jd.recruiterAssigned && (
                          <button
                            type="button"
                            onClick={() => { handleUpdateRecruiter(''); setShowAssignDropdown(false); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-600 text-left border-t border-gray-100 transition-colors cursor-pointer mt-1"
                          >
                            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-red-200">✕</div>
                            <span className="font-bold text-xs">Unassign Recruiter</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer: Pipeline Count */}
              <div className="px-4 py-2.5 border-t border-gray-200 flex items-center justify-between bg-white rounded-b-2xl">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pipeline</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  {jd.matchingResumesCount} Matched
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
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
                                <div className="text-[11px] text-gray-400 font-normal">{c.resumeScore} ATS Score</div>
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
                    <span className="text-xs font-bold text-brand-blue uppercase">Candidate Details</span>
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
                  className={`py-2 px-3 rounded-xl font-bold text-xs text-center border transition-all cursor-pointer ${
                    selectedCandidate.status === 'Shortlisted'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm shadow-emerald-500/20'
                      : 'bg-brand-blue hover:bg-brand-blue/90 text-white border-brand-blue shadow-sm shadow-brand-blue/20'
                  }`}
                >
                  {selectedCandidate.status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                </button>
                <button 
                  onClick={() => alert(`Simulated API call: Executing shareable PDF bundle view for ${selectedCandidate.name}`)}
                  className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-400" /> Full CV
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
