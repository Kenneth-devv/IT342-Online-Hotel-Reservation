import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="page">
      {/* Header with navigation */}
      <header className="page-header">
        <div className="nav-container">
          <div className="logo">
            <h1>Bright Hotel</h1>
          </div>

          {/* ✅ Your requested navigation */}
          <nav className="navigation">
            <span className="nav-link" onClick={() => handleNavigation('/')}>Home</span>
            <span className="nav-link" onClick={() => handleNavigation('/hotelPage')}>Hotels</span>
            <span className="nav-link active" onClick={() => handleNavigation('/about')}>About Us</span>
            <span className="nav-link" onClick={() => handleNavigation('/news')}>News</span>
            <span className="nav-link" onClick={() => handleNavigation('/contact')}>Contacts</span>
          </nav>

          <button className="sign-in-btn" onClick={() => handleNavigation('/login')}>
            Sign In
          </button>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Us</h2>
              <p>
                Welcome to Bright Hotel, your trusted partner in finding and purchasing premium hotels worldwide. 
                With years of experience in the hospitality industry, we specialize in connecting investors with 
                exceptional hotel properties that offer both luxury and profitable returns.
              </p>
              <p>
                Our team of experts carefully curates each property listing to ensure quality, authenticity, 
                and investment potential. Whether you're looking for a boutique hotel in the Philippines or 
                a luxury resort in Southeast Asia, we're here to make your dream investment a reality.
              </p>
            </div>
            <div className="about-image">
              [About Us Image - Replace with your image]
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Bright Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;