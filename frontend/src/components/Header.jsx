import React, { useState } from 'react';
import { Menu, X, LogOut, User, Shield, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">Bright Hotel</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            type="button" 
            onClick={() => !isActive('/') && navigate('/')}
            disabled={isActive('/')}
            className={`font-medium transition-colors ${
              isActive('/') 
                ? 'text-blue-600 cursor-default' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Home
          </button>
          <button 
            type="button" 
            onClick={() => !isActive('/hotelpage') && navigate('/hotelpage')}
            disabled={isActive('/hotelpage')}
            className={`font-medium transition-colors ${
              isActive('/hotelpage') 
                ? 'text-blue-600 cursor-default' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Hotels
          </button>
          <button 
            type="button" 
            onClick={() => !isActive('/search-results') && navigate('/search-results')}
            disabled={isActive('/search-results')}
            className={`font-medium transition-colors ${
              isActive('/search-results') 
                ? 'text-blue-600 cursor-default' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Search
          </button>
          <button 
            type="button" 
            onClick={() => !isActive('/aboutus') && navigate('/aboutus')}
            disabled={isActive('/aboutus')}
            className={`font-medium transition-colors ${
              isActive('/aboutus') 
                ? 'text-blue-600 cursor-default' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {user?.firstName || user?.username || 'User'}
                </span>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="px-4 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Profile</span>
              </button>
              {(user?.roles?.includes('ADMIN') || user?.roles?.includes('ROLE_ADMIN')) && (
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-4 py-2 rounded-xl text-red-600 border border-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-red-600 border border-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600">
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg py-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col items-center space-y-4">
            <button 
              type="button" 
              onClick={() => { !isActive('/') && navigate('/'); setIsMobileMenuOpen(false); }} 
              disabled={isActive('/')}
              className={`font-medium text-lg py-2 ${
                isActive('/') 
                  ? 'text-blue-600 cursor-default' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button 
              type="button" 
              onClick={() => { !isActive('/hotelpage') && navigate('/hotelpage'); setIsMobileMenuOpen(false); }} 
              disabled={isActive('/hotelpage')}
              className={`font-medium text-lg py-2 ${
                isActive('/hotelpage') 
                  ? 'text-blue-600 cursor-default' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Hotels
            </button>
            <button 
              type="button" 
              onClick={() => { !isActive('/search-results') && navigate('/search-results'); setIsMobileMenuOpen(false); }} 
              disabled={isActive('/search-results')}
              className={`font-medium text-lg py-2 ${
                isActive('/search-results') 
                  ? 'text-blue-600 cursor-default' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Search
            </button>
            <button 
              type="button" 
              onClick={() => { !isActive('/aboutus') && navigate('/aboutus'); setIsMobileMenuOpen(false); }} 
              disabled={isActive('/aboutus')}
              className={`font-medium text-lg py-2 ${
                isActive('/aboutus') 
                  ? 'text-blue-600 cursor-default' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About Us
            </button>
            <div className="w-full border-t border-gray-200 my-2"></div>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="w-4/5 px-5 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}
                  className="w-4/5 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="w-4/5 space-y-2">
                <div className="flex items-center justify-center space-x-2 py-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">
                    {user?.firstName || user?.username || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                  className="w-full px-5 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full px-5 py-2 rounded-xl text-red-600 border border-red-600 hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;