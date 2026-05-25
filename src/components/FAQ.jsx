import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How accurate is the AI matching algorithm?",
      answer: "Our AI uses advanced semantic analysis, meaning it understands context, synonyms, and related skills—not just exact keyword matches. It consistently achieves over 95% accuracy compared to human technical recruiters."
    },
    {
      question: "Can I use ScanJD with my existing ATS?",
      answer: "Yes! ScanJD integrates with major ATS platforms like Greenhouse, Lever, and Workday. You can import candidates directly or export your shortlisted candidates back to your ATS."
    },
    {
      question: "Is candidate data kept secure and private?",
      answer: "Absolutely. We are SOC2 and GDPR compliant. All resumes are encrypted at rest and in transit. We never use your candidate data to train our public models, and data is automatically deleted based on your retention policies."
    },
    {
      question: "How does the 'Client Sharing' feature work?",
      answer: "You can select your top candidates and generate a secure, password-protected link. Your hiring managers or clients will see a clean dashboard with candidate resumes, match scores, and AI insights—no login required for them."
    },
    {
      question: "What file formats are supported for bulk upload?",
      answer: "We support PDF, DOCX, DOC, TXT, and RTF files. You can upload them individually, drag and drop in bulk, or upload a ZIP file containing multiple resumes."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-brand-blue shadow-md' : 'border-gray-200'}`}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between bg-white focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-semibold text-left text-gray-900">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-blue' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 bg-white">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
