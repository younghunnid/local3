
import React, { useState } from 'react';
import { ViewState } from '../types';
import { LOGO_URL } from '../constants';

interface HeaderProps {
  points: number;
  onNavigate: (v: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ points, onNavigate, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => onNavigate('welcome')}
        >
          <img 
            src={LOGO_URL} 
            alt="LSERS Logo" 
            className="w-14 h-14 object-contain"
            onError={(e) => {
              // Fallback if image is not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="w-10 h-10 bg-indigo-600 rounded-xl hidden items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200">L</div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">LSERS <span className="text-indigo-600">PRO</span></span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => onNavigate('customer')}
            className={`font-medium transition-colors ${currentView === 'customer' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            Find Services
          </button>
          <button 
            onClick={() => onNavigate('provider')}
            className={`font-medium transition-colors ${currentView === 'provider' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            Become a Provider
          </button>
          <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
            <span className="text-lg">🎁</span>
            <span className="font-bold text-indigo-700">{points} <span className="text-xs uppercase font-medium">pts</span></span>
          </div>
        </nav>

        <button 
          className="md:hidden p-2 text-gray-600" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 animate-fade-in">
          <button 
            onClick={() => { onNavigate('customer'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-gray-700"
          >
            Find Services
          </button>
          <button 
            onClick={() => { onNavigate('provider'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-gray-700"
          >
            Become a Provider
          </button>
          <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full w-fit">
            <span className="text-lg">🎁</span>
            <span className="font-bold text-indigo-700">{points} pts</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
