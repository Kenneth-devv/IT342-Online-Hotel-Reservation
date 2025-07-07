import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, Star, Award, ShieldCheck, Headphones, Facebook, Twitter, Instagram, Linkedin, Plus, Minus, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import backgroundIMG from '../assets/images/backgroundIMG.jpg';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const guestPickerRef = useRef(null);
  const guestInputRef = useRef(null);

  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 1,
    children: 0,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target) &&
        guestInputRef.current &&
        !guestInputRef.current.contains(event.target)
      ) {
        setShowGuestPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuestRoomChange = (type, operation) => {
    setSearchData(prev => {
      let newRooms = prev.rooms;
      let newAdults = prev.adults;
      let newChildren = prev.children;

      if (type === 'rooms') {
        newRooms = operation === 'increment' ? prev.rooms + 1 : prev.rooms - 1;
        newRooms = Math.max(1, newRooms);

        if (newAdults < newRooms) {
          newAdults = newRooms;
        }
      } else if (type === 'adults') {
        newAdults = operation === 'increment' ? prev.adults + 1 : prev.adults - 1;
        newAdults = Math.max(newRooms, newAdults);
        newAdults = Math.max(1, newAdults);
      } else if (type === 'children') {
        newChildren = operation === 'increment' ? prev.children + 1 : prev.children + 1;
        newChildren = Math.max(0, newChildren);
      }

      return {
        ...prev,
        rooms: newRooms,
        adults: newAdults,
        children: newChildren,
      };
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching with:", searchData);
    navigate('/search-results', { state: { searchData: searchData } });
  };

  const getGuestSummary = () => {
    const roomText = `${searchData.rooms} room${searchData.rooms > 1 ? 's' : ''}`;
    const adultText = `${searchData.adults} adult${searchData.adults > 1 ? 's' : ''}`;
    const childrenText = searchData.children > 0 ? `, ${searchData.children} child${searchData.children > 1 ? 'ren' : ''}` : '';
    return `${roomText}, ${adultText}${childrenText}`;
  };

  const luxuriousGrandHotelCebu = {
    id: 5,
    name: 'Luxurious Grand Hotel Cebu',
    location: 'Cebu City, Cebu - City center, near Ayala Center',
    price: '₱9,500',
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
    description: 'Experience unparalleled luxury and comfort at the Grand Hotel Cebu. Located in the heart of the city, our hotel offers exquisite rooms, world-class dining, and exceptional service. Perfect for both business and leisure travelers.',
    rating: 4.9,
    reviews: 2500,
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


  const featuredHotels = [
    {
      id: 1,
      name: 'Grand Hyatt Manila',
      location: 'Bonifacio Global City, Taguig',
      price: '₱8,500',
      image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=Hyatt+Manila',
      description: 'Experience luxury and comfort in the heart of the city. Enjoy our world-class amenities and exceptional service for an and unforgettable stay.',
      rating: 4.8,
      reviews: 1500,
      mainImage: 'https://placehold.co/1200x600/A78BFA/FFFFFF?text=Grand+Hyatt+Exterior',
      galleryImages: [
        'https://placehold.co/400x300/818CF8/FFFFFF?text=Hyatt+Lobby',
        'https://placehold.co/400x300/6366F1/FFFFFF?text=Hyatt+Room',
        'https://placehold.co/400x300/4F46E5/FFFFFF?text=Hyatt+Pool',
      ],
      amenities: [
        'Free WiFi',
        'Swimming Pool',
        'Gym/Fitness Center',
        'Restaurant',
        'Bar/Lounge',
        'Valet Parking',
        'Concierge service'
      ],
      pricePerNight: 8500,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: {
        phone: '+63 2 838 1234',
        email: 'info@grandhyatt.com'
      }
    },
    {
      id: 3,
      name: 'Shangri-La at the Fort',
      location: 'Bonifacio Global City, Taguig',
      price: '₱9,800',
      image: 'https://placehold.co/600x400/6366F1/FFFFFF?text=Shangri-La+Fort',
      description: 'Modern luxury with extensive dining and recreational facilities. Ideal for both business and leisure travelers seeking comfort.',
      rating: 4.6,
      reviews: 2000,
      mainImage: 'https://placehold.co/1200x600/6366F1/FFFFFF?text=Shangri-La+Fort+Exterior',
      galleryImages: [
        'https://placehold.co/400x300/4F46E5/FFFFFF?text=Shangri-La+Lobby',
        'https://placehold.co/400x300/3730A3/FFFFFF?text=Shangri-La+Room',
        'https://placehold.co/400x300/1E293B/FFFFFF?text=Shangri-La+Spa',
      ],
      amenities: [
        'Free WiFi',
        'Swimming Pool',
        'Gym/Fitness Center',
        'Multiple Restaurants',
        'Kids Club',
        'Spa services',
        'Business Center'
      ],
      pricePerNight: 9800,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: {
        phone: '+63 2 8820 0888',
        email: 'info@shangrila.com'
      }
    },
    {
      id: 4,
      name: 'Conrad Manila',
      location: 'Pasay City, Manila',
      price: '₱7,900',
      image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Conrad+Manila',
      description: 'Waterfront luxury with stunning views of Manila Bay. Enjoy exquisite dining, a serene spa, and direct access to premier shopping.',
      rating: 4.7,
      reviews: 1800,
      mainImage: 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Conrad+Manila+Exterior',
      galleryImages: [
        'https://placehold.co/400x300/1D4ED8/FFFFFF?text=Conrad+Lobby',
        'https://placehold.co/400x300/2563EB/FFFFFF?text=Conrad+Room',
        'https://placehold.co/400x300/3B82F6/FFFFFF?text=Conrad+Bay+View',
      ],
      amenities: [
        'Free WiFi',
        'Infinity Pool',
        'Spa services',
        'Restaurant',
        'Bar/Lounge',
        'Direct Mall Access',
        '24-hour front desk'
      ],
      pricePerNight: 7900,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: {
        phone: '+63 2 8833 9999',
        email: 'info@conradmanila.com'
      }
    },
    luxuriousGrandHotelCebu
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${backgroundIMG})` }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-3xl"></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover amazing hotels and experiences tailored just for you.
          </p>
        </div>
      </section>

      {/* Booking Search Bar */}
      <section className="relative z-20 -mt-16 md:-mt-24 mb-16 px-4">
        <div className="container mx-auto bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={searchData.destination}
                  onChange={handleSearchInputChange}
                  placeholder="e.g., Manila, Boracay"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Check-in Date */}
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={searchData.checkIn}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={searchData.checkOut}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white/50"
                  required
                />
              </div>
            </div>

            {/* Rooms & Guests Combined Input */}
            <div className="relative">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">Rooms & Guests</label>
              <div
                ref={guestInputRef}
                className="relative flex items-center w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white/50 cursor-pointer"
                onClick={() => setShowGuestPicker(!showGuestPicker)}
              >
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <span className="text-gray-900 truncate">{getGuestSummary()}</span>
              </div>

              {/* Guest Picker Pop-over */}
              {showGuestPicker && (
                <div
                  ref={guestPickerRef}
                  className="absolute top-full mt-2 left-0 w-full md:w-80 bg-white rounded-xl shadow-lg p-6 border border-gray-200 z-30"
                >
                  <div className="space-y-4">
                    {/* Rooms */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Rooms</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('rooms', 'decrement')}
                          disabled={searchData.rooms <= 1}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-6 text-center">{searchData.rooms}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('rooms', 'increment')}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 border border-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-700">Adults</span>
                        <p className="text-sm text-gray-500">Ages 18 or above</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('adults', 'decrement')}
                          disabled={searchData.adults <= searchData.rooms}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-6 text-center">{searchData.adults}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('adults', 'increment')}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 border border-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-700">Children</span>
                        <p className="text-sm text-gray-500">Ages 0-17</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('children', 'decrement')}
                          disabled={searchData.children <= 0}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-6 text-center">{searchData.children}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestRoomChange('children', 'increment')}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 border border-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="md:col-span-4 mt-4 md:mt-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Hotels
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHotels.map(hotel => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col cursor-pointer"
                onClick={() => navigate(`/hotel/${encodeURIComponent(hotel.name)}/details`, { state: { hotel: hotel } })}
              >
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-t-3xl" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{hotel.name}</h3>
                  <p className="text-gray-600 flex items-center mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" /> {hotel.location}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 h-16 overflow-hidden text-ellipsis">{hotel.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-blue-600">{hotel.price}<span className="text-base text-gray-500 font-normal">/night</span></span>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold mr-1">{hotel.rating.toFixed(1)}</span>
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hotel/${encodeURIComponent(hotel.name)}/details`, { state: { hotel: hotel } });
                    }}
                    className="mt-6 w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/search-results')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              See More Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-2xl shadow-sm border border-blue-100">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive rates with no hidden fees.</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl shadow-sm border border-purple-100">
              <ShieldCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your personal and payment details are always safe with us.</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-2xl shadow-sm border border-pink-100">
              <Headphones className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">Our dedicated team is here to assist you anytime.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl shadow-sm border border-green-100">
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vast Selection</h3>
              <p className="text-gray-600">Choose from thousands of hotels worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <p className="text-lg text-gray-700 italic mb-6">
                "Booking my vacation through ReserveEase was incredibly easy and stress-free. The selection was vast, and I found the perfect hotel for my family. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img src="https://placehold.co/60x60/D1D5DB/FFFFFF?text=JD" alt="John Doe" className="w-16 h-16 rounded-full mr-4 object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">Traveler from Cebu</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <p className="text-lg text-gray-700 italic mb-6">
                "The customer service was exceptional. I had a last-minute change to my reservation, and the team handled it swiftly and professionally. Thank you, ReserveEase!"
              </p>
              <div className="flex items-center">
                <img src="https://placehold.co/60x60/D1D5DB/FFFFFF?text=AS" alt="Jane Smith" className="w-16 h-16 rounded-full mr-4 object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">Anna Smith</p>
                  <p className="text-sm text-gray-500">Explorer from Manila</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-t-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">Ready to Plan Your Next Getaway?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of happy travelers and find your dream destination today.
          </p>
          <button className="px-10 py-5 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-bold text-white">ReserveEase</span>
            <p className="text-sm mt-2">Your ultimate partner in finding the perfect hotel for every journey.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Home</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Hotels</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Deals</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">About Us</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Contact</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">FAQ</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Privacy Policy</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Terms of Service</button></li>
              <li><button type="button" className="hover:text-blue-400 transition-colors block text-left w-full">Help Center</button></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <button type="button" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook className="w-6 h-6" /></button>
              <button type="button" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="w-6 h-6" /></button>
              <button type="button" className="text-gray-400 hover:text-blue-400 transition-colors"><Instagram className="w-6 h-6" /></button>
              <button type="button" className="text-gray-400 hover:text-blue-400 transition-colors"><Linkedin className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ReserveEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
