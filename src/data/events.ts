export interface EventLocation {
  venue: string;
  address: string;
}

export interface EventPricing {
  label: string;
  price: string;
}

export type EventType = 'stage' | 'soiree' | 'autre';

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  stage: 'STAGE',
  soiree: 'SOIREE',
  autre: 'AUTRE',
};

export interface Event {
  id: string;
  type: EventType;
  title: string;
  date: string;
  displayDate: string;
  time?: string;
  location: EventLocation;
  description: string[];
  pricing: EventPricing[];
  promotion?: string;
  contact: string;
  phoneNumber?: string;
  paymentUrl?: string;
  extraInfo?: string;
  image: string;
  isFeatured: boolean;
}
