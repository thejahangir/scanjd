import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  CheckCircle, 
  XCircle, 
  Share2, 
  Calendar, 
  Download, 
  Sparkles, 
  FileText, 
  Check, 
  Award, 
  Briefcase,
  HelpCircle,
  Building2,
  SlidersHorizontal,
  UploadCloud,
  Loader2,
  Zap,
  UserPlus,
  X,
  Mail,
  Phone
} from 'lucide-react';
import { initialJobDescriptions, mockCandidates } from '../../data/mockData';

const RecruiterJDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('filter'); // 'shortlisted'

  const jd = useMemo(() => {
    return initialJobDescriptions.find(item => item.id === (id || "JD-2026-001")) || initialJobDescriptions[0];
  }, [id]);

  // Keep stateful track of candidates mapped directly to this JD
  const [candidates, setCandidates] = useState(() => {
    const filtered = mockCandidates.filter(c => c.jdId === jd.id);
    return filtered.length > 0 ? filtered : mockCandidates;
  });

  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Table Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Custom Live Ingestion State Parameters
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStepText, setUploadStepText] = useState('');
  const [bulkUploadedCount, setBulkUploadedCount] = useState(0);

  const filteredCandidates = useMemo(() => {
    let result = candidates;
    if (filterType === 'shortlisted') {
      result = result.filter(c => c.status === 'Shortlisted');
    }
    if (!searchQuery.trim()) return result;
    return result.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsMatch.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.badgeText && c.badgeText.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [candidates, searchQuery, filterType]);

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType]);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCandidates.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCandidates, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredCandidates.length / itemsPerPage);
  }, [filteredCandidates]);

  // Keep selected candidate updated if candidates array or filters receive updates
  useEffect(() => {
    if (filteredCandidates.length > 0) {
      const isStillActive = selectedCandidate && filteredCandidates.some(c => c.id === selectedCandidate.id);
      if (!isStillActive) {
        setSelectedCandidate(filteredCandidates[0]);
      }
    } else {
      setSelectedCandidate(null);
    }
  }, [filteredCandidates, selectedCandidate]);

  const updateStatus = (candidateId, nextStatus) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: nextStatus } : c));
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, status: nextStatus }));
    }
  };

  // Trigger simulated bulk/single live upload parsing logic
  const handleSimulatedLiveUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadStepText('Parsing raw file tokens & layout boundaries...');

    // Progress timeline simulation sequence
    setTimeout(() => {
      setUploadStepText('Extracting candidate deep capabilities vs. target skills...');
    }, 800);

    setTimeout(() => {
      setUploadStepText('Computing Vector Cosine match distance coefficients...');
    }, 1600);

    setTimeout(() => {
      // Create highly distinct real-time candidate structures
      const timestampSeq = Date.now().toString().slice(-3);
      const newIngestions = [
        {
          id: `CAND-LIVE-${timestampSeq}-1`,
          jdId: jd.id,
          name: "Dr. Alexander Wright",
          initials: "AW",
          experience: jd.experienceRequired,
          currentRole: "Principal Systems Specialist",
          company: "Ingested External Stream",
          match: 99,
          resumeScore: "9.9/10",
          skillsMatch: [jd.skillsRequired[0] || "React", jd.skillsRequired[1] || "TypeScript", "System Architecture", "High Coherence Vector"],
          missingSkills: [],
          status: "Newly Screened",
          email: "alex.wright.live@scanjd-ingest.com",
          phone: "+1 (555) 019-8822",
          aiRecommendation: `CRITICAL LIVE INGESTION HIT: Profile exhibits direct one-to-one compliance with mandatory ${jd.title} capabilities. Evaluated natively in real-time. Immediate expedited interview pathway recommended.`,
          skillGapText: "No skill divergence flagged during immediate extraction sequence.",
          interviewQuestions: [
            `Can you illustrate your direct ownership impact applying ${jd.skillsRequired[0] || 'Core capabilities'} in massive mission-critical architectures?`,
            "How do you ensure zero-latency optimization boundaries across highly scaled client surfaces?"
          ],
          isNewlyUploaded: true,
          badgeText: "⚡ INSTANT UPLOAD MATCH"
        },
        {
          id: `CAND-LIVE-${timestampSeq}-2`,
          jdId: jd.id,
          name: "Sophia Martinez",
          initials: "SM",
          experience: "7 Years",
          currentRole: "Lead Fullstack Practitioner",
          company: "Ingested External Stream",
          match: 95,
          resumeScore: "9.5/10",
          skillsMatch: [jd.skillsRequired[0] || "Frontend Systems", "CI/CD Gates", "State Flow Mapping"],
          missingSkills: [jd.skillsRequired[2] || "Secondary Tooling"],
          status: "Newly Screened",
          email: "s.martinez.live@scanjd-ingest.com",
          phone: "+1 (555) 019-3341",
          aiRecommendation: "EXCELLENT LIVE STREAM FIT: Cleared high-tier structural parsing constraints instantly. Validated deep production generalist attributes.",
          skillGapText: "Minor theoretical deviation detected on custom tooling layer. Fully adaptable within two business cycles.",
          interviewQuestions: [
            "Walk us through your component abstraction workflows addressing robust multi-tenant security specifications."
          ],
          isNewlyUploaded: true,
          badgeText: "⚡ LIVE STREAM FIT"
        }
      ];

      setCandidates(prev => [...newIngestions, ...prev]);
      setSelectedCandidate(newIngestions[0]); // Immediately highlight the absolute top match
      setIsUploading(false);
      setBulkUploadedCount(prev => prev + 2);
    }, 2400);
  };

  // Real Local OS Machine Physical Upload logic
  const handleLocalMachineUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (isUploading) return;
    setIsUploading(true);
    setUploadStepText(`Ingesting ${files.length} physical file(s) from local machine...`);

    const fileArray = Array.from(files);

    setTimeout(() => {
      setUploadStepText('Extracting text token parameters via local machine pipeline...');
    }, 800);

    setTimeout(() => {
      setUploadStepText('Computing Vector Cosine match distance coefficients...');
    }, 1600);

    setTimeout(() => {
      const timestampSeq = Date.now().toString().slice(-3);
      
      const newIngestions = fileArray.map((file, idx) => {
        // Strip extension beautifully
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        // Capitalize leading letters
        const formattedName = cleanName.replace(/\b\w/g, l => l.toUpperCase());
        // Calculate dynamic initials
        const nameParts = formattedName.split(' ').filter(Boolean);
        const initials = nameParts.length > 1 
          ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
          : formattedName.slice(0, 2).toUpperCase();
          
        // Vary evaluated match fit realistically
        const mockFit = 92 + (idx % 8);
        
        return {
          id: `CAND-LOCAL-${timestampSeq}-${idx}`,
          jdId: jd.id,
          name: formattedName || "Local Candidate",
          initials: initials || "LC",
          experience: jd.experienceRequired,
          currentRole: "Assigned Functional Specialist",
          company: "Physical Local Ingestion",
          match: mockFit,
          resumeScore: `${(mockFit / 10).toFixed(1)}/10`,
          skillsMatch: [jd.skillsRequired[0] || "Core Base", jd.skillsRequired[1] || "Frameworks", "Local OS Scan"],
          missingSkills: [],
          status: "Newly Screened",
          email: `${formattedName.toLowerCase().replace(/\s+/g, '') || 'candidate'}@localupload.com`,
          phone: "+1 (555) 019-LOCAL",
          aiRecommendation: `PHYSICAL OS UPLOAD DETECTED: Fully ingested string layers from physical file "${file.name}". Algorithmic screening registers high-tier coherence fit at ${mockFit}%. Local disk ingestion parameters applied successfully.`,
          skillGapText: "No substantial capability blocks omitted from candidate baseline.",
          interviewQuestions: [
            `Can you expand upon your hands-on deployment track record applying core concepts documented inside "${file.name}"?`
          ],
          isNewlyUploaded: true,
          badgeText: "⚡ PHYSICAL OS UPLOAD"
        };
      });

      setCandidates(prev => [...newIngestions, ...prev]);
      setSelectedCandidate(newIngestions[0]);
      setIsUploading(false);
      setBulkUploadedCount(prev => prev + newIngestions.length);
      
      // Clear physical input queue so same elements can trigger onChange sequentially
      e.target.value = '';
    }, 2400);
  };

  const executeAction = (actionType) => {
    if (!selectedCandidate) return;
    switch(actionType) {
      case 'SHORTLIST':
        updateStatus(selectedCandidate.id, 'Shortlisted');
        break;
      case 'REJECT':
        updateStatus(selectedCandidate.id, 'Rejected');
        break;
      case 'SCHEDULE':
        updateStatus(selectedCandidate.id, 'Interview Scheduled');
        alert(`Simulated Action: Generating standard client invite schedule tokens for ${selectedCandidate.name}`);
        break;
      case 'SHARE':
        alert(`Simulated Action: Client secure evaluation link generated for profile payload (${selectedCandidate.name})`);
        break;
      case 'DOWNLOAD':
        alert(`Simulated Action: ATS verified PDF extract downloading for ${selectedCandidate.name}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {filterType === 'shortlisted' ? 'Shortlisted Candidates' : 'Candidates'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button 
            onClick={() => navigate('/recruiter/jds')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-brand-purple" />
            Back to JD List
          </button>
        </div>
      </div>

      {/* Search & Actions Panel Above Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800 uppercase tracking-wider block">Candidates</span>
          <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 rounded-full">
            {filteredCandidates.length} Total
          </span>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search matching candidates, badges, skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold"
          />
        </div>
      </div>

      {/* Grid Container for Table + Profile Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Candidates Data Table Container (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Candidate Details</th>
                    <th className="px-6 py-4 text-center">ATS Score</th>
                    <th className="px-6 py-4 text-center">AI Match Fit</th>
                    <th className="px-6 py-4">Screening Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedCandidates.length > 0 ? (
                    paginatedCandidates.map((c) => {
                      const isNew = c.isNewlyUploaded;
                      const isSelected = selectedCandidate?.id === c.id;
                      return (
                        <tr 
                          key={c.id}
                          onClick={() => {
                            setSelectedCandidate(c);
                            setIsPreviewOpen(true);
                          }}
                          className={`hover:bg-brand-purple/5 cursor-pointer transition-all ${
                            isSelected ? 'bg-brand-purple/5' : ''
                          } ${
                            isNew 
                              ? 'bg-amber-50/20 border-l-4 border-amber-500' 
                              : 'border-l-4 border-transparent'
                          }`}
                        >
                          {/* Candidate Details */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm ${
                                isNew 
                                  ? 'bg-amber-400 text-gray-900 shadow-amber-400/20' 
                                  : 'bg-brand-purple/10 text-brand-purple'
                              }`}>
                                {c.initials}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-gray-900 text-sm truncate">{c.name}</span>
                                  {isNew && <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 flex-shrink-0" />}
                                </div>
                                <span className="text-xs text-gray-500 block truncate">{c.currentRole}</span>
                              </div>
                            </div>
                          </td>

                          {/* ATS Score */}
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-extrabold text-gray-700 shadow-sm">
                              {c.resumeScore}
                            </span>
                          </td>

                          {/* AI Match Fit */}
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-block px-2.5 py-1.5 rounded-lg text-xs font-black border shadow-sm ${
                              isNew 
                                ? 'bg-amber-400 text-gray-900 border-amber-300 ring-2 ring-amber-400/10' 
                                : 'bg-brand-purple/10 text-brand-purple'
                            }`}>
                              {c.match}% Fit
                            </span>
                          </td>

                          {/* Screening Status */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className={`px-2 py-0.5 border rounded text-[10px] font-bold ${
                                c.status === 'Shortlisted' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : c.status === 'Rejected'
                                    ? 'bg-red-50 text-brand-red border-red-200'
                                    : 'bg-gray-50 text-gray-600 border-gray-200'
                              }`}>
                                {c.status}
                              </span>
                              {c.badgeText && (
                                <span className="px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded text-[9px] font-extrabold tracking-tight border border-brand-purple/20">
                                  {c.badgeText}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedCandidate(c);
                                  updateStatus(c.id, 'Shortlisted');
                                }}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                  c.status === 'Shortlisted'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-white border-gray-200 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50'
                                }`}
                                title="Shortlist Candidate"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCandidate(c);
                                  updateStatus(c.id, 'Rejected');
                                }}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                  c.status === 'Rejected'
                                    ? 'bg-red-50 border-red-200 text-brand-red'
                                    : 'bg-white border-gray-200 text-gray-400 hover:text-brand-red hover:bg-red-50/50'
                                }`}
                                title="Reject Candidate"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCandidate(c);
                                  executeAction('SHARE');
                                }}
                                className="p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-all cursor-pointer"
                                title="Share Profile"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCandidate(c);
                                  executeAction('SCHEDULE');
                                }}
                                className="p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50/50 rounded-lg transition-all cursor-pointer"
                                title="Schedule Interview"
                              >
                                <Calendar className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCandidate(c);
                                  executeAction('DOWNLOAD');
                                }}
                                className="p-1.5 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-lg transition-all shadow-sm shadow-brand-blue/10 cursor-pointer"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-16 text-center text-xs text-gray-400">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto text-gray-300 mb-3">
                          <Award className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[10px] mb-1">No Matching Candidates Found</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed max-w-[240px] mx-auto">No candidate profiles fit your current filters or search parameters. Ingest new resumes to begin scanning.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls Footer */}
            {totalPages > 1 && (
              <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="text-xs text-gray-500 font-semibold">
                  Showing <span className="text-gray-800 font-extrabold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredCandidates.length)}</span> to{' '}
                  <span className="text-gray-800 font-extrabold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of{' '}
                  <span className="text-gray-800 font-extrabold">{filteredCandidates.length}</span> Candidates
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      currentPage === 1
                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-purple hover:text-brand-purple'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-brand-purple text-white shadow-sm shadow-brand-purple/20'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-purple hover:text-brand-purple'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      currentPage === totalPages
                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-purple hover:text-brand-purple'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Resume Preview & Analysis Side-Panel (lg:col-span-1) */}
        <div className="lg:col-span-1">
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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-purple uppercase">Profile Deep Dive</span>
                      <span className="px-2 py-0.5 bg-brand-yellow/10 text-brand-yellow font-bold text-[10px] rounded">
                        {selectedCandidate.match}% Match
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{selectedCandidate.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold">{selectedCandidate.currentRole}</p>
                    </div>
                    {/* Extracted Contact Info & Experience */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-gray-500 font-bold pt-1.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-brand-purple" />
                        {selectedCandidate.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-purple" />
                        {selectedCandidate.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-brand-purple" />
                        {selectedCandidate.experience} Experience
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* AI Recommendation Summary Block */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-700 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> AI Engine Summary Recommendation
                  </span>
                  <div className="p-3 bg-gradient-to-br from-brand-purple/5 to-indigo-50/10 border border-brand-purple/20 rounded-xl text-xs text-gray-700 leading-relaxed italic">
                    "{selectedCandidate.aiRecommendation}"
                  </div>
                </div>

                {/* Detailed Extracted Metrics */}
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-semibold text-gray-500 block mb-1.5">Skills Extracted & Verified:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.skillsMatch.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-md font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle className="w-3 h-3 text-brand-purple" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCandidate.missingSkills && selectedCandidate.missingSkills.length > 0 && (
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
                  {selectedCandidate.interviewQuestions && selectedCandidate.interviewQuestions.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <span className="font-bold text-gray-700 block flex items-center gap-1 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-brand-purple" /> Suggested Live Screening Topics
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
                    onClick={() => executeAction('SHORTLIST')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs text-center border transition-all cursor-pointer ${
                      selectedCandidate.status === 'Shortlisted'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {selectedCandidate.status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                  </button>
                  <button 
                    onClick={() => executeAction('DOWNLOAD')}
                    className="py-2 px-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-brand-blue/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" /> Full CV
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-xs font-semibold">
                Click on any candidate row to preview comprehensive parsing calculations and resume scores.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJDDetails;
