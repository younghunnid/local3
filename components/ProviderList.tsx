
import React, { useState, useMemo } from 'react';
import { Provider, Availability } from '../types';

interface ProviderListProps {
  category: string;
  providers: Provider[];
  onBook: (p: Provider) => void;
  onViewProfile: (p: Provider) => void;
}

type PriceFilter = 'all' | 'under50' | '50-100' | 'over100';
type DistanceFilter = 'all' | '1' | '2' | '5';
type AvailabilityFilter = 'all' | Availability;

const ProviderList: React.FC<ProviderListProps> = ({ category, providers, onBook, onViewProfile }) => {
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<PriceFilter>('all');
  const [maxDistance, setMaxDistance] = useState<DistanceFilter>('all');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return providers.filter(p => {
      if (p.category !== category) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      
      if (priceRange !== 'all') {
        if (priceRange === 'under50' && p.priceValue >= 50) return false;
        if (priceRange === '50-100' && (p.priceValue < 50 || p.priceValue > 100)) return false;
        if (priceRange === 'over100' && p.priceValue <= 100) return false;
      }

      if (maxDistance !== 'all') {
        if (p.distanceValue > parseFloat(maxDistance)) return false;
      }

      if (availability !== 'all' && p.availability !== availability) return false;

      return true;
    });
  }, [category, providers, minRating, priceRange, maxDistance, availability]);

  const resetFilters = () => {
    setMinRating(0);
    setPriceRange('all');
    setMaxDistance('all');
    setAvailability('all');
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all ${
              showFilters ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(minRating > 0 || priceRange !== 'all' || maxDistance !== 'all' || availability !== 'all') && (
              <span className="bg-emerald-400 w-2 h-2 rounded-full"></span>
            )}
          </button>
          
          <p className="text-sm text-gray-500 font-medium ml-2">
            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> professionals
          </p>
        </div>

        {showFilters && (
          <button onClick={resetFilters} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Min Rating</label>
            <div className="flex flex-wrap gap-2">
              {[0, 4.0, 4.5].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    minRating === r ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 border border-transparent hover:border-indigo-200'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}+ ★`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Range</label>
            <div className="flex flex-wrap gap-2">
              {[
                {id: 'all', label: 'Any'},
                {id: 'under50', label: '< $50'},
                {id: '50-100', label: '$50-100'},
                {id: 'over100', label: '> $100'}
              ].map(range => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id as PriceFilter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    priceRange === range.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 border border-transparent hover:border-indigo-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Distance</label>
            <div className="flex flex-wrap gap-2">
              {[
                {id: 'all', label: 'Any'},
                {id: '1', label: '1 mi'},
                {id: '2', label: '2 mi'},
                {id: '5', label: '5 mi'}
              ].map(dist => (
                <button
                  key={dist.id}
                  onClick={() => setMaxDistance(dist.id as DistanceFilter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    maxDistance === dist.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 border border-transparent hover:border-indigo-200'
                  }`}
                >
                  {dist.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Availability</label>
            <div className="flex flex-wrap gap-2">
              {[
                {id: 'all', label: 'Any'},
                {id: 'now', label: 'Now'},
                {id: 'today', label: 'Today'},
                {id: 'tomorrow', label: 'Tomorrow'}
              ].map(avail => (
                <button
                  key={avail.id}
                  onClick={() => setAvailability(avail.id as AvailabilityFilter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    availability === avail.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 border border-transparent hover:border-indigo-200'
                  }`}
                >
                  {avail.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Provider Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800">No matching providers</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">We couldn't find anyone matching those specific filters. Try widening your search.</p>
          <button onClick={resetFilters} className="mt-6 text-indigo-600 font-bold hover:underline">Clear all filters</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(provider => (
            <div key={provider.id} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex items-end flex-shrink-0">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1">
                  <span className="text-yellow-300">★</span> {provider.rating.toFixed(1)} <span className="opacity-70 font-normal">({provider.reviews})</span>
                </div>
                
                <img 
                  src={`https://images.unsplash.com/photo-${provider.photoId}?w=400&h=400&fit=crop&crop=face`}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl object-cover transform transition-transform group-hover:scale-105"
                  alt={provider.name}
                />
                
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-lg shadow-sm">
                  <span className={`text-[10px] font-extrabold uppercase tracking-tight ${
                    provider.availability === 'now' ? 'text-emerald-600' : 'text-orange-500'
                  }`}>
                    {provider.availability === 'now' ? '● Live' : `● Available ${provider.availability}`}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  <span className="text-xs font-bold text-gray-400">{provider.distance}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{provider.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.specialties.map(spec => (
                    <span key={spec} className="bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border border-indigo-100">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                   <button 
                    onClick={() => onViewProfile(provider)}
                    className="text-indigo-600 text-sm font-bold hover:underline"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => onBook(provider)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderList;
