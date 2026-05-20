import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, BookOpen, CalendarDays, Users, Clock, MapPin } from 'lucide-react';
import { supabase, AgroEducation } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { useScrollReveal } from '../../lib/useScrollReveal';

const typeFilters = ['All', 'video', 'guide', 'workshop'];

const typeConfig: Record<string, { icon: typeof PlayCircle; bg: string; color: string; label: string }> = {
  video: { icon: PlayCircle, bg: 'bg-red-50', color: 'text-red-600', label: 'Video Tutorials' },
  guide: { icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600', label: 'Downloadable Guides' },
  workshop: { icon: CalendarDays, bg: 'bg-amber-50', color: 'text-amber-700', label: 'Live Workshops' },
};

export default function AgroAcademyPage() {
  const [resources, setResources] = useState<AgroEducation[]>([]);
  const [activeType, setActiveType] = useState('All');
  const { user } = useAuth();
  const gridRef = useScrollReveal(0.05);

  useEffect(() => {
    // DB INTEGRATION POINT: Add enrollment status join for each user
    supabase
      .from('agro_education')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setResources(data as AgroEducation[]); });
  }, []);

  const filtered = activeType === 'All' ? resources : resources.filter((r) => r.type === activeType);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16">
      <div className="container-wide">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-900 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-soil-50 text-soil-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            Learning Center
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 mb-2">Farmer's Academy</h1>
          <p className="text-gray-500">Video tutorials, downloadable guides, and hands-on workshops to grow your farming skills.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {typeFilters.map((type) => {
            const config = type !== 'All' ? typeConfig[type] : null;
            const Icon = config?.icon || BookOpen;
            const label = type === 'All' ? 'All Resources' : config?.label || type;
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeType === type ? 'bg-emerald-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
          {filtered.map((resource) => {
            const config = typeConfig[resource.type] || typeConfig.guide;
            const Icon = config.icon;
            const scheduleDate = resource.schedule_date
              ? new Date(resource.schedule_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
              : null;

            return (
              <div key={resource.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 img-zoom">
                  <img src={resource.image_url} alt={resource.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 ${config.bg} ${config.color} text-xs font-bold px-2.5 py-1 rounded-lg`}>
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-emerald-900 transition-colors">{resource.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{resource.description}</p>

                  <div className="space-y-2 mb-5">
                    {resource.instructor && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3.5 w-3.5" />
                        <span>{resource.instructor}</span>
                      </div>
                    )}
                    {resource.duration && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{resource.duration}</span>
                      </div>
                    )}
                    {scheduleDate && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{scheduleDate}</span>
                      </div>
                    )}
                    {resource.schedule_location && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{resource.schedule_location}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={user ? '/' : '/auth'}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {resource.type === 'workshop' ? 'Register' : resource.type === 'guide' ? 'Download' : 'Watch'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
