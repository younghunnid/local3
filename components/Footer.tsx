
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">L</div>
              <span className="text-2xl font-bold tracking-tight">LSERS <span className="text-indigo-400">PRO</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Making professional services accessible through skill, trust, and community opportunity. Based in Monrovia, serving globally.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">TW</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Service List</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Points & Rewards</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Provider Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Safety Guide</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2024 LSERS Professional Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made with ❤️ in Liberia</span>
            <span>Operating Globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
