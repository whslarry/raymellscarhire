import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Leaf, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { useScrollReveal } from '../../lib/useScrollReveal';

const categories = ['All', 'Grains', 'Seeds', 'Oils', 'Feed', 'Specialty'];

const products = [
  { name: 'Organic Wheat Grain', price: 420, unit: '/ton', category: 'Grains', featured: true, image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['USDA Organic Certified', 'Non-GMO Project Verified', 'High protein content (13%+)'], description: 'Premium hard red winter wheat, grown without synthetic pesticides or fertilizers.' },
  { name: 'Heritage Corn Seeds', price: 28.50, unit: '/lb', category: 'Seeds', featured: true, image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['Open-pollinated', 'Drought tolerant', '95% germination rate'], description: 'Open-pollinated heirloom corn variety with rich flavor profiles.' },
  { name: 'Cold-Pressed Sunflower Oil', price: 14.99, unit: '/L', category: 'Oils', featured: true, image: 'https://images.pexels.com/photos/33783/oil-olive-oil-kitchen-cook.jpg?auto=compress&cs=tinysrgb&w=600', features: ['Cold-pressed', 'No additives', 'Rich in Vitamin E'], description: 'Single-origin, cold-pressed sunflower oil with a delicate, nutty flavor.' },
  { name: 'Raw Wildflower Honey', price: 22, unit: '/jar', category: 'Specialty', featured: false, image: 'https://images.pexels.com/photos/54304/pexels-photo-54304.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['Raw & unfiltered', 'Local wildflower source', 'No artificial additives'], description: 'Unfiltered, raw honey harvested from wildflower meadows.' },
  { name: 'Organic Soybean Meal', price: 385, unit: '/ton', category: 'Feed', featured: false, image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['44% protein content', 'Fully traceable', 'Organic certified'], description: 'High-protein soybean meal for livestock feed with full traceability.' },
  { name: 'Heirloom Tomato Seeds', price: 12, unit: '/pkt', category: 'Seeds', featured: true, image: 'https://images.pexels.com/photos/2255453/pexels-photo-2255453.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['5 variety mix', 'Open-pollinated', 'Indeterminate types'], description: 'A curated mix of 5 heirloom tomato varieties.' },
  { name: 'Premium Alfalfa Hay', price: 195, unit: '/ton', category: 'Feed', featured: false, image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['RFV 180+', 'Moisture < 14%', 'Weed-free certified'], description: 'Top-grade alfalfa hay bales with excellent leaf-to-stem ratio.' },
  { name: 'Organic Quinoa', price: 58, unit: '/kg', category: 'Grains', featured: false, image: 'https://images.pexels.com/photos/6587580/pexels-photo-6587580.jpeg?auto=compress&cs=tinysrgb&w=600', features: ['Complete protein', 'High altitude grown', 'Fair trade certified'], description: 'Tri-color organic quinoa grown at high altitude.' },
];

const catColors: Record<string, string> = {
  Grains: 'bg-forest-50 text-forest-700 border-forest-200',
  Seeds: 'bg-green-50 text-green-700 border-green-200',
  Oils: 'bg-sun-50 text-sun-700 border-sun-200',
  Feed: 'bg-soil-50 text-soil-700 border-soil-200',
  Specialty: 'bg-pink-50 text-pink-700 border-pink-200',
};

export default function AgroServicesPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const gridRef = useScrollReveal(0.05);

  const filtered = products.filter((p) => {
    const matchCat = activeCat === 'All' || p.category === activeCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-white to-sun-50/30" />
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-forest-100/30 rounded-full blur-[80px]" />
        <div className="relative container-wide animate-slide-up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-forest-100 text-forest-700 mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Our Catalog
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-forest-900 mb-4">
              Products & Services
            </h1>
            <p className="text-gray-600 text-lg">
              Premium organic products with full traceability. From grain to specialty items, every product meets our rigorous quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white/97 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-400/20 transition-all"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal className="h-4 w-4 text-gray-400 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCat === cat
                      ? 'bg-forest-600 text-white shadow-md shadow-forest-600/20'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding" ref={gridRef}>
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-semibold text-lg">No products match your search.</p>
              <p className="text-gray-400 text-sm mt-1">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {filtered.map((product) => (
                <div key={product.name} className="card overflow-hidden group hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative h-56 img-zoom">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`absolute top-3 left-3 badge border text-xs ${catColors[product.category] || 'bg-gray-50 text-gray-600'}`}>
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="absolute top-3 right-3 badge bg-sun-400 text-white text-xs shadow-md">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-forest-700 transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

                    <div className="space-y-2 mb-5">
                      {product.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3.5 w-3.5 text-forest-500 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-forest-700 font-bold text-xl">${product.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm">{product.unit}</span>
                      </div>
                      <Link to="/contact" className="btn-primary text-sm !py-2.5 !px-4 group/btn">
                        Get Quote
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-20" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sun-400/10 rounded-full blur-[100px]" />
        <div className="relative container-wide text-center reveal">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Need a Custom Order?</h2>
          <p className="text-forest-200/80 max-w-lg mx-auto mb-8">Large-volume orders, custom blends, or specific varieties — we handle it all. Get in touch for tailored pricing.</p>
          <Link to="/contact" className="btn-gold text-base !py-4 !px-10 group">
            Contact Sales
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
