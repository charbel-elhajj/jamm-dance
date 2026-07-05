# Architecture & Data Model: JAMM Dance Events

This document defines the component design and the JSON data schema for the "Events" (Événements) section of the JAMM Dance website. The structure is designed to be easily migrated to a headless CMS in the future while using local JSON files for now.

## 1. Component Design (UI/UX)

The event feed should use a **Card-based Layout** to highlight the provided flyers and ensure high conversion.

### Visual Structure of an Event Card:
*   **Media Box (Left on Desktop, Top on Mobile):** 
    *   Displays the official flyer image (`object-fit: cover` or `contain` depending on aspect ratio, with a blurred background).
    *   A floating badge in the corner indicating the event type (e.g., `⭐ STAGE` or `🎉 SOIRÉE`).
*   **Content Box (Right on Desktop, Bottom on Mobile):**
    *   **Date Block:** Clearly formatted (e.g., "Samedi 6 Juin 2026").
    *   **Title:** Large, bold typography using brand colors.
    *   **Location:** Pin icon + venue name and address.
    *   **Description/Program:** Bullet points or short text outlining the activities (e.g., specific dances, demos).
    *   **Pricing & Promos:** Clear price tags. Highlight special discounts (like the 10% promo code) in an accent color (Orange).
    *   **Call to Action (CTA):** A primary button for registration, or a prominent contact number block if registration is by phone.

## 2. JSON Schema Definition (`src/data/events.json`)

This schema anticipates a future CMS integration.

```typescript
type Event = {
  id: string;
  type: 'stage' | 'soiree' | 'autre';
  title: string;
  date: string;       // e.g., "2026-06-28"
  displayDate: string;// e.g., "Dimanche 28 juin 2026"
  time?: string;      // e.g., "19h30"
  location: {
    venue: string;
    address: string;
  };
  description: string[];
  pricing: {
    label: string;
    price: string | number;
  }[];
  promotion?: string; // e.g., Discount codes
  contact: string;
  extraInfo?: string; // e.g., "Apporter un plat"
  image: string;      // Path to the flyer asset
  isFeatured: boolean;
}
```

## 3. Extracted Event Data
Here is the exact data extracted from the two provided flyers, formatted according to the schema above.

```json
[
  {
    "id": "soiree-vacances-2026",
    "type": "soiree",
    "title": "Soirée Vacances JAMM Dance",
    "date": "2026-06-06",
    "displayDate": "Samedi 6 juin 2026",
    "time": "19h30 (Démo des élèves à 20h00)",
    "location": {
      "venue": "Salle",
      "address": "111 rue du Pavé de Grignon, 94320 THIAIS"
    },
    "description": [
      "Salsa, Bachata, Rock, Madison, Années 80...",
      "Soirée toutes danses !!!"
    ],
    "pricing": [
      { "label": "Adhérents", "price": "6 €" },
      { "label": "Autres", "price": "8 €" }
    ],
    "contact": "Inscription par téléphone : 07 49 82 88 01",
    "extraInfo": "Un petit plat salé ou sucré sera le bienvenu !",
    "image": "/assets/events/soiree-vacance.jpg",
    "isFeatured": true
  },
  {
    "id": "stage-yann-juin-2026",
    "type": "stage",
    "title": "2 Stages de Danse avec Yann",
    "date": "2026-06-28",
    "displayDate": "Dimanche 28 juin 2026",
    "location": {
      "venue": "Salle Saussaie (face à la piscine)",
      "address": "52-54 rue de la Saussaie, 94320 THIAIS"
    },
    "description": [
      "PASO DOBLE - Tous niveaux (sur la musique de 'Pirate des Caraïbes')",
      "CHARLESTON - Tous niveaux (sur la musique 'Etre un homme comme vous' de Ben l'Oncle Soul)"
    ],
    "pricing": [
      { "label": "1 cours", "price": "30 €" },
      { "label": "2 cours", "price": "50 €" }
    ],
    "promotion": "Réduction 10 % pour toute inscription avant le 17 mai 26 avec le code JAMMYA10",
    "contact": "Renseignements : 07 49 82 88 01",
    "extraInfo": "Chèques ANCV acceptés",
    "image": "/assets/events/stage-yann.jpg",
    "isFeatured": false
  }
]
```