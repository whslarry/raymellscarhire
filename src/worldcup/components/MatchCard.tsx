import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, Trophy } from 'lucide-react';
import { Match } from '../../lib/supabase';

type Props = { match: Match };

const stageColors: Record<string, string> = {
  'Group Stage': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Round of 16': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Quarter-Final': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Semi-Final': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Final': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export default function MatchCard({ match }: Props) {
  const date = new Date(match.match_date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const stageClass = stageColors[match.stage] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/5 transition-all duration-300">
      {/* Stage badge */}
      <div className="px-4 pt-4 pb-0 flex items-center justify-between">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${stageClass}`}>
          {match.stage === 'Final' && <Trophy className="h-3 w-3 mr-1" />}
          {match.stage}
          {match.group_name && ` · ${match.group_name}`}
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {match.status}
        </span>
      </div>

      {/* Teams */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Home team */}
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{match.home_team_flag}</div>
            <p className="text-white font-bold text-base sm:text-lg leading-tight">{match.home_team}</p>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center mx-4">
            <div className="text-gray-500 text-xs font-bold tracking-widest mb-1">VS</div>
            <div className="w-px h-8 bg-gray-700"></div>
          </div>

          {/* Away team */}
          <div className="flex-1 text-center">
            <div className="text-4xl mb-2">{match.away_team_flag}</div>
            <p className="text-white font-bold text-base sm:text-lg leading-tight">{match.away_team}</p>
          </div>
        </div>
      </div>

      {/* Match info */}
      <div className="px-4 pb-4 space-y-2 border-t border-gray-800 pt-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
          <span>{dateStr}</span>
          <Clock className="h-4 w-4 ml-4 mr-2 text-gray-500 flex-shrink-0" />
          <span>{timeStr}</span>
        </div>
        {match.wc_stadiums && (
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span>{match.wc_stadiums.name}, {match.wc_stadiums.city}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link
          to={`/matches/${match.id}/seats`}
          className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-200 group-hover:shadow-md group-hover:shadow-yellow-400/20"
        >
          <span>Get Tickets</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
