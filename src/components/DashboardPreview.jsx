import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Star, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const DashboardPreview = () => {
  const candidates = [
    { id: 1, name: 'Alok Joshi', role: 'Product Designer', match: 96, status: 'Shortlisted', skills: ['Figma', 'UX Research', 'Prototyping'] },
    { id: 2, name: 'Deepak Lal', role: 'UX Designer', match: 91, status: 'Reviewing', skills: ['UI Design', 'Wireframing', 'User Testing'] },
    { id: 3, name: 'Sonal Mehta', role: 'UI Engineer', match: 84, status: 'Pending', skills: ['React', 'CSS', 'Figma'] },
    { id: 4, name: 'Jaideep Wadhwa', role: 'Graphic Designer', match: 62, status: 'Rejected', skills: ['Photoshop', 'Illustrator', 'Branding'] },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-purple font-semibold tracking-wide uppercase text-sm mb-3">Dashboard</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A Recruiter Experience Built for Speed
          </h3>
          <p className="text-lg text-gray-600">
            Manage all your scanned candidates in a clean, powerful interface that gives you actionable insights at a glance.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden"
        >
          {/* Top Bar */}
          <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="font-semibold text-gray-800">ScanJD</span>
              </div>
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
              <h4 className="font-medium text-gray-600 text-sm">Product Designer Role - San Francisco</h4>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filters
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90">
                Export List
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar / Insights Panel */}
            <div className="w-full md:w-64 border-r border-gray-200 bg-gray-50/30 p-6 flex flex-col gap-6">
              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">AI Insights</h5>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Top candidates show strong overlap in <span className="font-semibold text-gray-800">UX Research</span>.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <TrendingUp className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Average match score is <span className="font-semibold text-gray-800">83%</span> for this role.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <AlertCircle className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Missing skill: Motion Design across most resumes.</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Screening Stats</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="text-2xl font-bold text-gray-900">142</div>
                    <div className="text-xs text-gray-500">Scanned</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 shadow-sm text-center">
                    <div className="text-2xl font-bold text-brand-blue">12</div>
                    <div className="text-xs text-brand-blue/70">Shortlisted</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 bg-white">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search candidates by name, skill, or keyword..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  readOnly
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Candidate</th>
                      <th className="pb-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Match Score</th>
                      <th className="pb-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Top Skills</th>
                      <th className="pb-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="pb-3 text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                              {candidate.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{candidate.name}</div>
                              <div className="text-xs text-gray-500">{candidate.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[100px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  candidate.match >= 90 ? 'bg-green-500' : 
                                  candidate.match >= 75 ? 'bg-brand-blue' : 
                                  'bg-brand-yellow'
                                }`} 
                                style={{ width: `${candidate.match}%` }}
                              ></div>
                            </div>
                            <span className="font-semibold text-sm text-gray-700">{candidate.match}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-1 flex-wrap">
                            {candidate.skills.slice(0, 2).map((skill, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 2 && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                                +{candidate.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            candidate.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                            candidate.status === 'Reviewing' ? 'bg-brand-blue/10 text-brand-blue' :
                            candidate.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
