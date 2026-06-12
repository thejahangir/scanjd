import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import NotificationPanel from '../components/NotificationPanel';
import ConfirmModal from '../components/ConfirmModal';
import Logo from '../assets/scanjd-logo.png';
import {
  LayoutDashboard,
  FileText,
  Users,
  Award,
  LogOut,
  Bell,
  Search,
  FileSearch,
  UploadCloud,
  Menu,
  X,
  Sparkles,
  FileUp
} from 'lucide-react';

const RecruiterLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
    { name: 'Job Description', path: '/recruiter/jds', icon: FileText },
    { name: 'Upload Resumes', path: '/recruiter/upload-resume', icon: FileUp },
    { name: 'Candidates', path: '/recruiter/candidates', icon: Users },
    { name: 'Shortlisted', path: '/recruiter/jd/JD-UX2026-001?filter=shortlisted', icon: Award },
  ];

  const checkIsActive = (item) => {
    if (item.path === '/recruiter') {
      return location.pathname === '/recruiter';
    }

    const hasSearchParams = item.path.includes('?');
    if (hasSearchParams) {
      const [basePath, searchPart] = item.path.split('?');
      return location.pathname.includes(basePath) && location.search.includes(searchPart);
    } else {
      if (item.name === 'Job Description') {
        return (location.pathname.includes('/recruiter/jd') || location.pathname.includes('/recruiter/jds')) &&
          !location.search.includes('view=candidates') &&
          !location.search.includes('filter=shortlisted');
      }
      return location.pathname.includes(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col fixed inset-y-0 z-30">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-2.5">
          <img src={Logo} alt="ScanJD Logo" className='logo-scanjd-inner' />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            <span className="text-[10px] ml-1.5 px-1.5 py-0.5 bg-brand-purple/10 text-brand-purple rounded-md font-bold uppercase tracking-wider">Recruiter</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = checkIsActive(item);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={() =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${active
                    ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-brand-red transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-gray-500 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assigned JDs or active talent pipelines..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick action triggers */}
            <button
              onClick={() => navigate('/recruiter/upload-resume')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple border border-brand-purple/30 rounded-lg text-xs font-bold transition-all"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Upload Resumes
            </button>

            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2 text-gray-500 hover:text-brand-purple hover:bg-gray-50 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-yellow rounded-full ring-2 ring-gray-100" />
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 rounded-xl bg-brand-purple text-white font-bold flex items-center justify-center text-sm shadow-sm">
                V
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-bold text-gray-900 leading-tight">Vikram Mehta</div>
                <div className="text-xs text-gray-500">vikram.m@scanjd.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenu && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
            <aside className="relative w-64 bg-white h-full flex flex-col z-50 shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">ScanJD</span>
                <button onClick={() => setMobileMenu(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = checkIsActive(item);
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenu(false)}
                      className={() =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-brand-purple text-white' : 'text-gray-600'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-brand-red transition-all cursor-pointer"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  Logout
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Dynamic Outlet Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Slide-over Notifications Panel */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        role="recruiter"
      />

      {/* Brand-styled Custom Confirm Modal */}
      <ConfirmModal
        isOpen={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={() => {
          logoutConfirmOpen && setLogoutConfirmOpen(false);
          navigate('/auth');
        }}
        title="Confirm Logout"
        message="Are you sure you want to log out? Any unsaved changes in your session will be discarded."
        theme="blue"
      />
    </div>
  );
};

export default RecruiterLayout;
