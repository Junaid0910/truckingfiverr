import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-emerald-400" aria-hidden="true" />
              <span className="font-bold text-xl font-['Inter']">The Trucking Vault</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Premier CDL training school dedicated to preparing the next generation of professional truck drivers with comprehensive education and job placement services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-['Inter']">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/programs" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                CDL Programs
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/jobs" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Job Placement
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Student Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-['Inter']">Student Resources</h3>
            <nav className="space-y-2">
              <Link to="/student-portal" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Student Portal
              </Link>
              <Link to="/financing" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Financing Options
              </Link>
              <Link to="/schedule" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Class Schedule
              </Link>
              <Link to="/support" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Support Center
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-['Inter']">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="text-slate-300 text-sm not-italic">
                  123 Training Drive<br />
                  Dallas, TX 75201
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+1234567890" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@truckingvault.com" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                  info@truckingvault.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">
                Refund Policy
              </Link>
              <Link to="/accessibility" className="hover:text-emerald-400 transition-colors">
                Accessibility
              </Link>
            </div>
            <div className="text-sm text-slate-400 text-center md:text-right">
              <p>© {currentYear} The Trucking Vault. All rights reserved.</p>
              
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;