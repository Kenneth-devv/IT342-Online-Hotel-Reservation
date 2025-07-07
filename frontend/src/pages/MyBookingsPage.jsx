import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, CreditCard, CheckCircle, XCircle, Clock, 
  Eye, EyeOff, DollarSign, Building2, Filter, RefreshCw,
  TrendingUp, TrendingDown, Package, UserCheck, MapPin, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/bookings/user', {
        credentials: 'include'
      });

      if (response.ok) {
        const userBookings = await response.json();
        setBookings(userBookings);
        
        // Separate current and past bookings
        const today = new Date();
        const current = userBookings.filter(booking => 
          new Date(booking.checkOutDate) >= today && booking.status !== 'CANCELLED'
        );
        const past = userBookings.filter(booking => 
          new Date(booking.checkOutDate) < today || booking.status === 'CANCELLED'
        );
        
        setCurrentBookings(current);
        setPastBookings(past);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        credentials: 'include'
      });

      if (response.ok) {
        await fetchBookings();
        alert('Booking cancelled successfully');
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="w-4 h-4" />;
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActiveBookings = () => {
    return activeTab === 'current' ? currentBookings : pastBookings;
  };

  const stats = {
    total: bookings.length,
    current: currentBookings.length,
    past: pastBookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED').length,
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            View and manage all your hotel reservations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Bookings</p>
                <p className="text-2xl font-bold text-green-600">{stats.current}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current Bookings ({currentBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Bookings ({pastBookings.length})
              </button>
            </nav>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeTab === 'current' ? 'Current Bookings' : 'Past Bookings'}
              </h3>
              <button
                onClick={fetchBookings}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            {getActiveBookings().length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No {activeTab} bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getActiveBookings().map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900">{booking.hotelName}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Booking #{booking.bookingCode}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₱{booking.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{booking.numberOfGuests} guest{booking.numberOfGuests !== 1 ? 's' : ''}, {booking.numberOfRooms} room{booking.numberOfRooms !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Check-in</p>
                        <p className="text-sm text-gray-900">{formatDate(booking.checkInDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Check-out</p>
                        <p className="text-sm text-gray-900">{formatDate(booking.checkOutDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Booked on</p>
                        <p className="text-sm text-gray-900">{formatDateTime(booking.createdAt)}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p><strong>Guest:</strong> {booking.guestFirstName} {booking.guestLastName}</p>
                          <p><strong>Email:</strong> {booking.guestEmail}</p>
                          {booking.guestPhone && <p><strong>Phone:</strong> {booking.guestPhone}</p>}
                          {booking.paymentMode && <p><strong>Payment:</strong> {booking.paymentMode}</p>}
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === 'PENDING' && activeTab === 'current' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}
                          {booking.status === 'CANCELLED' && (
                            <span className="text-sm text-gray-500 italic">Cancelled</span>
                          )}
                        </div>
                      </div>
                      {booking.specialRequests && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">
                            <strong>Special Requests:</strong> {booking.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage; 