
import React, { useState } from 'react';
import { Property, PropertyBookingRequest } from '../types';

interface PropertyBookingModalProps {
  property: Property;
  onClose: () => void;
  onSubmit: (request: PropertyBookingRequest) => void;
}

const PropertyBookingModal: React.FC<PropertyBookingModalProps> = ({ property, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, propertyId: property.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-rose-500 p-8 text-white">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl">✕</button>
          <div className="flex items-center gap-6">
             <img 
              src={`https://images.unsplash.com/photo-${property.photoId}?w=200&h=200&fit=crop`}
              className="w-20 h-20 rounded-3xl border-2 border-white/30 object-cover"
              alt={property.title}
            />
            <div>
              <h2 className="text-2xl font-black">{property.title}</h2>
              <p className="text-rose-100 font-medium">Hosted by {property.hostName}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 font-medium"
                placeholder="Your name"
                value={form.customerName}
                onChange={e => setForm({...form, customerName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
              <input 
                required
                type="tel" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 font-medium"
                placeholder="+231..."
                value={form.customerPhone}
                onChange={e => setForm({...form, customerPhone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Check-In Date</label>
              <input 
                required
                type="date" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 font-bold"
                value={form.checkIn}
                onChange={e => setForm({...form, checkIn: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Check-Out Date</label>
              <input 
                required
                type="date" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 font-bold"
                value={form.checkOut}
                onChange={e => setForm({...form, checkOut: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Number of Guests</label>
            <select 
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 font-bold"
              value={form.guests}
              onChange={e => setForm({...form, guests: parseInt(e.target.value)})}
            >
              {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>)}
            </select>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black text-xl hover:bg-rose-600 transition-all shadow-xl shadow-rose-100"
            >
              Request Booking via WhatsApp
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 font-bold uppercase tracking-tighter">
              Total estimated: <span className="text-gray-900">${property.pricePerNight * (form.checkIn && form.checkOut ? Math.max(1, (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 3600 * 24)) : 1)}</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyBookingModal;
