
import React from 'react';
import { Property } from '../types';

interface PropertyListProps {
  properties: Property[];
  onBook: (p: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onBook }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {properties.map(property => (
        <div 
          key={property.id} 
          className="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row"
        >
          <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
            <img 
              src={`https://images.unsplash.com/photo-${property.photoId}?w=800&h=800&fit=crop`}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              alt={property.title}
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-rose-500 tracking-tight">★ {property.rating}</span>
            </div>
          </div>

          <div className="p-8 flex-grow flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-rose-500 transition-colors">{property.title}</h3>
              <p className="text-sm text-gray-500 font-medium">{property.location}</p>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
              {property.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {property.amenities.slice(0, 3).map(amenity => (
                <span key={amenity} className="bg-rose-50 text-rose-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border border-rose-100">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-[10px] font-bold text-gray-400">+{property.amenities.length - 3} more</span>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
              <div>
                <span className="text-2xl font-black text-gray-900">${property.pricePerNight}</span>
                <span className="text-xs text-gray-400 font-bold uppercase ml-1">/ night</span>
              </div>
              <button 
                onClick={() => onBook(property)}
                className="bg-rose-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-rose-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-rose-100"
              >
                Book Stay
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
