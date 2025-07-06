import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, CheckCircle, Heart, Share2, Calendar,
  Phone as PhoneIcon, Mail, Navigation, Users, Bed, Bath, Tv
} from 'lucide-react';
import { 
  Wifi as WifiIcon, Coffee as CoffeeIcon, Car as CarIcon, 
  Dumbbell as DumbbellIcon, Snowflake as SnowflakeIcon,
  CheckCircle as CheckCircleIcon, Clock as ClockIcon
} from 'lucide-react';
import Header from '../components/Header';

const HotelDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Get hotel data from navigation state or use default data
  const hotelFromState = location.state?.hotel;
  
  // Enhanced hotel data with comprehensive room information
  const getHotelData = (hotel) => {
    // Base hotel data structure
    const baseHotelData = {
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      rating: hotel.rating,
      reviews: hotel.reviews,
      description: hotel.description,
      mainImage: hotel.mainImage || hotel.image,
      galleryImages: hotel.galleryImages || [hotel.image],
      amenities: hotel.amenities,
      pricePerNight: hotel.pricePerNight || parseInt(hotel.price.replace(/[₱,]/g, '')),
      currency: '₱',
      checkInTime: hotel.checkInTime || '3:00 PM',
      checkOutTime: hotel.checkOutTime || '12:00 PM',
      contact: hotel.contact || {
        phone: '+63 912 345 6789',
        email: 'info@hotel.com'
      },
      // Enhanced room information
      roomTypes: getRoomTypes(hotel),
      policies: getHotelPolicies(hotel),
      nearbyAttractions: getNearbyAttractions(hotel)
    };
    
    return baseHotelData;
  };

  // Function to generate room types based on hotel
  const getRoomTypes = (hotel) => {
    const basePrice = hotel.pricePerNight || parseInt(hotel.price.replace(/[₱,]/g, ''));
    
    return [
      {
        id: 1,
        name: 'Deluxe King Room',
        description: 'Spacious room with a king-size bed, perfect for couples or solo travelers seeking comfort and luxury.',
        price: basePrice,
        size: '45 sqm',
        maxGuests: 2,
        bedConfiguration: [
          { type: 'King Bed', count: 1, size: '2.0m x 2.0m' }
        ],
        amenities: [
          'King-size bed',
          'En-suite bathroom',
          'Rain shower',
          'Free WiFi',
          '55" Smart TV',
          'Mini bar',
          'Coffee maker',
          'In-room safe',
          'Air conditioning',
          'City view'
        ],
        images: [
          'https://placehold.co/600x400/4F46E5/FFFFFF?text=Deluxe+King+Room',
          'https://placehold.co/600x400/3730A3/FFFFFF?text=Deluxe+Bathroom',
          'https://placehold.co/600x400/1E293B/FFFFFF?text=Deluxe+View'
        ],
        available: true
      },
      {
        id: 2,
        name: 'Deluxe Twin Room',
        description: 'Comfortable room with two single beds, ideal for friends or colleagues traveling together.',
        price: basePrice,
        size: '45 sqm',
        maxGuests: 2,
        bedConfiguration: [
          { type: 'Single Bed', count: 2, size: '1.0m x 2.0m' }
        ],
        amenities: [
          'Two single beds',
          'En-suite bathroom',
          'Rain shower',
          'Free WiFi',
          '55" Smart TV',
          'Mini bar',
          'Coffee maker',
          'In-room safe',
          'Air conditioning',
          'City view'
        ],
        images: [
          'https://placehold.co/600x400/6366F1/FFFFFF?text=Deluxe+Twin+Room',
          'https://placehold.co/600x400/4F46E5/FFFFFF?text=Twin+Bathroom',
          'https://placehold.co/600x400/3730A3/FFFFFF?text=Twin+View'
        ],
        available: true
      },
      {
        id: 3,
        name: 'Executive Suite',
        description: 'Luxurious suite with separate living area, perfect for business travelers or those seeking extra space.',
        price: Math.round(basePrice * 1.6),
        size: '75 sqm',
        maxGuests: 3,
        bedConfiguration: [
          { type: 'King Bed', count: 1, size: '2.0m x 2.0m' },
          { type: 'Sofa Bed', count: 1, size: '1.4m x 2.0m' }
        ],
        amenities: [
          'King-size bed',
          'Separate living room',
          'En-suite bathroom',
          'Rain shower',
          'Free WiFi',
          '65" Smart TV',
          'Mini bar',
          'Coffee maker',
          'In-room safe',
          'Air conditioning',
          'City view',
          'Executive lounge access',
          'Complimentary breakfast'
        ],
        images: [
          'https://placehold.co/600x400/1D4ED8/FFFFFF?text=Executive+Suite',
          'https://placehold.co/600x400/2563EB/FFFFFF?text=Suite+Living+Room',
          'https://placehold.co/600x400/3B82F6/FFFFFF?text=Suite+Bathroom'
        ],
        available: true
      },
      {
        id: 4,
        name: 'Family Room',
        description: 'Spacious family room with multiple beds, perfect for families with children.',
        price: Math.round(basePrice * 1.3),
        size: '60 sqm',
        maxGuests: 4,
        bedConfiguration: [
          { type: 'King Bed', count: 1, size: '2.0m x 2.0m' },
          { type: 'Single Bed', count: 2, size: '1.0m x 2.0m' }
        ],
        amenities: [
          'King-size bed',
          'Two single beds',
          'En-suite bathroom',
          'Rain shower',
          'Free WiFi',
          '55" Smart TV',
          'Mini bar',
          'Coffee maker',
          'In-room safe',
          'Air conditioning',
          'City view',
          'Family-friendly amenities'
        ],
        images: [
          'https://placehold.co/600x400/059669/FFFFFF?text=Family+Room',
          'https://placehold.co/600x400/047857/FFFFFF?text=Family+Bathroom',
          'https://placehold.co/600x400/065f46/FFFFFF?text=Family+View'
        ],
        available: true
      }
    ];
  };

  // Function to generate hotel policies
  const getHotelPolicies = (hotel) => {
    return {
      checkIn: hotel.checkInTime || '3:00 PM',
      checkOut: hotel.checkOutTime || '12:00 PM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      children: 'Children of all ages are welcome',
      pets: 'No pets allowed',
      smoking: 'Designated smoking areas available',
      extraBeds: 'Available for ₱1,500 per night',
      parking: 'Free parking available'
    };
  };

  // Function to generate nearby attractions based on hotel location
  const getNearbyAttractions = (hotel) => {
    const location = hotel.location.toLowerCase();
    
    if (location.includes('cebu')) {
      return [
        { name: 'Ayala Center Cebu', distance: '0.5 km', type: 'Shopping Mall' },
        { name: 'Cebu Business Park', distance: '1.2 km', type: 'Business District' },
        { name: 'SM City Cebu', distance: '2.0 km', type: 'Shopping Mall' },
        { name: 'Cebu International Airport', distance: '8.5 km', type: 'Airport' }
      ];
    } else if (location.includes('manila') || location.includes('taguig')) {
      return [
        { name: 'SM Aura', distance: '0.8 km', type: 'Shopping Mall' },
        { name: 'Bonifacio High Street', distance: '1.5 km', type: 'Shopping District' },
        { name: 'Manila Bay', distance: '3.2 km', type: 'Tourist Attraction' },
        { name: 'Ninoy Aquino International Airport', distance: '12.0 km', type: 'Airport' }
      ];
    } else if (location.includes('pasay')) {
      return [
        { name: 'SM Mall of Asia', distance: '0.3 km', type: 'Shopping Mall' },
        { name: 'Manila Bay', distance: '0.5 km', type: 'Tourist Attraction' },
        { name: 'Manila Ocean Park', distance: '1.0 km', type: 'Tourist Attraction' },
        { name: 'Ninoy Aquino International Airport', distance: '8.0 km', type: 'Airport' }
      ];
    } else {
      return [
        { name: 'Shopping Center', distance: '0.5 km', type: 'Shopping Mall' },
        { name: 'Business District', distance: '1.2 km', type: 'Business District' },
        { name: 'Local Market', distance: '2.0 km', type: 'Market' },
        { name: 'Airport', distance: '10.0 km', type: 'Airport' }
      ];
    }
  };

  // Get the actual hotel data
  const hotelData = hotelFromState ? getHotelData(hotelFromState) : getHotelData({
    id: 1,
    name: 'Luxurious Grand Hotel Cebu',
    location: 'Cebu City, Cebu - City center, near Ayala Center',
    rating: 4.9,
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
  });

  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'Free WiFi': return <WifiIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Swimming Pool': return <Star className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Gym/Fitness Center': return <DumbbellIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Restaurant': return <CoffeeIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Bar/Lounge': return <CoffeeIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Free Parking': return <CarIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case 'Air conditioning': return <SnowflakeIcon className="w-5 h-5 text-blue-500 mr-2" />;
      case '24-hour front desk': return <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />;
      default: return <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" />;
    }
  };

  const handleBookNow = (roomType) => {
    navigate(`/booking/${encodeURIComponent(hotelData.name)}`, { 
      state: { 
        hotel: hotelData,
        selectedRoom: roomType
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 lg:pt-32">
        {/* Hotel Main Image */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={hotelData.mainImage}
            alt={hotelData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-extrabold mb-2">{hotelData.name}</h1>
            <p className="flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2" /> {hotelData.location}
            </p>
          </div>
          <div className="absolute top-6 right-6 flex space-x-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hotel Overview */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">About {hotelData.name}</h2>
              <p className="text-gray-600 mb-4">{hotelData.description}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-6">
              <div className="text-center">
                <span className="block text-4xl font-bold text-blue-600">{hotelData.rating.toFixed(1)}</span>
                <span className="block text-sm text-gray-600">Guest Rating</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-semibold text-gray-800">{hotelData.reviews.toLocaleString()}</span>
                <span className="block text-sm text-gray-600">Reviews</span>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {hotelData.galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`w-full h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${hotelData.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Hotel Amenities Section */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hotel Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-8">
            {hotelData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-gray-700">
                {renderAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Room Types Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Available Room Types</h3>
          <div className="space-y-6">
            {hotelData.roomTypes.map((room) => (
              <div key={room.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Room Images */}
                  <div className="lg:col-span-1">
                    <div className="grid grid-cols-3 gap-2">
                      {room.images.map((img, index) => (
                        <div key={index} className="h-24 rounded-lg overflow-hidden">
                          <img src={img} alt={`${room.name} ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h4>
                        <p className="text-gray-600 mb-3">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          ₱{room.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>

                    {/* Room Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max {room.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Bed className="w-4 h-4 mr-2" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Bath className="w-4 h-4 mr-2" />
                        <span>En-suite</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Tv className="w-4 h-4 mr-2" />
                        <span>Smart TV</span>
                      </div>
                    </div>

                    {/* Bed Configuration */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Bed Configuration:</h5>
                      <div className="flex flex-wrap gap-2">
                        {room.bedConfiguration.map((bed, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {bed.count}x {bed.type} ({bed.size})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Room Amenities */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Room Amenities:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {room.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={() => handleBookNow(room)}
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Book This Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hotel Policies */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hotel Policies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Check-in & Check-out</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Check-in: {hotelData.policies.checkIn}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Check-out: {hotelData.policies.checkOut}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Additional Information</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>{hotelData.policies.cancellation}</div>
                <div>{hotelData.policies.children}</div>
                <div>{hotelData.policies.pets}</div>
                <div>{hotelData.policies.smoking}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Nearby Attractions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelData.nearbyAttractions.map((attraction, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">{attraction.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{attraction.type}</p>
                <p className="text-sm text-blue-600">{attraction.distance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">{hotelData.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">{hotelData.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Navigation className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">{hotelData.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelDetailsPage; 