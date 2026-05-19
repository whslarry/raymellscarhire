import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, User, Mail, Phone, Globe, AlertCircle, ArrowLeft, Loader } from 'lucide-react';
import { supabase, CartHold, Match } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { confirmBooking, releaseSeatHold } from '../../lib/bookingUtils';
import CartTimer from '../components/CartTimer';

type LocationState = { matchId: string; seatIds: string[] };

export default function WCCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const state = location.state as LocationState;

  const [holds, setHolds] = useState<CartHold[]>([]);
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  useEffect(() => {
    if (!state?.matchId || !user) {
      navigate('/matches');
      return;
    }

    Promise.all([
      supabase
        .from('wc_cart_holds')
        .select('*, wc_seats(*), wc_seat_zones(*)')
        .eq('user_id', user.id)
        .eq('match_id', state.matchId),
      supabase
        .from('wc_matches')
        .select('*, wc_stadiums(*)')
        .eq('id', state.matchId)
        .single(),
    ]).then(([holdsRes, matchRes]) => {
      if (holdsRes.data) setHolds(holdsRes.data as CartHold[]);
      if (matchRes.data) setMatch(matchRes.data as Match);

      // Pre-fill from profile
      if (profile?.full_name) {
        const parts = profile.full_name.split(' ');
        setForm((f) => ({
          ...f,
          firstName: parts[0] || '',
          lastName: parts.slice(1).join(' ') || '',
          email: user.email || '',
          phone: profile.phone || '',
          nationality: profile.nationality || '',
        }));
      } else {
        setForm((f) => ({ ...f, email: user.email || '' }));
      }

      setLoading(false);
    });
  }, [state, user, profile, navigate]);

  const handleExpire = async () => {
    if (holds.length > 0) {
      await Promise.all(holds.map((h) => releaseSeatHold(h.seat_id)));
    }
    navigate('/matches', { state: { expired: true } });
  };

  const totalBeforeFee = holds.reduce((sum, h) => sum + (h.wc_seat_zones?.price_usd ?? 0), 0);
  const fee = totalBeforeFee * 0.05;
  const total = totalBeforeFee + fee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || holds.length === 0 || !match) return;
    setSubmitting(true);
    setError('');

    const result = await confirmBooking(user.id, match.id, holds, 'card');
    if (!result) {
      setError('Booking failed. Please try again.');
      setSubmitting(false);
      return;
    }

    navigate(`/confirmation/${result.bookingId}`, { state: { reference: result.reference } });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader className="h-8 w-8 text-yellow-400 animate-spin" />
    </div>
  );

  if (holds.length === 0) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Your cart is empty or has expired.</p>
        <button onClick={() => navigate('/matches')} className="text-yellow-400 hover:text-yellow-300 font-semibold">
          Browse Matches
        </button>
      </div>
    </div>
  );

  const earliestExpiry = holds.reduce((min, h) =>
    h.expires_at < min ? h.expires_at : min, holds[0].expires_at);

  return (
    <div className="min-h-screen bg-gray-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Seat Selection</span>
        </button>

        <div className="mb-8">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-1">Step 3 of 3</p>
          <h1 className="text-3xl font-black text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Timer */}
            <CartTimer expiresAt={earliestExpiry} onExpire={handleExpire} />

            {/* Personal Info */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-white font-bold mb-5 flex items-center space-x-2">
                <User className="h-5 w-5 text-yellow-400" />
                <span>Attendee Information</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'firstName', label: 'First Name', type: 'text', icon: User, placeholder: 'John', required: true },
                  { key: 'lastName', label: 'Last Name', type: 'text', icon: User, placeholder: 'Doe', required: true },
                  { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'john@example.com', required: true },
                  { key: 'phone', label: 'Phone', type: 'tel', icon: Phone, placeholder: '+1 555 000 0000', required: false },
                ].map(({ key, label, type, icon: Icon, placeholder, required }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{label}{required && ' *'}</label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        required={required}
                        className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors"
                      />
                    </div>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nationality</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      value={form.nationality}
                      onChange={(e) => setForm((f) => ({ ...f, nationality: e.target.value }))}
                      placeholder="e.g. American"
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-white font-bold mb-1 flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-yellow-400" />
                <span>Payment Details</span>
              </h2>
              <p className="text-gray-500 text-xs mb-5">Simulated payment — no real charges.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Number *</label>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                      const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                      setForm((f) => ({ ...f, cardNumber: formatted }));
                    }}
                    placeholder="4242 4242 4242 4242"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors font-mono tracking-wider"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry *</label>
                    <input
                      type="text"
                      value={form.cardExpiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                        setForm((f) => ({ ...f, cardExpiry: v }));
                      }}
                      placeholder="MM/YY"
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CVC *</label>
                    <input
                      type="text"
                      value={form.cardCvc}
                      onChange={(e) => setForm((f) => ({ ...f, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      placeholder="123"
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name on Card *</label>
                  <input
                    type="text"
                    value={form.cardName}
                    onChange={(e) => setForm((f) => ({ ...f, cardName: e.target.value }))}
                    placeholder="John Doe"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 p-3 bg-red-950/50 border border-red-700 rounded-xl text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500 text-gray-900 font-black py-4 rounded-2xl text-lg transition-all flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-yellow-400/20"
            >
              {submitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Confirming...</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Pay ${total.toFixed(2)} — Confirm Booking</span>
                </>
              )}
            </button>
            <p className="text-center text-gray-600 text-xs flex items-center justify-center space-x-1">
              <Lock className="h-3 w-3" />
              <span>256-bit SSL encrypted · Simulated payment for demo purposes</span>
            </p>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-bold mb-5">Order Summary</h3>

              {match && (
                <div className="bg-gray-800 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-center space-x-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl">{match.home_team_flag}</div>
                      <p className="text-white text-xs font-bold mt-1">{match.home_team}</p>
                    </div>
                    <span className="text-gray-500 font-bold text-sm">VS</span>
                    <div className="text-center">
                      <div className="text-2xl">{match.away_team_flag}</div>
                      <p className="text-white text-xs font-bold mt-1">{match.away_team}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs text-center">{match.wc_stadiums?.name}</p>
                  <p className="text-gray-400 text-xs text-center">
                    {new Date(match.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )}

              <div className="space-y-2 mb-4">
                {holds.map((hold) => (
                  <div key={hold.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: hold.wc_seat_zones?.color_hex }} />
                      <span className="text-gray-300">
                        Row {hold.wc_seats?.row_label} · #{hold.wc_seats?.seat_number}
                      </span>
                    </div>
                    <span className="text-white font-medium">${hold.wc_seat_zones?.price_usd}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalBeforeFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Booking fee (5%)</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-black text-lg pt-1 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-yellow-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
