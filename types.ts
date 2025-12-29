
export type Availability = 'now' | 'today' | 'tomorrow';

export interface PortfolioItem {
  photoId: string;
  title: string;
  description: string;
}

export interface Provider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  distanceValue: number;
  priceValue: number;
  experience: string;
  specialties: string[];
  availability: Availability;
  photoId: string;
  phone: string;
  whatsapp?: string;
  bio: string;
  certifications: string[];
  completedJobs: number;
  responseTime: string;
  languages: string[];
  category: string;
  portfolio?: PortfolioItem[];
}

export interface Property {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  photoId: string;
  description: string;
  hostName: string;
  hostPhone: string;
  amenities: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  group: 'home' | 'tech' | 'creative' | 'professional' | 'transport' | 'personal' | 'food' | 'security' | 'outdoor' | 'event';
}

export interface BookingRequest {
  providerId: number;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  description: string;
}

export interface PropertyBookingRequest {
  propertyId: number;
  customerName: string;
  customerPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface ConfirmationData {
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  whatsappLink: string;
  pointsEarned: number;
}

export type ViewState = 'welcome' | 'customer' | 'provider' | 'admin' | 'airbnb';
