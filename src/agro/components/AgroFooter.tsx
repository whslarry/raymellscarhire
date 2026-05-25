import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, ArrowRight, CheckCircle, Sprout, BookOpen, ShoppingCart } from 'lucide-react';
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

  return (
    <footer className="bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
        <Sprout className="w-full h-full" />
      </div>

      {/* Newsletter */}
      <div className="border-b border-emerald-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-md">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <div className="w-1 h-6 bg-amber-400 rounded-full" />
                <h3 className="text-2xl font-display font-bold">Stay Rooted</h3>
              </div>
              <p className="text-emerald-300/80 text-sm leading-relaxed">
                Get farming tips &amp; market discounts delivered to your inbox every week.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-emerald-900/80 border border-emerald-700/60 text-white placeholder-emerald-500 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 text-sm flex-shrink-0 group"
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
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-800/30 transition-all">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg block leading-none">Larry Farm</span>
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.25em]">Fresh & Local</span>
              </div>
            </Link>
            <p className="text-emerald-300/70 text-sm leading-relaxed mb-6">
              Your dual-purpose platform: shop fresh vegetables from local farms, and learn sustainable farming from the experts.
            </p>
            <div className="space-y-3 text-sm text-emerald-400">
              <div className="flex items-center gap-2.5 group">
                <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="group-hover:text-emerald-200 transition-colors">Green Valley, CA 90210</span>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Mail className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <a href="mailto:hello@larryfarm.com" className="hover:text-white transition-colors">hello@larryfarm.com</a>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-5 h-px bg-emerald-600" />
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/shop', label: 'All Vegetables' },
                { to: '/shop?cat=leafy', label: 'Leafy Greens' },
                { to: '/shop?cat=fruit', label: 'Fruiting Vegetables' },
                { to: '/shop?cat=root', label: 'Root Vegetables' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-emerald-300/70 hover:text-amber-400 text-sm transition-all duration-300 flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-5 h-px bg-emerald-600" />
              Academy
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/academy', label: 'All Resources' },
                { to: '/academy?type=video', label: 'Video Tutorials' },
                { to: '/academy?type=guide', label: 'Downloadable Guides' },
                { to: '/academy?type=workshop', label: 'Live Workshops' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-emerald-300/70 hover:text-amber-400 text-sm transition-all duration-300 flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-5 h-px bg-emerald-600" />
              Market Hours
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { day: 'Mon - Fri', hours: '8 AM - 6 PM', open: true },
                { day: 'Saturday', hours: '9 AM - 4 PM', open: true },
                { day: 'Sunday', hours: 'Closed', open: false },
              ].map(({ day, hours, open }) => (
                <li key={day} className="flex items-center justify-between gap-4">
                  <span className="text-emerald-300/70">{day}</span>
                  <span className={`font-medium ${open ? 'text-white' : 'text-emerald-700'}`}>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-emerald-700 text-xs">
            &copy; {new Date().getFullYear()} Larry Farm Fresh & Local. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-emerald-700 text-xs">
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Terms</span>
            <span className="text-emerald-900">|</span>
            <Link to="/worldcup" className="hover:text-amber-400 transition-colors">World Cup</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
