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
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.9801972920027!2d2.391234677066497!3d48.763174471319275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67465612ca3e3%3A0x33dc4342d58d9ae9!2sCentre%20de%20loisirs%20Jules%20Ferry!5e0!3m2!1sen!2sfr!4v1783286764106!5m2!1sen!2sfr',
    schedule: [
      { day: 'Mardi', time: '19h - 20h', name: 'Bachata', teacher: 'Luis', level: 'Intermediaire' },
      { day: 'Mardi', time: '20h - 21h', name: 'Salsa Cubaine', teacher: 'Luis', level: 'Intermediaire' },
      { day: 'Jeudi', time: '19h - 20h', name: 'Bachata', teacher: 'Luis', level: 'Debutant' },
      { day: 'Jeudi', time: '20h - 21h', name: 'Salsa Cubaine', teacher: 'Luis', level: 'Debutant' },
      { day: 'Jeudi', time: '18h - 19h', name: 'Latino Kids', teacher: 'Jessica', level: 'Enfants (6-12 ans)' },
      { day: 'Jeudi', time: '18h30 - 19h30', name: 'Danse orientale', teacher: 'Marianne', level: 'Debutant' },
      { day: 'Jeudi', time: '19h30 - 20h30', name: 'Belly Modern', teacher: 'Marianne', level: 'Tous niveaux' },
      { day: 'Jeudi', time: '20h30 - 21h30', name: 'Danse orientale', teacher: 'Marianne', level: 'Intermediaire' },
    ],
    pricing: [
      { frequency: '1 cours / semaine', solo: 195, minor: 170, family: 351 },
      { frequency: '2 cours / semaine', solo: 205, minor: 265, family: 549 },
      { frequency: '3 cours / semaine', solo: 400, minor: 345, family: 720 },
      { frequency: '4 cours / semaine', solo: 450, minor: 390, family: 810 },
    ],
    registrationLink: 'https://forms.gle/cMj5sfrjku1KqWXw9',
    paymentLink: 'https://www.helloasso.com/associations/jamm-dance/adhesions/26-27-jamm-dance-adhesion-association',
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
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.1591971093562!2d2.54073767706369!3d48.7024380713115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e609f0156bbf31%3A0xe7e22e9105845801!2s4%20Rue%20du%20G%C3%A9n%C3%A9ral%20Leclerc%2C%2094520%20Mandres-les-Roses!5e0!3m2!1sen!2sfr!4v1783286521227!5m2!1sen!2sfr',
    schedule: [
      { day: 'Mardi', time: '18h30 - 19h30', name: "Latino Kid's", teacher: 'Jessica', level: 'Enfants' },
      { day: 'Mardi', time: '19h30 - 20h30', name: "ZUMBA", teacher: 'Jessica', level: 'Tous niveaux' },
      { day: 'Mardi', time: '20h30 - 21h30', name: "Latin'Ladies", teacher: 'Jessica', level: 'Tous niveaux' },
    ],
    pricing: [
      { frequency: '1 cours / semaine', solo: 195, minor: 170, family: 351 },
      { frequency: '2 cours / semaine', solo: 305, minor: 265, family: 549 },
    ],
    registrationLink: 'https://forms.gle/cMj5sfrjku1KqWXw9',
    paymentLink: 'https://www.helloasso.com/associations/jamm-dance/adhesions/26-27-jamm-dance-adhesion-association',
  },
];
