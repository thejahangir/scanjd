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
  Users
} from 'lucide-react';
import { initialJobDescriptions } from '../../data/mockData';

// Generate a rich supplemental list to demonstrate massive pipeline UI handling perfectly
const extendedJDs = [
  ...initialJobDescriptions,
  {
    id: "JD-2026-004",
    title: "Principal Cloud Security Architect",
    company: "ApexGuard Networks",
    experienceRequired: "8-12 Years",
    matchingResumesCount: 142,
    matchAccuracy: 96,
    recruiterAssigned: "Elena Rostova",
    status: "Active",
    uploadDate: "2 hours ago",
    skillsRequired: ["AWS IAM", "Kubernetes Sec", "Zero Trust", "Terraform", "Go"],
    badge: "Urgent Priority"
  },
  {
    id: "JD-2026-005",
    title: "Lead AI/ML Research Scientist",
    company: "NexusGen Intelligence",
    experienceRequired: "5-8 Years",
    matchingResumesCount: 88,
    matchAccuracy: 94,
    recruiterAssigned: "Marcus Vance",
    status: "Active",
    uploadDate: "Yesterday",
    skillsRequired: ["PyTorch", "LLM Fine-tuning", "Transformers", "Python", "CUDA"],
    badge: "High Fit"
  },
  {
    id: "JD-2026-006",
    title: "Staff Backend Systems Developer",
    company: "HyperScale Core",
    experienceRequired: "7+ Years",
    matchingResumesCount: 210,
    matchAccuracy: 89,
    recruiterAssigned: "Sarah Jenkins",
    status: "Reviewing",
    uploadDate: "3 days ago",
    skillsRequired: ["Rust", "Distributed Systems", "gRPC", "Kafka", "PostgreSQL"],
    badge: "Standard"
  },
  {
    id: "JD-2026-007",
    title: "VP of Engineering Operations",
    company: "GlobalTrade Matrix",
    experienceRequired: "12+ Years",
    matchingResumesCount: 34,
    matchAccuracy: 91,
    recruiterAssigned: "David Kim",
    status: "Interviewing",
    uploadDate: "5 days ago",
    skillsRequired: ["Engineering Strategy", "Agile Scaling", "Budgeting", "Team Org"],
    badge: "Executive"
  },
  {
    id: "JD-2026-008",
    title: "Senior React Native Architect",
    company: "PulseMobile App",
    experienceRequired: "5-7 Years",
    matchingResumesCount: 165,
    matchAccuracy: 85,
    recruiterAssigned: "Elena Rostova",
    status: "Active",
    uploadDate: "1 week ago",
    skillsRequired: ["React Native", "Redux Toolkit", "iOS/Android Native Modules", "Jest"],
    badge: "Standard"
  },
  {
    id: "JD-2026-009",
    title: "DevOps Infrastructure Manager",
    company: "CloudNative Labs",
    experienceRequired: "6-10 Years",
    matchingResumesCount: 95,
    matchAccuracy: 93,
    recruiterAssigned: "Marcus Vance",
    status: "Active",
    uploadDate: "1 week ago",
    skillsRequired: ["Docker", "GitHub Actions", "ArgoCD", "AWS EKS", "Python"],
    badge: "High Fit"
  },
  {
    id: "JD-2026-010",
    title: "Senior Data Analytics Consultant",
    company: "InsightData Partners",
    experienceRequired: "4-6 Years",
    matchingResumesCount: 120,
    matchAccuracy: 88,
    recruiterAssigned: "Sarah Jenkins",
    status: "Reviewing",
    uploadDate: "2 weeks ago",
    skillsRequired: ["SQL", "Tableau", "Snowflake", "dbt", "ETL Pipelines"],
    badge: "Standard"
  },
  {
    id: "JD-2026-011",
    title: "Director of Product Design (UI/UX)",
    company: "StudioVibe Media",
    experienceRequired: "8+ Years",
    matchingResumesCount: 75,
    matchAccuracy: 92,
    recruiterAssigned: "David Kim",
    status: "Interviewing",
    uploadDate: "2 weeks ago",
    skillsRequired: ["Figma Systems", "Design Strategy", "User Prototyping", "SaaS Aesthetics"],
    badge: "Executive"
  },
  {
    id: "JD-2026-012",
    title: "Lead QA Automation Engineer",
    company: "AssureQuality Systems",
    experienceRequired: "5-8 Years",
    matchingResumesCount: 110,
    matchAccuracy: 87,
    recruiterAssigned: "Elena Rostova",
    status: "Closed",
    uploadDate: "3 weeks ago",
    skillsRequired: ["Cypress", "Selenium", "CI/CD Gates", "TypeScript", "API Testing"],
    badge: "Archived"
  },
  {
    id: "JD-2026-013",
    title: "Core Protocol Cryptographer",
    company: "CipherChain Ledger",
    experienceRequired: "6+ Years",
    matchingResumesCount: 18,
    matchAccuracy: 95,
    recruiterAssigned: "Marcus Vance",
    status: "Active",
    uploadDate: "3 weeks ago",
    skillsRequired: ["Zero Knowledge Proofs", "Rust", "Cryptography", "Consensus Algos"],
    badge: "Urgent Priority"
  },
  {
    id: "JD-2026-014",
    title: "Enterprise Solutions Architect",
    company: "CloudScale Connect",
    experienceRequired: "10+ Years",
    matchingResumesCount: 52,
    matchAccuracy: 90,
    recruiterAssigned: "David Kim",
    status: "Active",
    uploadDate: "1 month ago",
    skillsRequired: ["Cloud Migrations", "B2B Delivery", "System Topologies", "Client Facing"],
    badge: "High Fit"
  },
  {
    id: "JD-2026-015",
    title: "Fullstack Web3 Developer",
    company: "MetaDecentral DAO",
    experienceRequired: "3-5 Years",
    matchingResumesCount: 180,
    matchAccuracy: 82,
    recruiterAssigned: "Sarah Jenkins",
    status: "Reviewing",
    uploadDate: "1 month ago",
    skillsRequired: ["Solidity", "Ethers.js", "Next.js", "Hardhat", "Node.js"],
    badge: "Standard"
  }
];

