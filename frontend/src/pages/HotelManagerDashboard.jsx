import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, CreditCard, CheckCircle, XCircle, Clock, 
  Eye, EyeOff, DollarSign, Building2, Filter, RefreshCw,
  TrendingUp, TrendingDown, Package, UserCheck
} from 'lucide-react';
import Header from '../components/Header';

const HotelManagerDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [hotelInfo, setHotelInfo] = useState({ hotelId: null, hotelName: 'Loading...' });

  useEffect(() => {
    fetchBookings();
    fetchHotelInfo();
  }, []);

  const fetchHotelInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hotel-manager/hotel-info', {
        credentials: 'include'
      });

      if (response.ok) {
        const hotelData = await response.json();
        setHotelInfo(hotelData);
      } else {
        console.error('Failed to fetch hotel info');
        setHotelInfo({ hotelId: null, hotelName: 'Your Hotel' });
      }
    } catch (error) {
      console.error('Error fetching hotel info:', error);
      setHotelInfo({ hotelId: null, hotelName: 'Your Hotel' });
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      const [allResponse, currentResponse, pastResponse] = await Promise.all([
        fetch('http://localhost:8080/api/hotel-manager/bookings', {
          credentials: 'include'
        }),
        fetch('http://localhost:8080/api/hotel-manager/bookings/current', {
          credentials: 'include'
        }),
        fetch('http://localhost:8080/api/hotel-manager/bookings/past', {
          credentials: 'include'
        })
      ]);

      if (allResponse.ok && currentResponse.ok && pastResponse.ok) {
        const allBookings = await allResponse.json();
        const current = await currentResponse.json();
        const past = await pastResponse.json();

        setBookings(allBookings);
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

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hotel-manager/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        await fetchBookings();
        setShowStatusModal(false);
        setSelectedBooking(null);
      } else {
        console.error('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const confirmPayment = async (bookingId, paymentMethod) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hotel-manager/bookings/${bookingId}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ paymentMethod })
      });

      if (response.ok) {
        await fetchBookings();
        setShowPaymentModal(false);
        setSelectedBooking(null);
        setPaymentMethod('');
      } else {
        console.error('Failed to confirm payment');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
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

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const stats = {
    total: bookings.length,
    current: currentBookings.length,
    past: pastBookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Manager Dashboard</h1>
          <p className="text-gray-600">
            Manage bookings for <span className="font-semibold text-blue-600">
              {hotelInfo.hotelName === 'Loading...' ? 'Your Hotel' : hotelInfo.hotelName}
            </span>, 
            confirm payments, and update booking statuses
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
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Bookings</p>
                <p className="text-2xl font-bold text-green-600">{stats.current}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
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

          {/* Bookings Table */}
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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Proof
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getActiveBookings().map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.hotelName}
                            </div>
                            <div className="text-sm text-gray-500">
                              #{booking.bookingCode}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.guestFirstName} {booking.guestLastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.guestEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatDate(booking.checkInDate)}
                            </div>
                            <div className="text-sm text-gray-500">
                              to {formatDate(booking.checkOutDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₱{booking.totalAmount ? booking.totalAmount.toLocaleString() : '0'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.paymentMode || 'Not specified'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.paymentMode === 'GCash' && booking.paymentProof ? (
                            <img 
                              src={booking.paymentProof} 
                              alt="Payment Proof" 
                              style={{ width: 80, height: 'auto', borderRadius: 8, border: '1px solid #eee', cursor: 'pointer' }} 
                              onClick={() => handleImageClick(booking.paymentProof)} 
                            />
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {booking.status === 'CANCELLED' ? (
                            <span className="text-gray-400 italic"></span>
                          ) : (
                            <div className="flex space-x-2">
                              {booking.status === 'PENDING' && (
                                <>
                                  <button
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setShowPaymentModal(true);
                                    }}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    Confirm Payment
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setNewStatus('CONFIRMED');
                                      setShowStatusModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Confirm
                                  </button>
                                </>
                              )}
                              {booking.status === 'CONFIRMED' && (
                                <button
                                  onClick={() => {
                                    setSelectedBooking(booking);
                                    setNewStatus('COMPLETED');
                                    setShowStatusModal(true);
                                  }}
                                  className="text-purple-600 hover:text-purple-900"
                                >
                                  Mark Complete
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setNewStatus('CANCELLED');
                                  setShowStatusModal(true);
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Payment</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Booking: #{selectedBooking.bookingCode}</p>
                <p className="text-sm text-gray-600 mb-2">Amount: ₱{selectedBooking.totalAmount ? selectedBooking.totalAmount.toLocaleString() : '0'}</p>
                <p className="text-sm text-gray-600 mb-4">Guest: {selectedBooking.guestFirstName} {selectedBooking.guestLastName}</p>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select payment method</option>
                  <option value="GCash">GCash</option>
                  <option value="PayMaya">PayMaya</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedBooking(null);
                    setPaymentMethod('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmPayment(selectedBooking.id, paymentMethod)}
                  disabled={!paymentMethod}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Update Booking Status</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Booking: #{selectedBooking.bookingCode}</p>
                <p className="text-sm text-gray-600 mb-2">Current Status: {selectedBooking.status}</p>
                <p className="text-sm text-gray-600 mb-4">New Status: {newStatus}</p>
                
                <p className="text-sm text-gray-600">
                  Are you sure you want to change the status to <strong>{newStatus}</strong>?
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedBooking(null);
                    setNewStatus('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, newStatus)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-full">
            <div className="relative p-6">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <img src={selectedImage} alt="Payment Proof" className="max-w-full max-h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelManagerDashboard; 