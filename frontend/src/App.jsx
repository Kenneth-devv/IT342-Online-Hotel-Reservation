import React from 'react'; // React is still needed for JSX
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your page components
import LoginPage from './pages/auth/Login/';
import SignupPage from './pages/auth/Signup/';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page. */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Signup page. */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Route for the Home page */}
        <Route path="/home" element={<Home />} />

        {/*
          Default route: When the user lands on the root path ("/") or any unmatched path,
          they will be redirected to the /login page. This ensures the login page is always
          the first thing seen, unless a specific route is entered.

          For testing purposes rani siya ako ra gi set nga dapat login page jud first makita
        */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback for any other unmatched paths (e.g., typos in URL), redirects to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
