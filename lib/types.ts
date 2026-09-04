// Shared, plain TypeScript types used across the Next.js app (server + client).

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  longDescription?: string | null;
  icon: string | null;
  tone?: string | null;
  features?: string[];
  deliverables?: string[];
  active?: boolean;
  sortOrder?: number;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string | null;
  description: string;
  image: string | null;
  link: string | null;
  active?: boolean;
  sortOrder?: number;
};

export type AmsFeature = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  tone: string | null;
  sortOrder?: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  image: string | null;
  tone: string | null;
  message: string;
  quote: string | null;
  extendedMessage?: string | null;
  vision?: string | null;
  leadership?: string | null;
  closing?: string | null;
  active?: boolean;
  sortOrder?: number;
};

export type TestimonialItem = {
  id: string;
  client: string;
  role: string | null;
  quote: string;
  rating: number;
  active?: boolean;
};

export type EnquiryInput = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
};

export type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };
