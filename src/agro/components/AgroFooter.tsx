import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, ArrowRight, CheckCircle, Sprout } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AgroFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    const { error } = await supabase.from('agro_newsletter').insert({ email: email.trim() });
    if (error) {
      setStatus(error.code === '23505' ? 'success' : 'error');
    } else {
      setStatus('success');
      setEmail('');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About Us' },
        { to: '/services', label: 'Services' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Products',
      links: [
        { to: '/services?cat=Grains', label: 'Organic Grains' },
        { to: '/services?cat=Seeds', label: 'Heritage Seeds' },
        { to: '/services?cat=Oils', label: 'Cold-Pressed Oils' },
        { to: '/services?cat=Specialty', label: 'Specialty Items' },
      ],
    },
  ];

  return (
    <footer className="bg-forest-950 text-white relative overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-forest-700/50 to-transparent" />

      {/* Decorative leaf pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
        <Sprout className="w-full h-full" />
      </div>

      {/* Newsletter */}
      <div className="border-b border-forest-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-md">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <div className="w-1 h-6 bg-sun-400 rounded-full" />
                <h3 className="text-2xl font-display font-bold">Stay Rooted</h3>
              </div>
              <p className="text-forest-300/80 text-sm leading-relaxed">
                Subscribe to our newsletter for seasonal harvest updates, sustainable farming insights, and exclusive offers.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-forest-900/80 border border-forest-700/60 text-white placeholder-forest-500 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-sun-400 focus:ring-2 focus:ring-sun-400/20 transition-all text-sm"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gold !py-3.5 !px-6 text-sm flex-shrink-0 group"
              >
                {status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : status === 'loading' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-forest-600/20 transition-all duration-300">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-display font-bold text-lg block leading-none">AgroVista</span>
                <span className="text-forest-400 text-[10px] font-bold uppercase tracking-[0.25em]">Farm & Market</span>
              </div>
            </Link>
            <p className="text-forest-300/70 text-sm leading-relaxed mb-6">
              Connecting sustainable farms with conscious buyers. Premium organic products with full traceability.
            </p>
            <div className="space-y-3 text-sm text-forest-400">
              <div className="flex items-center gap-2.5 group">
                <MapPin className="h-4 w-4 text-forest-600 flex-shrink-0 group-hover:text-forest-400 transition-colors" />
                <span className="group-hover:text-forest-200 transition-colors">Rural Route 12, Green Valley, CA 90210</span>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Phone className="h-4 w-4 text-forest-600 flex-shrink-0 group-hover:text-forest-400 transition-colors" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Mail className="h-4 w-4 text-forest-600 flex-shrink-0 group-hover:text-forest-400 transition-colors" />
                <a href="mailto:hello@agrovista.farm" className="hover:text-white transition-colors">hello@agrovista.farm</a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-5 h-px bg-forest-600" />
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-forest-300/70 hover:text-sun-400 text-sm transition-all duration-300 flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-5 h-px bg-forest-600" />
              Hours
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { day: 'Mon - Fri', hours: '8 AM - 6 PM', open: true },
                { day: 'Saturday', hours: '9 AM - 4 PM', open: true },
                { day: 'Sunday', hours: 'Closed', open: false },
              ].map(({ day, hours, open }) => (
                <li key={day} className="flex items-center justify-between gap-4">
                  <span className="text-forest-300/70">{day}</span>
                  <span className={`font-medium ${open ? 'text-white' : 'text-forest-600'}`}>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-forest-600 text-xs">
            &copy; {new Date().getFullYear()} AgroVista Farm & Market. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-forest-600 text-xs">
            <span className="hover:text-forest-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-forest-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-forest-800">|</span>
            <Link to="/worldcup" className="hover:text-sun-400 cursor-pointer transition-colors">World Cup Tickets</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
