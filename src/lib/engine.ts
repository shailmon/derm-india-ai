import { AnalysisResult, Medication, ProductInfo } from "@/types";

/**
 * simulated "AI" logic based on the markdown files.
 * In a real app, this would be a call to an LLM or a specialized CV model.
 */
export async function analyzeSkin(text: string, image: File | null): Promise<AnalysisResult> {
  // Simulate network delay for "Scanning" animation
  await new Promise(resolve => setTimeout(resolve, 3000));

  const lowerText = text.toLowerCase();

  // Basic keyword mapping based on the MD files logic
  if (lowerText.includes("itch") || lowerText.includes("red") || lowerText.includes("patch")) {
    return {
      severity: "Moderate",
      severityReason: "The presence of red itchy patches may indicate an inflammatory or fungal process that requires targeted treatment to prevent secondary bacterial infection.",
      conditions: [
        {
          name: "Tinea Corporis (Ringworm)",
          sources: ["Mayo Clinic", "DermNet NZ"],
          indicators: [
            "Pruritic (itchy) red circular rash",
            "Clearer skin in the middle of the ring",
            "Slightly raised, expanding borders"
          ],
          causes: "Fungal infection spread by skin-to-skin contact or contact with contaminated items (towels, clothing)."
        },
        {
          name: "Contact Dermatitis",
          sources: ["Cleveland Clinic", "AAD"],
          indicators: [
            "Red rash appearing after contact with substance",
            "Intense itching",
            "Swelling or tenderness in the affected area"
          ],
          causes: "Allergic or irritant reaction to soaps, detergents, cosmetics, or specific fabrics."
        }
      ]
    };
  }

  if (lowerText.includes("acne") || lowerText.includes("bump") || lowerText.includes("pimple")) {
    return {
      severity: "Mild",
      severityReason: "Mild to moderate acne is typically manageable with topical treatments but should be monitored to prevent scarring.",
      conditions: [
        {
          name: "Acne Vulgaris",
          sources: ["AAD", "NHS UK"],
          indicators: [
            "Comedones (blackheads/whiteheads)",
            "Papules and pustules (pimple bumps)",
            "Commonly on face, back, or chest"
          ],
          causes: "Excess oil (sebum) production, hair follicles clogged by oil and dead skin cells, and bacteria."
        }
      ]
    };
  }

  // Default fallback
  return {
    severity: "Mild",
    severityReason: "Symptoms are currently mild. Maintaining a simple skincare routine and monitoring for changes is advised.",
    conditions: [
      {
        name: "General Skin Irritation / Xerosis",
        sources: ["MedlinePlus"],
        indicators: [
          "Dry, flaky skin",
          "Mild itching or tightness",
          "Lack of visible lesion morphology"
        ],
        causes: "Environmental factors like dry air, hot water, or harsh soaps."
      }
    ]
  };
}

export function getMedications(conditionName: string): Medication[] {
  const name = conditionName.toLowerCase();

  if (name.includes("tinea") || name.includes("fungal")) {
    return [
      {
        name: "Clotrimazole 1% Cream",
        brands: ["Candid", "Canesten", "Funginoc"],
        type: "Topical Cream",
        why: "Inhibits the growth of individual fungal cells by altering cell membrane permeability.",
        dose: "Apply thin layer twice daily",
        when: "After cleaning and drying the area",
        duration: "2-4 weeks",
        isOTC: true
      },
      {
        name: "Fluconazole 150mg",
        brands: ["Flucos", "Zocon"],
        type: "Oral Tablet",
        why: "Systemic antifungal for stubborn or widespread infections.",
        dose: "1 tablet per week",
        when: "With or without food",
        duration: "Specify as per doctor's advice",
        isOTC: false
      }
    ];
  }

  if (name.includes("dermatitis") || name.includes("irritation")) {
    return [
      {
        name: "Betamethasone Valerate",
        brands: ["Betnovate", "Beta cream"],
        type: "Topical Steroid",
        why: "Reduces inflammation, itching, and redness by suppressing the immune response.",
        dose: "Apply morning and night",
        when: "To affected areas only",
        duration: "Max 1 week (on face) to 2 weeks (on body)",
        isOTC: false
      },
      {
        name: "Cetirizine 10mg",
        brands: ["Cetzine", "Alerid"],
        type: "Oral Antihistamine",
        why: "Blocks histamine receptors to reduce systemic itching and allergic response.",
        dose: "1 tablet once daily",
        when: "Preferably at night (may cause mild drowsiness)",
        duration: "Until itch subsides",
        isOTC: true
      }
    ];
  }

  if (name.includes("acne")) {
    return [
      {
        name: "Benzoyl Peroxide 2.5%",
        brands: ["Benzac AC", "Oxy-5"],
        type: "Topical Gel",
        why: "Bactericidal action against P. acnes and comedolytic effect.",
        dose: "Apply once daily (night)",
        when: "After washing face with a mild cleanser",
        duration: "Until cleared",
        isOTC: true
      },
      {
        name: "Clindamycin Gel",
        brands: ["Clindac A", "Dalacin T"],
        type: "Topical Antibiotic",
        why: "Antibacterial agent that reduces inflammation and bacteria count.",
        dose: "Apply twice daily",
        when: "Spot treatment",
        duration: "4-6 weeks",
        isOTC: false
      }
    ];
  }

  return [
    {
      name: "White Soft Paraffin",
      brands: ["Vaseline", "Aquasoft"],
      type: "Emollient",
      why: "Creates an occlusive barrier to prevent moisture loss.",
      dose: "Apply as needed",
      when: "Every 4-6 hours or after bath",
      duration: "Continuous use is safe",
      isOTC: true
    }
  ];
}

