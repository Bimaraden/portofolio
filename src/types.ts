export type PageTab = 'home' | 'work' | 'project-detail' | 'about' | 'contact';

export type Language = 'id' | 'en';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'IoT & Hardware' | 'Full Stack Web' | 'Otomasi n8n' | string;
  year: string;
  client: string;
  role: string;
  deliverables: string[];
  description: string;
  concept: string;
  palette: string[];
  coverImage: string;
  galleryImages: string[];
  featured?: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  timeline: string;
}

export interface Exhibition {
  year: string;
  title: string;
  venue: string;
  location: string;
}
