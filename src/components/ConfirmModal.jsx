import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, theme = 'blue' }) => {
  const isPurple = theme === 'purple';
  const accentBg = isPurple ? 'bg-brand-purple' : 'bg-brand-blue';
  const accentHoverBg = isPurple ? 'hover:bg-brand-purple/90' : 'hover:bg-brand-blue/90';
  const accentRing = isPurple ? 'focus:ring-brand-purple/20' : 'focus:ring-brand-blue/20';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* Header Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon and Content */}
            <div className="flex gap-4 items-start pt-2">
              <div className={`p-3 rounded-xl ${isPurple ? 'bg-brand-purple/10 text-brand-purple' : 'bg-brand-blue/10 text-brand-blue'} flex-shrink-0`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{message}</p>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-white font-bold text-xs rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 ${accentBg} ${accentHoverBg} ${accentRing}`}
              >
                Yes, Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
