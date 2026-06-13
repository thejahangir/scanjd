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

const generateSummaryParagraph = (title, company, text, filename) => {
  if (text && text.trim().length > 30) {
    const cleanedText = text.replace(/\r?\n|\r/g, " ").trim();
    if (cleanedText.length > 220) {
      return `Summary: ${cleanedText.substring(0, 220)}... This role focuses on scaling ${title} mandates at ${company}.`;
    }
    return cleanedText;
  }
  
  if (filename) {
    const baseName = filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    return `Summarized from uploaded document "${filename}": This document outlines requirements for the ${title} position at ${company}. The candidate will own development workflows, collaborate with product squads, and implement scalable technical solutions. Key focuses include hands-on execution of core parameters related to ${baseName}.`;
  }
  
  return `This role is for a highly capable ${title} at ${company}. The responsibilities include designing scalable systems, collaborating with design and product teams, and optimizing production architectures according to industry standards.`;
};

const UploadJDScreen = () => {
  const navigate = useNavigate();
  const [jdTitle, setJdTitle] = useState('');
  const [company, setCompany] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('Hybrid');
  
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
      experienceRequired: experience || "5-7 Years",
      location: location || "Remote",
      workMode: workMode || "Hybrid",
      description: generateSummaryParagraph(jdTitle, company || "ScanJD Partner", pasteText, uploadedFileName),
      matchingResumesCount: Math.floor(Math.random() * 20) + 5, // Simulated processed CVs
      matchAccuracy: Math.floor(Math.random() * 15) + 82, // Simulated AI coherence
      recruiterAssigned: assignedRecruiter,
      status: "Active",
      uploadDate: "Just now",
      skillsRequired: parsedSkills,
      badge: "Newly Added"
    };

    // Save/Prepend to the shared in-memory array
    extendedJDs.unshift(newJD);

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
    setExperience('5-7 Years');
    setLocation('San Francisco, CA');
    setWorkMode('Hybrid');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-mono">Job Details Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Create New Job Description</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your job description details to start finding matching candidates.</p>
        </div>
      </div>

      {/* Main interactive viewport container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Form Inputs (Ingestion) */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <form onSubmit={handleSimulatedParse} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Step 1: Basic Job Details
                </span>
                <button 
                  type="button" 
                  onClick={fillSampleJD}
                  className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
                >
                  Try a Sample Job
                </button>
              </div>

              {/* Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Target Job Title *</label>
                  <input 
                    type="text" 
                    required
                    value={jdTitle}
                    onChange={(e) => setJdTitle(e.target.value)}
                    placeholder="e.g. Senior Product Designer"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900 focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Hiring Organization / Company</label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Airbnb"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900 focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>

              {/* Experience, Location & Mode of Working */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Experience</label>
                  <input 
                    type="text" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 5-7 Years"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900 focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-semibold text-gray-900 focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Mode of Working</label>
                  <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 gap-1">
                    {['WFH', 'WFO', 'Hybrid'].map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setWorkMode(mode)}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          workMode === mode
                            ? 'bg-brand-blue text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Source Spec content options */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700">Source Spec Content * (Upload Document OR Paste Text)</label>
                
                {/* Drag and drop panel */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all ${
                    isDragging ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 hover:border-brand-blue/40 bg-gray-50/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-2.5">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 block">Drag & Drop JD Document</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Supports standard PDF, DOCX, or pure TXT format</span>
                  
                  {/* Simulated file selector button */}
                  <label className="mt-3 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-brand-blue rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm">
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
                    <div className="mt-2.5 p-2 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-xs font-bold text-brand-blue flex items-center gap-1.5 max-w-full">
                       <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                       <span className="truncate">{uploadedFileName}</span>
                       <button type="button" onClick={() => setUploadedFileName('')} className="hover:text-red-500 cursor-pointer">
                         <X className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  )}
                </div>

                {/* Text field string */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Or Paste Raw JD Details</span>
                  <textarea 
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder="Alternatively, paste full raw Job Description details here. AI Skill Extraction Engine interprets plain paragraphs automatically..."
                    className="w-full min-h-[140px] p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:bg-white transition-all resize-none leading-relaxed text-gray-800 focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>
            </div>

            {/* Trigger action button */}
            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={isParsing || isSuccess}
                className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
        </div>

        {/* Right Column: AI Extraction & Settings (Operations) */}
        <div className="lg:col-span-6 flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm justify-between min-h-[450px]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              // Empty & In-Progress State Card
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 flex-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20 ${isParsing ? 'animate-pulse' : ''}`}>
                  <Sparkles className={`w-7 h-7 ${isParsing ? 'animate-spin' : ''} text-brand-blue`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {isParsing ? 'AI Extraction in Progress...' : 'Awaiting Job Details'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
                    {isParsing 
                      ? 'AI Engine is reading the job description, analyzing key performance markers, and weights...' 
                      : 'Provide job specifications on the left and click "Extract Skills with AI" to generate candidate matching profile constraints.'}
                  </p>
                </div>

                {isParsing && (
                  <div className="w-48 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-blue rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              // Extraction Success State Dashboard
              <motion.div
                key="results-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="flex flex-col justify-between flex-1 space-y-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 flex-wrap gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-brand-blue flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-brand-yellow" /> Skills Successfully Extracted
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">These key skills will be used to score and rank matching resumes.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => { setIsSuccess(false); setParsedSkills([]); }}
                      className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                    >
                      Reset Parser
                    </button>
                  </div>

                  {/* Skills constraints */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Required Skills Constraint Set</label>
                    <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
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
                        className="p-1.5 border border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors flex items-center justify-center bg-white cursor-pointer"
                        title="Inject manual tag constraint"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recruiter Assignment Panel */}
                <div className="pt-5 border-t border-gray-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-blue/5 p-4 rounded-xl border border-brand-blue/10">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-800">Assign Recruiter *</label>
                      <p className="text-[10px] text-gray-500">Select a recruiter to manage this candidate matching pipeline.</p>
                    </div>
                    
                    <select
                      value={assignedRecruiter}
                      onChange={(e) => setAssignedRecruiter(e.target.value)}
                      className="w-full sm:w-60 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer text-gray-800"
                    >
                      <option value="">Unassigned (Choose Later)</option>
                      {mockRecruiters.map(r => (
                        <option key={r.id} value={r.name}>{r.name} ({r.role})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleSaveJD}
                      className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
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
    </div>
  );
};

export default UploadJDScreen;
