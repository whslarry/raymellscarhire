import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, ShieldCheck, Truck, Star, Users, Sprout, Sun, CheckCircle, TrendingUp } from 'lucide-react';
import { useScrollReveal, useParallax } from '../../lib/useScrollReveal';
import FAQSection from '../components/FAQSection';
import ImpactCalculator from '../components/ImpactCalculator';

const stats = [
  { icon: Sprout, value: '12,000+', label: 'Acres Farmed', color: 'text-forest-600', bg: 'bg-forest-50' },
  { icon: Users, value: '340+', label: 'Partner Farms', color: 'text-soil-600', bg: 'bg-soil-50' },
  { icon: ShieldCheck, value: '99.8%', label: 'Quality Pass Rate', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Truck, value: '48hrs', label: 'Avg. Delivery', color: 'text-sun-600', bg: 'bg-sun-50' },
];

const testimonials = [
  {
    quote: "AgroVista's organic wheat has transformed our artisan bread line. Consistent quality, reliable delivery, and full traceability from field to flour.",
    name: 'Sarah Mitchell',
    role: 'Head of Procurement, GreenMill Bakeries',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote: "The heritage seed program gave us varieties we couldn't find anywhere else. Our crop diversity has doubled, and the drought tolerance saved us last season.",
    name: 'James Okonkwo',
    role: 'Farm Director, Sunrise Collective',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote: "Their data-driven approach to sustainable farming sets a new standard. We reference their yield optimization methods in our published research.",
    name: 'Dr. Elena Vasquez',
    role: 'Agricultural Researcher, TerraVerde Institute',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const blogPosts = [
  {
    title: 'The Future of Regenerative Agriculture',
    excerpt: 'How soil-first farming practices are reshaping the industry and boosting long-term yields by up to 40%.',
    category: 'Sustainability',
    image: 'https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Elena Vasquez',
  },
  {
    title: 'Precision Irrigation: Saving Water, Boosting Yields',
    excerpt: 'Smart irrigation systems reduce water usage by 30% while increasing crop output. Here is how the technology works.',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'AgroVista Team',
  },
  {
    title: 'From Seed to Shelf: Our Supply Chain Transparency',
    excerpt: 'Every product in our catalog carries a full traceability record. Learn how we ensure quality at every step.',
    category: 'Company',
    image: 'https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Mitchell',
  },
];

const categoryColors: Record<string, string> = {
  Sustainability: 'bg-green-50 text-green-700 border-green-200',
  Technology: 'bg-blue-50 text-blue-700 border-blue-200',
  Company: 'bg-soil-50 text-soil-700 border-soil-200',
  'Farming Tips': 'bg-sun-50 text-sun-700 border-sun-200',
};

const featuredProducts = [
  { name: 'Organic Wheat Grain', price: '$420', unit: '/ton', cat: 'Grains', img: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'Best Seller' },
  { name: 'Heritage Corn Seeds', price: '$28.50', unit: '/lb', cat: 'Seeds', img: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=600', badge: null },
  { name: 'Cold-Pressed Sunflower Oil', price: '$14.99', unit: '/L', cat: 'Oils', img: 'https://images.pexels.com/photos/33783/oil-olive-oil-kitchen-cook.jpg?auto=compress&cs=tinysrgb&w=600', badge: 'New' },
  { name: 'Heirloom Tomato Seeds', price: '$12.00', unit: '/pkt', cat: 'Seeds', img: 'https://images.pexels.com/photos/2255453/pexels-photo-2255453.jpeg?auto=compress&cs=tinysrgb&w=600', badge: null },
];

export default function AgroHomePage() {
  const heroParallaxRef = useParallax(0.25);
  const statsRevealRef = useScrollReveal(0.2);
  const valuesRevealRef = useScrollReveal(0.1);
  const productsRevealRef = useScrollReveal(0.1);
  const testimonialsRevealRef = useScrollReveal(0.1);
  const blogRevealRef = useScrollReveal(0.1);
  const ctaRevealRef = useScrollReveal(0.2);

  return (
    <div className="bg-white">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden grain-overlay">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden" ref={heroParallaxRef}>
          <img
            src="https://images.pexels.com/photos/2165759/pexels-photo-2165759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Lush green farmland at golden hour"
            className="w-full h-[120%] object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/85 via-forest-900/70 to-forest-800/50 z-[2]" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-[15%] w-3 h-3 bg-sun-400 rounded-full animate-float opacity-60 z-[3]" />
        <div className="absolute top-40 right-[25%] w-2 h-2 bg-sun-300 rounded-full animate-float opacity-40 z-[3]" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-[10%] w-2 h-2 bg-forest-300 rounded-full animate-float opacity-50 z-[3]" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 container-wide py-32">
          <div className="max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 badge bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Sustainable Agriculture Since 2012
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] mb-6">
              From Our Soil
              <span className="block text-sun-400">To Your Table</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-lg">
              Premium organic products with full traceability. Connecting sustainable farms with conscious buyers across North America.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-gold text-base !py-4 !px-8 group">
                Explore Products
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base backdrop-blur-sm">
                Our Story
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {['USDA Organic', 'Non-GMO Verified', 'Fair Trade'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-white/50 text-sm">
                <CheckCircle className="h-4 w-4 text-forest-300" />
                <span>{badge}</span>
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
            {stats.map(({ icon: Icon, value, label, color, bg }) => (
              <div key={label} className="p-6 md:p-8 text-center group">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ VALUE PROPOSITION ═══════════ */}
      <section className="section-padding" ref={valuesRevealRef}>
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 badge bg-forest-100 text-forest-700 mb-4">
              <Sprout className="h-3.5 w-3.5" />
              Why AgroVista
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">
              Agriculture, Reimagined
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine time-honored farming wisdom with modern technology to deliver premium products while regenerating the land.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: Leaf,
                title: 'Regenerative Practices',
                desc: 'Our farming methods restore soil health, increase biodiversity, and sequester carbon — leaving the land better than we found it.',
                color: 'forest',
                stat: '40%',
                statLabel: 'yield increase',
              },
              {
                icon: ShieldCheck,
                title: 'Full Traceability',
                desc: 'Every product carries a documented journey from field to shelf. Scan the code, see the story — soil tests, harvest dates, and quality checks.',
                color: 'soil',
                stat: '100%',
                statLabel: 'traceable',
              },
              {
                icon: Droplets,
                title: 'Water Stewardship',
                desc: 'Precision irrigation and drought-resistant crop varieties reduce water consumption by up to 30% without compromising yield.',
                color: 'sun',
                stat: '30%',
                statLabel: 'water saved',
              },
            ].map(({ icon: Icon, title, desc, color, stat, statLabel }) => {
              const colors: Record<string, { bg: string; icon: string; accent: string }> = {
                forest: { bg: 'bg-forest-50', icon: 'text-forest-600', accent: 'text-forest-700' },
                soil: { bg: 'bg-soil-50', icon: 'text-soil-600', accent: 'text-soil-700' },
                sun: { bg: 'bg-sun-50', icon: 'text-sun-600', accent: 'text-sun-700' },
              };
              return (
                <div key={title} className="card p-8 group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${colors[color].bg} rounded-bl-[3rem] -mr-2 -mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    <div className={`w-14 h-14 ${colors[color].bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${colors[color].icon}`} />
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-3xl font-black ${colors[color].accent}`}>{stat}</span>
                      <span className="text-gray-400 text-sm">{statLabel}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section className="section-padding bg-forest-50/30" ref={productsRevealRef}>
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <div className="inline-flex items-center gap-2 badge bg-white text-forest-700 border border-forest-200 mb-4">
                <Sun className="h-3.5 w-3.5" />
                Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900">
                Our Products
              </h2>
              <p className="text-gray-500 mt-2">Curated selections from our latest harvest</p>
            </div>
            <Link
              to="/services"
              className="hidden sm:flex items-center gap-1.5 text-forest-600 hover:text-forest-700 font-semibold text-sm transition-colors group"
            >
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {featuredProducts.map((product) => (
              <div key={product.name} className="card overflow-hidden group">
                <div className="relative h-52 img-zoom">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 badge bg-white/90 backdrop-blur-sm text-forest-700 text-xs border border-forest-100">
                    {product.cat}
                  </span>
                  {product.badge && (
                    <span className="absolute top-3 right-3 badge bg-sun-400 text-white text-xs shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-forest-700 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-forest-700 font-bold text-lg">{product.price}</span>
                      <span className="text-gray-400 text-sm">{product.unit}</span>
                    </div>
                    <Link
                      to="/services"
                      className="text-sm font-medium text-forest-600 hover:text-forest-700 flex items-center gap-1 transition-colors group/btn"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link to="/services" className="btn-secondary text-sm">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ IMPACT CALCULATOR ═══════════ */}
      <ImpactCalculator />

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-padding bg-white" ref={testimonialsRevealRef}>
        <div className="container-wide">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 badge bg-soil-50 text-soil-700 border border-soil-200 mb-4">
              <Star className="h-3.5 w-3.5" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-500">Hear from the people who rely on our products every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-8 flex flex-col relative group hover:-translate-y-1 transition-all duration-300">
                {/* Large decorative quote */}
                <div className="absolute top-4 right-6 text-forest-100 text-6xl font-display font-bold leading-none select-none group-hover:text-forest-200 transition-colors">
                  &ldquo;
                </div>

                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-sun-400 text-sun-400" />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-6 relative z-10">
                  {t.quote}
                </blockquote>

                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-forest-100"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG ═══════════ */}
      <section className="section-padding bg-forest-50/30" ref={blogRevealRef}>
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <div className="inline-flex items-center gap-2 badge bg-white text-forest-700 border border-forest-200 mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                Latest Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900">
                From the Field
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {blogPosts.map((post, i) => (
              <article key={i} className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 img-zoom">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className={`absolute top-3 left-3 badge border text-xs ${categoryColors[post.category] || 'bg-gray-50 text-gray-600'}`}>
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-xs mb-2.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-forest-400 rounded-full" />
                    By {post.author}
                  </p>
                  <h3 className="font-display font-bold text-gray-900 mb-3 group-hover:text-forest-700 transition-colors line-clamp-2 text-lg leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-forest-600 hover:text-forest-700 text-sm font-semibold mt-5 transition-colors cursor-pointer group/link">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <FAQSection />

      {/* ═══════════ CTA ═══════════ */}
      <section className="section-padding bg-forest-900 relative overflow-hidden" ref={ctaRevealRef}>
        <div className="absolute inset-0 grain-overlay opacity-30" />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sun-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-forest-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 container-wide text-center reveal-scale">
          <div className="inline-flex items-center gap-2 badge bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm mb-6">
            <Leaf className="h-3.5 w-3.5" />
            Start Your Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 text-balance">
            Ready to Grow With Us?
          </h2>
          <p className="text-forest-200/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you are sourcing organic grain for your bakery or heritage seeds for your farm, we are here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold text-base !py-4 !px-10 group">
              Get a Free Quote
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-forest-400/30 text-white hover:bg-forest-800 font-semibold px-10 py-4 rounded-xl transition-all duration-300 text-base">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
