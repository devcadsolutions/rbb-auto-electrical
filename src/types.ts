export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'diagnostic' | 'battery' | 'wiring' | 'ecu' | 'aircon' | 'lighting' | 'ecu_sensor' | 'auto-electrical' | 'rewinding' | 'radiator' | 'parts' | 'convenience';
  priceRange: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'diagnostics' | 'battery' | 'wiring' | 'aircon' | 'lighting' | 'ecu';
  imageUrl: string;
  date: string;
  vehicle: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  date: string;
  rating: number;
  content: string;
  avatarSeed: string;
}

export interface ElectricalSymptom {
  id: string;
  symptom: string;
  description: string;
  potentialCauses: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendedServiceId: string;
  difficultyToSelfFix: string;
}
