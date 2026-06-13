import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Clock, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';

const AnalyticsScreen = () => {
  const [searchParams] = useSearchParams();
  const isReportView = searchParams.get('report') === 'true';

  // Analytics view states
  const [timeRange, setTimeRange] = useState('YTD');
  const activeData = mockAnalytics[timeRange] || mockAnalytics.YTD;
  const { funnelData, processingTimes, monthlyScreening, productivityData } = activeData;
  const maxProcessed = Math.max(...monthlyScreening.map(m => m.processed));

  // Reports view states
  const [selectedCategory, setSelectedCategory] = useState('hiring_funnel');
  const [selectedTimeRange, setSelectedTimeRange] = useState('last_30_days');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('');
  const [generatedReports, setGeneratedReports] = useState([
    { id: 1, name: 'ScanJD_Q2_CandidateMatch_Audit_TCS.pdf', category: 'AI Screening Performance', time: '2 hours ago', size: '2.4 MB', format: 'PDF', status: 'Completed' },
    { id: 2, name: 'ScanJD_TalentFunnel_Yield_Wipro.xlsx', category: 'Placement Funnel', time: 'Yesterday', size: '1.1 MB', format: 'EXCEL', status: 'Completed' },
    { id: 3, name: 'ScanJD_Recruiter_LoadBalancer_Infosys.pdf', category: 'Recruiter Productivity', time: '3 days ago', size: '820 KB', format: 'PDF', status: 'Completed' }
  ]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const statuses = [
      "Querying ATS Database indexes...",
      "Analyzing matching coherence weights...",
      "Compiling skill gap matrix distribution...",
      "Rendering print-optimized vector layout...",
      "Finalizing file payload compiling..."
    ];
    
    setGenerationStatus(statuses[0]);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setGenerationProgress(currentProgress);
      
      const statusIndex = Math.min(Math.floor(currentProgress / 20), statuses.length - 1);
      setGenerationStatus(statuses[statusIndex]);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          
          const catName = selectedCategory === 'hiring_funnel' ? 'Placement Sourcing Funnel' :
                          selectedCategory === 'ai_screening' ? 'AI Match Accuracy' :
                          selectedCategory === 'recruiter_productivity' ? 'Recruiter Productivity' :
                          'System Compliance Logs';
          
          const fileExtension = selectedFormat === 'pdf' ? '.pdf' : selectedFormat === 'excel' ? '.xlsx' : '.csv';
          
          const newReport = {
            id: Date.now(),
            name: `ScanJD_Custom_${catName.replace(/\s+/g, '_')}_Compiled${fileExtension}`,
            category: catName,
            time: 'Just now',
            size: selectedFormat === 'pdf' ? '1.8 MB' : selectedFormat === 'excel' ? '820 KB' : '240 KB',
            format: selectedFormat.toUpperCase(),
            status: 'Completed'
          };
          
          setGeneratedReports(prev => [newReport, ...prev]);
          alert(`Report Compilation Complete!\n\nYour file "${newReport.name}" is compiled and ready for deployment.`);
        }, 500);
      }
    }, 150);
  };

  if (isReportView) {
    return (
      <div className="space-y-8 pb-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Analytics & Downloadable Reports</h1>
            <p className="text-sm text-gray-500 mt-1">Configure, render, and download print-ready summaries of AI placement pipelines, recruiter loads, and ATS database audits.</p>
          </div>
        </div>

        {/* Dynamic Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Compiled Reports Pool</span>
            <div className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">142 Logs</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> System-wide export logs verified
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Average Assembly Speed</span>
            <div className="text-3xl font-bold text-brand-blue mt-2 tracking-tight">1.8 Seconds</div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">On-demand compilation engine latency</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Exported PDF File Yield</span>
            <div className="text-3xl font-bold text-brand-purple mt-2 tracking-tight">98.4% Accuracy</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" /> Fully verified vector output compliance
            </p>
          </motion.div>
        </div>

        {/* Split Section: Report Generator Builder (left) and Available Templates (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column Left: Report Builder Form (1/3 width) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-brand-blue" />
                AI Report Generator
              </h3>
              <p className="text-xs text-gray-500 mt-1">Assemble tailored business datasets dynamically below.</p>
            </div>

            <div className="space-y-4">
              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Report Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="hiring_funnel">Placement Sourcing Funnel Yields</option>
                  <option value="ai_screening">AI Match Accuracy & Gap Audit</option>
                  <option value="recruiter_productivity">Recruiter Load & Speed Logs</option>
                  <option value="compliance">System Compliance & Ingest Logs</option>
                </select>
              </div>

              {/* Timeframe selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Date/Time Bounds</label>
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="last_7_days">Last 7 Days (Short Term)</option>
                  <option value="last_30_days">Last 30 Days (Current Month)</option>
                  <option value="year_to_date">Year-to-Date (YTD Metrics)</option>
                  <option value="all_time">All-Time Aggregated History</option>
                </select>
              </div>

              {/* Format selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Export File Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['PDF', 'EXCEL', 'CSV'].map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt.toLowerCase())}
                      className={`py-2 text-center rounded-xl text-xs font-bold border transition-all ${
                        selectedFormat === fmt.toLowerCase()
                          ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compiler simulation progress indicator */}
              {isGenerating && (
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-brand-blue animate-pulse text-[10px]">{generationStatus}</span>
                    <span className="text-gray-900">{generationProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue transition-all duration-300 animate-pulse" style={{ width: `${generationProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Action Compile button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateReport}
                className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-blue/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGenerating ? 'Compiling Dataset...' : 'Compile Executive Data'}
              </button>
            </div>
          </div>

          {/* Column Right: Pre-Configured Templates (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Ready-made Report Templates</h3>
                <p className="text-xs text-gray-500 mt-1">Download immediate print-optimized records with standard formatting presets.</p>
              </div>

              {/* Templates Listing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "AI Resume Screening Match Report", desc: "Cross-checks AI scores against manual evaluations to verify model alignment.", icon: Layers, formats: ["PDF", "CSV"] },
                  { title: "Recruiter Workload & Performance", desc: "Monitors parsing volumes, candidate processing times, and caseloads.", icon: TrendingUp, formats: ["PDF", "EXCEL"] },
                  { title: "Hiring Success Rates & Pipeline Funnel", desc: "Aggregated placement funnel analytics showing drop-off curves and conversion yields.", icon: Clock, formats: ["PDF", "EXCEL", "CSV"] },
                  { title: "Candidate Skill Match & Gap Report", desc: "Deep-dive matrix of the most common skill gaps and requirements across applicant pools.", icon: Sparkles, formats: ["EXCEL", "CSV"] }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl hover:border-brand-blue/20 transition-all flex flex-col justify-between group">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-white border border-gray-100 rounded-lg text-brand-blue flex-shrink-0 group-hover:bg-brand-blue/10 transition-colors">
                          <item.icon className="w-4 h-4 text-brand-blue" />
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-1">{item.title}</h4>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal line-clamp-2">{item.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-gray-400 font-semibold">Formats: {item.formats.join(', ')}</span>
                      <div className="flex gap-1">
                        {item.formats.map(fmt => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => alert(`Simulated Download: Preparing standard vector ${fmt} package for "${item.title}"...`)}
                            className="px-2 py-1 bg-white hover:bg-gray-100 text-gray-600 hover:text-brand-blue border border-gray-200 rounded-lg font-bold text-[9px] transition-all flex items-center gap-0.5"
                          >
                            <Download className="w-2.5 h-2.5" /> {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section bottom: Compilation Logs History */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Upload & Report Creation Log</h3>
            <p className="text-xs text-gray-500 mt-1">Audit log of historically assembled files downloaded by administrators.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  <th className="p-4 pl-6">Compiled Filename</th>
                  <th className="p-4">Report Category</th>
                  <th className="p-4">Time Assembled</th>
                  <th className="p-4">File Size</th>
                  <th className="p-4">Format</th>
                  <th className="p-4">Compilation Status</th>
                  <th className="p-4 pr-6 text-right">Forward File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {generatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-brand-blue/5 transition-colors">
                    <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span className="truncate max-w-[280px]">{report.name}</span>
                    </td>
                    <td className="p-4 text-gray-600 font-semibold">{report.category}</td>
                    <td className="p-4 text-gray-500 font-medium">{report.time}</td>
                    <td className="p-4 text-gray-500 font-mono font-medium">{report.size}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                        report.format === 'PDF' 
                          ? 'bg-red-50 text-brand-red border-red-100' 
                          : report.format === 'EXCEL' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                      }`}>
                        {report.format}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Re-downloading simulated compilation output: ${report.name}`)}
                        className="px-2.5 py-1 bg-white hover:bg-gray-50 text-gray-600 hover:text-brand-blue border border-gray-200 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Standard Analytics View
  return (
    <div className="space-y-8 pb-12">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Enterprise Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Granular hiring funnel metrics, processing efficiency gains, and automated screening velocity.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {['Q1', 'Q2', 'YTD', 'ALL'].map(range => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                timeRange === range 
                  ? 'bg-brand-blue text-white border-brand-blue shadow-sm' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Processing efficiency telemetry cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Avg Parsing Velocity</span>
          <div className="text-3xl font-bold text-gray-900 mt-2 tracking-tight overflow-hidden h-9 flex items-center">
            <motion.span
              key={timeRange + "-avgParsing"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="inline-block"
            >
              {processingTimes.avgParsing}
            </motion.span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> Standard ATS parsing speeds optimized
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">AI Match Evaluation Speed</span>
          <div className="text-3xl font-bold text-brand-blue mt-2 tracking-tight overflow-hidden h-9 flex items-center">
            <motion.span
              key={timeRange + "-aiMatchSpeed"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="inline-block"
            >
              {processingTimes.aiMatchSpeed}
            </motion.span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">Per resume skill cross-verification</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Recruiter Hours Saved</span>
          <div className="text-3xl font-bold mt-2 tracking-tight overflow-hidden h-9 flex items-center">
            <motion.span
              key={timeRange + "-timeSaved"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="inline-block text-brand-purple"
            >
              {processingTimes.timeSaved}
            </motion.span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" /> 80% screening time reduction verified
          </p>
        </motion.div>
      </div>

      {/* Main Grid Viewport: Funnel vs Trajectory graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: Custom Horizontal Funnel Representation */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              Automated Resume Screening Funnel
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Distribution drop-off curves across direct applicant intakes.
            </p>
          </div>

          {/* Actual Funnel UI */}
          <div className="space-y-4 pt-2">
            {funnelData.map((item, idx) => (
              <div key={item.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                      0{idx + 1}
                    </span>
                    {item.stage}
                  </span>
                  <div className="text-right flex items-center justify-end overflow-hidden h-5">
                    <motion.span
                      key={item.count}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-bold text-gray-900 inline-block"
                    >
                      {item.count.toLocaleString()}
                    </motion.span>
                    <motion.span
                      key={item.percentage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-gray-400 font-mono text-[10px] ml-1 inline-block"
                    >
                      ({item.percentage}%)
                    </motion.span>
                  </div>
                </div>

                {/* Animated progress funnel stripe */}
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Overall Conversion Pipeline</span>
            <span className="font-bold text-brand-red">1.7% Select Rate</span>
          </div>
        </div>

        {/* Right column: Custom Multi-bar Monthly Trajectory Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-purple" />
              Monthly Screening Volumes & AI Matches
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Total parses against threshold-cleared shortlists.
            </p>
          </div>

          {/* Custom Stylized Chart Component */}
          <motion.div layout className="h-64 flex items-end gap-4 pt-8 pb-2 px-2 border-b border-gray-100 relative">
            {/* Background grid indicators */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-gray-100 text-[10px] text-gray-400 pl-1">
              2,500 Max parses
            </div>
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-100 text-[10px] text-gray-400 pl-1">
              1,250 parses
            </div>

            {monthlyScreening.map((m) => {
              const parsedHeightPercent = (m.processed / maxProcessed) * 100;
              const matchedHeightPercent = (m.matches / maxProcessed) * 100;

              return (
                <motion.div 
                  layout
                  key={m.month} 
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 16 }}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group origin-bottom"
                >
                  {/* Internal Bar container */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-full relative">
                    {/* Processed bar */}
                    <motion.div 
                      layout
                      initial={{ height: 0 }}
                      animate={{ height: `${parsedHeightPercent}%` }}
                      transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                      className="w-4 bg-brand-blue/20 hover:bg-brand-blue/35 rounded-t relative group-hover:opacity-90 cursor-pointer"
                      title={`Total Uploaded: ${m.processed}`}
                    />
                    {/* Matched candidates bar */}
                    <motion.div 
                      layout
                      initial={{ height: 0 }}
                      animate={{ height: `${matchedHeightPercent}%` }}
                      transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                      className="w-4 bg-brand-blue hover:bg-brand-blue/90 rounded-t relative group-hover:opacity-90 cursor-pointer"
                      title={`AI Matched: ${m.matches}`}
                    />
                  </div>

                  {/* Axis label */}
                  <motion.span layout className="text-xs font-bold text-gray-500 block pt-1">{m.month}</motion.span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 pt-2 text-xs">
            <span className="flex items-center gap-2 text-gray-600">
              <span className="w-3 h-3 bg-brand-blue/20 rounded flex-shrink-0" /> Total Uploaded Resumes
            </span>
            <span className="flex items-center gap-2 text-gray-600 font-semibold">
              <span className="w-3 h-3 bg-brand-blue rounded flex-shrink-0" /> AI Screened Matches (&gt;80%)
            </span>
          </div>
        </div>
      </div>

      {/* Recruiter Productivity Leaderboard Sparklines Viewport */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Departmental ATS Productivity Evaluation</h3>
          <p className="text-xs text-gray-500">Live operational runtime calculation per assigned manager mandate.</p>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-gray-100">
          {productivityData.map((item) => (
            <motion.div 
              layout
              key={item.dept} 
              className="space-y-1.5 p-4 bg-gray-50/50 rounded-xl"
            >
              <span className="text-xs font-bold text-gray-900 block">{item.dept}</span>
              <div className="flex justify-between text-xs text-gray-500 overflow-hidden h-5 items-center">
                <motion.span
                  key={item.parsed}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-medium text-gray-500"
                >
                  {item.parsed}
                </motion.span>
                <motion.span
                  key={item.speed}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-gray-700"
                >
                  {item.speed}
                </motion.span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.speed.split('%')[0]}%` }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                  className={`h-full ${item.trend} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
