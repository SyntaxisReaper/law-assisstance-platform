import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Menu, X, Phone, FileText, Users, Home, AlertTriangle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon: Icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive(to)
          ? 'bg-blue-700 text-white'
          : 'text-gray-300 hover:bg-blue-700 hover:text-white'
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </Link>
  );

  const MobileNavLink = ({ to, children, icon: Icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
        isActive(to)
          ? 'bg-blue-700 text-white'
          : 'text-gray-300 hover:bg-blue-700 hover:text-white'
      }`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">
                Law Assistance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NavLink to="/dashboard" icon={Home}>Dashboard</NavLink>
                <NavLink to="/report" icon={FileText}>New Report</NavLink>
                <NavLink to="/reports" icon={FileText}>My Reports</NavLink>
                <NavLink to="/services" icon={Users}>Services</NavLink>
                <NavLink to="/emergency" icon={AlertTriangle}>Emergency</NavLink>
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-300">
                      Welcome, {user.firstName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-900">
            {user ? (
              <>
                <MobileNavLink to="/dashboard" icon={Home} onClick={() => setIsOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/report" icon={FileText} onClick={() => setIsOpen(false)}>
                  New Report
                </MobileNavLink>
                <MobileNavLink to="/reports" icon={FileText} onClick={() => setIsOpen(false)}>
                  My Reports
                </MobileNavLink>
                <MobileNavLink to="/services" icon={Users} onClick={() => setIsOpen(false)}>
                  Services
                </MobileNavLink>
                <MobileNavLink to="/emergency" icon={AlertTriangle} onClick={() => setIsOpen(false)}>
                  Emergency
                </MobileNavLink>
                
                <div className="border-t border-blue-700 pt-4 pb-3">
                  <div className="flex items-center px-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                  <div className="mt-3 px-3">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-700 hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;