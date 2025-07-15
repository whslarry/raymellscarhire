import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Car, Users, Star } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    rentalDuration: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We will contact you within 2 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicleType: '',
      rentalDuration: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our expert team for personalized car rental solutions. 
            We're here to help you find the perfect vehicle for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 rounded-lg p-8 text-white h-full">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-blue-100">+254 794 967 335</p>
                    <p className="text-blue-100">+254 702 862 166</p>
                    <p className="text-sm text-blue-200 mt-1">24/7 Emergency Support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-blue-100">info@raymellscarhire.com</p>
                    <p className="text-blue-100">bookings@raymellscarhire.com</p>
                    <p className="text-sm text-blue-200 mt-1">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Office Location</h3>
                    <p className="text-blue-100">
                      Nairobi, CBD<br />
                      Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <div className="text-blue-100 text-sm">
                      <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                      <p>Saturday: 7:00 AM - 9:00 PM</p>
                      <p>Sunday: 8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-blue-500">
                <h3 className="font-semibold mb-4">Why Choose Us?</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Car className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">24+</p>
                    <p className="text-xs text-blue-200">Vehicles</p>
                  </div>
                  <div>
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-xs text-blue-200">Customers</p>
                  </div>
                  <div>
                    <Star className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-xs text-blue-200">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select vehicle type</option>
                      <option value="economy">Economy</option>
                      <option value="standard">Standard</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="rentalDuration" className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Duration
                  </label>
                  <select
                    id="rentalDuration"
                    name="rentalDuration"
                    value={formData.rentalDuration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select rental duration</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily (1-7 days)</option>
                    <option value="weekly">Weekly (1-4 weeks)</option>
                    <option value="monthly">Monthly (1+ months)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your rental needs, preferred dates, special requirements, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Quick Response Guarantee:</strong> We respond to all inquiries within 2 hours during business hours. 
                  For urgent requests, please call us directly at +254 794 967 335 or +254 702 862 166.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Airport Pickup/Drop-off</h3>
              <p className="text-gray-600">Convenient pickup and drop-off services at JKIA and Wilson Airport</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chauffeur Service</h3>
              <p className="text-gray-600">Professional drivers available for luxury vehicles and corporate bookings</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support and roadside assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;