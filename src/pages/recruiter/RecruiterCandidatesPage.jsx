import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  HelpCircle,
  FileText,
  X,
  Users,
  Building2,
  ArrowUpDown,
  UserPlus,
  UserMinus
} from 'lucide-react';
import { extendedJDs, mockCandidates } from '../../data/mockData';

const RecruiterCandidatesPage = () => {
  const navigate = useNavigate();

  // Active JDs only for the selector
  const activeJDs = useMemo(() => extendedJDs.filter(jd => jd.status === 'Active' || jd.status === 'Reviewing' || jd.status === 'Interviewing'), []);

  const [selectedJdId, setSelectedJdId] = useState(activeJDs[0]?.id || extendedJDs[0]?.id);
  const [jdDropdownOpen, setJdDropdownOpen] = useState(false);
  const [jdSearchQuery, setJdSearchQuery] = useState('');

  // Filtered JDs for the switcher dropdown
  const filteredSwitcherJDs = useMemo(() => {
    if (!jdSearchQuery.trim()) return extendedJDs;
    const q = jdSearchQuery.toLowerCase();
    return extendedJDs.filter(jd => 
      jd.title.toLowerCase().includes(q) ||
      jd.company.toLowerCase().includes(q) ||
      jd.id.toLowerCase().includes(q)
    );
  }, [jdSearchQuery]);

  const selectedJD = useMemo(() => extendedJDs.find(j => j.id === selectedJdId) || extendedJDs[0], [selectedJdId]);

  // Toast notifications state
  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Candidates for selected JD (strict filtering, no fallback)
  const [candidates, setCandidates] = useState(() => {
    return mockCandidates.filter(c => c.jdId === selectedJdId);
  });

  // Assign Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [draftAssignments, setDraftAssignments] = useState({});

  const openAssignModal = () => {
    const initialDraft = {};
    mockCandidates.forEach(c => {
      initialDraft[c.id] = c.jdId === selectedJdId;
    });
    setDraftAssignments(initialDraft);
    setModalSearch('');
    setIsAssignModalOpen(true);
  };

  const handleToggleDraft = (candidateId) => {
    setDraftAssignments(prev => ({
      ...prev,
      [candidateId]: !prev[candidateId]
    }));
  };

  const handleSaveAssignments = () => {
    let assignedCount = 0;
    let unassignedCount = 0;

    mockCandidates.forEach(c => {
      const wasAssigned = c.jdId === selectedJdId;
      const isNowAssigned = !!draftAssignments[c.id];

      if (isNowAssigned && !wasAssigned) {
        c.jdId = selectedJdId;
        assignedCount++;
      } else if (!isNowAssigned && wasAssigned) {
        c.jdId = null;
        unassignedCount++;
      }
    });

    const updated = mockCandidates.filter(c => c.jdId === selectedJdId);
    setCandidates(updated);

    if (updated.length > 0) {
      if (!selectedCandidate || !draftAssignments[selectedCandidate.id]) {
        setSelectedCandidate(updated[0]);
        setIsPreviewOpen(true);
      }
    } else {
      setSelectedCandidate(null);
      setIsPreviewOpen(false);
    }

    setIsAssignModalOpen(false);
    showToast(`Successfully updated candidates list for this Job Description.`);
  };

  const handleRemoveCandidate = (candidateId) => {
    const cand = mockCandidates.find(c => c.id === candidateId);
    if (cand) {
      cand.jdId = null;
    }
    const updated = candidates.filter(c => c.id !== candidateId);
    setCandidates(updated);
    if (selectedCandidate?.id === candidateId) {
      if (updated.length > 0) {
        setSelectedCandidate(updated[0]);
        setIsPreviewOpen(true);
      } else {
        setSelectedCandidate(null);
        setIsPreviewOpen(false);
      }
    }
    showToast(`Removed candidate from this Job Description.`);
  };

  // When JD changes, update candidate list
  const handleJdChange = (jdId) => {
    setSelectedJdId(jdId);
    const newCandidates = mockCandidates.filter(c => c.jdId === jdId);
    setCandidates(newCandidates);
    setJdDropdownOpen(false);
    setJdSearchQuery('');
    setCurrentPage(1);
    if (newCandidates.length > 0) {
      setSelectedCandidate(newCandidates[0]);
      setIsPreviewOpen(true);
    } else {
      setSelectedCandidate(null);
      setIsPreviewOpen(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('MATCH_DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedCandidate, setSelectedCandidate] = useState(() => {
    const initialCandidates = mockCandidates.filter(c => c.jdId === (activeJDs[0]?.id || extendedJDs[0]?.id));
    return initialCandidates[0] || null;
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(() => {
    const initialCandidates = mockCandidates.filter(c => c.jdId === (activeJDs[0]?.id || extendedJDs[0]?.id));
    return initialCandidates.length > 0;
  });

  const processedCandidates = useMemo(() => {
    let result = [...candidates];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.skillsMatch.some(s => s.toLowerCase().includes(q)) ||
        c.status.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'ALL') {
      result = result.filter(c => c.status.toUpperCase() === statusFilter.toUpperCase());
    }
    if (sortBy === 'MATCH_DESC') result.sort((a, b) => b.match - a.match);
    else if (sortBy === 'MATCH_ASC') result.sort((a, b) => a.match - b.match);
    return result;
  }, [candidates, searchQuery, statusFilter, sortBy]);

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
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, status: prev.status === 'Shortlisted' ? 'Screening' : 'Shortlisted' }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted': return <span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-lg text-xs font-bold">Shortlisted</span>;
      case 'Interview Scheduled': return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">Interviewing</span>;
      case 'Rejected': return <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold">Rejected</span>;
      default: return <span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-lg text-xs font-bold">Screening</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Interviewing': return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">Candidate Pool</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-xs text-gray-500 mt-0.5">View and manage candidates matched to a Job Description</p>
        </div>

        {/* JD Switcher */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setJdDropdownOpen(!jdDropdownOpen)}
            className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all text-left min-w-[260px]"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-none">Viewing JD</div>
              <div className="text-sm font-bold text-gray-800 truncate mt-0.5">{selectedJD.title}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedJD.status)}`}>{selectedJD.status}</span>
                <span className="text-[10px] text-gray-400 font-mono">{selectedJD.id}</span>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${jdDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {jdDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => { setJdDropdownOpen(false); setJdSearchQuery(''); }} />
              <div className="absolute top-full right-0 mt-2 z-20 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 max-h-80 overflow-y-auto flex flex-col">
                <div className="px-3 py-1.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Select a Job Description
                </div>
                
                {/* Job Search Input */}
                <div className="px-3 py-2 border-b border-gray-100 relative bg-gray-50/50 sticky top-0 z-10">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, ID or company..."
                    value={jdSearchQuery}
                    onChange={(e) => setJdSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-purple transition-all"
                  />
                </div>

                <div className="flex-1 overflow-y-auto max-h-56">
                  {filteredSwitcherJDs.length === 0 ? (
                    <div className="px-4 py-8 text-center text-xs text-gray-400 italic">
                      No matching jobs found
                    </div>
                  ) : (
                    filteredSwitcherJDs.map(jd => (
                      <button
                        key={jd.id}
                        type="button"
                        onClick={() => handleJdChange(jd.id)}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50 ${selectedJdId === jd.id ? 'bg-brand-purple/5' : ''}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                          jd.status === 'Active' ? 'bg-emerald-500' :
                          jd.status === 'Reviewing' ? 'bg-amber-500' :
                          jd.status === 'Interviewing' ? 'bg-brand-purple' :
                          'bg-gray-300'
                        }`} />
                        <div className="min-w-0 flex-1">
                          <div className={`text-xs font-bold truncate ${selectedJdId === jd.id ? 'text-brand-purple' : 'text-gray-800'}`}>{jd.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-mono">{jd.id}</span>
                            <span className="text-[10px] text-gray-400">·</span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <Building2 className="w-2.5 h-2.5" />{jd.company}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${getStatusColor(jd.status)}`}>{jd.status}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Strip */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
          <span className="text-gray-500">Avg. Match Score:</span>
          <span className="font-extrabold text-brand-purple">
            {candidates.length > 0 ? Math.round(candidates.reduce((a, c) => a + c.match, 0) / candidates.length) : 0}%
          </span>
        </div>
        <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs shadow-sm text-gray-600">
          <span className="font-extrabold text-gray-800">{processedCandidates.length}</span> candidates matched
        </div>
        <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 font-bold shadow-sm">
          {candidates.filter(c => c.status === 'Shortlisted').length} Shortlisted
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Controls */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter candidate name or skill..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={openAssignModal}
                  className="flex items-center gap-1.5 px-3 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-brand-purple/15 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  Manage Candidates
                </button>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Status</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Screening">Screening</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none cursor-pointer"
                >
                  <option value="MATCH_DESC">Top Match %</option>
                  <option value="MATCH_ASC">Lowest Match</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    <th className="p-4 pl-6">Candidate</th>
                    <th className="p-4">AI Coherence</th>
                    <th className="p-4">Skills</th>
                    <th className="p-4">Exp</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {paginatedCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                          <Users className="w-10 h-10 text-gray-300" />
                          <p className="font-semibold text-gray-500">No candidates match the current filters for this JD.</p>
                          <button
                            type="button"
                            onClick={openAssignModal}
                            className="mt-1 px-4 py-2 bg-brand-purple hover:bg-brand-purple/95 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm shadow-brand-purple/10 cursor-pointer"
                          >
                            <UserPlus className="w-4 h-4" /> Assign Candidates
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedCandidates.map((c) => {
                      const isSelected = selectedCandidate?.id === c.id;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => { setSelectedCandidate(c); setIsPreviewOpen(true); }}
                          className={`hover:bg-brand-purple/5 cursor-pointer transition-colors ${isSelected ? 'bg-brand-purple/10' : ''}`}
                        >
                          <td className="p-4 pl-6 font-semibold text-gray-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-brand-purple/10 font-bold text-brand-purple flex items-center justify-center flex-shrink-0">{c.initials}</div>
                              <div>
                                <div className="text-gray-900 font-bold leading-tight">{c.name}</div>
                                <div className="text-[11px] text-gray-400 font-normal">{c.resumeScore} ATS</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-bold">
                            <span className="text-brand-purple flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-brand-yellow" />{c.match}%
                            </span>
                          </td>
                          <td className="p-4 max-w-xs">
                            <div className="flex flex-wrap gap-1">
                              {c.skillsMatch.slice(0, 2).map(s => (
                                <span key={s} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] font-semibold text-gray-600">{s}</span>
                              ))}
                              {c.skillsMatch.length > 2 && (
                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500">+{c.skillsMatch.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">{c.experience}</td>
                          <td className="p-4">{getStatusBadge(c.status)}</td>
                          <td className="p-4 pr-6 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleShortlistToggle(c.id)}
                              title={c.status === 'Shortlisted' ? 'Remove shortlist' : 'Shortlist'}
                              className={`p-1.5 rounded-lg border transition-all ${c.status === 'Shortlisted' ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white hover:bg-gray-50 text-gray-400 border-gray-200 hover:text-brand-purple'}`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveCandidate(c.id)}
                              title="Remove from JD"
                              className="p-1.5 bg-white hover:bg-red-50 text-gray-400 hover:text-brand-red border border-gray-200 hover:border-red-200 rounded-lg transition-all"
                            >
                              <UserMinus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => alert(`Downloading CV for ${c.name}`)}
                              title="Download CV"
                              className="p-1.5 bg-white hover:bg-gray-50 text-gray-400 hover:text-brand-purple border border-gray-200 rounded-lg transition-all"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setSelectedCandidate(c); setIsPreviewOpen(true); }}
                              title="Preview"
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

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div>
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, processedCandidates.length)} to {Math.min(currentPage * itemsPerPage, processedCandidates.length)} of {processedCandidates.length}
              </div>
              <div className="flex items-center gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="p-1 border border-gray-200 rounded disabled:opacity-40">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-bold text-gray-700">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="p-1 border border-gray-200 rounded disabled:opacity-40">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <AnimatePresence>
          {isPreviewOpen && selectedCandidate ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 sticky top-20"
            >
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-purple uppercase">Candidate Details</span>
                    <span className="px-2 py-0.5 bg-brand-yellow/10 text-brand-yellow font-bold text-[10px] rounded">{selectedCandidate.match}% Match</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedCandidate.name}</h3>
                  <p className="text-xs text-gray-500">{selectedCandidate.currentRole}</p>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> AI Engine Summary
                </span>
                <div className="p-3 bg-gradient-to-br from-brand-purple/5 to-violet-500/5 border border-brand-purple/20 rounded-xl text-xs text-gray-700 leading-relaxed italic">
                  "{selectedCandidate.aiRecommendation}"
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-gray-500 block mb-1.5">Skills Matched:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skillsMatch.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedCandidate.missingSkills?.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-500 block mb-1.5">Missing Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.missingSkills.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-md font-semibold flex items-center gap-1 text-[11px]">
                          <XCircle className="w-3 h-3" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedCandidate.interviewQuestions?.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <span className="font-bold text-gray-700 block flex items-center gap-1 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 text-brand-purple" /> Suggested Screening Topics
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-gray-600 list-disc pl-4">
                      {selectedCandidate.interviewQuestions.map((q, i) => <li key={i} className="leading-tight">{q}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShortlistToggle(selectedCandidate.id)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs text-center border transition-all ${
                    selectedCandidate.status === 'Shortlisted'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm shadow-emerald-500/20'
                      : 'bg-brand-purple hover:bg-brand-purple/90 text-white border-brand-purple shadow-sm shadow-brand-purple/20'
                  }`}
                >
                  {selectedCandidate.status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                </button>
                <button
                  onClick={() => alert(`Opening full CV for ${selectedCandidate.name}`)}
                  className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-400" /> Full CV
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-xs">
              Click any candidate row to preview their full AI-parsed report.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assign Candidates Modal */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-gray-100"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Manage Candidate Assignments</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Assign or unassign candidates for <strong className="text-gray-700">{selectedJD.title}</strong></p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-3.5 bg-gray-50/50 border-b border-gray-100 relative">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates by name or key skill..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
                {(() => {
                  const filtered = mockCandidates.filter(c => {
                    if (!modalSearch.trim()) return true;
                    const q = modalSearch.toLowerCase();
                    return c.name.toLowerCase().includes(q) || c.skillsMatch.some(s => s.toLowerCase().includes(q));
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-10 text-xs text-gray-400 italic">
                        No candidates found in global pool matching your search query.
                      </div>
                    );
                  }

                  return filtered.map(c => {
                    const isChecked = !!draftAssignments[c.id];
                    const belongsToOther = c.jdId && c.jdId !== selectedJdId;
                    const otherJdTitle = belongsToOther ? (extendedJDs.find(j => j.id === c.jdId)?.title || c.jdId) : '';
                    
                    return (
                      <div
                        key={c.id}
                        onClick={() => handleToggleDraft(c.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-brand-purple/5 border-brand-purple/30 shadow-sm' 
                            : 'bg-white border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Checkbox */}
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            isChecked 
                              ? 'bg-brand-purple border-brand-purple text-white' 
                              : 'border-gray-300'
                          }`}>
                            {isChecked && <div className="w-1.5 h-1.5 rounded-sm bg-white" />}
                          </div>

                          {/* Avatar */}
                          <div className="w-8 h-8 rounded-lg bg-brand-purple/10 font-bold text-[11px] text-brand-purple flex items-center justify-center flex-shrink-0">
                            {c.initials}
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 leading-tight">{c.name}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate max-w-xs">{c.currentRole}</div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0 ml-2">
                          {isChecked ? (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-bold">
                              Assigned Here
                            </span>
                          ) : belongsToOther ? (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 rounded text-[9px] font-bold max-w-[120px] inline-block truncate" title={`Assigned to: ${otherJdTitle}`}>
                              In: {otherJdTitle}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded text-[9px] font-bold">
                              Unassigned
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAssignments}
                  className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-bold shadow-sm shadow-brand-purple/15 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterCandidatesPage;
