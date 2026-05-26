import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      desc: "For small agencies and startups",
      price: "$49",
      features: ["Up to 500 scans/month", "Standard AI Matching", "Basic ATS Integration", "Email Support"],
      isPopular: false
    },
    {
      name: "Professional",
      desc: "For growing talent teams",
      price: "$149",
      features: ["Unlimited scans", "Advanced Semantic Matching", "Full ATS Integrations", "Client Sharing Links", "Priority Support", "Custom Branding"],
      isPopular: true
    },
    {
      name: "Enterprise",
      desc: "For large corporate HR",
      price: "Custom",
      features: ["Volume Pricing", "Custom AI Models", "Dedicated Account Manager", "SLA Guarantee", "On-Premise Deployment options"],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-purple font-semibold tracking-wide uppercase text-sm mb-3">Pricing</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h3>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your hiring volume. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl bg-white p-8 border ${
                plan.isPopular 
                  ? 'border-brand-blue shadow-2xl shadow-brand-blue/10 transform md:-translate-y-4 md:scale-105 z-10' 
                  : 'border-gray-200 shadow-sm'
              } flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}
              
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h4>
              <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-500 font-medium">/mo</span>}
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  plan.isPopular 
                    ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/30' 
                    : 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
