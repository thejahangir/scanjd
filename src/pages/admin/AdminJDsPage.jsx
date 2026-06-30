import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Filter,
  FileText,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpDown,
  Briefcase,
  Users,
  Plus,
  XCircle,
  RefreshCw,
  X,
  Eye,
  Edit,
  Map,
  Trash2
} from 'lucide-react';
import { extendedJDs, mockRecruiters } from '../../data/mockData';
import SearchableSelect from '../../components/SearchableSelect';
import AddAnotherJDModal from '../../components/AddAnotherJDModal';
import EditJDModal from '../../components/EditJDModal';
import ConfirmModal from '../../components/ConfirmModal';
import MapJDModal from '../../components/MapJDModal';

const parseUploadDate = (dateStr) => {
  if (!dateStr) return 0;
  const now = new Date();
  const str = dateStr.toLowerCase().trim();
  
  if (str === 'just now') {
    return now.getTime();
  }
  if (str.includes('hour')) {
    const hours = parseInt(str) || 1;
    return now.getTime() - hours * 60 * 60 * 1000;
  }
  if (str.includes('yesterday')) {
    return now.getTime() - 24 * 60 * 60 * 1000;
  }
  if (str.includes('day')) {
    const days = parseInt(str) || 1;
    return now.getTime() - days * 24 * 60 * 60 * 1000;
  }
  if (str.includes('week')) {
    const weeks = parseInt(str) || 1;
    return now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000;
  }
  if (str.includes('month')) {
    const months = parseInt(str) || 1;
    return now.getTime() - months * 30 * 24 * 60 * 60 * 1000;
  }
  
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    return parsed;
  }
  return 0;
};

