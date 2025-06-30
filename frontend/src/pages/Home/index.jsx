import React from 'react';
import { Hotel } from 'lucide-react';
// import SearchForm from '../components/search/SearchForm'; // Your actual component
// import RoomCard from '../components/search/RoomCard';   // Your actual component

// Mock components for preview purposes. Replace with your actual imports.
const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = React.useState('');
  const [guests, setGuests] = React.useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, guests: parseInt(guests) });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Find Your Stay</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location / Hotel</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Manila, Boracay, Grand Hotel"
            className="block w-full px-4 py-2 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            className="block w-full px-4 py-2 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Search
        </button>
      </form>
    </div>
  );
};

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden flex flex-col p-6 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
      <p className="text-gray-700 mb-1">{room.hotel} - {room.location}</p>
      <p className="text-blue-600 font-bold text-lg mb-4">PHP {room.price.toLocaleString()}/night</p>
      <div className="text-sm text-gray-600 mb-4 flex-grow">
        <p>Capacity: {room.capacity} guests</p>
        <p>Bed Type: {room.bedType}</p>
        <p>Amenities: {room.amenities.join(', ')}</p>
        <p>Rating: {room.rating} ⭐</p>
      </div>
      <button
        onClick={() => onBook(room)}
        className="mt-auto w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Book Now
      </button>
    </div>
  );
};

// Mock hooks for preview purposes. Replace with your actual imports.
const useBooking = () => ({
  searchResults: [],
  setSearchResults: () => {}
});
const useAuth = () => ({
  user: { name: 'Guest' } // Mock a logged-in user for the demo
});

const HomePage = ({ onPageChange, onAuthClick }) => {
  const { setSearchResults } = useBooking();
  const { user } = useAuth();

  const featuredRooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      hotel: 'Grand Hotel Manila',
      location: 'Makati, Manila',
      price: 2500,
      capacity: 2,
      bedType: 'Queen Bed',
      amenities: ['WiFi', 'Parking', 'Breakfast'],
      rating: 4.5,
      available: true
    },
    {
      id: 2,
      name: 'Superior Suite',
      hotel: 'Luxury Resort Cebu',
      location: 'Lapu-Lapu, Cebu',
      price: 4000,
      capacity: 4,
      bedType: 'King Bed + Sofa',
      amenities: ['WiFi', 'Parking', 'Restaurant', 'Breakfast'],
      rating: 4.8,
      available: true
    },
    {
      id: 3,
      name: 'Standard Room',
      hotel: 'Budget Inn Davao',
      location: 'Downtown, Davao',
      price: 1500,
      capacity: 2,
      bedType: 'Double Bed',
      amenities: ['WiFi'],
      rating: 4.0,
      available: true
    }
  ];

  const handleSearch = (searchData) => {
    const mockRooms = [
      ...featuredRooms,
      {
        id: 4,
        name: 'Executive Suite',
        hotel: 'Business Hotel BGC',
        location: 'Taguig, Manila',
        price: 3500,
        capacity: 3,
        bedType: 'King Bed',
        amenities: ['WiFi', 'Parking', 'Restaurant', 'Gym'],
        rating: 4.6,
        available: true
      },
      {
        id: 5,
        name: 'Family Room',
        hotel: 'Seaside Resort Bohol',
        location: 'Panglao, Bohol',
        price: 5000,
        capacity: 6,
        bedType: '2 Queen Beds',
        amenities: ['WiFi', 'Parking', 'Restaurant', 'Pool', 'Beach Access'],
        rating: 4.7,
        available: true
      }
    ];

    const filtered = mockRooms.filter(room =>
      room.available &&
      room.capacity >= searchData.guests &&
      (searchData.location === '' ||
       room.location.toLowerCase().includes(searchData.location.toLowerCase()) ||
       room.hotel.toLowerCase().includes(searchData.location.toLowerCase()))
    );

    setSearchResults(filtered);
    if (onPageChange) onPageChange('search'); // Ensure onPageChange is defined before calling
  };

  const handleBookRoom = (room) => {
    if (!user) {
      if (onAuthClick) onAuthClick('login'); // Ensure onAuthClick is defined before calling
      return;
    }
    if (onPageChange) onPageChange('booking'); // Ensure onPageChange is defined before calling
  };

  return (
    // Outer container for consistent background and font
    <div className="min-h-screen bg-gray-100 p-4 font-inter relative overflow-hidden">
      {/* Background pattern elements (blobs) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
      </div>

      {/* Main content wrapper, relative to allow z-index for frosted cards */}
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-8">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
            <Hotel className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl mb-8">Book hotels worldwide with the best prices and service</p>
          <div className="flex justify-center space-x-4 w-full px-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center flex-1 min-w-[100px]">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm">Hotels Worldwide</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center flex-1 min-w-[100px]">
              <div className="text-3xl font-bold">500K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center flex-1 min-w-[100px]">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Search Form Section */}
        <SearchForm onSearch={handleSearch} />

        {/* Featured Hotels Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
            ))}
          </div>
        </div>

        {/* Why Choose OHRS? Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Choose OHRS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Hotel className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Best Price Guarantee</h3>
              <p className="text-gray-700">Find a lower price? We'll match it and give you an extra 10% off.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl" role="img" aria-label="lock">🔒</span> {/* Using role and aria-label for accessibility */}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Booking</h3>
              <p className="text-gray-700">Your personal information and payments are protected with industry-leading security.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl" role="img" aria-label="lightning bolt">⚡</span> {/* Using role and aria-label for accessibility */}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Confirmation</h3>
              <p className="text-gray-700">Get instant booking confirmation and access to your reservation 24/7.</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Increased gap for better spacing */}
            {[
              { name: 'Manila', hotels: '150+ hotels', image: '🏙️' },
              { name: 'Cebu', hotels: '120+ hotels', image: '🏖️' },
              { name: 'Davao', hotels: '80+ hotels', image: '🌴' },
              { name: 'Bohol', hotels: '60+ hotels', image: '🏝️' }
            ].map((destination, index) => (
              <div key={index} className="bg-white/70 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-white/30"> {/* Adjusted border and background */}
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-5xl rounded-t-2xl"> {/* Increased text size, added rounded-t-2xl */}
                  {destination.image}
                </div>
                <div className="p-4 text-gray-900">
                  <h3 className="font-semibold text-xl mb-1">{destination.name}</h3> {/* Increased font size for name */}
                  <p className="text-gray-700 text-base">{destination.hotels}</p> {/* Adjusted font size for hotels */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Stay?</h2>
          <p className="text-xl mb-6">Join thousands of satisfied customers who trust OHRS for their travel needs.</p>
          <button
            onClick={() => onPageChange('search')} // Retaining original prop usage for consistency with your existing code
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl" // Added shadow
          >
            Start Searching
          </button>
        </div>
      </div>

      {/* Tailwind CSS keyframes for blob animation (for preview purposes) */}
      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .font-inter {
            font-family: 'Inter', sans-serif;
        }
        `}
      </style>
    </div>
  );
};

export default HomePage;
