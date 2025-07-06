import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthRoute, ProtectedRoute } from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HotelPage from './pages/HotelPage';
import AboutUs from './pages/AboutUs';
import BookingPage from './pages/BookingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />

          <Route path="/signup" element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          } />

          <Route path="/hotelpage" element={
            <ProtectedRoute>
              <HotelPage />
            </ProtectedRoute>
          } />

          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/bookingpage/:hotelId" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />

          <Route path="/search-results" element={
            <ProtectedRoute>
              <SearchResultsPage />
            </ProtectedRoute>
          } />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
