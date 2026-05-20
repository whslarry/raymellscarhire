import React, { useState, useMemo } from 'react';
import { Calculator, Droplets, Leaf, TrendingUp, Info, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../lib/useScrollReveal';

type CropType = 'wheat' | 'corn' | 'soy' | 'tomato';

const cropData: Record<CropType, { name: string; emoji: string; waterPerAcre: number; yieldPerAcre: number; unit: string; co2PerAcre: number }> = {
  wheat: { name: 'Organic Wheat', emoji: '🌾', waterPerAcre: 1200, yieldPerAcre: 3.2, unit: 'tons', co2PerAcre: -1.8 },
  corn: { name: 'Heritage Corn', emoji: '🌽', waterPerAcre: 2200, yieldPerAcre: 5.1, unit: 'tons', co2PerAcre: -2.4 },
  soy: { name: 'Organic Soybean', emoji: '🫘', waterPerAcre: 1600, yieldPerAcre: 2.8, unit: 'tons', co2PerAcre: -2.1 },
  tomato: { name: 'Heirloom Tomato', emoji: '🍅', waterPerAcre: 3000, yieldPerAcre: 12.0, unit: 'tons', co2PerAcre: -0.9 },
};

export default function ImpactCalculator() {
  const [crop, setCrop] = useState<CropType>('wheat');
  const [acres, setAcres] = useState(100);
  const [organic, setOrganic] = useState(true);
  const revealRef = useScrollReveal(0.1);

  const results = useMemo(() => {
    const data = cropData[crop];
    const waterSavings = organic ? Math.round(data.waterPerAcre * acres * 0.3) : 0;
    const totalYield = +(data.yieldPerAcre * acres).toFixed(1);
    const co2Impact = +(data.co2PerAcre * acres * (organic ? 1.5 : 1)).toFixed(1);
    const revenueEstimate = Math.round(totalYield * (crop === 'tomato' ? 1200 : crop === 'soy' ? 385 : crop === 'corn' ? 195 : 420));

    return { waterSavings, totalYield, co2Impact, revenueEstimate, unit: data.unit };
  }, [crop, acres, organic]);

  return (
    <section className="section-padding bg-white" id="calculator" ref={revealRef}>
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 badge bg-sun-100 text-sun-800 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Tool
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-3">
              Farm Impact Calculator
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Estimate your crop yield, water savings, and environmental impact based on acreage and farming method.
            </p>
          </div>

          <div className="bg-gradient-to-br from-forest-50/60 to-white rounded-3xl border border-forest-100 shadow-sm overflow-hidden reveal-scale">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Input panel */}
              <div className="lg:col-span-2 p-6 md:p-8 bg-white border-b lg:border-b-0 lg:border-r border-forest-100/80">
                <h3 className="text-forest-900 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-forest-400 rounded-full" />
                  Configure
                </h3>

                {/* Crop type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Crop Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(cropData) as [CropType, typeof cropData[CropType]][]).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => setCrop(key)}
                        className={`px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-300 border-2 flex items-center gap-2 ${
                          crop === key
                            ? 'bg-forest-600 text-white border-forest-600 shadow-md shadow-forest-600/20'
                            : 'bg-white text-gray-600 border-gray-150 hover:border-forest-300 hover:bg-forest-50/50'
                        }`}
                      >
                        <span className="text-base">{data.emoji}</span>
                        {data.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acreage */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Acreage: <span className="text-forest-700 font-bold text-base">{acres.toLocaleString()}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={10}
                      max={1000}
                      step={10}
                      value={acres}
                      onChange={(e) => setAcres(Number(e.target.value))}
                      className="w-full h-2 bg-forest-200 rounded-full appearance-none cursor-pointer accent-forest-600"
                      aria-label="Number of acres"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>10 acres</span>
                    <span>1,000 acres</span>
                  </div>
                </div>

                {/* Organic toggle */}
                <div className="flex items-center justify-between p-4 bg-forest-50/80 rounded-xl border border-forest-100">
                  <div className="flex items-center gap-2.5">
                    <Leaf className="h-4 w-4 text-forest-600" />
                    <span className="text-sm font-medium text-gray-700">Organic Practices</span>
                  </div>
                  <button
                    onClick={() => setOrganic(!organic)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                      organic ? 'bg-forest-600 shadow-inner' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={organic}
                    aria-label="Toggle organic farming practices"
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
                        organic ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Results panel */}
              <div className="lg:col-span-3 p-6 md:p-8">
                <h3 className="text-forest-900 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sun-400 rounded-full" />
                  Estimated Impact
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: TrendingUp, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', label: 'Est. Yield', value: results.totalYield.toLocaleString(), sub: results.unit },
                    { icon: Droplets, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', label: 'Water Saved', value: results.waterSavings > 0 ? `${(results.waterSavings / 1000).toFixed(0)}K` : '0', sub: 'gallons/season' },
                    { icon: Leaf, iconBg: 'bg-green-50', iconColor: 'text-green-600', label: 'CO2 Sequestered', value: Math.abs(results.co2Impact).toString(), sub: 'tons CO2/year' },
                    { icon: Calculator, iconBg: 'bg-sun-50', iconColor: 'text-sun-700', label: 'Revenue Est.', value: `$${results.revenueEstimate.toLocaleString()}`, sub: 'per harvest' },
                  ].map(({ icon: Icon, iconBg, iconColor, label, value, sub }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-forest-200 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-4 w-4 ${iconColor}`} />
                        </div>
                        <span className="text-xs font-medium text-gray-400">{label}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-forest-700 transition-colors">{value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2.5 text-xs text-gray-400 bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-300" />
                  <p>Estimates are based on average yields and market prices. Actual results may vary based on climate, soil conditions, and farming practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
