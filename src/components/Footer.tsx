import React from 'react';
import { Car, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Raymells</h3>
                <p className="text-sm text-gray-400">CARHIRE</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Premium car rental services with flexible pricing and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>+254 794 967 335</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>+254 702 862 166</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>info@raymellscarhire.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <span>Nairobi, CBD</span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Operating Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <div>
                  <p>Mon - Fri: 6:00 AM - 10:00 PM</p>
                  <p>Saturday: 7:00 AM - 9:00 PM</p>
                  <p>Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/vehicles" className="text-gray-300 hover:text-blue-400 transition-colors">Our Vehicles</a></li>
              <li><a href="/tracking" className="text-gray-300 hover:text-blue-400 transition-colors">Track Vehicle</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="/client-portal" className="text-gray-300 hover:text-blue-400 transition-colors">Client Portal</a></li>
              <li><a href="/payment" className="text-gray-300 hover:text-blue-400 transition-colors">Book Now</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Raymells Carhire. All rights reserved. | Premium Car Rental Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;