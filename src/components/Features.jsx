import { motion } from 'framer-motion';
import { BrainCircuit, Target, UploadCloud, Zap, Share2, LineChart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-brand-blue" />,
      title: "AI Resume Matching",
      description: "Automatically compare resumes with job descriptions using advanced NLP to find the perfect semantic match."
    },
    {
      icon: <Target className="w-6 h-6 text-brand-red" />,
      title: "Smart ATS Scoring",
      description: "Generate candidate relevance scores instantly based on skills, experience, and custom criteria."
    },
    {
      icon: <UploadCloud className="w-6 h-6 text-brand-purple" />,
      title: "Bulk Resume Upload",
      description: "Upload hundreds of resumes at once in various formats (PDF, DOCX) and let the AI process them in seconds."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-yellow" />,
      title: "Instant Shortlisting",
      description: "Identify top candidates within seconds. Define your threshold and get a curated list ready for interview."
    },
    {
      icon: <Share2 className="w-6 h-6 text-green-500" />,
      title: "Client Sharing",
      description: "Export and share shortlisted profiles easily with hiring managers or clients via secure links."
    },
    {
      icon: <LineChart className="w-6 h-6 text-orange-500" />,
      title: "AI Insights",
      description: "Get detailed skill gap analysis and automated hiring recommendations for each candidate profile."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-blue font-semibold tracking-wide uppercase text-sm mb-3">Powerful Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to hire <span className="text-gradient">smarter</span>
          </h3>
          <p className="text-lg text-gray-600">
            Our AI-driven toolkit replaces manual screening, letting you focus on what matters most—connecting with top talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
