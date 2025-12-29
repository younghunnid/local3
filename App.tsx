
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, ServiceCategory, Provider, BookingRequest, Property, PropertyBookingRequest, ConfirmationData } from './types';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS, MOCK_PROPERTIES } from './constants';
import { getAiRecommendation } from './services/gemini';

// Sub-components
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryGrid from './components/CategoryGrid';
import ProviderList from './components/ProviderList';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import BookingModal from './components/BookingModal';
import Notification from './components/Notification';
import ChatBot from './components/ChatBot';
import AudioRecorder from './components/AudioRecorder';
import PropertyList from './components/PropertyList';
import PropertyBookingModal from './components/PropertyBookingModal';
import ProviderProfileModal from './components/ProviderProfileModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import EditProviderModal from './components/EditProviderModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [profileProvider, setProfileProvider] = useState<Provider | null>(null);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [points, setPoints] = useState<number>(250);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Admin Shortcut
  useEffect(() => {
    let keys = '';
    const handleKeydown = (e: KeyboardEvent) => {
      keys += e.key;
      if (keys.endsWith('admin123')) {
        setIsAdmin(true);
        setView('admin');
        keys = '';
      }
      if (keys.length > 20) keys = keys.slice(-10);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const showNotify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setView('customer');
  };

  const handleAiSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    const rec = await getAiRecommendation(aiQuery);
    setIsAiLoading(false);

    if (rec) {
      const cat = SERVICE_CATEGORIES.find(c => c.id === rec.categoryId);
      if (cat) {
        handleCategorySelect(cat);
        showNotify(`AI suggests: ${rec.reason}`, 'info');
      } else {
        showNotify("AI couldn't find a matching category, but try browsing our list.", 'info');
      }
    } else {
      showNotify("AI search is unavailable, please try manual browsing.", 'error');
    }
  };

  const handleBooking = (request: BookingRequest) => {
    const provider = providers.find(p => p.id === request.providerId);
    if (!provider) return;

    const messageText = `🔥 NEW BOOKING REQUEST - LSERS SERVICE HUB\n\n` +
      `📅 Date: ${request.date}\n` +
      `⏰ Time: ${request.time}\n` +
      `👤 Client: ${request.customerName}\n` +
      `📞 Phone: ${request.customerPhone}\n` +
      `📝 Task: ${request.description}`;

    const waLink = `https://wa.me/${provider.phone.replace(/\D/g, '')}?text=${encodeURIComponent(messageText)}`;
    
    setConfirmationData({
      title: "Booking Request Ready!",
      subtitle: `You're about to book ${provider.name}`,
      details: [
        { label: "Service", value: selectedCategory?.title || "Professional Service" },
        { label: "Professional", value: provider.name },
        { label: "Date", value: request.date },
        { label: "Time Slot", value: request.time }
      ],
      whatsappLink: waLink,
      pointsEarned: 25
    });

    setBookingProvider(null);
    setProfileProvider(null);
  };

  const handlePropertyBooking = (request: PropertyBookingRequest) => {
    const property = properties.find(p => p.id === request.propertyId);
    if (!property) return;

    const checkInDate = new Date(request.checkIn);
    const checkOutDate = new Date(request.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)));
    const total = property.pricePerNight * nights;

    const messageText = `🏡 NEW PROPERTY RENTAL REQUEST - LSERS AIRBNB\n\n` +
      `📍 Property: ${property.title}\n` +
      `📅 Arrival: ${request.checkIn}\n` +
      `📅 Departure: ${request.checkOut}\n` +
      `👥 Guests: ${request.guests}\n` +
      `👤 Guest: ${request.customerName}\n` +
      `📞 Phone: ${request.customerPhone}\n` +
      `💰 Est. Total: $${total}`;

    const waLink = `https://wa.me/${property.hostPhone.replace(/\D/g, '')}?text=${encodeURIComponent(messageText)}`;

    setConfirmationData({
      title: "Rental Request Ready!",
      subtitle: `Checking availability for ${property.title}`,
      details: [
        { label: "Accommodation", value: property.title },
        { label: "Host", value: property.hostName },
        { label: "Stay Duration", value: `${nights} ${nights === 1 ? 'night' : 'nights'}` },
        { label: "Total Estimate", value: `$${total}` }
      ],
      whatsappLink: waLink,
      pointsEarned: 50
    });

    setBookingProperty(null);
  };

  const finalizeBooking = () => {
    if (!confirmationData) return;
    window.open(confirmationData.whatsappLink, '_blank');
    setPoints(prev => prev + confirmationData.pointsEarned);
    showNotify("Redirecting to WhatsApp...", "success");
    setConfirmationData(null);
  };

  const handleUpdateProvider = (updatedProvider: Provider) => {
    setProviders(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
    setEditingProvider(null);
    showNotify(`Information updated for ${updatedProvider.name}`, 'success');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        points={points} 
        onNavigate={(v) => {
          setView(v);
          setSelectedCategory(null);
        }} 
        currentView={view}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {notification && <Notification message={notification.message} type={notification.type} />}

        {view === 'welcome' && (
          <WelcomeScreen onSelectType={(type) => setView(type)} />
        )}

        {view === 'customer' && (
          <div className="animate-fade-in">
            {!selectedCategory ? (
              <>
                <section className="mb-12 text-center max-w-2xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Local & Online Services</h1>
                  <p className="text-lg text-gray-600 mb-8">Connect with skilled professionals through trust, skill, and opportunity.</p>
                  
                  <form onSubmit={handleAiSearch} className="flex flex-col gap-2 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 mb-4 sm:flex-row">
                    <div className="flex-grow flex items-center">
                      <input 
                        type="text" 
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder="Describe what you need help with..."
                        className="flex-grow px-4 py-3 rounded-xl focus:outline-none text-gray-900"
                      />
                      <AudioRecorder 
                        onTranscription={(text) => {
                          setAiQuery(text);
                          showNotify("Voice recognized: " + text, "info");
                        }} 
                        className="mx-2"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isAiLoading}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      {isAiLoading ? 'AI Thinking...' : 'AI Search'}
                    </button>
                  </form>
                  <p className="text-sm text-gray-500 italic">Try: "I need someone to fix my wiring" or "I need a logo for my business"</p>
                </section>
                
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600">🛠️</span>
                    Popular Service Categories
                  </h2>
                  <CategoryGrid onSelect={handleCategorySelect} />
                </div>

                <div className="mb-16">
                  <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <span className="bg-rose-100 p-2 rounded-lg text-rose-500">🏡</span>
                      Featured Stays
                    </h2>
                    <button 
                      onClick={() => setView('airbnb')}
                      className="text-rose-500 font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Explore All Rentals <span>→</span>
                    </button>
                  </div>
                  <PropertyList 
                    properties={properties.slice(0, 2)} 
                    onBook={(p) => setBookingProperty(p)} 
                  />
                </div>
              </>
            ) : (
              <div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="mb-6 flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  ← Back to all services
                </button>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{selectedCategory.title}s</h1>
                  <p className="text-gray-600">Available verified professionals in your area.</p>
                </div>
                <ProviderList 
                  category={selectedCategory.id} 
                  providers={providers} 
                  onBook={(p) => setBookingProvider(p)}
                  onViewProfile={(p) => setProfileProvider(p)}
                />
              </div>
            )}
          </div>
        )}

        {view === 'provider' && (
          <RegistrationForm 
            onSuccess={() => {
              showNotify("Application received! We will contact you soon.", "success");
              setView('welcome');
            }} 
            onBack={() => setView('welcome')}
          />
        )}

        {view === 'airbnb' && (
          <div className="animate-fade-in max-w-6xl mx-auto py-8">
             <div className="text-center mb-16">
              <span className="text-6xl">🏡</span>
              <h1 className="text-5xl font-black text-gray-900 mt-6 mb-4">Find Your Perfect <span className="text-rose-500">Stay</span></h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore verified properties in Liberia. From oceanview villas to cozy city apartments.</p>
              <div className="mt-8 flex justify-center gap-4">
                 <button 
                  onClick={() => showNotify("Property Hosting system coming soon!", "info")}
                  className="bg-white text-rose-500 border-2 border-rose-500 px-6 py-3 rounded-2xl font-bold hover:bg-rose-50 transition-all"
                 >
                   Become a Host
                 </button>
                 <button 
                  onClick={() => setView('welcome')}
                  className="bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                 >
                   Back to Home
                 </button>
              </div>
            </div>

            <PropertyList 
              properties={properties} 
              onBook={(p) => setBookingProperty(p)} 
            />
          </div>
        )}

        {view === 'admin' && isAdmin && (
          <AdminPanel 
            providers={providers} 
            onDelete={(id) => {
              setProviders(prev => prev.filter(p => p.id !== id));
              showNotify("Provider removed", "info");
            }}
            onEdit={(p) => setEditingProvider(p)}
            onClose={() => setView('welcome')}
          />
        )}
      </main>

      {bookingProvider && (
        <BookingModal 
          provider={bookingProvider} 
          onClose={() => setBookingProvider(null)} 
          onSubmit={handleBooking}
        />
      )}

      {profileProvider && (
        <ProviderProfileModal 
          provider={profileProvider} 
          onClose={() => setProfileProvider(null)} 
          onBook={(p) => {
            setProfileProvider(null);
            setBookingProvider(p);
          }}
        />
      )}

      {editingProvider && (
        <EditProviderModal 
          provider={editingProvider}
          onClose={() => setEditingProvider(null)}
          onSave={handleUpdateProvider}
        />
      )}

      {bookingProperty && (
        <PropertyBookingModal 
          property={bookingProperty} 
          onClose={() => setBookingProperty(null)} 
          onSubmit={handlePropertyBooking}
        />
      )}

      {confirmationData && (
        <BookingConfirmationModal 
          data={confirmationData}
          onConfirm={finalizeBooking}
          onCancel={() => setConfirmationData(null)}
        />
      )}

      <ChatBot />
      <Footer />
    </div>
  );
};

export default App;
