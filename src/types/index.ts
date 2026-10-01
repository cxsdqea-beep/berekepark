export type Language = 'ru' | 'kz' | 'en';

export interface ApartmentLayout {
  id: string;
  rooms: 2 | 3 | 4;
  title: string;
  subtitle: string;
  totalArea: number; // in sq.m
  livingArea: number;
  kitchenArea: number;
  ceilingHeight: number; // 3.3m
  neighborsOnFloor: number; // 1
  floorOptions: string;
  image: string;
  fallbackImage: string;
  description: string;
  highlights: string[];
  roomDetails: {
    name: string;
    area: number;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'lake' | 'architecture' | 'interior' | 'eco' | 'construction';
  categoryLabel: string;
  image: string;
  fallbackImage: string;
  description: string;
  statusBadge?: string;
  date?: string;
}

export interface ConstructionReportItem {
  id: string;
  title: string;
  stage: string;
  progressPercent: number;
  date: string;
  description: string;
  image: string;
  badge: string;
}

export interface PhilosophyQuoteItem {
  id: string;
  quote: string;
  highlightText?: string;
  subtext: string;
  tag: string;
  image: string;
}

export interface InfrastructureItem {
  id: string;
  title: string;
  category: 'education' | 'shopping' | 'sports' | 'nature' | 'transport';
  distanceTime: string; // e.g., "3 мин"
  distanceKm: string; // e.g., "1.2 км"
  walkTime?: string;
  routeTip?: string;
  lat?: number;
  lng?: number;
  image?: string;
  iconName: string;
  description: string;
  badge?: string;
  custom2GisUrl?: string;
  customYandexUrl?: string;
}

export interface StatItem {
  value: string;
  unit?: string;
  label: string;
  sublabel: string;
  iconName: string;
}
