import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Check, Filter, Search, Star } from 'lucide-react';
import { supabase, AgroVegetable } from '../../lib/supabase';
import { useCart } from '../../lib/cart';
import { useAuth } from '../../lib/auth';
import { useScrollReveal } from '../../lib/useScrollReveal';

const categories = ['All', 'Leafy', 'Fruit', 'Root', 'Cruciferous', 'Legume', 'Gourd'];

export default function AgroShopPage() {
  const [vegetables, setVegetables] = useState<AgroVegetable[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart, items } = useCart();
  const { user } = useAuth();
  const gridRef = useScrollReveal(0.05);

  useEffect(() => {
    // DB INTEGRATION POINT: Add real-time subscription for inventory updates
    supabase
      .from('agro_vegetables')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setVegetables(data as AgroVegetable[]); });
  }, []);

  const filtered = vegetables.filter((v) => {
    const matchCat = activeCat === 'All' || v.category.toLowerCase() === activeCat.toLowerCase();
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16">
      <div className="container-wide">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-900 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <ShoppingCart className="h-3.5 w-3.5" />
            Vegetable Market
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 mb-2">Fresh Vegetables</h1>
          <p className="text-gray-500">Browse our selection of organic, locally-grown produce.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-20 z-20 bg-gray-50/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-gray-100/60">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vegetables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              aria-label="Search vegetables"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCat === cat ? 'bg-emerald-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" ref={gridRef}>
          {filtered.map((veg) => {
            const inCart = items.some((i) => i.vegetable.id === veg.id);
            return (
              <div key={veg.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                <div className="relative h-44 img-zoom">
                  <img src={veg.image_url} alt={veg.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {veg.featured && (
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      <Star className="h-2.5 w-2.5 fill-white" /> Popular
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-emerald-900 transition-colors">{veg.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mb-3">{veg.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-emerald-900 font-bold">${veg.price_per_kg.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs">/{veg.unit}</span>
                    </div>
                    <button
                      onClick={() => user && addToCart(veg)}
                      disabled={!user}
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                        inCart
                          ? 'bg-emerald-50 text-emerald-900'
                          : 'bg-emerald-900 text-white hover:bg-emerald-800'
                      } disabled:bg-gray-100 disabled:text-gray-400`}
                    >
                      {inCart ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {inCart ? 'In Cart' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">No vegetables found</p>
          </div>
        )}
      </div>
    </div>
  );
}
