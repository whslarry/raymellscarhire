import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function AgroNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
            <span>Rural Route 12, Green Valley, CA</span>
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-1.5 text-forest-600 font-medium hover:text-forest-700 transition-colors group">
            <Phone className="h-3 w-3 group-hover:scale-110 transition-transform" />
            +1 (555) 123-4567
          </a>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="AgroVista Home">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-forest-600/20 transition-all duration-300 group-hover:scale-105">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-forest-900 font-display font-bold text-lg leading-none block">AgroVista</span>
              <span className="text-forest-400 text-[10px] font-bold uppercase tracking-[0.25em] leading-none">Farm & Market</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-forest-700 bg-forest-50'
                    : 'text-gray-500 hover:text-forest-700 hover:bg-forest-50/60'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-forest-500 rounded-full" />
                )}
              </Link>
            ))}

            <div className="w-px h-5 bg-gray-200 mx-2" />

            <Link
              to="/worldcup"
              className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-forest-600 hover:bg-forest-50/60 transition-all duration-300 font-medium"
            >
              World Cup
            </Link>

            <Link
              to="/contact"
              className="btn-primary ml-3 text-sm !py-2.5 !px-5 group"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
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

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/97 backdrop-blur-xl border-t border-gray-100/60 ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-1.5" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'text-forest-700 bg-forest-50'
                  : 'text-gray-600 hover:text-forest-700 hover:bg-gray-50'
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link to="/contact" className="btn-primary w-full text-sm !py-3">
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
