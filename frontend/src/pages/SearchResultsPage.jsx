import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, Star, ChevronDown, SlidersHorizontal, Wifi, Coffee, Car, Dumbbell, Snowflake, Map, List, Plus, Minus, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import Header from '../components/Header';

const SearchResultsPage = () => {
  // Max possible value for the slider, based on the provided image's max price
  const SLIDER_MAX_VALUE = 1500000;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1349280); // Initial max from image

  const [filters, setFilters] = useState({
    bestInLuxury: false,
    bookWithoutCreditCard: false,
    payNow: false,
    freeCancellation: false,
    location8Plus: false,
    swimmingPool: false,
    gymFitness: false,
    guestRating8Plus: false,
    airConditioning: false,
    propertyType: {
      apartmentFlat: false,
      servicedApartment: false,
      hotel: false,
    }
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Refs for the slider elements
  const sliderRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const rangeRef = useRef(null);

  // State to track which thumb is being dragged
  const [draggingThumb, setDraggingThumb] = useState(null); // 'min' or 'max'

  // Helper to convert price value to a percentage of the slider width
  const getPercentage = useCallback((value) => {
    return (value / SLIDER_MAX_VALUE) * 100;
  }, []);

  // Helper to convert a pixel position to a price value
  const getValueFromPosition = useCallback((position) => {
    if (!sliderRef.current) return 0;
    const sliderWidth = sliderRef.current.offsetWidth;
    const percentage = (position / sliderWidth);
    let value = Math.round(percentage * SLIDER_MAX_VALUE);
    return Math.max(0, Math.min(SLIDER_MAX_VALUE, value)); // Ensure value is within bounds and not negative
  }, []);

  // Update thumb positions and range fill based on minPrice and maxPrice state
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

  // Effect to update slider positions when minPrice or maxPrice changes
  useEffect(() => {
    updateSliderPositions();
  }, [minPrice, maxPrice, updateSliderPositions]);

  // Mouse event handlers for dragging the slider thumbs
  const handleMouseDown = useCallback((thumbType) => (e) => {
    e.preventDefault();
    setDraggingThumb(thumbType);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!draggingThumb || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newPosition = e.clientX - sliderRect.left; // Position relative to slider start

    // Clamp position within slider bounds
    newPosition = Math.max(0, Math.min(sliderRect.width, newPosition));

    let newValue = getValueFromPosition(newPosition);

    if (draggingThumb === 'min') {
      // Ensure minPrice doesn't exceed maxPrice and doesn't go below 0
      newValue = Math.max(0, Math.min(newValue, maxPrice));
      setMinPrice(newValue);
    } else if (draggingThumb === 'max') {
      // Ensure maxPrice doesn't go below minPrice and doesn't exceed SLIDER_MAX_VALUE
      newValue = Math.min(SLIDER_MAX_VALUE, Math.max(newValue, minPrice));
      setMaxPrice(newValue);
    }
  }, [draggingThumb, getValueFromPosition, minPrice, maxPrice]);

  const handleMouseUp = useCallback(() => {
    setDraggingThumb(null);
  }, []);

  // Add/remove global mouse event listeners for dragging
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  const handleFilterChange = (e) => {
    const { name, type, checked } = e.target;
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
    }
  };

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    if (name === 'minPrice') {
      // Ensure minPrice is not negative and does not exceed maxPrice
      setMinPrice(Math.max(0, Math.min(numValue, maxPrice)));
    } else {
      // Ensure maxPrice is not negative and does not go below minPrice
      setMaxPrice(Math.max(0, Math.max(numValue, minPrice)));
    }
  };

  // Dummy data for hotel listings
  const hotelListings = [
    {
      id: 1,
      name: 'Red Planet Cebu',
      location: 'Cebu City, Cebu - City center',
      rating: 8.3,
      reviews: 15412,
      award: '2024 Award',
      images: [
        'https://placehold.co/300x200/D1D5DB/FFFFFF?text=Hotel+1',
        'https://placehold.co/300x200/9CA3AF/FFFFFF?text=View+A',
        'https://placehold.co/300x200/6B7280/FFFFFF?text=View+B',
      ],
      offers: ['Breakfast', 'Free WiFi'],
      price: 3890,
      agodaPreferred: true,
      coords: { lat: 10.3157, lng: 123.8800 }
    },
    {
      id: 2,
      name: 'Yello Hotel Cebu Powered By Cocotel',
      location: 'Cebu City, Cebu - 1.3 km to center',
      rating: 8.9,
      reviews: 3750,
      award: 'Best rated 3-star hotels',
      images: [
        'https://placehold.co/300x200/A78BFA/FFFFFF?text=Hotel+2',
        'https://placehold.co/300x200/818CF8/FFFFFF?text=View+C',
        'https://placehold.co/300x200/6366F1/FFFFFF?text=View+D',
      ],
      offers: ['Breakfast', 'Parking', 'Express check-in', '+1'],
      price: 4574,
      coords: { lat: 10.3250, lng: 123.8950 }
    },
    {
      id: 3,
      name: 'Sugbutel Family Hotel Cebu powered by Cocotel',
      location: 'Cebu City, Cebu',
      rating: 7.9,
      reviews: 2013,
      images: [
        'https://placehold.co/300x200/4F46E5/FFFFFF?text=Hotel+3',
        'https://placehold.co/300x200/3730A3/FFFFFF?text=View+E',
        'https://placehold.co/300x200/1E293B/FFFFFF?text=View+F',
      ],
      offers: ['Breakfast', 'Parking'],
      price: 5000,
      coords: { lat: 10.2900, lng: 123.9000 }
    },
    {
      id: 4,
      name: 'Quest Hotel & Conference Center Cebu',
      location: 'Cebu City, Cebu - City center',
      rating: 8.5,
      reviews: 18900,
      images: [
        'https://placehold.co/300x200/1D4ED8/FFFFFF?text=Hotel+4',
        'https://placehold.co/300x200/2563EB/FFFFFF?text=View+G',
        'https://placehold.co/300x200/3B82F6/FFFFFF?text=View+H',
      ],
      offers: ['Breakfast', 'Swimming Pool', 'Free WiFi'],
      price: 7000,
      coords: { lat: 10.3100, lng: 123.8900 }
    },
    {
      id: 5,
      name: 'Waterfront Cebu City Hotel & Casino',
      location: 'Cebu City, Cebu - IT Park',
      rating: 7.5,
      reviews: 12500,
      images: [
        'https://placehold.co/300x200/065F46/FFFFFF?text=Hotel+5',
        'https://placehold.co/300x200/059669/FFFFFF?text=View+I',
        'https://placehold.co/300x200/10B981/FFFFFF?text=View+J',
      ],
      offers: ['Casino', 'Swimming Pool', 'Dining'],
      price: 6000,
      coords: { lat: 10.3300, lng: 123.9050 }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
      <Header />

      {/* Search Bar below Navbar */}
      <section className="bg-white shadow-md py-4 px-6 mb-8">
        <div className="container mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Enter location"
            className="flex-grow focus:outline-none text-gray-700"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <aside className="lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your filters</h2>

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
                  min="0" // Ensure minimum is 0
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
                  min="0" // Ensure minimum is 0
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
                <input type="checkbox" name="location8Plus" checked={filters.location8Plus} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Location: 8+ Excellent</span>
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
                <input type="checkbox" name="guestRating8Plus" checked={filters.guestRating8Plus} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Guest rating: 8+ Excellent</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="airConditioning" checked={filters.airConditioning} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Air conditioning</span>
              </label>
            </div>
          </div>

          {/* Property type */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Property type</h3>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="propertyType.apartmentFlat" checked={filters.propertyType.apartmentFlat} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Apartment/Flat (1232)</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="propertyType.servicedApartment" checked={filters.propertyType.servicedApartment} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Serviced apartment (347)</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input type="checkbox" name="propertyType.hotel" checked={filters.propertyType.hotel} onChange={handleFilterChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                <span className="ml-2">Hotel (886)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Content - Hotel Listings or Map */}
        <main className="lg:w-3/4">
          {/* Sort & View Mode Toggle Bar */}
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-full transition-colors ${viewMode === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                title="Map View"
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
            <button className="lg:hidden px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium flex items-center shadow-md">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </button>
          </div>

          {/* Conditional Rendering: Hotel Listings Grid or Map View */}
          {viewMode === 'list' ? (
            <div className="space-y-6">
              {hotelListings.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                  {/* Image Gallery - Removed */}
                  <div className="relative md:w-2/5 lg:w-1/3 flex-shrink-0">
                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-64 md:h-full object-cover" />
                    {hotel.award && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {hotel.award}
                      </div>
                    )}
                  </div>

                  {/* Hotel Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
                        <div className="text-right">
                          <span className="block text-3xl font-bold text-blue-600">{hotel.rating.toFixed(1)}</span>
                          <span className="block text-sm text-gray-600">{hotel.reviews} reviews</span>
                        </div>
                      </div>
                      <p className="text-gray-600 flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-blue-500" /> {hotel.location} <span className="ml-2 text-blue-500 cursor-pointer">Map</span>
                      </p>
                      {/* Changed "This property offers:" to "Hotel Amenities:" and adjusted spacing */}
                      <p className="text-gray-700 text-sm mb-2 mt-4">Hotel Amenities:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.offers.map((offer, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            {offer === 'Breakfast' && <Coffee className="w-3 h-3 mr-1" />}
                            {offer === 'Free WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                            {offer === 'Parking' && <Car className="w-3 h-3 mr-1" />}
                            {offer === 'Express check-in' && <SlidersHorizontal className="w-3 h-3 mr-1" />}
                            {offer === 'Swimming Pool' && <Star className="w-3 h-3 mr-1" />}
                            {offer === 'Gym/fitness' && <Dumbbell className="w-3 h-3 mr-1" />}
                            {offer === 'Air conditioning' && <Snowflake className="w-3 h-3 mr-1" />}
                            {offer}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                      <div className="text-right">
                        <p className="text-4xl font-extrabold text-gray-900">₱{hotel.price.toLocaleString()}</p>
                      </div>
                      <button className="ml-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative bg-gray-200 rounded-2xl shadow-lg h-[600px] flex items-center justify-center overflow-hidden">
              <img
                src="https://placehold.co/1200x800/E0E0E0/424242?text=Map+View+Placeholder"
                alt="Map Placeholder"
                className="w-full h-full object-cover"
              />
              {/* Map controls */}
              <div className="absolute top-4 right-4 bg-white rounded-xl shadow-md p-2 flex flex-col space-y-2">
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus className="w-5 h-5 text-gray-700" /></button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Minus className="w-5 h-5 text-gray-700" /></button>
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md p-2 grid grid-cols-3 gap-1">
                <div className="col-span-1"></div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowUp className="w-5 h-5 text-gray-700" /></button>
                <div className="col-span-1"></div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowLeft className="w-5 h-5 text-gray-700" /></button>
                <div className="col-span-1"></div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowRight className="w-5 h-5 text-gray-700" /></button>
                <div className="col-span-1"></div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowDown className="w-5 h-5 text-gray-700" /></button>
                <div className="col-span-1"></div>
              </div>

              {/* Example hotel markers on the map */}
              {hotelListings.map(hotel => (
                <div
                  key={hotel.id}
                  className="absolute p-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg"
                  style={{
                    // These are placeholder positions. In a real map, you'd convert lat/lng to pixel positions.
                    top: `${50 + (hotel.coords.lat - 10.3) * 500}px`, // Adjust multipliers for visual spread
                    left: `${50 + (hotel.coords.lng - 123.88) * 500}px`,
                    transform: 'translate(-50%, -50%)' // Center the marker
                  }}
                >
                  ₱{hotel.price.toLocaleString()}
                </div>
              ))}

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;
