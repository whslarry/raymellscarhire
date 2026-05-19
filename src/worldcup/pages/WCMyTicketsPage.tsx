import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, ArrowRight, Loader, Trophy } from 'lucide-react';
import { supabase, Booking } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

type BookingWithDetails = Booking & {
  wc_matches: {
    home_team: string;
    away_team: string;
    home_team_flag: string;
    away_team_flag: string;
    match_date: string;
    stage: string;
    group_name: string;
    wc_stadiums: { name: string; city: string } | null;
  };
  wc_booking_items: Array<{
    price_paid: number;
    wc_seats: { row_label: string; seat_number: number } | null;
    wc_seat_zones: { zone_name: string; color_hex: string } | null;
  }>;
};

export default function WCMyTicketsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('wc_bookings')
      .select(`
        *,
        wc_matches (
          home_team, away_team, home_team_flag, away_team_flag,
          match_date, stage, group_name,
          wc_stadiums (name, city)
        ),
        wc_booking_items (
          price_paid,
          wc_seats (row_label, seat_number),
          wc_seat_zones (zone_name, color_hex)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setBookings(data as BookingWithDetails[]);
        setLoading(false);
      });
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader className="h-8 w-8 text-yellow-400 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">Your Account</p>
          <h1 className="text-4xl font-black text-white">My Tickets</h1>
          <p className="text-gray-400 mt-2">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} total</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24">
            <Ticket className="h-16 w-16 text-gray-800 mx-auto mb-6" />
            <h2 className="text-white font-bold text-xl mb-3">No tickets yet</h2>
            <p className="text-gray-500 mb-8">Book your first World Cup match ticket to get started.</p>
            <Link
              to="/matches"
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all"
            >
              <Trophy className="h-5 w-5" />
              <span>Browse Matches</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const m = booking.wc_matches;
              const date = new Date(m.match_date);
              const isPast = date < new Date();
              return (
                <div
                  key={booking.id}
                  className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all hover:border-gray-600 ${
                    booking.status === 'confirmed' ? 'border-gray-800' : 'border-red-900/50'
                  }`}
                >
                  {/* Match banner */}
                  <div className={`px-6 py-4 flex items-center justify-between ${isPast ? 'bg-gray-800/50' : 'bg-gray-800'}`}>
                    <div className="flex items-center space-x-5">
                      <div className="text-center">
                        <div className="text-3xl">{m.home_team_flag}</div>
                        <p className="text-white font-bold text-sm mt-0.5">{m.home_team}</p>
                      </div>
                      <div className="text-gray-500 font-black">VS</div>
                      <div className="text-center">
                        <div className="text-3xl">{m.away_team_flag}</div>
                        <p className="text-white font-bold text-sm mt-0.5">{m.away_team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="text-yellow-400 font-black mt-2">${booking.total_amount}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{m.wc_stadiums?.name}, {m.wc_stadiums?.city}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Ticket className="h-4 w-4 text-gray-500" />
                        <span className="font-mono text-yellow-400/80 text-xs">{booking.booking_reference}</span>
                      </div>
                    </div>

                    {/* Seat details */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {booking.wc_booking_items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-1.5 bg-gray-800 rounded-lg px-3 py-1.5 text-xs"
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.wc_seat_zones?.color_hex || '#888' }} />
                          <span className="text-gray-300">
                            {item.wc_seat_zones?.zone_name} · Row {item.wc_seats?.row_label} · #{item.wc_seats?.seat_number}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/confirmation/${booking.id}`}
                      className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors"
                    >
                      <span>View Ticket</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
