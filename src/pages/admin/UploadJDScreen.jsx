import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Loader2,
  X,
  Plus
} from 'lucide-react';
import { extendedJDs, mockRecruiters } from '../../data/mockData';

const UploadJDScreen = () => {
  const navigate = useNavigate();
  const [jdTitle, setJdTitle] = useState('');
  const [company, setCompany] = useState('');
  const [pasteText, setPasteText] = useState('');
  
  // Workflow States
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedRecruiter, setAssignedRecruiter] = useState('');

  const handleSaveJD = (e) => {
    e.preventDefault();
    // Generate a unique ID (e.g. JD-[abbreviation]2026-[increment])
    const count = extendedJDs.length + 1;
    const countStr = String(count).padStart(3, '0');
    
    // Abbreviate title
    const words = jdTitle.trim().split(/\s+/);
    let deptAbbr = 'JD';
    if (words.length >= 2) {
      deptAbbr = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      deptAbbr = words[0].substring(0, 2).toUpperCase();
    }
    const newId = `JD-${deptAbbr}2026-${countStr}`;

    const newJD = {
      id: newId,
      title: jdTitle,
      company: company || "ScanJD Partner",
      experienceRequired: "5-7 Years", // Default/mock value
      matchingResumesCount: Math.floor(Math.random() * 20) + 5, // Simulated processed CVs
      matchAccuracy: Math.floor(Math.random() * 15) + 82, // Simulated AI coherence
      recruiterAssigned: assignedRecruiter,
      status: "Active",
      uploadDate: "Just now",
      skillsRequired: parsedSkills,
      badge: "Newly Added"
    };

    // Save/Push to the shared in-memory array
    extendedJDs.push(newJD);

    // Redirect to the JDs page
    navigate('/admin/jds');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setParsedSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  // Simulated extraction dictionary
  const sampleTechKeywords = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS', 'AWS', 'Docker', 'Next.js', 'Python', 'Kubernetes'];

  const handleSimulatedParse = (e) => {
    e.preventDefault();
    if (!jdTitle || (!pasteText && !uploadedFileName)) {
      alert("Please specify a mandate Job Title alongside either source text or uploaded file block.");
      return;
    }

    setIsParsing(true);
    // Simulate latency calculating AI weights
    setTimeout(() => {
      setIsParsing(false);
      // Auto-tag extraction logic based on random sampling or basic keyword matching
      const extracted = sampleTechKeywords.filter(() => Math.random() > 0.4).slice(0, 5);
      if (extracted.length === 0) extracted.push('React', 'TypeScript', 'Tailwind CSS');
      
      setParsedSkills(extracted);
      setIsSuccess(true);
    }, 1500);
  };

  const fillSampleJD = () => {
    setJdTitle('Staff UI/UX Developer (React/Next)');
    setCompany('Vercel');
    setPasteText(`We are looking for a Staff UI Engineer to drive robust client components. 
Must possess multi-year expertise consuming TypeScript guidelines, optimizing Tailwind CSS tokens, and implementing SSR data pipelines natively using Next.js framework.`);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Create New Job Description</h1>
        <p className="text-sm text-gray-500 mt-1">Initialize intelligent candidate matching algorithms by submitting your job mandate details.</p>
      </div>

      {/* Main interactive viewport container */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Step 1: Basic Job Details
          </span>
          <button 
            type="button" 
            onClick={fillSampleJD}
            className="text-xs font-bold text-brand-blue hover:underline"
          >
            Try a Sample Job
          </button>
        </div>

        {/* Input logic forms */}
        <form onSubmit={handleSimulatedParse} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Target Job Title *</label>
              <input 
                type="text" 
                required
                value={jdTitle}
                onChange={(e) => setJdTitle(e.target.value)}
                placeholder="e.g. Senior Product Designer"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Hiring Organization / Company</label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Airbnb"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900"
              />
            </div>
          </div>

          {/* Source selection choices: File vs Paste */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-700">Source Spec Content (Upload Document OR Paste Text)</label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Drag and drop panel */}
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${
                  isDragging ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 hover:border-brand-blue/40 bg-gray-50/30'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-700 block">Drag & Drop JD Document</span>
                <span className="text-[10px] text-gray-400 block mt-1">Supports standard PDF, DOCX, or pure TXT format</span>
                
                {/* Simulated file selector button */}
                <label className="mt-4 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-brand-blue rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm">
                  Browse Local Files
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) setUploadedFileName(e.target.files[0].name);
                    }}
                  />
                </label>

                {uploadedFileName && (
                  <div className="mt-3 p-2 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-xs font-bold text-brand-blue flex items-center gap-1.5 max-w-full">
                     <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                     <span className="truncate">{uploadedFileName}</span>
                     <button type="button" onClick={() => setUploadedFileName('')} className="hover:text-red-500">
                       <X className="w-3.5 h-3.5" />
                     </button>
                  </div>
                )}
              </div>

              {/* Text field string */}
              <div>
                <textarea 
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Alternatively, paste full raw Job Description details here. AI Skill Extraction Engine interprets plain paragraphs automatically..."
                  className="w-full h-full min-h-[180px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:bg-white transition-all resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Trigger action button */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={isParsing || isSuccess}
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isParsing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-yellow" />
                  Extracting Tags via Engine Core...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                  Skills Extracted Successfully
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-yellow" />
                  Extract Skills with AI
                </>
              )}
            </button>
          </div>
        </form>

        {/* Dynamic Success Extraction State Block */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl space-y-4 pt-4 mt-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-brand-blue flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-yellow" /> Simulated Extraction Results Validated
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Core automatically structured these targeted parameters for initial candidate scoring weights.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => { setIsSuccess(false); setParsedSkills([]); }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Reset Parser
                </button>
              </div>

              {/* Tags grid array */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {parsedSkills.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-white border border-brand-blue/20 text-brand-blue rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5 group">
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      className="text-gray-400 hover:text-brand-red transition-colors cursor-pointer flex items-center justify-center"
                      title={`Remove ${s}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button 
                  type="button"
                  onClick={() => {
                    const extra = prompt("Specify custom parameter requirement:");
                    if (extra) setParsedSkills([...parsedSkills, extra]);
                  }} 
                  className="p-1.5 border border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors"
                  title="Inject manual tag constraint"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Recruiter Assignment Panel */}
              <div className="pt-4 border-t border-brand-blue/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Assign Recruiter *</label>
                    <p className="text-[11px] text-gray-400">Select a recruiter to manage the screening and client communication pipeline.</p>
                  </div>
                  
                  <select
                    value={assignedRecruiter}
                    onChange={(e) => setAssignedRecruiter(e.target.value)}
                    className="w-full sm:w-64 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer text-gray-800"
                  >
                    <option value="">Unassigned (Choose Later)</option>
                    {mockRecruiters.map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.role})</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveJD}
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {assignedRecruiter ? 'Publish Job Description & Assign' : 'Publish Job Description'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UploadJDScreen;
