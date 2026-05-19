import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

type Props = {
  expiresAt: string;
  onExpire: () => void;
};

export default function CartTimer({ expiresAt, onExpire }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
      if (diff === 0) onExpire();
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft <= 60;
  const progress = (secondsLeft / 600) * 100;

  return (
    <div className={`rounded-xl p-4 border ${isUrgent ? 'bg-red-950/50 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {isUrgent ? (
            <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-400" />
          )}
          <span className={`text-sm font-semibold ${isUrgent ? 'text-red-400' : 'text-gray-300'}`}>
            Seats reserved for
          </span>
        </div>
        <span className={`text-2xl font-black tabular-nums ${isUrgent ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${isUrgent ? 'bg-red-500' : 'bg-yellow-400'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {isUrgent && (
        <p className="text-red-400 text-xs mt-2 font-medium">Hurry! Your seats will be released soon.</p>
      )}
    </div>
  );
}
