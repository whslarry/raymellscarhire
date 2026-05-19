import React from 'react';
import { Trophy, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WCFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-7 w-7 text-yellow-400" />
              <div>
                <span className="text-white font-black text-base">WORLD CUP 2026</span>
                <p className="text-yellow-400 text-xs font-semibold tracking-widest">OFFICIAL TICKET PORTAL</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The official ticket booking platform for FIFA World Cup 2026. Secure your place in history at the greatest sporting event on Earth.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Shield className="h-3 w-3 text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Globe className="h-3 w-3 text-blue-400" />
                <span>USA · Canada · Mexico</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/matches', label: 'All Matches' },
                { to: '/my-tickets', label: 'My Tickets' },
                { to: '/auth', label: 'Sign In' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Support</h4>
            <ul className="space-y-2">
              {['FAQ', 'Refund Policy', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 hover:text-yellow-400 text-sm cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; 2026 World Cup Tickets. Demo project for portfolio purposes.
          </p>
          <p className="text-gray-600 text-xs mt-2 sm:mt-0">
            Built with React + Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
