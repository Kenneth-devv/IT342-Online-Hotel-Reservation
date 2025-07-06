import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Importing necessary icons, added Clock
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, Snowflake, CheckCircle, Clock } from 'lucide-react';
import Header from '../components/Header';

const HotelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dummy hotel data for demonstration purposes.
  // In a real application, you would fetch this data based on a hotel ID
  // passed via route parameters (e.g., /hotels/:id) or directly from location.state.
  const dummyHotelData = {
    id: 1,
    name: 'Luxurious Grand Hotel Cebu',
    location: 'Cebu City, Cebu - City center, near Ayala Center',
    rating: 9.1,
    reviews: 2500,
    description: 'Experience unparalleled luxury and comfort at the Grand Hotel Cebu. Located in the heart of the city, our hotel offers exquisite rooms, world-class dining, and exceptional service. Perfect for both business and leisure travelers.',
    mainImage: 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
    galleryImages: [
      'https://placehold.co/400x300/3730A3/FFFFFF?text=Lobby',
      'https://placehold.co/400x300/1E293B/FFFFFF?text=Room',
      'https://placehold.co/400x300/1D4ED8/FFFFFF?text=Pool',
      'https://placehold.co/400x300/2563EB/FFFFFF?text=Restaurant',
      'https://placehold.co/400x300/3B82F6/FFFFFF?text=Spa',
    ],
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
    ],
    pricePerNight: 9500,
    currency: '₱',
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    contact: {
      phone: '+63 912 345 6789',
      email: 'info@grandhotel.com'
    }
  };

  // Attempt to get hotel data from location state, otherwise use dummy data
  const hotel = location.state?.hotel || dummyHotelData;

  // Function to render amenity icons based on the provided image
  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'Free WiFi': return <Wifi className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Swimming Pool': return <Star className="w-5 h-5 text-blue-500 mr-2" />; // Matches star icon in image
      case 'Gym/Fitness Center': return <Dumbbell className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Restaurant': return <Coffee className="w-5 h-5 text-blue-500 mr-2" />; // Matches coffee cup in image
      case 'Bar/Lounge': return <Coffee className="w-5 h-5 text-blue-500 mr-2" />; // Matches coffee cup in image
      case 'Free Parking': return <Car className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Air conditioning': return <Snowflake className="w-5 h-5 text-blue-500 mr-2" />;
      case '24-hour front desk': return <Clock className="w-5 h-5 text-blue-500 mr-2" />; // Matches clock icon in image
      // For the rest, the image shows a generic checkmark, so CheckCircle is appropriate
      case 'Spa services': return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Room service': return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Breakfast included': return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Concierge service': return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />; // Generic checkmark for any unhandled amenity
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
      {/* Header component */}
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 lg:pt-32"> {/* Added padding top to account for fixed header */}
        {/* Hotel Main Image */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={hotel.mainImage}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-extrabold mb-2">{hotel.name}</h1>
            <p className="flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2" /> {hotel.location}
            </p>
          </div>
        </div>

        {/* Hotel Details Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">About {hotel.name}</h2>
              <p className="text-gray-600 mb-4">{hotel.description}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-6">
              <div className="text-center">
                <span className="block text-4xl font-bold text-blue-600">{hotel.rating.toFixed(1)}</span>
                <span className="block text-sm text-gray-600">Guest Rating</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-semibold text-gray-800">{hotel.reviews.toLocaleString()}</span>
                <span className="block text-sm text-gray-600">Reviews</span>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {hotel.galleryImages.map((img, index) => (
              <div key={index} className="w-full h-32 rounded-lg overflow-hidden shadow-md">
                <img src={img} alt={`${hotel.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Amenities Section */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hotel Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-8">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-gray-700">
                {renderAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          {/* Booking Information and Call to Action */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 p-6 rounded-xl shadow-inner">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg text-gray-700">Starting from:</p>
              <p className="text-5xl font-extrabold text-blue-700">
                {hotel.currency}{hotel.pricePerNight.toLocaleString()}
                <span className="text-lg font-normal text-gray-600">/night</span>
              </p>
            </div>
            <button
              onClick={() => alert('Book Now functionality will be implemented here!')} // Placeholder for booking logic
              className="px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </section>

        {/* Placeholder for additional sections like Reviews, Location Map etc. */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">More Details</h3>
          <p className="text-gray-600">
            Check-in: {hotel.checkInTime} | Check-out: {hotel.checkOutTime}
          </p>
          <p className="text-gray-600">
            Contact: {hotel.contact.phone} | {hotel.contact.email}
          </p>
          {/* You can add sections for reviews, a map, nearby attractions here */}
        </section>
      </main>
    </div>
  );
};

export default HotelPage;