export function findMarketProducts(medName: string): ProductInfo[] {
  const name = medName.toLowerCase();

  if (name.includes("clotrimazole") || name.includes("candid")) {
    return [
      {
        name: "Candid Skin Cream 30g",
        price: "125",
        platform: "1mg",
        link: "https://www.1mg.com/otc/candid-cream-otc41935",
        rating: 4.5,
        reviews: 240,
        efficacy: 8.9,
        isDoctorEndorsed: true
      },
      {
        name: "Canesten Clotrimazole 1%",
        price: "145",
        platform: "Apollo Pharmacy",
        link: "https://www.apollopharmacy.in/otc/canesten-cream-30g",
        rating: 4.3,
        reviews: 120,
        efficacy: 8.7,
        isDoctorEndorsed: true
      },
      {
        name: "Clocip Cream (Generic)",
        price: "85",
        platform: "Amazon.in",
        link: "https://www.amazon.in/dp/B08XYZ",
        rating: 4.0,
        reviews: 320,
        efficacy: 8.2,
        isDoctorEndorsed: false
      }
    ];
  }

  if (name.includes("betamethasone") || name.includes("betnovate")) {
    return [
      {
        name: "Betnovate Cream 20g",
        price: "55",
        platform: "PharmEasy",
        link: "https://pharmeasy.in/online-medicine-order/betnovate-cream-1175",
        rating: 4.6,
        reviews: 850,
        efficacy: 8.5,
        isDoctorEndorsed: true
      },
      {
        name: "Betamil Cream",
        price: "48",
        platform: "1mg",
        link: "https://www.1mg.com/medicines/betamil-cream-123",
        rating: 4.2,
        reviews: 50,
        efficacy: 8.1,
        isDoctorEndorsed: true
      }
    ];
  }

  if (name.includes("benzoyl") || name.includes("benzac")) {
    return [
      {
        name: "Benzac AC 2.5% Gel 30g",
        price: "215",
        platform: "1mg",
        link: "https://www.1mg.com/otc/benzac-ac-2.5-gel-otc123",
        rating: 4.7,
        reviews: 1200,
        efficacy: 9.2,
        isDoctorEndorsed: true
      },
      {
        name: "Pernex AC 2.5 Gel",
        price: "185",
        platform: "Netmeds",
        link: "https://www.netmeds.com/prescriptions/pernex-ac-2-5-gel",
        rating: 4.4,
        reviews: 450,
        efficacy: 8.8,
        isDoctorEndorsed: true
      }
    ];
  }

  // Generic fallback info
  return [
    {
      name: "Vaseline Petroleum Jelly 100g",
      price: "150",
      platform: "Amazon.in",
      link: "https://www.amazon.in/dp/B00V4L5S0S",
      rating: 4.8,
      reviews: 50000,
      efficacy: 7.5,
      isDoctorEndorsed: false
    }
  ];
}
