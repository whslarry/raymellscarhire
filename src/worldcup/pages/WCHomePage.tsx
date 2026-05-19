import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Globe, Shield, Zap, Star, Calendar, MapPin } from 'lucide-react';
import { supabase, Match } from '../../lib/supabase';
import MatchCard from '../components/MatchCard';
import { useAuth } from '../../lib/auth';

export default function WCHomePage() {
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from('wc_matches')
      .select('*, wc_stadiums(*)')
      .eq('status', 'upcoming')
      .order('match_date', { ascending: true })
      .limit(3)
      .then(({ data }) => { if (data) setFeaturedMatches(data as Match[]); });
  }, []);

  const stats = [
    { icon: Globe, label: 'Host Countries', value: '3', sub: 'USA, Canada, Mexico' },
    { icon: MapPin, label: 'Stadiums', value: '16', sub: 'Across North America' },
    { icon: Calendar, label: 'Matches', value: '104', sub: 'Over 6 weeks' },
    { icon: Star, label: 'Teams', value: '48', sub: 'From 6 confederations' },
  ];

  return (
    <div className="bg-gray-950">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Stadium"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950" />
        </div>

        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] border border-yellow-400/5 rounded-full animate-pulse" />
          <div className="absolute w-[400px] h-[400px] border border-yellow-400/10 rounded-full" />
          <div className="absolute w-[200px] h-[200px] border border-yellow-400/20 rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Trophy className="h-4 w-4" />
            <span>FIFA World Cup 2026 · June - July 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight">
            THE WORLD
            <span className="block text-yellow-400">ON THE PITCH</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Secure your spot at the greatest sporting event on Earth. 104 matches, 16 iconic stadiums, 48 nations competing for glory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={user ? '/matches' : '/auth'}
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-0.5"
            >
              <Zap className="h-5 w-5" />
              <span>Book Tickets Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            {!user && (
              <Link
                to="/auth"
                className="inline-flex items-center space-x-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200"
              >
                <span>Create Account</span>
              </Link>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-gray-600 animate-bounce">
          <div className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent" />
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="text-center">
                <Icon className="h-6 w-6 text-yellow-400 mx-auto mb-3" />
                <p className="text-4xl font-black text-white mb-1">{value}</p>
                <p className="text-gray-300 font-semibold text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured matches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">Upcoming</p>
              <h2 className="text-4xl font-black text-white">Featured Matches</h2>
            </div>
            <Link
              to={user ? '/matches' : '/auth'}
              className="hidden sm:flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              <span>View all matches</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredMatches.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to={user ? '/matches' : '/auth'}
              className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              <span>View all matches</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-4xl font-black text-white">How Booking Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Register for free in under a minute.' },
              { step: '02', title: 'Browse Matches', desc: 'Filter by team, stage, or stadium.' },
              { step: '03', title: 'Select Seats', desc: 'Pick your zone and specific seats from the interactive map.' },
              { step: '04', title: 'Checkout', desc: 'Pay securely. Your digital ticket appears instantly.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-yellow-400/20 font-black text-7xl leading-none mb-4">{step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                {step !== '04' && (
                  <div className="hidden md:block absolute top-8 right-0 text-gray-700 text-2xl font-bold translate-x-1/2">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encryption. Your data is always safe.' },
              { icon: Zap, title: 'Instant Delivery', desc: 'Digital tickets delivered immediately to your account.' },
              { icon: Trophy, title: 'Official Platform', desc: 'Authorized ticket booking for FIFA World Cup 2026.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center p-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Ready to Be There?</h2>
            <p className="text-gray-400 mb-8">Join thousands of fans already holding their tickets for the greatest show on Earth.</p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-10 py-4 rounded-2xl text-lg transition-all hover:shadow-xl hover:shadow-yellow-400/20"
            >
              <Trophy className="h-5 w-5" />
              <span>Get Your Tickets</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