const AdminJDsPage = () => {
  const navigate = useNavigate();
  const [jds, setJds] = useState(extendedJDs);
  const [activeAssignJdId, setActiveAssignJdId] = useState(null);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [isAddAnotherJDModalOpen, setIsAddAnotherJDModalOpen] = useState(false);
  const [jdToEdit, setJdToEdit] = useState(null);
  const [jdToDelete, setJdToDelete] = useState(null);
  const [jdToMap, setJdToMap] = useState(null);

  const handleUpdateRecruiter = (jdId, newRecruiter) => {
    const jdIndex = extendedJDs.findIndex(j => j.id === jdId);
    if (jdIndex !== -1) {
      extendedJDs[jdIndex].recruiterAssigned = newRecruiter;
    }
    setJds([...extendedJDs]);
  };

  // Search and query parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [primarySchool, setPrimarySchool] = useState('');
  const [isRated, setIsRated] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Active');
  const [sortBy, setSortBy] = useState('LATEST');
  const [viewMode, setViewMode] = useState('GRID'); // GRID | TABLE

  // Pagination boundary triggers
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'GRID' ? 6 : 10;

  // Granular multidimensional map handling
  const processedJDs = useMemo(() => {
    let result = jds.filter(jd => {
      // Here we just use nameQuery for simplicity to simulate the 'search' action
      const queryToUse = searchQuery.toLowerCase();
      const matchesSearch = !queryToUse || jd.title.toLowerCase().includes(queryToUse) ||
        jd.company.toLowerCase().includes(queryToUse) ||
        jd.skillsRequired.some(s => s.toLowerCase().includes(queryToUse)) ||
        (jd.recruiterAssigned || '').toLowerCase().includes(queryToUse);

      const matchesStatus = statusFilter === 'ALL' || jd.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });

    // Sorting computation
    if (sortBy === 'LATEST') {
      result.sort((a, b) => parseUploadDate(b.uploadDate) - parseUploadDate(a.uploadDate));
    } else if (sortBy === 'SCORE_DESC') {
      result.sort((a, b) => b.matchAccuracy - a.matchAccuracy);
    } else if (sortBy === 'RESUMES_DESC') {
      result.sort((a, b) => b.matchingResumesCount - a.matchingResumesCount);
    } else if (sortBy === 'TITLE_ASC') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [jds, searchQuery, statusFilter, sortBy]);

  // Reset pagination when parameters pivot
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy, viewMode]);

  const totalPages = Math.ceil(processedJDs.length / itemsPerPage) || 1;
  const paginatedJDs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedJDs.slice(start, start + itemsPerPage);
  }, [processedJDs, currentPage, itemsPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Reviewing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Interviewing': return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20';
      case 'Closed': return 'bg-gray-50 text-gray-500 border-gray-200';
      default: return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
    }
  };

  // Top summary metrics aggregate calculations
  const totalResumes = useMemo(() => jds.reduce((acc, curr) => acc + curr.matchingResumesCount, 0), [jds]);
  const avgAccuracy = useMemo(() => Math.round(jds.reduce((acc, curr) => acc + curr.matchAccuracy, 0) / jds.length), [jds]);
  const activeCount = useMemo(() => jds.filter(j => j.status === 'Active').length, [jds]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">List of Job Description</h1>
          <p className="text-sm text-gray-500 mt-1">
            A complete list of job descriptions showing candidate matching scores and assigned recruiters.
          </p>
        </div>

        {/* Global Operational Counters & CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-stretch sm:self-auto">
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="px-3 py-1.5 bg-brand-blue/5 rounded-xl">
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Mandates</span>
              <span className="text-sm font-extrabold text-brand-blue">{jds.length} Loaded</span>
            </div>
            <div className="px-3 py-1.5 bg-emerald-50/50 rounded-xl">
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Active Flow</span>
              <span className="text-sm font-extrabold text-emerald-700">{activeCount} Jobs</span>
            </div>
            <div className="px-3 py-1.5 bg-brand-purple/5 rounded-xl">
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Avg Coherence</span>
              <span className="text-sm font-extrabold text-brand-purple">{avgAccuracy}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddAnotherJDModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-gray-200 hover:border-brand-blue hover:text-brand-blue text-gray-700 font-bold text-xs rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Another JD
            </button>
            <button
              onClick={() => navigate('/admin/upload-jd')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Job Description
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher Pill segment - Moved above the search panel */}
      <div className="flex justify-end items-center mb-2">
        <div className="flex items-center p-1 bg-white rounded-xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('GRID')}
            title="Rich Cards Grid View"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'GRID'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards View</span>
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            title="High-Density Scannable Rows"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'TABLE'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>
      </div>

      {/* Control Strip & Search Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
        {/* Top search inputs - Redesigned */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-gray-50/50 p-2 rounded-xl">
          {/* Left Side: Name, Primary School, Rated, Clear */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Name Input */}
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                placeholder="Name..."
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-medium text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Primary School Dropdown */}
            <div className="w-full sm:w-64">
              <SearchableSelect
                options={[
                  { id: '1', title: 'Delhi Public School', company: 'New Delhi' },
                  { id: '2', title: 'The Doon School', company: 'Dehradun' },
                  { id: '3', title: 'Mayo College', company: 'Ajmer' }
                ]}
                selectedValue={primarySchool}
                onChange={setPrimarySchool}
                placeholder="Select Primary School..."
                themeColor="blue"
              />
            </div>

            {/* Rated Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input
                  type="checkbox"
                  checked={isRated}
                  onChange={(e) => setIsRated(e.target.checked)}
                  className="peer appearance-none w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue/20 checked:bg-brand-blue checked:border-brand-blue transition-all cursor-pointer"
                />
                <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7L5 11L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Rated</span>
            </label>

            {/* Clear Icon */}
            <button
              onClick={() => {
                setNameQuery('');
                setSearchQuery('');
                setPrimarySchool('');
                setIsRated(false);
              }}
              title="Clear Filters"
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <XCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>

          {/* Right Side: Reload Data, Search Button, View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            <button
              onClick={() => {
                // Simulate reload
                setSearchQuery(nameQuery);
              }}
              title="Reload the Data"
              className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-brand-blue hover:bg-brand-blue/5 hover:border-brand-blue/30 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => {
                setSearchQuery(nameQuery);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              Search
            </button>

          </div>
        </div>

        {/* Sub-strip reporting state */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500">
          <div>
            Found <strong className="text-gray-800">{processedJDs.length}</strong> jobs matching your filters
          </div>
          <div className="flex items-center gap-3">
            <span>Total resumes: <strong>{totalResumes.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Render Output based on Viewport Toggle */}
      {viewMode === 'GRID' ? (
        /* Rich Card Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedJDs.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-400 text-xs bg-white border border-gray-200 rounded-2xl">
              No mapped candidate position clears your custom searching string parameters.
            </div>
          ) : (
            paginatedJDs.map((jd, index) => (
              <motion.div
                key={jd.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual top indicator glow */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(jd.status)}`}>
                      {jd.status}
                    </span>
                    <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-lg text-[10px] font-bold flex items-center gap-1 border border-brand-blue/20">
                      <Sparkles className="w-3 h-3 text-brand-yellow" />
                      {jd.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-3.5 group-hover:text-brand-blue transition-colors line-clamp-1">
                    {jd.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                    <span className="flex items-center gap-1 font-semibold text-gray-700">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {jd.company}
                    </span>
                    <span>•</span>
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{jd.id}</span>
                    <span>•</span>
                    <span>{jd.experienceRequired}</span>
                  </div>

                  {/* Core extracted skills tags array */}
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {jd.skillsRequired.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px] font-medium border border-gray-100/80">
                        {skill}
                      </span>
                    ))}
                    {jd.skillsRequired.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded text-[10px] font-semibold">
                        +{jd.skillsRequired.length - 3}
                      </span>
                    )}
                  </div>

                  {/* AI Metric Score bar */}
                  <div className="mt-4 p-3 bg-gradient-to-br from-gray-50 to-brand-blue/5 rounded-xl border border-brand-blue/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700">AI Match Score</span>
                      <span className="font-bold text-brand-blue">{jd.matchAccuracy}% Fit</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500"
                        style={{ width: `${jd.matchAccuracy}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                      <span>CV Matching Status</span>
                      <span className="text-emerald-600 font-bold">{jd.matchingResumesCount} CVs Processed</span>
                    </div>
                  </div>

                  {/* Recruiter Assignment Row */}
                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between relative">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {jd.recruiterAssigned ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 text-brand-blue font-bold text-[10px] flex items-center justify-center border border-brand-blue/30 shadow-sm flex-shrink-0">
                            {(() => {
                              const r = mockRecruiters.find(rec => rec.name === jd.recruiterAssigned);
                              return r ? r.avatar : jd.recruiterAssigned.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                            })()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-800 truncate leading-tight">
                              {jd.recruiterAssigned}
                            </div>
                            <div className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">
                              {(() => {
                                const r = mockRecruiters.find(rec => rec.name === jd.recruiterAssigned);
                                return r ? r.role : 'Technical Recruiter';
                              })()}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full border border-dashed border-gray-300 bg-gray-50/50 flex items-center justify-center text-gray-400 font-bold text-sm flex-shrink-0">
                            +
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-400 leading-tight font-bold">Unassigned</div>
                            <div className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">No owner assigned</div>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAssignJdId(activeAssignJdId === jd.id ? null : jd.id);
                      }}
                      className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 hover:bg-brand-blue/5 hover:border-brand-blue/30 text-gray-500 hover:text-brand-blue rounded-lg text-[10px] font-bold transition-all select-none cursor-pointer flex-shrink-0"
                    >
                      {jd.recruiterAssigned ? 'Reassign' : 'Assign'}
                    </button>

                    {activeAssignJdId === jd.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAssignJdId(null);
                          }}
                        />
                        
                        <div 
                          className="absolute bottom-full right-0 mb-2 z-20 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 text-xs text-gray-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-3 py-1.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-1 mb-1.5">
                            Assign Recruiter
                          </div>
                          {mockRecruiters.map(r => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => {
                                handleUpdateRecruiter(jd.id, r.name);
                                setActiveAssignJdId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-brand-blue/5 hover:text-brand-blue text-left transition-colors cursor-pointer"
                            >
                              <div className="w-6.5 h-6.5 rounded-full bg-brand-blue/10 text-brand-blue font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-brand-blue/20">
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
                              onClick={() => {
                                handleUpdateRecruiter(jd.id, '');
                                setActiveAssignJdId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-600 text-left border-t border-gray-100 transition-colors cursor-pointer mt-1"
                            >
                              <div className="w-6.5 h-6.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-red-200">
                                ✕
                              </div>
                              <span className="font-bold text-xs">Unassign Recruiter</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom link string execution */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {jd.uploadDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/admin/jd/${jd.id}`)}
                      className="p-1.5 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors cursor-pointer group relative"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setJdToEdit(jd)}
                      className="p-1.5 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors cursor-pointer group relative"
                      title="Edit JD"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setJdToMap(jd)}
                      className="p-1.5 text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors cursor-pointer group relative"
                      title="Map JD"
                    >
                      <Map className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setJdToDelete(jd)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer group relative"
                      title="Delete JD"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        /* High-Density Enterprise Scannable List Layout */
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  <th className="p-4 pl-6">Designation & Client</th>
                  <th className="p-4">Engine Fit</th>
                  <th className="p-4">Exp Baseline</th>
                  <th className="p-4">Assigned Recruiter</th>
                  <th className="p-4">Ingested Payload</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {paginatedJDs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      No corresponding job records pass existing tabular filters.
                    </td>
                  </tr>
                ) : (
                  paginatedJDs.map((jd) => (
                    <tr
                      key={jd.id}
                      className="hover:bg-brand-blue/5 transition-colors group text-gray-900"
                    >
                      <td className="p-4 pl-6">
                        <div className="font-bold text-gray-900 text-sm">
                          {jd.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                          <span className="font-semibold text-gray-600">{jd.company}</span>
                          <span>•</span>
                          <span className="text-gray-400 font-mono">{jd.id}</span>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-brand-blue">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-brand-yellow" />
                          <span>{jd.matchAccuracy}%</span>
                        </div>
                      </td>

                      <td className="p-4 text-gray-600 font-medium">
                        {jd.experienceRequired}
                      </td>

                      <td className="p-4 text-gray-700 font-medium relative" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <div 
                            onClick={() => {
                              setActiveAssignJdId(activeAssignJdId === jd.id ? null : jd.id);
                            }}
                            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all cursor-pointer select-none max-w-[170px] ${
                              jd.recruiterAssigned 
                                ? 'bg-brand-blue/5 border-brand-blue/10 hover:border-brand-blue/30 text-brand-blue' 
                                : 'bg-gray-50 border-gray-200 hover:border-brand-blue/30 text-gray-500 border-dashed'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full font-extrabold text-[8px] flex items-center justify-center flex-shrink-0 ${
                              jd.recruiterAssigned ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {jd.recruiterAssigned 
                                ? (mockRecruiters.find(r => r.name === jd.recruiterAssigned)?.avatar || jd.recruiterAssigned.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()) 
                                : '+'}
                            </div>
                            <span className="font-bold text-[11px] truncate">
                              {jd.recruiterAssigned || 'Assign'}
                            </span>
                          </div>
                        </div>

                        {activeAssignJdId === jd.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveAssignJdId(null)}
                            />
                            
                            <div 
                              className="absolute top-full left-4 mt-1 z-20 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 text-xs text-gray-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="px-3 py-1.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-1 mb-1.5">
                                Assign Recruiter
                              </div>
                              {mockRecruiters.map(r => (
                                <button
                                  key={r.id}
                                  type="button"
                                  onClick={() => {
                                    handleUpdateRecruiter(jd.id, r.name);
                                    setActiveAssignJdId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-brand-blue/5 hover:text-brand-blue text-left transition-colors cursor-pointer"
                                >
                                  <div className="w-6.5 h-6.5 rounded-full bg-brand-blue/10 text-brand-blue font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-brand-blue/20">
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
                                  onClick={() => {
                                    handleUpdateRecruiter(jd.id, '');
                                    setActiveAssignJdId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-600 text-left border-t border-gray-100 transition-colors cursor-pointer mt-1"
                                >
                                  <div className="w-6.5 h-6.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-red-200">
                                    ✕
                                  </div>
                                  <span className="font-bold text-xs">Unassign Recruiter</span>
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </td>

                      <td className="p-4 font-bold text-emerald-600">
                        {jd.matchingResumesCount} Resumes
                      </td>

                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(jd.status)}`}>
                          {jd.status}
                        </span>
                      </td>

                      <td className="p-4 pr-6 text-right relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionMenuId(activeActionMenuId === jd.id ? null : jd.id);
                          }}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer inline-block"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                          </svg>
                        </button>
                        {activeActionMenuId === jd.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveActionMenuId(null);
                              }}
                            />
                            <div 
                              className="absolute top-full right-6 mt-1 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 text-xs text-gray-800 text-left"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  navigate(`/admin/jd/${jd.id}`);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setJdToEdit(jd);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setJdToMap(jd);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors font-medium"
                              >
                                Map JD
                              </button>
                              <button
                                onClick={() => {
                                  setJdToDelete(jd);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Multi-tier Advanced Client-Side Pagination Strip */}
      {totalPages > 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            Showing mapped pipeline subsets <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, processedJDs.length)}</strong> out of <strong>{processedJDs.length}</strong> total query outputs
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            {/* Render dynamic page indicator chips */}
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${currentPage === pageNum
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* "Add Another JD" Modal */}
      <AddAnotherJDModal 
        isOpen={isAddAnotherJDModalOpen} 
        onClose={() => setIsAddAnotherJDModalOpen(false)} 
      />

      <EditJDModal
        isOpen={!!jdToEdit}
        onClose={() => setJdToEdit(null)}
        jdData={jdToEdit}
      />

      <MapJDModal
        isOpen={!!jdToMap}
        onClose={() => setJdToMap(null)}
        jdData={jdToMap}
      />

      <ConfirmModal
        isOpen={!!jdToDelete}
        onClose={() => setJdToDelete(null)}
        onConfirm={() => {
          if (jdToDelete) {
            setJds(prev => prev.filter(j => j.id !== jdToDelete.id));
            setJdToDelete(null);
          }
        }}
        title="Delete Job Description"
        message={`Are you sure you want to delete "${jdToDelete?.title}"? This action cannot be undone.`}
        confirmText="Yes, Delete JD"
        theme="blue"
      />
    </div>
  );
};

export default AdminJDsPage;
