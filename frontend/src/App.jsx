import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HotelPage from './pages/HotelPage';
import AboutUs from './pages/AboutUs';
import BookingPage from './pages/BookingPage';
import SearchResultsPage from './pages/SearchResultsPage';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route: When the user lands on the root path ("/"), they will see the HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/*
          Route for the Signup page.
          Path changed to '/signup' for consistency with internal navigation
          in LoginPage and SignupPage components.
        */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Route for the Hotel Page */}
        <Route path="/hotelpage" element={<HotelPage />} />

        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/bookingpage/:hotelId" element={<BookingPage />} />
        
        {/* Route for the Search Results Page */}
        <Route path="/search-results" element={<SearchResultsPage />} />

      </Routes>
    </Router>
  );
};

export default App;