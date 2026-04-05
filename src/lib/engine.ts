import { AnalysisResult, Condition, Medication, ProductInfo, Severity } from "@/types";

/**
 * simulated "AI" logic based on the markdown files.
 * In a real app, this would be a call to an LLM or a specialized CV model.
 */
export async function analyzeSkin(text: string, image: File | null): Promise<AnalysisResult> {
  // Simulate network delay for "Scanning" animation
  await new Promise(resolve => setTimeout(resolve, 3000));

  const lowerText = text.toLowerCase();
  const conditions: Condition[] = [];
  let severity: Severity = "Mild";
  let severityReason = "Symptoms are currently mild. Maintaining a simple skincare routine and monitoring for changes is advised.";

  // 1. Tinea Corporis (Ringworm) - Specific symptoms
  if (lowerText.includes("ring") || lowerText.includes("circular") || lowerText.includes("clear center")) {
    severity = "Moderate";
    severityReason = "The circular morphology and clear center are classic signs of a fungal infection (Tinea Corporis), which requires targeted antifungal therapy to prevent spreading.";
    conditions.push({
      name: "Tinea Corporis (Ringworm)",
      sources: ["Mayo Clinic", "DermNet NZ"],
      indicators: ["Pruritic (itchy) red circular rash", "Clearer skin in the middle of the ring", "Slightly raised, expanding borders"],
      causes: "Fungal infection spread by skin-to-skin contact or contact with contaminated items."
    });
  }

  // 2. Contact Dermatitis
  if (lowerText.includes("soap") || lowerText.includes("detergent") || lowerText.includes("irritated after") || lowerText.includes("new product")) {
    severity = "Moderate";
    severityReason = "A reaction occurring after contact with a specific substance suggests an irritant or allergic response (Contact Dermatitis).";
    conditions.push({
      name: "Contact Dermatitis",
      sources: ["Cleveland Clinic", "AAD"],
      indicators: ["Red rash appearing after contact with substance", "Intense itching", "Swelling or tenderness in the affected area"],
      causes: "Allergic or irritant reaction to external triggers like soaps, detergents, or cosmetics."
    });
  }

  // 3. Eczema (Atopic Dermatitis)
  if (lowerText.includes("dry") || lowerText.includes("elbow") || lowerText.includes("knee") || lowerText.includes("chronic") || lowerText.includes("cracked")) {
    severity = "Moderate";
    severityReason = "Chronic dryness in joint flexures (elbows/knees) is indicative of Atopic Dermatitis, which requires long-term moisture management.";
    conditions.push({
      name: "Atopic Dermatitis (Eczema)",
      sources: ["National Eczema Association", "NHS UK"],
      indicators: ["Intense itching", "Dry, sensitive skin", "Inflamed patches in flexures (elbows, back of knees)"],
      causes: "Combination of genetic factors leading to skin barrier dysfunction and environmental triggers."
    });
  }

  // 4. Psoriasis
  if (lowerText.includes("silvery") || lowerText.includes("thick") || lowerText.includes("plaque") || lowerText.includes("scaly")) {
    severity = "Moderate";
    severityReason = "Thick, scaly plaques with a silvery appearance may indicate Psoriasis, an autoimmune-related skin condition requiring specialized care.";
    conditions.push({
      name: "Psoriasis",
      sources: ["Mayo Clinic", "AAD"],
      indicators: ["Thick, red patches of skin covered with silvery scales", "Dry, cracked skin that may bleed", "Soreness or burning sensation"],
      causes: "Immune system problem that causes skin cells to grow faster than usual, building up into scales."
    });
  }

  // 5. Acne
  if (lowerText.includes("acne") || lowerText.includes("pimple") || lowerText.includes("blackhead") || lowerText.includes("whitehead") || lowerText.includes("breakout")) {
    severity = "Mild";
    severityReason = "Mild to moderate acne is typically manageable with topical treatments but should be monitored to prevent scarring.";
    conditions.push({
      name: "Acne Vulgaris",
      sources: ["AAD", "NHS UK"],
      indicators: ["Comedones (blackheads/whiteheads)", "Papules and pustules", "Commonly on face, back, or chest"],
      causes: "Excess oil production, clogged hair follicles, and bacteria."
    });
  }

  // Fallback for general redness/itchiness if nothing else matched
  if (conditions.length === 0 && (lowerText.includes("red") || lowerText.includes("itch"))) {
    severity = "Moderate";
    severityReason = "The presence of red itchy patches warrants examination to determine the exact cause and appropriate therapy.";
    conditions.push({
      name: "Non-Specific Skin Irritation",
      sources: ["MedlinePlus"],
      indicators: ["Redness", "Itchiness", "Irritation"],
      causes: "Multiple potential triggers including environment or mild allergy."
    });
  }

  // Default fallback if absolutely nothing matches
  if (conditions.length === 0) {
    conditions.push({
      name: "General Skin Management",
      sources: ["AAD"],
      indicators: ["Mild irritation or dryness", "Lack of specific clinical signs"],
      causes: "Environmental factors like dry air or harsh soaps."
    });
  }

  return { severity, severityReason, conditions };
}

