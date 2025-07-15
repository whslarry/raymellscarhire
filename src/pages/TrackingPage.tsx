import React, { useState } from 'react';
import { Search, MapPin, Clock, Car, User, Phone, AlertCircle } from 'lucide-react';

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    'RC001': {
      vehicleId: 'RC001',
      vehicleName: 'Toyota RAV4',
      customerName: 'John Kamau',
      customerPhone: '+254 712 345 678',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      status: 'Active',
      currentLocation: 'Westlands, Nairobi',
      lastUpdated: '2025-01-16 14:30',
      totalDistance: '342 km',
      fuelLevel: '75%',
      drivingTime: '8h 45m',
      route: [
        { time: '09:00', location: 'Raymells Carhire Office', status: 'Picked up' },
        { time: '10:30', location: 'JKIA Airport', status: 'Visited' },
        { time: '12:15', location: 'Westlands Mall', status: 'Current' },
      ]
    },
    'RC002': {
      vehicleId: 'RC002',
      vehicleName: 'Nissan X-Trail',
      customerName: 'Sarah Mwangi',
      customerPhone: '+254 722 456 789',
      startDate: '2025-01-14',
      endDate: '2025-01-21',
      status: 'Active',
      currentLocation: 'Mombasa Road, Nairobi',
      lastUpdated: '2025-01-16 13:45',
      totalDistance: '156 km',
      fuelLevel: '60%',
      drivingTime: '4h 20m',
      route: [
        { time: '08:00', location: 'Raymells Carhire Office', status: 'Picked up' },
        { time: '11:00', location: 'Karen Shopping Centre', status: 'Visited' },
        { time: '13:45', location: 'Mombasa Road', status: 'Current' },
      ]
    }
  };

  const handleTracking = () => {
    setLoading(true);
    setTimeout(() => {
      const data = mockTrackingData[trackingId.toUpperCase()];
      setTrackingData(data || null);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Your Vehicle</h1>
          <p className="text-xl text-gray-600">Enter your tracking ID to view real-time vehicle information</p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-2">
                Tracking ID
              </label>
              <input
                type="text"
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID (e.g., RC001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleTracking}
                disabled={!trackingId || loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Track Vehicle
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Demo IDs */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-800">Demo Tracking IDs</h3>
          </div>
          <p className="text-sm text-blue-700">
            Try these demo tracking IDs: <strong>RC001</strong> or <strong>RC002</strong>
          </p>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Vehicle Status Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-green-500 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Car className="h-6 w-6 mr-2" />
                    <span className="text-lg font-semibold">Vehicle Status: {trackingData.status}</span>
                  </div>
                  <div className="text-sm">
                    Last Updated: {trackingData.lastUpdated}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="ml-2 font-medium">{trackingData.vehicleName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Current Location:</span>
                        <span className="ml-2 font-medium">{trackingData.currentLocation}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Rental Period:</span>
                        <span className="ml-2 font-medium">{trackingData.startDate} to {trackingData.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Customer:</span>
                        <span className="ml-2 font-medium">{trackingData.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{trackingData.customerPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Tracking ID:</span>
                        <span className="ml-2 font-medium">{trackingData.vehicleId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{trackingData.totalDistance}</div>
                  <div className="text-sm text-gray-600">Total Distance</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{trackingData.fuelLevel}</div>
                  <div className="text-sm text-gray-600">Fuel Level</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{trackingData.drivingTime}</div>
                  <div className="text-sm text-gray-600">Driving Time</div>
                </div>
              </div>
            </div>

            {/* Route History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route History</h3>
              <div className="space-y-4">
                {trackingData.route.map((stop, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${
                        stop.status === 'Current' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{stop.location}</p>
                          <p className="text-sm text-gray-500">{stop.status}</p>
                        </div>
                        <div className="text-sm text-gray-500">{stop.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {trackingId && !loading && !trackingData && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking ID Not Found</h3>
            <p className="text-gray-600 mb-4">
              The tracking ID "{trackingId}" was not found in our system. Please check your ID and try again.
            </p>
            <p className="text-sm text-gray-500">
              If you continue to have issues, please contact us at +254 794 967 335 or +254 702 862 166
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="mb-2">• Your tracking ID was provided when you picked up your vehicle</p>
              <p className="mb-2">• Tracking information is updated every 15 minutes</p>
              <p>• Location data may be delayed by up to 30 minutes</p>
            </div>
            <div>
              <p className="mb-2">• Contact us if you can't find your tracking ID</p>
              <p className="mb-2">• Emergency assistance: +254 794 967 335</p>
              <p>• Customer service: info@raymellscarhire.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;