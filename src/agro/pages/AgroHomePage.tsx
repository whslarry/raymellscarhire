import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Plus, Check, Leaf, PlayCircle, BookOpen, CalendarDays, Star, ShieldCheck, Truck, Sprout, Sparkles, Users } from 'lucide-react';
import { supabase, AgroVegetable, AgroEducation } from '../../lib/supabase';
import { useCart } from '../../lib/cart';
import { useAuth } from '../../lib/auth';
import { useScrollReveal, useParallax } from '../../lib/useScrollReveal';
import ImpactCalculator from '../components/ImpactCalculator';
import FAQSection from '../components/FAQSection';

/* ─── Product Card ─── */
function ProductCard({ veg }: { veg: AgroVegetable }) {
  const { addToCart, items, loading } = useCart();
  const { user } = useAuth();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = items.some((i) => i.vegetable.id === veg.id);

  const handleAdd = async () => {
    if (!user || !inCart && justAdded) return;
    await addToCart(veg);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 img-zoom">
        <img
          src={veg.image_url}
          alt={veg.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {veg.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
            <Star className="h-3 w-3 fill-white" />
            Popular
          </span>
        )}
        {!veg.in_stock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-emerald-900 transition-colors">{veg.name}</h3>
        <p className="text-xs text-gray-400 line-clamp-1 mb-3">{veg.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-emerald-900 font-bold text-lg">${veg.price_per_kg.toFixed(2)}</span>
            <span className="text-gray-400 text-xs">/{veg.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!user || !veg.in_stock || loading}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
              justAdded
                ? 'bg-green-100 text-green-700 scale-95'
                : inCart
                ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                : 'bg-emerald-900 text-white hover:bg-emerald-800 hover:shadow-md hover:shadow-emerald-900/20'
            } disabled:bg-gray-100 disabled:text-gray-400`}
          >
            {justAdded ? (
              <><Check className="h-3.5 w-3.5" /> Added</>
            ) : inCart ? (
              <><Plus className="h-3.5 w-3.5" /> Add More</>
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Education Card ─── */
function EduCard({ resource }: { resource: AgroEducation }) {
  const { user } = useAuth();

  const typeConfig: Record<string, { icon: typeof PlayCircle; bg: string; color: string; label: string }> = {
    video: { icon: PlayCircle, bg: 'bg-red-50', color: 'text-red-600', label: 'Video Tutorial' },
    guide: { icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600', label: 'Downloadable Guide' },
    workshop: { icon: CalendarDays, bg: 'bg-amber-50', color: 'text-amber-700', label: 'Live Workshop' },
  };

  const config = typeConfig[resource.type] || typeConfig.guide;
  const Icon = config.icon;

  const scheduleDate = resource.schedule_date
    ? new Date(resource.schedule_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 img-zoom">
        <img
          src={resource.image_url}
          alt={resource.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`inline-flex items-center gap-1.5 ${config.bg} ${config.color} text-xs font-bold px-2.5 py-1 rounded-lg`}>
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-emerald-900 transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{resource.description}</p>

        <div className="space-y-2 mb-4">
          {resource.instructor && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span>{resource.instructor}</span>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <PlayCircle className="h-3.5 w-3.5" />
              <span>{resource.duration}</span>
            </div>
          )}
          {scheduleDate && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{scheduleDate} · {resource.schedule_location}</span>
            </div>
          )}
          {resource.download_url && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <BookOpen className="h-3.5 w-3.5" />
              <span>PDF Guide included</span>
            </div>
          )}
        </div>

        {resource.type === 'workshop' ? (
          <Link
            to={user ? '/academy' : '/auth'}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            <CalendarDays className="h-4 w-4" />
            Register Now
          </Link>
        ) : resource.type === 'guide' ? (
          <Link
            to={user ? '/academy' : '/auth'}
            className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Download Guide
          </Link>
        ) : (
          <Link
            to={user ? '/academy' : '/auth'}
            className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Now
          </Link>
        )}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
export default function AgroHomePage() {
  const heroParallaxRef = useParallax(0.25);
  const statsRevealRef = useScrollReveal(0.2);
  const shopRevealRef = useScrollReveal(0.05);
  const eduRevealRef = useScrollReveal(0.05);
  const ctaRevealRef = useScrollReveal(0.2);

  const [vegetables, setVegetables] = useState<AgroVegetable[]>([]);
  const [eduResources, setEduResources] = useState<AgroEducation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // DB INTEGRATION POINT: Replace with real-time subscription for live inventory
    supabase
      .from('agro_vegetables')
      .select('*')
      .eq('in_stock', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setVegetables(data as AgroVegetable[]); });

    // DB INTEGRATION POINT: Add enrollment count join for popularity sorting
    supabase
      .from('agro_education')
      .select('*')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setEduResources(data as AgroEducation[]); });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* ═══════════ SPLIT HERO ═══════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden grain-overlay">
        <div className="absolute inset-0 overflow-hidden" ref={heroParallaxRef}>
          <img
            src="https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fresh vegetables at a local farm market"
            className="w-full h-[120%] object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/80 to-emerald-800/60 z-[2]" />

        {/* Decorative floating elements */}
        <div className="absolute top-24 right-[15%] w-3 h-3 bg-amber-400 rounded-full animate-float opacity-60 z-[3]" />
        <div className="absolute top-44 right-[30%] w-2 h-2 bg-amber-300 rounded-full animate-float opacity-40 z-[3]" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 container-wide py-32 w-full">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" />
              Farm Fresh · Farmer Led · Community Driven
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] mb-6">
              Fresh From the Field,
              <span className="block text-amber-400">Knowledge From the Farm</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
              Shop seasonal vegetables directly from local farms, or grow your own with our expert-led farming courses and resources.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-white hover:text-emerald-950 font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 group"
              >
                <ShoppingCart className="h-5 w-5" />
                Shop Vegetables
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/academy"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-white/25 hover:border-white/50 text-white hover:bg-white/10 font-semibold text-base px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <BookOpen className="h-5 w-5" />
                Farmer's Academy
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {[
              { icon: ShieldCheck, label: 'Certified Organic' },
              { icon: Truck, label: 'Same-Day Delivery' },
              { icon: Sprout, label: 'Farm to Table' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
                <Icon className="h-4 w-4 text-emerald-300" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="relative -mt-8 z-20" ref={statsRevealRef}>
        <div className="container-wide">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 stagger-children">
            {[
              { icon: Sprout, value: '50+', label: 'Vegetable Varieties', color: 'text-emerald-900', bg: 'bg-emerald-50' },
              { icon: Users, value: '120+', label: 'Local Farmers', color: 'text-soil-700', bg: 'bg-soil-50' },
              { icon: BookOpen, value: '30+', label: 'Learning Resources', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Truck, value: 'Same Day', label: 'Farm Delivery', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(({ icon: Icon, value, label, color, bg }) => (
              <div key={label} className="p-6 md:p-8 text-center group">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ E-COMMERCE GRID ═══════════ */}
      <section className="section-padding bg-gray-50" ref={shopRevealRef}>
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <ShoppingCart className="h-3.5 w-3.5" />
                Fresh Market
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-900">
                Shop Fresh Vegetables
              </h2>
              <p className="text-gray-500 mt-2">Hand-picked from local organic farms, delivered to your door.</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-1.5 text-emerald-900 hover:text-emerald-700 font-semibold text-sm transition-colors group"
            >
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {vegetables.length === 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-50 rounded w-1/2" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-5 bg-gray-100 rounded w-16" />
                      <div className="h-8 bg-gray-100 rounded-xl w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
              {vegetables.map((veg) => (
                <ProductCard key={veg.id} veg={veg} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-emerald-900 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors">
              View All Vegetables
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATIONAL PORTAL HUB ═══════════ */}
      <section className="section-padding bg-white" ref={eduRevealRef}>
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <div className="inline-flex items-center gap-2 bg-soil-50 text-soil-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Farmer's Academy
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-900">
                Learn, Grow, Thrive
              </h2>
              <p className="text-gray-500 mt-2">Expert resources to help you farm smarter and more sustainably.</p>
            </div>
            <Link
              to="/academy"
              className="hidden sm:flex items-center gap-1.5 text-emerald-900 hover:text-emerald-700 font-semibold text-sm transition-colors group"
            >
              Browse Academy
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-children">
            {eduResources.map((resource) => (
              <EduCard key={resource.id} resource={resource} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/academy" className="inline-flex items-center gap-2 border-2 border-emerald-900 text-emerald-900 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
              Browse All Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ IMPACT CALCULATOR ═══════════ */}
      <ImpactCalculator />

      {/* ═══════════ FAQ ═══════════ */}
      <FAQSection />

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-emerald-900 relative overflow-hidden" ref={ctaRevealRef}>
        <div className="absolute inset-0 grain-overlay opacity-20" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Fresh Food, Thriving Farms
              </h2>
              <p className="text-emerald-200/80 text-lg leading-relaxed mb-8">
                Whether you are filling your kitchen with organic produce or filling your fields with knowledge, AgroVista is your partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white hover:text-emerald-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 group">
                  <ShoppingCart className="h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/academy" className="inline-flex items-center justify-center gap-2 border-2 border-emerald-400/30 text-white hover:bg-emerald-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                  <BookOpen className="h-5 w-5" />
                  Explore Academy
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50+', label: 'Vegetable Varieties', accent: 'text-amber-400' },
                { value: '30+', label: 'Video Tutorials', accent: 'text-emerald-300' },
                { value: '120+', label: 'Local Farmers', accent: 'text-emerald-300' },
                { value: '4.9', label: 'Average Rating', accent: 'text-amber-400' },
              ].map(({ value, label, accent }) => (
                <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                  <p className={`text-2xl font-bold ${accent}`}>{value}</p>
                  <p className="text-emerald-200/60 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
