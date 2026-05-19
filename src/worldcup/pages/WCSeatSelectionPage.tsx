import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, X, AlertCircle, Loader } from 'lucide-react';
import { supabase, Match, Seat, SeatZone } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { holdSeat, releaseSeatHold } from '../../lib/bookingUtils';
import StadiumMap from '../components/StadiumMap';

export default function WCSeatSelectionPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [match, setMatch] = useState<Match | null>(null);
  const [zones, setZones] = useState<SeatZone[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [holdingSeats, setHoldingSeats] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!matchId) return;
    Promise.all([
      supabase.from('wc_matches').select('*, wc_stadiums(*)').eq('id', matchId).single(),
      supabase.from('wc_seat_zones').select('*').eq('match_id', matchId).order('price_usd', { ascending: false }),
      supabase.from('wc_seats').select('*').eq('match_id', matchId).order('row_label').order('seat_number'),
    ]).then(([matchRes, zonesRes, seatsRes]) => {
      if (matchRes.data) setMatch(matchRes.data as Match);
      if (zonesRes.data) setZones(zonesRes.data as SeatZone[]);
      if (seatsRes.data) setSeats(seatsRes.data as Seat[]);
      setLoading(false);
    });
  }, [matchId]);

  const toggleSeat = useCallback((seat: Seat) => {
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.id));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats((prev) => [...prev, seat.id]);
    }
  }, [selectedSeats]);

  const selectedSeatObjects = seats.filter((s) => selectedSeats.includes(s.id));

  const getZoneForSeat = (seat: Seat) => zones.find((z) => z.id === seat.zone_id);

  const totalPrice = selectedSeatObjects.reduce((sum, s) => {
    const zone = getZoneForSeat(s);
    return sum + (zone?.price_usd ?? 0);
  }, 0);

  const handleProceedToCheckout = async () => {
    if (!user || selectedSeats.length === 0) return;
    setError('');
    setHoldingSeats([...selectedSeats]);

    const results = await Promise.all(
      selectedSeatObjects.map((seat) => {
        const zone = getZoneForSeat(seat)!;
        return holdSeat(user.id, seat, matchId!, zone.id);
      })
    );

    const failures = selectedSeatObjects.filter((_, i) => !results[i]);
    if (failures.length > 0) {
      // Release any successful holds
      const successes = selectedSeatObjects.filter((_, i) => results[i]);
      await Promise.all(successes.map((s) => releaseSeatHold(s.id)));
      setError(`${failures.length} seat(s) were just taken by another fan. Please select different seats.`);
      // Refresh seats
      const { data } = await supabase.from('wc_seats').select('*').eq('match_id', matchId).order('row_label').order('seat_number');
      if (data) setSeats(data as Seat[]);
      setSelectedSeats([]);
      setHoldingSeats([]);
      return;
    }

    setHoldingSeats([]);
    navigate('/checkout', { state: { matchId, seatIds: selectedSeats } });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader className="h-8 w-8 text-yellow-400 animate-spin" />
    </div>
  );

  if (!match) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Match not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate('/matches')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Matches</span>
        </button>

        {/* Match header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-4xl">{match.home_team_flag}</div>
                <p className="text-white font-bold mt-1">{match.home_team}</p>
              </div>
              <div className="text-gray-500 font-black text-xl">VS</div>
              <div className="text-center">
                <div className="text-4xl">{match.away_team_flag}</div>
                <p className="text-white font-bold mt-1">{match.away_team}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p className="font-semibold text-white">{match.stage}{match.group_name ? ` · ${match.group_name}` : ''}</p>
              <p>{new Date(match.match_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p>{match.wc_stadiums?.name}, {match.wc_stadiums?.city}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat map */}
          <div className="lg:col-span-2">
            <StadiumMap
              zones={zones}
              seats={seats}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
              maxSelectable={6}
            />
          </div>

          {/* Cart panel */}
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                <span>Selected Seats</span>
                <span className="ml-auto text-gray-500 text-sm font-normal">{selectedSeats.length}/6</span>
              </h3>

              {selectedSeatObjects.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-8 w-8 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No seats selected yet</p>
                  <p className="text-gray-600 text-xs mt-1">Select a zone then click seats to add them</p>
                </div>
              ) : (
                <div className="space-y-2 mb-4">
                  {selectedSeatObjects.map((seat) => {
                    const zone = getZoneForSeat(seat);
                    return (
                      <div key={seat.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-3 py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: zone?.color_hex }} />
                          <div>
                            <p className="text-white text-xs font-semibold">Row {seat.row_label} · #{seat.seat_number}</p>
                            <p className="text-gray-400 text-xs">{zone?.zone_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 text-sm font-bold">${zone?.price_usd}</span>
                          <button
                            onClick={() => setSelectedSeats((p) => p.filter((id) => id !== seat.id))}
                            className="text-gray-600 hover:text-red-400 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedSeatObjects.length > 0 && (
                <>
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Subtotal ({selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''})</span>
                      <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-500 text-xs">Processing fee (5%)</span>
                      <span className="text-gray-400 text-xs">${(totalPrice * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-yellow-400 font-black text-lg">${(totalPrice * 1.05).toFixed(2)}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start space-x-2 p-3 bg-red-950/50 border border-red-700 rounded-xl text-red-400 text-xs mb-4">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    onClick={handleProceedToCheckout}
                    disabled={holdingSeats.length > 0}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500 text-gray-900 font-black py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    {holdingSeats.length > 0 ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Reserving seats...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>Proceed to Checkout</span>
                      </>
                    )}
                  </button>
                </>
              )}

              <p className="text-gray-600 text-xs text-center mt-3">
                Maximum 6 tickets per order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