const AdminJDsPage = () => {
  const navigate = useNavigate();
  const [jds] = useState(extendedJDs);
  
  // Search and query parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('SCORE_DESC');
  const [viewMode, setViewMode] = useState('GRID'); // GRID | TABLE
  
  // Pagination boundary triggers
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'GRID' ? 6 : 10;

  // Granular multidimensional map handling
  const processedJDs = useMemo(() => {
    let result = jds.filter(jd => {
      const matchesSearch = jd.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            jd.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            jd.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            jd.recruiterAssigned.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || jd.status.toUpperCase() === statusFilter.toUpperCase();
      
      return matchesSearch && matchesStatus;
    });

    // Sorting computation
    if (sortBy === 'SCORE_DESC') {
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
    switch(status) {
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
            Enterprise index displaying high-density parsing pipelines, AI coherence scores, and task owner mapping.
          </p>
        </div>

        {/* Global Operational Counters */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm self-start sm:self-auto">
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
      </div>

      {/* Control Strip & View Selector */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
        {/* Top search inputs */}
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search titles, clients, tag patterns, or assignees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all font-medium text-gray-800 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* Sort Criteria */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="SCORE_DESC">Sort: Top Coherence %</option>
                <option value="RESUMES_DESC">Sort: Resumes Count</option>
                <option value="TITLE_ASC">Sort: Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All States ({jds.length})</option>
                <option value="Active">Active</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* View Switcher Pill segment */}
            <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200/60">
              <button 
                onClick={() => setViewMode('GRID')}
                title="Rich Cards Grid View"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'GRID' 
                    ? 'bg-white text-brand-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button 
                onClick={() => setViewMode('TABLE')}
                title="High-Density Scannable Rows"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'TABLE' 
                    ? 'bg-white text-brand-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-strip reporting state */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500">
          <div>
            Found <strong className="text-gray-800">{processedJDs.length}</strong> corresponding mandates matching specified filter constraints
          </div>
          <div className="flex items-center gap-3">
            <span>Total pool coverage: <strong>{totalResumes.toLocaleString()} resumes parsed</strong></span>
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
                onClick={() => navigate(`/admin/jd/${jd.id}`)}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
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
                      <span className="font-semibold text-gray-700">AI Coherence Co-efficient</span>
                      <span className="font-bold text-brand-blue">{jd.matchAccuracy}% Fit</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500"
                        style={{ width: `${jd.matchAccuracy}%` }}
                      />
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
                      <span className="truncate max-w-[120px]">Owner: <strong className="text-gray-700">{jd.recruiterAssigned.split(' ')[0]}</strong></span>
                      <span className="text-emerald-600 font-bold flex-shrink-0">{jd.matchingResumesCount} CVs Processed</span>
                    </div>
                  </div>
                </div>

                {/* Bottom link string execution */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {jd.uploadDate}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:text-brand-blue/90 transition-colors group-hover:translate-x-1 cursor-pointer">
                    View JD Details
                    <ChevronRight className="w-4 h-4" />
                  </span>
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
                <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Mandate Title & Client</th>
                  <th className="p-4">Engine Fit</th>
                  <th className="p-4">Exp Baseline</th>
                  <th className="p-4">Assigned Owner</th>
                  <th className="p-4">Ingested Payload</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Action Forward</th>
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
                      onClick={() => navigate(`/admin/jd/${jd.id}`)}
                      className="hover:bg-brand-blue/5 cursor-pointer transition-colors group"
                    >
                      <td className="p-4 pl-6">
                        <div className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors text-sm">
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

                      <td className="p-4 text-gray-700 font-medium">
                        {jd.recruiterAssigned}
                      </td>

                      <td className="p-4 font-bold text-emerald-600">
                        {jd.matchingResumesCount} Resumes
                      </td>

                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(jd.status)}`}>
                          {jd.status}
                        </span>
                      </td>

                      <td className="p-4 pr-6 text-right font-bold text-brand-blue group-hover:underline">
                        View JD Details →
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
                    className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === pageNum 
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
    </div>
  );
};

export default AdminJDsPage;
