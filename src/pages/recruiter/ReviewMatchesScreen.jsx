import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  Plus, 
  X, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  Building2,
  Check,
  AlertCircle
} from 'lucide-react';
import { mockCandidates, extendedJDs } from '../../data/mockData';

const ReviewMatchesScreen = () => {
  const navigate = useNavigate();

  // Load the initial set of parsed candidate profiles
  const [candidates, setCandidates] = useState(() => {
    // Take Sarah Jenkins, David Chen, Amina Yusuf, and Alex Mercer as the mock uploads
    const selectedIds = ['CAND-001', 'CAND-002', 'CAND-003', 'CAND-004'];
    return mockCandidates
      .filter(c => selectedIds.includes(c.id))
      .map(c => ({
        ...c,
        isApproved: false,
        isRejected: false
      }));
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [toast, setToast] = useState(null);

  // Active selected candidate object
  const activeCandidate = candidates.filter(c => !c.isRejected)[activeIndex];

  const handleFieldChange = (field, value) => {
    if (!activeCandidate) return;
    setCandidates(prev => prev.map(c => {
      if (c.id === activeCandidate.id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim() || !activeCandidate) return;
    const skillToAdd = newSkillInput.trim();
    
    setCandidates(prev => prev.map(c => {
      if (c.id === activeCandidate.id) {
        // Prevent duplicate skills
        if (c.skillsMatch.includes(skillToAdd)) return c;
        return {
          ...c,
          skillsMatch: [...c.skillsMatch, skillToAdd]
        };
      }
      return c;
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    if (!activeCandidate) return;
    setCandidates(prev => prev.map(c => {
      if (c.id === activeCandidate.id) {
        return {
          ...c,
          skillsMatch: c.skillsMatch.filter(s => s !== skillToRemove)
        };
      }
      return c;
    }));
  };

  const handleRejectCandidate = () => {
    if (!activeCandidate) return;
    const currentId = activeCandidate.id;
    setCandidates(prev => prev.map(c => {
      if (c.id === currentId) {
        return { ...c, isRejected: true };
      }
      return c;
    }));
    // Adjust active index
    const remaining = candidates.filter(c => c.id !== currentId && !c.isRejected);
    if (remaining.length > 0) {
      setActiveIndex(0);
    }
    showNotification('Candidate profile discarded successfully.');
  };

  const handleApproveCandidate = () => {
    if (!activeCandidate) return;
    setCandidates(prev => prev.map(c => {
      if (c.id === activeCandidate.id) {
        return { ...c, isApproved: true };
      }
      return c;
    }));
    showNotification(`Approved & synchronized ${activeCandidate.name} to the pool.`);
  };

  const handleSyncAll = () => {
    // Save to the global mockCandidates array in memory
    candidates.forEach(c => {
      if (c.isRejected) {
        // Remove from global pool
        const idx = mockCandidates.findIndex(gc => gc.id === c.id);
        if (idx !== -1) mockCandidates.splice(idx, 1);
      } else {
        // Update global pool
        const idx = mockCandidates.findIndex(gc => gc.id === c.id);
        if (idx !== -1) {
          mockCandidates[idx] = {
            ...mockCandidates[idx],
            name: c.name,
            email: c.email,
            phone: c.phone,
            currentRole: c.currentRole,
            experience: c.experience,
            skillsMatch: c.skillsMatch,
            aiRecommendation: c.aiRecommendation
          };
        }
      }
    });

    showNotification('Successfully synced all audited profiles to candidate pool.');
    setTimeout(() => {
      navigate('/recruiter/candidates');
    }, 1500);
  };

  const showNotification = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const activeCandidatesList = candidates.filter(c => !c.isRejected);

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
            <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">AI Intake Verification</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Review Candidate Matches</h1>
          <p className="text-xs text-gray-500 mt-0.5">Audit and edit parsed resume metadata before final candidate synchronization</p>
        </div>

        <button 
          onClick={() => navigate('/recruiter/upload-resume')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-brand-purple" />
          Back to Upload
        </button>
      </div>

      {/* Review Information Banner */}
      <div className="bg-brand-purple/5 border border-brand-purple/20 p-4 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
        <div className="text-xs text-brand-purple font-semibold leading-relaxed">
          <p className="font-bold">AI Ingestion Audit Mode</p>
          <p className="opacity-90 mt-0.5">We have extracted contacts, roles, and capability matches from the uploaded CV files. Verify that the parsed fields are accurate, modify skill tags if required, and click Approve to sync with the active target pipelines.</p>
        </div>
      </div>

      {activeCandidatesList.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center text-gray-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-1">Audit Completed</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto mb-4">All uploaded profiles have been reviewed, rejected, or queued for synchronization.</p>
          <button
            onClick={() => navigate('/recruiter/candidates')}
            className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-bold rounded-xl text-xs shadow-md shadow-brand-purple/10 cursor-pointer"
          >
            Go to Candidates Pool
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Sidebar Document Queue */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ingested Queue ({activeCandidatesList.length})</h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm space-y-2 max-h-[600px] overflow-y-auto">
              {activeCandidatesList.map((c, idx) => {
                const isActive = activeIndex === idx;
                const targetJD = extendedJDs.find(j => j.id === c.jdId);
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-brand-purple/5 border-brand-purple/30 shadow-sm' 
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-gray-900 truncate max-w-[170px]">{c.name}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                        c.isApproved 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {c.isApproved ? 'Approved' : 'Pending Review'}
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-500 font-semibold truncate flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                      {c.currentRole}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1 font-mono font-bold text-brand-purple bg-brand-purple/5 px-1.5 py-0.5 rounded border border-brand-purple/10">
                        <Sparkles className="w-2.5 h-2.5 text-brand-yellow" />
                        {c.match}% Match
                      </span>
                      <span>Target: {targetJD?.company || 'TCS'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sync All CTA Block */}
            <button
              onClick={handleSyncAll}
              className="w-full py-4 bg-brand-purple hover:bg-brand-purple/95 text-white font-bold text-xs rounded-2xl shadow-lg shadow-brand-purple/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4.5 h-4.5" />
              Sync Approved Candidates ({candidates.filter(c => c.isApproved).length})
            </button>
          </div>

          {/* Right Column: AI Extraction Auditor & Form */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeCandidate && (
                <motion.div
                  key={activeCandidate.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Extracted Profile Details: {activeCandidate.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-semibold">Verify and refine parsed resume information</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRejectCandidate}
                        className="px-3.5 py-2 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-transparent hover:border-red-100"
                        title="Discard this parsed profile"
                      >
                        <Trash2 className="w-4 h-4" /> Discard
                      </button>

                      <button
                        type="button"
                        onClick={handleApproveCandidate}
                        disabled={activeCandidate.isApproved}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                          activeCandidate.isApproved
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10'
                        }`}
                      >
                        <Check className="w-4 h-4" /> 
                        {activeCandidate.isApproved ? 'Approved ✓' : 'Approve Profile'}
                      </button>
                    </div>
                  </div>

                  {/* Auditor Form */}
                  <div className="p-6 space-y-5">
                    {/* Basic meta inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Candidate Name</label>
                        <input
                          type="text"
                          value={activeCandidate.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Role</label>
                        <input
                          type="text"
                          value={activeCandidate.currentRole}
                          onChange={(e) => handleFieldChange('currentRole', e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={activeCandidate.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={activeCandidate.phone}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Experience</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={activeCandidate.experience}
                            onChange={(e) => handleFieldChange('experience', e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">ATS Assessment Score</label>
                        <div className="relative">
                          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={activeCandidate.resumeScore}
                            onChange={(e) => handleFieldChange('resumeScore', e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all font-semibold text-gray-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* AI extracted skills tag manager */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">AI Extracted Skill Tags</label>
                      <div className="flex flex-wrap gap-1.5 p-3 border border-gray-200 rounded-xl bg-gray-50/30">
                        {activeCandidate.skillsMatch.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-md font-semibold text-[11px] flex items-center gap-1.5">
                            {s}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(s)}
                              className="hover:text-red-600 transition-colors p-0.5 rounded-sm hover:bg-red-50"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}

                        {/* Add Skill form trigger */}
                        <form onSubmit={handleAddSkill} className="inline-flex items-center relative">
                          <input
                            type="text"
                            placeholder="Add skill tag..."
                            value={newSkillInput}
                            onChange={(e) => setNewSkillInput(e.target.value)}
                            className="pl-2 pr-7 py-1 bg-white border border-gray-200 rounded text-[11px] font-semibold focus:outline-none focus:border-brand-purple w-28 placeholder-gray-400 text-gray-800"
                          />
                          <button
                            type="submit"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-purple"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* AI Engine Recommendation summary */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">AI Engine Summary Recommendation</label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          value={activeCandidate.aiRecommendation}
                          onChange={(e) => handleFieldChange('aiRecommendation', e.target.value)}
                          className="w-full p-3.5 bg-gray-50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-brand-purple rounded-xl text-xs focus:outline-none transition-all leading-relaxed font-semibold italic text-gray-700 resize-none"
                        />
                        <Sparkles className="absolute right-3.5 bottom-3.5 w-4 h-4 text-brand-purple/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Success/Error Toast notification popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewMatchesScreen;
