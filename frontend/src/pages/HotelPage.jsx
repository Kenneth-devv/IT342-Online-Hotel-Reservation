import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/HomePage.css";
import "../styles/HotelPage.css";

const HotelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState('Philippines');
  const [city, setCity] = useState('Cebu');
  const [propertyType, setPropertyType] = useState('Hotels');
  const [minPrice, setMinPrice] = useState('50,000');
  const [maxPrice, setMaxPrice] = useState('100,000');
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Complete hotel database
  const allHotels = [
    // Cebu Hotels
    { id: 1, name: 'NuStar Resort & Casino', price: '89,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    { id: 2, name: 'Mandarin Oriental Cebu', price: '95,000', location: 'Mandaue City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop' },
    { id: 3, name: 'Quest Hotel & Conference Center', price: '65,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop' },
    { id: 4, name: 'Cebu R Hotel - Capitol', price: '55,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' },
    { id: 5, name: 'Crimson Resort & Spa Mactan', price: '125,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
    { id: 6, name: 'Shangri-La Mactan Resort & Spa', price: '150,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop' },
    { id: 7, name: 'BE Resorts Mactan', price: '75,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    { id: 8, name: 'Dusit Thani Mactan Cebu Resort', price: '110,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop' },
    { id: 9, name: 'The Henry Hotel Cebu', price: '78,000', location: 'Banilad, Cebu', country: 'Philippines', city: 'Cebu', type: 'Boutique Hotels', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop' },
    { id: 10, name: 'Z Hostel', price: '35,000', location: 'IT Park, Cebu', country: 'Philippines', city: 'Cebu', type: 'Boutique Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' },
    { id: 11, name: 'OYO 106 GV Tower Hotel', price: '45,000', location: 'Lahug, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
    { id: 12, name: 'Radisson Blu Cebu', price: '85,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop' },
    
    // Manila Hotels
    { id: 13, name: 'The Peninsula Manila', price: '120,000', location: 'Makati, Manila', country: 'Philippines', city: 'Manila', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    { id: 14, name: 'Manila Hotel', price: '95,000', location: 'Manila Bay, Manila', country: 'Philippines', city: 'Manila', type: 'Hotels', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop' },
    { id: 15, name: 'EDSA Shangri-La Manila', price: '105,000', location: 'Ortigas, Manila', country: 'Philippines', city: 'Manila', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop' },
    
    // Davao Hotels
    { id: 16, name: 'Marco Polo Davao', price: '80,000', location: 'Davao City, Davao', country: 'Philippines', city: 'Davao', type: 'Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' },
    { id: 17, name: 'Grand Menseng Hotel', price: '60,000', location: 'Davao City, Davao', country: 'Philippines', city: 'Davao', type: 'Hotels', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
    
    // Baguio Hotels
    { id: 18, name: 'The Manor at Camp John Hay', price: '70,000', location: 'Baguio City, Baguio', country: 'Philippines', city: 'Baguio', type: 'Resorts', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop' },
    { id: 19, name: 'Baguio Country Club', price: '85,000', location: 'Baguio City, Baguio', country: 'Philippines', city: 'Baguio', type: 'Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop' },
    
    // International Hotels
    { id: 20, name: 'Four Seasons New York', price: '250,000', location: 'Manhattan, New York', country: 'USA', city: 'New York', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop' },
    { id: 21, name: 'The Ritz-Carlton Tokyo', price: '200,000', location: 'Tokyo, Japan', country: 'Japan', city: 'Tokyo', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop' },
    { id: 22, name: 'Marina Bay Sands', price: '180,000', location: 'Marina Bay, Singapore', country: 'Singapore', city: 'Singapore', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' }
  ];

  // Filter hotels based on search criteria
  const filterHotels = (searchParams = {}) => {
    const {
      country: searchCountry = country,
      city: searchCity = city,
      propertyType: searchPropertyType = propertyType,
      minPrice: searchMinPrice = minPrice,
      maxPrice: searchMaxPrice = maxPrice
    } = searchParams;

    const minPriceNum = parseInt(searchMinPrice.replace(/,/g, ''));
    const maxPriceNum = parseInt(searchMaxPrice.replace(/,/g, ''));

    const filtered = allHotels.filter(hotel => {
      const hotelPrice = parseInt(hotel.price.replace(/,/g, ''));
      
      return (
        hotel.country === searchCountry &&
        hotel.city === searchCity &&
        hotel.type === searchPropertyType &&
        hotelPrice >= minPriceNum &&
        hotelPrice <= maxPriceNum
      );
    });

    setFilteredHotels(filtered);
  };

  // Handle URL search parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.toString()) {
      const urlCountry = searchParams.get('country') || country;
      const urlCity = searchParams.get('city') || city;
      const urlPropertyType = searchParams.get('propertyType') || propertyType;
      const urlMinPrice = searchParams.get('minPrice') || minPrice;
      const urlMaxPrice = searchParams.get('maxPrice') || maxPrice;

      setCountry(urlCountry);
      setCity(urlCity);
      setPropertyType(urlPropertyType);
      setMinPrice(urlMinPrice);
      setMaxPrice(urlMaxPrice);

      filterHotels({
        country: urlCountry,
        city: urlCity,
        propertyType: urlPropertyType,
        minPrice: urlMinPrice,
        maxPrice: urlMaxPrice
      });
    } else {
      // Default filter on initial load
      filterHotels();
    }
  }, [location.search]);

  const handleSearch = () => {
    filterHotels();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBookNow = (hotelId) => {
    navigate(`/bookingpage/${hotelId}`);
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
            <span className="nav-link" onClick={() => handleNavigation('/')}>Home</span>
            <span className="nav-link active" onClick={() => handleNavigation('/hotels')}>Hotels for sale</span>
            <span className="nav-link" onClick={() => handleNavigation('/aboutus')}>About Us</span>
            <span className="nav-link" onClick={() => handleNavigation('/news')}>News</span>
            <span className="nav-link" onClick={() => handleNavigation('/contact')}>Contacts</span>
          </nav>
          <button className="sign-in-btn">Sign In</button>
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
                  
                  </select>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                    <option value="Cebu">Cebu</option>
                    <option value="Manila">Manila</option>
                    <option value="Davao">Davao</option>
                    <option value="Baguio">Baguio</option>
                    <option value="New York">New York</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Singapore">Singapore</option>
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

      {/* Search Results Section */}
      <section className="new-hotels-section" id="hotels">
        <div className="container">
          <h2 className="section-title">
            {filteredHotels.length > 0 
              ? `${filteredHotels.length} Hotels Found in ${city}, ${country}` 
              : `No Hotels Found for Your Search Criteria`
            }
          </h2>
          
          {filteredHotels.length > 0 ? (
            <>
              <div className="hotels-scroll-container">
                <div className="hotels-scroll-wrapper">
                  {filteredHotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-card">
                      <div className="hotel-image">
                        <img src={hotel.image} alt={`${hotel.name} in ${hotel.location}`} />
                      </div>
                      <div className="hotel-info">
                        <div className="hotel-name">{hotel.name}</div>
                        <div className="hotel-price">$ {hotel.price}</div>
                        <div className="hotel-location">{hotel.location}</div>
                        <div className="hotel-type">{hotel.type}</div>
                        <button 
                          className="show-more-btn"
                          onClick={() => handleBookNow(hotel.id)}
                        >
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="view-more-container">
                <button className="view-more-btn">View more...</button>
              </div>
            </>
          ) : (
            <div className="no-results">
              <p>Try adjusting your search criteria:</p>
              <ul>
                <li>Select a different city or country</li>
                <li>Choose a different property type</li>
                <li>Adjust your price range</li>
              </ul>
            </div>
          )}
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