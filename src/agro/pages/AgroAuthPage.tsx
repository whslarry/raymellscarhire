import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function AgroAuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/shop');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup' && !fullName.trim()) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }

    const result = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, fullName);

    if (result.error) {
      setError(result.error.message);
    } else if (mode === 'signup') {
      setMode('signin');
      setError('');
      setEmail('');
      setPassword('');
      setFullName('');
      setError('Account created! Please sign in.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-900/20 transition-all group-hover:scale-105">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-emerald-900 font-bold text-xl tracking-tight">AgroVista</p>
              <p className="text-emerald-900/50 text-xs font-bold tracking-widest">FARM & MARKET</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-display font-bold text-gray-900 text-center mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            {mode === 'signin' ? 'Sign in to shop fresh produce and access the academy.' : 'Join AgroVista to start shopping and learning.'}
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  mode === m
                    ? 'bg-emerald-900 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className={`flex items-start gap-2 p-3 rounded-xl border text-sm ${
                error.includes('created')
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {mode === 'signin' && (
            <p className="text-center text-gray-500 text-sm mt-6">
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-emerald-900 hover:text-emerald-700 font-semibold">
                Register now
              </button>
            </p>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Use any email & password to create an account.
        </p>
      </div>
    </div>
  );
}
