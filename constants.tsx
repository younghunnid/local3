
import { ServiceCategory, Provider, Property } from './types';

// EDIT THIS LINE: Change 'logo.png' to your actual logo filename (e.g., 'my-logo.jpg')
export const LOGO_URL = 'logo.png';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'electrician', title: 'Electrician', icon: '⚡', description: 'Wiring & Repairs', group: 'home' },
  { id: 'plumber', title: 'Plumber', icon: '🔧', description: 'Pipes & Fixtures', group: 'home' },
  { id: 'handyman', title: 'Handyman', icon: '🔨', description: 'General Repairs', group: 'home' },
  { id: 'cleaner', title: 'Cleaner', icon: '🧹', description: 'Home & Office', group: 'home' },
  { id: 'painter', title: 'Painter', icon: '🎨', description: 'Interior & Exterior', group: 'home' },
  { id: 'carpenter', title: 'Carpenter', icon: '🪚', description: 'Wood & Furniture', group: 'home' },
  { id: 'mason', title: 'Mason', icon: '🧱', description: 'Bricks & Concrete', group: 'home' },
  { id: 'roofer', title: 'Roofer', icon: '🏠', description: 'Roof Repair', group: 'home' },
  { id: 'welder', title: 'Welder', icon: '🔥', description: 'Metal Work', group: 'home' },
  { id: 'hvac', title: 'HVAC Tech', icon: '❄️', description: 'AC & Heating', group: 'home' },
  { id: 'property-mgmt', title: 'Property Manager', icon: '🏢', description: 'Airbnb & Rentals', group: 'professional' },
  { id: 'short-term-support', title: 'Hosting Support', icon: '🔑', description: 'Short-term Rentals', group: 'home' },
  { id: 'computer-repair', title: 'Computer Repair', icon: '💻', description: 'Hardware & Software', group: 'tech' },
  { id: 'software-dev', title: 'Software Dev', icon: '👨‍💻', description: 'Apps & Websites', group: 'tech' },
  { id: 'phone-repair', title: 'Phone Repair', icon: '📱', description: 'Mobile Devices', group: 'tech' },
  { id: 'tv-repair', title: 'TV Repair', icon: '📺', description: 'Electronics', group: 'tech' },
  { id: 'network-setup', title: 'Network Setup', icon: '🌐', description: 'WiFi & Internet', group: 'tech' },
  { id: 'graphics-design', title: 'Graphics Design', icon: '🎨', description: 'Logos & Branding', group: 'creative' },
  { id: 'photography', title: 'Photography', icon: '📸', description: 'Events & Portraits', group: 'creative' },
  { id: 'videography', title: 'Videography', icon: '🎥', description: 'Video Production', group: 'creative' },
  { id: 'music-producer', title: 'Music Producer', icon: '🎵', description: 'Audio & Beats', group: 'creative' },
  { id: 'dj', title: 'DJ Services', icon: '🎧', description: 'Events & Parties', group: 'creative' },
  { id: 'tutor', title: 'Tutor', icon: '📚', description: 'Academic Help', group: 'professional' },
  { id: 'freelance-writer', title: 'Freelance Writer', icon: '✍️', description: 'Content & Articles', group: 'professional' },
  { id: 'translator', title: 'Translator', icon: '🌍', description: 'Language Services', group: 'professional' },
  { id: 'accountant', title: 'Accountant', icon: '💰', description: 'Tax & Bookkeeping', group: 'professional' },
  { id: 'legal-advisor', title: 'Legal Advisor', icon: '⚖️', description: 'Legal Consultation', group: 'professional' },
  { id: 'driver', title: 'Driver', icon: '🚗', description: 'Transportation', group: 'transport' },
  { id: 'delivery', title: 'Delivery', icon: '📦', description: 'Package & Food', group: 'transport' },
  { id: 'moving', title: 'Moving Service', icon: '📦', description: 'Relocation Help', group: 'transport' },
  { id: 'mechanic', title: 'Auto Mechanic', icon: '🔧', description: 'Car Repair', group: 'transport' },
  { id: 'motorcycle-repair', title: 'Motorcycle Repair', icon: '🏍️', description: 'Bike Maintenance', group: 'transport' },
  { id: 'barber', title: 'Barber', icon: '✂️', description: 'Hair Cutting', group: 'personal' },
  { id: 'hairstylist', title: 'Hair Stylist', icon: '💇‍♀️', description: 'Hair & Beauty', group: 'personal' },
  { id: 'makeup-artist', title: 'Makeup Artist', icon: '💄', description: 'Beauty & Events', group: 'personal' },
  { id: 'massage-therapist', title: 'Massage Therapist', icon: '💆', description: 'Wellness & Relaxation', group: 'personal' },
  { id: 'fitness-trainer', title: 'Fitness Trainer', icon: '💪', description: 'Personal Training', group: 'personal' },
  { id: 'chef', title: 'Personal Chef', icon: '👨‍🍳', description: 'Cooking Services', group: 'food' },
  { id: 'catering', title: 'Catering', icon: '🍽️', description: 'Event Food', group: 'food' },
  { id: 'baker', title: 'Baker', icon: '🧁', description: 'Cakes & Pastries', group: 'food' },
  { id: 'security-guard', title: 'Security Guard', icon: '🛡️', description: 'Property Protection', group: 'security' },
  { id: 'locksmith', title: 'Locksmith', icon: '🔐', description: 'Lock & Key Services', group: 'security' },
  { id: 'gardener', title: 'Gardener', icon: '🌱', description: 'Landscaping', group: 'outdoor' },
  { id: 'pest-control', title: 'Pest Control', icon: '🐛', description: 'Extermination', group: 'outdoor' },
  { id: 'event-planner', title: 'Event Planner', icon: '🎉', description: 'Party Organization', group: 'event' },
  { id: 'decorator', title: 'Decorator', icon: '🎈', description: 'Event Decoration', group: 'event' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Luxury Oceanview Villa",
    location: "Monrovia, Robertsfield Hwy",
    pricePerNight: 150,
    rating: 4.9,
    reviews: 42,
    photoId: "1564013799-b1ddec28a941",
    description: "Experience the ultimate beach getaway in our stunning 3-bedroom villa. Featuring panoramic ocean views, private beach access, and a fully equipped modern kitchen.",
    hostName: "Kema Johnson",
    hostPhone: "+231776966080",
    amenities: ["Free WiFi", "Private Pool", "Air Conditioning", "Security 24/7"]
  },
  {
    id: 2,
    title: "Modern City Apartment",
    location: "Sinkor, 12th Street",
    pricePerNight: 85,
    rating: 4.7,
    reviews: 128,
    photoId: "1502672260266-1c1ef2d93688",
    description: "Perfect for business travelers, this sleek apartment is located in the heart of Sinkor. Close to UN offices, restaurants, and shopping centers.",
    hostName: "Musa Kamara",
    hostPhone: "+231776966081",
    amenities: ["High-speed Internet", "Work Space", "Generator Backup", "Laundry"]
  },
  {
    id: 3,
    title: "Peaceful Garden Cottage",
    location: "Paynesville, Rehab",
    pricePerNight: 65,
    rating: 4.8,
    reviews: 15,
    photoId: "1580587771525-78b9ec3bca4b",
    description: "Tucked away in a quiet neighborhood, this cozy cottage is surrounded by lush tropical gardens. A perfect retreat for couples or solo travelers.",
    hostName: "Sarah Doe",
    hostPhone: "+231776966082",
    amenities: ["Tropical Garden", "Breakfast Included", "Kitchenette", "Free Parking"]
  },
  {
    id: 4,
    title: "Executive Penthouse Suite",
    location: "Mamba Point",
    pricePerNight: 210,
    rating: 5.0,
    reviews: 8,
    photoId: "1512917774080-9991f1c4c750",
    description: "The most exclusive stay in Mamba Point. Overlooking the Atlantic Ocean, this penthouse offers world-class luxury and unmatched privacy.",
    hostName: "Ambassador Suites",
    hostPhone: "+231776966083",
    amenities: ["Private Elevator", "Concierge", "Gym Access", "Rooftop Terrace"]
  }
];

