import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, Ticket, ArrowRight, Loader } from 'lucide-react';
import { supabase, Booking, BookingItem, Match } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import DigitalTicket from '../components/DigitalTicket';

export default function WCConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [items, setItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    if (!bookingId || !user) return;

    Promise.all([
      supabase.from('wc_bookings').select('*').eq('id', bookingId).eq('user_id', user.id).single(),
      supabase.from('wc_booking_items').select('*, wc_seats(*), wc_seat_zones(*)').eq('booking_id', bookingId),
    ]).then(async ([bookingRes, itemsRes]) => {
      if (!bookingRes.data) { navigate('/my-tickets'); return; }
      setBooking(bookingRes.data as Booking);
      if (itemsRes.data) setItems(itemsRes.data as BookingItem[]);

      const { data: matchData } = await supabase
        .from('wc_matches')
        .select('*, wc_stadiums(*)')
        .eq('id', bookingRes.data.match_id)
        .single();
      if (matchData) setMatch(matchData as Match);

      setLoading(false);
    });
  }, [bookingId, user, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader className="h-8 w-8 text-yellow-400 animate-spin" />
    </div>
  );

  if (!booking || !match) return null;

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success banner */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Booking Confirmed!</h1>
          <p className="text-gray-400 text-lg">
            Your tickets for{' '}
            <span className="text-white font-semibold">
              {match.home_team} vs {match.away_team}
            </span>{' '}
            are secured.
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-gray-900 border border-gray-700 px-5 py-2 rounded-xl">
            <span className="text-gray-400 text-sm">Reference:</span>
            <span className="text-yellow-400 font-black font-mono tracking-wider">{booking.booking_reference}</span>
          </div>
        </div>

        {/* Booking summary card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold mb-4">Booking Summary</h2>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Match</p>
              <p className="text-white font-semibold">{match.home_team} {match.home_team_flag} vs {match.away_team_flag} {match.away_team}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Date</p>
              <p className="text-white">{new Date(match.match_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Venue</p>
              <p className="text-white">{match.wc_stadiums?.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Total Paid</p>
              <p className="text-yellow-400 font-black text-lg">${booking.total_amount}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.wc_seat_zones?.color_hex }} />
                  <span className="text-gray-300">{item.wc_seat_zones?.zone_name} · Row {item.wc_seats?.row_label} · Seat #{item.wc_seats?.seat_number}</span>
                </div>
                <span className="text-white font-medium">${item.price_paid}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital ticket toggle */}
        <button
          onClick={() => setShowTicket(!showTicket)}
          className="w-full flex items-center justify-center space-x-2 border border-yellow-400/40 hover:border-yellow-400 text-yellow-400 font-semibold py-3 rounded-xl transition-all mb-6 hover:bg-yellow-400/5"
        >
          <Ticket className="h-5 w-5" />
          <span>{showTicket ? 'Hide' : 'View'} Digital Ticket</span>
        </button>

        {showTicket && (
          <div className="mb-6 flex justify-center">
            <DigitalTicket
              booking={booking}
              match={match}
              items={items}
              profileName={profile?.full_name || user?.email || 'Ticket Holder'}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/my-tickets"
            className="flex-1 flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all"
          >
            <Ticket className="h-5 w-5" />
            <span>My Tickets</span>
          </Link>
          <Link
            to="/matches"
            className="flex-1 flex items-center justify-center space-x-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 rounded-xl transition-all"
          >
            <span>Book More Tickets</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
