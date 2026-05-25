import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "ScanJD reduced our initial screening time by over 80%. We used to spend hours reading through hundreds of resumes, now we get the top 10 candidates instantly.",
      author: "Jessica T.",
      role: "Head of Talent Acquisition",
      company: "TechFlow Solutions",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      quote: "The AI matching is incredibly accurate. It catches nuanced skills that simple keyword searches miss. It's like having an extra senior technical recruiter on the team.",
      author: "Marcus R.",
      role: "Senior Tech Recruiter",
      company: "Innovate Partners",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      quote: "Client sharing features make our agency look so much more professional. We send a clean, branded dashboard of shortlisted candidates instead of messy PDF piles.",
      author: "Sarah L.",
      role: "Agency Director",
      company: "Apex Staffing",
      image: "https://i.pravatar.cc/150?img=32"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-blue font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Modern Recruiting Teams
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-brand-yellow" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-8 italic">"{test.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={test.image} alt={test.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h5 className="font-bold text-gray-900">{test.author}</h5>
                  <p className="text-xs text-gray-500">{test.role}, {test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
