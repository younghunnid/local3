
import React from 'react';
import { ViewState } from '../types';
import { LOGO_URL } from '../constants';

interface WelcomeScreenProps {
  onSelectType: (type: ViewState) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectType }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-fade-in">
      <div className="text-center mb-16 flex flex-col items-center">
        <img 
          src={LOGO_URL} 
          alt="LSERS Logo" 
          className="w-48 h-48 object-contain mb-8 drop-shadow-2xl animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Service Excellence <span className="text-indigo-600">Simplified.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          LSERS connects verified professionals with clients seeking reliable, top-tier services and properties in Liberia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Customer Card */}
        <div 
          onClick={() => onSelectType('customer')}
          className="group relative bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:border-indigo-200"
        >
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">I Need a Service</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Browse verified professionals for home repairs, tech support, or creative projects.</p>
          <div className="inline-flex items-center font-bold text-indigo-600 group-hover:gap-2 transition-all">
            Get Started <span className="ml-2">→</span>
          </div>
        </div>

        {/* Provider Card */}
        <div 
          onClick={() => onSelectType('provider')}
          className="group relative bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:border-emerald-200"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">💼</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">I Offer Services</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Join Liberia's premier network of professionals. Grow your business and reach verified clients.</p>
          <div className="inline-flex items-center font-bold text-emerald-600 group-hover:gap-2 transition-all">
            Become a Provider <span className="ml-2">→</span>
          </div>
        </div>

        {/* Airbnb Card */}
        <div 
          onClick={() => onSelectType('airbnb')}
          className="group relative bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:border-rose-200"
        >
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">🏡</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Airbnb & Rentals</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">List your property, manage bookings, and earn extra income. Join our community of verified hosts.</p>
          <div className="inline-flex items-center font-bold text-rose-500 group-hover:gap-2 transition-all">
            Start Hosting <span className="ml-2">→</span>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-gray-100 pt-16">
        <div>
            <div className="text-4xl font-bold text-indigo-600 mb-1">2,500+</div>
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Verified Pros</div>
        </div>
        <div>
            <div className="text-4xl font-bold text-emerald-600 mb-1">15k+</div>
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Happy Clients</div>
        </div>
        <div>
            <div className="text-4xl font-bold text-rose-500 mb-1">500+</div>
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Properties</div>
        </div>
        <div>
            <div className="text-4xl font-bold text-purple-600 mb-1">24h</div>
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Support</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
