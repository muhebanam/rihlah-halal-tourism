export const HALAL_CATEGORIES = [
  "Umrah & Ziyarat",
  "Islamic Heritage",
  "Halal Beach Resort",
  "Nature & Mountain",
  "Family Halal",
] as const;

export type HalalCategory = (typeof HALAL_CATEGORIES)[number];

export interface IDestination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  halalDining: string;
  prayerFacilities: string;
  imageUrl: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DestinationFormPayload {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  halalDining: string;
  prayerFacilities: string;
  imageUrl: string;
  description: string;
}

