import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, MapPin, Star, ChevronDown, SlidersHorizontal, Wifi, Coffee, Car, Dumbbell, Snowflake, PawPrint, Baby, Briefcase, Utensils, Plane, X } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const navigate = useNavigate();

  const SLIDER_MAX_VALUE = 50000;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  const [filters, setFilters] = useState({
    bestInLuxury: false,
    bookWithoutCreditCard: false,
    payNow: false,
    freeCancellation: false,
    swimmingPool: false,
    gymFitness: false,
    airConditioning: false,
    petFriendly: false,
    familyFriendly: false,
    businessFacilities: false,
    spaServices: false,
    freeBreakfast: false,
    restaurantOnSite: false,
    airportShuttle: false,
    nonSmokingRooms: false,
    accessibleFacilities: false,
    starRating: 0,
    roomType: {
      standardRoom: false,
      deluxeRoom: false,
      suite: false,
      familyRoom: false,
    }
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sliderRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const rangeRef = useRef(null);
  const filtersSidebarRef = useRef(null);

  const [draggingThumb, setDraggingThumb] = useState(null);

  const getPercentage = useCallback((value) => {
    return (value / SLIDER_MAX_VALUE) * 100;
  }, []);

  const getValueFromPosition = useCallback((position) => {
    if (!sliderRef.current) return 0;
    const sliderWidth = sliderRef.current.offsetWidth;
    const percentage = (position / sliderWidth);
    let value = Math.round(percentage * SLIDER_MAX_VALUE);
    return Math.max(0, Math.min(SLIDER_MAX_VALUE, value));
  }, []);

  const updateSliderPositions = useCallback(() => {
    if (minThumbRef.current && maxThumbRef.current && rangeRef.current && sliderRef.current) {
      const minPercent = getPercentage(minPrice);
      const maxPercent = getPercentage(maxPrice);

      minThumbRef.current.style.left = `${minPercent}%`;
      maxThumbRef.current.style.left = `${maxPercent}%`;

      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minPrice, maxPrice, getPercentage]);

  useEffect(() => {
    updateSliderPositions();
  }, [minPrice, maxPrice, updateSliderPositions]);

  const handleMouseDown = useCallback((thumbType) => (e) => {
    e.preventDefault();
    setDraggingThumb(thumbType);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!draggingThumb || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newPosition = e.clientX - sliderRect.left;

    newPosition = Math.max(0, Math.min(sliderRect.width, newPosition));

    let newValue = getValueFromPosition(newPosition);

    if (draggingThumb === 'min') {
      newValue = Math.max(0, Math.min(newValue, maxPrice));
      setMinPrice(newValue);
    } else if (draggingThumb === 'max') {
      newValue = Math.min(SLIDER_MAX_VALUE, Math.max(newValue, minPrice));
      setMaxPrice(newValue);
    }
  }, [draggingThumb, getValueFromPosition, minPrice, maxPrice]);

  const handleMouseUp = useCallback(() => {
    setDraggingThumb(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileFilters(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleFilterChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFilters(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: checked
          }
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (name === 'starRating') {
      setFilters(prev => ({
        ...prev,
        starRating: Number(value)
      }));
    }
  };

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    if (name === 'minPrice') {
      setMinPrice(Math.max(0, Math.min(numValue, maxPrice)));
    } else {
      setMaxPrice(Math.max(0, Math.max(numValue, minPrice)));
    }
  };

  // Wrapped allHotelListings in useMemo to prevent re-creation on every render
  const allHotelListings = useMemo(() => [
    {
      id: 1,
      name: 'Luxurious Grand Hotel Cebu',
      location: 'Cebu City, Cebu - City center, near Ayala Center',
      rating: 5,
      reviews: 2500,
      award: 'Best Luxury Hotel',
      images: [
        'https://placehold.co/300x200/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
        'https://placehold.co/300x200/3730A3/FFFFFF?text=Lobby',
        'https://placehold.co/300x200/1E293B/FFFFFF?text=Room',
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
      price: 9500,
      agodaPreferred: true,
      coords: { lat: 10.3157, lng: 123.8800 },
      mainImage: 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Grand+Hotel+Exterior',
      galleryImages: [
        'https://placehold.co/400x300/3730A3/FFFFFF?text=Lobby',
        'https://placehold.co/400x300/1E293B/FFFFFF?text=Room',
        'https://placehold.co/400x300/1D4ED8/FFFFFF?text=Pool',
        'https://placehold.co/400x300/2563EB/FFFFFF?text=Restaurant',
        'https://placehold.co/400x300/3B82F6/FFFFFF?text=Spa',
      ],
      pricePerNight: 9500,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: {
        phone: '+63 912 345 6789',
        email: 'info@grandhotel.com'
      },
      description: 'Experience unparalleled luxury and comfort at the Grand Hotel Cebu. Located in the heart of the city, our hotel offers exquisite rooms, world-class dining, and exceptional service. Perfect for both business and leisure travelers.',
      roomType: 'Suite',
    },
    {
      id: 2,
      name: 'Yello Hotel Cebu Powered By Cocotel',
      location: 'Cebu City, Cebu - 1.3 km to center',
      rating: 3,
      reviews: 3750,
      award: 'Best rated 3-star hotels',
      images: [
        'https://placehold.co/300x200/A78BFA/FFFFFF?text=Hotel+2',
        'https://placehold.co/300x200/818CF8/FFFFFF?text=View+C',
        'https://placehold.co/300x200/6366F1/FFFFFF?text=View+D',
      ],
      amenities: ['Breakfast', 'Parking', 'Express check-in', 'Free WiFi'],
      price: 4574,
      coords: { lat: 10.3250, lng: 123.8950 },
      mainImage: 'https://placehold.co/1200x600/A78BFA/FFFFFF?text=Yello+Hotel+Exterior',
      galleryImages: [],
      pricePerNight: 4574,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A vibrant hotel offering modern comforts and convenient access to Cebu City attractions.',
      roomType: 'Standard Room',
    },
    {
      id: 3,
      name: 'Sugbutel Family Hotel Cebu powered by Cocotel',
      location: 'Cebu City, Cebu',
      rating: 3,
      reviews: 2013,
      images: [
        'https://placehold.co/300x200/4F46E5/FFFFFF?text=Hotel+3',
        'https://placehold.co/300x200/3730A3/FFFFFF?text=View+E',
        'https://placehold.co/300x200/1E293B/FFFFFF?text=View+F',
      ],
      amenities: ['Breakfast', 'Parking', 'Free WiFi', 'Family-friendly'],
      price: 5000,
      coords: { lat: 10.2900, lng: 123.9000 },
      mainImage: 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Sugbutel+Exterior',
      galleryImages: [],
      pricePerNight: 5000,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A family-friendly hotel providing comfortable stays and essential amenities for a pleasant trip.',
      roomType: 'Family Room',
    },
    {
      id: 4,
      name: 'Quest Hotel & Conference Center Cebu',
      location: 'Cebu City, Cebu - City center',
      rating: 4,
      reviews: 18900,
      images: [
        'https://placehold.co/300x200/1D4ED8/FFFFFF?text=Hotel+4',
        'https://placehold.co/300x200/2563EB/FFFFFF?text=View+G',
        'https://placehold.co/300x200/3B82F6/FFFFFF?text=View+H',
      ],
      amenities: ['Breakfast', 'Swimming Pool', 'Free WiFi', 'Gym/Fitness Center', 'Business facilities'],
      price: 7000,
      coords: { lat: 10.3100, lng: 123.8900 },
      mainImage: 'https://placehold.co/1200x600/1D4ED8/FFFFFF?text=Quest+Hotel+Exterior',
      galleryImages: [],
      pricePerNight: 7000,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A modern hotel with conference facilities, ideal for business and leisure, offering a refreshing pool and central location.',
      roomType: 'Deluxe Room',
    },
    {
      id: 5,
      name: 'Waterfront Cebu City Hotel & Casino',
      location: 'Cebu City, Cebu - IT Park',
      rating: 3,
      reviews: 12500,
      images: [
        'https://placehold.co/300x200/065F46/FFFFFF?text=Hotel+5',
        'https://placehold.co/300x200/059669/FFFFFF?text=View+I',
        'https://placehold.co/300x200/10B981/FFFFFF?text=View+J',
      ],
      amenities: ['Casino', 'Swimming Pool', 'Restaurant', 'Free WiFi'],
      price: 6000,
      coords: { lat: 10.3300, lng: 123.9050 },
      mainImage: 'https://placehold.co/1200x600/065F46/FFFFFF?text=Waterfront+Hotel+Exterior',
      galleryImages: [],
      pricePerNight: 6000,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A large hotel and casino complex offering entertainment, dining, and comfortable accommodations near IT Park.',
      roomType: 'Standard Room',
    },
    // New dummy hotel listings
    {
      id: 6,
      name: 'Crimson Resort and Spa Mactan',
      location: 'Lapu-Lapu City, Mactan Island - Beachfront',
      rating: 5,
      reviews: 4000,
      award: 'Best Beach Resort',
      images: [
        'https://placehold.co/300x200/F97316/FFFFFF?text=Crimson+Exterior',
        'https://placehold.co/300x200/EA580C/FFFFFF?text=Crimson+Pool',
        'https://placehold.co/300x200/C2410C/FFFFFF?text=Crimson+Room',
      ],
      amenities: [
        'Free WiFi', 'Swimming Pool', 'Private Beach', 'Spa services',
        'Restaurant', 'Bar/Lounge', 'Kids Club', 'Airport shuttle'
      ],
      price: 18000,
      agodaPreferred: true,
      coords: { lat: 10.2800, lng: 124.0000 },
      mainImage: 'https://placehold.co/1200x600/F97316/FFFFFF?text=Crimson+Resort+Exterior',
      galleryImages: [],
      pricePerNight: 18000,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'An exquisite beachfront resort offering luxurious stays and a wide range of activities for all ages.',
      roomType: 'Deluxe Room',
    },
    {
      id: 7,
      name: 'Bluewater Maribago Beach Resort',
      location: 'Lapu-Lapu City, Mactan Island - Beachfront',
      rating: 4,
      reviews: 3200,
      images: [
        'https://placehold.co/300x200/22C55E/FFFFFF?text=Bluewater+Exterior',
        'https://placehold.co/300x200/16A34A/FFFFFF?text=Bluewater+Pool',
        'https://placehold.co/300x200/15803D/FFFFFF?text=Bluewater+Room',
      ],
      amenities: [
        'Free WiFi', 'Swimming Pool', 'Private Beach', 'Restaurant',
        'Bar/Lounge', 'Spa services', 'Water sports facilities'
      ],
      price: 12000,
      coords: { lat: 10.2950, lng: 124.0100 },
      mainImage: 'https://placehold.co/1200x600/22C55E/FFFFFF?text=Bluewater+Resort+Exterior',
      galleryImages: [],
      pricePerNight: 12000,
      currency: '₱',
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      contact: { phone: '', email: '' },
      description: 'A tropical paradise known for its beautiful beaches and a variety of recreational activities.',
      roomType: 'Standard Room',
    },
    {
      id: 8,
      name: 'Bayfront Hotel Cebu - Capitol Site',
      location: 'Cebu City, Cebu - Near Capitol',
      rating: 3,
      reviews: 1500,
      images: [
        'https://placehold.co/300x200/EF4444/FFFFFF?text=Bayfront+Exterior',
        'https://placehold.co/300x200/DC2626/FFFFFF?text=Bayfront+Lobby',
        'https://placehold.co/300x200/B91C1C/FFFFFF?text=Bayfront+Room',
      ],
      amenities: [
        'Free WiFi', 'Restaurant', '24-hour front desk', 'Air conditioning'
      ],
      price: 3800,
      coords: { lat: 10.3100, lng: 123.8950 },
      mainImage: 'https://placehold.co/1200x600/EF4444/FFFFFF?text=Bayfront+Hotel+Exterior',
      galleryImages: [],
      pricePerNight: 3800,
      currency: '₱',
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A convenient and comfortable hotel located near Cebu Capitol, ideal for both business and leisure.',
      roomType: 'Standard Room',
    },
    {
      id: 9,
      name: 'Summit Galleria Cebu',
      location: 'Cebu City, Cebu - Near Robinsons Galleria',
      rating: 4,
      reviews: 2800,
      images: [
        'https://placehold.co/300x200/6366F1/FFFFFF?text=Summit+Exterior',
        'https://placehold.co/300x200/4F46E5/FFFFFF?text=Summit+Pool',
        'https://placehold.co/300x200/4338CA/FFFFFF?text=Summit+Room',
      ],
      amenities: [
        'Free WiFi', 'Swimming Pool', 'Gym/Fitness Center', 'Restaurant',
        'Business facilities', 'Concierge service'
      ],
      price: 6200,
      coords: { lat: 10.3000, lng: 123.9000 },
      mainImage: 'https://placehold.co/1200x600/6366F1/FFFFFF?text=Summit+Galleria+Exterior',
      galleryImages: [],
      pricePerNight: 6200,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'A modern hotel connected to a shopping mall, offering convenience and upscale amenities.',
      roomType: 'Deluxe Room',
    },
    {
      id: 10,
      name: 'Marco Polo Plaza Cebu',
      location: 'Cebu City, Cebu - Nivel Hills',
      rating: 5,
      reviews: 3500,
      award: 'Luxury Mountain Retreat',
      images: [
        'https://placehold.co/300x200/06B6D4/FFFFFF?text=Marco+Polo+Exterior',
        'https://placehold.co/300x200/0891B2/FFFFFF?text=Marco+Polo+Pool',
        'https://placehold.co/300x200/0E7490/FFFFFF?text=Marco+Polo+Room',
      ],
      amenities: [
        'Free WiFi', 'Swimming Pool', 'Gym/Fitness Center', 'Restaurant',
        'Bar/Lounge', 'Spa services', 'Free Parking', 'Airport shuttle'
      ],
      price: 11000,
      agodaPreferred: true,
      coords: { lat: 10.3500, lng: 123.8800 },
      mainImage: 'https://placehold.co/1200x600/06B6D4/FFFFFF?text=Marco+Polo+Plaza+Exterior',
      galleryImages: [],
      pricePerNight: 11000,
      currency: '₱',
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      contact: { phone: '', email: '' },
      description: 'An iconic hotel nestled in the hills, offering panoramic city views and a serene environment.',
      roomType: 'Suite',
    }
  ], []);

  const filteredHotels = useMemo(() => {
    return allHotelListings.filter(hotel => {
      // Price range filter
      if (hotel.price < minPrice || hotel.price > maxPrice) {
        return false;
      }

      // Star rating filter: Display hotels with rating >= selected star.
      // If filters.starRating is 0 (nothing selected), this condition is skipped,
      // and all hotels are considered for star rating.
      if (filters.starRating > 0 && hotel.rating < filters.starRating) {
        return false;
      }

      // Amenity filters
      if (filters.bestInLuxury && hotel.award !== 'Best Luxury Hotel') return false;
      if (filters.swimmingPool && !hotel.amenities.includes('Swimming Pool')) return false;
      if (filters.gymFitness && !hotel.amenities.includes('Gym/Fitness Center')) return false;
      if (filters.airConditioning && !hotel.amenities.includes('Air conditioning')) return false;
      if (filters.petFriendly && !hotel.amenities.includes('Pet-friendly')) return false;
      if (filters.familyFriendly && !hotel.amenities.includes('Family-friendly')) return false;
      if (filters.businessFacilities && !hotel.amenities.includes('Business facilities')) return false;
      if (filters.spaServices && !hotel.amenities.includes('Spa services')) return false;
      if (filters.freeBreakfast && !hotel.amenities.includes('Breakfast included')) return false;
      if (filters.restaurantOnSite && !hotel.amenities.includes('Restaurant')) return false;
      if (filters.airportShuttle && !hotel.amenities.includes('Airport shuttle')) return false;
      // Note: 'Book without credit card', 'Pay now', 'Free cancellation', 'Non-smoking rooms',
      // and 'Accessible facilities' are not explicitly in dummy data amenities,
      // so they will not filter unless added to the hotel.amenities array or a separate property.

      // Room type filters
      const selectedRoomTypes = Object.keys(filters.roomType).filter(key => filters.roomType[key]);
      if (selectedRoomTypes.length > 0) {
        const hasMatchingRoomType = selectedRoomTypes.some(type => {
          const readableRoomType = type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return hotel.roomType === readableRoomType;
        });
        if (!hasMatchingRoomType) return false;
      }

      return true;
    });
  }, [minPrice, maxPrice, filters, allHotelListings]); // allHotelListings is now stable due to its own useMemo

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
      <Header />

      {/* Search Bar below Navbar */}
      <section className="bg-white shadow-md py-4 px-6 mb-8">
        <div className="container mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Hotel Name"
            className="flex-grow focus:outline-none text-gray-700"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          ></div>
        )}

        {/* Left Sidebar - Filters */}
        <aside
          ref={filtersSidebarRef}
          className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white p-6 rounded-r-2xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
            lg:relative lg:w-1/4 lg:translate-x-0 lg:h-fit lg:sticky lg:top-24 lg:rounded-2xl
            ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-2xl font-bold text-gray-900">Your filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 hidden lg:block">Your filters</h2>


          {/* Budget Slider - Updated with custom slider */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Your budget (per night)</h3>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  name="minPrice"
                  value={minPrice}
                  onChange={handlePriceInputChange}
                  min="0"
                  className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={maxPrice}
                  onChange={handlePriceInputChange}
                  min="0"
                  className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
            </div>

            {/* Custom Dual-Thumb Slider */}
            <div
              ref={sliderRef}
              className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer mt-4"
            >
              <div
                ref={rangeRef}
                className="absolute h-full bg-blue-500 rounded-full"
                style={{
                  left: `${getPercentage(minPrice)}%`,
                  width: `${getPercentage(maxPrice) - getPercentage(minPrice)}%`
                }}
              ></div>
              <div
                ref={minThumbRef}
                className="absolute w-5 h-5 bg-blue-600 rounded-full shadow-md -mt-1 cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(minPrice)}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown('min')}
              ></div>
              <div
                ref={maxThumbRef}
                className="absolute w-5 h-5 bg-blue-600 rounded-full shadow-md -mt-1 cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(maxPrice)}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown('max')}
              ></div>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Star Rating</h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="starRating"
                    value={star}
                    checked={filters.starRating === star}
                    onChange={handleFilterChange}
                    className="hidden"
                  />
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      filters.starRating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                </label>
              ))}
              {filters.starRating > 0 && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, starRating: 0 }))}
                  className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Popular filters for Cebu */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Popular filters for Cebu</h3>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="bestInLuxury" checked={filters.bestInLuxury} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Best in Luxury</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="bookWithoutCreditCard" checked={filters.bookWithoutCreditCard} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Book without credit card</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="payNow" checked={filters.payNow} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Pay now</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="freeCancellation" checked={filters.freeCancellation} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Free cancellation</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="swimmingPool" checked={filters.swimmingPool} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Swimming pool</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="gymFitness" checked={filters.gymFitness} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Gym/fitness</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="airConditioning" checked={filters.airConditioning} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Air conditioning</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="petFriendly" checked={filters.petFriendly} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Pet-friendly</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="familyFriendly" checked={filters.familyFriendly} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Family-friendly</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="businessFacilities" checked={filters.businessFacilities} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Business facilities</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="spaServices" checked={filters.spaServices} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Spa services</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="freeBreakfast" checked={filters.freeBreakfast} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Free breakfast</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="restaurantOnSite" checked={filters.restaurantOnSite} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Restaurant on-site</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="airportShuttle" checked={filters.airportShuttle} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Airport shuttle</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="nonSmokingRooms" checked={filters.nonSmokingRooms} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Non-smoking rooms</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="accessibleFacilities" checked={filters.accessibleFacilities} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Accessible facilities</span>
              </label>
            </div>
          </div>

          {/* Room type (formerly Property type) */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Room type</h3>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="roomType.standardRoom" checked={filters.roomType.standardRoom} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Standard Room</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="roomType.deluxeRoom" checked={filters.roomType.deluxeRoom} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Deluxe Room</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="roomType.suite" checked={filters.roomType.suite} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Suite</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="roomType.familyRoom" checked={filters.roomType.familyRoom} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Family Room</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Content - Hotel Listings */}
        <main className="lg:w-3/4">
          {/* Sort & View Mode Toggle Bar (Map view toggle removed) */}
          <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Sort by</span>
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium shadow-md">
                Best match <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Top reviewed <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Lowest price first <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Distance <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium shadow-md">
                Hot Deals!
              </button>
            </div>
            {/* Mobile Filters Toggle Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium flex items-center shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </button>
          </div>

          {/* Hotel Listings Grid */}
          <div className="space-y-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/hotel/${encodeURIComponent(hotel.name)}/details`, { state: { hotel: hotel } })}
                >
                  <div className="relative md:w-2/5 lg:w-1/3 flex-shrink-0">
                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-64 md:h-full object-cover" />
                    {hotel.award && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {hotel.award}
                      </div>
                    )}
                    {/* Display Star Rating on the card */}
                    <div className="absolute top-2 right-2 bg-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                      {hotel.rating} <Star className="w-4 h-4 ml-1 fill-current" />
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
                      </div>
                      <p className="text-gray-600 flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-blue-500" /> {hotel.location}
                      </p>
                      <p className="text-gray-700 text-sm mb-2 mt-4">Hotel Amenities:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            {amenity === 'Breakfast' && <Coffee className="w-3 h-3 mr-1" />}
                            {amenity === 'Free WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity === 'Free Parking' && <Car className="w-3 h-3 mr-1" />}
                            {amenity === 'Swimming Pool' && <Star className="w-3 h-3 mr-1" />}
                            {amenity === 'Gym/Fitness Center' && <Dumbbell className="w-3 h-3 mr-1" />}
                            {amenity === 'Air conditioning' && <Snowflake className="w-3 h-3 mr-1" />}
                            {amenity === 'Pet-friendly' && <PawPrint className="w-3 h-3 mr-1" />}
                            {amenity === 'Family-friendly' && <Baby className="w-3 h-3 mr-1" />}
                            {amenity === 'Business facilities' && <Briefcase className="w-3 h-3 mr-1" />}
                            {amenity === 'Spa services' && <Star className="w-3 h-3 mr-1" />}
                            {amenity === 'Restaurant' && <Utensils className="w-3 h-3 mr-1" />}
                            {amenity === 'Airport shuttle' && <Plane className="w-3 h-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                      <div className="text-right">
                        <p className="text-4xl font-extrabold text-gray-900">₱{hotel.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/hotel/${encodeURIComponent(hotel.name)}/details`, { state: { hotel: hotel } });
                        }}
                        className="ml-4 px-6 py-3 bg-blue-600 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <p className="text-gray-600 text-lg">No hotels found matching your criteria.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;