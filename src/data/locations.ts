export interface ScheduleItem {
  day: string;
  time: string;
  name: string;
  teacher: string;
  level: string;
}

export interface PricingRow {
  frequency: string;
  solo: number;
  minor: number;
  family: number;
}

export interface Location {
  id: string;
  name: string;
  shortLabel: string;
  venue: string;
  address: string;
  annualMembershipFee: string;
  trialClass: string;
  specialClasses?: string;
  mapsEmbedUrl: string;
  schedule: ScheduleItem[];
  pricing: PricingRow[];
  registrationLink: string;
  paymentLink: string;
}

export const locations: Location[] = [
  {
    id: 'thiais',
    name: 'Thiais',
    shortLabel: 'Thiais',
    venue: 'Centre de loisirs Jules Ferry',
    address: '66, rue Paul Vaillant Couturier - 94320 Thiais',
    annualMembershipFee: '20 EUR / an',
    trialClass: "Cours d'essai gratuit !",
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.5!2d2.3724!3d48.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQzJzA2LjAiTiAywrAyMicxMi42IkU!5e0!3m2!1sfr!2sfr!4v1',
    schedule: [
      { day: 'Mardi', time: '19h - 20h', name: 'Bachata', teacher: 'Luis', level: 'Intermediaire' },
      { day: 'Mardi', time: '20h - 21h', name: 'Salsa Cubaine', teacher: 'Luis', level: 'Intermediaire' },
      { day: 'Jeudi', time: '19h - 20h', name: 'Bachata', teacher: 'Luis', level: 'Debutant' },
      { day: 'Jeudi', time: '20h - 21h', name: 'Salsa Cubaine', teacher: 'Luis', level: 'Debutant' },
      { day: 'Jeudi', time: '18h30 - 19h30', name: 'Danse orientale', teacher: 'Marianne', level: 'Debutant' },
      { day: 'Jeudi', time: '19h30 - 20h30', name: 'Belly Modern', teacher: 'Marianne', level: 'Tous niveaux' },
      { day: 'Jeudi', time: '20h30 - 21h30', name: 'Danse orientale', teacher: 'Marianne', level: 'Intermediaire' },
    ],
    pricing: [
      { frequency: '1 cours / semaine', solo: 190, minor: 165, family: 345 },
      { frequency: '2 cours / semaine', solo: 295, minor: 255, family: 535 },
      { frequency: '3 cours / semaine', solo: 390, minor: 335, family: 700 },
      { frequency: '4 cours / semaine', solo: 440, minor: 375, family: 795 },
    ],
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeqfPTOoLRV5u219QiQuwMVSPQCmosPZ1HKZPgNwXRwCL4BoQ/viewform',
    paymentLink: 'https://www.helloasso.com/associations/jamm-dance/adhesions/adhesion-association-jamm-dance-2025-2026',
  },
  {
    id: 'mandres',
    name: 'Mandres-les-Roses',
    shortLabel: 'Mandres-les-Roses',
    venue: 'Salle Galopier - Ferme de Monsieur',
    address: '4 Rue du General Leclerc, 94520 Mandres-les-Roses',
    annualMembershipFee: '20 EUR / an',
    trialClass: "Cours d'essai gratuit !",
    specialClasses: 'Sur demande (Flashmob, ouverture de bal, EVJF, EVG, ...)',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.5!2d2.3473!3d48.7549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ1JzE3LjYiTiAywrAyMCc1MC4zIkU!5e0!3m2!1sfr!2sfr!4v1',
    schedule: [
      { day: 'Mardi', time: '18h15 - 19h', name: "Latino Kid's", teacher: 'Jessica', level: 'Enfants' },
      { day: 'Mardi', time: '19h15 - 20h', name: "Latin' Ladies", teacher: 'Jessica', level: 'Tous niveaux' },
      { day: 'Mardi', time: '20h - 20h45', name: 'Salsa Cubaine', teacher: 'Jessica', level: 'Tous niveaux' },
    ],
    pricing: [
      { frequency: '1 cours / semaine', solo: 150, minor: 130, family: 270 },
      { frequency: '2 cours / semaine', solo: 240, minor: 205, family: 435 },
    ],
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSedZJRxSf9OP4Td_DgNNkj5OsDaR8F8i0AQnA8gS7OlKKf6rg/viewform',
    paymentLink: 'https://www.helloasso.com/associations/jamm-dance/adhesions/adhesion-jamm-dance-mandres-les-roses-2025-2026',
  },
];
