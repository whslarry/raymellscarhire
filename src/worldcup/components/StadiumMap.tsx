import React, { useState } from 'react';
import { Seat, SeatZone } from '../../lib/supabase';

type Props = {
  zones: SeatZone[];
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (seat: Seat) => void;
  maxSelectable?: number;
};

export default function StadiumMap({ zones, seats, selectedSeats, onToggleSeat, maxSelectable = 6 }: Props) {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const displayZone = activeZone ? zones.find((z) => z.id === activeZone) : null;
  const displaySeats = activeZone ? seats.filter((s) => s.zone_id === activeZone) : [];

  const rows = displayZone
    ? [...new Set(displaySeats.map((s) => s.row_label))].sort()
    : [];

  return (
    <div className="space-y-6">
      {/* Zone legend / selector */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
        <h3 className="text-white font-bold mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
          Select a Zone
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {zones.map((zone) => {
            const isActive = activeZone === zone.id;
            const pct = zone.total_seats > 0 ? Math.round((zone.available_seats / zone.total_seats) * 100) : 0;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(isActive ? null : zone.id)}
                className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color_hex }} />
                    <span className="text-white font-semibold text-sm">{zone.zone_name}</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">${zone.price_usd}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className={`font-medium ${pct < 20 ? 'text-red-400' : pct < 50 ? 'text-orange-400' : 'text-green-400'}`}>
                    {zone.available_seats} seats left
                  </span>
                  <span>{pct}% available</span>
                </div>
                <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: zone.color_hex }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual stadium map */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
        {/* Pitch visualization */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full max-w-sm h-32 bg-green-900/40 border-2 border-green-700/50 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-3 border border-green-700/40 rounded-lg" />
            <div className="w-16 h-16 border-2 border-green-700/40 rounded-full" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-green-700/40 ml-8" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-green-700/40 mr-8" />
            <span className="text-green-600 text-xs font-bold absolute bottom-2 right-2 tracking-widest">PITCH</span>
          </div>
        </div>

        {/* Seat grid */}
        {!activeZone ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Select a zone above to view individual seats</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold text-sm">
                {displayZone?.zone_name}
              </h4>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-gray-600" />
                  <span className="text-gray-400">Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-yellow-400" />
                  <span className="text-gray-400">Selected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-gray-800 border border-gray-700" />
                  <span className="text-gray-400">Unavailable</span>
                </div>
              </div>
            </div>
            {rows.map((row) => {
              const rowSeats = displaySeats
                .filter((s) => s.row_label === row)
                .sort((a, b) => a.seat_number - b.seat_number);
              return (
                <div key={row} className="flex items-center gap-1">
                  <span className="text-gray-500 text-xs w-5 text-center font-mono font-bold">{row}</span>
                  <div className="flex gap-1 flex-wrap">
                    {rowSeats.map((seat) => {
                      const isSelected = selectedSeats.includes(seat.id);
                      const isUnavailable = seat.status !== 'available' && !isSelected;
                      const canSelect = isSelected || (selectedSeats.length < maxSelectable && !isUnavailable);
                      return (
                        <button
                          key={seat.id}
                          onClick={() => canSelect && onToggleSeat(seat)}
                          disabled={isUnavailable || (!canSelect && !isSelected)}
                          title={`Row ${seat.row_label}, Seat ${seat.seat_number}`}
                          className={`w-5 h-5 rounded text-xs font-bold transition-all duration-150 ${
                            isSelected
                              ? 'bg-yellow-400 text-gray-900 scale-110 shadow-md shadow-yellow-400/30'
                              : isUnavailable
                              ? 'bg-gray-800 text-gray-700 cursor-not-allowed border border-gray-700'
                              : canSelect
                              ? 'bg-gray-600 hover:bg-gray-500 text-gray-300 cursor-pointer'
                              : 'bg-gray-700 text-gray-600 cursor-not-allowed'
                          }`}
                        />
                      );
                    })}
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
