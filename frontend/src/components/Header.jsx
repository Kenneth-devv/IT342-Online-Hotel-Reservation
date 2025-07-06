import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isLoggedIn, userFullName, isLoadingAuth, checkLoginStatus } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Logged out successfully from backend.");
        checkLoginStatus();
        navigate('/login');
      } else {
        const errorData = await response.text();
        console.error("Backend logout failed:", errorData);
        checkLoginStatus();
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during logout:", error);
      checkLoginStatus();
      navigate('/login');
    }
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Bright Hotel</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
          {/* Updated path for Hotels */}
          <Link to="/search-results" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Hotels</Link>
          {/* Keeping /deals as a placeholder, assuming a future route */}
          <Link to="/deals" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Deals</Link>
          {/* Updated path for About Us */}
          <Link to="/aboutus" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>
          {/* Keeping /contact as a placeholder, assuming a future route */}
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</Link>
        </nav>

        {/* Auth Buttons / User Info */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoadingAuth ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : isLoggedIn ? (
            <>
              <UserCircle className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700 font-semibold">{userFullName}</span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl text-red-600 border border-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
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
            <Link to="/" onClick={() => handleNavLinkClick('/')} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Home</Link>
            {/* Updated path for Hotels in mobile menu */}
            <Link to="/search-results" onClick={() => handleNavLinkClick('/search-results')} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Hotels</Link>
            <Link to="/deals" onClick={() => handleNavLinkClick('/deals')} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Deals</Link>
            {/* Updated path for About Us in mobile menu */}
            <Link to="/aboutus" onClick={() => handleNavLinkClick('/aboutus')} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">About Us</Link>
            <Link to="/contact" onClick={() => handleNavLinkClick('/contact')} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Contact</Link>
            <div className="w-full border-t border-gray-200 my-2"></div>
            {isLoadingAuth ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2 text-gray-700 font-semibold text-lg py-2">
                  <UserCircle className="w-6 h-6 text-blue-600" />
                  <span>{userFullName}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-4/5 px-5 py-2 rounded-xl text-red-600 border border-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavLinkClick('/login')}
                  className="w-4/5 px-5 py-2 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavLinkClick('/signup')}
                  className="w-4/5 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
