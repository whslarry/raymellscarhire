import React, { useEffect, useState } from 'react';
import { Trophy, Users, Ticket, BarChart3, Calendar, ShieldCheck, RefreshCw, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Stats = {
  totalMatches: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  confirmedBookings: number;
};

type RecentBooking = {
  id: string;
  booking_reference: string;
  total_amount: number;
  status: string;
  created_at: string;
  wc_matches: { home_team: string; away_team: string; home_team_flag: string; away_team_flag: string } | null;
};

export default function WCAdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [releasing, setReleasing] = useState(false);
  const [releasedCount, setReleasedCount] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [matchesRes, bookingsRes, usersRes] = await Promise.all([
      supabase.from('wc_matches').select('id', { count: 'exact', head: true }),
      supabase.from('wc_bookings').select('id, total_amount, status'),
      supabase.from('wc_profiles').select('id', { count: 'exact', head: true }),
    ]);

    const bookings = bookingsRes.data || [];
    const confirmed = bookings.filter((b) => b.status === 'confirmed');
    const revenue = confirmed.reduce((sum, b) => sum + Number(b.total_amount), 0);

    setStats({
      totalMatches: matchesRes.count || 0,
      totalBookings: bookings.length,
      confirmedBookings: confirmed.length,
      totalRevenue: revenue,
      totalUsers: usersRes.count || 0,
    });

    const { data: recent } = await supabase
      .from('wc_bookings')
      .select('id, booking_reference, total_amount, status, created_at, wc_matches(home_team, away_team, home_team_flag, away_team_flag)')
      .order('created_at', { ascending: false })
      .limit(10);

    if (recent) setRecentBookings(recent as RecentBooking[]);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleReleaseExpiredHolds = async () => {
    setReleasing(true);
    const { data, error } = await supabase.rpc('release_expired_wc_holds');
    if (!error) setReleasedCount(data as number);
    setReleasing(false);
    loadData();
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader className="h-8 w-8 text-yellow-400 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <ShieldCheck className="h-6 w-6 text-yellow-400" />
              <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest">Admin Portal</p>
            </div>
            <h1 className="text-4xl font-black text-white">Dashboard</h1>
          </div>
          <button
            onClick={loadData}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Calendar, label: 'Total Matches', value: stats?.totalMatches || 0, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { icon: Ticket, label: 'Total Bookings', value: stats?.confirmedBookings || 0, color: 'text-green-400', bg: 'bg-green-400/10' },
            { icon: Trophy, label: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { icon: Users, label: 'Registered Users', value: stats?.totalUsers || 0, color: 'text-pink-400', bg: 'bg-pink-400/10' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{label}</p>
              <p className="text-white font-black text-2xl">{value}</p>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin tools */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-yellow-400" />
              <span>Admin Tools</span>
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleReleaseExpiredHolds}
                disabled={releasing}
                className="w-full flex items-center justify-center space-x-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 py-3 px-4 rounded-xl text-sm font-semibold transition-all"
              >
                {releasing ? <Loader className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span>Release Expired Holds</span>
              </button>
              {releasedCount !== null && (
                <p className="text-green-400 text-xs text-center">Released {releasedCount} expired hold(s).</p>
              )}
              <p className="text-gray-600 text-xs text-center">
                Frees seats that were held but not purchased within 10 minutes.
              </p>
            </div>
          </div>

          {/* Recent bookings */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-5 flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-yellow-400" />
              <span>Recent Bookings</span>
            </h2>
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{b.wc_matches?.home_team_flag}{b.wc_matches?.away_team_flag}</span>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {b.wc_matches?.home_team} vs {b.wc_matches?.away_team}
                        </p>
                        <p className="text-gray-500 text-xs font-mono">{b.booking_reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-sm">${b.total_amount}</p>
                      <span className={`text-xs font-semibold ${
                        b.status === 'confirmed' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Architecture notes for portfolio */}
        <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-yellow-400" />
            <span>Architecture Notes (Portfolio Reference)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Concurrency Control',
                points: [
                  'Seats updated with optimistic locking (UPDATE WHERE status = available)',
                  'UNIQUE constraint on cart_holds.seat_id prevents double-holds',
                  'Atomic: hold fails if seat already taken by another user',
                ],
              },
              {
                title: 'Database Schema',
                points: [
                  'wc_profiles → wc_bookings → wc_booking_items',
                  'wc_matches → wc_seat_zones → wc_seats',
                  'wc_cart_holds with expires_at for timed releases',
                ],
              },
              {
                title: 'Security (RLS)',
                points: [
                  'Row Level Security on all 8 tables',
                  'Users can only access their own bookings/holds',
                  'Admin role checked via wc_profiles.role = admin',
                ],
              },
            ].map(({ title, points }) => (
              <div key={title}>
                <h3 className="text-yellow-400 font-semibold text-sm mb-2">{title}</h3>
                <ul className="space-y-1">
                  {points.map((p, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start space-x-2">
                      <span className="text-yellow-400/40 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
