import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Bell, 
  Check, 
  Sparkles, 
  Award, 
  User, 
  Settings, 
  CheckCircle2, 
  ShieldAlert, 
  Inbox, 
  Trash2 
} from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose, role = 'admin' }) => {
  // Initial rich mock data specific to role
  const initialAdminNotifications = [
    { 
      id: 1, 
      type: 'parse', 
      title: 'System-wide Extraction Successful', 
      desc: 'Batch ingest for Stripe APAC Mandate complete. 120 resumes ingested.', 
      time: '12 mins ago', 
      read: false, 
      icon: Sparkles, 
      iconBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      borderColor: 'border-brand-blue/10'
    },
    { 
      id: 2, 
      type: 'matching', 
      title: 'High-Coherence Match Cleared', 
      desc: 'Candidate "Rohan Sharma" cleared 92% threshold for Applied AI Lead.', 
      time: '40 mins ago', 
      read: false, 
      icon: Award, 
      iconBg: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
      borderColor: 'border-brand-purple/10'
    },
    { 
      id: 3, 
      type: 'recruiter', 
      title: 'Recruiter Mandate Authorized', 
      desc: 'Marcus Vance assigned to open AWS Cloud Infrastructure systems role.', 
      time: '2 hours ago', 
      read: true, 
      icon: User, 
      iconBg: 'bg-emerald-50 text-emerald-500 border-emerald-100',
      borderColor: 'border-emerald-100/50'
    },
    { 
      id: 4, 
      type: 'security', 
      title: 'API Ingestion Key Rotated', 
      desc: 'OpenAI GPT-4o API communication key rotated successfully.', 
      time: '1 day ago', 
      read: true, 
      icon: Settings, 
      iconBg: 'bg-gray-50 text-gray-500 border-gray-200',
      borderColor: 'border-gray-200/50'
    }
  ];

  const initialRecruiterNotifications = [
    { 
      id: 1, 
      type: 'parse', 
      title: 'ATS Ingestion Matrix Ready', 
      desc: 'Resume batch for "Core Engineering" parsed. 24 matches detected.', 
      time: '5 mins ago', 
      read: false, 
      icon: Sparkles, 
      iconBg: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
      borderColor: 'border-brand-purple/10'
    },
    { 
      id: 2, 
      type: 'shortlist', 
      title: 'Shortlist Verified by Admin', 
      desc: 'Your recommended shortlist of 4 candidates has been approved by Admin.', 
      time: '1 hour ago', 
      read: false, 
      icon: CheckCircle2, 
      iconBg: 'bg-emerald-50 text-emerald-500 border-emerald-100',
      borderColor: 'border-emerald-100/50'
    },
    { 
      id: 3, 
      type: 'system', 
      title: 'JD Matching Ingest Limit', 
      desc: 'Your current active workspace parsing usage is at 78% of tier bounds.', 
      time: '4 hours ago', 
      read: true, 
      icon: ShieldAlert, 
      iconBg: 'bg-amber-50 text-amber-500 border-amber-100',
      borderColor: 'border-amber-100/50'
    },
    { 
      id: 4, 
      type: 'matching', 
      title: 'Golden Candidate Matched', 
      desc: 'Candidate "Sarah Jenkins" matched 94% skills alignment for UI Dev.', 
      time: 'Yesterday', 
      read: true, 
      iconBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      borderColor: 'border-brand-blue/10'
    }
  ];

  const [notifications, setNotifications] = useState(
    role === 'admin' ? initialAdminNotifications : initialRecruiterNotifications
  );
  
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread'

  // Computed states
  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => activeTab === 'all' || !n.read);
  }, [notifications, activeTab]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Actions
  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Color scheme based on role
  const brandColor = role === 'admin' ? 'bg-brand-blue hover:bg-brand-blue/90' : 'bg-brand-purple hover:bg-brand-purple/90';
  const brandTextColor = role === 'admin' ? 'text-brand-blue' : 'text-brand-purple';
  const tabActiveBg = role === 'admin' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-purple/10 text-brand-purple';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/30 backdrop-blur-[2px] z-50 transition-all"
          />

          {/* Sliding Notifications Panel Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-gray-200 shadow-2xl flex flex-col z-50"
          >
            {/* Header section */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-50 rounded-xl relative">
                  <Bell className="w-5 h-5 text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">Notifications Log</h3>
                  <p className="text-xs text-gray-400 font-medium">Real-time workspace operation feeds</p>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Header Actions */}
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between gap-4">
                <div className="flex bg-gray-100/80 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      activeTab === 'all' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('unread')}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                      activeTab === 'unread' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${
                        role === 'admin' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-purple/10 text-brand-purple'
                      }`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>
            )}

            {/* Notifications Feed */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => {
                    const NotifIcon = notif.icon;
                    return (
                      <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, y: -15 }}
                        onClick={() => handleMarkAsRead(notif.id)}
                        className={`p-4 bg-white border ${
                          notif.read 
                            ? 'border-gray-100 opacity-60' 
                            : `border-gray-200/80 shadow-sm hover:border-gray-300`
                        } rounded-2xl flex gap-3.5 cursor-pointer transition-all relative group overflow-hidden`}
                      >
                        {/* Red unread indicator dot */}
                        {!notif.read && (
                          <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
                            role === 'admin' ? 'bg-brand-blue animate-pulse' : 'bg-brand-purple animate-pulse'
                          }`} />
                        )}

                        {/* Icon Block */}
                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${notif.iconBg}`}>
                          <NotifIcon className="w-5 h-5" />
                        </div>

                        {/* Text Block */}
                        <div className="space-y-1 pr-4">
                          <h4 className={`text-xs font-bold text-gray-900 ${!notif.read ? 'tracking-wide' : ''}`}>
                            {notif.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-medium leading-normal">
                            {notif.desc}
                          </p>
                          <span className="text-[10px] text-gray-400 font-bold block pt-1 font-mono">
                            {notif.time}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  // Empty State Panel
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4 py-16"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Inbox Clean</h4>
                      <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-[220px]">
                        No active operational feeds pending. Take a sip of coffee!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Footer */}
            {notifications.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex-1 py-2 bg-white hover:bg-red-50 text-gray-600 hover:text-brand-red border border-gray-200 hover:border-red-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Archive All
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
