import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  CreditCard, 
  Briefcase,
  Settings,
  Bell,
  Search,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  userRole: 'student' | 'instructor' | 'admin' | 'employer';
  onLogout: () => void;
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationConfig = {
    student: [
      { name: 'Dashboard', href: '/student/dashboard', icon: Home },
      { name: 'My Courses', href: '/student/courses', icon: BookOpen },
      { name: 'Job Board', href: '/student/jobs', icon: Briefcase },
      { name: 'Payments', href: '/student/payments', icon: CreditCard },
      { name: 'Schedule', href: '/student/schedule', icon: Calendar },
      { name: 'Settings', href: '/student/settings', icon: Settings },
    ],
    instructor: [
      { name: 'Dashboard', href: '/instructor/dashboard', icon: Home },
      { name: 'My Students', href: '/instructor/students', icon: Users },
      { name: 'Schedule', href: '/instructor/schedule', icon: Calendar },
      { name: 'Course Materials', href: '/instructor/materials', icon: BookOpen },
      { name: 'Settings', href: '/instructor/settings', icon: Settings },
    ],
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
      { name: 'Students', href: '/admin/students', icon: Users },
      { name: 'Instructors', href: '/admin/instructors', icon: Users },
      { name: 'Courses', href: '/admin/courses', icon: BookOpen },
      { name: 'Payments', href: '/admin/payments', icon: CreditCard },
      { name: 'Reports', href: '/admin/reports', icon: Calendar },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
    employer: [
      { name: 'Dashboard', href: '/employer/dashboard', icon: Home },
      { name: 'Training Programs', href: '/employer/programs', icon: BookOpen },
      { name: 'Billing', href: '/employer/billing', icon: CreditCard },
      { name: 'Settings', href: '/employer/settings', icon: Settings },
    ],
  };

  const navigation = navigationConfig[userRole];

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('../lib/api').then(({ api }) => {
      (async () => {
        try {
          const resp = await api.get('/profiles/me');
          if (!mounted) return;
          setProfile(resp.profile || null);
        } catch (err) {
          console.error('Failed to load profile for sidebar', err);
        }
      })();
    });

    const onUpdate = (e: any) => { if (e?.detail) setProfile(e.detail); };
    window.addEventListener('profileUpdated', onUpdate as EventListener);
    return () => { mounted = false; window.removeEventListener('profileUpdated', onUpdate as EventListener); };
  }, []);

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'w-full' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
        <Link to="/" className="flex items-center space-x-2 text-emerald-600">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TV</span>
          </div>
          <span className="font-bold text-lg font-['Inter']">Trucking Vault</span>
        </Link>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="avatar" className="w-10 h-10 object-cover" />
            ) : (
              <User className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">{profile?.name || 'Demo User'}</div>
            <div className="text-xs text-slate-500 capitalize">{userRole}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-slate-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-slate-200">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div
                className="fixed inset-0 bg-slate-600 bg-opacity-75"
                onClick={() => setSidebarOpen(false)}
              />
            </motion.div>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
              
              {/* Search */}
              <div className="hidden sm:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                <Bell className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* If App passed children (it currently does) render them; otherwise use Outlet for nested routes */}
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;