import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutUs from './pages/AboutUs';
import HotelPage from './pages/HotelPage';
import BookingPage from './pages/BookingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/hotelpage" element={<HotelPage />} />
        
        {/* Pass hotel ID dynamically to BookingPage */}
        <Route path="/bookingpage/:hotelId" element={<BookingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
