import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(true); // Show by default for now
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-0 w-96 max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {authMode === 'login' ? 'Login' : 'Register'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {authMode === 'login' ? (
                <LoginPage
                  onClose={() => setShowAuthModal(false)}
                  onSwitchToRegister={() => setAuthMode('register')}
                />
              ) : (
                <RegisterPage
                  onClose={() => setShowAuthModal(false)}
                  onSwitchToLogin={() => setAuthMode('login')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;