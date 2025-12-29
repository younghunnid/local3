
import React, { useState } from 'react';
import { Provider, PortfolioItem } from '../types';

interface ProviderProfileModalProps {
  provider: Provider;
  onClose: () => void;
  onBook: (p: Provider) => void;
}

const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({ provider, onClose, onBook }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showChatChoice, setShowChatChoice] = useState(false);

  const handleWhatsAppContact = () => {
    const phoneNumber = (provider.whatsapp || provider.phone).replace(/\D/g, '');
    const message = encodeURIComponent(`Hi ${provider.name}, I found your profile on LSERS Professional Services and I'm interested in your services. Are you available?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setShowChatChoice(false);
  };

  const handleAppChat = () => {
    window.dispatchEvent(new CustomEvent('open-lsers-chat'));
    setShowChatChoice(false);
    onClose(); // Close the profile to allow full interaction with the chat bot
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-5xl h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in flex flex-col">
        {/* Header / Hero Section */}
        <div className="relative h-72 flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800" />
          
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 z-20 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Decorative Background Image Snippet */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
             <img 
              src={`https://images.unsplash.com/photo-${provider.portfolio?.[0]?.photoId || '1581092160607-ee22621ddbb3'}?w=1200&h=400&fit=crop`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          
          <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white to-transparent z-0" />

          <div className="absolute bottom-0 left-12 flex items-end gap-8 z-10 translate-y-4">
            <div className="relative">
              <img 
                src={`https://images.unsplash.com/photo-${provider.photoId}?w=300&h=300&fit=crop&crop=face`}
                className="w-44 h-44 rounded-[3rem] border-8 border-white shadow-2xl object-cover"
                alt={provider.name}
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg border-4 border-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="mb-10 pb-2">
              <h2 className="text-5xl font-black text-white drop-shadow-xl tracking-tight">{provider.name}</h2>
              <div className="flex items-center gap-4 mt-3">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  {provider.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1.5 rounded-full text-sm font-black shadow-lg">
                  <span>★</span> {provider.rating.toFixed(1)} <span className="opacity-60 text-xs">({provider.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-grow overflow-y-auto p-12 pt-20 scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Bio Section */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px flex-grow bg-gray-100"></span>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">The Professional</h3>
                  <span className="h-px flex-grow bg-gray-100"></span>
                </div>
                <p className="text-gray-600 leading-relaxed text-xl font-medium italic">"{provider.bio}"</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                  <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50 text-center">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Experience</p>
                    <p className="text-xl font-black text-indigo-900">{provider.experience}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 text-center">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Jobs Done</p>
                    <p className="text-xl font-black text-emerald-900">{provider.completedJobs}</p>
                  </div>
                  <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100/50 text-center">
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Response</p>
                    <p className="text-xl font-black text-purple-900">{provider.responseTime}</p>
                  </div>
                  <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100/50 text-center">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Rate</p>
                    <p className="text-xl font-black text-rose-900">${provider.priceValue}/hr</p>
                  </div>
                </div>
              </section>

              {/* Portfolio Section */}
              {provider.portfolio && provider.portfolio.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="h-px flex-grow bg-gray-100"></span>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Showcase Portfolio</h3>
                    <span className="h-px flex-grow bg-gray-100"></span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {provider.portfolio.map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedItem(item)}
                        className="group relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3] cursor-zoom-in transition-all duration-500 hover:-translate-y-2 hover:shadow-indigo-200/50"
                      >
                        <img 
                          src={`https://images.unsplash.com/photo-${item.photoId}?w=800&h=600&fit=crop`}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] w-fit font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-white/20">
                            Project Highlight
                          </span>
                          <h4 className="text-white font-black text-2xl mb-1">{item.title}</h4>
                          <p className="text-white/70 text-sm line-clamp-2 font-medium">{item.description}</p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <div className="bg-white/30 backdrop-blur-md p-3 rounded-2xl text-white border border-white/20">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-0 space-y-8">
                
                {/* Contact/Booking Card */}
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 space-y-6 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-600/5 rounded-full transition-transform group-hover:scale-150" />
                  
                  <h4 className="text-xl font-black text-gray-900">Direct Contact</h4>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => onBook(provider)}
                      className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      Book Session
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>

                    <button 
                      onClick={handleWhatsAppContact}
                      className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Contact Provider
                    </button>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setShowChatChoice(true)}
                        className="w-full py-4 bg-gray-100 text-gray-700 rounded-[1.5rem] font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        Quick Chat Options
                      </button>

                      {/* Chat Choice Overlay */}
                      {showChatChoice && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[2rem] z-30 flex flex-col p-4 animate-fade-in border-2 border-emerald-100 shadow-xl">
                          <button 
                            onClick={() => setShowChatChoice(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                          <div className="flex-grow flex flex-col justify-center gap-3">
                            <button 
                              onClick={handleAppChat}
                              className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all"
                            >
                              Chat on LSERS App
                            </button>
                            <button 
                              onClick={handleWhatsAppContact}
                              className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all"
                            >
                              Continue to WhatsApp
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Service Fee</p>
                      <p className="text-emerald-500 font-black text-sm">$0.00</p>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">Free booking through LSERS PRO network.</p>
                  </div>
                </div>

                {/* Specialties / Skills */}
                <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Expertise & Skills</h4>
                  <div className="flex flex-wrap gap-3">
                    {provider.specialties.map(spec => (
                      <span key={spec} className="bg-white px-4 py-2 rounded-2xl text-sm font-bold text-gray-700 border border-gray-200 shadow-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badges & Trust */}
                <div className="bg-indigo-900 p-8 rounded-[3rem] text-white space-y-6">
                  <h4 className="text-xs font-black text-indigo-300 uppercase tracking-[0.2em]">Verified Status</h4>
                  <div className="space-y-4">
                    {provider.certifications.map(cert => (
                      <div key={cert} className="flex items-start gap-3">
                        <div className="bg-emerald-500 p-1 rounded-lg mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm font-bold text-indigo-50 leading-tight">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox / Portfolio Expanded View */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 sm:p-20">
          <div className="absolute inset-0 bg-indigo-950/95 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedItem(null)} />
          <div className="relative w-full max-w-6xl h-full flex flex-col md:flex-row bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-fade-in scale-95 hover:scale-100 transition-transform duration-500">
            
            <button 
              onClick={() => setSelectedItem(null)} 
              className="absolute top-8 right-8 z-30 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-2/3 h-2/3 md:h-full overflow-hidden bg-gray-100">
              <img 
                src={`https://images.unsplash.com/photo-${selectedItem.photoId}?w=1200&h=1200&fit=crop`}
                className="w-full h-full object-cover"
                alt={selectedItem.title}
              />
            </div>
            
            <div className="w-full md:w-1/3 p-12 md:p-16 flex flex-col justify-center space-y-8">
              <div>
                <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                  Project Case Study
                </span>
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">{selectedItem.title}</h2>
                <div className="w-12 h-1.5 bg-indigo-600 rounded-full mb-8" />
                <p className="text-gray-600 text-lg leading-relaxed">{selectedItem.description}</p>
              </div>
              
              <div className="pt-8 border-t border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Interested in similar work?</p>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    onBook(provider);
                  }}
                  className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black hover:bg-black transition-all shadow-lg shadow-gray-200"
                >
                  Book Professional
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfileModal;
