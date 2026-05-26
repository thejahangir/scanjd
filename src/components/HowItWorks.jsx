import { motion } from 'framer-motion';
import { FileText, Cpu, ListChecks } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "1. Upload Job Description",
      description: "Paste your JD or upload a file. Our AI instantly extracts the core requirements, skills, and experience needed.",
      color: "from-brand-blue to-brand-blue/80"
    },
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "2. Scan Candidate Resumes",
      description: "Upload resumes in bulk. The AI Engine scans and cross-references them against the JD using semantic analysis.",
      color: "from-brand-purple to-brand-purple/80"
    },
    {
      icon: <ListChecks className="w-8 h-8 text-white" />,
      title: "3. Get Ranked Candidates",
      description: "Instantly receive a shortlist of top candidates ranked by ATS score, match percentage, and relevance.",
      color: "from-brand-red to-brand-red/80"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand-purple font-semibold tracking-wide uppercase text-sm mb-3">Workflow</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How ScanJD Works
          </h3>
          <p className="text-lg text-gray-600">
            A seamless, 3-step process designed to eliminate manual screening and surface the best talent instantly.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-blue/20 via-brand-purple/20 to-brand-red/20 transform -translate-y-1/2 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl flex items-center justify-center mb-8 relative z-10 transform transition-transform hover:scale-110`}>
                  {step.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
