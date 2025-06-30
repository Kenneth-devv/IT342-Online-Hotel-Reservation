import React from 'react';
import { Hotel } from 'lucide-react';
import SearchForm from '../components/search/SearchForm';
import RoomCard from '../components/search/RoomCard';
import { useBooking } from '../hooks/useBooking';
import { useAuth } from '../hooks/useAuth';

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
    onPageChange('search');
  };

  const handleBookRoom = (room) => {
    if (!user) {
      onAuthClick('login');
      return;
    }
    onPageChange('booking');
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl mb-8">Book hotels worldwide with the best prices and service</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm">Hotels Worldwide</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">500K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} />
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose OHRS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Hotel className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price? We'll match it and give you an extra 10% off.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your personal information and payments are protected with industry-leading security.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
              <p className="text-gray-600">Get instant booking confirmation and access to your reservation 24/7.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Manila', hotels: '150+ hotels', image: '🏙️' },
              { name: 'Cebu', hotels: '120+ hotels', image: '🏖️' },
              { name: 'Davao', hotels: '80+ hotels', image: '🌴' },
              { name: 'Bohol', hotels: '60+ hotels', image: '🏝️' }
            ].map((destination, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-4xl">
                  {destination.image}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-gray-600 text-sm">{destination.hotels}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Stay?</h2>
          <p className="text-xl mb-6">Join thousands of satisfied customers who trust OHRS for their travel needs.</p>
          <button
            onClick={() => onPageChange('search')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Searching
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;