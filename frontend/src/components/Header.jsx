import React, { useState } from 'react';
import { Menu, X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">Bright Hotel</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button type="button" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</button>
          <button type="button" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Hotels</button>
          <button type="button" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Deals</button>
          <button type="button" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</button>
          <button type="button" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
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
            <button type="button" onClick={() => { /* navigate('/home'); */ setIsMobileMenuOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Home</button>
            <button type="button" onClick={() => { /* navigate('/hotels'); */ setIsMobileMenuOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Hotels</button>
            <button type="button" onClick={() => { /* navigate('/deals'); */ setIsMobileMenuOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Deals</button>
            <button type="button" onClick={() => { /* navigate('/aboutus'); */ setIsMobileMenuOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">About Us</button>
            <button type="button" onClick={() => { /* navigate('/contact'); */ setIsMobileMenuOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2">Contact</button>
            <div className="w-full border-t border-gray-200 my-2"></div>
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;