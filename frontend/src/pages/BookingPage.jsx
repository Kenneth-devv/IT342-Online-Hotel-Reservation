import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import "../styles/BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelName } = useParams();
  const { user, isAuthenticated } = useAuth();
  
  // Get hotel and room data from navigation state
  const hotelFromState = location.state?.hotel;
  const selectedRoomFromState = location.state?.selectedRoom;

  // Default hotel data structure for fallback
  const getDefaultHotelData = () => ({
    id: 1,
    name: 'Luxurious Grand Hotel Cebu',
    location: 'Cebu City, Cebu - City center, near Ayala Center',
    rating: 4.9,
    reviews: 2500,
    description: 'Experience unparalleled luxury and comfort at the Grand Hotel Cebu.',
    mainImage: 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
    pricePerNight: 9500,
    price: '₱9,500',
    currency: '₱',
    type: 'Luxury Hotels',
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Gym/Fitness Center',
      'Restaurant',
      'Bar/Lounge',
      'Free Parking',
      'Air conditioning',
      '24-hour front desk',
      'Spa services',
      'Room service',
      'Breakfast included',
      'Concierge service'
    ]
  });

  // Get the actual hotel data
  const selectedHotel = hotelFromState || getDefaultHotelData();
  const selectedRoom = selectedRoomFromState || {
    name: 'Deluxe King Room',
    price: selectedHotel.pricePerNight || 9500,
    description: 'Spacious room with a king-size bed, perfect for couples or solo travelers.'
  };

  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    specialRequests: '',
    bookingFor: 'self' // 'self' or 'other'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [showGCashQR, setShowGCashQR] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState(null);

  // Auto-populate or clear guest information based on booking selection
  useEffect(() => {
    if (bookingData.bookingFor === 'self' && isAuthenticated && user) {
      setBookingData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    } else if (bookingData.bookingFor === 'other') {
      setBookingData(prev => ({
        ...prev,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }));
    }
  }, [bookingData.bookingFor, isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent selecting "self" if user is not authenticated
    if (name === 'bookingFor' && value === 'self' && !isAuthenticated) {
      return;
    }
    
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    setShowGCashQR(e.target.value === 'GCash');
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPaymentProofPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPaymentProofPreview(null);
    }
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
    const nights = calculateNights();
    const pricePerNight = selectedRoom.price || selectedHotel.pricePerNight || 9500;
    return nights * pricePerNight * bookingData.rooms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let paymentProofUrl = null;
    if (paymentMode === 'GCash' && paymentProof) {
      // Simulate upload, in real app use a backend endpoint for file upload
      paymentProofUrl = paymentProofPreview; // For demo, just use base64
    }

    const requestBody = {
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      roomType: selectedRoom.name,
      bookingFor: bookingData.bookingFor,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guestDetails: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
      },
      numberOfGuests: bookingData.guests,
      numberOfRooms: bookingData.rooms,
      paymentMode: paymentMode,
      paymentProof: paymentProofUrl,
      specialRequests: bookingData.specialRequests,
      totalAmount: calculateTotal()
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }

      const result = await response.json();

      console.log("Booking Success:", result);
      setBookingConfirmed(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error("Error booking hotel:", error);
      setIsSubmitting(false);
      alert(error.message || "There was an issue processing your booking. Please try again.");
    }
  };



  if (bookingConfirmed) {
    return (
      <div className="booking-page">
        <div className="booking-confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <div className="confirmation-details">
            <p><strong>Hotel:</strong> {selectedHotel.name}</p>
            <p><strong>Room Type:</strong> {selectedRoom.name}</p>
            <p><strong>Booking For:</strong> {bookingData.bookingFor === 'self' ? 'I am staying' : 'Someone else is staying'}</p>
            <p><strong>Guest:</strong> {bookingData.firstName} {bookingData.lastName}</p>
            <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
            <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
            <p><strong>Total:</strong> ₱{calculateTotal() ? calculateTotal().toLocaleString() : '0'}</p>
          </div>
                      <div className="confirmation-actions">
              <button onClick={() => navigate('/')} className="primary-btn">
                Book Another Hotel
              </button>
              <button onClick={() => navigate('/')} className="back-btn">
                Back to Home
              </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <Header />

      <div className="booking-container">
        {/* Hotel Information */}
        <div className="hotel-summary">
          <div className="hotel-image-large">
            <img src={selectedHotel.image || selectedHotel.mainImage} alt={selectedHotel.name} />
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
            <p className="hotel-type">{selectedHotel.type || 'Luxury Hotels'}</p>
            
            {/* Room Type Information */}
            <div className="room-type-info">
              <h3>Selected Room: {selectedRoom.name}</h3>
              <p className="room-description">{selectedRoom.description}</p>
            </div>
            
            <div className="hotel-price-display">
              <span className="price">₱{(selectedRoom.price || selectedHotel.pricePerNight || 9500) ? (selectedRoom.price || selectedHotel.pricePerNight || 9500).toLocaleString() : 'N/A'}</span>
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
              
              {/* Booking For Selection */}
              <div className="form-group">
                <label>Who is this booking for?</label>
                <div className="booking-for-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="bookingFor"
                      value="self"
                      checked={bookingData.bookingFor === 'self'}
                      onChange={handleInputChange}
                      disabled={!isAuthenticated}
                    />
                    <span className="radio-label">
                      I am the one staying
                      {!isAuthenticated && <span className="text-sm text-gray-500 ml-2">(Login required)</span>}
                    </span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="bookingFor"
                      value="other"
                      checked={bookingData.bookingFor === 'other'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-label">Someone else is staying</span>
                  </label>
                </div>
                {!isAuthenticated && bookingData.bookingFor === 'self' && (
                  <p className="text-sm text-blue-600 mt-2">
                    Please log in to auto-fill your information. You can still book for someone else without logging in.
                  </p>
                )}
              </div>

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

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Cash"
                    checked={paymentMode === 'Cash'}
                    onChange={handlePaymentModeChange}
                  />
                  Pay with Cash (at hotel)
                </label>
                <label style={{ marginLeft: '2em' }}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="GCash"
                    checked={paymentMode === 'GCash'}
                    onChange={handlePaymentModeChange}
                  />
                  Pay with GCash
                </label>
              </div>
              {showGCashQR && (
                <div className="gcash-section">
                  <div style={{ margin: '1em 0' }}>
                    <strong>Scan this QR code to pay with GCash:</strong>
                    <div>
                      <img src="/gcash-qr-demo.jpg" alt="GCash QR Code" style={{ width: 400, height: 400, margin: '1em 0' }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentProof">Upload GCash Payment Screenshot *</label>
                    <input
                      type="file"
                      id="paymentProof"
                      name="paymentProof"
                      accept="image/*"
                      onChange={handlePaymentProofChange}
                      required={paymentMode === 'GCash'}
                    />
                    {paymentProofPreview && (
                      <div style={{ marginTop: '1em' }}>
                        <strong>Preview:</strong>
                        <img src={paymentProofPreview} alt="Payment Proof Preview" style={{ width: 200, height: 'auto', marginTop: 8 }} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span>Hotel:</span>
                <span>{selectedHotel.name}</span>
              </div>
              <div className="summary-row">
                <span>Room Type:</span>
                <span>{selectedRoom.name}</span>
              </div>
              <div className="summary-row">
                <span>Booking For:</span>
                <span>{bookingData.bookingFor === 'self' ? 'I am staying' : 'Someone else is staying'}</span>
              </div>
              <div className="summary-row">
                <span>Guest:</span>
                <span>{bookingData.firstName} {bookingData.lastName}</span>
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
                <span>₱{calculateTotal() ? calculateTotal().toLocaleString() : '0'}</span>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/')} 
                className="secondary-btn"
              >
                Back to Home
              </button>
              <button 
                type="submit" 
                className="primary-btn"
                disabled={isSubmitting || calculateNights() <= 0}
              >
                {isSubmitting ? 'Processing...' : `Book Now - ₱${calculateTotal() ? calculateTotal().toLocaleString() : '0'}`}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 ReserveEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;