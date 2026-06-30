import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Link as LinkIcon, Link2Off } from 'lucide-react';

import { mockCandidates } from '../data/mockData';

const MapJDModal = ({ isOpen, onClose, jdData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize mapped candidates based on actual jdId
  const initialMapped = useMemo(() => {
    if (!jdData) return [];
    return mockCandidates.filter(c => c.jdId === jdData.id).map(c => c.id);
  }, [jdData, isOpen]);

  const [mappedCandidates, setMappedCandidates] = useState(initialMapped);

  // Sync state when modal opens
  useMemo(() => {
    if (isOpen) {
      setMappedCandidates(initialMapped);
    }
  }, [isOpen, initialMapped]);

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => 
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.currentRole?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleToggleMap = (candidateId) => {
    setMappedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId) 
        : [...prev, candidateId]
    );
  };

  const handleSave = () => {
    // Update the jdId in the global mockCandidates array
    if (jdData) {
      mockCandidates.forEach(candidate => {
        if (mappedCandidates.includes(candidate.id)) {
          candidate.jdId = jdData.id;
        } else if (candidate.jdId === jdData.id) {
          // If it was mapped to this JD but now unchecked, remove it
          candidate.jdId = null;
        }
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Map Candidates</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Mapping candidates to <span className="font-semibold text-brand-blue">{jdData?.title || 'Job Description'}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search candidates by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Candidate List */}
              <div className="space-y-3">
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map(candidate => {
                    const isMapped = mappedCandidates.includes(candidate.id);
                    return (
                      <div 
                        key={candidate.id}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                          isMapped 
                            ? 'bg-brand-blue/5 border-brand-blue/30' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{candidate.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span>{candidate.currentRole || 'Candidate'}</span>
                              <span>•</span>
                              <span>{candidate.experience || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <div className="text-xs font-semibold text-gray-500">Match Score</div>
                            <div className={`text-sm font-bold ${candidate.match >= 90 ? 'text-emerald-600' : 'text-brand-blue'}`}>
                              {candidate.match || candidate.matchScore || 0}%
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleMap(candidate.id)}
                            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                              isMapped
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'
                                : 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md active:scale-95'
                            }`}
                          >
                            {isMapped ? (
                              <>
                                <Link2Off className="w-3.5 h-3.5" />
                                Unmap
                              </>
                            ) : (
                              <>
                                <LinkIcon className="w-3.5 h-3.5" />
                                Map Candidate
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No candidates found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center flex-shrink-0">
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{mappedCandidates.length}</span> candidates selected
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Mappings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MapJDModal;
