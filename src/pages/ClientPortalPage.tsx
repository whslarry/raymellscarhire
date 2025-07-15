import React, { useState } from 'react';
import { 
  User, Car, Calendar, CreditCard, Settings, Star, Clock, 
  MapPin, Phone, Mail, Edit, Eye, Download, Gift, Crown,
  Bell, Shield, FileText, TrendingUp, Award
} from 'lucide-react';

const ClientPortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    id: 'CL001',
    name: 'John Kamau',
    email: 'john.kamau@email.com',
    phone: '+254 712 345 678',
    idNumber: '12345678',
    memberSince: '2023-06-15',
    loyaltyTier: 'Gold',
    loyaltyPoints: 2450,
    totalBookings: 12,
    totalSpent: 145000,
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  const bookings = [
    {
      id: 'BK001',
      vehicle: 'Toyota RAV4',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      status: 'Active',
      total: 30000,
      pickupLocation: 'Westlands Office',
      trackingId: 'RC001'
    },
    {
      id: 'BK002',
      vehicle: 'Nissan Note',
      startDate: '2024-12-10',
      endDate: '2024-12-15',
      status: 'Completed',
      total: 15000,
      pickupLocation: 'JKIA Airport',
      trackingId: 'RC002'
    },
    {
      id: 'BK003',
      vehicle: 'Mercedes C-Class',
      startDate: '2024-11-20',
      endDate: '2024-11-25',
      status: 'Completed',
      total: 60000,
      pickupLocation: 'Westlands Office',
      trackingId: 'RC003'
    }
  ];

  const loyaltyBenefits = [
    { title: 'Free Upgrades', description: 'Complimentary vehicle upgrades when available', unlocked: true },
    { title: 'Priority Booking', description: 'Skip the queue with priority reservations', unlocked: true },
    { title: 'Extended Rental Hours', description: '24-hour pickup and return flexibility', unlocked: true },
    { title: 'Platinum Concierge', description: 'Personal concierge service for bookings', unlocked: false }
  ];

  const notifications = [
    { id: 1, message: 'Your booking BK001 is ready for pickup', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'You earned 150 loyalty points from your last rental', time: '1 day ago', type: 'success' },
    { id: 3, message: 'Special offer: 20% off luxury vehicles this weekend', time: '2 days ago', type: 'offer' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="text-blue-100">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Crown className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-lg font-semibold">{user.loyaltyTier} Member</span>
            </div>
            <p className="text-sm text-blue-100">{user.loyaltyPoints} points</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Car className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CreditCard className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">KSH {user.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Star className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Loyalty Points</p>
              <p className="text-2xl font-bold text-gray-900">{user.loyaltyPoints}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Rentals</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Booking */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Current Booking</h3>
        </div>
        <div className="p-6">
          {bookings.filter(b => b.status === 'Active').map(booking => (
            <div key={booking.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{booking.vehicle}</h4>
                  <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                  <p className="text-sm text-gray-600">{booking.startDate} to {booking.endDate}</p>
                  <p className="text-sm text-gray-600">Pickup: {booking.pickupLocation}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {booking.status}
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-2">KSH {booking.total.toLocaleString()}</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Track Vehicle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start">
                <Bell className={`h-5 w-5 mt-1 mr-3 ${
                  notification.type === 'success' ? 'text-green-500' :
                  notification.type === 'offer' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.vehicle}</div>
                      <div className="text-sm text-gray-500">ID: {booking.id}</div>
                      <div className="text-sm text-gray-500">{booking.pickupLocation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.startDate} to {booking.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KSH {booking.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                      {booking.status === 'Active' && (
                        <button className="text-purple-600 hover:text-purple-900">
                          <MapPin className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <img 
              src={user.profileImage} 
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.loyaltyTier} Member</p>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center">
                <Crown className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{user.loyaltyPoints} Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={user.name}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
              <input
                type="text"
                value={user.idNumber}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
          <div className="text-center">
            <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">KSH {user.totalSpent.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <div className="text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{Math.floor((new Date() - new Date(user.memberSince)) / (1000 * 60 * 60 * 24))}</p>
            <p className="text-sm text-gray-600">Days as Member</p>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{user.loyaltyTier}</p>
            <p className="text-sm text-gray-600">Loyalty Tier</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoyalty = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Loyalty Program</h2>
        <p className="text-gray-600">Earn points with every rental and unlock exclusive benefits</p>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Crown className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">{user.loyaltyTier} Member</h3>
            </div>
            <p className="text-yellow-100">Current Points: {user.loyaltyPoints}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-yellow-100">Next Tier</p>
            <p className="text-lg font-semibold">Platinum</p>
            <p className="text-sm text-yellow-100">550 points to go</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="bg-yellow-300 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(user.loyaltyPoints / 3000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Benefits</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loyaltyBenefits.map((benefit, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                benefit.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                  {benefit.unlocked ? (
                    <Shield className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{benefit.description}</p>
                {!benefit.unlocked && (
                  <p className="text-xs text-gray-500 mt-2">Unlock at Platinum tier</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Points Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Booking Completion - BK002</p>
                <p className="text-sm text-gray-600">December 15, 2024</p>
              </div>
              <span className="text-green-600 font-semibold">+150 points</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Referral Bonus</p>
                <p className="text-sm text-gray-600">December 10, 2024</p>
              </div>
              <span className="text-green-600 font-semibold">+500 points</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Booking Completion - BK001</p>
                <p className="text-sm text-gray-600">November 25, 2024</p>
              </div>
              <span className="text-green-600 font-semibold">+600 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Car },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'loyalty', label: 'Loyalty Program', icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
          <p className="text-gray-600">Manage your rentals and account preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'loyalty' && renderLoyalty()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalPage;