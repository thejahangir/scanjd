import { motion } from 'framer-motion';

const Benefits = () => {
  const stats = [
    { value: "80%", label: "Less Screening Time" },
    { value: "5x", label: "Faster Hiring Workflow" },
    { value: "92%", label: "Better Candidate Quality" },
    { value: "100+", label: "Hours Saved Monthly" },
  ];

  return (
    <section id="benefits" className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white/90 font-semibold tracking-wide uppercase text-sm mb-3">Business Impact</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transform Your Recruitment Process
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              ScanJD doesn't just sort resumes—it revolutionizes how your entire talent acquisition team operates, bringing unprecedented speed and accuracy to your hiring pipeline.
            </p>
            <button className="px-6 py-3 rounded-full bg-white text-brand-blue font-semibold hover:bg-gray-50 transition-colors shadow-lg shadow-white/10">
              Calculate Your ROI
            </button>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl text-center transform hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