const generateMockProviders = (): Provider[] => {
  const providers: Provider[] = [];
  let idCounter = 1;

  const photoBatch = [
    "1507003211-a90c1637-c24c-4608-8d2e-71fbb9226f2c",
    "1438761681-c6cb0372-6b8c-4b42-96dc-4fdfba394b65",
    "1500648767791-00dcc994a43e",
    "1494790108-ea87e2ac-c304-4554-aa09-f8c8093e5610",
    "1472099645-e36c4e4a70f6",
    "1539571696357-5a69c17a67c6",
    "1506794778202-cad84cf45f1d",
    "1544005313-94ddf0286df2"
  ];

  const portfolioSamples = [
    { photoId: "1581092160607-ee22621ddbb3", title: "Smart Home Installation", description: "Complete rewiring and smart control panel integration for a luxury villa." },
    { photoId: "1504148455328-497c1121d494", title: "Modern Lighting Design", description: "Architectural lighting setup for a high-end restaurant in Monrovia." },
    { photoId: "1484154218962-a197022b5858", title: "Kitchen Renovation", description: "Full plumbing and appliance installation for a modern home makeover." }
  ];

  SERVICE_CATEGORIES.forEach(cat => {
    providers.push({
      id: idCounter++,
      name: `Expert ${cat.title} 1`,
      rating: 4.5 + Math.random() * 0.5,
      reviews: 20 + Math.floor(Math.random() * 100),
      distance: (0.5 + Math.random() * 5).toFixed(1) + " miles",
      distanceValue: 0.5 + Math.random() * 4.5,
      priceValue: 30 + Math.floor(Math.random() * 100),
      experience: (3 + Math.floor(Math.random() * 10)) + " years",
      specialties: cat.description.split(" & "),
      availability: "now",
      photoId: photoBatch[idCounter % photoBatch.length],
      phone: "+23177" + Math.floor(1000000 + Math.random() * 9000000),
      bio: `Professional ${cat.title} with extensive experience in ${cat.description}. Highly recommended in the community for high-quality workmanship and reliability.`,
      certifications: ["Verified Professional", "Safe Work Certified"],
      completedJobs: 50 + Math.floor(Math.random() * 500),
      responseTime: "15 mins",
      languages: ["English"],
      category: cat.id,
      portfolio: portfolioSamples
    });
  });

  return providers;
};

export const MOCK_PROVIDERS: Provider[] = generateMockProviders();
