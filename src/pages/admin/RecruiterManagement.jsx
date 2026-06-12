import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  TrendingUp,
  Briefcase,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { mockRecruiters } from '../../data/mockData';

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState(mockRecruiters);
  const [searchQuery, setSearchQuery] = useState('');

  // State for simulated modal adding new recruiter
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({
    name: '',
    email: '',
    role: 'Technical Talent Partner',
    activeJDs: 1
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRecruiter.name || !newRecruiter.email) return;

    const initials = newRecruiter.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'R';
    const item = {
      id: `REC-00${recruiters.length + 1}`,
      name: newRecruiter.name,
      email: newRecruiter.email,
      role: newRecruiter.role,
      activeJDs: Number(newRecruiter.activeJDs),
      shortlistedTotal: 0,
      placementRate: '100%',
      efficiencyScore: 95,
      avatar: initials,
      status: 'Active',
      monthlyTrend: [5, 10, 15]
    };

    setRecruiters([item, ...recruiters]);
    setShowAddModal(false);
    setNewRecruiter({ name: '', email: '', role: 'Technical Talent Partner', activeJDs: 1 });
  };

  const filteredRecruiters = recruiters.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Top triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Recruiter Management</h1>
          <p className="text-sm text-gray-500 mt-1">Assign parsing mandates, observe team leaderboard trends, and track shortlisting volume.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Add New Recruiter
        </button>
      </div>

      {/* Top Span: Leaderboard Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recruiters.slice(0, 3).map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden"
          >
            {/* Crown/rank position badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-brand-yellow border border-amber-100 rounded-lg text-xs font-bold">
              <Award className="w-3.5 h-3.5" /> Rank #{i + 1}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple text-white font-bold text-lg flex items-center justify-center shadow-md">
                {r.avatar}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{r.name}</h3>
                <p className="text-xs text-gray-400">{r.role}</p>
              </div>
            </div>

            {/* Micro progress/efficiency meter */}
            <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Active JDs</span>
                <span className="text-sm font-bold text-gray-900">{r.activeJDs}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Shortlisted</span>
                <span className="text-sm font-bold text-brand-purple">{r.shortlistedTotal}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Efficiency</span>
                <span className="text-sm font-bold text-emerald-600">{r.efficiencyScore}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter and Table Viewport */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden space-y-4">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <span>Active Team Index: <strong>{recruiters.length} Registered</strong></span>
          </div>
        </div>

        {/* Complete Recruiter List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Recruiter Name</th>
                <th className="p-4">Assigned Slot Load</th>
                <th className="p-4">Placement Conversion</th>
                <th className="p-4">Efficiency Eval</th>
                <th className="p-4">Simulated Monthly Trajectory</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredRecruiters.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 font-bold text-brand-blue flex items-center justify-center flex-shrink-0">
                        {r.avatar}
                      </div>
                      <div>
                        <div className="text-gray-900 font-bold">{r.name}</div>
                        <div className="text-[11px] text-gray-400 font-normal">{r.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-gray-700">{r.activeJDs} Mandates</span>
                    <span className="text-[10px] text-gray-400 block">Parsing triggered</span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-100">
                      {r.placementRate} Rate
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-blue">{r.efficiencyScore}%</span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-brand-blue rounded-full" style={{ width: `${r.efficiencyScore}%` }} />
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {/* Simulated SVG Trendline sparkline */}
                    <div className="flex items-end gap-1 h-6 pt-1">
                      {r.monthlyTrend.map((val, idx) => (
                        <div
                          key={idx}
                          className="w-2 bg-brand-purple/40 hover:bg-brand-purple rounded-t transition-all"
                          style={{ height: `${Math.min(val * 2, 24)}px` }}
                          title={`Period ${idx + 1}: ${val} Shortlisted`}
                        />
                      ))}
                    </div>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Timeline & Logs Widget */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          Recent Internal Recruiter Activities
        </h3>

        <div className="space-y-3 pt-2">
          {[
            { rec: "Vikram Mehta", act: "Auto-shortlisted 12 candidates matching TCS Staff parameters.", time: "10 mins ago" },
            { rec: "Pooja Sharma", act: "Uploaded JD-FS2026-006 trigger parameters. System extracted 5 skills.", time: "1 hour ago" },
            { rec: "Priya Patel", act: "Closed manual verification cycle for candidate David Chen.", time: "3 hours ago" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs pb-3 border-b border-gray-50 last:border-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
              <div className="flex-1">
                <strong className="text-gray-900">{item.rec}</strong> <span className="text-gray-600">{item.act}</span>
              </div>
              <span className="text-[10px] text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Recruiter Drawer/Modal Simulation */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900">Provision New Recruiter Account</h3>
            <p className="text-xs text-gray-500">Adds an active mandate user directly to the workspace matching logic.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newRecruiter.name}
                  onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newRecruiter.email}
                  onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
                  placeholder="sarah@scanjd.com"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={newRecruiter.role}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, role: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Initial Assign Count</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={newRecruiter.activeJDs}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, activeJDs: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl shadow-sm"
                >
                  Confirm Account
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RecruiterManagement;
