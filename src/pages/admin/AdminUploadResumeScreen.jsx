import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Layers,
  X,
  FileCheck,
  FileUp,
  Settings2,
  Sliders
} from 'lucide-react';
import { extendedJDs } from '../../data/mockData';

const AdminUploadResumeScreen = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([
    // Default simulated initial sample files
    { id: '1', name: 'Shreya_Joshi_Senior_Frontend_CV.pdf', size: '2.4 MB', progress: 100, status: 'PARSED', error: null },
    { id: '2', name: 'Devendra_Chaudhary_UI_Developer.docx', size: '1.8 MB', progress: 100, status: 'PARSED', error: null },
  ]);

  // Parameters
  const [selectedJdId, setSelectedJdId] = useState(extendedJDs[0]?.id || '');
  const [parseDepth, setParseDepth] = useState('deep');
  const [minExperience, setMinExperience] = useState('all');
  const [skillsFocus, setSkillsFocus] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).map((f, idx) => ({
        id: `dropped-${Date.now()}-${idx}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        progress: 0,
        status: 'QUEUED', // QUEUED -> PARSING -> PARSED | ERROR
        error: null
      }));

      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleManualSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).map((f, idx) => ({
        id: `selected-${Date.now()}-${idx}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        progress: 0,
        status: 'QUEUED',
        error: null
      }));

      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  // Simulated AI Parsing runtime calculation side effects
  useEffect(() => {
    const timer = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.status === 'QUEUED') {
          return { ...f, status: 'PARSING', progress: 10 };
        } else if (f.status === 'PARSING') {
          const nextProgress = f.progress + 25;
          if (nextProgress >= 100) {
            // Simulate random occasional error for dynamic state representation
            const isError = Math.random() < 0.1 && f.id.includes('dropped');
            return { 
              ...f, 
              progress: 100, 
              status: isError ? 'ERROR' : 'PARSED',
              error: isError ? 'Corrupted header block or invalid structure parsing signature.' : null
            };
          }
          return { ...f, progress: nextProgress };
        }
        return f;
      }));
    }, 600);

    return () => clearInterval(timer);
  }, []);

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Trigger bulk parse simulator helper
  const injectDummyCandidates = () => {
    const dummy = [
      { id: `sim-${Date.now()}-1`, name: 'Dr. Amit Mishra_Research_LLM.pdf', size: '4.1 MB', progress: 0, status: 'QUEUED', error: null },
      { id: `sim-${Date.now()}-2`, name: 'Aditi_Yadav_React_Developer.pdf', size: '1.2 MB', progress: 0, status: 'QUEUED', error: null }
    ];
    setFiles(prev => [...prev, ...dummy]);
  };

  const parsedCount = files.filter(f => f.status === 'PARSED').length;

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Upper Header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileUp className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Resume Processing Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Upload Resumes</h1>
          <p className="text-sm text-gray-500 mt-1">Upload multiple resumes to automatically extract candidate skills, work history, and calculate how well they match the job.</p>
        </div>
      </div>

      {/* Main Liquid Viewport Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Controls and dragzone */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Screening Configuration panel */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3.5 border-b border-gray-100">
              <Settings2 className="w-5 h-5 text-brand-blue" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">Screening Configuration</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Parameters applied to parsed resumes</p>
              </div>
            </div>

            {/* Target Job Description Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Target Job Description</label>
              <select
                value={selectedJdId}
                onChange={(e) => setSelectedJdId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
              >
                <option value="">None / Unassigned (Global Candidate Pool)</option>
                {extendedJDs.map((jd) => (
                  <option key={jd.id} value={jd.id}>
                    {jd.title} ({jd.company}) - {jd.id}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-gray-400">
                {selectedJdId 
                  ? "Newly parsed resumes will be matched against this mandate's profile requirements." 
                  : "Newly parsed resumes will be added directly to the general candidate pool without matching constraints."}
              </p>
            </div>

            {/* AI Screening Depth */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">AI Screening Depth</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParseDepth('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    parseDepth === 'standard'
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  <div className="font-bold text-xs">Standard ATS</div>
                  <div className="text-[10px] text-gray-400 mt-1 leading-normal">Extract skills, contact & work history. Fast parse.</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setParseDepth('deep')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    parseDepth === 'deep'
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
                  <div className="font-bold text-xs flex items-center gap-1">
                    Deep AI Screening <Sparkles className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 leading-normal">Generates AI recommendations & coherence matches.</div>
                </button>
              </div>
            </div>

            {/* Experience and Custom Skills Bias */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Experience Limit (Optional)</label>
                <select
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
                >
                  <option value="all">Show All Matches</option>
                  <option value="junior">Junior (0-2 Years)</option>
                  <option value="mid">Mid-level (3-5 Years)</option>
                  <option value="senior">Senior (5+ Years)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Priority Skills (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Python"
                  value={skillsFocus}
                  onChange={(e) => setSkillsFocus(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all text-gray-700 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Upload Ingestion Container */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Resume Upload Area
              </span>
              <button 
                type="button" 
                onClick={injectDummyCandidates}
                className="text-xs font-bold text-brand-blue hover:underline"
              >
                Load Sample Resumes
              </button>
            </div>

            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all min-h-[200px] ${
                isDragging ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 hover:border-brand-blue/40 bg-gray-50/30'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3 border border-brand-blue/20">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-900 block">Drag & Drop multi-page Candidate PDF / DOCX archives</span>
              <span className="text-[10px] text-gray-400 block mt-1">Reads name, contact details, work history and skills from each file automatically</span>

              <label className="mt-4.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-brand-blue rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm">
                Browse Resumes
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleManualSelect}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right column: Parsing Queue and Status list */}
        <div className="lg:col-span-7 flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm justify-between">
          <div className="space-y-5 flex-1 flex flex-col justify-start">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 flex-wrap gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">Resume Processing Queue</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Real-time status of candidate profile extractions</p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500">
                  Queue: <strong className="text-gray-800">{files.length} files</strong>
                </div>
                {parsedCount > 0 && (
                  <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-bold text-emerald-700">
                    {parsedCount} Verified ✓
                  </div>
                )}
              </div>
            </div>

            {/* Queue List Container */}
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-1">
              {files.length === 0 ? (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-xl bg-gray-50/20 text-gray-400">
                  <FileText className="w-10 h-10 text-gray-300 mb-2.5" />
                  <span className="text-xs font-semibold">Queue is empty</span>
                  <span className="text-[10px] mt-1 max-w-xs leading-normal">Configure parameters and drop resumes in the Resume Upload Area to commence parsing.</span>
                </div>
              ) : (
                <div className="space-y-3 pr-1">
                  {files.map((f) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between gap-3 text-xs transition-colors"
                    >
                      {/* File icon preview */}
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                        PDF
                      </div>

                      {/* File meta & progress slider string */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 truncate block">{f.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono ml-2">{f.size}</span>
                        </div>

                        {/* Live Processing status feedback bars */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                f.status === 'ERROR' ? 'bg-red-500' : f.status === 'PARSED' ? 'bg-emerald-500' : 'bg-brand-blue'
                              }`}
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                          
                          {/* Percentage indicator */}
                          <span className="text-[10px] font-mono font-bold text-gray-500 w-10 text-right flex-shrink-0">
                            {f.progress}%
                          </span>

                          {/* Explicit text stage status indicator */}
                          <span className="text-[10px] font-bold uppercase tracking-wider w-20 text-right flex-shrink-0">
                            {f.status === 'QUEUED' && <span className="text-gray-400">QUEUED</span>}
                            {f.status === 'PARSING' && <span className="text-brand-blue animate-pulse">Parsing...</span>}
                            {f.status === 'PARSED' && <span className="text-emerald-600">Verified ✓</span>}
                            {f.status === 'ERROR' && <span className="text-brand-red">Error ✕</span>}
                          </span>
                        </div>

                        {f.error && (
                          <p className="text-[10px] text-brand-red italic pt-0.5">{f.error}</p>
                        )}
                      </div>

                      {/* Dismiss control trigger */}
                      <button 
                        type="button" 
                        onClick={() => removeFile(f.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sync Trigger button footer */}
          <div className="pt-5 mt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {selectedJdId 
                  ? "Profiles automatically compare with the selected active Job Description." 
                  : "Profiles will be ingested directly into the global candidate pool without match assessments."}
              </span>
            </div>

            <button
              disabled={parsedCount === 0}
              onClick={() => navigate('/admin/review-matches')}
              className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              Review Candidate Matches ({parsedCount})
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminUploadResumeScreen;