export function getMedications(conditionName: string): Medication[] {
  const name = conditionName.toLowerCase();

  if (name.includes("tinea") || name.includes("ringworm")) {
    return [
      {
        name: "Clotrimazole 1% Cream",
        brands: ["Candid", "Canesten"],
        type: "Topical Cream",
        why: "Antifungal medication that stops the growth of fungi.",
        dose: "Apply twice daily for 2-4 weeks",
        when: "To clean, dry skin",
        duration: "2-4 weeks",
        isOTC: true
      }
    ];
  }

  if (name.includes("dermatitis") || name.includes("eczema")) {
    return [
      {
        name: "Hydrocortisone 1% Cream",
        brands: ["Cortimax", "Lycort"],
        type: "Topical Steroid",
        why: "Reduces inflammation and itching associated with dermatitis.",
        dose: "Apply a thin layer twice daily",
        when: "To affected areas only",
        duration: "Max 1 week",
        isOTC: true
      },
      {
        name: "Liquid Paraffin & White Soft Paraffin",
        brands: ["Aquasoft Max", "Oilatum"],
        type: "Emollient",
        why: "Restores skin barrier and prevents moisture loss.",
        dose: "Apply liberally",
        when: "After bath and before bed",
        duration: "Continuous use",
        isOTC: true
      }
    ];
  }

  if (name.includes("psoriasis")) {
    return [
      {
        name: "Coal Tar + Salicylic Acid Solution",
        brands: ["Exitar", "Salytar"],
        type: "Topical Solution",
        why: "Coal tar reduces skin cell growth; Salicylic acid helps remove scales.",
        dose: "Apply once daily at night",
        when: "To thick plaques especially",
        duration: "As directed by physician",
        isOTC: false
      }
    ];
  }

  if (name.includes("acne")) {
    return [
      {
        name: "Benzoyl Peroxide 2.5%",
        brands: ["Benzac AC", "Oxy-5"],
        type: "Topical Gel",
        why: "Kills acne-causing bacteria and unclogs pores.",
        dose: "Apply once daily at night",
        when: "After washing with mild cleanser",
        duration: "Until cleared",
        isOTC: true
      }
    ];
  }

  return [
    {
      name: "White Soft Paraffin",
      brands: ["Vaseline"],
      type: "Emollient",
      why: "Creates a protective barrier for dry skin.",
      dose: "As needed",
      when: "Every 4-6 hours",
      duration: "Safe for long-term use",
      isOTC: true
    }
  ];
}

export function findMarketProducts(medName: string): ProductInfo[] {
  const name = medName.toLowerCase();
  const encodeName = (q: string) => encodeURIComponent(q).replace(/%20/g, "+");

  if (name.includes("clotrimazole") || name.includes("candid")) {
    return [
      {
        name: "Candid Skin Cream 30g",
        price: "125",
        platform: "Tata 1mg",
        link: "https://www.1mg.com/search/all?name=" + encodeName("Candid Cream"),
        rating: 4.5,
        reviews: 240,
        efficacy: 8.9,
        isDoctorEndorsed: true
      },
      {
        name: "Canesten Clotrimazole 1%",
        price: "145",
        platform: "Apollo Pharmacy",
        link: "https://www.apollopharmacy.in/search?q=" + encodeName("Canesten Cream"),
        rating: 4.3,
        reviews: 120,
        efficacy: 8.7,
        isDoctorEndorsed: true
      }
    ];
  }

  if (name.includes("hydrocortisone")) {
    return [
      {
        name: "Lycort 1% Cream 10g",
        price: "45",
        platform: "Tata 1mg",
        link: "https://www.1mg.com/search/all?name=" + encodeName("Lycort Cream"),
        rating: 4.4,
        reviews: 150,
        efficacy: 8.5,
        isDoctorEndorsed: true
      }
    ];
  }

  if (name.includes("paraffin") || name.includes("aquasoft")) {
    return [
      {
        name: "Aquasoft Max Cream 100g",
        price: "345",
        platform: "PharmEasy",
        link: "https://pharmeasy.in/search/all?name=" + encodeName("Aquasoft Max Cream"),
        rating: 4.7,
        reviews: 320,
        efficacy: 9.0,
        isDoctorEndorsed: true
      },
      {
        name: "Vaseline Jelly 100g",
        price: "150",
        platform: "Amazon India",
        link: "https://www.amazon.in/s?k=" + encodeName("Vaseline Petroleum Jelly"),
        rating: 4.8,
        reviews: 50000,
        efficacy: 7.5,
        isDoctorEndorsed: false
      }
    ];
  }

  if (name.includes("coal tar") || name.includes("salytar")) {
    return [
      {
        name: "Salytar Solution 100ml",
        price: "245",
        platform: "Tata 1mg",
        link: "https://www.1mg.com/search/all?name=" + encodeName("Salytar Solution"),
        rating: 4.2,
        reviews: 45,
        efficacy: 8.8,
        isDoctorEndorsed: true
      }
    ];
  }

  if (name.includes("benzoyl") || name.includes("benzac")) {
    return [
      {
        name: "Benzac AC 2.5% Gel 30g",
        price: "215",
        platform: "Tata 1mg",
        link: "https://www.1mg.com/search/all?name=" + encodeName("Benzac AC 2.5 Gel"),
        rating: 4.7,
        reviews: 1200,
        efficacy: 9.2,
        isDoctorEndorsed: true
      }
    ];
  }

  // Generic fallback if medication not explicitly listed
  return [
    {
      name: "Generic Treatment Product",
      price: "100",
      platform: "Tata 1mg",
      link: "https://www.1mg.com/search/all?name=" + encodeName(medName),
      rating: 4.0,
      reviews: 10,
      efficacy: 7.0,
      isDoctorEndorsed: false
    }
  ];
}
