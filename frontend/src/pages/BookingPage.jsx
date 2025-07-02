import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  
  // Hotel data (same as in HotelPage)
  const allHotels = [
    { id: 1, name: 'NuStar Resort & Casino', price: '89,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', rating: 4.8, amenities: ['Pool', 'Casino', 'Spa', 'Restaurant', 'WiFi'] },
    { id: 2, name: 'Mandarin Oriental Cebu', price: '95,000', location: 'Mandaue City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Luxury Hotels', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop', rating: 4.9, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym', 'WiFi'] },
    { id: 3, name: 'Quest Hotel & Conference Center', price: '65,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop', rating: 4.5, amenities: ['Pool', 'Restaurant', 'Conference Room', 'WiFi'] },
    { id: 4, name: 'Cebu R Hotel - Capitol', price: '55,000', location: 'Cebu City, Cebu', country: 'Philippines', city: 'Cebu', type: 'Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop', rating: 4.3, amenities: ['Restaurant', 'WiFi', 'Parking'] },
    { id: 5, name: 'Crimson Resort & Spa Mactan', price: '125,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop', rating: 4.7, amenities: ['Beach', 'Pool', 'Spa', 'Restaurant', 'Water Sports'] },
    { id: 6, name: 'Shangri-La Mactan Resort & Spa', price: '150,000', location: 'Mactan Island, Cebu', country: 'Philippines', city: 'Cebu', type: 'Resorts', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop', rating: 4.9, amenities: ['Beach', 'Pool', 'Spa', 'Golf', 'Multiple Restaurants'] }
  ];

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const hotel = allHotels.find(h => h.id === parseInt(hotelId));
    setSelectedHotel(hotel);
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff > 0 ? dayDiff : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    if (!selectedHotel) return 0;
    const nights = calculateNights();
    const pricePerNight = parseInt(selectedHotel.price.replace(/,/g, ''));
    return nights * pricePerNight * bookingData.rooms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }, 2000);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!selectedHotel) {
    return (
      <div className="booking-page">
        <div className="loading">
          <h2>Hotel not found</h2>
            <button onClick={() => navigate('/hotelpage')} className="back-btn">
      Back to Hotels
    </button>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="booking-page">
        <div className="booking-confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <div className="confirmation-details">
            <p><strong>Hotel:</strong> {selectedHotel.name}</p>
            <p><strong>Guest:</strong> {bookingData.firstName} {bookingData.lastName}</p>
            <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
            <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
            <p><strong>Total:</strong> ${calculateTotal().toLocaleString()}</p>
          </div>
          <div className="confirmation-actions">
            <button onClick={() => navigate('/hotels')} className="primary-btn">
              Book Another Hotel
            </button>
             <button onClick={() => navigate('/hotelpage')} className="back-btn">
      Back to Hotels
    </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h1>Bright Hotel</h1>
          </div>
          <nav className="navigation">
            <span className="nav-link" onClick={() => handleNavigation('/')}>Home</span>
            <span className="nav-link" onClick={() => handleNavigation('/hotels')}>Hotels for sale</span>
            <span className="nav-link" onClick={() => handleNavigation('/news')}>News</span>
            <span className="nav-link" onClick={() => handleNavigation('/contact')}>Contacts</span>
          </nav>
          <button className="sign-in-btn">Sign In</button>
        </div>
      </header>

      <div className="booking-container">
        {/* Hotel Information */}
        <div className="hotel-summary">
          <div className="hotel-image-large">
            <img src={selectedHotel.image} alt={selectedHotel.name} />
            <div className="hotel-rating">
              <span className="rating-score">{selectedHotel.rating}</span>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < Math.floor(selectedHotel.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hotel-details">
            <h1>{selectedHotel.name}</h1>
            <p className="hotel-location">{selectedHotel.location}</p>
            <p className="hotel-type">{selectedHotel.type}</p>
            <div className="hotel-price-display">
              <span className="price">${selectedHotel.price}</span>
              <span className="per-night">per night</span>
            </div>
            
            <div className="amenities">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {selectedHotel.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="booking-form-section">
          <h2>Complete Your Booking</h2>
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-section">
              <h3>Guest Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Booking Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check-in Date *</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="checkOut">Check-out Date *</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i !== 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="rooms">Number of Rooms</label>
                  <select
                    id="rooms"
                    name="rooms"
                    value={bookingData.rooms}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Room{i !== 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Special Requests</h3>
              <div className="form-group">
                <label htmlFor="specialRequests">Additional Notes (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any special requests or notes for your stay..."
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span>Hotel:</span>
                <span>{selectedHotel.name}</span>
              </div>
              <div className="summary-row">
                <span>Dates:</span>
                <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
              </div>
              <div className="summary-row">
                <span>Nights:</span>
                <span>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
              </div>
              <div className="summary-row">
                <span>Rooms:</span>
                <span>{bookingData.rooms} room{bookingData.rooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="summary-row">
                <span>Guests:</span>
                <span>{bookingData.guests} guest{bookingData.guests !== 1 ? 's' : ''}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/hotels')} 
                className="secondary-btn"
              >
                Back to Hotels
              </button>
              <button 
                type="submit" 
                className="primary-btn"
                disabled={isSubmitting || calculateNights() <= 0}
              >
                {isSubmitting ? 'Processing...' : `Book Now - $${calculateTotal().toLocaleString()}`}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Bright Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;