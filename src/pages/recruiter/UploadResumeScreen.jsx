import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  Layers,
  X,
  FileCheck
} from 'lucide-react';

const UploadResumeScreen = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([
    // Default simulated initial sample file
    { id: '1', name: 'Sarah_Jenkins_Senior_Frontend_CV.pdf', size: '2.4 MB', progress: 100, status: 'PARSED', error: null },
    { id: '2', name: 'David_Chen_UI_Developer.docx', size: '1.8 MB', progress: 100, status: 'PARSED', error: null },
  ]);

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
      { id: `sim-${Date.now()}-1`, name: 'Dr. Alex Mercer_Research_LLM.pdf', size: '4.1 MB', progress: 0, status: 'QUEUED', error: null },
      { id: `sim-${Date.now()}-2`, name: 'Amina_Yusuf_React_Developer.pdf', size: '1.2 MB', progress: 0, status: 'QUEUED', error: null }
    ];
    setFiles(prev => [...prev, ...dummy]);
  };

  const parsedCount = files.filter(f => f.status === 'PARSED').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Upper header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Bulk ATS Resume Ingestion</h1>
        <p className="text-sm text-gray-500 mt-1">Simultaneously parse multi-file candidate pipelines, extract standard skill sets, and assign compatibility score weights.</p>
      </div>

      {/* Main viewport Container */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <span className="text-xs font-bold text-brand-purple uppercase tracking-wider block flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Intake Dropzone Handler
          </span>
          <button 
            type="button" 
            onClick={injectDummyCandidates}
            className="text-xs font-bold text-brand-purple hover:underline"
          >
            Simulate Agency Intake Drop
          </button>
        </div>

        {/* Complete drag and drop container */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
            isDragging ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-200 hover:border-brand-purple/40 bg-gray-50/30'
          }`}
        >
          <div className="w-14 h-14 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-3 border border-brand-purple/20">
            <UploadCloud className="w-7 h-7" />
          </div>
          <span className="text-sm font-bold text-gray-900 block">Drag & Drop multi-page Candidate PDF / DOCX archives</span>
          <span className="text-xs text-gray-400 block mt-1">Core parses standard fields, contacts, timelines, and formats instantly</span>

          <label className="mt-5 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-brand-purple rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm">
            Select Files From System
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleManualSelect}
            />
          </label>
        </div>

        {/* Dynamic processing files array container */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Parsing Pipeline Queue: <strong>{files.length} Document items</strong></span>
            {parsedCount > 0 && (
              <span className="text-emerald-600 font-bold">{parsedCount} Successfully Verified ✓</span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 divide-y divide-gray-50">
            {files.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs italic border border-dashed rounded-xl">
                Queue clean. Awaiting file items to commence parsing metrics.
              </div>
            ) : (
              files.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="pt-2.5 flex items-start justify-between gap-3 text-xs"
                >
                  {/* File icon preview */}
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
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
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            f.status === 'ERROR' ? 'bg-red-500' : f.status === 'PARSED' ? 'bg-emerald-500' : 'bg-brand-purple'
                          }`}
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>

                      {/* Explicit text stage status indicator */}
                      <span className="text-[10px] font-bold uppercase tracking-wider w-20 text-right flex-shrink-0">
                        {f.status === 'QUEUED' && <span className="text-gray-400">QUEUED</span>}
                        {f.status === 'PARSING' && <span className="text-brand-purple animate-pulse">Parsing...</span>}
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
              ))
            )}
          </div>
        </div>

        {/* Global trigger link loop forwarding to Candidate matching view */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Extracted data syncs directly with active <strong>JD Match algorithms</strong>.</span>
          </div>

          <button
            disabled={parsedCount === 0}
            onClick={() => navigate('/recruiter/jd/JD-2026-001')}
            className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            Review Extracted Matches ({parsedCount})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResumeScreen;
