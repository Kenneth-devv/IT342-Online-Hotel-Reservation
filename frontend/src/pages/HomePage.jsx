import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('Philippines');
  const [city, setCity] = useState('Cebu');
  const [propertyType, setPropertyType] = useState('Hotels');
  const [minPrice, setMinPrice] = useState('50,000');
  const [maxPrice, setMaxPrice] = useState('100,000');

  const handleSearch = () => {
    // Create search parameters
    const searchParams = new URLSearchParams({
      country,
      city,
      propertyType,
      minPrice,
      maxPrice
    });
    
    // Navigate to hotels page with search parameters
    navigate(`/hotelPage?${searchParams.toString()}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h1>Bright Hotel</h1>
          </div>
          <nav className="navigation">
            <span className="nav-link active" onClick={() => handleNavigation('/')}>Home</span>
            <span className="nav-link" onClick={() => handleNavigation('/hotelpage')}>Hotels</span>
            <span className="nav-link" onClick={() => handleNavigation('/news')}>News</span>
            <span className="nav-link" onClick={() => handleNavigation('/contact')}>Contacts</span>
          </nav>
          <button className="sign-in-btn" onClick={() => handleNavigation('/login')}>
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">The ease of buying</h2>
            <h2 className="hero-subtitle">a dream hotel</h2>
          </div>

          {/* Search Container */}
          <div className="search-container">
            <div className="search-tabs">
              <button className="search-tab active">BUY HOTELS</button>
              <button className="search-tab">TRADING</button>
              <button className="search-tab">FEATURED</button>
            </div>
            
            <div className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-select"
                  >
                    <option value="Philippines">Philippines</option>
                    
                  </select>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <select 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="form-select"
                  >
                    <option value="Cebu">Cebu</option>
                    <option value="Manila">Manila</option>
                    <option value="Davao">Davao</option>
                    <option value="Baguio">Baguio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Property Type</label>
                  <select 
                    value={propertyType} 
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Hotels">Hotels</option>
                    <option value="Resorts">Resorts</option>
                    <option value="Boutique Hotels">Boutique Hotels</option>
                    <option value="Luxury Hotels">Luxury Hotels</option>
                  </select>
                </div>

                <div className="form-group price-group">
                  <label>Price</label>
                  <div className="price-inputs">
                    <select 
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="form-select price-select"
                    >
                      <option value="50,000">$ 50,000</option>
                      <option value="100,000">$ 100,000</option>
                      <option value="250,000">$ 250,000</option>
                      <option value="500,000">$ 500,000</option>
                    </select>
                    <select 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="form-select price-select"
                    >
                      <option value="100,000">$ 100,000</option>
                      <option value="250,000">$ 250,000</option>
                      <option value="500,000">$ 500,000</option>
                      <option value="1,000,000">$ 1,000,000</option>
                    </select>
                  </div>
                </div>

                <button className="search-btn" onClick={handleSearch}>SEARCH</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area - Empty for your components */}
      <section className="content-area">
        {/* Add your photo components here */}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Bright Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;