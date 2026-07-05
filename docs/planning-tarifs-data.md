# Data Structure: JAMM Dance 2025-2026 (Schedules & Pricing)

This file contains the exact, verified data extracted from the official 2025-2026 flyers for both locations. Use this data to populate the React components and JSON feeds for the `/inscriptions` page.

## 1. Location: Mandres-les-Roses

**General Information:**
* **Venue:** Salle Galopier – Ferme de Monsieur
* **Address:** 4 Rue du Général Leclerc, 94520 Mandres-les-Roses
* **Mandatory Membership Fee (Adhésion):** 20 € per person
* **Trial Class:** Free (Cours d'essai gratuit !)
* **Accepted Vouchers:** ANCV (Chèque Vacances, Coupon Sport)
* **Special Classes:** Private classes on demand (Flashmob, ouverture de bal, EVJF, EVG, ...)

**Schedule (Planning):**
| Day | Time | Class | Teacher |
| :--- | :--- | :--- | :--- |
| Mardi | 18h15 – 19h | Latino Kid's | Jessica |
| Mardi | 19h15 – 20h | Latin' Ladies | Jessica |
| Mardi | 20h – 20h45 | Salsa Cubaine | Jessica |

**Annual Pricing (Tarifs Annuels):**
| Frequency | 1 personne | 1 personne (- 15 ans) | 2 personnes (même famille) |
| :--- | :--- | :--- | :--- |
| 1 cours / semaine | 150 € | 130 € | 270 € |
| 2 cours / semaine | 240 € | 205 € | 435 € |

---

## 2. Location: Thiais

**General Information:**
* **Venue:** Centre de loisirs Jules Ferry
* **Address:** 66, rue Paul Vaillant Couturier - 94320 Thiais
* **Mandatory Membership Fee (Adhésion):** 20 € per person
* **Trial Class:** Free (Cours d'essai gratuit !)
* **Accepted Vouchers:** ANCV (Chèque Vacances, Coupon Sport)

**Schedule (Planning):**
| Day | Time | Class | Teacher | Level |
| :--- | :--- | :--- | :--- | :--- |
| Mardi | 19h – 20h | Bachata | Luis | Intermédiaire |
| Mardi | 20h – 21h | Salsa Cubaine | Luis | Intermédiaire |
| Jeudi | 19h – 20h | Bachata | Luis | Débutant |
| Jeudi | 20h – 21h | Salsa Cubaine | Luis | Débutant |
| Jeudi | 18h30 – 19h30 | Danse orientale | Marianne | Débutant |
| Jeudi | 19h30 – 20h30 | Belly Modern | Marianne | Tous niveaux |
| Jeudi | 20h30 – 21h30 | Danse orientale | Marianne | Intermédiaire |

**Annual Pricing (Tarifs Annuels):**
| Frequency | 1 personne | 1 personne (- 15 ans) | 2 personnes (même famille) |
| :--- | :--- | :--- | :--- |
| 1 cours / semaine | 190 € | 165 € | 345 € |
| 2 cours / semaine | 295 € | 255 € | 535 € |
| 3 cours / semaine | 390 € | 335 € | 700 € |
| 4 cours / semaine | 440 € | 375 € | 795 € |

---

## 3. Recommended JSON Schema (`src/data/locations.json`)

```json
[
  {
    "id": "mandres",
    "name": "Mandres-les-Roses",
    "address": "Salle Galopier – Ferme de Monsieur, 4 Rue du Général Leclerc, 94520 Mandres-les-Roses",
    "membershipFee": 20,
    "trialClass": "Gratuit",
    "specialClasses": "Sur demande (Flashmob, ouverture de bal, EVJF, EVG, ...)",
    "schedule": [
      { "day": "Mardi", "time": "18h15 - 19h", "name": "Latino Kid's", "teacher": "Jessica", "level": "Enfants" },
      { "day": "Mardi", "time": "19h15 - 20h", "name": "Latin' Ladies", "teacher": "Jessica", "level": "Tous niveaux" },
      { "day": "Mardi", "time": "20h - 20h45", "name": "Salsa Cubaine", "teacher": "Jessica", "level": "Tous niveaux" }
    ],
    "pricing": [
      { "frequency": "1 cours / semaine", "solo": 150, "minor": 130, "family": 270 },
      { "frequency": "2 cours / semaine", "solo": 240, "minor": 205, "family": 435 }
    ]
  },
  {
    "id": "thiais",
    "name": "Thiais",
    "address": "Centre de loisirs Jules Ferry, 66, rue Paul Vaillant Couturier - 94320 Thiais",
    "membershipFee": 20,
    "trialClass": "Gratuit",
    "schedule": [
      { "day": "Mardi", "time": "19h - 20h", "name": "Bachata", "teacher": "Luis", "level": "Intermédiaire" },
      { "day": "Mardi", "time": "20h - 21h", "name": "Salsa Cubaine", "teacher": "Luis", "level": "Intermédiaire" },
      { "day": "Jeudi", "time": "19h - 20h", "name": "Bachata", "teacher": "Luis", "level": "Débutant" },
      { "day": "Jeudi", "time": "20h - 21h", "name": "Salsa Cubaine", "teacher": "Luis", "level": "Débutant" },
      { "day": "Jeudi", "time": "18h30 - 19h30", "name": "Danse orientale", "teacher": "Marianne", "level": "Débutant" },
      { "day": "Jeudi", "time": "19h30 - 20h30", "name": "Belly Modern", "teacher": "Marianne", "level": "Tous niveaux" },
      { "day": "Jeudi", "time": "20h30 - 21h30", "name": "Danse orientale", "teacher": "Marianne", "level": "Intermédiaire" }
    ],
    "pricing": [
      { "frequency": "1 cours / semaine", "solo": 190, "minor": 165, "family": 345 },
      { "frequency": "2 cours / semaine", "solo": 295, "minor": 255, "family": 535 },
      { "frequency": "3 cours / semaine", "solo": 390, "minor": 335, "family": 700 },
      { "frequency": "4 cours / semaine", "solo": 440, "minor": 375, "family": 795 }
    ]
  }
]