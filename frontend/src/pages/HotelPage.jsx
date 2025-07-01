import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

const HotelPage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('Philippines');
  const [city, setCity] = useState('Cebu');
  const [propertyType, setPropertyType] = useState('Hotels');
  const [minPrice, setMinPrice] = useState('50,000');
  const [maxPrice, setMaxPrice] = useState('100,000');

  const handleSearch = () => {
    console.log('Searching for:', { country, city, propertyType, minPrice, maxPrice });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const hotels = [
    { id: 1, price: '20,000', location: 'Mustang, Cagayan', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    { id: 2, price: '30,000', location: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop' },
    { id: 3, price: '20,000', location: 'Palawan, Cebu', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop' },
    { id: 4, price: '15,000', location: 'Coron', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' },
    { id: 5, price: '45,000', location: 'Boracay', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
    { id: 6, price: '35,000', location: 'Siargao', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop' }
  ];

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h1>Bright Hotel</h1>
          </div>
          <nav className="navigation">
            <span className="nav-link" onClick={() => handleNavigation('/')}>Home</span>
            <span className="nav-link active" onClick={() => handleNavigation('/hotels')}>Hotels for sale</span>
            <span className="nav-link" onClick={() => handleNavigation('/aboutus')}>About Us</span>
            <span className="nav-link" onClick={() => handleNavigation('/news')}>News</span>
            <span className="nav-link" onClick={() => handleNavigation('/contact')}>Contacts</span>
          </nav>
          <button className="sign-in-btn">profile</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">The ease of buying</h2>
              <h2 className="hero-subtitle">a dream hotel</h2>
            </div>

            {/* Search Form */}
            <div className="search-container">
              <div className="search-tabs">
                <button className="search-tab active">BUY HOTELS</button>
                <button className="search-tab">TRADING</button>
                <button className="search-tab">FEATURED</button>
              </div>

              <div className="search-form">
                <div className="form-group">
                  <label>Country</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="form-select">
                    <option value="Philippines">Philippines</option>
                    <option value="USA">USA</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                    <option value="Cebu">Cebu</option>
                    <option value="Manila">Manila</option>
                    <option value="Davao">Davao</option>
                    <option value="Baguio">Baguio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Property Type</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="form-select">
                    <option value="Hotels">Hotels</option>
                    <option value="Resorts">Resorts</option>
                    <option value="Boutique Hotels">Boutique Hotels</option>
                    <option value="Luxury Hotels">Luxury Hotels</option>
                  </select>
                </div>

                <div className="form-group price-group">
                  <label>Price</label>
                  <div className="price-inputs">
                    <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="form-select price-select">
                      <option value="50,000">$ 50,000</option>
                      <option value="100,000">$ 100,000</option>
                      <option value="250,000">$ 250,000</option>
                      <option value="500,000">$ 500,000</option>
                    </select>
                    <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form-select price-select">
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

      {/* New Hotels Section */}
      <section className="new-hotels-section" id="hotels">
        <div className="container">
          <h2 className="section-title">New Hotels</h2>
          <div className="hotels-scroll-container">
            <div className="hotels-scroll-wrapper">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={`Hotel in ${hotel.location}`} />
                  </div>
                  <div className="hotel-info">
                    <div className="hotel-price">$ {hotel.price}</div>
                    <div className="hotel-location">{hotel.location}</div>
                    <button className="show-more-btn">SHOW MORE...</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="view-more-container">
            <button className="view-more-btn">View more...</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Bright Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HotelPage;
