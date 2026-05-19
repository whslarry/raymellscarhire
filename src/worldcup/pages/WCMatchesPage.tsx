import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { supabase, Match } from '../../lib/supabase';
import MatchCard from '../components/MatchCard';

const STAGES = ['All', 'Group Stage', 'Round of 16', 'Quarter-Final', 'Semi-Final', 'Final'];

export default function WCMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');

  useEffect(() => {
    supabase
      .from('wc_matches')
      .select('*, wc_stadiums(*)')
      .eq('status', 'upcoming')
      .order('match_date', { ascending: true })
      .then(({ data }) => {
        if (data) setMatches(data as Match[]);
        setLoading(false);
      });
  }, []);

  const filtered = matches.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.home_team.toLowerCase().includes(q) ||
      m.away_team.toLowerCase().includes(q) ||
      m.wc_stadiums?.city.toLowerCase().includes(q) ||
      m.wc_stadiums?.name.toLowerCase().includes(q) ||
      m.group_name.toLowerCase().includes(q);
    const matchesStage = stage === 'All' || m.stage === stage;
    return matchesSearch && matchesStage;
  });

  const groupedByDate: Record<string, Match[]> = {};
  filtered.forEach((m) => {
    const key = new Date(m.match_date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    if (!groupedByDate[key]) groupedByDate[key] = [];
    groupedByDate[key].push(m);
  });

  return (
    <div className="min-h-screen bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">World Cup 2026</p>
          <h1 className="text-4xl font-black text-white mb-2">All Matches</h1>
          <p className="text-gray-400">Select a match to choose your seats and book tickets.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by team, city, or stadium..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  stage === s
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Search className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold">No matches found</p>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedByDate).map(([dateLabel, dayMatches]) => (
              <div key={dateLabel}>
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <h2 className="text-white font-bold text-lg">{dateLabel}</h2>
                  <div className="flex-1 border-t border-gray-800" />
                  <span className="text-gray-500 text-sm">{dayMatches.length} match{dayMatches.length !== 1 ? 'es' : ''}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dayMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
