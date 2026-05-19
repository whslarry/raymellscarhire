import React from 'react';
import { Trophy, MapPin, Calendar, QrCode, Ticket } from 'lucide-react';
import { Booking, BookingItem, Match } from '../../lib/supabase';

type Props = {
  booking: Booking;
  match: Match;
  items: BookingItem[];
  profileName: string;
};

function QRCodeDisplay({ value }: { value: string }) {
  // Simulate a QR code with a grid pattern based on the booking reference
  const size = 8;
  const hash = value.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const grid: boolean[][] = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => {
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1) return true;
      if (i <= 2 && j <= 2) return true;
      if (i <= 2 && j >= size - 3) return true;
      if (i >= size - 3 && j <= 2) return true;
      return ((hash * (i + 1) * (j + 1)) % 3) === 0;
    })
  );

  return (
    <div className="inline-block p-2 bg-white rounded-lg">
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`w-3 h-3 ${cell ? 'bg-gray-900' : 'bg-white'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DigitalTicket({ booking, match, items, profileName }: Props) {
  const date = new Date(match.match_date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const stadium = match.wc_stadiums;

  return (
    <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl max-w-lg w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-gray-900" />
            <div>
              <p className="text-gray-900 font-black text-sm tracking-widest">FIFA WORLD CUP 2026</p>
              <p className="text-gray-800 text-xs">Official Match Ticket</p>
            </div>
          </div>
          <Ticket className="h-8 w-8 text-gray-900 opacity-30" />
        </div>

        {/* Teams */}
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-4xl">{match.home_team_flag}</div>
            <p className="text-gray-900 font-black text-lg mt-1">{match.home_team}</p>
          </div>
          <div className="text-gray-800 font-black text-xl">VS</div>
          <div className="text-center">
            <div className="text-4xl">{match.away_team_flag}</div>
            <p className="text-gray-900 font-black text-lg mt-1">{match.away_team}</p>
          </div>
        </div>
      </div>

      {/* Dashed separator */}
      <div className="flex items-center px-6 py-2 bg-gray-800">
        <div className="flex-1 border-t border-dashed border-gray-600" />
        <div className="-mt-px mx-3 text-gray-600 text-xs font-mono">✂</div>
        <div className="flex-1 border-t border-dashed border-gray-600" />
      </div>

      {/* Ticket details */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Holder</p>
          <p className="text-white font-bold text-sm">{profileName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Reference</p>
          <p className="text-yellow-400 font-bold text-sm font-mono">{booking.booking_reference}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Date & Time</p>
          <p className="text-white text-xs">{dateStr}</p>
          <p className="text-white font-bold text-sm">{timeStr}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Stage</p>
          <p className="text-white font-bold text-sm">{match.stage}</p>
          {match.group_name && <p className="text-gray-400 text-xs">{match.group_name}</p>}
        </div>
        {stadium && (
          <div className="col-span-2">
            <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Venue</p>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <p className="text-white text-sm">{stadium.name}, {stadium.city}, {stadium.country}</p>
            </div>
          </div>
        )}

        {/* Seats */}
        <div className="col-span-2">
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-2">Seats</p>
          <div className="space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.wc_seat_zones?.color_hex || '#888' }}
                  />
                  <span className="text-gray-300 text-xs">
                    {item.wc_seat_zones?.zone_name} · Row {item.wc_seats?.row_label}, Seat {item.wc_seats?.seat_number}
                  </span>
                </div>
                <span className="text-yellow-400 font-bold text-xs">${item.price_paid}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code section */}
      <div className="border-t border-dashed border-gray-700 p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide font-semibold">Scan at Gate</p>
          <p className="text-white font-bold text-sm font-mono">{booking.booking_reference}</p>
          <p className="text-gray-500 text-xs mt-1">Total: <span className="text-yellow-400 font-bold">${booking.total_amount}</span></p>
        </div>
        <QRCodeDisplay value={booking.booking_reference} />
      </div>
    </div>
  );
}
