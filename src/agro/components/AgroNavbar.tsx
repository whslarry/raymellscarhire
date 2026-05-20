import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Phone, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useCart } from '../../lib/cart';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop Vegetables' },
  { to: '/academy', label: "Farmer's Academy" },
  { to: '/about', label: 'About' },
];

export default function AgroNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100/80'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top info bar */}
        <div className={`hidden lg:flex items-center justify-between py-1.5 text-xs border-b border-gray-100/60 transition-all duration-500 ${scrolled ? 'h-0 overflow-hidden opacity-0 py-0' : ''}`}>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            <span className="text-gray-200">|</span>
            <span>Green Valley, CA</span>
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-1.5 text-emerald-900 font-medium hover:text-emerald-700 transition-colors">
            <Phone className="h-3 w-3" />
            +1 (555) 123-4567
          </a>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="AgroVista Home">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-900/20 transition-all duration-300 group-hover:scale-105">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-emerald-900 font-bold text-lg leading-none block">AgroVista</span>
              <span className="text-emerald-900/50 text-[10px] font-bold uppercase tracking-[0.25em] leading-none">Farm & Market</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-emerald-900 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-900 hover:bg-emerald-50/60'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-900 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: Cart + Auth */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-900 transition-all duration-300"
              aria-label={`Shopping cart with ${count} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {count}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-sm">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-gray-700 font-medium max-w-[120px] truncate">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden lg:flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors duration-300"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/97 backdrop-blur-xl border-t border-gray-100/60 ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-1.5" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'text-emerald-900 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-900 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-gray-700 font-medium">{profile?.full_name || user.email}</span>
                <button onClick={signOut} className="text-sm text-red-500 hover:text-red-700 font-medium">Sign Out</button>
              </div>
            ) : (
              <Link to="/auth" className="block text-center bg-emerald-900 text-white font-semibold text-sm py-3 rounded-xl">
                Sign In / Register
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
