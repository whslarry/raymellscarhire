import React, { useState } from 'react';
import { Star, Users, Fuel, Cog, MapPin, Phone } from 'lucide-react';

const VehiclesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vehicles = [
    {
      id: 1,
      name: "Toyota Vitz",
      category: "economy",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 300,
      priceDay: 2500,
      priceMonth: 60000,
      passengers: 4,
      transmission: "Manual",
      fuel: "Petrol",
      features: ["Air Conditioning", "Radio/CD", "Central Locking"],
      rating: 4.5,
      available: true
    },
    {
      id: 2,
      name: "Nissan Note",
      category: "economy",
      image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 350,
      priceDay: 3000,
      priceMonth: 70000,
      passengers: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      features: ["Air Conditioning", "Bluetooth", "Power Steering"],
      rating: 4.7,
      available: true
    },
    {
      id: 3,
      name: "Toyota Fielder",
      category: "standard",
      image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 450,
      priceDay: 4000,
      priceMonth: 90000,
      passengers: 5,
      transmission: "Automatic",
      fuel: "Hybrid",
      features: ["Air Conditioning", "GPS Navigation", "Reverse Camera"],
      rating: 4.6,
      available: true
    },
    {
      id: 4,
      name: "Toyota RAV4",
      category: "suv",
      image: "https://images.pexels.com/photos/1118777/pexels-photo-1118777.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 700,
      priceDay: 6000,
      priceMonth: 140000,
      passengers: 7,
      transmission: "Automatic",
      fuel: "Petrol",
      features: ["4WD", "Leather Seats", "Sunroof", "Climate Control"],
      rating: 4.8,
      available: true
    },
    {
      id: 5,
      name: "Nissan X-Trail",
      category: "suv", 
      image: "https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 750,
      priceDay: 6500,
      priceMonth: 150000,
      passengers: 7,
      transmission: "Automatic",
      fuel: "Petrol",
      features: ["4WD", "Premium Sound", "Panoramic Roof"],
      rating: 4.7,
      available: false
    },
    {
      id: 6,
      name: "Mercedes C-Class",
      category: "luxury",
      image: "https://images.pexels.com/photos/431024/pexels-photo-431024.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 1200,
      priceDay: 12000,
      priceMonth: 280000,
      passengers: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      features: ["Leather Interior", "Premium Sound", "Heated Seats", "Navigation"],
      rating: 4.9,
      available: true
    },
    {
      id: 7,
      name: "Toyota Hiace",
      category: "tourism",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 800,
      priceDay: 8000,
      priceMonth: 180000,
      passengers: 14,
      transmission: "Manual",
      fuel: "Diesel",
      features: ["Air Conditioning", "Tour Guide Seating", "Luggage Space", "PA System"],
      rating: 4.6,
      available: true
    },
    {
      id: 8,
      name: "Nissan Urvan",
      category: "tourism",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 850,
      priceDay: 8500,
      priceMonth: 190000,
      passengers: 15,
      transmission: "Manual",
      fuel: "Diesel",
      features: ["Air Conditioning", "Reclining Seats", "Entertainment System", "Cooler Box"],
      rating: 4.7,
      available: true
    },
    {
      id: 9,
      name: "Toyota Coaster",
      category: "tourism",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 1000,
      priceDay: 10000,
      priceMonth: 220000,
      passengers: 25,
      transmission: "Manual",
      fuel: "Diesel",
      features: ["Air Conditioning", "Comfortable Seating", "Large Windows", "Storage Compartments"],
      rating: 4.8,
      available: true
    },
    {
      id: 10,
      name: "Land Cruiser Prado",
      category: "tourism",
      image: "https://images.pexels.com/photos/1118777/pexels-photo-1118777.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 1200,
      priceDay: 12000,
      priceMonth: 280000,
      passengers: 7,
      transmission: "Automatic",
      fuel: "Diesel",
      features: ["4WD", "Safari Ready", "Roof Hatch", "Premium Interior", "GPS Navigation"],
      rating: 4.9,
      available: true
    },
    {
      id: 11,
      name: "Safari Land Cruiser",
      category: "tourism",
      image: "https://images.pexels.com/photos/1118777/pexels-photo-1118777.jpeg?auto=compress&cs=tinysrgb&w=600",
      priceHour: 1500,
      priceDay: 15000,
      priceMonth: 350000,
      passengers: 7,
      transmission: "Manual",
      fuel: "Diesel",
      features: ["Pop-up Roof", "Game Drive Ready", "Binocular Holders", "Cooler Box", "First Aid Kit"],
      rating: 4.9,
      available: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'economy', label: 'Economy' },
    { value: 'standard', label: 'Standard' },
    { value: 'suv', label: 'SUV' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'tourism', label: 'Tourism' }
  ];

  const filteredVehicles = selectedCategory === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vehicle Fleet</h1>
          <p className="text-xl text-gray-600">Choose from our extensive collection of well-maintained vehicles</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                {!vehicle.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Currently Unavailable</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{vehicle.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                
                {/* Vehicle specs */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="flex items-center">
                    <Cog className="h-4 w-4 mr-1" />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    <span>{vehicle.fuel}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Hourly</p>
                      <p className="font-semibold text-blue-600">KSH {vehicle.priceHour.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Daily</p>
                      <p className="font-semibold text-blue-600">KSH {vehicle.priceDay.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Monthly</p>
                      <p className="font-semibold text-blue-600">KSH {vehicle.priceMonth.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      vehicle.available
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!vehicle.available}
                  >
                    {vehicle.available ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-blue-100 mb-6">Our expert team is here to help you find the perfect vehicle for your needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Visit our showroom in Nairobi</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>Call us: +254 794 967 335</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;