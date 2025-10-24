import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  userRole?: 'student' | 'instructor' | 'admin' | 'employer' | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', public: true },
    { name: 'Programs', href: '/programs', public: true },
    { name: 'About', href: '/about', public: true },
    { name: 'Contact', href: '/contact', public: true },
  ];

  const roleBasedNavigation = {
    student: [
      { name: 'Dashboard', href: '/student/dashboard' },
      { name: 'Courses', href: '/student/courses' },
      { name: 'Jobs', href: '/student/jobs' },
      { name: 'Payments', href: '/student/payments' },
    ],
    instructor: [
      { name: 'Dashboard', href: '/instructor/dashboard' },
      { name: 'Students', href: '/instructor/students' },
      { name: 'Schedule', href: '/instructor/schedule' },
    ],
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard' },
      { name: 'Students', href: '/admin/students' },
      { name: 'Instructors', href: '/admin/instructors' },
      { name: 'Reports', href: '/admin/reports' },
    ],
    employer: [
      { name: 'Dashboard', href: '/employer/dashboard' },
      { name: 'Billing', href: '/employer/billing' },
    ],
  };

  const currentNav = userRole ? roleBasedNavigation[userRole] : navigation;

  return (
  <header className="bg-white shadow-sm border-b sticky top-0 z-50" style={{ borderColor: 'rgba(148,163,184,0.2)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-colors" aria-label="The Trucking Vault - Home">
            <img
              src="/logo.png"
              alt="The Trucking Vault"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              style={{ filter: 'none', maxWidth: '220px' }}
            />
          </Link>

          {/* Right side: desktop nav (hidden on mobile) + mobile button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-8">
            {currentNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  location.pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {userRole ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span className="capitalize">{userRole}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-muted px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-700"
                >
                  Get Started
                </Link>
              </div>
            )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-muted hover:text-primary hover:bg-white/5 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {currentNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {userRole ? (
                  <div className="border-t pt-3 mt-3" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted">
                      <User className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="capitalize">{userRole}</span>
                    </div>
                    <button
                      onClick={() => {
                        onLogout?.();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 text-base font-medium text-muted hover:text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-muted" aria-hidden="true" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-3 mt-3 space-y-1" style={{ borderColor: 'var(--color-border)' }}>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-muted hover:text-primary transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium bg-primary text-white hover:bg-primary-700 rounded-md transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;