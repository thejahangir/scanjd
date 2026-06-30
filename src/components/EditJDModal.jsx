import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Plus, Trash2, Calendar } from 'lucide-react';
import SearchableSelect from './SearchableSelect';
import ConfirmModal from './ConfirmModal';

const AccordionItem = ({ title, isOpen, onToggle, children }) => {
  const [isFullyOpen, setIsFullyOpen] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsFullyOpen(false);
    }
  }, [isOpen]);

  return (
    <div className={`border border-gray-200 rounded-xl mb-3 bg-white shadow-sm ${isOpen && isFullyOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <span className="font-bold text-gray-900">{title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={() => setIsFullyOpen(true)}
            className={isOpen && isFullyOpen ? 'overflow-visible' : 'overflow-hidden'}
          >
            <div className="p-5 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EditJDModal = ({ isOpen, onClose, jdData }) => {
  const [activeSection, setActiveSection] = useState('Job Info');
  const [assessmentType, setAssessmentType] = useState('Interview');
  const [secondarySkills, setSecondarySkills] = useState([{ id: 1, skill: '', needComments: false }]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // State for SearchableSelect components
  const [jobType, setJobType] = useState('');
  const [domain, setDomain] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [designation, setDesignation] = useState('');

  const toggleSection = (section) => {
    setActiveSection(prev => prev === section ? '' : section);
  };

  const handleAddSecondarySkill = () => {
    setSecondarySkills(prev => [...prev, { id: Date.now(), skill: '', needComments: false }]);
  };

  const handleRemoveSecondarySkill = (id) => {
    setSecondarySkills(prev => prev.filter(s => s.id !== id));
  };

  const updateSecondarySkill = (id, skillValue) => {
    setSecondarySkills(prev => prev.map(s => s.id === id ? { ...s, skill: skillValue } : s));
  };

  const toggleSecondarySkillComment = (id) => {
    setSecondarySkills(prev => prev.map(s => s.id === id ? { ...s, needComments: !s.needComments } : s));
  };

  useEffect(() => {
    if (jdData && isOpen) {
      setJobType('1'); // Sample defaults or map from jdData if available
      setDomain('1');
      setPrimarySkill('1');
      setCurrentLocation('1');
      setDesignation(jdData.title || '');
      // other fields can be populated here based on jdData
    }
  }, [jdData, isOpen]);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Job Description</h3>
                <p className="text-sm text-gray-500 mt-0.5">Please provide the details below</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
              
              {/* Job Info Section */}
              <AccordionItem
                title="Job Info"
                isOpen={activeSection === 'Job Info'}
                onToggle={() => toggleSection('Job Info')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Type & Job Code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Job Type <span className="text-red-500">*</span></label>
                    <SearchableSelect
                      options={[{ id: '1', title: 'Full Time' }, { id: '2', title: 'Contract' }, { id: '3', title: 'Freelance' }]}
                      selectedValue={jobType}
                      onChange={setJobType}
                      placeholder="Select Job Type"
                      themeColor="blue"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Job Code <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Job Code *" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400" />
                  </div>

                  {/* Textareas */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Job Description <span className="text-red-500">*</span></label>
                    <textarea rows="4" placeholder="Job Description *" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400 resize-none"></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Client Inputs <span className="text-red-500">*</span></label>
                    <textarea rows="4" placeholder="Client Inputs *" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400 resize-none"></textarea>
                  </div>

                  {/* Assessment Type & Name */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700">Assessment Type <span className="text-red-500">*</span></label>
                      <div className="flex bg-gray-100 p-1 rounded-xl w-fit border border-gray-200/50">
                        <button
                          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${assessmentType === 'Interview' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
                          onClick={() => setAssessmentType('Interview')}
                        >
                          Interview
                        </button>
                        <button
                          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${assessmentType === 'Interview + CodeTest' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
                          onClick={() => setAssessmentType('Interview + CodeTest')}
                        >
                          Interview + CodeTest
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Assessment Name</label>
                      <input type="text" placeholder="Assessment Name" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400" />
                    </div>
                  </div>

                  {/* Job Requirements */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-brand-blue">Job Requirements</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Schedule Zoom Interview', 'Add Process Steps', 'Calibration Call', 'Client Approved', 'Panels Available'].map((req, idx) => (
                        <label key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-brand-blue/40 transition-colors cursor-pointer group">
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{req}</span>
                          <div className="relative flex items-center justify-center w-5 h-5 ml-2">
                            <input
                              type="checkbox"
                              className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-brand-blue/20 checked:bg-brand-blue checked:border-brand-blue transition-all cursor-pointer"
                            />
                            <svg className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Technology Section */}
              <AccordionItem
                title="Technology"
                isOpen={activeSection === 'Technology'}
                onToggle={() => toggleSection('Technology')}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Domain <span className="text-red-500">*</span></label>
                      <SearchableSelect
                        options={[{ id: '1', title: 'Software Engineering' }, { id: '2', title: 'Data Science' }]}
                        selectedValue={domain}
                        onChange={setDomain}
                        placeholder="Select Domain"
                        themeColor="blue"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Primary Skill <span className="text-red-500">*</span></label>
                      <SearchableSelect
                        options={[{ id: '1', title: 'React' }, { id: '2', title: 'Python' }]}
                        selectedValue={primarySkill}
                        onChange={setPrimarySkill}
                        placeholder="Select Primary Skill"
                        themeColor="blue"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                      <h4 className="font-bold text-gray-900">Secondary Skills</h4>
                      <button
                        onClick={handleAddSecondarySkill}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        ADD NEW SKILL
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {secondarySkills.map((skill, index) => (
                        <div key={skill.id} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                          <div className="flex-1 w-full relative">
                             <div className="absolute -top-2 left-3 bg-gray-50 px-1 text-[10px] font-bold text-brand-blue z-10">Secondary Skill {index + 1} *</div>
                             <SearchableSelect
                               options={[{ id: '1', title: 'TypeScript' }, { id: '2', title: 'Node.js' }, { id: '3', title: 'MongoDB' }]}
                               selectedValue={skill.skill}
                               onChange={(val) => updateSecondarySkill(skill.id, val)}
                               placeholder="Select Skill..."
                               themeColor="blue"
                             />
                          </div>
                          
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <label className="flex items-center gap-2 cursor-pointer group shrink-0">
                              <div className="relative flex items-center justify-center w-4 h-4">
                                <input
                                  type="checkbox"
                                  checked={skill.needComments}
                                  onChange={() => toggleSecondarySkillComment(skill.id)}
                                  className="peer appearance-none w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue/20 checked:bg-brand-blue checked:border-brand-blue transition-all cursor-pointer"
                                />
                                <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                                  <path d="M1 7L5 11L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">Need Comments</span>
                            </label>
                            
                            <button
                              onClick={() => handleRemoveSecondarySkill(skill.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* General Info Section */}
              <AccordionItem
                title="General Info"
                isOpen={activeSection === 'General Info'}
                onToggle={() => toggleSection('General Info')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Min Experience <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Min Experience *" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Max Experience <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Max Experience *" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Posting Start Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400 appearance-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Posting End Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400 appearance-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Current Location <span className="text-red-500">*</span></label>
                    <SearchableSelect
                      options={[{ id: '1', title: 'New York' }, { id: '2', title: 'London' }]}
                      selectedValue={currentLocation}
                      onChange={setCurrentLocation}
                      placeholder="Select Current Location"
                      themeColor="blue"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Designation <span className="text-red-500">*</span></label>
                    <SearchableSelect
                      options={[{ id: '1', title: 'Senior Developer' }, { id: '2', title: 'Lead Engineer' }]}
                      selectedValue={designation}
                      onChange={setDesignation}
                      placeholder="Select Designation"
                      themeColor="blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Highest Pay <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Highest Pay *" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-gray-800 placeholder-gray-400" />
                  </div>
                </div>
              </AccordionItem>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                Update Job Description
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    
    {/* Confirmation Modal */}
    <ConfirmModal
      isOpen={isConfirmModalOpen}
      onClose={() => setIsConfirmModalOpen(false)}
      onConfirm={() => {
        setIsConfirmModalOpen(false);
        // Simulate save process and close
        onClose();
      }}
      title="Update Job Description"
      message="Are you sure you want to save changes to this Job Description?"
      confirmText="Yes, Update JD"
      theme="blue"
    />
    </>
  );
};

export default EditJDModal;
